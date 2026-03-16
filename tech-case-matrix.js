const scenarioData = [
  {
    id: "rich",
    name: "场景 A：数据充分",
    shortName: "数据充分",
    definition: "内部已有大量高质量、已验证、强相关菜谱、案例、规则和历史记录。",
    strength: 5,
    strengthLabel: "数据强度 5/5",
    outputLevel: "可进入强建议模式",
    reviewMode: "低风险时人工确认后可进入设备辅助交付",
    steps: [
      {
        title: "原始输入",
        summary: "输入需求较明确，系统有足够内部资产支撑逐层收口。",
        input: "北京口味 + 宫保鸡丁 + 当前设备上下文",
        output: "标准化任务描述与检索条件",
        tags: ["输入解析", "任务标准化"],
        limit: "若设备型号缺失，仍会补充追问。",
      },
      {
        title: "检索层处理",
        summary: "召回大量相关版本、已验证标杆菜谱和相似历史客户案例。",
        input: "用户需求、菜品关键词、风味标签",
        output: "候选菜谱集合、候选案例集合、命中来源",
        tags: ["召回", "相似搜索", "标杆命中"],
        limit: "主要风险在于版本过多，需要后续规则层收口。",
      },
      {
        title: "规则与策略层处理",
        summary: "过滤未验证、失效和不适配设备的版本，判断当前可进入强建议模式。",
        input: "检索候选、设备约束、知识状态、风险等级",
        output: "高可信候选范围、过滤原因、建议等级",
        tags: ["边界过滤", "设备适配", "风险控制"],
        limit: "高风险版本仍需人工确认。",
      },
      {
        title: "模型推理层处理",
        summary: "对少量候选做排序、解释，并判断“北京口味”更接近哪类风味路径。",
        input: "规则筛后的候选集合、少量业务约束",
        output: "推荐版本、理由、初始参数建议、必要补问",
        tags: ["排序", "解释", "参数建议"],
        limit: "不替代规则层决定是否自动下发。",
      },
      {
        title: "最终输出层",
        summary: "给出 2 到 3 个高质量候选版本，附推荐理由、风险提示和初始参数建议。",
        input: "已排序候选与风险判断",
        output: "强建议结果包",
        tags: ["强支持", "推荐理由", "参数包"],
        limit: "涉及风险阈值时仍保留人工确认。",
      },
      {
        title: "后续动作层",
        summary: "可进入人工确认、设备侧辅助交付，并回写本次结果。",
        input: "强建议结果包",
        output: "交付动作、回流记录、知识修正线索",
        tags: ["辅助交付", "结果回流", "持续修正"],
        limit: "执行后仍需质量跟踪。",
      },
    ],
    capabilities: {
      "候选菜谱输出": "强支持",
      推荐排序: "强支持",
      推荐理由: "强支持",
      参数建议: "强支持",
      风险提示: "强支持",
      自动下发能力: "弱支持",
      是否需要补问: "弱支持",
      是否需要人工审核: "弱支持",
      是否转人工: "仅参考",
      是否进入知识建设队列: "不支持",
    },
    failureFlow: [
      { title: "补问", items: ["设备型号缺失时补问设备信息", "份量不清时补问试菜规模"] },
      { title: "弱建议", items: ["高风险版本不直接下发", "保留备选方案而不是唯一答案"] },
      { title: "转人工", items: ["涉及特殊设备限制时转人工确认"] },
      { title: "知识建设队列", items: ["仅在出现新异常现象时进入队列"] },
    ],
  },
  {
    id: "medium",
    name: "场景 B：数据一般",
    shortName: "数据一般",
    definition: "有一定量相关数据，但精度和覆盖不足，能支持初步建议，但不能稳定给强结论。",
    strength: 3,
    strengthLabel: "数据强度 3/5",
    outputLevel: "只能给建议级结果",
    reviewMode: "优先补问并进入口味工程师审核",
    steps: [
      {
        title: "原始输入",
        summary: "需求可理解，但关键风味标签与历史映射不完全稳定。",
        input: "北京口味 + 宫保鸡丁",
        output: "可检索的任务描述",
        tags: ["输入解析", "任务标准化"],
        limit: "缺少稳定标签映射时，语义仍有不确定性。",
      },
      {
        title: "检索层处理",
        summary: "能找到一定量相关菜谱和案例，但北京风味标签命中不稳定。",
        input: "菜品关键词、风味描述",
        output: "部分可信候选、少量相似案例",
        tags: ["部分召回", "相似案例"],
        limit: "直接命中较少，候选质量参差不齐。",
      },
      {
        title: "规则与策略层处理",
        summary: "只保留部分可信候选，某些高风险版本不能继续推进。",
        input: "候选集合、风险等级、设备上下文",
        output: "受限候选范围、当前建议等级",
        tags: ["过滤", "风险限制", "收口"],
        limit: "无法进入直接执行级输出。",
      },
      {
        title: "模型推理层处理",
        summary: "可以给推荐候选和理由，但需要补问更多信息来进一步缩圈。",
        input: "规则筛后的少量候选",
        output: "参考候选、推荐理由、补问信息",
        tags: ["排序", "解释", "补问"],
        limit: "参数建议只能给弱建议，不给最终参数包。",
      },
      {
        title: "最终输出层",
        summary: "输出 2 到 4 个参考候选，并明确需要人工确认。",
        input: "推荐候选与补问信息",
        output: "建议级结果",
        tags: ["参考级", "需审核"],
        limit: "不支持自动下发。",
      },
      {
        title: "后续动作层",
        summary: "优先触发补问，随后进入口味工程师审核。",
        input: "建议级结果",
        output: "补问任务、人工审核任务",
        tags: ["补问", "转人工"],
        limit: "未确认前不进入设备侧执行。",
      },
    ],
    capabilities: {
      "候选菜谱输出": "强支持",
      推荐排序: "弱支持",
      推荐理由: "弱支持",
      参数建议: "仅参考",
      风险提示: "强支持",
      自动下发能力: "不支持",
      是否需要补问: "强支持",
      是否需要人工审核: "强支持",
      是否转人工: "弱支持",
      是否进入知识建设队列: "仅参考",
    },
    failureFlow: [
      { title: "补问", items: ["追问偏甜还是偏辣", "追问单份试菜还是大份交付"] },
      { title: "弱建议", items: ["仅给参考级候选", "参数建议不直接作为执行包"] },
      { title: "转人工", items: ["默认进入口味工程师审核"] },
      { title: "知识建设队列", items: ["若连续多次命中薄弱，标记为待沉淀场景"] },
    ],
  },
  {
    id: "scattered",
    name: "场景 C：数据零散",
    shortName: "数据零散",
    definition: "内部只有零散案例、片段经验、少量规则，缺乏成体系的直接支撑。",
    strength: 2,
    strengthLabel: "数据强度 2/5",
    outputLevel: "只能输出参考与缺口识别",
    reviewMode: "优先转人工并进入知识补全任务",
    steps: [
      {
        title: "原始输入",
        summary: "输入可理解，但内部缺少可直接支撑的成体系知识。",
        input: "北京口味 + 宫保鸡丁",
        output: "宽泛任务描述",
        tags: ["输入解析", "宽问题"],
        limit: "系统无法直接假设已有高质量答案。",
      },
      {
        title: "检索层处理",
        summary: "只找到零散相似菜、片段规则或片段经验，直接匹配菜谱很少。",
        input: "关键词、相似任务",
        output: "片段案例、片段规则、弱命中结果",
        tags: ["弱召回", "片段经验"],
        limit: "精确命中很弱，无法支撑强结论。",
      },
      {
        title: "规则与策略层处理",
        summary: "显著限制系统输出强度，禁止直接下发参数包，只保留参考级候选。",
        input: "弱命中候选、风险等级",
        output: "参考级候选、禁止下发标记",
        tags: ["限制输出", "风险兜底"],
        limit: "不允许进入强建议模式。",
      },
      {
        title: "模型推理层处理",
        summary: "主要负责需求解释、相似案例归纳和缺失知识识别。",
        input: "零散候选与片段规则",
        output: "弱建议、缺失项、补充采集建议",
        tags: ["归纳", "缺口识别", "弱建议"],
        limit: "不能装作很确定，也不生成可执行参数包。",
      },
      {
        title: "最终输出层",
        summary: "输出相似案例参考和当前缺失信息，而不是直接执行建议。",
        input: "弱建议和缺失项",
        output: "参考案例 + 缺失信息清单",
        tags: ["仅参考", "缺失提示"],
        limit: "不支持自动下发和强参数建议。",
      },
      {
        title: "后续动作层",
        summary: "转人工、进入知识补全任务，并标记为待沉淀场景。",
        input: "参考案例 + 缺失信息清单",
        output: "人工任务、知识建设任务",
        tags: ["转人工", "知识补全"],
        limit: "系统本轮只承担解释与引导角色。",
      },
    ],
    capabilities: {
      "候选菜谱输出": "仅参考",
      推荐排序: "仅参考",
      推荐理由: "弱支持",
      参数建议: "不支持",
      风险提示: "强支持",
      自动下发能力: "不支持",
      是否需要补问: "强支持",
      是否需要人工审核: "强支持",
      是否转人工: "强支持",
      是否进入知识建设队列: "强支持",
    },
    failureFlow: [
      { title: "补问", items: ["补问口味偏向", "补问设备型号", "补问交付目标"] },
      { title: "弱建议", items: ["只给相似案例参考", "不输出参数包"] },
      { title: "转人工", items: ["需口味工程师介入", "需业务验证"] },
      { title: "知识建设队列", items: ["需新增语料", "需沉淀新案例与新规则"] },
    ],
  },
  {
    id: "missing",
    name: "场景 D：数据缺失",
    shortName: "数据缺失",
    definition: "当前任务几乎没有内部相关资产，检索结果极弱甚至为空。",
    strength: 1,
    strengthLabel: "数据强度 1/5",
    outputLevel: "不能给强建议，只能给下一步引导",
    reviewMode: "直接转人工并进入知识建设队列",
    steps: [
      {
        title: "原始输入",
        summary: "输入可被解析，但内部几乎没有可利用的相关知识资产。",
        input: "北京口味 + 宫保鸡丁",
        output: "任务解析与关键字段抽取",
        tags: ["输入解析", "缺口识别"],
        limit: "系统只能先判断缺什么，不能装作知道答案。",
      },
      {
        title: "检索层处理",
        summary: "精确检索为空或几乎为空，相似检索命中极弱。",
        input: "菜品关键词、风味描述",
        output: "空结果或极弱命中",
        tags: ["空检索", "弱相似"],
        limit: "无法形成候选集合。",
      },
      {
        title: "规则与策略层处理",
        summary: "直接限制进入强建议模式，不允许自动生成可执行菜谱或高置信结论。",
        input: "空结果、风险等级、任务类型",
        output: "强限制标记、需人工处理标记",
        tags: ["禁止强建议", "高风险限制"],
        limit: "任何强结论都会被截断。",
      },
      {
        title: "模型推理层处理",
        summary: "仍可做输入解析、缺口识别和下一步引导，但不提供强建议。",
        input: "任务解析、空结果",
        output: "缺什么信息、需要什么后续动作",
        tags: ["缺口识别", "引导"],
        limit: "不做可执行建议输出。",
      },
      {
        title: "最终输出层",
        summary: "明确提示当前无足够内部知识支持，只给下一步引导。",
        input: "缺口识别结果",
        output: "弱结果 + 引导动作",
        tags: ["不支持", "需转人工"],
        limit: "不能给强建议或参数包。",
      },
      {
        title: "后续动作层",
        summary: "转人工处理、新增数据采集、新增菜谱建设并进入知识建设队列。",
        input: "弱结果 + 引导动作",
        output: "人工任务、采集任务、建设任务",
        tags: ["转人工", "新增采集", "知识建设"],
        limit: "系统此轮不承担建议输出。",
      },
    ],
    capabilities: {
      "候选菜谱输出": "不支持",
      推荐排序: "不支持",
      推荐理由: "仅参考",
      参数建议: "不支持",
      风险提示: "强支持",
      自动下发能力: "不支持",
      是否需要补问: "强支持",
      是否需要人工审核: "强支持",
      是否转人工: "强支持",
      是否进入知识建设队列: "强支持",
    },
    failureFlow: [
      { title: "补问", items: ["补问设备型号", "补问目标口味描述", "补问交付场景"] },
      { title: "弱建议", items: ["仅给下一步引导", "不生成任何参数包"] },
      { title: "转人工", items: ["直接转口味工程师或业务确认"] },
      { title: "知识建设队列", items: ["新增数据采集", "新增菜谱建设", "新增知识条目"] },
    ],
  },
  {
    id: "wide-rich",
    name: "场景 E：输入模糊但数据丰富",
    shortName: "输入模糊但数据丰富",
    definition: "用户只给粗需求，系统有大量相关资产，需要依靠逐层缩圈来收敛输出。",
    strength: 4,
    strengthLabel: "数据强度 4/5",
    outputLevel: "可给小范围候选或推荐 + 追问",
    reviewMode: "根据补问结果决定是否进入强建议",
    steps: [
      {
        title: "原始输入",
        summary: "输入很宽，不追求一步唯一答案，而是允许系统逐层缩圈。",
        input: "我要一个北京口味的宫保鸡丁",
        output: "宽需求描述",
        tags: ["模糊输入", "宽问题"],
        limit: "用户没有给出份量、设备等关键条件。",
      },
      {
        title: "检索层处理",
        summary: "宽召回大量候选，不追求一步唯一命中。",
        input: "模糊需求 + 大量内部知识资产",
        output: "宽候选集合、相似案例、标杆菜谱",
        tags: ["宽召回", "不漏相关内容"],
        limit: "候选很多，必须交给规则层缩圈。",
      },
      {
        title: "规则与策略层处理",
        summary: "基于设备、状态、权限、场景先做硬过滤，显著缩小候选范围。",
        input: "宽候选集合、设备约束、知识状态",
        output: "小范围可用候选、需补问项",
        tags: ["硬过滤", "缩圈", "场景收口"],
        limit: "若关键条件仍缺失，则保留补问要求。",
      },
      {
        title: "模型推理层处理",
        summary: "结合模糊语义进一步收敛、排序，并决定是直接推荐还是继续补问。",
        input: "规则筛后的候选与关键约束",
        output: "推荐 + 追问 或 小范围候选",
        tags: ["语义收敛", "排序", "补问决策"],
        limit: "不能在关键条件缺失时强行给唯一答案。",
      },
      {
        title: "最终输出层",
        summary: "给出小范围候选，或推荐 + 追问，而不是装作已经有唯一结论。",
        input: "模型收敛结果",
        output: "候选列表、补问、推荐理由",
        tags: ["小范围输出", "推荐+追问"],
        limit: "输出强度取决于补问是否完成。",
      },
      {
        title: "后续动作层",
        summary: "根据补问结果进入强建议模式，或转人工继续确认。",
        input: "候选列表 + 补问信息",
        output: "继续追问、人工确认、设备辅助交付",
        tags: ["逐层收口", "继续确认"],
        limit: "不会跳过关键条件直接下发。",
      },
    ],
    capabilities: {
      "候选菜谱输出": "强支持",
      推荐排序: "弱支持",
      推荐理由: "强支持",
      参数建议: "弱支持",
      风险提示: "强支持",
      自动下发能力: "仅参考",
      是否需要补问: "强支持",
      是否需要人工审核: "弱支持",
      是否转人工: "仅参考",
      是否进入知识建设队列: "不支持",
    },
    failureFlow: [
      { title: "补问", items: ["偏甜还是偏辣", "单份试菜还是大份交付", "当前设备型号是什么"] },
      { title: "弱建议", items: ["给小范围候选而不强行唯一输出", "参数建议先作为参考"] },
      { title: "转人工", items: ["补问后仍无法收敛时转人工"] },
      { title: "知识建设队列", items: ["仅在发现新场景缺口时进入队列"] },
    ],
  },
];

const capabilityRows = [
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

let activeScenarioId = scenarioData[0].id;

const scenarioTabsEl = document.querySelector("#scenarioTabs");
const waterfallFlowEl = document.querySelector("#waterfallFlow");
const matrixTableEl = document.querySelector("#matrixTable");
const failureFlowEl = document.querySelector("#failureFlow");
const scenarioDescEl = document.querySelector("#activeScenarioDesc");
const scenarioMetaEl = document.querySelector("#scenarioMeta");

function getScenarioById(id) {
  return scenarioData.find((item) => item.id === id) || scenarioData[0];
}

function renderScenarioTabs() {
  scenarioTabsEl.innerHTML = scenarioData
    .map((scenario) => {
      const strengthBar = Array.from({ length: 5 }, (_, index) => {
        const isOn = index < scenario.strength ? "is-on" : "";
        return `<span class="${isOn}"></span>`;
      }).join("");

      return `
        <button class="scenario-tab ${scenario.id === activeScenarioId ? "is-active" : ""}" data-scenario-id="${scenario.id}" type="button">
          <h3>${scenario.name}</h3>
          <p>${scenario.definition}</p>
          <div class="strength-bar" aria-hidden="true">${strengthBar}</div>
          <p>${scenario.strengthLabel}</p>
        </button>
      `;
    })
    .join("");
}

function renderScenarioMeta(scenario) {
  scenarioDescEl.textContent = scenario.definition;
  scenarioMetaEl.innerHTML = `
    <div class="scenario-meta-item">
      <strong>当前输出等级</strong>
      <span>${scenario.outputLevel}</span>
    </div>
    <div class="scenario-meta-item">
      <strong>当前处理模式</strong>
      <span>${scenario.reviewMode}</span>
    </div>
  `;
}

function renderWaterfall(scenario) {
  waterfallFlowEl.innerHTML = `
    <div class="waterfall-list">
      ${scenario.steps
        .map((step, index) => {
          const tags = step.tags
            .map((tag, tagIndex) => {
              const chipClasses = ["chip-strong", "chip-medium", "chip-weak", "chip-action"];
              return `<span class="status-chip ${chipClasses[tagIndex % chipClasses.length]}">${tag}</span>`;
            })
            .join("");

          return `
            <div class="waterfall-step ${index === 0 ? "is-open" : ""}" data-step-index="${index}">
              <h3>${step.title}</h3>
              <div class="step-summary">${step.summary}</div>
              <div class="step-meta" ${index === 0 ? "" : "hidden"}>
                <div class="step-meta-item">
                  <strong>输入</strong>
                  <span>${step.input}</span>
                </div>
                <div class="step-meta-item">
                  <strong>输出</strong>
                  <span>${step.output}</span>
                </div>
                <div class="step-meta-item">
                  <strong>当前能做多深</strong>
                  <span>${step.summary}</span>
                </div>
                <div class="step-meta-item">
                  <strong>风险 / 限制</strong>
                  <span>${step.limit}</span>
                </div>
              </div>
              <div class="step-tags">${tags}</div>
            </div>
            ${index < scenario.steps.length - 1 ? '<div class="waterfall-arrow">↓</div>' : ""}
          `;
        })
        .join("")}
    </div>
  `;

  waterfallFlowEl.querySelectorAll(".waterfall-step").forEach((step) => {
    step.addEventListener("click", () => {
      const meta = step.querySelector(".step-meta");
      const isHidden = meta.hasAttribute("hidden");
      meta.toggleAttribute("hidden", !isHidden);
      step.classList.toggle("is-open", isHidden);
    });
  });
}

function renderMatrix() {
  const header = `
    <div class="matrix-row">
      <div class="matrix-head">输出能力</div>
      ${scenarioData
        .map((scenario) => `<div class="matrix-head ${scenario.id === activeScenarioId ? "is-active" : ""}">${scenario.shortName}</div>`)
        .join("")}
    </div>
  `;

  const rows = capabilityRows
    .map((rowName) => {
      const cells = scenarioData
        .map((scenario) => {
          const value = scenario.capabilities[rowName];
          const isActive = scenario.id === activeScenarioId ? "is-active" : "";
          return `<div class="matrix-cell ${isActive}">${value}</div>`;
        })
        .join("");

      return `
        <div class="matrix-row">
          <div class="matrix-head">${rowName}</div>
          ${cells}
        </div>
      `;
    })
    .join("");

  matrixTableEl.innerHTML = header + rows;
}

function renderFailureFlow(scenario) {
  failureFlowEl.innerHTML = scenario.failureFlow
    .map(
      (item) => `
        <article class="failure-card">
          <h3>${item.title}</h3>
          <ul>
            ${item.items.map((text) => `<li>${text}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderScene() {
  const scenario = getScenarioById(activeScenarioId);
  renderScenarioTabs();
  renderScenarioMeta(scenario);
  renderWaterfall(scenario);
  renderMatrix();
  renderFailureFlow(scenario);

  scenarioTabsEl.querySelectorAll(".scenario-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeScenarioId = button.dataset.scenarioId || scenarioData[0].id;
      renderScene();
    });
  });
}

renderScene();
