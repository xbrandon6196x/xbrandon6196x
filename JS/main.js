// ── MODAL MONSTERMON ──────────────────────────
function abrirJuego() {
  document.getElementById('modal-juego').classList.add('open');
  document.body.style.overflow = 'hidden';
  resetearJuego();
  iniciarMonstermon();
}

function cerrarJuego(e, forzar = false) {
  if (!forzar && e && e.target !== document.getElementById('modal-juego')) return;
  document.getElementById('modal-juego').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') cerrarJuego(null, true);
});

// ── LÓGICA MONSTERMON ─────────────────────────
const MM = {
  mascotas: {
    'mm-hipodoge':  { nombre: 'Hipodoge',  img: 'mokepons_mokepon_hipodoge_attack.png' },
    'mm-capipepo':  { nombre: 'Capipepo',  img: 'mokepons_mokepon_capipepo_attack.png' },
    'mm-ratigueya': { nombre: 'Ratigueya', img: 'mokepons_mokepon_ratigueya_attack.png' },
  },
  ataques: ['PIEDRA','TIJERA','PAPEL'],
  emojis: { PIEDRA:'👊', TIJERA:'✌️', PAPEL:'🤚' },
  vidasJ: 3, vidasE: 3, ronda: 0, wins: 0, losses: 0, empates: 0,
  mascotaJ: null, mascotaE: null,
};

function aleatorio(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

function corazonesHTML(vidas) {
  let h = '';
  for (let i = 0; i < 3; i++) h += `<span class="mm-corazon ${i >= vidas ? 'perdido' : ''}">❤️</span>`;
  return h;
}

function resetearJuego() {
  MM.vidasJ = 3; MM.vidasE = 3; MM.ronda = 0;
  MM.wins = 0; MM.losses = 0; MM.empates = 0;
  MM.mascotaJ = null; MM.mascotaE = null;
  document.querySelectorAll('input[name="mm-mascota"]').forEach(r => r.checked = false);
  document.getElementById('mm-historial').innerHTML = '';
  document.getElementById('mm-flash').textContent = '';
  document.getElementById('mm-ataqueDisplay').textContent = '🤔';
  document.getElementById('mm-corazonesJ').innerHTML = '❤️❤️❤️';
  document.getElementById('mm-corazonesE').innerHTML = '❤️❤️❤️';
  ['mm-piedra','mm-tijera','mm-papel'].forEach(id => document.getElementById(id).disabled = false);
  document.getElementById('mm-selecciona-mascota').style.display = 'flex';
  document.getElementById('mm-batalla').style.display = 'none';
  document.getElementById('mm-final').style.display = 'none';
}

function iniciarMonstermon() {
  document.getElementById('mm-iniciar').onclick = () => {
    const sel = document.querySelector('input[name="mm-mascota"]:checked');
    if (!sel) { alert('¡Elige una mascota primero!'); return; }

    MM.mascotaJ = MM.mascotas[sel.id];
    const claves = Object.keys(MM.mascotas);
    MM.mascotaE = MM.mascotas[claves[aleatorio(0, 2)]];

    document.getElementById('mm-spriteJ').src = MM.mascotaJ.img;
    document.getElementById('mm-nombreJ').textContent = MM.mascotaJ.nombre;
    document.getElementById('mm-spriteE').src = MM.mascotaE.img;
    document.getElementById('mm-nombreE').textContent = MM.mascotaE.nombre;

    document.getElementById('mm-selecciona-mascota').style.display = 'none';
    document.getElementById('mm-batalla').style.display = 'flex';
  };

  ['piedra','tijera','papel'].forEach(a => {
    document.getElementById('mm-' + a).onclick = () => mmAtacar(a.toUpperCase());
  });

  document.getElementById('mm-reiniciar').onclick = () => {
    resetearJuego();
  };
}

function mmAtacar(ataque) {
  const ataqueE = MM.ataques[aleatorio(0, 2)];
  MM.ronda++;

  document.getElementById('mm-ataqueDisplay').textContent = MM.emojis[ataqueE] + ' ' + ataqueE;

  let res;
  if (ataque === ataqueE) res = 'EMPATE';
  else if (
    ataque==='PIEDRA'&&ataqueE==='TIJERA' ||
    ataque==='TIJERA'&&ataqueE==='PAPEL'  ||
    ataque==='PAPEL' &&ataqueE==='PIEDRA'
  ) res = 'GANASTE';
  else res = 'PERDISTE';

  const sJ = document.getElementById('mm-spriteJ');
  const sE = document.getElementById('mm-spriteE');

  if (res === 'GANASTE') {
    sJ.classList.add('atacando'); sE.classList.add('golpeado');
    MM.vidasE--; MM.wins++;
  } else if (res === 'PERDISTE') {
    sE.classList.add('atacando'); sJ.classList.add('golpeado');
    MM.vidasJ--; MM.losses++;
  } else {
    MM.empates++;
  }
  setTimeout(() => { sJ.classList.remove('atacando','golpeado'); sE.classList.remove('atacando','golpeado'); }, 500);

  document.getElementById('mm-corazonesJ').innerHTML = corazonesHTML(MM.vidasJ);
  document.getElementById('mm-corazonesE').innerHTML = corazonesHTML(MM.vidasE);

  const flash = document.getElementById('mm-flash');
  flash.textContent = res==='GANASTE' ? '¡GANASTE! 🎉' : res==='PERDISTE' ? '¡PERDISTE! 💀' : '¡EMPATE! 🤝';
  flash.className = 'mm-flash ' + (res==='GANASTE' ? 'ganaste' : res==='PERDISTE' ? 'perdiste' : 'empate');
  setTimeout(() => { flash.textContent = ''; flash.className = 'mm-flash'; }, 1500);

  // Historial
  const wrap = document.getElementById('mm-historial');
  const item = document.createElement('div');
  item.className = `mm-historial-item ${res.toLowerCase()}`;
  item.innerHTML = `
    <span class="h-ronda">Ronda ${MM.ronda}</span>
    <span class="h-ataques">${MM.emojis[ataque]} vs ${MM.emojis[ataqueE]}</span>
    <span class="h-res">${res}</span>`;
  wrap.prepend(item);

  if (MM.vidasJ === 0 || MM.vidasE === 0) {
    ['mm-piedra','mm-tijera','mm-papel'].forEach(id => document.getElementById(id).disabled = true);
    setTimeout(() => {
      document.getElementById('mm-batalla').style.display = 'none';
      const pf = document.getElementById('mm-final');
      pf.style.display = 'flex';
      const gano = MM.vidasE === 0;
      document.getElementById('mm-trofeo').textContent = gano ? '🏆' : '💀';
      document.getElementById('mm-msg-final').textContent = gano ? '¡GANASTE, CAMPEÓN!' : '¡PERDISTE! ¡Mejor suerte!';
      document.getElementById('mm-stat-r').textContent = MM.ronda;
      document.getElementById('mm-stat-w').textContent = MM.wins;
      document.getElementById('mm-stat-l').textContent = MM.losses;
      document.getElementById('mm-stat-e').textContent = MM.empates;
    }, 700);
  }
}

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