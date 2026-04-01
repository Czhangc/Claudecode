import time
import json
from datetime import datetime
from flask import Flask, jsonify, render_template
import yfinance as yf
import pandas as pd

app = Flask(__name__)

TICKERS = {
    "NVDA": "NVIDIA",
    "AMD": "AMD",
    "INTC": "Intel",
    "QCOM": "Qualcomm",
    "TSM": "TSMC",
    "ASML": "ASML",
    "AVGO": "Broadcom",
    "ARM": "Arm Holdings",
}
BENCHMARK = "SMH"

_cache = {}
CACHE_TTL = 300  # 5 minutes


def cached(key, fn):
    now = time.time()
    if key in _cache and now - _cache[key]["ts"] < CACHE_TTL:
        return _cache[key]["data"]
    data = fn()
    _cache[key] = {"ts": now, "data": data}
    return data


def safe_val(val, fmt=None):
    if val is None or (isinstance(val, float) and pd.isna(val)):
        return None
    if fmt == "B":
        return round(val / 1e9, 2)
    if fmt == "pct":
        return round(val * 100, 2)
    return round(float(val), 2) if isinstance(val, (int, float)) else val


def fetch_stocks():
    results = []
    all_tickers = list(TICKERS.keys()) + [BENCHMARK]
    data = yf.download(
        all_tickers,
        period="1y",
        interval="1d",
        group_by="ticker",
        auto_adjust=True,
        threads=True,
    )

    for symbol, name in TICKERS.items():
        info = {}
        try:
            t = yf.Ticker(symbol)
            info = t.info or {}
        except Exception:
            pass

        try:
            if len(all_tickers) == 1:
                hist = data["Close"]
            else:
                hist = data[symbol]["Close"] if symbol in data.columns.get_level_values(0) else pd.Series()

            hist = hist.dropna()
            price = float(hist.iloc[-1]) if len(hist) > 0 else None
            prev_close = float(hist.iloc[-2]) if len(hist) > 1 else None
            day_change_pct = round((price - prev_close) / prev_close * 100, 2) if price and prev_close else None

            # 30-day history for sparkline
            hist_30 = hist.tail(30)
            sparkline = [round(float(v), 2) for v in hist_30.tolist()]

            # Performance periods
            def perf(days):
                if len(hist) > days:
                    return round((float(hist.iloc[-1]) - float(hist.iloc[-days])) / float(hist.iloc[-days]) * 100, 2)
                return None

            results.append({
                "symbol": symbol,
                "name": name,
                "price": round(price, 2) if price else None,
                "day_change_pct": day_change_pct,
                "market_cap_b": safe_val(info.get("marketCap"), "B"),
                "pe_ratio": safe_val(info.get("trailingPE")),
                "forward_pe": safe_val(info.get("forwardPE")),
                "week52_high": safe_val(info.get("fiftyTwoWeekHigh")),
                "week52_low": safe_val(info.get("fiftyTwoWeekLow")),
                "analyst_target": safe_val(info.get("targetMeanPrice")),
                "recommendation": info.get("recommendationKey", "n/a"),
                "revenue_growth": safe_val(info.get("revenueGrowth"), "pct"),
                "sparkline": sparkline,
                "perf_1m": perf(21),
                "perf_3m": perf(63),
                "perf_1y": perf(252),
                "ma50": round(float(hist.tail(50).mean()), 2) if len(hist) >= 50 else None,
            })
        except Exception as e:
            results.append({
                "symbol": symbol,
                "name": name,
                "error": str(e),
                "sparkline": [],
            })

    return results


def fetch_news():
    seen = set()
    items = []
    for symbol in TICKERS:
        try:
            t = yf.Ticker(symbol)
            for article in (t.news or []):
                uid = article.get("id") or article.get("uuid") or article.get("link", "")
                if uid in seen:
                    continue
                seen.add(uid)
                items.append({
                    "title": article.get("title", ""),
                    "publisher": article.get("publisher", ""),
                    "link": article.get("link", ""),
                    "published": article.get("providerPublishTime", 0),
                    "related": [r.get("symbol", r) if isinstance(r, dict) else r
                                for r in (article.get("relatedTickers") or [])],
                })
        except Exception:
            pass

    items.sort(key=lambda x: x["published"], reverse=True)
    for item in items:
        ts = item["published"]
        item["published_str"] = datetime.utcfromtimestamp(ts).strftime("%b %d, %H:%M UTC") if ts else ""
    return items[:30]


def fetch_trends(stocks_data):
    # SMH benchmark performance
    benchmark_perf = {}
    try:
        smh = yf.download(BENCHMARK, period="1y", interval="1d", auto_adjust=True)
        closes = smh["Close"].dropna()
        def smh_perf(days):
            if len(closes) > days:
                return round((float(closes.iloc[-1]) - float(closes.iloc[-days])) / float(closes.iloc[-days]) * 100, 2)
            return None
        benchmark_perf = {
            "1d": smh_perf(1),
            "1m": smh_perf(21),
            "3m": smh_perf(63),
            "1y": smh_perf(252),
        }
    except Exception:
        pass

    # Stocks above 50-day MA
    above_ma50 = sum(
        1 for s in stocks_data
        if s.get("price") and s.get("ma50") and s["price"] > s["ma50"]
    )
    pct_above_ma50 = round(above_ma50 / len(stocks_data) * 100) if stocks_data else 0

    # AI demand indicator: NVDA + AMD avg 30-day return
    ai_stocks = [s for s in stocks_data if s["symbol"] in ("NVDA", "AMD")]
    ai_perfs = [s.get("perf_1m") for s in ai_stocks if s.get("perf_1m") is not None]
    ai_indicator = round(sum(ai_perfs) / len(ai_perfs), 2) if ai_perfs else None

    # Investment signals
    signals = []
    signal_map = {
        "strong_buy": ("Strong Buy", "buy"),
        "buy": ("Buy", "buy"),
        "hold": ("Hold", "hold"),
        "underperform": ("Underperform", "sell"),
        "sell": ("Sell", "sell"),
    }
    for s in stocks_data:
        rec = s.get("recommendation", "n/a").lower()
        label, css = signal_map.get(rec, (rec.title() if rec != "n/a" else "N/A", "neutral"))
        upside = None
        if s.get("analyst_target") and s.get("price"):
            upside = round((s["analyst_target"] - s["price"]) / s["price"] * 100, 1)
        signals.append({
            "symbol": s["symbol"],
            "name": s["name"],
            "signal": label,
            "signal_css": css,
            "upside": upside,
            "perf_1m": s.get("perf_1m"),
            "perf_3m": s.get("perf_3m"),
            "perf_1y": s.get("perf_1y"),
        })

    return {
        "benchmark": benchmark_perf,
        "pct_above_ma50": pct_above_ma50,
        "ai_indicator": ai_indicator,
        "signals": signals,
    }


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/stocks")
def api_stocks():
    data = cached("stocks", fetch_stocks)
    return jsonify(data)


@app.route("/api/news")
def api_news():
    data = cached("news", fetch_news)
    return jsonify(data)


@app.route("/api/trends")
def api_trends():
    def _fetch():
        stocks = cached("stocks", fetch_stocks)
        return fetch_trends(stocks)
    data = cached("trends", _fetch)
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
