// Mock page data keeps the page local-only and easy to iterate on.
const fullChainNodes = [
  {
    id: "ingest",
    index: "01",
    title: "原始数据接入层",
    summary: "把业务数据、专家经验、现场记录和外部素材接入系统。",
    duty: "形成原材料池与待解析素材池。",
    input: "数据库、日志、视频、纪要、专家输入、外部参考资料。",
    output: "原始素材池、原始证据池、已登记数据源。",
  },
  {
    id: "structuring",
    index: "02",
    title: "结构化加工层",
    summary: "把不同来源、不同模态的素材映射进统一对象体系。",
    duty: "提取字段、标签、关系、时间线和证据链接。",
    input: "原始素材池。",
    output: "结构化记录、对象挂载结果、待沉淀候选。",
  },
  {
    id: "knowledge",
    index: "03",
    title: "知识沉淀层",
    summary: "把可复用经验提炼为知识资产。",
    duty: "筛选、归纳、验证规则、模式和模板。",
    input: "结构化记录、聚合结果。",
    output: "经验规则、失败模式、标杆菜谱、风险策略。",
  },
  {
    id: "retrieval",
    index: "04",
    title: "检索层",
    summary: "从数据库、知识库和向量库召回候选内容。",
    duty: "尽量找全与当前任务最相关的上下文。",
    input: "用户需求、结构化任务、查询条件。",
    output: "候选菜谱、候选案例、候选规则、命中来源。",
  },
  {
    id: "rules",
    index: "05",
    title: "规则与策略层",
    summary: "根据边界与风险对候选内容做过滤和收口。",
    duty: "决定当前任务可输出到什么程度。",
    input: "检索结果、设备、权限、知识状态、风险等级。",
    output: "可用候选范围、过滤原因、建议等级、审核要求。",
  },
  {
    id: "reasoning",
    index: "06",
    title: "模型推理层",
    summary: "在允许范围内做理解、比较、排序、解释与建议生成。",
    duty: "基于少量上下文生成建议，不替代规则层。",
    input: "规则筛后的候选、任务目标、必要业务约束。",
    output: "推荐结果、理由、参数建议、缺口识别。",
  },
  {
    id: "output",
    index: "07",
    title: "输出与后续动作",
    summary: "输出建议、补问、审核、转人工或知识建设队列。",
    duty: "把系统结果变成真实业务动作与回流。",
    input: "建议结果与风险等级。",
    output: "强建议、弱建议、补问、人工任务、建设任务。",
  },
];

const sourceGroups = [
  {
    title: "内部结构化业务数据",
    description: "已有明确字段与业务主键，是最容易直接进入对象体系的原始来源。",
    items: ["后台数据库", "菜谱表", "参数记录", "设备日志", "客户需求记录", "录菜结果记录"],
  },
  {
    title: "内部非结构化过程素材",
    description: "过程素材信息量大，但需要切片、转写、标签化后才能复用。",
    items: ["录菜视频", "操作录屏", "交付纪要", "现场照片", "聊天记录", "会议录音"],
  },
  {
    title: "专家经验输入",
    description: "专家判断往往最有价值，但必须被显性化与对象化。",
    items: ["口味工程师访谈", "技法讲解", "调参原因说明", "失败经验复盘", "经验总结文档"],
  },
  {
    title: "外部公开参考资料",
    description: "外部资料可补充视角，但必须进入内部规则与验证体系后才能引用。",
    items: ["小红书视频", "博客文章", "菜谱分享", "评论区讨论", "海外公开资料", "教材书籍"],
  },
  {
    title: "未来设备与传感数据",
    description: "未来会成为高价值证据源，但前提是稳定接入与标准化。",
    items: ["温度轨迹", "投料记录", "运动曲线", "称重变化", "摄像头采集", "执行状态数据"],
  },
];

const formationLayers = [
  {
    id: "layer-ingest",
    title: "原始数据接入层",
    summary: "把未来可能有价值的原始证据和原始素材，以可追踪、可登记、可管理的方式接进系统。",
    actions: ["数据接入", "素材上传", "来源登记", "元数据标记", "时间戳记录", "权限分类", "原始证据归档"],
    outputs: ["原始素材池", "原始证据池", "已登记数据源", "待解析素材队列"],
    examples: ["数据库中的菜谱记录接入", "交付纪要上传", "设备日志定时归档"],
  },
  {
    id: "layer-structuring",
    title: "结构化加工层",
    summary: "把不同来源、不同模态、不同粒度的素材解析并映射为统一对象体系。",
    actions: ["文本字段抽取", "音频转写", "视频切片", "图片标签提取", "步骤识别", "参数识别", "调整动作抽取", "对象映射"],
    outputs: ["对象化记录", "字段标签", "时间线", "证据链接", "待沉淀候选"],
    examples: ["从录菜视频识别工艺步骤", "从纪要中抽取调参原因", "把图片挂到设备上下文对象"],
  },
  {
    id: "layer-knowledge",
    title: "知识沉淀层",
    summary: "不是把所有结构化数据自动升华，而是筛选、归纳、验证出可复用知识。",
    actions: ["相似记录聚合", "规律归纳", "候选规则生成", "经验条目提炼", "失败模式聚类", "风险映射", "版本链留痕"],
    outputs: ["经验规则", "放量规则", "调参原因模板", "失败模式", "风险策略", "设备适配知识", "标杆菜谱"],
    examples: ["把相似宫保鸡丁案例沉淀为放量规则", "把失败原因归类为风险标签"],
  },
];

const knowledgeProducts = [
  {
    title: "统一对象体系",
    items: ["菜品", "菜谱版本", "工艺步骤", "参数项", "食材", "调味料", "调整动作", "调整原因", "风险标签", "设备上下文", "评价结果", "证据对象"],
  },
  {
    title: "知识产物类型",
    items: ["经验规则", "放量规则", "调参原因模板", "失败模式", "风险策略", "技法模板", "参数依赖关系", "设备适配知识", "标杆菜谱", "相似案例知识条目"],
  },
];

const scenarios = [
  {
    id: "rich",
    name: "场景 A：数据充分",
    shortName: "数据充分",
    definition: "内部已有大量高质量、已验证、强相关菜谱、案例、规则和历史记录。",
    dataStrength: 5,
    inputClarity: 4,
    waterfall: [
      {
        title: "原始输入",
        summary: "输入需求较明确，系统有足够内部资产支撑逐层收口。",
        input: "北京口味 + 宫保鸡丁 + 当前设备上下文",
        output: "标准化任务描述与检索条件",
        actions: "解析菜品、风味、设备、任务目标",
        limit: "设备型号缺失时仍会补充追问。",
        tags: ["输入解析", "任务标准化"],
      },
      {
        title: "原始数据接入层",
        summary: "已有大量内部菜谱、日志、案例、专家记录，可直接命中高相关素材池。",
        input: "数据库、日志、专家经验、历史交付案例",
        output: "高相关原始素材集合",
        actions: "直接登记并拉起相关素材上下文",
        limit: "重点风险在于素材过多，需要后续层缩圈。",
        tags: ["素材充足", "高相关命中"],
      },
      {
        title: "结构化加工层",
        summary: "相关菜谱、案例、参数、原因、风险标签已经有成熟结构化结果。",
        input: "高相关素材集合",
        output: "完整对象挂载结果",
        actions: "直接调用已有结构化结果并补齐小缺口",
        limit: "新版本差异仍需比对。",
        tags: ["对象完整", "字段成熟"],
      },
      {
        title: "知识沉淀层",
        summary: "已有已验证规则、标杆菜谱和相似案例知识条目，可直接作为决策基础。",
        input: "对象挂载结果与已验证知识",
        output: "高可信知识资产包",
        actions: "命中标杆菜谱、放量规则、设备适配知识",
        limit: "仅高风险规则继续要求人工确认。",
        tags: ["已验证知识", "标杆命中"],
      },
      {
        title: "检索层",
        summary: "能召回大量宫保鸡丁相关版本、北京风味标签、历史客户案例和设备适配规则。",
        input: "任务条件、知识资产包",
        output: "高质量候选集合",
        actions: "宽召回后形成强候选池",
        limit: "候选数量多，需要规则层进一步裁边界。",
        tags: ["召回", "相似搜索", "规则命中"],
      },
      {
        title: "规则与策略层",
        summary: "过滤未验证、失效、不适配设备的版本，并判断当前可进入强建议模式。",
        input: "高质量候选集合、设备约束、风险等级",
        output: "可执行候选范围",
        actions: "过滤失效版本、保留低风险候选",
        limit: "高风险候选仍需人工确认。",
        tags: ["过滤", "边界控制", "风险控制"],
      },
      {
        title: "模型推理层",
        summary: "对少量候选进行排序，解释北京口味路径，并给出推荐理由与参数建议。",
        input: "规则筛后的少量候选",
        output: "推荐版本、理由、参数建议",
        actions: "比较候选差异、生成解释、给出建议",
        limit: "不替代规则层决定是否自动下发。",
        tags: ["排序", "解释", "参数建议"],
      },
      {
        title: "最终输出层",
        summary: "输出 2 到 3 个高质量候选版本，并给出推荐理由、风险提示和初始参数建议。",
        input: "推荐结果与风险判断",
        output: "强建议结果包",
        actions: "形成推荐结果、提示风险、附参数",
        limit: "涉及风险阈值时仍保留人工确认。",
        tags: ["强支持", "候选输出", "风险提示"],
      },
      {
        title: "后续动作层",
        summary: "可进入人工确认、设备侧辅助交付，并回写本次结果。",
        input: "强建议结果包",
        output: "交付动作与回流记录",
        actions: "人工确认、辅助交付、结果回写",
        limit: "执行后仍需质量跟踪。",
        tags: ["回流", "辅助交付", "持续修正"],
      },
    ],
    capabilities: {
      "原始素材可用度": "强支持",
      "结构化对象完整度": "强支持",
      "已验证知识可用度": "强支持",
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
    failureModes: [
      { title: "补问", items: ["设备型号缺失时补问设备信息", "份量不清时补问试菜规模"] },
      { title: "弱建议", items: ["高风险版本不直接下发", "保留备选方案而不是唯一答案"] },
      { title: "转人工", items: ["涉及特殊设备限制时转人工确认"] },
      { title: "进入知识建设队列", items: ["仅在出现新异常现象时进入队列"] },
    ],
  },
  {
    id: "medium",
    name: "场景 B：数据一般",
    shortName: "数据一般",
    definition: "有一定量相关数据，但精度和覆盖不足，能支持初步建议，但不能稳定给强结论。",
    dataStrength: 3,
    inputClarity: 4,
    waterfall: [
      {
        title: "原始输入",
        summary: "需求可理解，但关键风味标签与历史映射不完全稳定。",
        input: "北京口味 + 宫保鸡丁",
        output: "可检索任务描述",
        actions: "解析任务并准备召回条件",
        limit: "风味表达仍存在语义不确定性。",
        tags: ["输入解析", "任务标准化"],
      },
      {
        title: "原始数据接入层",
        summary: "有一定量内部素材，但覆盖不全，部分依赖外部参考和专家输入补充。",
        input: "内部数据库 + 部分专家输入 + 外部参考",
        output: "中等规模素材集合",
        actions: "汇总内部素材并补接外部参考",
        limit: "素材覆盖不完整。",
        tags: ["素材一般", "部分补充"],
      },
      {
        title: "结构化加工层",
        summary: "已有一部分结构化结果，但风味标签、调参原因、设备适配信息不够稳定。",
        input: "中等规模素材集合",
        output: "部分结构化对象",
        actions: "复用已有字段并补齐薄弱对象",
        limit: "对象完整度一般。",
        tags: ["部分结构化", "标签不稳"],
      },
      {
        title: "知识沉淀层",
        summary: "有少量已验证知识，大量内容仍处于候选或待验证状态。",
        input: "部分结构化对象",
        output: "有限可用知识 + 大量候选知识",
        actions: "命中少量规则、标杆菜谱与相似案例",
        limit: "无法作为强决策依据。",
        tags: ["候选偏多", "验证不足"],
      },
      {
        title: "检索层",
        summary: "有一定量相关菜谱和案例，但北京风味标签不稳定，相似案例可用但直接命中较少。",
        input: "任务条件与有限知识",
        output: "部分可信候选",
        actions: "召回相似案例与弱命中规则",
        limit: "候选质量参差不齐。",
        tags: ["部分召回", "弱命中"],
      },
      {
        title: "规则与策略层",
        summary: "只能保留部分可信候选，某些高风险版本不能继续，输出层级受限。",
        input: "部分可信候选、设备约束、风险等级",
        output: "受限候选范围",
        actions: "过滤高风险候选、保留参考级结果",
        limit: "无法进入直接执行级输出。",
        tags: ["过滤", "收口", "风险限制"],
      },
      {
        title: "模型推理层",
        summary: "可以给推荐候选和理由，但需要补问更多信息来进一步缩圈。",
        input: "规则筛后的少量候选",
        output: "参考候选与补问信息",
        actions: "排序、解释、补问缩圈",
        limit: "参数建议只能给弱建议。",
        tags: ["排序", "解释", "补问"],
      },
      {
        title: "最终输出层",
        summary: "给 2 到 4 个参考候选，属于建议级结果，而不是直接执行级输出。",
        input: "推荐候选与补问信息",
        output: "建议级结果",
        actions: "输出候选、理由和需确认项",
        limit: "必须人工确认。",
        tags: ["建议级", "需审核"],
      },
      {
        title: "后续动作层",
        summary: "优先触发补问，并进入口味工程师审核。",
        input: "建议级结果",
        output: "补问任务、审核任务",
        actions: "追问、人工确认、回写结果",
        limit: "未确认前不进入设备执行。",
        tags: ["补问", "转人工"],
      },
    ],
    capabilities: {
      "原始素材可用度": "中支持",
      "结构化对象完整度": "中支持",
      "已验证知识可用度": "弱支持",
      "候选菜谱输出": "强支持",
      推荐排序: "中支持",
      推荐理由: "中支持",
      参数建议: "仅参考",
      风险提示: "强支持",
      自动下发能力: "不支持",
      是否需要补问: "强支持",
      是否需要人工审核: "强支持",
      是否转人工: "中支持",
      是否进入知识建设队列: "仅参考",
    },
    failureModes: [
      { title: "补问", items: ["偏甜还是偏辣", "单份试菜还是大份交付"] },
      { title: "弱建议", items: ["只给建议级候选", "参数建议不直接作为执行包"] },
      { title: "转人工", items: ["默认进入口味工程师审核"] },
      { title: "进入知识建设队列", items: ["反复命中薄弱场景时标记为待沉淀"] },
    ],
  },
  {
    id: "scattered",
    name: "场景 C：数据零散",
    shortName: "数据零散",
    definition: "内部只有零散案例、片段经验、少量规则，缺乏成体系的直接支撑。",
    dataStrength: 2,
    inputClarity: 4,
    waterfall: [
      {
        title: "原始输入",
        summary: "输入可理解，但内部缺少成体系可直接支撑的知识。",
        input: "北京口味 + 宫保鸡丁",
        output: "宽泛任务描述",
        actions: "解析需求，识别当前是弱知识场景",
        limit: "系统不能直接假设已有高质量答案。",
        tags: ["输入解析", "宽问题"],
      },
      {
        title: "原始数据接入层",
        summary: "内部素材碎片化，专家经验和外部参考资料多，但不成体系。",
        input: "碎片化内部素材 + 专家经验 + 外部参考",
        output: "弱关联素材池",
        actions: "先把零散素材接进来并登记来源",
        limit: "高价值证据分散，难以直接聚合。",
        tags: ["碎片素材", "来源多"],
      },
      {
        title: "结构化加工层",
        summary: "只有零散对象挂载，很多信息还是半结构化或弱标签状态。",
        input: "弱关联素材池",
        output: "片段化结构化对象",
        actions: "抽取少量字段和片段标签",
        limit: "对象完整度低，证据链薄弱。",
        tags: ["弱标签", "半结构化"],
      },
      {
        title: "知识沉淀层",
        summary: "只有片段经验、片段规则和少量失败模式，缺乏成体系可直接决策的知识。",
        input: "片段化结构化对象",
        output: "片段知识条目",
        actions: "聚合零散经验、形成候选规则",
        limit: "还不能形成强决策知识。",
        tags: ["片段经验", "少量规则"],
      },
      {
        title: "检索层",
        summary: "只找到零散相似菜、片段规则或片段经验，直接匹配菜谱很少。",
        input: "任务描述与片段知识条目",
        output: "片段案例、弱命中结果",
        actions: "召回弱相关内容与相似案例",
        limit: "精确命中很弱，无法支撑强结论。",
        tags: ["弱召回", "片段经验"],
      },
      {
        title: "规则与策略层",
        summary: "明显限制系统输出强度，禁止直接下发参数包，只保留参考级候选。",
        input: "弱命中结果、风险等级",
        output: "参考级候选、禁止下发标记",
        actions: "显式降低结果等级，开启失败保护",
        limit: "不允许进入强建议模式。",
        tags: ["限制输出", "风险兜底"],
      },
      {
        title: "模型推理层",
        summary: "主要负责需求解释、相似案例归纳与缺失知识识别。",
        input: "零散候选与片段规则",
        output: "弱建议、缺失项、补充采集建议",
        actions: "做相似归纳、列缺口，不装作很确定",
        limit: "不生成可执行参数包。",
        tags: ["归纳", "缺口识别", "弱建议"],
      },
      {
        title: "最终输出层",
        summary: "输出相似案例参考、当前缺失信息以及建议补采的数据项。",
        input: "弱建议与缺失项",
        output: "参考案例 + 缺失清单",
        actions: "给参考、给限制、给下一步采集建议",
        limit: "不支持自动下发和强参数建议。",
        tags: ["仅参考", "缺失提示"],
      },
      {
        title: "后续动作层",
        summary: "转人工、进入知识补全任务，并标记为待沉淀场景。",
        input: "参考案例 + 缺失清单",
        output: "人工任务、知识补全任务",
        actions: "转人工、补语料、补规则验证",
        limit: "系统本轮只承担解释与引导角色。",
        tags: ["转人工", "知识补全"],
      },
    ],
    capabilities: {
      "原始素材可用度": "中支持",
      "结构化对象完整度": "弱支持",
      "已验证知识可用度": "仅参考",
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
    failureModes: [
      { title: "补问", items: ["补问口味偏向", "补问设备型号", "补问交付目标"] },
      { title: "弱建议", items: ["只给相似案例参考", "不输出参数包"] },
      { title: "转人工", items: ["需口味工程师介入", "需业务验证"] },
      { title: "进入知识建设队列", items: ["需新增语料", "需新增案例", "需补规则验证"] },
    ],
  },
  {
    id: "missing",
    name: "场景 D：数据缺失",
    shortName: "数据缺失",
    definition: "当前任务几乎没有内部相关资产，检索结果极弱甚至为空。",
    dataStrength: 1,
    inputClarity: 4,
    waterfall: [
      {
        title: "原始输入",
        summary: "输入可被解析，但内部几乎没有可利用的相关知识资产。",
        input: "北京口味 + 宫保鸡丁",
        output: "任务解析与关键字段抽取",
        actions: "识别任务意图、提取关键字段",
        limit: "系统只能先判断缺什么，不能装作知道答案。",
        tags: ["输入解析", "缺口识别"],
      },
      {
        title: "原始数据接入层",
        summary: "当前任务几乎没有相关内部素材，可能只有原始输入本身。",
        input: "用户输入本身",
        output: "最小原始素材记录",
        actions: "登记当前任务、准备后续采集需求",
        limit: "没有现成素材池可调用。",
        tags: ["素材缺失", "仅任务本身"],
      },
      {
        title: "结构化加工层",
        summary: "只能先做输入解析和任务对象初始化，几乎无可用结构化支撑。",
        input: "最小原始素材记录",
        output: "初始任务对象",
        actions: "抽取需求字段、建立最小任务结构",
        limit: "无法形成可复用对象集。",
        tags: ["任务初始化", "结构支撑弱"],
      },
      {
        title: "知识沉淀层",
        summary: "当前无足够已知知识可调用，无法形成有效知识命中。",
        input: "初始任务对象",
        output: "缺口识别结果",
        actions: "判断当前知识缺失范围",
        limit: "无法生成有效知识条目。",
        tags: ["知识缺失", "无命中"],
      },
      {
        title: "检索层",
        summary: "精确检索为空或几乎为空，相似检索命中极弱或为空。",
        input: "任务描述、初始任务对象",
        output: "空结果或极弱命中",
        actions: "尝试精确和相似检索",
        limit: "无法形成候选集合。",
        tags: ["空检索", "弱相似"],
      },
      {
        title: "规则与策略层",
        summary: "直接限制进入强建议模式，不允许自动生成可执行菜谱或高置信结论。",
        input: "空结果、风险等级、任务类型",
        output: "强限制标记、需人工处理标记",
        actions: "截断强建议链路、转入失败保护模式",
        limit: "任何强结论都会被截断。",
        tags: ["禁止强建议", "高风险限制"],
      },
      {
        title: "模型推理层",
        summary: "仍可做输入解析、缺口识别和下一步引导，但不提供强建议。",
        input: "任务解析、空结果",
        output: "缺什么信息、需要什么后续动作",
        actions: "做缺口识别、生成下一步引导",
        limit: "不做可执行建议输出。",
        tags: ["缺口识别", "引导"],
      },
      {
        title: "最终输出层",
        summary: "明确提示当前无足够内部知识支持，只给下一步引导。",
        input: "缺口识别结果",
        output: "弱结果 + 引导动作",
        actions: "提示知识不足、给出下一步采集方向",
        limit: "不能给强建议或参数包。",
        tags: ["不支持", "需转人工"],
      },
      {
        title: "后续动作层",
        summary: "转人工处理、新增数据采集、新增菜谱建设并进入知识建设队列。",
        input: "弱结果 + 引导动作",
        output: "人工任务、采集任务、建设任务",
        actions: "转人工、补数、建知识",
        limit: "系统此轮不承担建议输出。",
        tags: ["转人工", "新增采集", "知识建设"],
      },
    ],
    capabilities: {
      "原始素材可用度": "弱支持",
      "结构化对象完整度": "不支持",
      "已验证知识可用度": "不支持",
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
    failureModes: [
      { title: "补问", items: ["补问设备型号", "补问目标口味描述", "补问交付场景"] },
      { title: "弱建议", items: ["仅给下一步引导", "不生成任何参数包"] },
      { title: "转人工", items: ["直接转口味工程师或业务确认"] },
      { title: "进入知识建设队列", items: ["新增数据采集", "新增菜谱建设", "新增知识条目"] },
    ],
  },
  {
    id: "wide-rich",
    name: "场景 E：输入模糊但数据丰富",
    shortName: "输入模糊但数据丰富",
    definition: "用户只给粗需求，系统有大量相关资产，需要依靠逐层缩圈来收敛输出。",
    dataStrength: 5,
    inputClarity: 2,
    waterfall: [
      {
        title: "原始输入",
        summary: "输入很宽，但系统有足够资产支持逐层缩圈，而不是一步强行给唯一答案。",
        input: "我要一个北京口味的宫保鸡丁",
        output: "宽需求描述",
        actions: "解析菜品、风味、目标，但保留模糊性",
        limit: "用户没有提供份量、设备等关键条件。",
        tags: ["模糊输入", "宽问题"],
      },
      {
        title: "原始数据接入层",
        summary: "相关原始素材和历史数据很丰富，可以快速命中大量相关证据源。",
        input: "数据库、日志、专家经验、历史案例、外部参考",
        output: "宽素材集合",
        actions: "聚合大范围相关素材",
        limit: "素材过多，必须后续层逐层收口。",
        tags: ["素材丰富", "宽召回素材"],
      },
      {
        title: "结构化加工层",
        summary: "大量相关对象已经完成结构化挂载，能快速形成可比较的对象集合。",
        input: "宽素材集合",
        output: "可比较的结构化对象集",
        actions: "调用已有结构化结果并补足少量缺口",
        limit: "对象虽然多，但仍需场景过滤。",
        tags: ["对象成熟", "结构化充分"],
      },
      {
        title: "知识沉淀层",
        summary: "已有成熟的风味标签、案例知识、规则和失败模式，为逐层缩圈提供知识底座。",
        input: "结构化对象集",
        output: "可用于缩圈的知识资产包",
        actions: "命中风味标签、相似案例、失败模式",
        limit: "仍不能跳过关键条件直接下发。",
        tags: ["风味标签", "案例知识", "失败模式"],
      },
      {
        title: "检索层",
        summary: "宽召回大量候选，不追求一步唯一命中。",
        input: "模糊需求 + 大量知识资产",
        output: "宽候选集合",
        actions: "把所有相关候选尽量找全",
        limit: "候选范围很宽，必须交给规则层缩圈。",
        tags: ["宽召回", "不漏相关内容"],
      },
      {
        title: "规则与策略层",
        summary: "基于设备、状态、权限和场景先做硬过滤，显著缩小候选范围。",
        input: "宽候选集合、设备约束、知识状态",
        output: "小范围可用候选、需补问项",
        actions: "先做硬过滤，再定义当前可输出等级",
        limit: "若关键条件仍缺失，则保留补问要求。",
        tags: ["硬过滤", "缩圈", "场景收口"],
      },
      {
        title: "模型推理层",
        summary: "结合模糊语义进一步收敛、排序，并决定是直接推荐还是继续补问。",
        input: "规则筛后的候选与关键约束",
        output: "推荐 + 追问 或 小范围候选",
        actions: "理解模糊需求、排序候选、识别关键缺口",
        limit: "不能在条件缺失时强行给唯一答案。",
        tags: ["语义收敛", "排序", "补问决策"],
      },
      {
        title: "最终输出层",
        summary: "给小范围候选，或给推荐 + 追问，而不是装作已经有唯一结论。",
        input: "模型收敛结果",
        output: "候选列表、推荐理由、追问",
        actions: "输出候选范围并标记下一步所需信息",
        limit: "输出强度取决于补问是否完成。",
        tags: ["小范围输出", "推荐+追问"],
      },
      {
        title: "后续动作层",
        summary: "根据补问结果进入强建议模式，或转人工继续确认。",
        input: "候选列表 + 追问信息",
        output: "继续追问、人工确认、设备辅助交付",
        actions: "逐层收口并决定进入下一条动作链",
        limit: "不会跳过关键条件直接下发。",
        tags: ["逐层收口", "继续确认"],
      },
    ],
    capabilities: {
      "原始素材可用度": "强支持",
      "结构化对象完整度": "强支持",
      "已验证知识可用度": "强支持",
      "候选菜谱输出": "强支持",
      推荐排序: "中支持",
      推荐理由: "强支持",
      参数建议: "弱支持",
      风险提示: "强支持",
      自动下发能力: "仅参考",
      是否需要补问: "强支持",
      是否需要人工审核: "弱支持",
      是否转人工: "仅参考",
      是否进入知识建设队列: "不支持",
    },
    failureModes: [
      { title: "补问", items: ["偏甜还是偏辣", "单份试菜还是大份交付", "当前设备型号是什么"] },
      { title: "弱建议", items: ["给小范围候选而不强行唯一输出", "参数建议先作为参考"] },
      { title: "转人工", items: ["补问后仍无法收敛时转人工"] },
      { title: "进入知识建设队列", items: ["仅在发现新场景缺口时进入队列"] },
    ],
  },
];

const matrixRows = [
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

let activeScenarioId = "wide-rich";
let activeChainNodeId = fullChainNodes[0].id;

const fullChainEl = document.querySelector("#fullChain");
const chainDetailEl = document.querySelector("#chainDetail");
const sourcePoolEl = document.querySelector("#sourcePool");
const formationLayersEl = document.querySelector("#formationLayers");
const knowledgeProductsEl = document.querySelector("#knowledgeProducts");
const scenarioTabsEl = document.querySelector("#scenarioTabs");
const caseWaterfallEl = document.querySelector("#caseWaterfall");
const capabilityMatrixEl = document.querySelector("#capabilityMatrix");
const failureFlowEl = document.querySelector("#failureFlow");
const scenarioSummaryEl = document.querySelector("#scenarioSummary");

function getScenario(id) {
  return scenarios.find((scenario) => scenario.id === id) || scenarios[0];
}

function renderFullChain() {
  fullChainEl.innerHTML = `
    <div class="full-chain-track">
      ${fullChainNodes
        .map((node, index) => {
          const arrow = index < fullChainNodes.length - 1 ? '<div class="definition-rail-arrow">→</div>' : "";
          return `
            <div class="chain-node-card ${node.id === activeChainNodeId ? "is-active" : ""}" data-chain-id="${node.id}">
              <span class="node-index">${node.index}</span>
              <strong>${node.title}</strong>
              <p>${node.summary}</p>
            </div>
            ${arrow}
          `;
        })
        .join("")}
    </div>
  `;

  const activeNode = fullChainNodes.find((node) => node.id === activeChainNodeId) || fullChainNodes[0];
  chainDetailEl.innerHTML = `
    <h3>${activeNode.title}</h3>
    <div class="chain-detail-grid">
      <div class="chain-detail-item">
        <strong>职责</strong>
        <span>${activeNode.duty}</span>
      </div>
      <div class="chain-detail-item">
        <strong>输入</strong>
        <span>${activeNode.input}</span>
      </div>
      <div class="chain-detail-item">
        <strong>输出</strong>
        <span>${activeNode.output}</span>
      </div>
    </div>
  `;

  fullChainEl.querySelectorAll(".chain-node-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeChainNodeId = card.dataset.chainId || fullChainNodes[0].id;
      renderFullChain();
    });
  });
}

function renderSourcePool() {
  sourcePoolEl.innerHTML = sourceGroups
    .map(
      (group) => `
        <details class="source-group">
          <summary>${group.title}</summary>
          <p>${group.description}</p>
          <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </details>
      `
    )
    .join("");
}

function renderFormationLayers() {
  formationLayersEl.innerHTML = formationLayers
    .map(
      (layer, index) => `
        <article class="formation-layer ${index === 0 ? "is-open" : ""}" data-layer-id="${layer.id}">
          <div class="formation-layer-head">
            <div>
              <span class="node-label">前三层链路</span>
              <h3>${layer.title}</h3>
            </div>
            <span class="status-chip chip-strong">点击展开</span>
          </div>
          <p>${layer.summary}</p>
          <div class="formation-detail" ${index === 0 ? "" : "hidden"}>
            <div class="formation-detail-grid">
              <div class="formation-detail-box">
                <strong>处理动作</strong>
                <ul>${layer.actions.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
              <div class="formation-detail-box">
                <strong>输出结果</strong>
                <ul>${layer.outputs.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
              <div class="formation-detail-box">
                <strong>典型例子</strong>
                <ul>${layer.examples.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  formationLayersEl.querySelectorAll(".formation-layer").forEach((item) => {
    item.addEventListener("click", () => {
      const detail = item.querySelector(".formation-detail");
      const shouldOpen = detail.hasAttribute("hidden");
      detail.toggleAttribute("hidden", !shouldOpen);
      item.classList.toggle("is-open", shouldOpen);
    });
  });
}

function renderKnowledgeProducts() {
  knowledgeProductsEl.innerHTML = knowledgeProducts
    .map(
      (group) => `
        <div class="product-group">
          <strong>${group.title}</strong>
          <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      `
    )
    .join("");
}

function buildMeter(level) {
  return Array.from({ length: 5 }, (_, index) => `<span class="${index < level ? "is-on" : ""}"></span>`).join("");
}

function renderScenarioTabs() {
  scenarioTabsEl.innerHTML = scenarios
    .map(
      (scenario) => `
        <button class="scenario-tab ${scenario.id === activeScenarioId ? "is-active" : ""}" data-scenario-id="${scenario.id}" type="button">
          <h3>${scenario.name}</h3>
          <p>${scenario.definition}</p>
          <div class="dual-meter">
            <div class="meter-row">
              <span class="meter-label">数据强度</span>
              <div class="meter-bar">${buildMeter(scenario.dataStrength)}</div>
            </div>
            <div class="meter-row">
              <span class="meter-label">输入清晰度</span>
              <div class="meter-bar">${buildMeter(scenario.inputClarity)}</div>
            </div>
          </div>
        </button>
      `
    )
    .join("");

  scenarioTabsEl.querySelectorAll(".scenario-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeScenarioId = button.dataset.scenarioId || scenarios[0].id;
      renderScenarioTabs();
      renderScenarioDrivenSections();
    });
  });
}

function renderScenarioSummary(scenario) {
  scenarioSummaryEl.innerHTML = `
    <div class="summary-item">
      <strong>当前场景</strong>
      <span>${scenario.name}</span>
    </div>
    <div class="summary-item">
      <strong>数据状态</strong>
      <span>${scenario.definition}</span>
    </div>
    <div class="summary-item">
      <strong>系统结论</strong>
      <span>${scenario.capabilities["候选菜谱输出"]} / ${scenario.capabilities["自动下发能力"]}</span>
    </div>
  `;
}

function renderWaterfall(scenario) {
  caseWaterfallEl.innerHTML = `
    <div class="case-step-list">
      ${scenario.waterfall
        .map(
          (step, index) => `
            <article class="case-step ${index === 0 ? "is-open" : ""}" data-step-index="${index}">
              <h3>${step.title}</h3>
              <div class="case-step-summary">${step.summary}</div>
              <div class="case-step-detail" ${index === 0 ? "" : "hidden"}>
                <div class="case-step-meta">
                  <div class="case-step-box">
                    <strong>输入</strong>
                    <span>${step.input}</span>
                  </div>
                  <div class="case-step-box">
                    <strong>处理动作</strong>
                    <span>${step.actions}</span>
                  </div>
                  <div class="case-step-box">
                    <strong>输出</strong>
                    <span>${step.output}</span>
                  </div>
                  <div class="case-step-box">
                    <strong>限制 / 风险</strong>
                    <span>${step.limit}</span>
                  </div>
                </div>
              </div>
              <div class="case-step-tags">
                ${step.tags
                  .map((tag, tagIndex) => {
                    const chipClasses = ["chip-strong", "chip-medium", "chip-weak", "chip-limit"];
                    return `<span class="status-chip ${chipClasses[tagIndex % chipClasses.length]}">${tag}</span>`;
                  })
                  .join("")}
              </div>
            </article>
            ${index < scenario.waterfall.length - 1 ? '<div class="definition-rail-arrow">↓</div>' : ""}
          `
        )
        .join("")}
    </div>
  `;

  caseWaterfallEl.querySelectorAll(".case-step").forEach((item) => {
    item.addEventListener("click", () => {
      const detail = item.querySelector(".case-step-detail");
      const shouldOpen = detail.hasAttribute("hidden");
      detail.toggleAttribute("hidden", !shouldOpen);
      item.classList.toggle("is-open", shouldOpen);
    });
  });
}

function renderCapabilityMatrix() {
  const header = `
    <div class="matrix-row">
      <div class="matrix-head">输出能力 / 成熟度</div>
      ${scenarios
        .map((scenario) => `<div class="matrix-head ${scenario.id === activeScenarioId ? "is-active" : ""}">${scenario.shortName}</div>`)
        .join("")}
    </div>
  `;

  const rows = matrixRows
    .map(
      (row) => `
        <div class="matrix-row">
          <div class="matrix-head">${row}</div>
          ${scenarios
            .map((scenario) => `<div class="matrix-cell ${scenario.id === activeScenarioId ? "is-active" : ""}">${scenario.capabilities[row]}</div>`)
            .join("")}
        </div>
      `
    )
    .join("");

  capabilityMatrixEl.innerHTML = header + rows;
}

function renderFailureFlow(scenario) {
  failureFlowEl.innerHTML = scenario.failureModes
    .map(
      (item) => `
        <article class="failure-card">
          <h3>${item.title}</h3>
          <ul>${item.items.map((text) => `<li>${text}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
}

function renderScenarioDrivenSections() {
  const scenario = getScenario(activeScenarioId);
  renderScenarioSummary(scenario);
  renderWaterfall(scenario);
  renderCapabilityMatrix();
  renderFailureFlow(scenario);
}

renderFullChain();
renderSourcePool();
renderFormationLayers();
renderKnowledgeProducts();
renderScenarioTabs();
renderScenarioDrivenSections();
