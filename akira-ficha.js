const STORAGE_KEY = "mar_indomavel_ficha_akira_v1";
const AUTH_SESSION_KEY = "mar_indomavel_auth_akira_v1";
const PLAYER_PASSWORDS = ["peixefrito"];
const MASTER_PASSWORDS = ["chavemestra", "chave mestra"];

function normalizeSecret(val) {
  return String(val || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function cloneDefaultData() {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

const FISHMAN_ENVS = {
  normal: {
    label: "🌊 Padrão / Em Terra Firme",
    summary: "Pele Escamosa ativa (-1 de dano de ataques físicos recebidos)",
    isHeat: false
  },
  subaquatico: {
    label: "🐠 Habitat Marítimo (Subaquático)",
    summary: "Respiração subaquática natural • +1D4 em testes de Força e Destreza na água • -1 dano físico",
    isHeat: false
  },
  "calor-extremo": {
    label: "🔥 Calor Extremo",
    summary: "-4 em testes de Destreza (DES) • Perde bônus de Pele Escamosa • Dano de Fogo: +2 de dano recebido",
    isHeat: true
  }
};

const DEFAULT_DATA = {
  name: "Akira Tansui",
  race: "Homem-peixe (Peixe-espada)",
  fv: 5,
  age: "( ? )",
  speed: "9 metros",
  style: "Nitoryu (Duas Espadas)",
  job: "Capitão",
  akuma: "Nenhuma",
  hpAtual: 60,
  hpMax: 60,
  stAtual: 22,
  stMax: 22,
  ca: 14,
  pp: 0,
  aa: "Nitoryu - Duas Espadas: 2D4 +5 (FOR)",
  berries: 57,
  bounty: 0,
  tempStatus: "",
  maxSkills: 5,
  slotsMax: 11,
  fishmanEnv: "normal",
  attributes: {
    FOR: { base: 20, bonus: 5 },
    DES: { base: 19, bonus: 4 },
    CON: { base: 17, bonus: 3 },
    INT: { base: 9, bonus: -1 },
    SAB: { base: 19, bonus: 4 },
    CAR: { base: 10, bonus: 0 }
  },
  racePassives: [
    {
      name: "Pele Escamosa",
      desc: "Sua pele é resistente a golpes físicos comuns. Você recebe -1 de dano de todos os ataques físicos recebidos."
    },
    {
      name: "Habitat Marítimo",
      desc: "Respiração subaquática natural.\n+1D4 em testes de Força e Destreza dentro da água."
    },
    {
      name: "Vulnerabilidade ao Calor",
      desc: "Dano de Fogo: +2 de dano recebido.\nCalor Extremo: -4 em testes de Destreza (DES) e perda do bônus de Pele Escamosa ao estar em ambientes com calor extremo."
    },
    {
      name: "Habilidade Ativa: Couraça de Escamas",
      desc: "Custo: Reação (ao ser alvo de um ataque).\nEfeito: Por um breve momento, você endurece suas escamas ou a umidade ao redor do seu corpo. Você reduz todo o dano recebido deste ataque pela metade. Se o ataque for de natureza física (soco, chute, corte), o atacante recebe 1D4 de dano de recuo (devido à dureza da sua pele). Recarga: Uma vez por descanso curto."
    }
  ],
  jobFeatures: [
    {
      name: "Voz de Comando",
      desc: "Durante interações sociais cruciais (como negociar o pagamento de uma missão do Mural ou blefar para autoridades), o Capitão pode dar Vantagem (rolar duas vezes o d20 e pegar o maior valor) para si mesmo ou para um aliado em um teste de Carisma (CAR). Essa habilidade pode ser usada uma vez por ilha/sessão."
    },
    {
      name: "Presença Imponente",
      desc: "O Capitão adiciona um bônus de +2 em testes de Intimidação. Inimigos comuns ou civis pensam duas vezes antes de tentar passar a perna na tripulação quando o Capitão está presente."
    }
  ],
  enabledSkills: [
    {
      name: "1. Força Abissal",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Como um Homem-Peixe, a força base de Akira é naturalmente dez vezes superior à de um humano comum. Ele tem Vantagem em testes de Força (Atletismo) para levantar objetos pesados, quebrar portas ou arremessar coisas."
    },
    {
      name: "2. Corte em Cruz / Nitoryu (Atq Físico)",
      type: "Habilidade",
      cost: "Ação Padrão | 2 de Estamina",
      desc: "Um ataque fundamental e brutal de duas espadas simultâneas em formato de \"X\". Akira rola o ataque apenas uma vez. Se acertar, soma o dano base das duas espadas juntas (Ex: 1d6 + 1d6 + FOR/DES) em um único golpe devastador."
    },
    {
      name: "3. Fluxo Invertido (Reação/Contra-Ataque)",
      type: "Habilidade",
      cost: "Reação | 3 de Estamina",
      desc: "Quando um inimigo declara um ataque corpo a corpo contra Akira, ele usa a guarda de suas duas espadas para aparar o golpe e desferir um corte imediato. É realizada uma Rolagem Disputada entre o ataque do inimigo e o 1d20 + FOR/DES do Akira. Se Akira vencer, ele sofre 0 de dano e contra-ataca causando o dano normal de sua arma. Se perder ou empatar, o contra-ataque falha e ele recebe o dano do inimigo normalmente."
    }
  ],
  memorySkills: [],
  learnableSkills: [
    {
      name: "1. Foco Implacável (Foco em Acerto no Combate)",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "O estilo de duas espadas exige ritmo, e Akira não perde o foco facilmente. Uma vez por combate, se ele rolar uma Falha Crítica (um 1 natural no d20) ou errar um ataque corpo a corpo, ele pode ignorar a distração, ajustar a postura e rolar o dado de ataque novamente. Ele deve aceitar o segundo resultado."
    },
    {
      name: "2. Guarda Nitoryu (Defesa com Duas Espadas)",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Enquanto estiver empunhando uma espada em cada mão, Akira usa as lâminas de forma defensiva para bloquear golpes. Ele recebe +1 constante na sua Defesa/CA."
    },
    {
      name: "3. Bico de Espadarte (Aceleração Rápida)",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Peixes-espada são os nadadores mais rápidos do oceano devido à sua aerodinâmica. Akira tem Vantagem (rola 2 dados e pega o maior) em testes de Iniciativa no começo do combate, sendo frequentemente o primeiro a agir."
    },
    {
      name: "5. Ritmo do Fluxo e Refluxo",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "O estilo de duas espadas é contínuo como as marés. Se Akira errar um ataque contra um inimigo, o movimento não é desperdiçado: ele usa o giro do corpo para impulsionar a segunda espada, ganhando +2 na rolagem de acerto do seu próximo ataque."
    },
    {
      name: "6. Estocada Perfurante (Técnica Física)",
      type: "Ativa",
      cost: "Ação Padrão | 2 de Estamina",
      desc: "Inspirado no focinho do peixe-espada, Akira faz um avanço rápido em linha reta. Ele ataca com uma estocada poderosa que perfura a guarda inimiga. O alvo atingido toma 1d8 + FOR/DES de dano e é empurrado uma Zona para trás pela força do impacto."
    },
    {
      name: "8. Roda d'Água (Técnica de Área / Leve Foco em Água)",
      type: "Ativa",
      cost: "Ação Padrão | 3 de Estamina",
      desc: "Akira gira o corpo no ar em 360 graus, criando um rastro de água que acompanha as lâminas através da umidade do ar. Ele atinge todos os inimigos que estejam próximos a ele na mesma Zona. Cada inimigo atingido toma 1d6 + FOR/DES de dano cortante."
    },
    {
      name: "9. Gota Perfurante (Ataque à Distância / Efeito de Água)",
      type: "Ativa",
      cost: "Ação Padrão | 3 de Estamina",
      desc: "Akira concentra a umidade nas pontas de suas espadas e realiza um movimento de corte tão rápido que arremessa lâminas de água pressurizada pelo ar. Permite que ele ataque um inimigo que esteja em uma Zona Adjacente (à distância), causando o dano normal da sua arma como dano cortante/água."
    }
  ],
  inventory: [
    {
      name: "Katana Básica de Aço / 01",
      category: "Arma",
      status: "Equipado",
      slots: 1,
      uses: "Médio Prazo",
      value: "0",
      desc: "Katana simples. Por ser leve e rápida, permite desferir golpes ágeis."
    },
    {
      name: "Katana Básica de Aço / 02",
      category: "Arma",
      status: "Equipado",
      slots: 1,
      uses: "Médio Prazo",
      value: "0",
      desc: "Katana simples. Por ser leve e rápida, permite desferir golpes ágeis."
    },
    {
      name: "Kimono Espadachim bicolocado",
      category: "Equipamento",
      status: "Equipado",
      slots: 1,
      uses: "-",
      value: "-",
      desc: "Um kimono de alta qualidade com um design estilizado e assimétrico: a metade direita é de um tom vermelho vibrante e a esquerda é branca. É amarrado na cintura por uma larga faixa (Obi)."
    },
    {
      name: "Frasco de Óleo para Polimento de Lâminas",
      category: "Consumível",
      status: "No Inventário",
      slots: 1,
      uses: "3/3",
      value: "0",
      desc: "Usado para limpar sangue e sal do mar das katanas, evitando ferrugem. Rende 3 manutenções em descanso curto."
    }
  ],
  appearance: "Estatura alta com um nariz pontudo de peixe-espada, possui vestimentas orientais — incluindo um kimono bicolocado vermelho e branco com faixa obi — e porta duas katanas.",
  backstory: `Durante sua infância, sua aldeia foi atacada. Tudo o que o jovem peixe-espada pôde ver foi uma chuva vermelha carmesim clarear e cair do céu, e antes que pudesse notar qualquer coisa, todas as casas e os arredores estavam em chamas. Logo depois, foi sequestrado e preso por um grupo de contrabandistas.

Com incertezas e medo sobre o seu futuro, durante a viagem no navio dos contrabandistas, eles foram atacados por um espadachim misterioso que anos depois descobriria que se tratava de Kasumi Shiori, o maior espadachim do mundo e tripulante do Rei dos Piratas.

Esse espadachim, após salvar sua vida, o inspirou a seguir o caminho da espada e conquistar a força capaz de quebrar as próprias algemas, para nunca mais perder sua liberdade. (Pode alterar ou adicionar detalhes à vontade — durante as sessões, você também pode adicionar elementos livremente à história, como comidas típicas da sua terra natal).`,
  psycheGoals: "Quebrar qualquer corrente antes que ela seja fechada; alcançar o patamar de Kasumi Shiori com o Nitoryu; manter a tripulação livre, unida e protegida.",
  psycheFears: "Chuva carmesim, incêndios e chamas; impulsividade ao ver alguém preso ou algemado; orgulho teimoso e cabeça dura (INT -1).",
  psycheTraits: "Corajoso, leal à tripulação, disciplinado com as duas katanas, gosta de aventura e de ler/aprender no seu próprio ritmo.",
  psycheIdeals: "A liberdade só é garantida pela força; nunca recusar um duelo justo; nunca atacar alguém indefeso; honrar a palavra dada como capitão.",
  notes: ""
};

let state = loadState();
let appInitialized = false;
let pointerDrag = null;
let pendingRemove = null;
let pendingEdit = null;
let rollHistory = [];

function getZoneArray(zone) {
  if (!Array.isArray(state.memorySkills)) state.memorySkills = [];
  if (zone === "enabled") return state.enabledSkills;
  if (zone === "memory") return state.memorySkills;
  return state.learnableSkills;
}

function unlockSheet(role) {
  try {
    sessionStorage.setItem(AUTH_SESSION_KEY, role);
  } catch (_) {}

  document.getElementById("lock-screen").hidden = true;
  document.getElementById("sheet-app").hidden = false;
  document.getElementById("lock-error").hidden = true;
  document.getElementById("lock-password").value = "";

  const roleBadge = document.getElementById("role-badge");
  if (roleBadge) {
    roleBadge.textContent = role === "master" ? "Modo Mestre" : "Modo Jogador";
  }

  if (!appInitialized) {
    setupTabs();
    setupQuickAdjustButtons();
    setupDiceRoller();
    setupFishmanEnv();
    setupGlobalPointerDrag();
    setupModals();
    setupColorPalettes();
    setupActions();
    init();
    appInitialized = true;
  }
}

function lockSheet() {
  try {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  } catch (_) {}

  document.getElementById("sheet-app").hidden = true;
  document.getElementById("lock-screen").hidden = false;
  const input = document.getElementById("lock-password");
  input.value = "";
  input.focus();
}

function attemptUnlock(rawPassword) {
  const normalized = normalizeSecret(rawPassword);
  const errorEl = document.getElementById("lock-error");
  const input = document.getElementById("lock-password");

  if (!normalized) return;

  if (PLAYER_PASSWORDS.includes(normalized)) {
    unlockSheet("player");
  } else if (MASTER_PASSWORDS.includes(normalized)) {
    unlockSheet("master");
  } else {
    errorEl.hidden = false;
    input.select();
  }
}

function setupLockScreen() {
  try {
    const savedRole = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (savedRole === "player" || savedRole === "master") {
      unlockSheet(savedRole);
      return;
    }
  } catch (_) {}

  const form = document.getElementById("lock-form");
  const input = document.getElementById("lock-password");
  const unlockBtn = document.getElementById("btn-unlock");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    attemptUnlock(input.value);
  });

  if (unlockBtn) {
    unlockBtn.addEventListener("click", () => {
      attemptUnlock(input.value);
    });
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...cloneDefaultData(),
        ...parsed,
        fishmanEnv: parsed.fishmanEnv || DEFAULT_DATA.fishmanEnv,
        memorySkills: Array.isArray(parsed.memorySkills) ? parsed.memorySkills : []
      };
    }
  } catch (e) {
    console.error("Erro ao carregar ficha:", e);
  }
  return cloneDefaultData();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
  const badge = document.getElementById("save-status");
  if (badge) {
    badge.textContent = "Salvo agora ✓";
    clearTimeout(window._saveTimer);
    window._saveTimer = setTimeout(() => {
      badge.textContent = "Salvo automaticamente";
    }, 1500);
  }
}

function calcBonusFromBase(val) {
  const n = Number(val);
  if (Number.isNaN(n)) return 0;
  if (n >= 10) return Math.floor((n - 11) / 2);
  return Math.floor((n - 10) / 2);
}

function formatMod(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function updateBars() {
  const hpPct = state.hpMax > 0 ? Math.max(0, Math.min(100, (state.hpAtual / state.hpMax) * 100)) : 0;
  const stPct = state.stMax > 0 ? Math.max(0, Math.min(100, (state.stAtual / state.stMax) * 100)) : 0;
  document.getElementById("hp-bar").style.width = `${hpPct}%`;
  document.getElementById("st-bar").style.width = `${stPct}%`;
}

function renderSimpleFields() {
  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.dataset.field;
    if (state[key] !== undefined) {
      el.value = state[key];
    }
    el.addEventListener("input", () => {
      state[key] = el.type === "number" ? Number(el.value) : el.value;
      if (key === "hpAtual" || key === "hpMax" || key === "stAtual" || key === "stMax") {
        updateBars();
      }
      saveState();
    });
  });
  updateBars();
}

function renderAttributes() {
  const grid = document.getElementById("attr-grid");
  grid.innerHTML = "";

  Object.entries(state.attributes).forEach(([abbr, data]) => {
    const box = document.createElement("div");
    box.className = "attr-box";

    box.innerHTML = `
      <span class="attr-name">${abbr}</span>
      <input type="number" class="attr-base" value="${data.base}" aria-label="Valor base de ${abbr}">
      <div class="attr-bonus-wrap">
        <span>Bônus:</span>
        <input type="number" class="attr-bonus" value="${data.bonus}" aria-label="Bônus de ${abbr}">
      </div>
      <button type="button" class="btn-roll-attr">Rolar 1d20</button>
    `;

    const baseInput = box.querySelector(".attr-base");
    const bonusInput = box.querySelector(".attr-bonus");
    const rollBtn = box.querySelector(".btn-roll-attr");

    baseInput.addEventListener("input", () => {
      const newBase = Number(baseInput.value) || 0;
      const autoBonus = calcBonusFromBase(newBase);
      state.attributes[abbr].base = newBase;
      state.attributes[abbr].bonus = autoBonus;
      bonusInput.value = autoBonus;
      saveState();
    });

    bonusInput.addEventListener("input", () => {
      state.attributes[abbr].bonus = Number(bonusInput.value) || 0;
      saveState();
    });

    rollBtn.addEventListener("click", () => {
      const d20 = Math.floor(Math.random() * 20) + 1;
      const mod = Number(state.attributes[abbr].bonus) || 0;
      const total = d20 + mod;
      showDiceResult(
        `Teste de ${abbr}: 1d20 (${d20}) ${formatMod(mod)} = ${total}`,
        `${abbr}: ${total} (${d20}${formatMod(mod)})`
      );
    });

    grid.appendChild(box);
  });
}

function renderDiceHistory() {
  const wrap = document.getElementById("dice-history-wrap");
  const list = document.getElementById("dice-history-list");
  if (!wrap || !list) return;

  if (rollHistory.length === 0) {
    wrap.hidden = true;
    list.innerHTML = "";
    return;
  }

  wrap.hidden = false;
  list.innerHTML = "";
  rollHistory.forEach((entry, index) => {
    const chip = document.createElement("span");
    chip.className = index === 0 ? "dice-history-chip latest" : "dice-history-chip";
    chip.textContent = `${entry.time} • ${entry.shortText}`;
    chip.title = entry.fullText;
    list.appendChild(chip);
  });
}

function showDiceResult(text, shortLabel = null) {
  const res = document.getElementById("dice-result");
  res.textContent = text;

  const now = new Date();
  const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  rollHistory.unshift({
    time: timeStr,
    fullText: text,
    shortText: shortLabel || text.replace(/^Rolagem\s+/i, "")
  });
  if (rollHistory.length > 5) {
    rollHistory.length = 5;
  }
  renderDiceHistory();
}

function setupQuickAdjustButtons() {
  document.querySelectorAll(".btn-mini").forEach((btn) => {
    if (!btn.dataset.target) return;
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const op = btn.dataset.op;
      const deltaInput = document.getElementById(`${target}-delta`);
      const amount = Number(deltaInput.value) || 0;
      if (amount <= 0) return;

      const fieldKey = target === "hp" ? "hpAtual" : "stAtual";
      const current = Number(state[fieldKey]) || 0;
      state[fieldKey] = op === "sub" ? current - amount : current + amount;

      document.getElementById(`${target}-atual`).value = state[fieldKey];
      deltaInput.value = "";
      updateBars();
      saveState();
    });
  });
}

function setupDiceRoller() {
  document.querySelectorAll(".btn-dice[data-die]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sides = Number(btn.dataset.die);
      const roll = Math.floor(Math.random() * sides) + 1;
      showDiceResult(`Rolagem 1d${sides}: ${roll}`, `1d${sides} = ${roll}`);
    });
  });

  document.getElementById("btn-nitoryu-aa").addEventListener("click", () => {
    const d4a = Math.floor(Math.random() * 4) + 1;
    const d4b = Math.floor(Math.random() * 4) + 1;
    const forMod = Number(state.attributes.FOR?.bonus) || 0;
    const total = d4a + d4b + forMod;
    showDiceResult(
      `AA Nitoryu: 2d4 (${d4a} + ${d4b}) ${formatMod(forMod)} = ${total}`,
      `Nitoryu: ${total} (${d4a}+${d4b}${formatMod(forMod)})`
    );
  });

  document.getElementById("btn-habitat-maritimo").addEventListener("click", () => {
    const d4 = Math.floor(Math.random() * 4) + 1;
    showDiceResult(
      `Habitat Marítimo (FOR/DES na água): +1d4 (${d4})`,
      `Água +1d4 = ${d4}`
    );
  });

  const btnClearHistory = document.getElementById("btn-clear-history");
  if (btnClearHistory) {
    btnClearHistory.addEventListener("click", () => {
      rollHistory = [];
      renderDiceHistory();
    });
  }
}

function renderFishmanEnv() {
  const select = document.getElementById("fishman-env-select");
  const banner = document.getElementById("fishman-active-banner");
  const envKey = FISHMAN_ENVS[state.fishmanEnv] ? state.fishmanEnv : "normal";
  const info = FISHMAN_ENVS[envKey];

  select.value = envKey;
  banner.classList.toggle("heat-active", Boolean(info.isHeat));
  banner.innerHTML = `<strong>Condição Ativa — ${info.label}:</strong> ${info.summary}`;

  document.querySelectorAll(".fishman-env-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.env === envKey);
  });
}

function setupFishmanEnv() {
  const select = document.getElementById("fishman-env-select");
  select.addEventListener("change", () => {
    state.fishmanEnv = select.value;
    renderFishmanEnv();
    saveState();
  });

  document.querySelectorAll(".fishman-env-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const env = chip.dataset.env;
      if (!FISHMAN_ENVS[env]) return;
      state.fishmanEnv = env;
      renderFishmanEnv();
      saveState();
    });
  });
}

function renderStaticFeatures() {
  const raceList = document.getElementById("race-passives-list");
  raceList.innerHTML = state.racePassives
    .map((f) => `<div class="feature-item"><h3>${f.name}</h3><p>${formatColorText(f.desc)}</p></div>`)
    .join("");

  const jobList = document.getElementById("job-features-list");
  jobList.innerHTML = state.jobFeatures
    .map((f) => `<div class="feature-item"><h3>${f.name}</h3><p>${formatColorText(f.desc)}</p></div>`)
    .join("");
}

function moveSkill(fromZone, fromIndex, toZone, targetIndex = null) {
  const sourceArr = getZoneArray(fromZone);
  const destArr = getZoneArray(toZone);

  if (!sourceArr[fromIndex]) return;

  if (fromZone === toZone) {
    if (targetIndex === null || targetIndex === fromIndex) return;
    const [item] = sourceArr.splice(fromIndex, 1);
    const insertAt = targetIndex > fromIndex ? targetIndex - 1 : targetIndex;
    sourceArr.splice(insertAt, 0, item);
  } else {
    const [item] = sourceArr.splice(fromIndex, 1);
    if (typeof targetIndex === "number" && targetIndex >= 0 && targetIndex <= destArr.length) {
      destArr.splice(targetIndex, 0, item);
    } else {
      destArr.push(item);
    }
  }

  saveState();
  renderSkills();
}

function clearZoneHighlights() {
  document.querySelectorAll(".drop-zone-card.drag-over").forEach((el) => {
    el.classList.remove("drag-over");
  });
}

function clearBrowserTextSelection() {
  const sel = window.getSelection ? window.getSelection() : null;
  if (sel) {
    if (sel.removeAllRanges) sel.removeAllRanges();
    else if (sel.empty) sel.empty();
  }
}

function cleanupPointerDrag() {
  document.body.classList.remove("is-dragging-skill");
  clearBrowserTextSelection();
  if (!pointerDrag) return;
  if (pointerDrag.ghost && pointerDrag.ghost.parentNode) {
    pointerDrag.ghost.parentNode.removeChild(pointerDrag.ghost);
  }
  if (pointerDrag.sourceEl) {
    pointerDrag.sourceEl.classList.remove("dragging-source");
  }
  clearZoneHighlights();
  pointerDrag = null;
}

function setupGlobalPointerDrag() {
  document.addEventListener("selectstart", (e) => {
    if (pointerDrag || e.target.closest(".skill-card")) {
      e.preventDefault();
    }
  });

  document.addEventListener("pointermove", (e) => {
    if (!pointerDrag) return;

    e.preventDefault();
    clearBrowserTextSelection();

    const dx = e.clientX - pointerDrag.startX;
    const dy = e.clientY - pointerDrag.startY;
    if (!pointerDrag.active && Math.hypot(dx, dy) > 5) {
      document.body.classList.add("is-dragging-skill");
      pointerDrag.active = true;
      pointerDrag.sourceEl.classList.add("dragging-source");

      const ghost = pointerDrag.sourceEl.cloneNode(true);
      ghost.classList.add("floating-drag");
      ghost.style.width = `${pointerDrag.rect.width}px`;
      ghost.style.height = `${pointerDrag.rect.height}px`;
      document.body.appendChild(ghost);
      pointerDrag.ghost = ghost;
    }

    if (!pointerDrag.active || !pointerDrag.ghost) return;

    pointerDrag.ghost.style.left = `${e.clientX - pointerDrag.offsetX}px`;
    pointerDrag.ghost.style.top = `${e.clientY - pointerDrag.offsetY}px`;

    pointerDrag.ghost.style.display = "none";
    const underEl = document.elementFromPoint(e.clientX, e.clientY);
    pointerDrag.ghost.style.display = "";

    const zoneCard = underEl ? underEl.closest(".drop-zone-card") : null;
    clearZoneHighlights();
    if (zoneCard) {
      zoneCard.classList.add("drag-over");
    }
  });

  const finishDrag = (e) => {
    if (!pointerDrag) return;

    if (pointerDrag.active) {
      clearBrowserTextSelection();
      if (pointerDrag.ghost) pointerDrag.ghost.style.display = "none";
      const underEl = document.elementFromPoint(e.clientX, e.clientY);
      if (pointerDrag.ghost) pointerDrag.ghost.style.display = "";

      const targetCard = underEl ? underEl.closest(".skill-card") : null;
      const targetZoneCard = underEl ? underEl.closest(".drop-zone-card") : null;

      const fromZone = pointerDrag.fromZone;
      const fromIndex = pointerDrag.index;

      cleanupPointerDrag();

      if (targetCard && targetCard.dataset.zone) {
        const toZone = targetCard.dataset.zone;
        const targetIdx = Number(targetCard.dataset.index);
        moveSkill(fromZone, fromIndex, toZone, targetIdx);
      } else if (targetZoneCard && targetZoneCard.dataset.zone) {
        const toZone = targetZoneCard.dataset.zone;
        moveSkill(fromZone, fromIndex, toZone);
      }
      return;
    }

    cleanupPointerDrag();
  };

  document.addEventListener("pointerup", finishDrag);
  document.addEventListener("pointercancel", cleanupPointerDrag);
  window.addEventListener("blur", cleanupPointerDrag);
}

function openRemoveConfirm(zone, idx, permanentDelete = false) {
  const arr = getZoneArray(zone);
  const sk = arr[idx];
  if (!sk) return;

  pendingRemove = { zone, idx, permanentDelete };
  const textEl = document.getElementById("confirm-modal-text");
  if (permanentDelete) {
    textEl.textContent = `Tem certeza de que deseja excluir permanentemente a skill "${sk.name}"?`;
  } else {
    textEl.textContent = `Tem certeza de que deseja remover "${sk.name}" de Skills Habilitadas e devolvê-la para a Árvore de Skills?`;
  }
  document.getElementById("confirm-modal").hidden = false;
}

function openEditSkillModal(zone, idx) {
  const arr = getZoneArray(zone);
  const sk = arr[idx];
  if (!sk) return;

  pendingEdit = { zone, idx };
  document.getElementById("edit-skill-name").value = sk.name || "";
  document.getElementById("edit-skill-type").value = sk.type || "";
  document.getElementById("edit-skill-cost").value = sk.cost || "";
  document.getElementById("edit-skill-desc").value = sk.desc || "";
  document.getElementById("edit-skill-modal").hidden = false;
  document.getElementById("edit-skill-name").focus();
}

function setupModals() {
  const confirmModal = document.getElementById("confirm-modal");
  document.getElementById("btn-cancel-remove").addEventListener("click", () => {
    pendingRemove = null;
    confirmModal.hidden = true;
  });

  document.getElementById("btn-confirm-remove").addEventListener("click", () => {
    if (pendingRemove) {
      const { zone, idx, permanentDelete } = pendingRemove;
      if (permanentDelete) {
        const arr = getZoneArray(zone);
        arr.splice(idx, 1);
        saveState();
        renderSkills();
      } else {
        moveSkill(zone, idx, "learnable");
      }
      pendingRemove = null;
    }
    confirmModal.hidden = true;
  });

  const editModal = document.getElementById("edit-skill-modal");
  document.getElementById("btn-cancel-edit-skill").addEventListener("click", () => {
    pendingEdit = null;
    editModal.hidden = true;
  });

  document.getElementById("edit-skill-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!pendingEdit) return;
    const arr = getZoneArray(pendingEdit.zone);
    const sk = arr[pendingEdit.idx];
    if (sk) {
      sk.name = document.getElementById("edit-skill-name").value.trim() || sk.name;
      sk.type = document.getElementById("edit-skill-type").value.trim();
      sk.cost = document.getElementById("edit-skill-cost").value.trim();
      sk.desc = document.getElementById("edit-skill-desc").value;
      saveState();
      renderSkills();
    }
    pendingEdit = null;
    editModal.hidden = true;
  });
}

function buildActionButtonsForZone(zone, idx) {
  const wrap = document.createElement("div");
  wrap.className = "skill-actions";

  if (zone === "enabled") {
    const btnMem = document.createElement("button");
    btnMem.type = "button";
    btnMem.className = "btn-mini mem";
    btnMem.textContent = "Enviar p/ Memória";
    btnMem.addEventListener("click", () => moveSkill("enabled", idx, "memory"));

    const btnRem = document.createElement("button");
    btnRem.type = "button";
    btnRem.className = "btn-mini dmg";
    btnRem.textContent = "Remover";
    btnRem.addEventListener("click", () => openRemoveConfirm("enabled", idx, false));

    wrap.append(btnMem, btnRem);
  } else if (zone === "memory") {
    const btnHab = document.createElement("button");
    btnHab.type = "button";
    btnHab.className = "btn-mini heal";
    btnHab.textContent = "Habilitar Skill";
    btnHab.addEventListener("click", () => moveSkill("memory", idx, "enabled"));

    const btnRem = document.createElement("button");
    btnRem.type = "button";
    btnRem.className = "btn-mini dmg";
    btnRem.textContent = "Devolver p/ Árvore";
    btnRem.addEventListener("click", () => moveSkill("memory", idx, "learnable"));

    wrap.append(btnHab, btnRem);
  } else {
    const btnHab = document.createElement("button");
    btnHab.type = "button";
    btnHab.className = "btn-mini heal";
    btnHab.textContent = "Habilitar Skill";
    btnHab.addEventListener("click", () => moveSkill("learnable", idx, "enabled"));

    const btnMem = document.createElement("button");
    btnMem.type = "button";
    btnMem.className = "btn-mini mem";
    btnMem.textContent = "Guardar na Memória";
    btnMem.addEventListener("click", () => moveSkill("learnable", idx, "memory"));

    wrap.append(btnHab, btnMem);
  }

  return wrap;
}

function createPencilButton(zone, idx) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-edit-pencil";
  btn.title = "Editar habilidade";
  btn.setAttribute("aria-label", "Editar habilidade");
  btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>`;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    openEditSkillModal(zone, idx);
  });
  return btn;
}

function createSkillCard(sk, zone, idx) {
  const card = document.createElement("div");
  card.className = `skill-card ${zone}`;
  card.dataset.zone = zone;
  card.dataset.index = idx;

  const tagHtml = sk.type ? `<span class="skill-tag">${formatColorText(sk.type)}</span>` : "";
  const costHtml = sk.cost ? `<div class="skill-cost">${formatColorText(sk.cost)}</div>` : "";

  card.innerHTML = `
    <div>
      <div class="skill-top">
        <span class="skill-title"><span class="drag-grip" title="Segure e arraste para mover">⋮⋮</span>${formatColorText(sk.name)}</span>
        <div class="skill-type-group">${tagHtml}</div>
      </div>
      ${costHtml}
      <p class="skill-desc">${formatColorText(sk.desc)}</p>
    </div>
  `;

  const typeGroup = card.querySelector(".skill-type-group");
  if (typeGroup) {
    typeGroup.appendChild(createPencilButton(zone, idx));
  }

  card.appendChild(buildActionButtonsForZone(zone, idx));

  card.addEventListener("dragstart", (e) => e.preventDefault());

  card.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;

    e.preventDefault();
    clearBrowserTextSelection();

    const rect = card.getBoundingClientRect();
    pointerDrag = {
      fromZone: zone,
      index: idx,
      sourceEl: card,
      rect,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      active: false,
      ghost: null
    };
  });

  return card;
}

function renderSkills() {
  if (!Array.isArray(state.memorySkills)) state.memorySkills = [];

  const enabledContainer = document.getElementById("enabled-skills-list");
  const memoryContainer = document.getElementById("memory-skills-list");
  const learnableContainer = document.getElementById("learnable-skills-list");

  document.getElementById("enabled-count").textContent = state.enabledSkills.length;
  document.getElementById("memory-count").textContent = state.memorySkills.length;

  enabledContainer.innerHTML = "";
  if (state.enabledSkills.length === 0) {
    enabledContainer.innerHTML = `<div class="empty-zone-msg">Nenhuma skill habilitada no momento. Arraste uma habilidade para cá ou clique em "Habilitar Skill".</div>`;
  } else {
    state.enabledSkills.forEach((sk, idx) => {
      enabledContainer.appendChild(createSkillCard(sk, "enabled", idx));
    });
  }

  memoryContainer.innerHTML = "";
  if (state.memorySkills.length === 0) {
    memoryContainer.innerHTML = `<div class="empty-zone-msg">Biblioteca de Memória vazia (sem limite de capacidade). Arraste habilidades extras para cá para aprender depois.</div>`;
  } else {
    state.memorySkills.forEach((sk, idx) => {
      memoryContainer.appendChild(createSkillCard(sk, "memory", idx));
    });
  }

  learnableContainer.innerHTML = "";
  if (state.learnableSkills.length === 0) {
    learnableContainer.innerHTML = `<div class="empty-zone-msg">Todas as skills aprendíveis foram movidas.</div>`;
  } else {
    state.learnableSkills.forEach((sk, idx) => {
      learnableContainer.appendChild(createSkillCard(sk, "learnable", idx));
    });
  }
}

function updateSlotCount() {
  const totalSlots = state.inventory.reduce((acc, item) => {
    if (item.status === "Equipado") return acc;
    return acc + (Number(item.slots) || 0);
  }, 0);
  document.getElementById("slots-used").textContent = totalSlots;
}

function renderInventory() {
  const tbody = document.getElementById("inventory-tbody");
  tbody.innerHTML = "";

  state.inventory.forEach((item, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input type="text" value="${escapeHtml(item.name)}" data-k="name"></td>
      <td>
        <select data-k="category">
          <option value="Equipamento" ${item.category === "Equipamento" ? "selected" : ""}>Equipamento</option>
          <option value="Consumível" ${item.category === "Consumível" ? "selected" : ""}>Consumível</option>
          <option value="Arma" ${item.category === "Arma" ? "selected" : ""}>Arma</option>
          <option value="Item Chave" ${item.category === "Item Chave" ? "selected" : ""}>Item Chave</option>
          <option value="Outro" ${item.category === "Outro" ? "selected" : ""}>Outro</option>
        </select>
      </td>
      <td>
        <select data-k="status">
          <option value="Equipado" ${item.status === "Equipado" ? "selected" : ""}>Equipado</option>
          <option value="No Inventário" ${item.status === "No Inventário" ? "selected" : ""}>No Inventário</option>
          <option value="Guardado no Navio" ${item.status === "Guardado no Navio" ? "selected" : ""}>Guardado no Navio</option>
        </select>
      </td>
      <td><input type="number" value="${item.slots}" min="0" step="0.5" data-k="slots" style="width:65px"></td>
      <td><input type="text" value="${escapeHtml(item.uses)}" data-k="uses" style="width:70px"></td>
      <td><input type="text" value="${escapeHtml(item.value)}" data-k="value" style="width:75px"></td>
      <td><input type="text" value="${escapeHtml(item.desc)}" data-k="desc"></td>
      <td><button type="button" class="btn-mini dmg">Excluir</button></td>
    `;

    tr.querySelectorAll("input, select").forEach((inp) => {
      const evtName = inp.tagName === "SELECT" ? "change" : "input";
      inp.addEventListener(evtName, () => {
        const k = inp.dataset.k;
        state.inventory[idx][k] = k === "slots" ? Number(inp.value) || 0 : inp.value;
        updateSlotCount();
        saveState();
      });
    });

    tr.querySelector("button").addEventListener("click", () => {
      state.inventory.splice(idx, 1);
      saveState();
      renderInventory();
    });

    tbody.appendChild(tr);
  });

  updateSlotCount();
}

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

function setupActions() {
  document.getElementById("btn-lock").addEventListener("click", lockSheet);

  document.getElementById("btn-add-item").addEventListener("click", () => {
    state.inventory.push({
      name: "Novo Item",
      category: "Equipamento",
      status: "No Inventário",
      slots: 1,
      uses: "-",
      value: "0",
      desc: ""
    });
    saveState();
    renderInventory();
  });

  document.getElementById("btn-add-skill").addEventListener("click", () => {
    const name = prompt("Nome da nova Skill:");
    if (!name) return;
    const type = prompt("Tipo (Passiva ou Ativa):", "Ativa") || "Ativa";
    const cost = prompt("Custo (ex: Ação Padrão | 2 de Estamina):", "Ação Padrão") || "-";
    const desc = prompt("Descrição / Efeito:") || "";
    state.enabledSkills.push({ name, type, cost, desc });
    saveState();
    renderSkills();
  });

  document.getElementById("btn-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ficha-akira-tansui-mar-indomavel.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        state = {
          ...cloneDefaultData(),
          ...imported,
          fishmanEnv: imported.fishmanEnv || DEFAULT_DATA.fishmanEnv,
          memorySkills: Array.isArray(imported.memorySkills) ? imported.memorySkills : []
        };
        saveState();
        init();
        alert("Ficha importada com sucesso!");
      } catch {
        alert("Arquivo JSON inválido.");
      }
    };
    reader.readAsText(file);
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("Deseja restaurar todos os valores originais da ficha de Akira Tansui?")) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
      state = cloneDefaultData();
      init();
    }
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatColorText(rawText) {
  if (!rawText) return "";
  let safe = escapeHtml(rawText);
  safe = safe.replace(
    /\[cor=([a-zA-Z0-9#(),.%\s-]+)\]([\s\S]*?)\[\/cor\]/gi,
    (_, colorVal, inner) => {
      const cleanColor = colorVal.trim();
      return `<span style="color:${cleanColor};font-weight:600;">${inner}</span>`;
    }
  );
  return safe;
}

function applyColorToTextarea(textarea, colorHex) {
  if (!textarea) return;
  const start = textarea.selectionStart ?? 0;
  const end = textarea.selectionEnd ?? 0;
  const val = textarea.value;
  const selected = val.slice(start, end);

  if (!colorHex) {
    if (selected) {
      const cleaned = selected
        .replace(/\[cor=[^\]]+\]/gi, "")
        .replace(/\[\/cor\]/gi, "");
      textarea.value = val.slice(0, start) + cleaned + val.slice(end);
    } else {
      textarea.value = val
        .replace(/\[cor=[^\]]+\]/gi, "")
        .replace(/\[\/cor\]/gi, "");
    }
  } else {
    const targetText = selected || "palavra";
    const wrapped = `[cor=${colorHex}]${targetText}[/cor]`;
    textarea.value = val.slice(0, start) + wrapped + val.slice(end);
  }

  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.focus();
}

function setupColorPalettes() {
  document.querySelectorAll(".color-palette-mini[data-target-textarea]").forEach((palette) => {
    const targetId = palette.dataset.targetTextarea;
    const textarea = document.getElementById(targetId);
    palette.querySelectorAll(".color-swatch").forEach((btn) => {
      btn.addEventListener("click", () => applyColorToTextarea(textarea, btn.dataset.color || ""));
    });
  });

  const skillPalette = document.getElementById("skill-desc-palette");
  const skillDescInput = document.getElementById("edit-skill-desc");
  if (skillPalette && skillDescInput) {
    skillPalette.querySelectorAll(".color-swatch").forEach((btn) => {
      btn.addEventListener("click", () => applyColorToTextarea(skillDescInput, btn.dataset.color || ""));
    });
  }

  const notesInput = document.getElementById("char-notes");
  const notesPreview = document.getElementById("char-notes-preview");
  const updateNotesPreview = () => {
    if (!notesInput || !notesPreview) return;
    if (!notesInput.value.trim()) {
      notesPreview.innerHTML = `<span style="color:#9ca3af;">Prévia das anotações (exibe cores aplicadas)...</span>`;
    } else {
      notesPreview.innerHTML = formatColorText(notesInput.value);
    }
  };
  if (notesInput && notesPreview) {
    notesInput.addEventListener("input", updateNotesPreview);
    updateNotesPreview();
  }
}

function init() {
  renderSimpleFields();
  renderAttributes();
  renderStaticFeatures();
  renderFishmanEnv();
  renderSkills();
  renderInventory();
  const notesEl = document.getElementById("char-notes");
  if (notesEl) notesEl.dispatchEvent(new Event("input"));
}

setupLockScreen();
