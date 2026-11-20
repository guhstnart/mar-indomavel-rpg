const STORAGE_KEY = "mar_indomavel_ficha_alpha_v1";
const AUTH_SESSION_KEY = "mar_indomavel_auth_alpha_v1";
const PLAYER_PASSWORD = "RaitoRaijin";
const MASTER_PASSWORD = "ChaveMestra";

const DEFAULT_DATA = {
  name: "Alpha (Raito Raijin)",
  race: "Mink (?)",
  fv: 5,
  age: "15",
  speed: "12 metros",
  style: "Electro (Canaliza eletricidade nos punhos e corpo)",
  job: "O Vigia (O Guarda do Navio)",
  akuma: "Nenhuma (até o momento)",
  hpAtual: 51,
  hpMax: 51,
  stAtual: 19,
  stMax: 19,
  ca: 15,
  pp: 0,
  aa: "Soco de Luta - 1D6 +3 (FOR)",
  berries: 25,
  bounty: 0,
  tempStatus: "",
  maxSkills: 5,
  slotsMax: 7,
  attributes: {
    FOR: { base: 16, bonus: 3 },
    DES: { base: 20, bonus: 5 },
    CON: { base: 14, bonus: 1 },
    INT: { base: 15, bonus: 2 },
    SAB: { base: 17, bonus: 4 },
    CAR: { base: 7, bonus: -1 }
  },
  racePassives: [
    {
      name: "Estática",
      desc: "Seus ataques corpo a corpo causam +2 de dano elétrico adicional em inimigos ao contato físico."
    },
    {
      name: "Sentido Felino",
      desc: "Ao fazer um teste de Percepção, role um D4 adicional (1D20 + 1D4 = Resultado)."
    },
    {
      name: "Vulnerabilidade à Hidratação/Frio",
      desc: "Quando está encharcado ou em ambientes de frio extremo, seu dano elétrico é reduzido pela metade e você perde o bônus de Sentido Felino."
    },
    {
      name: "Habilidade Especial: Sulong",
      desc: "Requisito: Lua Cheia. Efeito: Aumenta todo dano elétrico e testes de Destreza em +1D4. Instinto Animal: No início de cada turno, role 1D8. Par (2,4,6,8): Controle total. Ímpar (1,3,5,7): Fúria total (ataca o alvo mais próximo, aliado ou inimigo). Consequência: Após 4 turnos, perde o próximo turno (exaustão) e sofre -4 em Destreza até o fim do próximo combate."
    }
  ],
  jobFeatures: [
    {
      name: "Sentinela da Gávea",
      desc: "Enquanto estiver consciente e em seu posto de vigia, o grupo (e o navio) não pode ser Surpreendido em combate. Uma vez por viagem de barco, pode fazer um teste de Sabedoria (Percepção) CD 13 para avistar frotas inimigas, tempestades ou ilhas ocultas com antecedência."
    },
    {
      name: "Reflexo de Interceptação",
      desc: "Uma vez por combate, quando um aliado a até 9m for alvo de um ataque físico bem-sucedido, gasta 2 de Estamina e usa sua Reação para entrar na frente. Rola Destreza (Acrobacia) contra o acerto inimigo; se for maior, desvia o golpe completamente."
    }
  ],
  enabledSkills: [
    {
      name: "Passo Pantera",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Os passos do Alpha são naturalmente abafados. Tem Vantagem (rola 2 dados e pega o maior) em testes de Furtividade para se aproximar de alguém pelas costas."
    },
    {
      name: "Radar Sensorial (Bigodes Elétricos)",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Recebe +2 na Percepção passiva para notar inimigos escondidos ou armadilhas elétricas."
    },
    {
      name: "Curto-Circuito (Paralisia Focada)",
      type: "Habilidade Ativa",
      cost: "Ação Padrão | 4 de Estamina",
      desc: "Soco focado em sobrecarregar o sistema nervoso. Não causa dano, mas o inimigo faz um Teste de CON; se falhar, sofre paralisia temporária (não realiza Ações, apenas se move no próximo turno)."
    }
  ],
  learnableSkills: [
    {
      name: "1. Pelagem Estática",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Sempre que um inimigo agarrar o Alpha ou acertar um ataque corpo a corpo desarmado contra ele, sofre 1 ponto de dano elétrico."
    },
    {
      name: "2. Metabolismo Artificial",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Devido às injeções do laboratório, tem Vantagem em testes de CON para resistir a venenos, toxinas e doenças."
    },
    {
      name: "5. Garra Voltaica (Ataque Básico de Electro)",
      type: "Ativa",
      cost: "Ação Padrão | 2 de Estamina",
      desc: "Ataque corpo a corpo normal que adiciona +1d4 de dano elétrico ao dano do soco."
    },
    {
      name: "6. Choque Nervoso (Controle / Paralisia Leve)",
      type: "Ativa",
      cost: "Ação Padrão | 3 de Estamina",
      desc: "Alvo toma o dano normal do soco e faz Teste de CON. Se falhar, o deslocamento cai pela metade no próximo turno."
    },
    {
      name: "7. Impulso Faísca (Mobilidade)",
      type: "Ativa",
      cost: "Ação Bônus | 2 de Estamina",
      desc: "Move-se para uma Zona Adjacente (ou se afasta de um inimigo) tão rápido que não gera Ataques de Oportunidade."
    },
    {
      name: "9. Clarão Elétrico (Debuff)",
      type: "Ativa",
      cost: "Ação Bônus | 2 de Estamina",
      desc: "Fagulha brilhante no rosto do inimigo. Teste de DES; se falhar, fica Ofuscado e tem desvantagem no próximo ataque."
    },
    {
      name: "10. Desfibrilador Manual (Suporte)",
      type: "Ativa",
      cost: "Ação Padrão | 5 de Estamina",
      desc: "Choque controlado no peito de um aliado caído com 0 HP. O aliado é estabilizado instantaneamente e acorda com 1 HP."
    }
  ],
  inventory: [
    {
      name: "Manto Vermelho de Viagem",
      category: "Equipamento",
      status: "Equipado",
      slots: 1,
      uses: "-",
      value: "?",
      desc: "Um capote curto e fluído feito de tecido resistente em tons de vermelho-fechado, decorado com uma larga faixa amarela em sua borda inferior. Traz memórias do lar."
    },
    {
      name: "Estimulante de Alerta",
      category: "Consumível",
      status: "No Inventário",
      slots: 1,
      uses: "2/2",
      value: "?",
      desc: "Pílulas amargas que ignoram exaustão por falta de sono por 24h em turnos de vigília."
    }
  ],
  appearance: "Estatura baixa e pelagem felina escura. Veste roupas discretas e práticas para não chamar atenção, com exceção de um manto vermelho rubi com detalhes em dourado. Usa faixas enroladas ao redor dos punhos.",
  backstory: `Durante a infância, você e seu irmão, Beta (Riki Raijin), foram reduzidos a meras cobaias em um laboratório secreto na grande ilha de Zou. Os cientistas por trás do projeto pertenciam a uma subespécie de Minks felinos de pelagem escura — uma linhagem escondida e detestada pelos outros Minks, famosa por gerar assassinos frios e implacáveis que priorizam seus objetivos acima de qualquer ética.

Sob o julgo deles, os dias se resumiam a testes cruéis, treinamentos físicos exaustivos e injeções diárias que os deixavam doentes e sofrendo com fortes efeitos colaterais. O seu único conforto era o apoio incondicional do seu irmão e a empatia silenciosa do Doutor Genn (Gennadios), que, apesar de carregar o sangue dessa mesma raça sombria, parecia ser o único a ter pena de vocês.

Até que uma noite mudou tudo. O Dr.Sigma te acordou de madrugada em meio a um caos de alarmes e guardas correndo pelos corredores. Durante a fuga desesperada, o Doutor foi atingido. Em um último ato para te salvar, ele te escondeu em um pequeno barco, envolveu-o com o seu próprio manto e deu a ordem final: "Fuja para bem longe e não olhe para trás". Você nunca mais o viu.

Após dias à deriva, você encontrou terra firme. Para sobreviver, tornou-se um caçador de recompensas e ladrão ocasional, vivendo sempre com o mínimo necessário. Hoje, embora seu corpo seja livre, sua mente ainda é prisioneira daquela noite. O que mais te atormenta é o peso da escolha que foi forçado a fazer... ter fugido e deixado seu irmão nas mãos deles.`,
  psycheGoals: "Encontrar e resgatar o Beta, descobrir o que aconteceu com o Doutor Genn / Dr. Sigma.",
  psycheFears: "Pânico ao ver agulhas ou hospitais, medo profundo do mar, agir de forma irracional para proteger quem gosta.",
  psycheTraits: "Instinto de sobrevivência afiado, lealdade inabalável com quem conquista sua confiança.",
  psycheIdeals: "Nunca abandonar um companheiro para trás de novo; roubar apenas de quem tem muito.",
  notes: ""
};

let state = loadState();
let appInitialized = false;
let draggedSkill = null;

function unlockSheet(role) {
  sessionStorage.setItem(AUTH_SESSION_KEY, role);
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
    setupSkillDropZones();
    setupActions();
    init();
    appInitialized = true;
  }
}

function lockSheet() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  document.getElementById("sheet-app").hidden = true;
  document.getElementById("lock-screen").hidden = false;
  document.getElementById("lock-password").value = "";
  document.getElementById("lock-password").focus();
}

function setupLockScreen() {
  const savedRole = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (savedRole === "player" || savedRole === "master") {
    unlockSheet(savedRole);
    return;
  }

  const form = document.getElementById("lock-form");
  const input = document.getElementById("lock-password");
  const errorEl = document.getElementById("lock-error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const typed = input.value.trim();
    if (typed === PLAYER_PASSWORD) {
      unlockSheet("player");
    } else if (typed === MASTER_PASSWORD) {
      unlockSheet("master");
    } else {
      errorEl.hidden = false;
      input.select();
    }
  });
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...structuredClone(DEFAULT_DATA), ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error("Erro ao carregar ficha:", e);
  }
  return structuredClone(DEFAULT_DATA);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
      showDiceResult(`Teste de ${abbr}: 1d20 (${d20}) ${formatMod(mod)} = ${total}`);
    });

    grid.appendChild(box);
  });
}

function showDiceResult(text) {
  const res = document.getElementById("dice-result");
  res.textContent = text;
}

function setupQuickAdjustButtons() {
  document.querySelectorAll(".btn-mini").forEach((btn) => {
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
      showDiceResult(`Rolagem 1d${sides}: ${roll}`);
    });
  });

  document.getElementById("btn-sentido-felino").addEventListener("click", () => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const d4 = Math.floor(Math.random() * 4) + 1;
    const sabMod = Number(state.attributes.SAB?.bonus) || 0;
    const total = d20 + d4 + sabMod;
    showDiceResult(`Sentido Felino (Percepção): 1d20 (${d20}) + 1d4 (${d4}) ${formatMod(sabMod)} = ${total}`);
  });
}

function renderStaticFeatures() {
  const raceList = document.getElementById("race-passives-list");
  raceList.innerHTML = state.racePassives
    .map((f) => `<div class="feature-item"><h3>${f.name}</h3><p>${f.desc}</p></div>`)
    .join("");

  const jobList = document.getElementById("job-features-list");
  jobList.innerHTML = state.jobFeatures
    .map((f) => `<div class="feature-item"><h3>${f.name}</h3><p>${f.desc}</p></div>`)
    .join("");
}

function moveSkill(fromZone, fromIndex, toZone, targetIndex = null) {
  const sourceArr = fromZone === "enabled" ? state.enabledSkills : state.learnableSkills;
  const destArr = toZone === "enabled" ? state.enabledSkills : state.learnableSkills;

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

function createSkillCard(sk, zone, idx) {
  const card = document.createElement("div");
  card.className = `skill-card ${zone}`;
  card.draggable = true;
  card.dataset.zone = zone;
  card.dataset.index = idx;

  const actionBtnHtml =
    zone === "enabled"
      ? `<button type="button" class="btn-mini dmg">Remover</button>`
      : `<button type="button" class="btn-mini heal">Habilitar Skill</button>`;

  card.innerHTML = `
    <div>
      <div class="skill-top">
        <span class="skill-title"><span class="drag-grip" title="Arraste para mover">⋮⋮</span>${sk.name}</span>
        <span class="skill-tag">${sk.type}</span>
      </div>
      <div class="skill-cost">${sk.cost}</div>
      <p class="skill-desc">${sk.desc}</p>
    </div>
    <div class="skill-actions">
      ${actionBtnHtml}
    </div>
  `;

  card.addEventListener("dragstart", (e) => {
    draggedSkill = { fromZone: zone, index: idx };
    card.classList.add("dragging");
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", `${zone}:${idx}`);
    }
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    draggedSkill = null;
    document.querySelectorAll(".drop-zone-card.drag-over").forEach((el) => {
      el.classList.remove("drag-over");
    });
  });

  card.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "move";
    }
  });

  card.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedSkill) return;
    moveSkill(draggedSkill.fromZone, draggedSkill.index, zone, idx);
    draggedSkill = null;
  });

  const btn = card.querySelector(".skill-actions button");
  btn.addEventListener("click", () => {
    if (zone === "enabled") {
      moveSkill("enabled", idx, "learnable");
    } else {
      moveSkill("learnable", idx, "enabled");
    }
  });

  return card;
}

function setupSkillDropZones() {
  document.querySelectorAll(".drop-zone-card").forEach((zoneCard) => {
    const targetZone = zoneCard.dataset.zone;

    zoneCard.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "move";
      }
      zoneCard.classList.add("drag-over");
    });

    zoneCard.addEventListener("dragleave", (e) => {
      if (!zoneCard.contains(e.relatedTarget)) {
        zoneCard.classList.remove("drag-over");
      }
    });

    zoneCard.addEventListener("drop", (e) => {
      e.preventDefault();
      zoneCard.classList.remove("drag-over");
      if (!draggedSkill) return;
      moveSkill(draggedSkill.fromZone, draggedSkill.index, targetZone);
      draggedSkill = null;
    });
  });
}

function renderSkills() {
  const enabledContainer = document.getElementById("enabled-skills-list");
  const learnableContainer = document.getElementById("learnable-skills-list");
  document.getElementById("enabled-count").textContent = state.enabledSkills.length;

  enabledContainer.innerHTML = "";
  state.enabledSkills.forEach((sk, idx) => {
    enabledContainer.appendChild(createSkillCard(sk, "enabled", idx));
  });

  learnableContainer.innerHTML = "";
  state.learnableSkills.forEach((sk, idx) => {
    learnableContainer.appendChild(createSkillCard(sk, "learnable", idx));
  });
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
      <td><input type="text" value="${item.name}" data-k="name"></td>
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
      <td><input type="text" value="${item.uses}" data-k="uses" style="width:70px"></td>
      <td><input type="text" value="${item.value}" data-k="value" style="width:75px"></td>
      <td><input type="text" value="${item.desc}" data-k="desc"></td>
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
    const cost = prompt("Custo (ex: Ação Padrão | 3 Estamina):", "Ação Padrão") || "-";
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
    a.download = "ficha-alpha-mar-indomavel.json";
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
        state = { ...structuredClone(DEFAULT_DATA), ...imported };
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
    if (confirm("Deseja restaurar todos os valores originais da ficha do Alpha?")) {
      localStorage.removeItem(STORAGE_KEY);
      state = structuredClone(DEFAULT_DATA);
      init();
    }
  });
}

function init() {
  renderSimpleFields();
  renderAttributes();
  renderStaticFeatures();
  renderSkills();
  renderInventory();
}

setupLockScreen();
