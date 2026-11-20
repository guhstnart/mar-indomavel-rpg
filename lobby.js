// Som de onda + cortina de mar antes de abrir outra página.
function somDoMar() {
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    const ctx = new C(), t = ctx.currentTime, dur = 1.1;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const ruido = ctx.createBufferSource();
    ruido.buffer = buf;
    const filtro = ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.setValueAtTime(300, t);
    filtro.frequency.exponentialRampToValueAtTime(2400, t + 0.45);
    filtro.frequency.exponentialRampToValueAtTime(400, t + dur);
    const vol = ctx.createGain();
    vol.gain.setValueAtTime(0.0001, t);
    vol.gain.exponentialRampToValueAtTime(0.35, t + 0.35);
    vol.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    ruido.connect(filtro).connect(vol).connect(ctx.destination);
    ruido.start(t);
    [523.25, 783.99].forEach((hz, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), s = t + 0.05 + i * 0.12;
      o.type = "sine";
      o.frequency.value = hz;
      g.gain.setValueAtTime(0.0001, s);
      g.gain.exponentialRampToValueAtTime(0.18, s + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, s + 0.7);
      o.connect(g).connect(ctx.destination);
      o.start(s);
      o.stop(s + 0.75);
    });
  } catch (e) {}
}

document.querySelectorAll("a[data-som]").forEach(link => {
  link.addEventListener("click", e => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    somDoMar();
    document.body.classList.add("saindo");
    setTimeout(() => { window.location.href = link.href; }, 1000);
  });
});

// Ao voltar com o botão "voltar" do navegador, abre a cortina de novo.
window.addEventListener("pageshow", () => document.body.classList.remove("saindo"));
