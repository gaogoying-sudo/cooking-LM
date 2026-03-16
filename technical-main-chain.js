const technicalChainData = [
  {
    title: "原始数据接入层",
    summary: "把内部业务数据、外部参考资料、专家经验和现场记录接入系统。",
    input: "数据库、纪要、视频、图片、日志、专家经验。",
    output: "原始素材池、待解析素材队列、已登记数据源。",
    boundary: "解决的是素材从哪里来，不负责解释和沉淀。",
  },
  {
    title: "结构化加工层",
    summary: "把不同来源、不同模态素材映射进统一对象体系。",
    input: "原始素材池。",
    output: "结构化记录、对象挂载、标签、关系、证据链接。",
    boundary: "解决的是对象化，不直接把一切升华为知识。",
  },
  {
    title: "知识沉淀层",
    summary: "把可复用经验提炼成规则、模板、模式和标杆案例。",
    input: "结构化记录、相似记录聚合结果。",
    output: "经验规则、失败模式、风险策略、标杆菜谱。",
    boundary: "AI 生成候选不等于直接成为有效知识。",
  },
  {
    title: "检索层",
    summary: "从数据库、知识库和向量库召回与当前任务最相关的上下文。",
    input: "用户需求、结构化任务、查询条件。",
    output: "候选菜谱、候选案例、候选规则、命中来源。",
    boundary: "负责找全相关内容，不负责决定最终可不可以输出。",
  },
  {
    title: "规则与策略层",
    summary: "根据设备、风险、状态和权限做过滤、收口和流程控制。",
    input: "检索结果、设备上下文、知识状态、风险等级。",
    output: "可进入下一步的候选范围、过滤原因、输出等级。",
    boundary: "负责裁边界，不替代模型的理解与解释能力。",
  },
  {
    title: "模型推理层",
    summary: "在规则允许范围内，对少量上下文做理解、比较、排序、解释和建议生成。",
    input: "规则筛后的候选、任务目标、必要业务约束。",
    output: "推荐结果、理由、参数建议、缺失信息提示。",
    boundary: "负责想，不替代知识库与规则引擎。",
  },
  {
    title: "输出执行层",
    summary: "把系统结果转成建议、补问、审核、转人工和设备执行动作。",
    input: "建议结果、风险等级、任务状态。",
    output: "交付动作、审核链、回写记录、知识建设任务。",
    boundary: "解决的是如何把结果落到真实工作流里。",
  },
];

const chainBoard = document.querySelector("#chainBoard");
const chainDetail = document.querySelector("#chainDetail");
let activeChainIndex = 0;

function renderTechnicalChain() {
  if (!chainBoard || !chainDetail) {
    return;
  }

  chainBoard.innerHTML = `
    <div class="chain-track">
      ${technicalChainData
        .map(
          (item, index) => `
            <button class="chain-card ${index === activeChainIndex ? "chip-accent" : ""}" type="button" data-index="${index}">
              <span class="node-label">0${index + 1}</span>
              <h3>${item.title}</h3>
              <p>${item.summary}</p>
            </button>
            ${index < technicalChainData.length - 1 ? '<div class="chain-arrow">→</div>' : ""}
          `
        )
        .join("")}
    </div>
  `;

  const item = technicalChainData[activeChainIndex];
  chainDetail.innerHTML = `
    <strong>${item.title}</strong>
    <div class="detail-grid" style="margin-top: 14px;">
      <div class="detail-box"><strong>这一层解决什么</strong><span>${item.summary}</span></div>
      <div class="detail-box"><strong>输入</strong><span>${item.input}</span></div>
      <div class="detail-box"><strong>输出</strong><span>${item.output}</span></div>
    </div>
    <p style="margin-top: 14px;">${item.boundary}</p>
  `;

  chainBoard.querySelectorAll("[data-index]").forEach((button) => {
    button.addEventListener("click", () => {
      activeChainIndex = Number(button.dataset.index || 0);
      renderTechnicalChain();
    });
  });
}

renderTechnicalChain();
