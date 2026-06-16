// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 55);
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });
reveals.forEach(el => revealObs.observe(el));

// Nav active link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
function updateNav() {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}
window.addEventListener('scroll', updateNav, { passive: true });

// Game loop animation
const LOOP_CARDS = 3;
const LOOP_STEP = 1800;
let loopCurrent = 0;

function loopTick() {
    for (let i = 0; i < LOOP_CARDS; i++) {
        document.getElementById('loop-card-' + i).classList.remove('active');
    }
    for (let i = 0; i < LOOP_CARDS - 1; i++) {
        document.getElementById('loop-arr-' + i).classList.remove('active');
    }
    document.getElementById('loop-card-' + loopCurrent).classList.add('active');
    if (loopCurrent < LOOP_CARDS - 1) {
        document.getElementById('loop-arr-' + loopCurrent).classList.add('active');
    }
    loopCurrent = (loopCurrent + 1) % LOOP_CARDS;
}

loopTick();
setInterval(loopTick, LOOP_STEP);