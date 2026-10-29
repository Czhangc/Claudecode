import { NavLink } from 'react-router-dom';
import { zh } from '../copy/zh';
import { IconBook, IconHome, IconList, IconUser } from './Icons';

const ITEMS = [
  { to: '/', label: zh.nav.home, Icon: IconHome },
  { to: '/records', label: zh.nav.records, Icon: IconList },
  { to: '/knowledge', label: zh.nav.knowledge, Icon: IconBook },
  { to: '/me', label: zh.nav.me, Icon: IconUser },
];

export function BottomNav() {
  return (
    <nav aria-label="主导航" className="fixed inset-x-0 bottom-0 z-20 border-t border-line-soft bg-paper pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-[480px] justify-around">
        {ITEMS.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex min-h-14 min-w-16 flex-col items-center justify-center gap-0.5 text-[12px] font-extrabold ${isActive ? 'text-ink' : 'text-ink-2'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`flex h-7 w-12 items-center justify-center rounded-full ${isActive ? 'bg-ink text-paper' : ''}`}>
                    <Icon width={20} height={20} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
