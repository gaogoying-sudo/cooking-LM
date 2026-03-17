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

## 项目页面结构说明

### 根目录核心入口

- `index.html`
  - 作用：总入口 / 导航台
- `clm-rebuild.html`
  - 作用：当前分支上的主工作台 / 主开发对象
- `README.md`
  - 作用：版本日志、页面地图、子页面用途说明

### `pages/core/`

- 用途：保留当前体系下的核心专题页镜像，便于后续继续归档和目录治理
- 当前包含：
  - `project-definition.html`
  - `technical-main-chain.html`
  - `technical-delivery-workbench.html`
  - `knowledge-formation-flow.html`
  - `layered-case-matrix.html`
  - `sample-scenario-loop.html`
  - `progress-and-roadmap.html`

### `pages/tasks/`

- 用途：承接后续分栏 agent 继续推进的子任务页

### `pages/archive/`

- 用途：归档当前快照、旧试验页和历史表达，避免主工作台继续堆历史内容

### `assets/css/` 与 `assets/js/`

- 用途：为后续逐步收敛样式与脚本文件做准备
- 当前已同步保存主工作台相关 CSS / JS 副本，后续可逐步切换引用

## 页面地图 / 页面说明

### 主页面

- `index.html`
  - 页面名称：Cooking LM / CLM 总控导航台
  - 主要用途：作为多页面体系的总入口，适合快速总览和跳转
  - 讨论用途：适合总控、导航、整体讲法讨论

- `clm-rebuild.html`
  - 页面名称：Cooking LM / 重构主工作台
  - 主要用途：当前分支上的主开发页面，承接项目定义、技术链路、技术交付、案例矩阵、进展计划、阶段性工作产出
  - 讨论用途：适合主控 agent、信息架构整理、计划推进、模块串联

### 专题页面

- `project-definition.html`
  - 页面名称：项目定义与阶段目标页
  - 主要用途：承接项目目标、三类场景、当前边界
  - 讨论用途：适合项目定义分栏

- `technical-main-chain.html`
  - 页面名称：技术总链路页
  - 主要用途：承接原始数据接入层到输出执行层的主链
  - 讨论用途：适合技术链路分栏

- `technical-delivery-workbench.html`
  - 页面名称：技术交付工作台页
  - 主要用途：承接最终交付物、交付系统组成、对象、状态、阶段地图
  - 讨论用途：适合技术交付分栏

- `knowledge-formation-flow.html`
  - 页面名称：知识形成链路页
  - 主要用途：承接前三层知识形成逻辑
  - 讨论用途：适合知识形成 / 数据加工分栏

- `layered-case-matrix.html`
  - 页面名称：技术分层案例矩阵页
  - 主要用途：承接不同数据状态下的分层处理与输出能力分级
  - 讨论用途：适合案例矩阵分栏

- `sample-scenario-loop.html`
  - 页面名称：样板场景闭环页
  - 主要用途：承接样板任务从输入到回写的闭环表达
  - 讨论用途：适合样板案例 / 试点工程分栏

- `progress-and-roadmap.html`
  - 页面名称：建设进展与路线图页
  - 主要用途：承接建设进展、路线图、阶段目标
  - 讨论用途：适合计划推进分栏

### 当前历史 / 归档页面

- `clm-rebuild-snapshot-20260316.html`
  - 页面名称：当前版本快照
  - 主要用途：保留上一轮 `clm-rebuild` 快照
  - 讨论用途：适合回查上一轮状态

- `clm-rebuild-snapshot-20260317-seal.html`
  - 页面名称：阶段性封板快照
  - 主要用途：保留本轮封板时的主工作台状态
  - 讨论用途：适合作为下一轮结构重构前的稳定基线

- `clm-current-archive.html`
  - 页面名称：当前历史快照
  - 主要用途：保留进入重构主工作台之前的当前页状态
  - 讨论用途：适合回看主页面重构前版本

- `overview-archive.html`
  - 页面名称：旧总览归档页
  - 主要用途：保留早期总览表达
  - 讨论用途：适合历史讲法参考

### 旧试验 / 旧专题页面

- `tech-delivery.html`
  - 页面名称：旧版技术交付页
  - 主要用途：保留旧技术交付表达
  - 讨论用途：适合旧交付结构回查

- `tech-case-matrix.html`
  - 页面名称：旧版案例矩阵页
  - 主要用途：保留早期案例矩阵试验
  - 讨论用途：适合旧矩阵表达回查

- `tech-layered-knowledge-matrix.html`
  - 页面名称：旧版知识形成矩阵页
  - 主要用途：保留前三层与后三层整合表达
  - 讨论用途：适合知识链路历史参考

## 子任务页面说明

- `pages/tasks/recipe-dimensions.html`
  - 页面名称：Recipe Dimensions / 菜谱维度子任务页
  - 所属模块：阶段性工作产出
  - 主要承接内容：菜谱维度分层、字段标准、样例菜谱拆解
  - 适合分栏 / agent：菜谱维度分栏、字段设计分栏

- `pages/tasks/experience-rules.html`
  - 页面名称：Experience Rules / 经验规则子任务页
  - 所属模块：阶段性工作产出
  - 主要承接内容：经验规则条目模板、规则分类、规则示例
  - 适合分栏 / agent：经验规则分栏、规则库分栏

- `pages/tasks/research-interviews.html`
  - 页面名称：Research Inputs / 认知输入子任务页
  - 所属模块：阶段性工作产出
  - 主要承接内容：调研记录结构、认知输入分流、候选输出
  - 适合分栏 / agent：调研分栏、认知输入分栏

- `pages/tasks/sample-case-gongbao.html`
  - 页面名称：Gongbao Sample Case / 宫保鸡丁样板案例页
  - 所属模块：案例矩阵
  - 主要承接内容：北京口味宫保鸡丁案例链路、输入输出与降级逻辑
  - 适合分栏 / agent：样板案例分栏、案例矩阵分栏

- `pages/tasks/core-objects.html`
  - 页面名称：Core Objects / 核心对象页
  - 所属模块：技术交付
  - 主要承接内容：核心对象模型、字段骨架、对象关联
  - 适合分栏 / agent：核心对象分栏、对象建模分栏

- `pages/tasks/build-plan-board.html`
  - 页面名称：Build Plan Board / 建设计划板
  - 所属模块：进展计划
  - 主要承接内容：任务台账、甘特图、里程碑、计划推进
  - 适合分栏 / agent：主控分栏、计划推进分栏

## 当前说明

当前版本已重组为 `1 个主页面 + 7 个分页面 + 多个快照 / 归档页面`，覆盖项目定义、技术主链、技术交付、知识形成、案例矩阵、样板闭环与进展路线图。

旧页面内容已保留为归档入口，新页面统一用于内部讨论、讲解、截图与后续继续迭代。
