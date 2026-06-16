// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// === SCROLL ANIMATION OBSERVER ===
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

// Staggered groups — each group gets sequential delays
const groups = [
    { selector: '.service-card', delay: 0.12 },
    { selector: '.why-card', delay: 0.1 },
    { selector: '.fit-col', delay: 0.1 },
    { selector: '.process-step', delay: 0.12 },
    { selector: '.video-lever', delay: 0.1 },
    { selector: '.cta-step', delay: 0.08 }
];

groups.forEach(({ selector, delay }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${i * delay}s`;
        fadeObserver.observe(el);
    });
});

// Single fade-up elements
const singles = [
    '.section-tag',
    '.section-title',
    '.founder-text',
    '.video-wrap',
    '.pricing-table-wrap',
    '.pricing-sub',
    '.pricing-includes',
    '.cta-title',
    '.cta-sub',
    '.cta-steps'
];

document.querySelectorAll(singles.join(',')).forEach(el => {
    el.classList.add('fade-up');
    fadeObserver.observe(el);
});

// === HERO ENTRANCE ===
window.addEventListener('DOMContentLoaded', () => {
    // Line-by-line title reveal
    const heroLines = document.querySelectorAll('.hero-line');
    heroLines.forEach((line, i) => {
        setTimeout(() => line.classList.add('visible'), 200 + (i * 220));
    });

    // Stagger remaining hero elements
    const heroEls = document.querySelectorAll('.hero-tag, .hero-sub, .hero-stats, .hero .btn');
    heroEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 500 + (i * 160));
    });
});

// === FOUNDER PHOTO CURTAIN REVEAL ===
const founderPhoto = document.querySelector('.founder-photo');
if (founderPhoto) {
    const photoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('revealed'), 150);
                photoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    photoObserver.observe(founderPhoto);

    // Fallback: if photo is already in viewport or observer doesn't fire within 3s
    setTimeout(() => {
        if (!founderPhoto.classList.contains('revealed')) {
            founderPhoto.classList.add('revealed');
        }
    }, 3000);
}

// === STAT NUMBER COUNTER ===
function animateCounter(el, target, duration) {
    const isDecimal = target % 1 !== 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = isDecimal ? target.toFixed(1) : target;
            el.classList.add('counted');
        }
    }

    requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');
const targets = [];

// Store targets before zeroing out
statNumbers.forEach(el => {
    targets.push(parseFloat(el.textContent));
    el.textContent = '0';
});

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const idx = Array.from(statNumbers).indexOf(el);
            setTimeout(() => {
                animateCounter(el, targets[idx], 1000);
            }, 300 + (idx * 100));
            statsObserver.unobserve(el);
        }
    });
}, { threshold: 0.3 });

statNumbers.forEach(el => statsObserver.observe(el));

// Fallback: if stats are in viewport on load (hero visible immediately)
setTimeout(() => {
    statNumbers.forEach((el, idx) => {
        if (el.textContent === '0' || el.textContent === '0.0') {
            animateCounter(el, targets[idx], 1000);
        }
    });
}, 2000);

// === PROCESS CONNECTOR DRAW-IN ===
const connectors = document.querySelectorAll('.process-connector');
const connectorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('drawn'), 200);
            connectorObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

connectors.forEach(c => connectorObserver.observe(c));

// === CURSOR GLOW ON HERO (desktop only) ===
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
        hero.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
    });
}
