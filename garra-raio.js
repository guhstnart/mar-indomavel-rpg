// Arranhão de garras com raios azuis ao desbloquear a ficha do Alpha.
// Carregue DEPOIS do script da ficha: <script src="garra-raio.js"></script>
(function () {
  const CSS = `
.garra-wrap{position:fixed;inset:0;z-index:10001;overflow:hidden;pointer-events:auto}
.garra-wrap .garra-faixa{position:absolute;inset:0;animation-duration:.85s;animation-delay:.42s;animation-timing-function:cubic-bezier(.6,0,.3,1);animation-fill-mode:forwards;will-change:transform,opacity}
.garra-f0{clip-path:polygon(0 0,8% 0,44.4% 100%,0 100%);animation-name:garra-solta-a}
.garra-f1{clip-path:polygon(8% 0,30% 0,66.4% 100%,44.4% 100%);animation-name:garra-solta-b}
.garra-f2{clip-path:polygon(30% 0,52% 0,88.4% 100%,66.4% 100%);animation-name:garra-solta-a}
.garra-f3{clip-path:polygon(52% 0,100% 0,100% 100%,88.4% 100%);animation-name:garra-solta-b}
@keyframes garra-solta-a{to{transform:translate(-12%,-26%);opacity:0}}
@keyframes garra-solta-b{to{transform:translate(12%,26%);opacity:0}}
.garra-brilho{position:absolute;inset:0;background:linear-gradient(135deg,#e6f8ff,#7dd3fc);animation:garra-clarao .9s ease-out .42s both}
@keyframes garra-clarao{from{opacity:1}to{opacity:0}}
.garra-flash{position:absolute;inset:0;background:#bfeaff;opacity:0;animation:garra-flash .3s ease-out both}
@keyframes garra-flash{30%{opacity:.28}100%{opacity:0}}
.garra-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;filter:drop-shadow(0 0 3px #fff) drop-shadow(0 0 10px #38bdf8) drop-shadow(0 0 22px #0ea5e9);animation:garra-risca .18s ease-out var(--d) both,garra-some .4s ease-in calc(.55s + var(--d)) forwards}
@keyframes garra-risca{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes garra-some{to{opacity:0}}
.garra-marca{fill:#eaf9ff}
.garra-raio,.garra-nucleo,.garra-ramo{fill:none;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke;animation:garra-pisca .26s steps(1) 3}
.garra-raio{stroke:#38bdf8;stroke-width:4}
.garra-nucleo{stroke:#fff;stroke-width:1.6}
.garra-ramo{stroke:#7dd3fc;stroke-width:1.8}
@keyframes garra-pisca{0%,100%{opacity:1}20%{opacity:.35}40%{opacity:1}60%{opacity:.5}80%{opacity:.95}}
`;
  const estilo = document.createElement("style");
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  // ----- Geometria: três riscos paralelos, de cima-esquerda para baixo-direita -----
  const K = 0.364;               // inclinação: quanto o risco anda em x a cada 1 em y
  const RISCOS = [8, 30, 52];    // onde cada risco cruza o topo (em % da largura)
  const pt = (x, y) => x.toFixed(2) + "," + y.toFixed(2);

  function raioPts(a, passos, jit) {
    const p = [];
    for (let i = 0; i <= passos; i++) {
      const y = -8 + (116 * i) / passos;
      const desvio = i === 0 || i === passos ? 0 : (Math.random() - 0.5) * jit;
      p.push(pt(a + K * y + desvio, y));
    }
    return p.join(" ");
  }
  function ramoPts(a) {
    const y0 = 8 + Math.random() * 84, dir = Math.random() < 0.5 ? -1 : 1;
    let x = a + K * y0, y = y0;
    const p = [pt(x, y)], n = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      x += dir * (2 + Math.random() * 3.5);
      y += (Math.random() - 0.3) * 6;
      p.push(pt(x, y));
    }
    return p.join(" ");
  }
  function marca(a) { // marca de garra afilada nas pontas
    const x0 = a + K * -10, y0 = -10, x1 = a + K * 110, y1 = 110, mx = (x0 + x1) / 2, w = 1.4;
    return `M${pt(x0, y0)}Q${pt(mx - w, 50)} ${pt(x1, y1)}Q${pt(mx + w, 50)} ${pt(x0, y0)}Z`;
  }
  function svgDoRisco(a, atraso) {
    let s = `<svg class="garra-svg" style="--d:${atraso}s" viewBox="0 0 100 100" preserveAspectRatio="none">`;
    s += `<path class="garra-marca" d="${marca(a)}"/>`;
    s += `<polyline class="garra-raio" points="${raioPts(a, 14, 3.4)}"/>`;
    s += `<polyline class="garra-nucleo" points="${raioPts(a, 14, 2.2)}"/>`;
    for (let i = 0; i < 3; i++) s += `<polyline class="garra-ramo" points="${ramoPts(a)}"/>`;
    return s + "</svg>";
  }

  // ----- Som: arranhões + estalos elétricos + brilho agradável (sem trovão) -----
  function volumeSalvo() {
    try { const v = JSON.parse(localStorage.getItem("mi-som")); return typeof v.vol === "number" ? v.vol : 0.6; }
    catch (e) { return 0.6; }
  }
  function somDaGarra() {
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      const vol = volumeSalvo();
      if (!C || vol === 0) return;
      const c = new C(), t = c.currentTime;
      const master = c.createGain();
      master.gain.value = vol * vol * 0.9;
      const suave = c.createBiquadFilter();
      suave.type = "lowpass"; suave.frequency.value = 9000;
      master.connect(suave).connect(c.destination);

      const base = c.createBuffer(1, c.sampleRate, c.sampleRate);
      const d = base.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const ruido = (ini, dur, tipo, freq, q, ganho) => {
        const s = c.createBufferSource();
        s.buffer = base;
        const f = c.createBiquadFilter();
        f.type = tipo; f.frequency.value = freq; f.Q.value = q;
        const g = c.createGain();
        g.gain.setValueAtTime(0.0001, ini);
        g.gain.exponentialRampToValueAtTime(ganho, ini + Math.min(0.01, dur / 3));
        g.gain.exponentialRampToValueAtTime(0.0001, ini + dur);
        s.connect(f).connect(g).connect(master);
        s.start(ini, Math.random() * 0.7, dur + 0.02);
      };

      // 1) Três arranhões rápidos (chiado agudo + "zzt" descendente)
      [0, 0.08, 0.16].forEach(dl => {
        ruido(t + dl, 0.16, "highpass", 3500, 0.7, 0.16);
        const o = c.createOscillator(), bp = c.createBiquadFilter(), g = c.createGain();
        o.type = "sawtooth";
        o.frequency.setValueAtTime(3200, t + dl);
        o.frequency.exponentialRampToValueAtTime(900, t + dl + 0.14);
        bp.type = "bandpass"; bp.frequency.value = 2400; bp.Q.value = 4;
        g.gain.setValueAtTime(0.0001, t + dl);
        g.gain.exponentialRampToValueAtTime(0.07, t + dl + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dl + 0.16);
        o.connect(bp).connect(g).connect(master);
        o.start(t + dl);
        o.stop(t + dl + 0.18);
      });

      // 2) Estalos elétricos espalhados, como faíscas
      for (let i = 0; i < 20; i++) {
        ruido(t + 0.04 + Math.random() * 0.65, 0.006 + Math.random() * 0.014,
              "bandpass", 3000 + Math.random() * 4500, 2, 0.08 + Math.random() * 0.12);
      }

      // 3) "Zing" de carga subindo
      const z = c.createOscillator(), zg = c.createGain();
      z.type = "sine";
      z.frequency.setValueAtTime(600, t + 0.05);
      z.frequency.exponentialRampToValueAtTime(3200, t + 0.33);
      zg.gain.setValueAtTime(0.0001, t + 0.05);
      zg.gain.exponentialRampToValueAtTime(0.05, t + 0.2);
      zg.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);
      z.connect(zg).connect(master);
      z.start(t + 0.05);
      z.stop(t + 0.4);

      // 4) Brilho elétrico: zumbido agudo com vibrato rápido que se apaga
      [1760, 2637].forEach((hz, i) => {
        const o = c.createOscillator(), l = c.createOscillator(), lg = c.createGain(), g = c.createGain(), s = t + 0.22;
        o.type = "sine"; o.frequency.value = hz;
        l.frequency.value = 30; lg.gain.value = hz * 0.02;
        l.connect(lg).connect(o.frequency);
        g.gain.setValueAtTime(0.0001, s);
        g.gain.exponentialRampToValueAtTime(0.05 / (i + 1), s + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, s + 0.75);
        o.connect(g).connect(master);
        o.start(s); l.start(s);
        o.stop(s + 0.8); l.stop(s + 0.8);
      });

      setTimeout(() => { try { c.close(); } catch (e) {} }, 2500);
    } catch (e) {}
  }

  // ----- Animação: a tela de senha é cortada em faixas pelos riscos -----
  function garrar(abrirFicha) {
    const lock = document.getElementById("lock-screen");
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!lock || lock.hidden || reduzir) { abrirFicha(); return; }

    const senha = lock.querySelector("input");
    const wrap = document.createElement("div");
    wrap.className = "garra-wrap";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<div class="garra-brilho"></div>';

    for (let i = 0; i < 4; i++) {
      const copia = lock.cloneNode(true);
      copia.removeAttribute("id");
      copia.querySelectorAll("[id]").forEach(e => e.removeAttribute("id"));
      copia.setAttribute("inert", "");
      const campo = copia.querySelector("input");
      if (campo && senha) campo.value = senha.value;
      copia.classList.add("garra-faixa", "garra-f" + i);
      wrap.appendChild(copia);
    }
    wrap.insertAdjacentHTML("beforeend", '<div class="garra-flash"></div>');
    RISCOS.forEach((a, i) => wrap.insertAdjacentHTML("beforeend", svgDoRisco(a, i * 0.08)));

    document.body.appendChild(wrap);
    somDaGarra();
    abrirFicha(); // a ficha já aparece por baixo e é revelada pelas faixas
    setTimeout(() => wrap.remove(), 1450);
  }

  const original = window.unlockSheet;
  if (typeof original !== "function") return;
  window.unlockSheet = function (role) {
    garrar(() => original.call(window, role));
  };
})();
