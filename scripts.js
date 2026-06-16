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

const DEVLOG = [
    { f: '2024_05_14.mp4', t: 'video' },
    { f: '2024_05_07.mp4', t: 'video' },
    { f: '2024_04_22.png', t: 'img' },
    { f: '2024_04_21.png', t: 'img' },
    { f: '2024_04_11.jpg', t: 'img' },
    { f: '2024_04_10.png', t: 'img' },
    { f: '2024_04_05.png', t: 'img' },
    { f: '2024_04_04.png', t: 'img' },
    { f: '2024_04_02.mp4', t: 'video' },
    { f: '2024_03_29.mp4', t: 'video' },
    { f: '2024_03_27.mp4', t: 'video' },
    { f: '2024_02_29.mp4', t: 'video' },
    { f: '2024_02_22.mp4', t: 'video' },
    { f: '2024_02_21.png', t: 'img' },
    { f: '2023_12_02.mp4', t: 'video' },
    { f: '2023_11_27.mp4', t: 'video' },
    { f: '2023_11_21.mp4', t: 'video' },
    { f: '2023_11_18.mp4', t: 'video' },
    { f: '2023_11_09.mp4', t: 'video' },
    { f: '2023_11_07.mp4', t: 'video' },
    { f: '2023_10_25.png', t: 'img' },
    { f: '2023_10_13.mp4', t: 'video' },
    { f: '2023_10_06.png', t: 'img' },
    { f: '2023_09_27.mp4', t: 'video' },
    { f: '2023_09_26.mp4', t: 'video' },
    { f: '2023_09_12.png', t: 'img' },
    { f: '2023_09_10.png', t: 'img' },
    { f: '2023_08_30.mp4', t: 'video' },
    { f: '2023_08_20.mp4', t: 'video' },
    { f: '2023_08_19.png', t: 'img' },
    { f: '2023_08_16.png', t: 'img' },
    { f: '2023_08_16.mp4', t: 'video' },
    { f: '2023_08_15.mp4', t: 'video' },
    { f: '2023_07_17.png', t: 'img' },
    { f: '2023_06_25.mp4', t: 'video' },
    { f: '2023_06_20.png', t: 'img' }
];

const DEVLOG_BATCH = 12;
let devlogShown = DEVLOG_BATCH;

function devlogDateLabel(f) {
    const p = f.split('_');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[parseInt(p[1]) - 1] + ' ' + p[0];
}

function buildDevlogItem(item, index) {
    const el = document.createElement('div');
    el.className = 'devlog-item';

    if (item.t === 'img') {
        const img = document.createElement('img');
        img.src = 'assets/devlog/' + item.f;
        img.loading = 'lazy';
        img.alt = '';
        el.appendChild(img);
    } else {
        const vid = document.createElement('video');
        vid.src = 'assets/devlog/' + item.f;
        vid.preload = 'metadata';
        vid.muted = true;
        el.appendChild(vid);
        const tag = document.createElement('span');
        tag.className = 'devlog-video-tag';
        tag.textContent = 'clip';
        el.appendChild(tag);
    }

    const overlay = document.createElement('div');
    overlay.className = 'devlog-item-overlay';
    overlay.innerHTML = '<div class="devlog-item-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>';
    el.appendChild(overlay);

    const dateTag = document.createElement('span');
    dateTag.className = 'devlog-date-tag';
    dateTag.textContent = devlogDateLabel(item.f);
    el.appendChild(dateTag);

    el.addEventListener('click', () => devlogOpenLb(index));
    return el;
}

function renderDevlog() {
    const grid = document.getElementById('devlogGrid');
    const btn = document.getElementById('devlogMore');
    grid.innerHTML = '';
    const count = Math.min(devlogShown, DEVLOG.length);
    for (let i = 0; i < count; i++) grid.appendChild(buildDevlogItem(DEVLOG[i], i));
    const remaining = DEVLOG.length - devlogShown;
    btn.style.display = remaining <= 0 ? 'none' : 'block';
    btn.textContent = 'Показать ещё (' + remaining + ')';
}

let lbIndex = 0;
const lb = document.createElement('div');
lb.className = 'devlog-lb';
lb.innerHTML = `
    <div class="devlog-lb-media" id="lbMedia"></div>
    <button class="devlog-lb-close" id="lbClose"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    <button class="devlog-lb-prev" id="lbPrev"><svg viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6"/></svg></button>
    <button class="devlog-lb-next" id="lbNext"><svg viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6"/></svg></button>
`;
document.body.appendChild(lb);

function devlogOpenLb(index) {
    lbIndex = index;
    devlogUpdateLb();
    lb.classList.add('open');
}

function devlogUpdateLb() {
    const item = DEVLOG[lbIndex];
    const media = document.getElementById('lbMedia');
    media.innerHTML = '';
    if (item.t === 'img') {
        const img = document.createElement('img');
        img.src = 'assets/devlog/' + item.f;
        media.appendChild(img);
    } else {
        const vid = document.createElement('video');
        vid.src = 'assets/devlog/' + item.f;
        vid.controls = true;
        vid.autoplay = true;
        media.appendChild(vid);
    }
    const dateTag = document.createElement('span');
    dateTag.className = 'devlog-lb-date';
    dateTag.textContent = devlogDateLabel(item.f);
    media.appendChild(dateTag);
}

function devlogCloseLb() {
    lb.classList.remove('open');
    document.getElementById('lbMedia').innerHTML = '';
}

document.getElementById('lbClose').addEventListener('click', devlogCloseLb);
document.getElementById('lbPrev').addEventListener('click', () => { lbIndex = (lbIndex - 1 + DEVLOG.length) % DEVLOG.length; devlogUpdateLb(); });
document.getElementById('lbNext').addEventListener('click', () => { lbIndex = (lbIndex + 1) % DEVLOG.length; devlogUpdateLb(); });
lb.addEventListener('click', (e) => { if (e.target === lb) devlogCloseLb(); });
document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') devlogCloseLb();
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + DEVLOG.length) % DEVLOG.length; devlogUpdateLb(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % DEVLOG.length; devlogUpdateLb(); }
});

document.getElementById('devlogMore').addEventListener('click', () => { devlogShown += DEVLOG_BATCH; renderDevlog(); });

renderDevlog();