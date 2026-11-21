// Corte duplo de katana ao desbloquear a ficha: um corte azul e, em seguida, um corte rosa/vermelho,
// formando um "X" (o Corte em Cruz do Nitoryu). A tela se parte em quatro pedaços.
// Basta carregar DEPOIS do script da ficha: <script src="corte-katana.js"></script>
(function () {
  const CSS = `
.corte-katana{position:fixed;inset:0;z-index:10001;overflow:hidden;pointer-events:auto}
.corte-katana .corte-peca{position:absolute;inset:0;animation-duration:.85s;animation-delay:.55s;animation-timing-function:cubic-bezier(.65,0,.25,1);animation-fill-mode:forwards;will-change:transform}
.corte-p-cima{clip-path:polygon(0 0,100% 0,100% 10%,50% 50%,0 10%);animation-name:corte-sobe}
.corte-p-baixo{clip-path:polygon(0 100%,100% 100%,100% 90%,50% 50%,0 90%);animation-name:corte-desce}
.corte-p-esq{clip-path:polygon(0 10%,50% 50%,0 90%);animation-name:corte-esq}
.corte-p-dir{clip-path:polygon(100% 10%,100% 90%,50% 50%);animation-name:corte-dir}
@keyframes corte-sobe{to{transform:translateY(-70%) rotate(-1.5deg)}}
@keyframes corte-desce{to{transform:translateY(70%) rotate(-1.5deg)}}
@keyframes corte-esq{to{transform:translateX(-75%) rotate(1.5deg)}}
@keyframes corte-dir{to{transform:translateX(75%) rotate(1.5deg)}}
.corte-brilho{position:absolute;inset:0;background:linear-gradient(135deg,#cfeeff,#ffd1e6);animation:corte-clarao .9s ease-out .55s both}
@keyframes corte-clarao{0%{opacity:0}1%{opacity:1}100%{opacity:0}}
.corte-fl{position:absolute;inset:0;opacity:0}
.corte-fl-a{background:#7dd3fc;animation:corte-fl .3s ease-out .12s both}
.corte-fl-b{background:#f9a8d4;animation:corte-fl .3s ease-out .38s both}
@keyframes corte-fl{0%{opacity:0}30%{opacity:.25}100%{opacity:0}}
.corte-risco{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.corte-risco line{vector-effect:non-scaling-stroke;stroke-linecap:round}
.corte-risco .base{stroke-width:7;opacity:.6}
.corte-risco .nucleo{stroke:#fff;stroke-width:2.5}
.corte-a{filter:drop-shadow(0 0 4px #fff) drop-shadow(0 0 14px #38bdf8);animation:corte-risca-a .22s ease-out forwards,corte-some .35s ease-in .55s forwards}
.corte-a .base{stroke:#38bdf8}
.corte-b{filter:drop-shadow(0 0 4px #fff) drop-shadow(0 0 12px #f472b6) drop-shadow(0 0 22px #ef4444);animation:corte-risca-b .22s ease-out .26s both,corte-some .35s ease-in .55s forwards}
.corte-b .base{stroke:#f472b6}
@keyframes corte-risca-a{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes corte-risca-b{from{clip-path:inset(0 0 0 100%)}to{clip-path:inset(0 0 0 0)}}
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

  // Dois golpes de katana estilo anime: "swish" + estalo + "shing". O segundo é um pouco mais agudo.
  function somDoCorte() {
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      const vol = volumeSalvo();
      if (!C || vol === 0) return;
      const c = new C(), t = c.currentTime;
      const master = c.createGain();
      master.gain.value = vol * vol * 0.9; // suave: o volume do lobby manda
      master.connect(c.destination);

      const n = c.createBuffer(1, Math.floor(c.sampleRate * 0.4), c.sampleRate);
      const d = n.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

      const golpe = (t0, k, dur) => {
        // Swish: ruído que sobe de grave para agudo enquanto o risco atravessa a tela
        const sw = c.createBufferSource();
        sw.buffer = n;
        const bp = c.createBiquadFilter();
        bp.type = "bandpass"; bp.Q.value = 1.2;
        bp.frequency.setValueAtTime(1200 * k, t0);
        bp.frequency.exponentialRampToValueAtTime(6500, t0 + 0.2);
        const sg = c.createGain();
        sg.gain.setValueAtTime(0.0001, t0);
        sg.gain.exponentialRampToValueAtTime(0.26, t0 + 0.08);
        sg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.26);
        sw.connect(bp).connect(sg).connect(master);
        sw.start(t0, 0, 0.3);

        // Estalo do corte no fim do risco
        const kk = c.createBufferSource();
        kk.buffer = n;
        const hp = c.createBiquadFilter();
        hp.type = "highpass"; hp.frequency.value = 3500;
        const kg = c.createGain();
        kg.gain.setValueAtTime(0.0001, t0 + 0.19);
        kg.gain.exponentialRampToValueAtTime(0.2, t0 + 0.2);
        kg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.25);
        kk.connect(hp).connect(kg).connect(master);
        kk.start(t0 + 0.19, 0, 0.08);

        // Shing: tom metálico que ressoa e some, como lâmina vibrando
        [2637, 3951, 5919, 7458].forEach((hz, i) => {
          const o = c.createOscillator(), og = c.createGain(), s = t0 + 0.2, f = hz * k;
          o.type = "sine";
          o.frequency.setValueAtTime(f * 0.97, s);
          o.frequency.exponentialRampToValueAtTime(f, s + 0.04);
          og.gain.setValueAtTime(0.0001, s);
          og.gain.exponentialRampToValueAtTime(0.09 / Math.sqrt(i + 1), s + 0.01);
          og.gain.exponentialRampToValueAtTime(0.0001, s + dur - i * 0.08);
          o.connect(og).connect(master);
          o.start(s);
          o.stop(s + dur + 0.05);
        });
      };

      golpe(t, 1, 0.55);          // 1º corte (azul)
      golpe(t + 0.26, 1.19, 1.1); // 2º corte (rosa), mais agudo e que ressoa mais

      setTimeout(() => { try { c.close(); } catch (e) {} }, 2800);
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

    // Quatro cópias da tela de senha, uma para cada pedaço do "X".
    ["cima", "baixo", "esq", "dir"].forEach(lado => {
      const copia = lock.cloneNode(true);
      copia.removeAttribute("id");
      copia.querySelectorAll("[id]").forEach(e => e.removeAttribute("id"));
      copia.setAttribute("inert", "");
      const campo = copia.querySelector("input");
      if (campo && senha) campo.value = senha.value;
      copia.classList.add("corte-peca", "corte-p-" + lado);
      wrap.appendChild(copia);
    });

    const risco = (cls, x1, y1, x2, y2) =>
      '<svg class="corte-risco ' + cls + '" viewBox="0 0 100 100" preserveAspectRatio="none">' +
      '<line class="base" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>' +
      '<line class="nucleo" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/></svg>';

    wrap.insertAdjacentHTML("beforeend",
      '<div class="corte-fl corte-fl-a"></div><div class="corte-fl corte-fl-b"></div>' +
      risco("corte-a", -2, 8.4, 102, 91.6) +   // 1º corte: cima-esquerda para baixo-direita (azul)
      risco("corte-b", 102, 8.4, -2, 91.6));   // 2º corte: cima-direita para baixo-esquerda (rosa)
    document.body.appendChild(wrap);
    somDoCorte();

    abrirFicha(); // a ficha já aparece por baixo e é revelada pelos pedaços que se afastam
    setTimeout(() => wrap.remove(), 1550);
  }

  const original = window.unlockSheet;
  if (typeof original !== "function") return;
  window.unlockSheet = function (role) {
    cortar(() => original.call(window, role));
  };
})();
