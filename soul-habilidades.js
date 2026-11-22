// Reorganiza habilidades longas (Custo, Duração, Efeito...) em cartões fáceis de ler.
// Carregue DEPOIS do script da ficha: <script src="soul-habilidades.js"></script>
(function () {
  const CSS = `
.feature-item.hab-estruturada{border-left-color:#a855f7;background:linear-gradient(180deg,#1b1a26,#18181b)}
.feature-item.hab-estruturada h3{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;font-size:1rem;margin-bottom:.35rem}
.hab-tag{font-size:.66rem;font-weight:800;text-transform:uppercase;letter-spacing:.5px;padding:.1rem .5rem;border-radius:999px;border:1px solid}
.hab-passiva{background:rgba(168,85,247,.18);color:#e9d5ff;border-color:rgba(168,85,247,.5)}
.hab-ativa{background:rgba(229,184,75,.16);color:#fde68a;border-color:rgba(229,184,75,.5)}
.hab-intro{font-style:italic;color:#c4c7d4;font-size:.84rem;margin:.1rem 0 .6rem}
.hab-fatos{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.5rem;margin-bottom:.6rem}
.hab-fato{background:#22222f;border:1px solid #363650;border-radius:7px;padding:.45rem .6rem}
.hab-fato small{display:block;font-size:.66rem;text-transform:uppercase;letter-spacing:.5px;color:#9ca3af;margin-bottom:.1rem}
.hab-fato b{font-size:.88rem;color:#f3f4f6;line-height:1.3}
.hab-fato.hab-custo{border-color:rgba(56,189,248,.55);background:rgba(56,189,248,.08)}
.hab-fato.hab-custo b{color:#7dd3fc}
.hab-sec{border-left:3px solid #38bdf8;background:rgba(56,189,248,.05);border-radius:0 6px 6px 0;padding:.45rem .7rem;margin-bottom:.45rem}
.hab-sec.hab-alerta{border-left-color:#f87171;background:rgba(220,38,38,.08)}
.hab-sec h4{font-size:.7rem;text-transform:uppercase;letter-spacing:.6px;color:#7dd3fc;margin-bottom:.2rem}
.hab-sec.hab-alerta h4{color:#fca5a5}
.hab-sec p,.hab-sec li{font-size:.85rem;color:#e5e7eb;line-height:1.45}
.hab-lista{padding-left:1.1rem;margin:0}
.hab-lista li{margin-bottom:.15rem}
.hab-dado{font-family:Consolas,monospace;color:#fef08a;background:rgba(250,204,21,.1);border-radius:4px;padding:0 .3rem}
`;
  const estilo = document.createElement("style");
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  // Rótulos que viram "fatos rápidos" (no topo) e rótulos que viram seções de detalhe.
  const FATOS = { "Tempo de Conjuração": ["⏱", "Conjuração"], "Custo": ["⚡", "Custo"], "Duração": ["⏳", "Duração"], "Recarga": ["🔁", "Recarga"] };
  const LISTAS = new Set(["Estatísticas", "Sincronia de Combate"]);
  const ALERTA = new Set(["Consequência", "Quebra de Vínculo"]);
  const RX = /(Tempo de Conjuração|Custo|Duração|Recarga|Efeito|Estatísticas|Sincronia de Combate|Consequência|Quebra de Vínculo(?: \([^)]*\))?)\s*:/g;

  function dividir(texto) {
    const marcas = [];
    let m;
    RX.lastIndex = 0;
    while ((m = RX.exec(texto))) marcas.push({ rotulo: m[1], ini: m.index, fim: RX.lastIndex });
    if (marcas.length < 2) return null; // texto sem estrutura: deixa como está
    const intro = texto.slice(0, marcas[0].ini).trim();
    const campos = marcas.map((mk, i) => ({
      rotulo: mk.rotulo,
      valor: texto.slice(mk.fim, i + 1 < marcas.length ? marcas[i + 1].ini : texto.length).trim()
    }));
    return { intro, campos };
  }

  function limpar(v) {
    v = v.replace(/[\s|]+$/, "").replace(/\.$/, "").trim();
    return v.charAt(0).toUpperCase() + v.slice(1);
  }

  // Escreve o texto destacando dados de rolagem (ex.: 1d4 + floor(DES ÷ 2)).
  function comDados(el, texto) {
    texto.split(/(\b\d+[dD]\d+(?:\s*\+\s*floor\([^)]*\))?)/).forEach((parte, i) => {
      if (i % 2) {
        const s = document.createElement("span");
        s.className = "hab-dado";
        s.textContent = parte;
        el.appendChild(s);
      } else if (parte) {
        el.appendChild(document.createTextNode(parte));
      }
    });
  }

  function montar(item) {
    if (item.dataset.hab) return;
    item.dataset.hab = "1";
    const h3 = item.querySelector("h3"), p = item.querySelector("p");
    if (!h3 || !p) return;
    const dados = dividir(p.textContent);
    if (!dados) return;

    // Título limpo + etiqueta "Passiva" / "Ativa"
    let nome = h3.textContent.trim(), tag = "", m;
    if ((m = nome.match(/^Habilidade Ativa:\s*(.+)$/i))) { nome = m[1]; tag = "Ativa"; }
    else if ((m = nome.match(/^(.+?)\s*\(Habilidade Passiva\)$/i))) { nome = m[1]; tag = "Passiva"; }
    h3.textContent = nome;
    if (tag) {
      const b = document.createElement("span");
      b.className = "hab-tag hab-" + tag.toLowerCase();
      b.textContent = tag;
      h3.appendChild(b);
    }

    const corpo = document.createElement("div");

    if (dados.intro) {
      const i = document.createElement("p");
      i.className = "hab-intro";
      i.textContent = dados.intro;
      corpo.appendChild(i);
    }

    const fatos = dados.campos.filter(c => FATOS[c.rotulo]);
    if (fatos.length) {
      const grade = document.createElement("div");
      grade.className = "hab-fatos";
      fatos.forEach(c => {
        const t = document.createElement("div");
        t.className = "hab-fato" + (c.rotulo === "Custo" ? " hab-custo" : "");
        const s = document.createElement("small");
        s.textContent = FATOS[c.rotulo][0] + " " + FATOS[c.rotulo][1];
        const b = document.createElement("b");
        comDados(b, limpar(c.valor));
        t.append(s, b);
        grade.appendChild(t);
      });
      corpo.appendChild(grade);
    }

    dados.campos.filter(c => !FATOS[c.rotulo]).forEach(c => {
      const base = c.rotulo.replace(/ \(.*\)$/, "");
      const sec = document.createElement("div");
      sec.className = "hab-sec" + (ALERTA.has(base) ? " hab-alerta" : "");
      const t = document.createElement("h4");
      t.textContent = c.rotulo;
      sec.appendChild(t);
      if (LISTAS.has(base)) {
        const ul = document.createElement("ul");
        ul.className = "hab-lista";
        c.valor.split(/;\s*/).filter(Boolean).forEach(parte => {
          const li = document.createElement("li");
          comDados(li, limpar(parte));
          ul.appendChild(li);
        });
        sec.appendChild(ul);
      } else {
        const par = document.createElement("p");
        comDados(par, limpar(c.valor) + ".");
        sec.appendChild(par);
      }
      corpo.appendChild(sec);
    });

    p.replaceWith(corpo);
    item.classList.add("hab-estruturada");
  }

  function aplicar() {
    document.querySelectorAll("#race-passives-list .feature-item, #job-features-list .feature-item").forEach(montar);
  }

  // A ficha redesenha essas listas (ao desbloquear, importar ou resetar): reaplica sempre.
  ["race-passives-list", "job-features-list"].forEach(id => {
    const el = document.getElementById(id);
    if (el) new MutationObserver(aplicar).observe(el, { childList: true, subtree: true });
  });
  aplicar();
})();
