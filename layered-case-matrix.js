const caseMatrixScenarios = [
  {
    id: "rich",
    name: "数据充分",
    definition: "高质量、已验证、强相关数据和知识都比较充分。",
    data: 5,
    clarity: 4,
    summary: "系统可进入较强建议模式，但高风险动作仍保留人工确认边界。",
    steps: [
      ["前三层成熟度", "原始素材、结构化对象和已验证知识都比较成熟。"],
      ["检索层", "召回大量相关菜谱、北京风味标签、历史案例和设备适配规则。"],
      ["规则与策略层", "过滤未验证、失效和不适配候选，保留可执行范围。"],
      ["模型推理层", "排序候选，解释口味路径，并给出理由和初始参数建议。"],
      ["最终输出", "输出 2–3 个高质量候选、推荐理由、风险提示和参数建议。"],
      ["后续动作", "进入人工确认、设备辅助交付与结果回写。"],
    ],
    matrix: ["强支持", "强支持", "强支持", "强支持", "强支持", "强支持", "强支持", "强支持", "弱支持", "弱支持", "弱支持", "仅参考", "不支持"],
    failure: [
      { title: "补问", items: ["设备型号不完整时补问设备信息"] },
      { title: "弱建议", items: ["高风险候选不直接下发"] },
      { title: "转人工", items: ["异常版本进入人工确认"] },
      { title: "知识建设队列", items: ["仅新增异常现象时进入"] },
    ],
  },
  {
    id: "medium",
    name: "数据一般",
    definition: "有一定量相关数据，但精度和覆盖不足。",
    data: 3,
    clarity: 4,
    summary: "系统可给建议级结果，但需要补问与人工确认。",
    steps: [
      ["前三层成熟度", "结构化和已验证知识部分可用，但稳定度不够。"],
      ["检索层", "有一定量相关菜谱和案例，但直接命中较少。"],
      ["规则与策略层", "过滤高风险候选，限制输出强度。"],
      ["模型推理层", "给推荐候选和理由，并触发补问缩圈。"],
      ["最终输出", "给 2–4 个参考候选，标记为建议级结果。"],
      ["后续动作", "优先补问，并进入口味工程师审核。"],
    ],
    matrix: ["中支持", "中支持", "弱支持", "强支持", "中支持", "中支持", "仅参考", "强支持", "不支持", "强支持", "强支持", "中支持", "仅参考"],
    failure: [
      { title: "补问", items: ["偏甜还是偏辣", "单份试菜还是大份交付"] },
      { title: "弱建议", items: ["只给建议级结果，不直接执行"] },
      { title: "转人工", items: ["默认进入口味工程师审核"] },
      { title: "知识建设队列", items: ["反复命中薄弱场景时再进入"] },
    ],
  },
  {
    id: "scattered",
    name: "数据零散",
    definition: "只有零散案例、片段经验和少量规则。",
    data: 2,
    clarity: 4,
    summary: "系统应当给弱建议、缺失项和补采方向，而不是假装很确定。",
    steps: [
      ["前三层成熟度", "对象挂载和知识沉淀都偏碎片化。"],
      ["检索层", "只找到零散相似菜、片段规则或片段经验。"],
      ["规则与策略层", "禁止直接下发参数包，只保留参考级候选。"],
      ["模型推理层", "做需求解释、相似归纳和缺口识别。"],
      ["最终输出", "输出相似案例参考、缺失信息和补采建议。"],
      ["后续动作", "转人工、进入知识补全任务。"],
    ],
    matrix: ["中支持", "弱支持", "仅参考", "仅参考", "仅参考", "弱支持", "不支持", "强支持", "不支持", "强支持", "强支持", "强支持", "强支持"],
    failure: [
      { title: "补问", items: ["补问设备型号", "补问交付目标"] },
      { title: "弱建议", items: ["只给相似案例参考"] },
      { title: "转人工", items: ["需口味工程师介入"] },
      { title: "知识建设队列", items: ["需新增语料和规则验证"] },
    ],
  },
  {
    id: "missing",
    name: "数据缺失",
    definition: "当前任务几乎没有内部相关资产。",
    data: 1,
    clarity: 4,
    summary: "系统要明确提示知识不足，并转入人工与知识建设流程。",
    steps: [
      ["前三层成熟度", "当前几乎无可调用素材、结构化对象和已验证知识。"],
      ["检索层", "精确检索为空，相似检索极弱。"],
      ["规则与策略层", "直接禁止强建议和自动下发。"],
      ["模型推理层", "只做输入解析、缺口识别和下一步引导。"],
      ["最终输出", "只给下一步引导，不给强建议。"],
      ["后续动作", "转人工、补数、进入知识建设队列。"],
    ],
    matrix: ["弱支持", "不支持", "不支持", "不支持", "不支持", "仅参考", "不支持", "强支持", "不支持", "强支持", "强支持", "强支持", "强支持"],
    failure: [
      { title: "补问", items: ["补问设备型号", "补问交付场景"] },
      { title: "弱建议", items: ["仅提示下一步需要什么信息"] },
      { title: "转人工", items: ["直接转人工处理"] },
      { title: "知识建设队列", items: ["新增数据采集和菜谱建设"] },
    ],
  },
  {
    id: "wide-rich",
    name: "输入模糊但数据丰富",
    definition: "输入很宽，但系统有大量相关资产可逐层缩圈。",
    data: 5,
    clarity: 2,
    summary: "输入模糊不等于系统不能工作，关键在于逐层缩圈而不是强行给唯一答案。",
    steps: [
      ["前三层成熟度", "原始素材、结构化对象和知识资产都比较丰富。"],
      ["检索层", "宽召回大量候选，不追求一步唯一命中。"],
      ["规则与策略层", "先按设备、状态、权限和场景做硬过滤。"],
      ["模型推理层", "结合模糊语义继续收敛、排序，并决定是直接推荐还是继续补问。"],
      ["最终输出", "给小范围候选，或给推荐 + 追问。"],
      ["后续动作", "根据补问结果进入强建议模式或转人工。"],
    ],
    matrix: ["强支持", "强支持", "强支持", "强支持", "中支持", "强支持", "弱支持", "强支持", "仅参考", "强支持", "弱支持", "仅参考", "不支持"],
    failure: [
      { title: "补问", items: ["偏甜还是偏辣", "单份试菜还是大份交付", "设备型号是什么"] },
      { title: "弱建议", items: ["给候选范围，不强行给唯一答案"] },
      { title: "转人工", items: ["补问后仍无法收敛时转人工"] },
      { title: "知识建设队列", items: ["发现新场景缺口时进入"] },
    ],
  },
];

const matrixLabels = [
  "原始素材可用度",
  "结构化对象完整度",
  "已验证知识可用度",
  "候选菜谱输出",
  "推荐排序",
  "推荐理由",
  "参数建议",
  "风险提示",
  "自动下发能力",
  "是否需要补问",
  "是否需要人工审核",
  "是否转人工",
  "是否进入知识建设队列",
];

let activeScenario = "wide-rich";
const scenarioTabs = document.querySelector("#scenarioTabs");
const scenarioSummary = document.querySelector("#scenarioSummary");
const waterfallBoard = document.querySelector("#waterfallBoard");
const matrixBoard = document.querySelector("#matrixBoard");
const failureBoard = document.querySelector("#failureBoard");

function getActiveScenario() {
  return caseMatrixScenarios.find((item) => item.id === activeScenario) || caseMatrixScenarios[0];
}

function meter(level) {
  return `<div class="meter-bar">${Array.from({ length: 5 }, (_, i) => `<span class="${i < level ? "on" : ""}"></span>`).join("")}</div>`;
}

function renderScenarioTabs() {
  if (!scenarioTabs) return;
  scenarioTabs.innerHTML = caseMatrixScenarios
    .map(
      (item) => `
        <button class="scenario-tab ${item.id === activeScenario ? "active" : ""}" type="button" data-scenario="${item.id}">
          <strong>${item.name}</strong>
          <p>${item.definition}</p>
          <div class="meter">
            <div class="meter-row"><span>数据强度</span>${meter(item.data)}</div>
            <div class="meter-row"><span>输入清晰度</span>${meter(item.clarity)}</div>
          </div>
        </button>
      `
    )
    .join("");

  scenarioTabs.querySelectorAll("[data-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      activeScenario = button.dataset.scenario || "wide-rich";
      renderCaseMatrixPage();
    });
  });
}

function renderScenarioSummary() {
  const item = getActiveScenario();
  scenarioSummary.innerHTML = `
    <strong>${item.name}</strong>
    <p>${item.summary}</p>
  `;
}

function renderWaterfall() {
  const item = getActiveScenario();
  waterfallBoard.innerHTML = item.steps
    .map(
      ([title, content], index) => `
        <div class="waterfall-step">
          <strong>${title}</strong>
          <p>${content}</p>
        </div>
        ${index < item.steps.length - 1 ? '<div class="waterfall-arrow">↓</div>' : ""}
      `
    )
    .join("");
}

function renderMatrix() {
  const header = `
    <div class="matrix-row">
      <div class="matrix-head">能力项</div>
      ${caseMatrixScenarios.map((item) => `<div class="matrix-head ${item.id === activeScenario ? "active" : ""}">${item.name}</div>`).join("")}
    </div>
  `;
  const rows = matrixLabels
    .map(
      (label, rowIndex) => `
        <div class="matrix-row">
          <div class="matrix-head">${label}</div>
          ${caseMatrixScenarios
            .map((item) => `<div class="matrix-cell ${item.id === activeScenario ? "active" : ""}">${item.matrix[rowIndex]}</div>`)
            .join("")}
        </div>
      `
    )
    .join("");
  matrixBoard.innerHTML = header + rows;
}

function renderFailure() {
  const item = getActiveScenario();
  failureBoard.innerHTML = item.failure
    .map(
      (group) => `
        <article class="failure-card">
          <h3>${group.title}</h3>
          <ul>${group.items.map((entry) => `<li>${entry}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
}

function renderCaseMatrixPage() {
  renderScenarioTabs();
  renderScenarioSummary();
  renderWaterfall();
  renderMatrix();
  renderFailure();
}

renderCaseMatrixPage();
