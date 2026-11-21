// Busca simples: esconde as seções que não contêm o texto digitado.
const busca = document.getElementById("busca");
const secoes = document.querySelectorAll("main section");
busca.addEventListener("input", () => {
  const termo = busca.value.trim().toLowerCase();
  secoes.forEach(s => {
    s.classList.toggle("oculto", termo !== "" && !s.textContent.toLowerCase().includes(termo));
  });
});

// ===== Voltar ao lobby: cortina de mar + som de onda =====
(function () {
  const mar = document.createElement("div");
  mar.className = "mar";
  mar.setAttribute("aria-hidden", "true");
  document.body.appendChild(mar);

  function volumeSalvo() {
    try { const v = JSON.parse(localStorage.getItem("mi-som")); return typeof v.vol === "number" ? v.vol : 0.6; }
    catch (e) { return 0.6; }
  }

  function somDoMar() {
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      const vol = volumeSalvo();
      if (!C || vol === 0) return;
      const c = new C(), t = c.currentTime, dur = 1.1;
      const master = c.createGain();
      master.gain.value = vol * vol * 1.3;
      master.connect(c.destination);
      const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const ruido = c.createBufferSource();
      ruido.buffer = buf;
      const f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(300, t);
      f.frequency.exponentialRampToValueAtTime(2400, t + 0.45);
      f.frequency.exponentialRampToValueAtTime(400, t + dur);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.35, t + 0.35);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      ruido.connect(f).connect(g).connect(master);
      ruido.start(t);
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
    } catch (e) {}
  }

  document.querySelectorAll('a[href="index.html"]').forEach(link => {
    link.addEventListener("click", e => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
      e.preventDefault();
      somDoMar();
      document.body.classList.add("saindo");
      const rapido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setTimeout(() => { window.location.href = link.href; }, rapido ? 150 : 1000);
    });
  });

  // Ao voltar pelo botão do navegador, abre a cortina de novo.
  window.addEventListener("pageshow", () => document.body.classList.remove("saindo"));
})();
