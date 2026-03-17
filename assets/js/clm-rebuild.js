const moduleConfig = {
  definition: {
    title: "项目定义",
    items: [
      { id: "def-goal", label: "项目目标" },
      { id: "def-scenes", label: "应用场景" },
      { id: "def-boundary", label: "当前边界" },
      { id: "def-phase", label: "当前阶段目标" },
    ],
  },
  "main-chain": {
    title: "技术总链路",
    items: [
      { id: "chain-overview", label: "总链路概览" },
      { id: "chain-ingest", label: "原始数据接入层" },
      { id: "chain-structuring", label: "结构化加工层" },
      { id: "chain-knowledge", label: "知识沉淀层" },
      { id: "chain-retrieval", label: "检索层" },
      { id: "chain-rules", label: "规则与策略层" },
      { id: "chain-reasoning", label: "模型推理层" },
      { id: "chain-output", label: "输出执行层" },
    ],
  },
  delivery: {
    title: "技术交付",
    items: [
      { id: "delivery-target", label: "最终交付物" },
      { id: "delivery-system", label: "交付系统组成" },
      { id: "delivery-status", label: "当前状态" },
      { id: "delivery-objects", label: "核心对象" },
      { id: "delivery-state", label: "知识状态" },
      { id: "delivery-phases", label: "阶段地图" },
      { id: "delivery-current", label: "当前已有与待建" },
    ],
  },
  matrix: {
    title: "案例矩阵",
    items: [
      { id: "matrix-scenes", label: "场景说明" },
      { id: "matrix-state-grid", label: "数据状态矩阵" },
      { id: "matrix-processing", label: "分层处理矩阵" },
      { id: "matrix-output", label: "输出能力矩阵" },
      { id: "matrix-failure", label: "正确失败机制" },
    ],
  },
  plan: {
    title: "进展计划",
    items: [
      { id: "plan-current", label: "当前状态" },
      { id: "plan-modules", label: "模块计划" },
      { id: "plan-time", label: "时间计划" },
      { id: "plan-milestones", label: "里程碑" },
      { id: "plan-outputs", label: "当前阶段产出" },
      { id: "plan-risk", label: "风险与依赖" },
    ],
  },
  outputs: {
    title: "阶段性工作产出",
    items: [
      { id: "outputs-overview", label: "产出总览" },
      { id: "outputs-dimensions", label: "菜谱维度展开" },
      { id: "outputs-rules", label: "经验规则 / 经验公式" },
      { id: "outputs-research", label: "认知输入与沉淀" },
      { id: "outputs-tech", label: "技术项详细交付" },
      { id: "outputs-history", label: "历史版本 / 关联引用" },
    ],
  },
};

let activeModule = "definition";
let secondaryObserver = null;
let activeOutputSection = "outputs-overview";

const primaryTabs = Array.from(document.querySelectorAll(".primary-tab"));
const modulePanels = Array.from(document.querySelectorAll(".module-panel"));
const secondaryNav = document.querySelector("#secondaryNav");
const sidebarTitle = document.querySelector("#sidebarTitle");
const backToTopButton = document.querySelector(".back-to-top");
const versionToggle = document.querySelector(".version-toggle");
const versionPanel = document.querySelector("#versionPanel");
const outputContentPanels = Array.from(document.querySelectorAll(".output-content-panel"));

function getDefaultModuleId() {
  return moduleConfig[activeModule] ? activeModule : "definition";
}

function getDefaultSectionId(moduleId) {
  return moduleConfig[moduleId]?.items[0]?.id || null;
}

function setActiveSecondaryLink(targetId) {
  if (!secondaryNav) {
    return;
  }

  secondaryNav.querySelectorAll(".secondary-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${targetId}`);
  });
}

function setActiveOutputSection(sectionId) {
  const outputOverview = document.getElementById("outputs-overview");
  const targetPanel = outputContentPanels.find((panel) => panel.id === sectionId);
  const resolvedSectionId = targetPanel || sectionId === "outputs-overview" ? sectionId : "outputs-overview";
  const resolvedPanel = outputContentPanels.find((panel) => panel.id === resolvedSectionId);

  activeOutputSection = resolvedSectionId;

  outputContentPanels.forEach((panel) => {
    const isActive = panel.id === resolvedSectionId;
    panel.hidden = !isActive;
    panel.classList.toggle("active-output-panel", isActive);
  });

  if (outputOverview) {
    const showOverview = resolvedSectionId === "outputs-overview";
    outputOverview.hidden = !showOverview;
    outputOverview.classList.toggle("active-output-panel", showOverview);
  }

  if (!resolvedPanel && outputOverview) {
    outputOverview.hidden = false;
    outputOverview.classList.add("active-output-panel");
    activeOutputSection = "outputs-overview";
  }

  setActiveSecondaryLink(activeOutputSection);
}

function renderSecondaryNav() {
  const config = moduleConfig[activeModule];
  if (!secondaryNav || !sidebarTitle || !config) {
    return;
  }

  sidebarTitle.textContent = config.title;
  secondaryNav.innerHTML = config.items
    .map((item, index) => `<a class="secondary-link ${index === 0 ? "active" : ""}" href="#${item.id}">${item.label}</a>`)
    .join("");

  secondaryNav.querySelectorAll(".secondary-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = targetId ? document.querySelector(targetId) : null;
      if (!target) {
        return;
      }
      event.preventDefault();
      if (activeModule === "outputs") {
        setActiveOutputSection(target.id);
        const topAnchor = document.querySelector(".module-panel[data-module-panel='outputs']");
        if (topAnchor) {
          topAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (activeModule === "outputs") {
    const visibleOutputId = config.items.some((item) => item.id === activeOutputSection)
      ? activeOutputSection
      : config.items[1]?.id || config.items[0]?.id;
    setActiveOutputSection(visibleOutputId);
    if (secondaryObserver) {
      secondaryObserver.disconnect();
    }
    return;
  }

  bindSecondaryObserver(config.items);
}

function bindSecondaryObserver(items) {
  if (secondaryObserver) {
    secondaryObserver.disconnect();
  }

  const sections = items
    .map((item) => document.getElementById(item.id))
    .filter(Boolean);

  secondaryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const activeId = entry.target.id;
        secondaryNav.querySelectorAll(".secondary-link").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
      });
    },
    {
      rootMargin: "-18% 0px -65% 0px",
      threshold: 0.12,
    }
  );

  sections.forEach((section) => secondaryObserver.observe(section));
}

function setActiveModule(moduleId) {
  const resolvedModuleId = moduleConfig[moduleId] ? moduleId : "definition";
  activeModule = resolvedModuleId;

  primaryTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.module === resolvedModuleId);
  });

  modulePanels.forEach((panel) => {
    const isActive = panel.dataset.modulePanel === resolvedModuleId;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });

  renderSecondaryNav();

  const firstSectionId = getDefaultSectionId(resolvedModuleId);
  const firstSection = firstSectionId ? document.getElementById(firstSectionId) : null;
  if (firstSection) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

primaryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveModule(tab.dataset.module || "definition");
  });
});

const toggleBackToTop = () => {
  if (!backToTopButton) return;
  backToTopButton.classList.toggle("is-visible", window.scrollY > 560);
};

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (versionToggle && versionPanel) {
  versionToggle.addEventListener("click", () => {
    const willOpen = versionPanel.hasAttribute("hidden");
    versionPanel.toggleAttribute("hidden", !willOpen);
    versionToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });
}

window.addEventListener("scroll", toggleBackToTop, { passive: true });
toggleBackToTop();
setActiveModule(getDefaultModuleId());
