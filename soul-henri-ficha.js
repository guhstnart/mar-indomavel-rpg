const STORAGE_KEY = "mar_indomavel_ficha_soul_henri_v1";
const AUTH_SESSION_KEY = "mar_indomavel_auth_soul_henri_v1";
const PLAYER_PASSWORD = "LoboPidao";
const MASTER_PASSWORD = "ChaveMestra";

const DEFAULT_DATA = {
  name: "Soul Henri",
  race: "Humano",
  fv: 5,
  age: "?",
  speed: "9 metros",
  style: "Lâmina oculta (Foco em ataques furtivos e certeiros com uma adaga)",
  job: "Pescador",
  akuma: "Nenhuma",
  hpAtual: 60,
  hpMax: 60,
  stAtual: 22,
  stMax: 22,
  ca: 15,
  pp: 0,
  aa: "Corte com Adaga - 1D4 +5 (DES)",
  berries: 32,
  bounty: 0,
  tempStatus: "",
  fenHp: "30/30",
  fenCa: "15",
  fenSpeed: "12 metros",
  fenAa: "1D4 +2 (DES)",
  fenTempStatus: "",
  maxSkills: 5,
  slotsMax: 11,
  attributes: {
    FOR: { base: 13, bonus: 1 },
    DES: { base: 20, bonus: 5 },
    CON: { base: 17, bonus: 3 },
    INT: { base: 20, bonus: 5 },
    SAB: { base: 20, bonus: 5 },
    CAR: { base: 17, bonus: 3 }
  },
  racePassives: [
    {
      name: "Vontade de Sobrevivência",
      desc: "Sempre que sua Vida (HP) cair abaixo de 25% do máximo (Zona de Perigo), você ignora as penalidades de ferimentos graves ou cansaço. Além disso, você ganha +2 em qualquer teste de ataque enquanto estiver nesta faixa de vida (o famoso \"segundo fôlego\"). Atualmente [Zona de Perigo] em [Hp 15/60]."
    },
    {
      name: "Descanso feito Pedra",
      desc: "Após um descanso completo, você ganha 5 de Vida Temporária. Esta vida é a primeira a ser perdida em combate e não pode ser recuperada por curas comuns. Ela reaparece após um novo descanso completo."
    },
    {
      name: "Teimosia do Corpo",
      desc: "Você não possui a regeneração ou resistência natural das outras raças. Qualquer efeito de cura externa (poções, magias ou comida) cura 2 pontos a menos em você, pois seu corpo demora mais a aceitar o alívio."
    },
    {
      name: "Habilidade Ativa: Determinação Inabalável",
      desc: "Custo: Reação (pode usar quando for atingido por um ataque). Efeito: Em um momento de desespero, você ignora a dor ou o cansaço. Você ignora o dano de um ataque inimigo. Consequência: Após usar esta habilidade, você recebe um nível de fadiga (-2 em todos os seus testes) até que termine um descanso curto ou maior. Recarga: Pode ser usada uma vez por sessão (ou uma vez por dia de jogo)."
    },
    {
      name: "Vínculo Espiritual: Fen (Habilidade Passiva)",
      desc: "A conexão entre Soul Henri e Fen vai além do adestramento. Eles compartilham o mesmo instinto de caça. Tempo de Conjuração: Ação Padrão | Custo: 3 Pontos de Estamina (ES) | Duração: até o fim da cena, desinvocado livremente ou 0 PV. Estatísticas: PV = 50% dos PV máx. atuais de Soul; compartilha Defesa/Esquiva de Soul; Deslocamento = base de Soul + 3m. Sincronia de Combate: Movimento e interação simultâneos sem custo de PE; Ataque Básico (Presas Ferozes) 1x/turno na Ação Bônus de Soul (0 PE) com fórmula 1d4 + floor(DES ÷ 2) (DES +4 ou +5 = +2). Quebra de Vínculo (0 PV): Soul perde 6 PE (ou 1d4 na Estamina) e não pode reinvocá-lo no mesmo combate."
    }
  ],
  jobFeatures: [
    {
      name: "Fartura dos Mares",
      desc: "Uma vez por dia, enquanto o navio estiver em mar aberto ou ancorado, o Pescador pode realizar um teste de Sabedoria (Sobrevivência) CD 13. Se for bem-sucedido, ele consegue pescar peixes e criaturas suficientes para gerar 1d4 + Modificador de Sabedoria (SAB) em itens de cura fixa para o inventário do bando (poupando os preciosos Berrys do grupo). Um acerto crítico (20 natural) indica que ele fisgou um Rei dos Mares menor ou um ingrediente raro, dobrando a quantidade de itens gerados ou pescando um tesouro perdido."
    },
    {
      name: "Fisgada Implacável",
      desc: "Acostumado a travar cabos de guerra contra feras marinhas gigantescas, o Pescador sabe usar o próprio peso e potência a seu favor. Equipado com uma rede, arpão ou vara de pesca reforçada, ele pode gastar 2 pontos de Estamina como uma Ação para prender um inimigo a até 9 metros de distância. O alvo deve rolar um teste de resistência contra a Força (FOR) do Pescador. Em caso de falha, o Pescador puxa o inimigo bruscamente até 4,5 metros na sua direção, desequilibrando o alvo e quebrando a formação inimiga."
    }
  ],
  enabledSkills: [
    {
      name: "1. Oportunismo Letal (Furtividade)",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Se Soul atacar um inimigo que não notou sua presença (Ataque Surpresa) ou que esteja paralisado/caído, ele causa +1d6 de dano extra com a adaga, acertando em um ponto vital."
    },
    {
      name: "2. Corte do Nevoeiro (Mobilidade e Ataque)",
      type: "Habilidade Ativa",
      cost: "Ação Padrão | 3 de Estamina",
      desc: "Soul avança rapidamente, desfere um golpe de adaga normal no alvo e, em seguida, recua se misturando às sombras. Ele pode realizar um ataque básico e imediatamente se mover para uma Zona Adjacente sem gerar Ataques de Oportunidade."
    },
    {
      name: "3. Lâmina Fantasma (Buff de Arma)",
      type: "Habilidade Ativa",
      cost: "Ação Bônus | 2 de Estamina",
      desc: "Soul canaliza energia mítica de Fen diretamente em sua adaga, que ganha um brilho etéreo roxo. O seu próximo ataque com a adaga no turno ignora a defesa natural/armadura do alvo, visando diretamente o espírito."
    }
  ],
  memorySkills: [],
  learnableSkills: [
    {
      name: "1. Olhos de Ookami (Visão Espiritual)",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Devido ao seu treinamento de infância, Soul consegue enxergar entidades espirituais que pessoas normais não veriam. Além disso, ele não sofre penalidades de visão ao lutar em meio a neblinas ou brumas densas."
    },
    {
      name: "2. Instinto de Matilha",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Soul e Fen lutam em perfeita sincronia. Sempre que Soul atacar com sua adaga um inimigo que já esteja engajado (corpo a corpo) com o lobo Fen ou outro aliado, Soul ganha um bônus de +2 na rolagem de acerto."
    },
    {
      name: "3. Passos de Bruma",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Sendo treinado na furtividade, Soul se funde ao ambiente. Ele tem Vantagem (rola 2 dados e pega o maior) em testes de Furtividade sempre que estiver em locais com sombras, pouca iluminação ou neblina."
    },
    {
      name: "4. Sentidos Compartilhados",
      type: "Passiva",
      cost: "Sempre ativa",
      desc: "Enquanto o lobo Fen estiver invocado, Soul e a fera compartilham percepção. É impossível que Soul seja \"Surpreendido\" em uma emboscada desde que Fen esteja vigiando a área."
    },
    {
      name: "5. Comando: Mordida Espectral (Ataque do Lobo)",
      type: "Ativa",
      cost: "Ação Padrão | 2 de Estamina",
      desc: "Soul comanda Fen para atacar. O lobo avança e morde o alvo com suas presas de energia espiritual. O dano causado é 1d8 + SAB. (Nota: invocar o lobo Fen fora de combate é gratuito, mas ele consome a energia do Soul para realizar ações especiais.)"
    },
    {
      name: "6. Uivo do Além (Debuff em Área)",
      type: "Ativa",
      cost: "Ação Padrão | 3 de Estamina",
      desc: "Fen solta um uivo aterrorizante e místico. Todos os inimigos na mesma Zona do lobo devem fazer um Teste de Sabedoria (SAB). Se falharem, ficam \"Assustados\" e sofrem desvantagem em suas próximas rolagens de ataque."
    },
    {
      name: "7. Troca Espiritual (Fuga e Posicionamento)",
      type: "Ativa",
      cost: "Ação Bônus | 4 de Estamina",
      desc: "Num piscar de olhos, o corpo físico de Soul e o corpo espiritual de Fen trocam de lugar instantaneamente, desde que estejam no campo de visão um do outro. Perfeito para fugir de uma emboscada ou colocar o lobo na linha de frente para receber um golpe no lugar de Soul."
    }
  ],
  inventory: [
    {
      name: "Adaga Mística da Terra Natal",
      category: "Arma",
      status: "Equipado",
      slots: 1,
      uses: "Médio-Longo / 1",
      value: "0",
      desc: "Adaga curta e leve de sua terra natal. Permite golpes ágeis e furtivos."
    },
    {
      name: "Casaco de Pelo Noturno",
      category: "Equipamento",
      status: "Equipado",
      slots: 1,
      uses: "-",
      value: "-",
      desc: "Um casaco robusto de mangas curtas e tom azul-arroxeado escuro, ostentando uma imponente gola de pelos densos."
    },
    {
      name: "Óleo de Pesca de Ookami",
      category: "Consumível",
      status: "No Inventário",
      slots: 1,
      uses: "3/3",
      value: "0",
      desc: "Mistura com ervas de Ookami. Atrai peixes raros/maiores. Em tática, desorienta o olfato de animais ou cães de guarda."
    },
    {
      name: "Adagas Ocultas de Arremesso",
      category: "Arma",
      status: "No Inventário",
      slots: 1,
      uses: "3/3",
      value: "0",
      desc: "Lâminas pequenas e fáceis de esconder. Causam 1d4 de dano em Ação Rápida e garantem vantagem em ataques surpresa de furtividade."
    }
  ],
  appearance: "Jovem com uma estatura média e corpo semi musculoso. Veste uma jaqueta com detalhes em dourado e uma pelagem de lobo. Usa luvas e faixas enroladas ao redor de seus braços, além de sempre carregar consigo uma adaga.",
  backstory: `Desde a infância, você foi criado por seus pais na remota e enevoada Ilha de Ookami. Lá, você foi submetido a um treinamento rigoroso e especial para aguçar seus sentidos, aprendendo a enxergar criaturas invisíveis aos olhos comuns e a canalizar energias místicas. Seus pais costumavam contar histórias sobre uma terra engolida pelas lendas: a mítica Yokai Shima. Segundo eles, essa ilha esquecida era o ponto de conexão entre o mundo terreno e o espiritual, um santuário onde humanos e espíritos conviviam em perfeita harmonia. A crença deles era inabalável. "Ela é real, Soul", diziam com brilho nos olhos. "Nosso maior sonho sempre foi encontrá-la. Talvez esse destino esteja guardado para você."

O momento de provar o seu valor finalmente chegou. O rito de passagem para concluir seu treinamento exigia que você subisse a montanha mais alta de Ookami, enfrentasse a fera que lá habitava e trouxesse sua pelagem como troféu. Após uma escalada exaustiva, você ficou frente a frente com o desafio: um lobo colossal, de pelagem púrpura e olhar imponente e ancestral. Uma batalha intensa e exaustiva se desenrolou. No ápice do confronto, em vez de um final sangrento, um evento inexplicável ocorreu. A grande fera pareceu reconhecer a força da sua alma. Uma ligação espiritual profunda foi forjada entre vocês dois; e assim como a densa névoa que de repente se dissipou da ilha, o imenso lobo desapareceu, deixando para trás apenas parte de sua majestosa pelagem.

Vitorioso e transformado, você retornou para casa, mas encontrou apenas um silêncio perturbador. Seus pais haviam desaparecido sem deixar qualquer rastro ou sinal de luta. Sozinho, confuso, mas carregando a força do espírito do lobo consigo, você tomou uma decisão: partiria para o vasto mar. Talvez o destino dos seus pais e as respostas que você tanto busca estejam escondidos naquelas águas, ou melhor, naquela terra de que tanto falavam... Yokai Shima.

Ps: Durante as sessões, você tem total liberdade para expandir o mundo. Se encontrarmos uma neblina estranha, você pode dizer que parece com a de Ookami, ou reconhecer lendas e rituais ao longo da jornada. Não precisa esperar o mestre permitir, você tem a liberdade de construir sua história.`,
  psycheGoals: "Encontrar a terra esquecida de Yokai Shima, descobrir o paradeiro dos pais, dominar completamente o vínculo espiritual.",
  psycheFears: "Desespero ao lidar com separações súbitas, preferir trabalhar sozinho e rejeitar ajuda, agir por impulso quando espíritos são desrespeitados.",
  psycheTraits: "Ótimo em sobrevivência na natureza, lealdade aos amigos, observador impecável.",
  psycheIdeals: "A natureza e os espíritos devem ser respeitados acima de tudo; sobrevivência do mais forte; nunca roubar de quem precisa.",
  notes: ""
};

let state = loadState();
let appInitialized = false;
let pointerDrag = null;
let pendingRemove = null;
let pendingItemRemove = null;
let pendingEdit = null;
let rollHistory = [];

function getZoneArray(zone) {
  if (!Array.isArray(state.memorySkills)) state.memorySkills = [];
  if (zone === "enabled") return state.enabledSkills;
  if (zone === "memory") return state.memorySkills;
  return state.learnableSkills;
}

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
    setupGlobalPointerDrag();
    setupGlobalItemPointerDrag();
    setupModals();
    setupColorPalettes();
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
      const parsed = JSON.parse(saved);
      return {
        ...structuredClone(DEFAULT_DATA),
        ...parsed,
        memorySkills: Array.isArray(parsed.memorySkills) ? parsed.memorySkills : []
      };
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

  const btnPresasFen = document.getElementById("btn-presas-fen");
  if (btnPresasFen) {
    btnPresasFen.addEventListener("click", () => {
      const d4 = Math.floor(Math.random() * 4) + 1;
      const desMod = Number(state.attributes.DES?.bonus) || 0;
      const fenBonus = Math.floor(desMod / 2);
      const total = d4 + fenBonus;
      showDiceResult(
        `Presas de Fen: 1d4 (${d4}) + floor(DES ${formatMod(desMod)} ÷ 2) [${formatMod(fenBonus)}] = ${total}`,
        `Presas de Fen: ${total} (${d4}${formatMod(fenBonus)})`
      );
    });
  }

  const btnClearHistory = document.getElementById("btn-clear-history");
  if (btnClearHistory) {
    btnClearHistory.addEventListener("click", () => {
      rollHistory = [];
      renderDiceHistory();
    });
  }
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

function openItemRemoveConfirm(itemIdx) {
  const item = state.inventory[itemIdx];
  if (!item) return;

  pendingRemove = null;
  pendingItemRemove = { itemIdx };
  const itemName = item.name && item.name.trim() ? item.name.trim() : "este item";
  document.getElementById("confirm-modal-text").textContent =
    `Tem certeza de que deseja excluir permanentemente o item "${itemName}"?`;
  document.getElementById("confirm-modal").hidden = false;
}

function setupModals() {
  const confirmModal = document.getElementById("confirm-modal");
  document.getElementById("btn-cancel-remove").addEventListener("click", () => {
    pendingRemove = null;
    pendingItemRemove = null;
    confirmModal.hidden = true;
  });

  document.getElementById("btn-confirm-remove").addEventListener("click", () => {
    if (pendingItemRemove) {
      const { itemIdx } = pendingItemRemove;
      if (state.inventory[itemIdx]) {
        state.inventory.splice(itemIdx, 1);
        saveState();
        renderInventory();
      }
      pendingItemRemove = null;
    } else if (pendingRemove) {
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
    if (item.status === "Equipado" || item.status === "Guardado no Navio") return acc;
    return acc + (Number(item.slots) || 0);
  }, 0);
  document.getElementById("slots-used").textContent = totalSlots;

  const shipItems = state.inventory.filter((item) => item.status === "Guardado no Navio");
  const shipSlots = shipItems.reduce((acc, item) => acc + (Number(item.slots) || 0), 0);
  const shipCountEl = document.getElementById("ship-items-count");
  const shipSlotsEl = document.getElementById("ship-slots-used");
  if (shipCountEl) shipCountEl.textContent = shipItems.length;
  if (shipSlotsEl) shipSlotsEl.textContent = shipSlots;
}

function buildInventoryRow(item, idx, rerenderOnStatusChange = false, zoneName = "personal") {
  const tr = document.createElement("tr");
  tr.className = "inv-row-draggable";
  tr.dataset.itemIdx = idx;
  tr.dataset.itemZone = zoneName;
  tr.innerHTML = `
    <td><span class="item-drag-grip" title="Arraste para mover entre Inventário e Navio">⋮⋮</span><input type="text" value="${escapeHtml(item.name)}" data-k="name" style="width:calc(100% - 24px);display:inline-block;"></td>
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
      if (rerenderOnStatusChange && k === "status") {
        renderInventory();
      }
    });
  });

  tr.querySelector("button").addEventListener("click", () => {
    openItemRemoveConfirm(idx);
  });

  return tr;
}

function renderInventory() {
  const tbody = document.getElementById("inventory-tbody");
  const shipTbody = document.getElementById("ship-inventory-tbody");
  tbody.innerHTML = "";
  if (shipTbody) shipTbody.innerHTML = "";

  let shipCount = 0;
  state.inventory.forEach((item, idx) => {
    tbody.appendChild(buildInventoryRow(item, idx, true, "personal"));

    if (item.status === "Guardado no Navio" && shipTbody) {
      shipCount += 1;
      shipTbody.appendChild(buildInventoryRow(item, idx, true, "ship"));
    }
  });

  attachItemRowDragHandlers();

  if (shipTbody && shipCount === 0) {
    shipTbody.innerHTML = `<tr class="empty-ship-row"><td colspan="8">Nenhum item guardado no navio no momento. Mude o status de um item para "Guardado no Navio" para listá-lo aqui.</td></tr>`;
  }

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
    a.download = "ficha-soul-henri-mar-indomavel.json";
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
          ...structuredClone(DEFAULT_DATA),
          ...imported,
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
    if (confirm("Deseja restaurar todos os valores originais da ficha de Soul Henri?")) {
      localStorage.removeItem(STORAGE_KEY);
      state = structuredClone(DEFAULT_DATA);
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
  setupPortraitLightbox();
  renderSimpleFields();
  renderAttributes();
  renderStaticFeatures();
  renderSkills();
  renderInventory();
  const notesEl = document.getElementById("char-notes");
  if (notesEl) notesEl.dispatchEvent(new Event("input"));
}

setupLockScreen();

function clearBrowserTextSelection() {
  const sel = window.getSelection ? window.getSelection() : null;
  if (sel) {
    if (sel.removeAllRanges) sel.removeAllRanges();
    else if (sel.empty) sel.empty();
  }
}

function setupPortraitLightbox() {
  const trigger = document.getElementById("portrait-zoom-trigger");
  const portraitImg = document.getElementById("char-portrait");
  const lightbox = document.getElementById("portrait-lightbox");
  const lightboxImg = document.getElementById("portrait-lightbox-img");
  const closeBtn = document.getElementById("btn-close-lightbox");

  if (!trigger || !portraitImg || !lightbox || !lightboxImg) return;

  const openLightbox = () => {
    const src = portraitImg.currentSrc || portraitImg.getAttribute("src");
    if (!src) return;
    lightboxImg.src = src;
    lightboxImg.alt = portraitImg.alt || "Arte ampliada de Alpha";
    lightbox.hidden = false;
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImg.src = "";
  };

  trigger.addEventListener("click", openLightbox);
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}

let pointerItemDrag = null;

function clearItemZoneHighlights() {
  document.querySelectorAll(".item-drop-zone.drag-over").forEach((el) => {
    el.classList.remove("drag-over");
  });
}

function cleanupItemPointerDrag() {
  document.body.classList.remove("is-dragging-item");
  clearBrowserTextSelection();
  if (!pointerItemDrag) return;
  if (pointerItemDrag.ghost && pointerItemDrag.ghost.parentNode) {
    pointerItemDrag.ghost.parentNode.removeChild(pointerItemDrag.ghost);
  }
  if (pointerItemDrag.sourceRow) {
    pointerItemDrag.sourceRow.classList.remove("dragging-source");
  }
  clearItemZoneHighlights();
  pointerItemDrag = null;
}

function moveInventoryItemToZone(itemIdx, targetZone) {
  const item = state.inventory[itemIdx];
  if (!item) return;

  if (targetZone === "ship") {
    if (item.status !== "Guardado no Navio") {
      item.status = "Guardado no Navio";
      saveState();
      renderInventory();
    }
  } else if (targetZone === "personal") {
    if (item.status === "Guardado no Navio") {
      item.status = "No Inventário";
      saveState();
      renderInventory();
    }
  }
}

function attachItemRowDragHandlers() {
  document.querySelectorAll(".inv-row-draggable").forEach((tr) => {
    tr.addEventListener("dragstart", (e) => e.preventDefault());

    tr.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button, input, select")) return;
      if (e.button !== 0 && e.pointerType === "mouse") return;

      e.preventDefault();
      clearBrowserTextSelection();

      const itemIdx = Number(tr.dataset.itemIdx);
      const fromZone = tr.dataset.itemZone;
      const item = state.inventory[itemIdx];
      if (!item) return;

      pointerItemDrag = {
        itemIdx,
        fromZone,
        itemName: item.name && item.name.trim() ? item.name.trim() : "Item sem nome",
        sourceRow: tr,
        startX: e.clientX,
        startY: e.clientY,
        active: false,
        ghost: null
      };
    });
  });
}

function setupGlobalItemPointerDrag() {
  document.addEventListener("selectstart", (e) => {
    if (pointerItemDrag || e.target.closest(".inv-row-draggable")) {
      e.preventDefault();
    }
  });

  document.addEventListener("pointermove", (e) => {
    if (!pointerItemDrag) return;

    e.preventDefault();
    clearBrowserTextSelection();

    const dx = e.clientX - pointerItemDrag.startX;
    const dy = e.clientY - pointerItemDrag.startY;
    if (!pointerItemDrag.active && Math.hypot(dx, dy) > 5) {
      document.body.classList.add("is-dragging-item");
      pointerItemDrag.active = true;
      pointerItemDrag.sourceRow.classList.add("dragging-source");

      const ghost = document.createElement("div");
      ghost.className = "floating-item-ghost";
      ghost.innerHTML = `<span class="item-drag-grip">⋮⋮</span><span>${escapeHtml(pointerItemDrag.itemName)}</span>`;
      document.body.appendChild(ghost);
      pointerItemDrag.ghost = ghost;
    }

    if (!pointerItemDrag.active || !pointerItemDrag.ghost) return;

    pointerItemDrag.ghost.style.left = `${e.clientX + 12}px`;
    pointerItemDrag.ghost.style.top = `${e.clientY + 12}px`;

    pointerItemDrag.ghost.style.display = "none";
    const underEl = document.elementFromPoint(e.clientX, e.clientY);
    pointerItemDrag.ghost.style.display = "";

    const zoneEl = underEl ? underEl.closest(".item-drop-zone") : null;
    clearItemZoneHighlights();
    if (zoneEl) {
      zoneEl.classList.add("drag-over");
    }
  });

  const finishItemDrag = (e) => {
    if (!pointerItemDrag) return;

    if (pointerItemDrag.active) {
      clearBrowserTextSelection();
      if (pointerItemDrag.ghost) pointerItemDrag.ghost.style.display = "none";
      const underEl = document.elementFromPoint(e.clientX, e.clientY);
      if (pointerItemDrag.ghost) pointerItemDrag.ghost.style.display = "";

      const targetZoneEl = underEl ? underEl.closest(".item-drop-zone") : null;
      const itemIdx = pointerItemDrag.itemIdx;
      const fromZone = pointerItemDrag.fromZone;

      cleanupItemPointerDrag();

      if (targetZoneEl && targetZoneEl.dataset.itemZone) {
        const toZone = targetZoneEl.dataset.itemZone;
        if (toZone !== fromZone) {
          moveInventoryItemToZone(itemIdx, toZone);
        }
      }
      return;
    }

    cleanupItemPointerDrag();
  };

  document.addEventListener("pointerup", finishItemDrag);
  document.addEventListener("pointercancel", cleanupItemPointerDrag);
  window.addEventListener("blur", cleanupItemPointerDrag);
}
