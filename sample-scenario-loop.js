const sampleSteps = [
  ["客户 / 任务输入", "客户要把一份菜谱扩成多份设备执行版本，目标是先起出可试做首版。"],
  ["原始素材与历史数据进入", "拉起历史菜谱版本、设备日志、放量记录、调整纪要和专家经验。"],
  ["结构化对象形成", "把菜谱版本、参数项、工艺步骤、调整动作和评价结果挂到统一对象体系。"],
  ["相关知识与规则命中", "命中放量规则、设备限制、历史风险标签和标杆案例。"],
  ["检索候选", "召回相似份量扩展案例和设备适配记录。"],
  ["规则收口", "过滤不适配设备或风险过高的扩量路径。"],
  ["模型推理", "在允许范围内比较候选，生成首版扩量方案和理由。"],
  ["输出首版方案", "输出多份版参数包、风险提示和试做建议。"],
  ["试做反馈", "记录口味、稳定性、设备执行效果和人工调整结果。"],
  ["回写系统", "把试做结果回写为新案例、调整原因和效果记录。"],
  ["形成新知识", "沉淀新的放量规则、风险边界和后续推荐依据。"],
];

const sampleLoop = document.querySelector("#sampleLoop");

if (sampleLoop) {
  sampleLoop.innerHTML = sampleSteps
    .map(
      ([title, content], index) => `
        <details class="loop-step" ${index === 0 ? "open" : ""}>
          <summary><strong>${title}</strong></summary>
          <p>${content}</p>
        </details>
        ${index < sampleSteps.length - 1 ? '<div class="waterfall-arrow">↓</div>' : ""}
      `
    )
    .join("");
}
