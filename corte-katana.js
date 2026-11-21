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

    abrirFicha(); // a ficha já aparece por baixo e é revelada pelo corte
    setTimeout(() => wrap.remove(), 1300);
  }

  const original = window.unlockSheet;
  if (typeof original !== "function") return;
  window.unlockSheet = function (role) {
    cortar(() => original.call(window, role));
  };
})();
