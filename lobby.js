// ===== Motor de áudio: tudo é gerado no navegador, sem arquivos =====
let ctx = null, master = null, ruidoBuf = null;
let amb = null, fontes = [], timerGaivota = null, ligando = false;

function lerSalvo() { try { return JSON.parse(localStorage.getItem("mi-som")) || {}; } catch (e) { return {}; } }
const salvo = lerSalvo();
let vol = typeof salvo.vol === "number" ? salvo.vol : 0.6;
let queroAmbiente = !!salvo.on;
function salvar() { try { localStorage.setItem("mi-som", JSON.stringify({ on: queroAmbiente, vol })); } catch (e) {} }

function audio() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    ctx = new C();
    master = ctx.createGain();
    master.connect(ctx.destination);
    aplicarVolume();
    ruidoBuf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const d = ruidoBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  return ctx;
}
function aplicarVolume() { if (master) master.gain.value = vol * vol * 1.3; }
// Só toca quando o navegador já liberou o áudio (depois de um clique).
function quando(fn) {
  const c = audio();
  if (!c) return;
  if (c.state === "running") fn(c);
  else c.resume().then(() => fn(c)).catch(() => {});
}

// ----- Som de onda ao abrir uma página -----
function somDoMar() {
  quando(c => {
    const t = c.currentTime, dur = 1.1;
    const ruido = c.createBufferSource();
    ruido.buffer = ruidoBuf;
    const filtro = c.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.setValueAtTime(300, t);
    filtro.frequency.exponentialRampToValueAtTime(2400, t + 0.45);
    filtro.frequency.exponentialRampToValueAtTime(400, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    ruido.connect(filtro).connect(g).connect(master);
    ruido.start(t, 0, dur);
    [523.25, 783.99].forEach((hz, i) => {
      const o = c.createOscillator(), og = c.createGain(), s = t + 0.05 + i * 0.12;
      o.type = "sine";
      o.frequency.value = hz;
      og.gain.setValueAtTime(0.0001, s);
      og.gain.exponentialRampToValueAtTime(0.18, s + 0.02);
      og.gain.exponentialRampToValueAtTime(0.0001, s + 0.7);
      o.connect(og).connect(master);
      o.start(s);
      o.stop(s + 0.75);
    });
  });
}

// ----- Som de leme ao passar o mouse: catraca + rangido de madeira -----
function somDoLeme() {
  if (!ctx || ctx.state !== "running") return;
  const c = ctx, t = c.currentTime;
  for (let i = 0; i < 8; i++) {
    const s = t + i * 0.075 + i * i * 0.004;
    const n = c.createBufferSource();
    n.buffer = ruidoBuf;
    const f = c.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 900 + Math.random() * 500;
    f.Q.value = 3;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, s);
    g.gain.exponentialRampToValueAtTime(0.5, s + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, s + 0.045);
    n.connect(f).connect(g).connect(master);
    n.start(s, Math.random() * 2, 0.06);
  }
  const o = c.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(65, t);
  o.frequency.linearRampToValueAtTime(105, t + 0.65);
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 320;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.09, t + 0.15);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
  o.connect(f).connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.72);
}

// ----- Som ambiente: ondas contínuas + gaivotas de vez em quando -----
function ligarAmbiente() {
  if (amb || ligando) return;
  ligando = true;
  quando(c => {
    ligando = false;
    if (!queroAmbiente || amb) return;
    const t = c.currentTime;
    amb = c.createGain();
    amb.gain.setValueAtTime(0, t);
    amb.gain.linearRampToValueAtTime(1, t + 2.5);
    amb.connect(master);
    const camada = (tipo, freq, q, base, prof, lfoHz) => {
      const n = c.createBufferSource();
      n.buffer = ruidoBuf;
      n.loop = true;
      const f = c.createBiquadFilter();
      f.type = tipo; f.frequency.value = freq; f.Q.value = q;
      const g = c.createGain();
      g.gain.value = base;
      const l = c.createOscillator();
      l.frequency.value = lfoHz;
      const lg = c.createGain();
      lg.gain.value = prof;
      l.connect(lg).connect(g.gain);
      n.connect(f).connect(g).connect(amb);
      n.start(); l.start();
      fontes.push(n, l);
    };
    camada("lowpass", 500, 0.7, 0.2, 0.16, 0.1);    // marulho grave, vai e vem
    camada("bandpass", 2200, 0.4, 0.05, 0.04, 0.13); // espuma
    proximaGaivota(2500);
  });
}
function desligarAmbiente() {
  clearTimeout(timerGaivota);
  if (!amb) return;
  const a = amb, fs = fontes, t = ctx.currentTime;
  amb = null; fontes = [];
  a.gain.cancelScheduledValues(t);
  a.gain.setValueAtTime(a.gain.value, t);
  a.gain.linearRampToValueAtTime(0, t + 0.6);
  setTimeout(() => { fs.forEach(x => { try { x.stop(); } catch (e) {} }); a.disconnect(); }, 700);
}
function proximaGaivota(espera) {
  clearTimeout(timerGaivota);
  timerGaivota = setTimeout(() => {
    if (!amb) return;
    gaivota();
    proximaGaivota(6000 + Math.random() * 9000);
  }, espera);
}
function gaivota() {
  const c = ctx, t = c.currentTime + 0.05;
  const n = 2 + Math.floor(Math.random() * 3), tom = 0.9 + Math.random() * 0.25;
  for (let i = 0; i < n; i++) {
    const s = t + i * 0.34;
    const o = c.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(1300 * tom, s);
    o.frequency.exponentialRampToValueAtTime(2300 * tom, s + 0.09);
    o.frequency.exponentialRampToValueAtTime(1150 * tom, s + 0.3);
    const f = c.createBiquadFilter();
    f.type = "bandpass"; f.frequency.value = 2000; f.Q.value = 2;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, s);
    g.gain.exponentialRampToValueAtTime(0.1, s + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, s + 0.3);
    o.connect(f).connect(g).connect(amb);
    o.start(s);
    o.stop(s + 0.32);
  }
}

// ===== Controle flutuante (ligar/desligar e volume) =====
const btn = document.getElementById("som-btn");
const rng = document.getElementById("som-vol");
function atualizarUI() {
  btn.setAttribute("aria-pressed", String(queroAmbiente));
  btn.setAttribute("aria-label", queroAmbiente ? "Desligar som ambiente" : "Ligar som ambiente");
}
rng.value = Math.round(vol * 100);
atualizarUI();
btn.addEventListener("click", () => {
  queroAmbiente = !queroAmbiente;
  queroAmbiente ? ligarAmbiente() : desligarAmbiente();
  salvar(); atualizarUI();
});
rng.addEventListener("input", () => { vol = rng.value / 100; aplicarVolume(); salvar(); });
// Se estava ligado na última visita, começa no primeiro toque (o navegador exige).
if (queroAmbiente) document.addEventListener("pointerdown", () => { if (queroAmbiente) ligarAmbiente(); }, { once: true });

// ===== Leme: som ao passar o mouse =====
let ultimoLeme = 0;
document.querySelectorAll(".leme").forEach(el => {
  el.addEventListener("mouseenter", () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const agora = Date.now();
    if (agora - ultimoLeme < 1500) return;
    ultimoLeme = agora;
    somDoLeme();
  });
});

// ===== Cortina de mar + som ao abrir outra página =====
document.querySelectorAll("a[data-som]").forEach(link => {
  link.addEventListener("click", e => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    somDoMar();
    document.body.classList.add("saindo");
    setTimeout(() => { window.location.href = link.href; }, 1000);
  });
});
window.addEventListener("pageshow", () => document.body.classList.remove("saindo"));
