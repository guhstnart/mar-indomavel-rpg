// Mordida de lobo com névoa mística roxa ao desbloquear a ficha do Soul Henri.
// Carregue DEPOIS do script da ficha: <script src="mordida-nevoa.js"></script>
(function () {
  const CSS = `
.mord-wrap{position:fixed;inset:0;z-index:10001;overflow:hidden;pointer-events:auto}
.mord-brilho{position:absolute;inset:0;background:linear-gradient(#f3e8ff,#b57cff);animation:mord-clarao .9s ease-out .12s both}
@keyframes mord-clarao{from{opacity:1}to{opacity:0}}
.mord-metade{position:absolute;inset:0;animation-duration:.95s;animation-delay:.12s;animation-timing-function:cubic-bezier(.5,0,.2,1);animation-fill-mode:forwards;will-change:transform}
.mord-metade>.lock-overlay,.mord-metade>div:first-child{position:absolute;inset:0}
.mord-metade svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.mord-cima{animation-name:mord-cima}
.mord-baixo{animation-name:mord-baixo}
@keyframes mord-cima{0%{transform:translateY(0)}12%{transform:translateY(2.4%)}100%{transform:translateY(-80%)}}
@keyframes mord-baixo{0%{transform:translateY(0)}12%{transform:translateY(-2.4%)}100%{transform:translateY(80%)}}
.mord-dente{stroke:#b57cff;stroke-width:1.6;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.mord-flash{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(233,213,255,.9),rgba(168,85,247,.35) 40%,rgba(168,85,247,0) 70%);opacity:0;animation:mord-flash .4s ease-out .1s both}
@keyframes mord-flash{35%{opacity:.8}100%{opacity:0}}
.mord-nevoa{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.mord-nevoa i{position:absolute;left:var(--px);top:var(--py);width:var(--tam);height:var(--tam);margin:calc(var(--tam) / -2) 0 0 calc(var(--tam) / -2);border-radius:50%;background:radial-gradient(circle,rgba(196,140,255,.75) 0,rgba(110,40,190,.45) 40%,rgba(60,10,110,0) 70%);filter:blur(22px);opacity:0;animation:mord-nev 1.3s ease-out var(--at) forwards}
@keyframes mord-nev{0%{opacity:0;transform:translate(0,0) scale(.55)}28%{opacity:.8}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1.5)}}
`;
  const estilo = document.createElement("style");
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  // ----- Geometria: a linha de corte é um zigue-zague de presas (em % da tela) -----
  const N = 10, BASE = 46, TIP = 56, CAN = 63, CANINOS = [2, 7];
  const ponta = i => CANINOS.includes(i) ? CAN : TIP;
  const xv = i => (100 * i) / N;          // posição dos vales
  const xt = i => xv(i) + 50 / N;         // posição das pontas dos dentes de cima
  const f = n => n.toFixed(2);

  function linha() {
    const p = [];
    for (let i = 0; i <= N; i++) {
      p.push([xv(i), BASE]);
      if (i < N) p.push([xt(i), ponta(i)]);
    }
    return p;
  }
  const poli = p => "polygon(" + p.map(([x, y]) => f(x) + "% " + f(y) + "%").join(",") + ")";
  const zig = linha();
  const clipCima = poli([[0, 0], [100, 0], ...zig.slice().reverse()]);
  const clipBaixo = poli([...zig, [100, 100], [0, 100]]);

  function dentes(cima) {
    let s = '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs>' +
      '<linearGradient id="mord-g' + (cima ? "c" : "b") + '" x1="0" y1="' + (cima ? 0 : 1) + '" x2="0" y2="' + (cima ? 1 : 0) + '">' +
      '<stop offset="0" stop-color="#e4d4ff"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>';
    const fill = 'url(#mord-g' + (cima ? "c" : "b") + ')';
    if (cima) {
      for (let i = 0; i < N; i++)
        s += `<polygon class="mord-dente" fill="${fill}" points="${f(xv(i))},${BASE} ${f(xt(i))},${ponta(i)} ${f(xv(i + 1))},${BASE}"/>`;
    } else {
      for (let i = 0; i <= N; i++) {
        const xl = i === 0 ? -5 : xt(i - 1), yl = i === 0 ? TIP : ponta(i - 1);
        const xr = i === N ? 105 : xt(i), yr = i === N ? TIP : ponta(i);
        s += `<polygon class="mord-dente" fill="${fill}" points="${f(xl)},${yl} ${f(xv(i))},${BASE} ${f(xr)},${yr}"/>`;
      }
    }
    return s + "</svg>";
  }

  function nevoa() {
    let h = '<div class="mord-nevoa">';
    for (let i = 0; i < 7; i++) {
      const px = 8 + Math.random() * 84, py = 30 + Math.random() * 55;
      const dx = (Math.random() - 0.5) * 30, dy = -(10 + Math.random() * 25);
      const tam = 38 + Math.random() * 30, at = Math.random() * 0.25;
      h += `<i style="--px:${f(px)}%;--py:${f(py)}%;--tam:${f(tam)}vmax;--dx:${f(dx)}vw;--dy:${f(dy)}vh;--at:${f(at)}s"></i>`;
    }
    return h + "</div>";
  }

  // ----- Som: abocanhada + sopro de névoa + acorde etéreo (suave, sem estouro) -----
  function volumeSalvo() {
    try { const v = JSON.parse(localStorage.getItem("mi-som")); return typeof v.vol === "number" ? v.vol : 0.6; }
    catch (e) { return 0.6; }
  }
  function somDaMordida() {
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
        const fl = c.createBiquadFilter();
        fl.type = tipo; fl.frequency.value = freq; fl.Q.value = q;
        const g = c.createGain();
        g.gain.setValueAtTime(0.0001, ini);
        g.gain.exponentialRampToValueAtTime(ganho, ini + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, ini + dur);
        s.connect(fl).connect(g).connect(master);
        s.start(ini, Math.random() * 0.7, dur + 0.02);
      };

      // 1) Abocanhada: estalos secos dos dentes + "nhac" descendente + baque macio
      const b = t + 0.06;
      ruido(b, 0.07, "bandpass", 1800, 1.4, 0.22);
      ruido(b + 0.035, 0.06, "bandpass", 1100, 1.2, 0.16);
      ruido(b + 0.07, 0.05, "bandpass", 2600, 1.6, 0.1);
      const nh = c.createOscillator(), nbp = c.createBiquadFilter(), ng = c.createGain();
      nh.type = "triangle";
      nh.frequency.setValueAtTime(620, b);
      nh.frequency.exponentialRampToValueAtTime(210, b + 0.1);
      nbp.type = "bandpass"; nbp.frequency.value = 900; nbp.Q.value = 2;
      ng.gain.setValueAtTime(0.0001, b);
      ng.gain.exponentialRampToValueAtTime(0.12, b + 0.01);
      ng.gain.exponentialRampToValueAtTime(0.0001, b + 0.12);
      nh.connect(nbp).connect(ng).connect(master);
      nh.start(b); nh.stop(b + 0.14);
      const th = c.createOscillator(), tg = c.createGain();
      th.type = "sine";
      th.frequency.setValueAtTime(170, b);
      th.frequency.exponentialRampToValueAtTime(90, b + 0.09);
      tg.gain.setValueAtTime(0.0001, b);
      tg.gain.exponentialRampToValueAtTime(0.08, b + 0.01);
      tg.gain.exponentialRampToValueAtTime(0.0001, b + 0.11);
      th.connect(tg).connect(master);
      th.start(b); th.stop(b + 0.13);

      // 2) Sopro de névoa: ruído suave que sobe e desce
      const sp = c.createBufferSource(), sbp = c.createBiquadFilter(), sg = c.createGain();
      const longo = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
      const ld = longo.getChannelData(0);
      for (let i = 0; i < ld.length; i++) ld[i] = Math.random() * 2 - 1;
      sp.buffer = longo;
      sbp.type = "bandpass"; sbp.Q.value = 0.8;
      sbp.frequency.setValueAtTime(500, t + 0.12);
      sbp.frequency.exponentialRampToValueAtTime(2200, t + 0.6);
      sbp.frequency.exponentialRampToValueAtTime(600, t + 1.4);
      sg.gain.setValueAtTime(0.0001, t + 0.12);
      sg.gain.exponentialRampToValueAtTime(0.09, t + 0.4);
      sg.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
      sp.connect(sbp).connect(sg).connect(master);
      sp.start(t + 0.12, 0, 1.4);

      // 3) Acorde etéreo (Sol menor) com vibrato lento: o toque místico
      [392, 466.16, 587.33, 783.99].forEach((hz, i) => {
        const o = c.createOscillator(), l = c.createOscillator(), lg = c.createGain(), g = c.createGain(), s = t + 0.14 + i * 0.05;
        o.type = "sine"; o.frequency.value = hz;
        l.frequency.value = 5.5; lg.gain.value = hz * 0.006;
        l.connect(lg).connect(o.frequency);
        g.gain.setValueAtTime(0.0001, s);
        g.gain.exponentialRampToValueAtTime(0.035, s + 0.14);
        g.gain.exponentialRampToValueAtTime(0.0001, s + 1.3);
        o.connect(g).connect(master);
        o.start(s); l.start(s);
        o.stop(s + 1.35); l.stop(s + 1.35);
      });

      // 4) Brilhinhos agudos, como faíscas de névoa
      for (let i = 0; i < 5; i++) {
        const o = c.createOscillator(), g = c.createGain(), s = t + 0.3 + Math.random() * 0.6;
        o.type = "sine"; o.frequency.value = 1568 + Math.random() * 1568;
        g.gain.setValueAtTime(0.0001, s);
        g.gain.exponentialRampToValueAtTime(0.02, s + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, s + 0.18);
        o.connect(g).connect(master);
        o.start(s); o.stop(s + 0.2);
      }

      setTimeout(() => { try { c.close(); } catch (e) {} }, 3000);
    } catch (e) {}
  }

  // ----- Animação: a tela de senha é "abocanhada" e as mandíbulas se abrem -----
  function mordida(abrirFicha, jaAberta) {
    const lock = document.getElementById("lock-screen");
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!lock || reduzir || (lock.hidden && !jaAberta)) { abrirFicha(); return; }

    const senha = lock.querySelector("input");
    const wrap = document.createElement("div");
    wrap.className = "mord-wrap";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<div class="mord-brilho"></div>';

    [["cima", clipCima, true], ["baixo", clipBaixo, false]].forEach(([nome, clip, cima]) => {
      const metade = document.createElement("div");
      metade.className = "mord-metade mord-" + nome;
      metade.style.clipPath = clip;
      const copia = lock.cloneNode(true);
      copia.removeAttribute("id");
      copia.removeAttribute("hidden");
      copia.querySelectorAll("[id]").forEach(e => e.removeAttribute("id"));
      copia.setAttribute("inert", "");
      const campo = copia.querySelector("input");
      if (campo && senha) campo.value = senha.value;
      metade.appendChild(copia);
      metade.insertAdjacentHTML("beforeend", dentes(cima));
      wrap.appendChild(metade);
    });

    wrap.insertAdjacentHTML("beforeend", '<div class="mord-flash"></div>' + nevoa());
    document.body.appendChild(wrap);
    somDaMordida();
    abrirFicha(); // a ficha já aparece por baixo e é revelada pelas mandíbulas
    setTimeout(() => wrap.remove(), 1500);
  }

  const original = window.unlockSheet;
  if (typeof original === "function") {
    window.unlockSheet = function (role) {
      mordida(() => original.call(window, role), false);
    };
  } else {
    // Plano B: se a função de desbloqueio tiver outro nome, observa a tela de senha sumir.
    const lock = document.getElementById("lock-screen");
    if (!lock) return;
    let fechada = lock.hidden;
    new MutationObserver(() => {
      if (!fechada && lock.hidden) mordida(() => {}, true);
      fechada = lock.hidden;
    }).observe(lock, { attributes: true, attributeFilter: ["hidden"] });
  }
})();
