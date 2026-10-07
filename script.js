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
    '.apply-sub',
    '.apply-form',
    '.form-success',
    '.apply-steps'
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

// === FORM SUBMISSION ===
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzyvXnuUKKnW3g5T7Nb5VkQeSPLoX6yKrHgnLq2IuBHa98ecxaU5GKg2ppVfdPrSnUMww/exec';

const applyForm = document.getElementById('apply-form');
const formSuccess = document.getElementById('form-success');
const formSubmit = document.getElementById('form-submit');

// === FORM VALIDATION ===
function validateForm(data) {
    const errors = [];

    // Name: at least 2 real characters
    if (data.name.trim().length < 2) {
        errors.push('Please enter your full name.');
    }

    // Brand: at least 2 chars, not all numbers
    if (data.brand.trim().length < 2 || /^\d+$/.test(data.brand.trim())) {
        errors.push('Please enter a valid brand name.');
    }

    // Website: must contain a dot (basic domain check)
    if (!data.website.trim().includes('.')) {
        errors.push('Please enter a valid website URL (e.g., yourbrand.com).');
    }

    // Spend: block non-qualifying tiers
    if (data.spend === 'Not spending yet' || data.spend === 'Under ₹1L/month') {
        errors.push('This service is designed for brands spending ₹1L/month or more on Meta ads. If you\'re not there yet, we may not be the right fit right now.');
    }

    // Challenge: at least 20 characters (a real sentence)
    if (data.challenge.trim().length < 20) {
        errors.push('Please describe your challenge in more detail (at least 20 characters).');
    }

    // WhatsApp: at least 10 digits
    const digits = data.whatsapp.replace(/\D/g, '');
    if (digits.length < 10) {
        errors.push('Please enter a valid 10-digit WhatsApp number.');
    }

    return errors;
}

const formErrors = document.getElementById('form-errors');

if (applyForm) {
    applyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById('form-name').value,
            brand: document.getElementById('form-brand').value,
            website: document.getElementById('form-website').value,
            spend: document.getElementById('form-spend').value,
            challenge: document.getElementById('form-challenge').value,
            whatsapp: document.getElementById('form-whatsapp').value,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        // Validate before submitting
        const errors = validateForm(data);
        if (errors.length > 0) {
            formErrors.innerHTML = errors.map(e => '<p>' + e + '</p>').join('');
            formErrors.style.display = 'block';
            formErrors.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        formErrors.style.display = 'none';
        formSubmit.disabled = true;
        formSubmit.textContent = 'Submitting...';

        try {
            await fetch(GOOGLE_SHEET_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            // Fire Meta Pixel Lead event — ONLY after validation passes
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }

            applyForm.style.display = 'none';
            formSuccess.style.display = 'block';
        } catch (err) {
            formSubmit.disabled = false;
            formSubmit.textContent = 'Submit Application';
            alert('Something went wrong. Please try again or WhatsApp us directly.');
        }
    });
}

// === CURSOR GLOW ON HERO (desktop only) ===
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
        hero.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
    });
}
