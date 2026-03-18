# cooking-LM

Cooking LM 多页面 HTML 工作台原型。

## 版本迭代记录

### 2026-03-17 / 阶段性封板版本

- 当前版本名称：`CLM Rebuild Workspace / 阶段性封板`
- 当前分支：`clm-rebuild`
- 当前阶段：主工作台可用版本封板，准备进入下一轮目录治理与子任务拆分
- 本轮封板时间：`2026-03-17`
- 本轮主要内容：
  - 保留当前 `clm-rebuild.html` 作为主工作台
  - 保留现有多页面体系、阶段性工作产出模块和历史版本入口
  - 新增封板快照：`clm-rebuild-snapshot-20260317-seal.html`
  - 为 README 增加版本日志和页面地图，便于后续分栏 agent 直接接手
- 本轮还未解决的问题：
  - 根目录页面仍然偏多，后续需要按 `core / tasks / archive` 做目录治理
  - 子任务页面还未全部拆成独立 HTML 文件
  - 历史页、专题页、主工作台之间的引用关系还可以继续收束
- 下一轮计划方向：
  - 整理工程目录
  - 拆出独立子任务页面
  - 继续修正页面用途边界与历史版本归档方式

### 2026-03-17 / 目录治理与子任务拆分版本

- 当前版本名称：`CLM Rebuild Workspace / 目录治理与子任务拆分`
- 当前分支：`clm-rebuild`
- 当前阶段：在封板基线之上补齐目录结构、子任务页面和页面用途说明
- 本轮时间：`2026-03-17`
- 本轮主要内容：
  - 新增目录：`pages/core/`、`pages/tasks/`、`pages/archive/`、`assets/css/`、`assets/js/`
  - 将主工作台涉及的专题页复制归档到 `pages/core/` 与 `pages/archive/`
  - 新增 6 个子任务页，方便后续分栏 agent 分头推进
  - 在 `clm-rebuild.html` 中补充到子任务页的轻量入口
  - 让 README 同时承担版本日志、页面地图和子页面用途说明
- 本轮还未解决的问题：
  - 根目录与新目录当前仍是兼容并存状态，后续还可继续收敛
  - 子任务页目前以基础结构为主，后续需要继续补各自内容深度
  - 历史页引用已保留，但仍可进一步统一跳转体验
- 下一轮计划方向：
  - 逐个子任务页继续深化
  - 根据推进情况决定是否把更多入口切换到 `pages/` 目录
  - 继续压缩根目录中的非核心页面数量

### 2026-03-18 / 平台信息架构重组版本

- 当前版本名称：`CLM Platform / 信息架构重组版`
- 当前分支：`clm-rebuild`
- 当前阶段：从“散页面 + 专题页”升级为“总界面 + 视角页 + 专题页 + 子任务页 + 历史页”的平台结构
- 本轮时间：`2026-03-18`
- 本轮主要内容：
  - 新建总界面：`index.html`
  - 新建视角页：`pages/core/construction-view.html`、`pages/core/operation-view.html`
  - 新建专题入口页：`pages/core/case-and-samples.html`、`pages/core/stage-outputs-hub.html`、`pages/core/governance-view.html`
  - 把技术总链路、技术交付、案例矩阵、阶段性工作产出、进展治理重新归位到更稳定的平台层级
  - 增强历史版本按钮，使当前版本、快照页、旧专题页和 archive 页都能带摘要回查
- 本轮还未解决的问题：
  - 根目录与 `pages/core/` 当前仍有兼容并存关系，后续可继续收敛
  - 现有专题正文还可继续向新平台层级迁移
  - 历史版本面板目前为静态维护，后续可再考虑统一配置化
- 下一轮计划方向：
  - 继续把深内容迁移到视角页 / 专题页 / 子任务页
  - 压缩根目录中非核心页面数量
  - 继续细化建设视角与运行视角的分栏逻辑

## 项目页面结构说明

### 根目录核心入口

- `index.html`
  - 作用：当前大版本总界面 / 总控导航台
- `clm-rebuild.html`
  - 作用：上一阶段的重构主工作台，现作为历史综合页保留
- `README.md`
  - 作用：版本日志、页面地图、页面归位总表、子任务用途说明

### `pages/core/`

- 用途：承接当前大版本的视角页、专题页和核心专题页
- 当前包含：
  - `construction-view.html`
  - `operation-view.html`
  - `case-and-samples.html`
  - `stage-outputs-hub.html`
  - `governance-view.html`
  - `project-definition.html`
  - `technical-main-chain.html`
  - `technical-delivery-workbench.html`
  - `knowledge-formation-flow.html`
  - `layered-case-matrix.html`
  - `sample-scenario-loop.html`
  - `progress-and-roadmap.html`

### `pages/tasks/`

- 用途：承接后续分栏 agent 继续推进的独立子任务页

### `pages/archive/`

- 用途：归档当前快照、旧主入口、旧试验页和历史表达

### `assets/css/` 与 `assets/js/`

- 用途：承接当前大版本页面壳层、历史版本面板、统一样式与轻量交互脚本

## 页面地图 / 页面说明

### 当前大版本页面树

- `index.html`
  - 页面名称：Cooking LM / 平台总界面
  - 所属层级：总界面
  - 页面回答的主问题：我们整体在建什么
  - 适合讨论：总控、平台层级、结构归位

- `pages/core/construction-view.html`
  - 页面名称：建设视角页
  - 所属层级：视角页
  - 页面回答的主问题：我们如何把原始输入加工成系统资产
  - 适合讨论：建设视角分栏、知识形成分栏

- `pages/core/operation-view.html`
  - 页面名称：运行视角页
  - 所属层级：视角页
  - 页面回答的主问题：当客户真实提出需求时，系统如何工作
  - 适合讨论：运行视角分栏、运行链路分栏

- `pages/core/technical-delivery-workbench.html`
  - 页面名称：技术交付专题页
  - 所属层级：专题页
  - 页面回答的主问题：最终交付物到底是什么
  - 适合讨论：技术交付分栏

- `pages/core/case-and-samples.html`
  - 页面名称：案例与样板专题页
  - 所属层级：专题入口页
  - 页面回答的主问题：同一套系统在真实案例和不同数据状态下怎么工作
  - 适合讨论：案例矩阵分栏、样板案例分栏

- `pages/core/stage-outputs-hub.html`
  - 页面名称：阶段性工作产出专题页
  - 所属层级：专题入口页
  - 页面回答的主问题：当前已经沉淀了哪些具体成果物
  - 适合讨论：产出台账分栏、成果沉淀分栏

- `pages/core/governance-view.html`
  - 页面名称：进展与治理专题页
  - 所属层级：专题页
  - 页面回答的主问题：现在做到哪、页面如何归位、版本如何治理
  - 适合讨论：计划推进分栏、治理分栏

### 继续保留的核心专题页

- `pages/core/project-definition.html`
  - 页面名称：项目定义与阶段目标页
  - 页面回答的主问题：项目目标、三类场景和阶段边界是什么

- `pages/core/technical-main-chain.html`
  - 页面名称：技术总链路页
  - 页面回答的主问题：完整技术主链是什么

- `pages/core/knowledge-formation-flow.html`
  - 页面名称：知识形成链路页
  - 页面回答的主问题：前三层如何形成知识与资产

- `pages/core/layered-case-matrix.html`
  - 页面名称：技术分层案例矩阵页
  - 页面回答的主问题：不同数据状态下系统如何分级输出

- `pages/core/sample-scenario-loop.html`
  - 页面名称：样板场景闭环页
  - 页面回答的主问题：样板任务如何从输入走到回写

- `pages/core/progress-and-roadmap.html`
  - 页面名称：建设进展与路线图页
  - 页面回答的主问题：任务、时间、里程碑和产出如何推进

## 子任务页面说明

- `pages/tasks/recipe-dimensions.html`
  - 页面名称：Recipe Dimensions / 菜谱维度子任务页
  - 所属模块：阶段性工作产出
  - 页面回答的主问题：菜谱维度如何拆解为字段、样例和标准
  - 适合哪个分栏 / agent：菜谱维度分栏、字段设计分栏

- `pages/tasks/experience-rules.html`
  - 页面名称：Experience Rules / 经验规则子任务页
  - 所属模块：阶段性工作产出
  - 页面回答的主问题：经验规则条目如何建模、录入和验证
  - 适合哪个分栏 / agent：经验规则分栏、规则库分栏

- `pages/tasks/research-interviews.html`
  - 页面名称：Research Inputs / 认知输入子任务页
  - 所属模块：阶段性工作产出
  - 页面回答的主问题：调研文本如何被整理、提炼、分流与沉淀
  - 适合哪个分栏 / agent：调研分栏、认知输入分栏

- `pages/tasks/sample-case-gongbao.html`
  - 页面名称：Gongbao Sample Case / 宫保鸡丁样板案例页
  - 所属模块：案例与样板
  - 页面回答的主问题：北京口味宫保鸡丁案例如何形成完整链路
  - 适合哪个分栏 / agent：样板案例分栏、案例矩阵分栏

- `pages/tasks/core-objects.html`
  - 页面名称：Core Objects / 核心对象页
  - 所属模块：技术交付
  - 页面回答的主问题：核心对象如何定义字段骨架与关联关系
  - 适合哪个分栏 / agent：核心对象分栏、对象建模分栏

- `pages/tasks/build-plan-board.html`
  - 页面名称：Build Plan Board / 建设计划板
  - 所属模块：进展与治理
  - 页面回答的主问题：任务台账、甘特图、里程碑如何持续推进
  - 适合哪个分栏 / agent：主控分栏、计划推进分栏

## 历史页 / archive 说明

- `clm-rebuild.html`
  - 页面角色：上一阶段重构主工作台
  - 保留原因：作为当前大版本前的综合结构参考

- `pages/archive/index-clm-master-archive-20260318.html`
  - 页面角色：旧版总控导航台归档
  - 保留原因：保留平台重组前的主入口表达

- `pages/archive/clm-rebuild-snapshot-20260316.html`
  - 页面角色：较早快照
  - 保留原因：回查更早阶段的工作台状态

- `pages/archive/clm-rebuild-snapshot-20260317-seal.html`
  - 页面角色：阶段性封板快照
  - 保留原因：作为平台重组前的稳定基线

- `pages/archive/clm-current-archive.html`
  - 页面角色：历史快照
  - 保留原因：回看进入重构前的当前页状态

- `pages/archive/overview-archive.html`
  - 页面角色：旧总览归档页
  - 保留原因：保留早期总览表达

- `pages/archive/tech-delivery.html`
  - 页面角色：旧版技术交付页
  - 保留原因：回查技术交付专题早期表达

- `pages/archive/tech-case-matrix.html`
  - 页面角色：旧版案例矩阵页
  - 保留原因：回查案例矩阵早期试验表达

- `pages/archive/tech-layered-knowledge-matrix.html`
  - 页面角色：旧版知识形成矩阵页
  - 保留原因：回查知识形成与运行链路的旧整合表达

## 页面归位总表

| 页面 | 当前角色 | 所属层级 | 页面回答的主问题 | 当前状态 |
| --- | --- | --- | --- | --- |
| `index.html` | 总界面 | 主入口 | 我们整体在建什么 | 当前版本 |
| `pages/core/construction-view.html` | 视角页 | 建设视角 | 原始输入如何被加工成系统资产 | 当前版本 |
| `pages/core/operation-view.html` | 视角页 | 运行视角 | 真实需求进入后系统如何工作 | 当前版本 |
| `pages/core/technical-delivery-workbench.html` | 专题页 | 技术交付 | 最终交付物到底是什么 | 当前版本 |
| `pages/core/case-and-samples.html` | 专题入口页 | 案例与样板 | 案例矩阵与样板任务如何统一归位 | 当前版本 |
| `pages/core/stage-outputs-hub.html` | 专题入口页 | 阶段性工作产出 | 当前已经沉淀了哪些成果物 | 当前版本 |
| `pages/core/governance-view.html` | 专题页 | 进展与治理 | 现在做到哪、页面如何归位、版本如何治理 | 当前版本 |
| `clm-rebuild.html` | 历史综合页 | 上一阶段重构页 | 上一阶段如何组织模块 | 历史保留 |
| `pages/archive/*` | 归档页 | 历史 / 快照 | 旧主入口、旧专题、旧快照如何回查 | 长期保留 |

## 当前说明

当前版本已重组为 `总界面 + 两个视角页 + 多个专题页 + 子任务页 + 历史页 / archive 页` 的平台结构。

旧页面内容全部保留，不做删除；新页面负责上层装配和入口治理，历史版本按钮负责快速回查，README 负责完整版本日志、页面地图和归位总表。
