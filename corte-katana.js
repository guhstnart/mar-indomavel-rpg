// Corte de katana ao desbloquear a ficha.
// Basta carregar DEPOIS do script da ficha: <script src="corte-katana.js"></script>
(function () {
  const CSS = `
.corte-katana{position:fixed;inset:0;z-index:10001;overflow:hidden;pointer-events:auto}
.corte-katana .corte-metade{position:absolute;inset:0;animation-duration:.85s;animation-delay:.3s;animation-timing-function:cubic-bezier(.65,0,.25,1);animation-fill-mode:forwards;will-change:transform}
.corte-cima{clip-path:polygon(0 0,100% 0,100% 46%,0 54%);animation-name:corte-sobe}
.corte-baixo{clip-path:polygon(0 54%,100% 46%,100% 100%,0 100%);animation-name:corte-desce}
@keyframes corte-sobe{to{transform:translate(-1.5%,-62%)}}
@keyframes corte-desce{to{transform:translate(1.5%,62%)}}
.corte-brilho{position:absolute;inset:0;background:linear-gradient(#fff,#cfeeff);animation:corte-clarao .9s ease-out .3s both}
@keyframes corte-clarao{from{opacity:1}to{opacity:0}}
.corte-linha{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;filter:drop-shadow(0 0 4px #fff) drop-shadow(0 0 14px #7dd3fc);animation:corte-risca .28s ease-out forwards,corte-some .35s ease-in .3s forwards}
.corte-linha line{stroke:#fff;stroke-width:3;vector-effect:non-scaling-stroke;stroke-linecap:round}
@keyframes corte-risca{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes corte-some{to{opacity:0}}
`;
  const estilo = document.createElement("style");
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  // Volume escolhido pelo jogador no lobby (0 a 1). Em zero, fica mudo.
  function volumeSalvo() {
    try { const v = JSON.parse(localStorage.getItem("mi-som")); return typeof v.vol === "number" ? v.vol : 0.6; }
    catch (e) { return 0.6; }
  }

  // Som de corte estilo anime: "swish" rápido + "shing" metálico. Gerado no navegador.
  function somDoCorte() {
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      const vol = volumeSalvo();
      if (!C || vol === 0) return;
      const c = new C(), t = c.currentTime;
      const master = c.createGain();
      master.gain.value = vol * vol * 0.9; // suave: o volume do lobby manda
      master.connect(c.destination);

      // 1) Swish: ruído que sobe de grave para agudo enquanto o risco atravessa a tela
      const n = c.createBuffer(1, Math.floor(c.sampleRate * 0.4), c.sampleRate);
      const d = n.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const sw = c.createBufferSource();
      sw.buffer = n;
      const bp = c.createBiquadFilter();
      bp.type = "bandpass"; bp.Q.value = 1.2;
      bp.frequency.setValueAtTime(1200, t);
      bp.frequency.exponentialRampToValueAtTime(6500, t + 0.28);
      const sg = c.createGain();
      sg.gain.setValueAtTime(0.0001, t);
      sg.gain.exponentialRampToValueAtTime(0.28, t + 0.1);
      sg.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
      sw.connect(bp).connect(sg).connect(master);
      sw.start(t);

      // 2) Estalo do corte no fim do risco
      const k = c.createBufferSource();
      k.buffer = n;
      const hp = c.createBiquadFilter();
      hp.type = "highpass"; hp.frequency.value = 3500;
      const kg = c.createGain();
      kg.gain.setValueAtTime(0.0001, t + 0.26);
      kg.gain.exponentialRampToValueAtTime(0.22, t + 0.27);
      kg.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
      k.connect(hp).connect(kg).connect(master);
      k.start(t + 0.26, 0, 0.08);

      // 3) Shing: tom metálico que ressoa e some, como lâmina vibrando
      [2637, 3951, 5919, 7458].forEach((hz, i) => {
        const o = c.createOscillator(), og = c.createGain(), s = t + 0.27;
        o.type = "sine";
        o.frequency.setValueAtTime(hz * 0.97, s);
        o.frequency.exponentialRampToValueAtTime(hz, s + 0.04);
        og.gain.setValueAtTime(0.0001, s);
        og.gain.exponentialRampToValueAtTime(0.1 / Math.sqrt(i + 1), s + 0.01);
        og.gain.exponentialRampToValueAtTime(0.0001, s + 1.0 - i * 0.14);
        o.connect(og).connect(master);
        o.start(s);
        o.stop(s + 1.05);
      });

      setTimeout(() => { try { c.close(); } catch (e) {} }, 2500);
    } catch (e) {}
  }

  function cortar(abrirFicha) {
    const lock = document.getElementById("lock-screen");
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!lock || lock.hidden || reduzir) { abrirFicha(); return; }

    const senha = lock.querySelector("input");
    const wrap = document.createElement("div");
    wrap.className = "corte-katana";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<div class="corte-brilho"></div>';

    // Duas cópias da tela de senha: uma metade de cima e outra de baixo.
    ["cima", "baixo"].forEach(lado => {
      const copia = lock.cloneNode(true);
      copia.removeAttribute("id");
      copia.querySelectorAll("[id]").forEach(e => e.removeAttribute("id"));
      copia.setAttribute("inert", "");
      const campo = copia.querySelector("input");
      if (campo && senha) campo.value = senha.value;
      copia.classList.add("corte-metade", "corte-" + lado);
      wrap.appendChild(copia);
    });

    wrap.insertAdjacentHTML("beforeend",
      '<svg class="corte-linha" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="-2" y1="54" x2="102" y2="46"/></svg>');
    document.body.appendChild(wrap);
    somDoCorte();

    abrirFicha(); // a ficha já aparece por baixo e é revelada pelo corte
    setTimeout(() => wrap.remove(), 1300);
  }

  const original = window.unlockSheet;
  if (typeof original !== "function") return;
  window.unlockSheet = function (role) {
    cortar(() => original.call(window, role));
  };
})();
