// ── HAMBURGER MENU ────────────────────────────
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');

hamburger.addEventListener('click', () => sidebar.classList.toggle('active'));

sidebar.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 900) sidebar.classList.remove('active');
  });
});


// ── DARK / LIGHT MODE ─────────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const themeLabel  = document.getElementById('themeLabel');
const html        = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeUI(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeUI(next);
});

function updateThemeUI(theme) {
  const isDark = theme === 'dark';
  themeIcon.textContent  = isDark ? '☀️' : '🌙';
  // update i18n label based on current lang
  const lang = document.documentElement.getAttribute('data-lang') || 'es';
  themeLabel.textContent = isDark
    ? (lang === 'en' ? 'Light' : 'Claro')
    : (lang === 'en' ? 'Dark'  : 'Oscuro');
}


// ── LANGUAGE TOGGLE ───────────────────────────
const langToggle = document.getElementById('langToggle');
const langLabel  = document.getElementById('langLabel');
let currentLang  = localStorage.getItem('lang') || 'es';

applyLang(currentLang);

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  localStorage.setItem('lang', currentLang);
  applyLang(currentLang);
});

function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  langLabel.textContent = lang === 'es' ? 'English' : 'Español';

  document.querySelectorAll('.i18n').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) el.textContent = text;
  });

  // Re-sync theme label
  updateThemeUI(html.getAttribute('data-theme'));
}


// ── ABOUT PANELS ──────────────────────────────
// "Personalmente" is shown by default on load
function showPanel(type, e) {
  ['personal', 'work', 'both'].forEach(id => {
    document.getElementById('panel-' + id).classList.remove('visible');
  });

  document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('panel-' + type).classList.add('visible');

  // Mark the button that was clicked as active
  const btn = document.getElementById('btn-' + type);
  if (btn) btn.classList.add('active');

  setTimeout(() => {
    document.getElementById('panel-' + type)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}


// ── MUSIC PLAYER ──────────────────────────────
const music        = document.getElementById('bg-music');
const playBtn      = document.getElementById('musicPlayBtn');
const progressBar  = document.getElementById('musicProgress');
const timeDisplay  = document.getElementById('musicTime');
const volumeSlider = document.getElementById('musicVolume');

let isPlaying = false;
music.volume  = 0.1;

playBtn.addEventListener('click', togglePlay);

function togglePlay() {
  if (isPlaying) {
    music.pause();
    playBtn.textContent = '▶';
  } else {
    music.play().catch(() => {}); // handle browser autoplay policy
    playBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
}

// Update progress bar as song plays
music.addEventListener('timeupdate', () => {
  if (!music.duration) return;
  const pct = (music.currentTime / music.duration) * 100;
  progressBar.value = pct;
  timeDisplay.textContent = formatTime(music.currentTime);
});

// Seek
progressBar.addEventListener('input', () => {
  if (!music.duration) return;
  music.currentTime = (progressBar.value / 100) * music.duration;
});

// Volume
volumeSlider.addEventListener('input', () => {
  music.volume = volumeSlider.value / 100;
});

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}


// ── SIDEBAR HIGHLIGHT ON SCROLL ───────────────
const allSections = document.querySelectorAll('[id]');

window.addEventListener('scroll', () => {
  let current = '';

  allSections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });

  sidebar.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    const active = href === '#' + current;
    a.style.borderLeftColor = active ? '#fff' : 'transparent';
    a.style.background      = active ? 'rgba(255,255,255,0.15)' : '';
  });
});