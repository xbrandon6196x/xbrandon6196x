// ── MODAL MONSTERMON ──────────────────────────
const modalJuego = document.getElementById('modal-juego');
const modalClose = document.querySelector('.modal-close');
let lastFocusedBeforeModal = null;

function abrirJuego() {
  lastFocusedBeforeModal = document.activeElement;
  modalJuego.classList.add('open');
  modalJuego.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  resetearJuego();
  iniciarMonstermon();
  setTimeout(() => modalClose.focus(), 0);
}

function cerrarJuego(e, forzar = false) {
  if (!forzar && e && e.target !== modalJuego) return;
  modalJuego.classList.remove('open');
  modalJuego.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedBeforeModal) lastFocusedBeforeModal.focus();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalJuego.classList.contains('open')) cerrarJuego(null, true);
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

hamburger.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

sidebar.querySelectorAll('a, button').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Abrir menú');
    }
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
  themeToggle.setAttribute('aria-label', isDark
    ? (lang === 'en' ? 'Switch to light mode' : 'Activar modo claro')
    : (lang === 'en' ? 'Switch to dark mode' : 'Activar modo oscuro'));
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
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  langLabel.textContent = lang === 'es' ? 'English' : 'Español';
  langToggle.setAttribute('aria-label', lang === 'es'
    ? 'Cambiar idioma a inglés'
    : 'Switch language to Spanish');

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

  document.querySelectorAll('.choice-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });

  document.getElementById('panel-' + type).classList.add('visible');

  // Mark the button that was clicked as active
  const btn = document.getElementById('btn-' + type);
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }

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
    playBtn.setAttribute('aria-label', 'Reproducir música');
  } else {
    music.play().catch(() => {}); // handle browser autoplay policy
    playBtn.textContent = '⏸';
    playBtn.setAttribute('aria-label', 'Pausar música');
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


// ── AMBIENT SNAKE ───────────────────────────
const snakeCanvas = document.getElementById('ambientSnake');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (snakeCanvas && !reduceMotion.matches) {
  const ctx = snakeCanvas.getContext('2d');
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  let snake = [];
  let direction = directions[0];
  let target = { x: 0, y: 0 };
  let targetPulse = 1;
  let cols = 0;
  let rows = 0;
  let grid = 18;
  let snakeLength = 28;
  let lastStep = 0;
  let snakeFrame = null;
  let resizeTimer = null;
  let stuckSteps = 0;
  let maxSnakeLength = 42;

  function setupSnake() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    grid = window.innerWidth < 700 ? 16 : 18;
    cols = Math.ceil(window.innerWidth / grid);
    rows = Math.ceil(window.innerHeight / grid);
    snakeLength = Math.min(42, Math.max(18, Math.floor(cols * rows * 0.012)));
    maxSnakeLength = Math.min(54, Math.max(snakeLength, Math.floor(cols * rows * 0.05)));

    snakeCanvas.width = Math.ceil(window.innerWidth * dpr);
    snakeCanvas.height = Math.ceil(window.innerHeight * dpr);
    snakeCanvas.style.width = `${window.innerWidth}px`;
    snakeCanvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const start = {
      x: Math.floor(cols * 0.18),
      y: Math.floor(rows * 0.28),
    };
    snake = Array.from({ length: snakeLength }, (_, index) => ({
      x: wrap(start.x - index, cols),
      y: start.y,
    }));
    direction = directions[0];
    stuckSteps = 0;
    lastStep = 0;
    chooseTarget();
  }

  function wrap(value, max) {
    return (value + max) % max;
  }

  function cellKey(cell) {
    return `${cell.x},${cell.y}`;
  }

  function chooseTarget() {
    const occupied = new Set(snake.map(part => `${part.x},${part.y}`));
    const head = snake[0] || { x: 0, y: 0 };
    let nextTarget = target;
    let bestDistance = -1;

    for (let attempts = 0; attempts < 90; attempts++) {
      const candidate = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
      };
      const key = cellKey(candidate);
      const distance = wrappedDistance(head, candidate);

      if (!occupied.has(key) && distance > bestDistance) {
        nextTarget = candidate;
        bestDistance = distance;
      }

      if (bestDistance > Math.max(cols, rows) * 0.45) break;
    }

    target = nextTarget;
    targetPulse = 1;
  }

  function nextCell(from, move) {
    return {
      x: wrap(from.x + move.x, cols),
      y: wrap(from.y + move.y, rows),
    };
  }

  function isOpposite(a, b) {
    return a.x + b.x === 0 && a.y + b.y === 0;
  }

  function wrappedDistance(a, b) {
    const dx = Math.min(Math.abs(a.x - b.x), cols - Math.abs(a.x - b.x));
    const dy = Math.min(Math.abs(a.y - b.y), rows - Math.abs(a.y - b.y));
    return dx + dy;
  }

  function findPathToTarget() {
    const head = snake[0];
    const startKey = cellKey(head);
    const targetKey = cellKey(target);
    const blocked = new Set(snake.slice(0, -1).map(cellKey));
    const queue = [head];
    const visited = new Set([startKey]);
    const cameFrom = new Map([[startKey, null]]);

    for (let index = 0; index < queue.length; index++) {
      const current = queue[index];
      const currentKey = cellKey(current);

      if (currentKey === targetKey) break;

      directions.forEach(move => {
        if (currentKey === startKey && isOpposite(move, direction)) return;

        const cell = nextCell(current, move);
        const key = cellKey(cell);
        if (visited.has(key) || blocked.has(key)) return;

        visited.add(key);
        cameFrom.set(key, { prev: currentKey, move });
        queue.push(cell);
      });
    }

    if (!cameFrom.has(targetKey)) return null;

    let stepKey = targetKey;
    let step = cameFrom.get(stepKey);

    while (step && step.prev !== startKey) {
      stepKey = step.prev;
      step = cameFrom.get(stepKey);
    }

    return step ? step.move : null;
  }

  function bodyClearance(cell) {
    const body = snake.slice(0, -1);
    if (!body.length) return cols + rows;

    return body.reduce((best, part) => {
      return Math.min(best, wrappedDistance(cell, part));
    }, cols + rows);
  }

  function chooseSafeMove() {
    const head = snake[0];
    const body = new Set(snake.slice(0, -1).map(cellKey));
    const choices = directions
      .filter(move => !isOpposite(move, direction))
      .map(move => ({ move, cell: nextCell(head, move) }))
      .filter(choice => !body.has(cellKey(choice.cell)));

    if (!choices.length) return null;

    return choices.sort((a, b) => {
      const targetScore = wrappedDistance(a.cell, target) - wrappedDistance(b.cell, target);
      const clearanceScore = bodyClearance(b.cell) - bodyClearance(a.cell);
      return targetScore || clearanceScore;
    })[0].move;
  }

  function resetSnake() {
    const start = {
      x: Math.floor(cols * (0.2 + Math.random() * 0.35)),
      y: Math.floor(rows * (0.2 + Math.random() * 0.35)),
    };

    direction = directions[Math.floor(Math.random() * directions.length)];
    snake = Array.from({ length: snakeLength }, (_, index) => ({
      x: wrap(start.x - direction.x * index, cols),
      y: wrap(start.y - direction.y * index, rows),
    }));
    stuckSteps = 0;
    chooseTarget();
  }

  function moveSnake() {
    if (!snake.length) resetSnake();

    const head = snake[0];
    const body = new Set(snake.slice(0, -1).map(cellKey));
    const plannedMove = findPathToTarget() || chooseSafeMove();

    if (!plannedMove) {
      stuckSteps++;
      if (stuckSteps > 2) resetSnake();
      return;
    }

    direction = plannedMove;
    const nextHead = nextCell(head, direction);

    if (body.has(cellKey(nextHead))) {
      stuckSteps++;
      if (stuckSteps > 2) resetSnake();
      return;
    }

    snake.unshift(nextHead);
    stuckSteps = 0;

    if (snake[0].x === target.x && snake[0].y === target.y) {
      snakeLength = Math.min(maxSnakeLength, snakeLength + 1);
      chooseTarget();
    }
    while (snake.length > snakeLength) snake.pop();
  }

  function drawSnake() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const bodyColor = isDark ? 'rgba(120, 255, 142,' : 'rgba(0, 198, 1,';
    const headColor = isDark ? 'rgba(170, 255, 185, 0.45)' : 'rgba(0, 153, 0, 0.38)';
    const targetColor = isDark ? 'rgba(155, 255, 170, 0.48)' : 'rgba(0, 198, 1, 0.34)';
    const targetCoreColor = isDark ? 'rgba(230, 255, 235, 0.78)' : 'rgba(255, 255, 255, 0.82)';
    const targetGlowColor = isDark ? 'rgba(120, 255, 142, 0.14)' : 'rgba(0, 198, 1, 0.12)';
    const gap = Math.max(3, Math.floor(grid * 0.18));
    const size = grid - gap;

    const pulse = (Math.sin(targetPulse) + 1) / 2;
    const pulseSize = grid * (1.25 + pulse * 0.42);
    const targetX = target.x * grid;
    const targetY = target.y * grid;
    ctx.fillStyle = targetGlowColor;
    ctx.fillRect(targetX + (grid - pulseSize) / 2, targetY + grid * 0.34, pulseSize, grid * 0.32);
    ctx.fillRect(targetX + grid * 0.34, targetY + (grid - pulseSize) / 2, grid * 0.32, pulseSize);

    ctx.fillStyle = targetColor;
    ctx.fillRect(targetX + grid * 0.36, targetY + grid * 0.04, grid * 0.28, grid * 0.92);
    ctx.fillRect(targetX + grid * 0.04, targetY + grid * 0.36, grid * 0.92, grid * 0.28);
    ctx.fillStyle = targetCoreColor;
    ctx.fillRect(targetX + grid * 0.4, targetY + grid * 0.4, grid * 0.2, grid * 0.2);
    targetPulse += 0.14;

    snake.forEach((part, index) => {
      const opacity = Math.max(0.12, 0.32 - index * 0.006);
      ctx.fillStyle = index === 0 ? headColor : `${bodyColor} ${opacity})`;
      ctx.fillRect(part.x * grid + gap / 2, part.y * grid + gap / 2, size, size);
    });

    const head = snake[0];
    ctx.fillStyle = isDark ? 'rgba(15, 15, 15, 0.8)' : 'rgba(255, 255, 255, 0.86)';
    ctx.fillRect(
      head.x * grid + grid * 0.36 + direction.x * grid * 0.18,
      head.y * grid + grid * 0.36 + direction.y * grid * 0.18,
      grid * 0.28,
      grid * 0.28
    );
  }

  function animateSnake(timestamp) {
    if (timestamp - lastStep > 92) {
      moveSnake();
      drawSnake();
      lastStep = timestamp;
    }
    snakeFrame = requestAnimationFrame(animateSnake);
  }

  function startSnake() {
    setupSnake();
    cancelAnimationFrame(snakeFrame);
    snakeFrame = requestAnimationFrame(animateSnake);
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(startSnake, 160);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(snakeFrame);
    else startSnake();
  });

  reduceMotion.addEventListener('change', event => {
    if (event.matches) {
      cancelAnimationFrame(snakeFrame);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    } else {
      startSnake();
    }
  });

  startSnake();
}


// ── SIDEBAR HIGHLIGHT ON SCROLL ───────────────
const allSections = document.querySelectorAll('.page-content > section[id], .page-content > .about-choice[id]');

window.addEventListener('scroll', () => {
  let current = '';

  allSections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });

  sidebar.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    const active = href === '#' + current;
    a.style.borderLeftColor = active ? '#fff' : 'transparent';
    a.style.background      = active ? 'rgba(255,255,255,0.15)' : '';
  });
});
