const KEY = "espolios-opmi-db";
const KEY_UNI = "espolios-unicos-obtidos";
const KEY_PRE = "espolios-presets";
const KEY_HIST = "espolios-hist";

const $ = (s, e = document) => e.querySelector(s);
const $$ = (s, e = document) => [...e.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const COR = ["#9ca3af", "#4ade80", "#38bdf8", "#c084fc", "#fbbf24", "#f472b6", "#fb923c"];

let db, baseJsonStr = "", ctx = "", res = [], sub = "itens";
let fi = { q: "", t: "", m: "", c: "" };
let sel = { tier: new Set(), mar: new Set(), cat: new Set() };
let hist = JSON.parse(localStorage.getItem(KEY_HIST) || "[]");
let unicosObtidos = JSON.parse(localStorage.getItem(KEY_UNI) || "[]");
let presets = JSON.parse(localStorage.getItem(KEY_PRE) || "[]");
let ultimoExcluido = null;
let toastTimer = null;

// ---------- Áudio WebSynth (Efeitos, Fanfarra Rara e Som do Mar audível) ----------
let somAtivo = localStorage.getItem("espolios-som") !== "0";
let marAtivo = false;
let audioCtx = null, marNode = null;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function tocarSomSaque(reroll = false) {
  if (!somAtivo) return;
  try {
    const ac = getAudio();
    const now = ac.currentTime;
    const notas = reroll ? [523.25, 659.25] : [392.00, 493.88, 587.33, 783.99];
    notas.forEach((freq, idx) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = idx === notas.length - 1 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.045);
      gain.gain.setValueAtTime(0.001, now + idx * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.09, now + idx * 0.045 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.045 + 0.16);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now + idx * 0.045);
      osc.stop(now + idx * 0.045 + 0.17);
    });
  } catch {}
}

// Som especial de baú lendário / item único
function tocarSomLendario() {
  if (!somAtivo) return;
  try {
    const ac = getAudio();
    const now = ac.currentTime;
    // Acorde brilhante ascendente + brilho agudo
    const acorde = [
      { f: 523.25, t: 0.00, d: 0.45, type: "triangle", g: 0.11 }, // C5
      { f: 659.25, t: 0.06, d: 0.45, type: "triangle", g: 0.11 }, // E5
      { f: 783.99, t: 0.12, d: 0.50, type: "triangle", g: 0.12 }, // G5
      { f: 1046.50, t: 0.18, d: 0.65, type: "sine", g: 0.14 },    // C6
      { f: 1318.51, t: 0.25, d: 0.70, type: "sine", g: 0.10 },    // E6
      { f: 1567.98, t: 0.32, d: 0.75, type: "sine", g: 0.08 }     // G6
    ];
    acorde.forEach(n => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = n.type;
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.0001, now + n.t);
      gain.gain.exponentialRampToValueAtTime(n.g, now + n.t + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + n.d + 0.02);
    });
  } catch {}
}

function toggleMar() {
  marAtivo = !marAtivo;
  $("#btn-mar").textContent = `🌊 Mar: ${marAtivo ? "ON" : "OFF"}`;
  $("#btn-mar").classList.toggle("ok", marAtivo);

  if (marAtivo) {
    try {
      const ac = getAudio();
      // Ruído rosa suave (muito mais audível e natural que ruído browniano)
      const bufferSize = ac.sampleRate * 5;
      const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
        b6 = white * 0.115926;
      }

      const noise = ac.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ac.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 520;

      // LFO modula tanto o corte do filtro quanto o volume das ondas indo e vindo
      const lfo = ac.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.16; // ~1 onda a cada 6 segundos

      const lfoFilterGain = ac.createGain();
      lfoFilterGain.gain.value = 340; // varia filtro entre 180Hz e 860Hz
      lfo.connect(lfoFilterGain);
      lfoFilterGain.connect(filter.frequency);

      const waveGain = ac.createGain();
      waveGain.gain.value = 0.22;

      const lfoAmpGain = ac.createGain();
      lfoAmpGain.gain.value = 0.10;
      lfo.connect(lfoAmpGain);
      lfoAmpGain.connect(waveGain.gain);

      noise.connect(filter);
      filter.connect(waveGain);
      waveGain.connect(ac.destination);

      noise.start();
      lfo.start();
      marNode = { noise, lfo };
    } catch {}
  } else if (marNode) {
    try {
      marNode.noise.stop();
      marNode.lfo.stop();
    } catch {}
    marNode = null;
  }
}

// ---------- Helpers de Dados & Valores ----------
const cor = t => COR[Math.max(0, db.tiers.indexOf(t)) % COR.length];
const lista = g => g === "tier" ? db.tiers : g === "mar" ? db.mares : db.categorias;
const todos = () => ["tier", "mar", "cat"].forEach(g => sel[g] = new Set(lista(g)));

const isTier5 = t => /tier\s*5/i.test(String(t || "")) || db.tiers.indexOf(t) === db.tiers.length - 1 && db.tiers.length >= 5;
const isItemRaro = i => Boolean(i?.unico || isTier5(i?.tier));

function mostrarAvisoRaro(itensRaros) {
  if (!itensRaros.length) return;
  const el = $("#toast-raro");
  const nomes = itensRaros.map(i => i.nome).join(" · ");
  const titulo = itensRaros.some(i => i.unico) && itensRaros.some(i => isTier5(i.tier))
    ? "✨ TESOURO LENDÁRIO & ÚNICO ENCONTRADO!"
    : itensRaros.some(i => i.unico)
      ? "★ ITEM ÚNICO DA CAMPANHA ENCONTRADO!"
      : "👑 RELÍQUIA TIER 5 ENCONTRADA!";
  el.innerHTML = `${titulo}<br><small>${esc(nomes)}</small>`;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 4200);
}

function verificarDirty() {
  const atual = JSON.stringify(db);
  const dirty = baseJsonStr && atual !== baseJsonStr;
  $("#badge-dirty").hidden = !dirty;
}

function salvar() {
  localStorage.setItem(KEY, JSON.stringify(db));
  verificarDirty();
}

function salvarUnicos() {
  localStorage.setItem(KEY_UNI, JSON.stringify(unicosObtidos));
  $("#cnt-unicos").textContent = unicosObtidos.length;
}

function salvarPresets() {
  localStorage.setItem(KEY_PRE, JSON.stringify(presets));
}

function rolarFaixasTexto(texto) {
  if (!texto) return "";
  return texto.replace(/(\d+(?:\.\d+)?)\s*(?:a|-|–|até)\s*(\d+(?:\.\d+)?)\s*(berries|berry|b\$)/gi, (_, minS, maxS, moeda) => {
    const min = Math.round(Number(minS.replace(/\./g, "")));
    const max = Math.round(Number(maxS.replace(/\./g, "")));
    if (isNaN(min) || isNaN(max) || max < min) return _;
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${val.toLocaleString("pt-BR")} ${moeda}`;
  });
}

function calcularValorBerries(valorStr) {
  if (!valorStr) return 0;
  const s = String(valorStr).trim();
  const faixa = s.match(/^(\d+(?:\.\d+)?)\s*(?:a|-|–|até)\s*(\d+(?:\.\d+)?)$/i);
  if (faixa) {
    const min = Number(faixa[1].replace(/\./g, ""));
    const max = Number(faixa[2].replace(/\./g, ""));
    if (!isNaN(min) && !isNaN(max) && max >= min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  const num = Number(s.replace(/[^\d]/g, ""));
  return isNaN(num) ? 0 : num;
}

function instanciarItem(item) {
  const descRolada = rolarFaixasTexto(item.desc || "");
  let valorRolado = calcularValorBerries(item.valor);
  if (!valorRolado && descRolada) {
    const m = descRolada.match(/(\d+(?:\.\d+)?)\s*(?:berries|berry|b\$)/i);
    if (m) valorRolado = Number(m[1].replace(/\./g, "")) || 0;
  }
  return {
    ...item,
    descRolada,
    valorRolado
  };
}

const fmt = i => {
  const valTxt = i.valorRolado ? ` (${i.valorRolado.toLocaleString("pt-BR")} B$)` : "";
  const descTxt = i.descRolada ?? i.desc;
  return `${i.nome}${valTxt} [${i.tier} · ${i.mar} · ${i.cat}${i.unico ? " · Único" : ""}]${descTxt ? " — " + descTxt : ""}`;
};

// ---------- Inicialização ----------
async function init() {
  $("#btn-som").textContent = `🔊 Som: ${somAtivo ? "ON" : "OFF"}`;
  let publicado = null;
  try {
    publicado = await (await fetch("data.json")).json();
    baseJsonStr = JSON.stringify(publicado);
  } catch {}

  try {
    const local = localStorage.getItem(KEY);
    db = local ? JSON.parse(local) : publicado;
  } catch {}

  if (!db) {
    db = {
      tiers: ["Tier 1"],
      mares: [],
      categorias: ["Outro"],
      contextos: { "Saque comum": { "Tier 1": 1 } },
      origemCfg: {},
      itens: []
    };
  }
  db.origemCfg = db.origemCfg || {};

  if (!presets.length) {
    presets = [
      {
        nome: "East Blue · Início",
        ctx: Object.keys(db.contextos)[0] || "",
        qtd: 1,
        tiers: ["Tier 1", "Tier 2"],
        mares: ["East Blue"],
        cats: db.categorias.slice()
      },
      {
        nome: "Grand Line · Sem Berries",
        ctx: Object.keys(db.contextos)[0] || "",
        qtd: 2,
        tiers: db.tiers.slice(),
        mares: ["Grand Line"],
        cats: db.categorias.filter(c => !/berries/i.test(c))
      }
    ];
    salvarPresets();
  }

  salvarUnicos();
  ctx = Object.keys(db.contextos)[0] || "";
  todos();
  aplicarConfigOrigem(ctx);
  desenhar();
}

function aplicarConfigOrigem(origem) {
  const cfg = db.origemCfg?.[origem];
  if (!cfg) return;
  if (cfg.qtd) $("#qtd").value = cfg.qtd;
  if (cfg.tiers?.length) sel.tier = new Set(cfg.tiers.filter(x => db.tiers.includes(x)));
  if (cfg.mares?.length) sel.mar = new Set(cfg.mares.filter(x => db.mares.includes(x)));
  if (cfg.cats?.length) sel.cat = new Set(cfg.cats.filter(x => db.categorias.includes(x)));
}

const casa = i => {
  if (i.unico && unicosObtidos.some(u => u.nome === i.nome)) return false;
  return sel.tier.has(i.tier) && sel.cat.has(i.cat) && (i.mar === "Todos" ? sel.mar.size > 0 : sel.mar.has(i.mar));
};

function desenhar() {
  $("#presets").innerHTML = presets.length
    ? presets.map((p, idx) => `<span class="chip" data-preset="${idx}">${esc(p.nome)}<span class="x" data-rm-preset="${idx}" title="Remover preset">✕</span></span>`).join("")
    : `<span class="cfg-mini">Nenhum preset salvo. Ajuste os filtros abaixo e clique em "+ Salvar filtro atual".</span>`;

  $("#ctx").innerHTML = Object.keys(db.contextos).map(c =>
    `<button class="chip ${c === ctx ? "on" : ""}" data-ctx="${esc(c)}">${esc(c)}</button>`
  ).join("");

  const T = { tier: "Tiers", mar: "Mares", cat: "Categorias" };
  $("#filtros").innerHTML = ["tier", "mar", "cat"].map(g => `
    <div class="grp">
      <div class="gh">
        <h3>${T[g]}</h3>
        <span>
          <button class="mini" data-all="${g}">Todas</button>
          <button class="mini" data-none="${g}">Nenhuma</button>
        </span>
      </div>
      <div class="chips">
        ${lista(g).map(x => `<button class="chip ${sel[g].has(x) ? "on" : ""}" data-g="${g}" data-v="${esc(x)}">${esc(x)}</button>`).join("")}
      </div>
    </div>`).join("");

  $("#n").textContent = `${db.itens.filter(casa).length} itens possíveis`;
  mostrar();
}

function sortear(excluirNomes) {
  const pool = db.itens.filter(i => casa(i) && !(excluirNomes && excluirNomes.has(i.nome)));
  const w = db.contextos[ctx] || {};
  const g = {};
  pool.forEach(i => (g[i.tier] = g[i.tier] || []).push(i));
  const ts = Object.keys(g);
  if (!ts.length) return null;

  let p = ts.map(t => +w[t] || 0);
  if (!p.some(x => x > 0)) p = ts.map(() => 1);

  let r = Math.random() * p.reduce((a, b) => a + b, 0);
  let t = ts[ts.length - 1];
  for (let i = 0; i < ts.length; i++) {
    if ((r -= p[i]) < 0) { t = ts[i]; break; }
  }
  const escolhido = g[t][Math.floor(Math.random() * g[t].length)];
  return instanciarItem(escolhido);
}

function registrarUnicoSeNecessario(item) {
  if (!item?.unico) return;
  if (!unicosObtidos.some(u => u.nome === item.nome)) {
    unicosObtidos.unshift({
      nome: item.nome,
      tier: item.tier,
      mar: item.mar,
      cat: item.cat,
      valor: item.valor || "",
      desc: item.desc || "",
      data: new Date().toLocaleDateString("pt-BR")
    });
    salvarUnicos();
  }
}

function card(i, idx, rerolled = false) {
  const descFinal = i.descRolada ?? i.desc;
  const raro = isItemRaro(i);
  return `
    <div class="card ${raro ? "raro" : ""} ${rerolled ? "reroll-anim" : ""}" style="--c:${cor(i.tier)};animation-delay:${rerolled ? 0 : idx * 35}ms">
      <div>
        <div class="card-topo">
          <b>${esc(i.nome)}</b>
        </div>
        <div class="tags">
          <span class="t">${esc(i.tier)}</span>
          <span>${esc(i.mar)}</span>
          <span>${esc(i.cat)}</span>
          ${i.valorRolado ? `<span class="b-val">💰 ${i.valorRolado.toLocaleString("pt-BR")} B$</span>` : ""}
          ${i.unico ? `<span class="u-tag">★ Único</span>` : ""}
        </div>
        ${descFinal ? `<p>${esc(descFinal)}</p>` : ""}
      </div>
      <div class="card-acoes">
        <button class="mini" data-copy="${esc(fmt(i))}">Copiar</button>
        <button class="mini" data-reroll="${idx}" title="Sortear apenas este item novamente">🎲 Reroll</button>
      </div>
    </div>`;
}

function mostrar(rerollIdx = -1) {
  const totalBerries = res.reduce((acc, item) => acc + (item.valorRolado || 0), 0);
  if (res.length && totalBerries > 0) {
    $("#res-resumo").hidden = false;
    $("#res-resumo").innerHTML = `Total em Berries neste saque: <b>${totalBerries.toLocaleString("pt-BR")} B$</b>`;
  } else {
    $("#res-resumo").hidden = true;
  }

  $("#res").innerHTML = res.length
    ? res.map((item, idx) => card(item, idx, idx === rerollIdx)).join("") +
      `<div class="vazio"><button class="mini ok" data-copy="${esc(res.map(fmt).join("\n"))}">📋 Copiar todo o espólio</button></div>`
    : `<div class="vazio">Escolha a origem e role. Nada apareceu ainda.</div>`;
}

function rolar() {
  const btn = $("#rolar-btn");
  btn.classList.remove("rolando");
  void btn.offsetWidth;
  btn.classList.add("rolando");

  const n = Math.max(1, Math.min(20, +$("#qtd").value || 1));
  const semRep = $("#semrep").checked;
  const ex = semRep ? new Set() : null;
  res = [];

  for (let k = 0; k < n; k++) {
    const item = sortear(ex);
    if (!item) break;
    if (ex) ex.add(item.nome);
    registrarUnicoSeNecessario(item);
    res.push(item);
  }

  if (!res.length) {
    $("#res-resumo").hidden = true;
    $("#res").innerHTML = '<div class="vazio">Nenhum item disponível combina com esses filtros (ou todos os itens únicos já saíram).</div>';
    return;
  }

  const raros = res.filter(isItemRaro);
  if (raros.length) {
    tocarSomLendario();
    mostrarAvisoRaro(raros);
  } else {
    tocarSomSaque(false);
  }

  hist.unshift({
    h: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    ctx,
    it: res.map(r => ({ ...r }))
  });
  hist = hist.slice(0, 40);
  localStorage.setItem(KEY_HIST, JSON.stringify(hist));
  desenhar();
  mostrar();
}

function rerollCard(idx) {
  if (!res[idx]) return;
  const semRep = $("#semrep").checked;
  const ex = new Set();
  if (semRep) {
    res.forEach((it, i) => { if (i !== idx) ex.add(it.nome); });
  }
  ex.add(res[idx].nome);

  const novo = sortear(ex) || sortear(semRep ? new Set(res.filter((_, i) => i !== idx).map(x => x.nome)) : null);
  if (!novo) return alert("Não há outro item disponível nos filtros atuais para substituir este.");

  res[idx] = novo;
  registrarUnicoSeNecessario(novo);

  if (isItemRaro(novo)) {
    tocarSomLendario();
    mostrarAvisoRaro([novo]);
  } else {
    tocarSomSaque(true);
  }

  desenhar();
  mostrar(idx);
}

function desenharUnicos() {
  $("#unicos-l").innerHTML = unicosObtidos.length
    ? unicosObtidos.map((u, idx) => `
      <div class="h">
        <div>
          <b>${esc(u.nome)}</b> <small>(${esc(u.tier)} · ${esc(u.mar)} · Obtido em ${esc(u.data)})</small>
          ${u.desc ? `<br><small>${esc(u.desc)}</small>` : ""}
        </div>
        <button class="mini" data-restaurar-unico="${idx}">Devolver ao pool</button>
      </div>`).join("")
    : "<p>Nenhum item único foi sorteado na campanha ainda.</p>";
}

function desenharHist() {
  $("#hist-l").innerHTML = hist.length
    ? hist.map(h => `
      <div class="h">
        <div>
          <small>${h.h} · ${esc(h.ctx)}</small><br>
          ${h.it.map(i => esc(i.nome) + (i.valorRolado ? ` (${i.valorRolado.toLocaleString("pt-BR")} B$)` : "")).join(" · ")}
        </div>
        <button class="mini" data-copy="${esc(h.it.map(fmt).join("\n"))}">Copiar</button>
      </div>`).join("")
    : "<p>Nenhum sorteio ainda.</p>";
}

function aba(a) {
  if (a === "mestre" && !sessionStorage.mestre) {
    $("#senha").showModal();
    $("#sp").focus();
    return;
  }
  $$("main>section").forEach(s => s.hidden = s.id !== a);
  $$(".abas button").forEach(b => b.classList.toggle("on", b.dataset.aba === a));
  if (a === "hist") desenharHist();
  if (a === "unicos") desenharUnicos();
  if (a === "mestre") mestre();
}

// ---------- Área do Mestre ----------
const opts = (l, v, extra = "") => extra + l.map(x => `<option ${x === v ? "selected" : ""}>${esc(x)}</option>`).join("");

function mestre() {
  $$("#subabas button").forEach(b => b.classList.toggle("on", b.dataset.sub === sub));
  const el = $("#mestre-corpo");

  if (sub === "itens") {
    el.innerHTML = `
      <div class="barra">
        <input id="q" placeholder="Buscar item…" value="${esc(fi.q)}">
        <select data-f="t">${opts(db.tiers, fi.t, '<option value="">Todos os tiers</option>')}</select>
        <select data-f="m">${opts(["Todos", ...db.mares], fi.m, '<option value="">Todos os mares</option>')}</select>
        <select data-f="c">${opts(db.categorias, fi.c, '<option value="">Todas as categorias</option>')}</select>
        <button class="mini ok" data-ed="-1">+ Novo item</button>
        ${ultimoExcluido ? `<button class="mini" data-undo="1">↩ Desfazer exclusão (${esc(ultimoExcluido.item.nome)})</button>` : ""}
      </div>
      <div class="barra">
        <label><input type="checkbox" id="ck-all"> Marcar visíveis</label>
        <select id="b-t">${opts(db.tiers, "", '<option value="">Tier…</option>')}</select>
        <select id="b-m">${opts(["Todos", ...db.mares], "", '<option value="">Mar…</option>')}</select>
        <select id="b-c">${opts(db.categorias, "", '<option value="">Categoria…</option>')}</select>
        <button class="mini" data-bulk="set">Aplicar aos marcados</button>
        <button class="mini" data-bulk="del">Excluir marcados</button>
      </div>
      <div class="w" id="tbl"></div>`;
    tabela();
  } else if (sub === "listas") {
    const T = { tier: "Tiers", mar: "Mares", cat: "Categorias" };
    el.innerHTML = ["tier", "mar", "cat"].map(g => `
      <div class="grp">
        <h2>${T[g]}</h2>
        <div class="chips">${lista(g).map(x => `<span class="chip">${esc(x)}<span class="x" data-rm="${g}" data-v="${esc(x)}">✕</span></span>`).join("")}</div>
        <div class="barra"><input id="nv-${g}" placeholder="Novo nome"><button class="mini ok" data-add="${g}">Adicionar</button></div>
      </div>`).join("");
  } else if (sub === "ctx") {
    el.innerHTML = `
      <p>Configure os pesos por Tier, a <b>quantidade padrão de itens</b> e salve os filtros ativos da tela principal como padrão de cada origem.</p>
      <div class="w">
        <table>
          <tr>
            <th>Origem</th>
            <th>Qtd Padrão</th>
            ${db.tiers.map(t => `<th>${esc(t)}</th>`).join("")}
            <th>Filtros Padrão</th>
            <th></th>
          </tr>
          ${Object.keys(db.contextos).map(c => {
            const cfg = db.origemCfg?.[c] || {};
            const resumoCfg = cfg.tiers ? `${cfg.tiers.length}T · ${cfg.mares?.length || 0}M · ${cfg.cats?.length || 0}C` : "Todos";
            return `<tr>
              <td><b>${esc(c)}</b></td>
              <td><input type="number" min="1" max="20" data-oqtd="${esc(c)}" value="${cfg.qtd || 1}"></td>
              ${db.tiers.map(t => `<td><input type="number" min="0" step="any" data-w="${esc(c)}" data-t="${esc(t)}" value="${+db.contextos[c][t] || 0}"></td>`).join("")}
              <td>
                <span class="cfg-mini">${resumoCfg}</span><br>
                <button class="mini" data-ocfg="${esc(c)}" title="Salva os filtros atualmente selecionados na aba Randomizar para esta origem">Usar filtros atuais</button>
              </td>
              <td><span class="x" data-rmc="${esc(c)}">✕</span></td>
            </tr>`;
          }).join("")}
        </table>
      </div>
      <div class="barra">
        <input id="nc" placeholder="Nova origem (ex.: Navio naufragado)">
        <button class="mini ok" data-addc="1">Adicionar origem</button>
      </div>`;
  } else {
    el.innerHTML = `
      <h2>Publicar alterações & Backup</h2>
      <p>Suas edições ficam salvas no navegador. Para os jogadores verem no GitHub Pages, baixe o arquivo e substitua o <b>data.json</b> no repositório.</p>
      <div class="barra">
        <button class="mini ok" data-ex="1">⬇ Baixar data.json</button>
        <button class="mini" data-backup="1">🛡️ Baixar Backup completo (JSON)</button>
        <label class="mini">📂 Importar JSON <input type="file" id="fj" accept=".json" hidden></label>
        <button class="mini" data-reset="1">Descartar edições locais</button>
      </div>
      <h2>Importar do gerador antigo (Perchance)</h2>
      <p>Cole a lista completa (com <code>tier1</code>, <code>tier2</code>…). O sistema identifica tiers, categorias, valores em Berries e <b>detecta automaticamente o Mar</b> por palavras-chave (Wano, Skypiea, Alabasta, Dressrosa, East Blue, etc.).</p>
      <textarea class="g" id="pc" placeholder="tier1&#10;  🍖 Carne (Consumível - Recupera 10 de Estamina)&#10;  🗡️ Katana de Wano (Arma - Lâmina forjada em Wano)"></textarea>
      <div class="barra">
        <button class="mini ok" data-pc="1">Importar itens</button>
        <span id="pcr"></span>
      </div>`;
  }
}

function tabela() {
  const q = fi.q.toLowerCase(), l = [];
  db.itens.forEach((i, k) => {
    if ((!fi.t || i.tier === fi.t) && (!fi.m || i.mar === fi.m) && (!fi.c || i.cat === fi.c) && (!q || (i.nome + " " + i.desc).toLowerCase().includes(q))) {
      l.push([i, k]);
    }
  });
  $("#tbl").innerHTML = `
    <table>
      <tr><th></th><th>Item (${l.length})</th><th>Valor B$</th><th>Tier</th><th>Mar</th><th>Categoria</th><th></th></tr>
      ${l.slice(0, 400).map(([i, k]) => `
        <tr>
          <td><input type="checkbox" data-ck="${k}"></td>
          <td>${esc(i.nome)} ${i.unico ? '<span title="Item Único">★</span>' : ""}</td>
          <td>${i.valor ? esc(i.valor) + " B$" : "—"}</td>
          <td class="tg" style="--c:${cor(i.tier)}">${esc(i.tier)}</td>
          <td>${esc(i.mar)}</td>
          <td>${esc(i.cat)}</td>
          <td>
            <button class="mini" data-ed="${k}">✏️</button>
            <button class="mini" data-del="${k}">🗑️</button>
          </td>
        </tr>`).join("")}
    </table>`;
}

function abrirEd(k) {
  const i = k < 0 ? { nome: "", valor: "", desc: "", tier: db.tiers[0], mar: "Todos", cat: db.categorias[0], unico: false } : db.itens[k];
  const f = $("#edf");
  $("#edt").textContent = k < 0 ? "Novo item" : "Editar item";
  f.dataset.k = k;
  f.nome.value = i.nome;
  f.valor.value = i.valor || "";
  f.desc.value = i.desc || "";
  f.tier.innerHTML = opts(db.tiers, i.tier);
  f.mar.innerHTML = opts(["Todos", ...db.mares], i.mar);
  f.cat.innerHTML = opts(db.categorias, i.cat);
  f.unico.checked = !!i.unico;
  $("#ed").showModal();
}

function adivinhar(n, d) {
  const m = d.match(/^(Consumível|Loot|Utilitário|Arma|Equipamento|Narrativo|Artefato|Item Especial)/i);
  const t = (n + " " + d).toLowerCase();
  if (m) {
    const k = m[1].toLowerCase();
    return k === "loot" ? "Loot (Berries)" : /artefato|especial/.test(k) ? "Especial" : k[0].toUpperCase() + k.slice(1);
  }
  if (/berries|berry|b\$/.test(t)) return "Loot (Berries)";
  if (/recupera|cura /.test(t)) return "Consumível";
  if (/dial|log pose|bússola|corda|vela/.test(t)) return "Utilitário";
  if (/espada|katana|adaga|besta|rifle|faca|manopla|soco/.test(t)) return "Arma";
  return "Equipamento";
}

function adivinharMar(n, d) {
  const t = (n + " " + d).toLowerCase();
  if (/east blue|foosha|cocoyasi|loguetown|syrup|baratie|arlong/.test(t)) return "East Blue";
  if (/west blue|ohara|thriller bark|kano/.test(t)) return "West Blue";
  if (/north blue|germa|flevance|lvneel/.test(t)) return "North Blue";
  if (/south blue|baterilla|sorbet|briss/.test(t)) return "South Blue";
  if (/skypiea|alabasta|water 7|enies lobby|sabaody|impel down|marineford|jaya|drum|little garden|whisk(e)?y peak|amazon lily|ilha dos homens-peixe|grand line/.test(t)) return "Grand Line";
  if (/wano|karakuri|zou|dressrosa|whole cake|tottoland|punk hazard|egghead|elbaf|novo mundo|new world/.test(t)) return "Novo Mundo";
  return "Todos";
}

function importarPc(txt) {
  let tier = null, novos = 0, dup = 0;
  txt.split(/\r?\n/).forEach(l => {
    if (!l.trim() || l.trim().startsWith("//")) return;
    if (!/^\s/.test(l)) {
      const m = l.trim().match(/^tier\s*(\d+)$/i);
      tier = m ? "Tier " + m[1] : null;
      return;
    }
    if (!tier) return;
    const s = l.trim().replace(/\^[\d.]+$/, "").trim();
    const a = s.indexOf("("), z = s.lastIndexOf(")");
    const nome = (a > 0 ? s.slice(0, a) : s).trim();
    let desc = a > 0 && z > a ? s.slice(a + 1, z).trim() : "";
    if (!nome) return;
    if (db.itens.some(i => i.nome === nome && i.tier === tier)) { dup++; return; }

    const cat = adivinhar(nome, desc);
    const marDetectado = adivinharMar(nome, desc);
    const mar = db.mares.includes(marDetectado) ? marDetectado : "Todos";

    desc = desc.replace(/^(?:Consumível|Loot|Utilitário|Arma|Equipamento|Narrativo|Artefato|Item Especial|Upgrade)[^-(]{0,25}-\s*/i, "");
    const valMatch = desc.match(/(\d+(?:\.\d+)?(?:\s*(?:a|-|–)\s*\d+(?:\.\d+)?)?)\s*(?:berries|berry|b\$)/i);
    const valor = valMatch ? valMatch[1].replace(/\s+/g, "") : "";

    if (!db.tiers.includes(tier)) db.tiers.push(tier);
    if (!db.categorias.includes(cat)) db.categorias.push(cat);
    db.itens.push({ nome, valor, desc, tier, mar, cat, unico: false });
    novos++;
  });
  salvar();
  todos();
  return `${novos} importados (com detecção de Mar e B$), ${dup} já existiam.`;
}

// ---------- Eventos ----------
document.addEventListener("click", e => {
  const b = e.target.closest("[data-aba],[data-ctx],[data-g],[data-all],[data-none],[data-copy],[data-reroll],[data-preset],[data-rm-preset],[data-restaurar-unico],[data-sub],[data-ed],[data-del],[data-undo],[data-bulk],[data-rm],[data-add],[data-rmc],[data-addc],[data-ocfg],[data-ex],[data-backup],[data-reset],[data-pc]");
  if (!b) return;
  const d = b.dataset;

  if (d.aba) aba(d.aba);
  else if (d.rmPreset !== undefined) {
    e.stopPropagation();
    presets.splice(+d.rmPreset, 1);
    salvarPresets();
    desenhar();
  } else if (d.preset !== undefined) {
    const p = presets[+d.preset];
    if (!p) return;
    if (p.ctx && db.contextos[p.ctx]) ctx = p.ctx;
    if (p.qtd) $("#qtd").value = p.qtd;
    sel.tier = new Set((p.tiers || db.tiers).filter(x => db.tiers.includes(x)));
    sel.mar = new Set((p.mares || db.mares).filter(x => db.mares.includes(x)));
    sel.cat = new Set((p.cats || db.categorias).filter(x => db.categorias.includes(x)));
    desenhar();
  } else if (d.ctx) {
    ctx = d.ctx;
    aplicarConfigOrigem(ctx);
    desenhar();
  } else if (d.g) {
    sel[d.g].has(d.v) ? sel[d.g].delete(d.v) : sel[d.g].add(d.v);
    desenhar();
  } else if (d.all) {
    sel[d.all] = new Set(lista(d.all));
    desenhar();
  } else if (d.none) {
    sel[d.none] = new Set();
    desenhar();
  } else if (d.copy !== undefined) {
    navigator.clipboard.writeText(d.copy);
    const t = b.textContent;
    b.textContent = "Copiado!";
    setTimeout(() => b.textContent = t, 1200);
  } else if (d.reroll !== undefined) {
    rerollCard(+d.reroll);
  } else if (d.restaurarUnico !== undefined) {
    unicosObtidos.splice(+d.restaurarUnico, 1);
    salvarUnicos();
    desenharUnicos();
    desenhar();
  } else if (d.sub) {
    sub = d.sub;
    mestre();
  } else if (d.ed !== undefined) {
    abrirEd(+d.ed);
  } else if (d.del !== undefined) {
    const k = +d.del;
    ultimoExcluido = { item: { ...db.itens[k] }, index: k };
    db.itens.splice(k, 1);
    salvar();
    tabela();
    mestre();
  } else if (d.undo) {
    if (ultimoExcluido) {
      db.itens.splice(ultimoExcluido.index, 0, ultimoExcluido.item);
      ultimoExcluido = null;
      salvar();
      mestre();
    }
  } else if (d.bulk) {
    const ks = $$("[data-ck]:checked").map(c => +c.dataset.ck);
    if (!ks.length) return alert("Marque itens primeiro.");
    if (d.bulk === "del") {
      if (!confirm(`Excluir ${ks.length} itens?`)) return;
      db.itens = db.itens.filter((_, k) => !ks.includes(k));
    } else {
      ks.forEach(k => {
        const t = $("#b-t").value, m = $("#b-m").value, c = $("#b-c").value;
        if (t) db.itens[k].tier = t;
        if (m) db.itens[k].mar = m;
        if (c) db.itens[k].cat = c;
      });
    }
    salvar();
    tabela();
  } else if (d.rm) {
    const n = db.itens.filter(i => i[d.rm === "tier" ? "tier" : d.rm === "mar" ? "mar" : "cat"] === d.v).length;
    if (n) return alert(`${n} itens usam "${d.v}". Mude esses itens antes.`);
    if (!confirm(`Remover "${d.v}"?`)) return;
    const l = lista(d.rm);
    l.splice(l.indexOf(d.v), 1);
    salvar();
    todos();
    mestre();
  } else if (d.add) {
    const v = $("#nv-" + d.add).value.trim(), l = lista(d.add);
    if (v && !l.includes(v)) {
      l.push(v);
      salvar();
      todos();
      mestre();
    }
  } else if (d.rmc) {
    if (confirm(`Remover a origem "${d.rmc}"?`)) {
      delete db.contextos[d.rmc];
      if (db.origemCfg) delete db.origemCfg[d.rmc];
      ctx = Object.keys(db.contextos)[0] || "";
      salvar();
      mestre();
    }
  } else if (d.addc) {
    const v = $("#nc").value.trim();
    if (v && !db.contextos[v]) {
      db.contextos[v] = Object.fromEntries(db.tiers.map(t => [t, 1]));
      db.origemCfg[v] = { qtd: 1 };
      salvar();
      mestre();
    }
  } else if (d.ocfg) {
    db.origemCfg = db.origemCfg || {};
    db.origemCfg[d.ocfg] = {
      qtd: Math.max(1, +$("#qtd").value || 1),
      tiers: [...sel.tier],
      mares: [...sel.mar],
      cats: [...sel.cat]
    };
    salvar();
    mestre();
  } else if (d.ex) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(db, null, 2)], { type: "application/json" }));
    a.download = "data.json";
    a.click();
    baseJsonStr = JSON.stringify(db);
    verificarDirty();
  } else if (d.backup) {
    const pack = {
      dataExportacao: new Date().toISOString(),
      db,
      unicosObtidos,
      presets,
      historico: hist
    };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" }));
    a.download = `backup-espolios-opmi-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  } else if (d.reset) {
    if (confirm("Descartar edições deste navegador e recarregar o data.json publicado?")) {
      localStorage.removeItem(KEY);
      location.reload();
    }
  } else if (d.pc) {
    $("#pcr").textContent = importarPc($("#pc").value);
  }
});

document.addEventListener("input", e => {
  const t = e.target;
  if (t.id === "q") { fi.q = t.value; tabela(); }
  else if (t.id === "ck-all") $$("[data-ck]").forEach(c => c.checked = t.checked);
  else if (t.dataset.w) { db.contextos[t.dataset.w][t.dataset.t] = +t.value || 0; salvar(); }
  else if (t.dataset.oqtd) {
    db.origemCfg = db.origemCfg || {};
    db.origemCfg[t.dataset.oqtd] = db.origemCfg[t.dataset.oqtd] || {};
    db.origemCfg[t.dataset.oqtd].qtd = Math.max(1, Math.min(20, +t.value || 1));
    salvar();
  }
});

document.addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.f) { fi[t.dataset.f] = t.value; tabela(); }
  else if (t.id === "fj" && t.files[0]) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const parsed = JSON.parse(r.result);
        db = parsed.db ? parsed.db : parsed;
        if (parsed.unicosObtidos) { unicosObtidos = parsed.unicosObtidos; salvarUnicos(); }
        if (parsed.presets) { presets = parsed.presets; salvarPresets(); }
        salvar();
        todos();
        ctx = Object.keys(db.contextos)[0] || "";
        mestre();
        desenhar();
      } catch {
        alert("Arquivo JSON inválido.");
      }
    };
    r.readAsText(t.files[0]);
  }
});

$("#btn-salvar-preset").onclick = () => {
  const nome = prompt("Nome para este preset de filtros (ex.: East Blue · Início):");
  if (!nome || !nome.trim()) return;
  presets.push({
    nome: nome.trim(),
    ctx,
    qtd: +$("#qtd").value || 1,
    tiers: [...sel.tier],
    mares: [...sel.mar],
    cats: [...sel.cat]
  });
  salvarPresets();
  desenhar();
};

$("#btn-som").onclick = () => {
  somAtivo = !somAtivo;
  localStorage.setItem("espolios-som", somAtivo ? "1" : "0");
  $("#btn-som").textContent = `🔊 Som: ${somAtivo ? "ON" : "OFF"}`;
  if (somAtivo) tocarSomSaque(true);
};

$("#btn-mar").onclick = toggleMar;
$("#rolar-btn").onclick = rolar;
$("#limpar-hist").onclick = () => { hist = []; localStorage.removeItem(KEY_HIST); desenharHist(); };
$("#limpar-unicos").onclick = () => {
  if (confirm("Devolver todos os itens únicos para a tabela de sorteio?")) {
    unicosObtidos = [];
    salvarUnicos();
    desenharUnicos();
    desenhar();
  }
};

$("#sc").onclick = () => $("#senha").close();
$("#edc").onclick = () => $("#ed").close();
$("#sf").onsubmit = e => {
  e.preventDefault();
  if ($("#sp").value.trim() === "ChaveMestra") {
    sessionStorage.mestre = 1;
    $("#sp").value = "";
    $("#se").hidden = true;
    $("#senha").close();
    aba("mestre");
  } else {
    $("#se").hidden = false;
  }
};

$("#edf").onsubmit = e => {
  e.preventDefault();
  const f = e.target, k = +f.dataset.k;
  const i = {
    nome: f.nome.value.trim(),
    valor: f.valor.value.trim(),
    desc: f.desc.value.trim(),
    tier: f.tier.value,
    mar: f.mar.value,
    cat: f.cat.value,
    unico: f.unico.checked
  };
  k < 0 ? db.itens.push(i) : db.itens[k] = i;
  salvar();
  $("#ed").close();
  tabela();
  desenhar();
};

init();
