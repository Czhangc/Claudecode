// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in effect to sections
const sections = document.querySelectorAll('.philosophy-card, .tea-card, .ritual-step');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(section);
});

// Add stagger effect to cards
document.querySelectorAll('.philosophy-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

document.querySelectorAll('.tea-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

document.querySelectorAll('.ritual-step').forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.2}s`;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }

    if (scrollIndicator && scrolled < window.innerHeight) {
        scrollIndicator.style.opacity = 1 - (scrolled / 300);
    }
});

// Add hover effect for tea cards with subtle scale
document.querySelectorAll('.tea-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Zen circle breathing animation sync
const zenCircle = document.querySelector('.circle-zen');
if (zenCircle) {
    let breatheIn = true;
    setInterval(() => {
        breatheIn = !breatheIn;
        zenCircle.style.transition = 'all 4s ease-in-out';
    }, 4000);
}

// Add subtle cursor effect for interactive elements
document.querySelectorAll('a, .tea-card, .philosophy-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        document.body.style.cursor = 'pointer';
    });

    element.addEventListener('mouseleave', function() {
        document.body.style.cursor = 'default';
    });
});

// Section header animation
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(30px)';
    header.style.transition = 'opacity 1s ease, transform 1s ease';
    fadeInObserver.observe(header);
});

// Reveal quote on scroll
const quote = document.querySelector('.zen-quote');
if (quote) {
    const quoteParagraphs = quote.querySelectorAll('p');
    quoteParagraphs.forEach(p => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        p.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                quoteParagraphs.forEach((p, index) => {
                    setTimeout(() => {
                        p.style.opacity = '0.95';
                        p.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    quoteObserver.observe(quote);
}

// Add gentle floating animation to scroll indicator
const scrollArrow = document.querySelector('.scroll-arrow');
if (scrollArrow) {
    scrollArrow.style.animation = 'scrollDown 2s ease-in-out infinite';
}

// Console message for tea lovers
console.log('%c🍃 Welcome to Zen Leaf', 'font-size: 20px; color: #2d3e2d; font-family: Georgia;');
console.log('%cMay your code be as elegant as a perfectly brewed cup of tea.', 'font-size: 14px; color: #7a8f7a; font-family: Georgia; font-style: italic;');
