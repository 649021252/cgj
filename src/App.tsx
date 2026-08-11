import { useEffect, useMemo, useState } from "react";

type Project = {
  id: number;
  title: string;
  short: string;
  category: string;
  type: string;
  icon: string;
  color: string;
  price: string;
  cycle: string;
  description: string;
  overview: string;
  tags: string[];
  highlights: string[];
  metrics: [string, string][];
  featured?: boolean;
};

const projects: Project[] = [
  { id: 1, title: "摊趣云·地摊租售平台", short: "摊趣云", category: "租赁经济", type: "用户小程序", icon: "🛍️", color: "amber", price: "¥1.68万起", cycle: "最快3周", featured: true, description: "场地、设备、商品与玩具租赁一体化，支持移动租借车定点停靠与异地归还。", overview: "围绕城市灵活经营与闲置资源流通，打通场地方、设备方、商家和消费者，形成发布、预订、履约、归还、结算、信用评价的完整业务闭环。", tags: ["移动租借", "信用体系", "智能调度"], highlights: ["多品类租赁与组合套餐", "移动借还车时段及站点管理", "押金、租金与超时费用自动结算", "商家、用户、运营平台三端协同"], metrics: [["服务终端", "3端"], ["核心流程", "12+"], ["业务状态", "全闭环"]] },
  { id: 2, title: "星桌云·台球数字经营系统", short: "星桌云", category: "运动娱乐", type: "用户小程序", icon: "🎱", color: "green", price: "¥1.58万起", cycle: "最快3周", featured: true, description: "打通订台、开台计费、陪练约局、赛事会员、商品零售与门店经营完整链路。", overview: "面向台球俱乐部打造线上获客、到店消费、会员运营和经营分析一体化平台，提升球桌周转率与复购率。", tags: ["桌台预约", "实时计费", "赛事运营"], highlights: ["可视化桌台状态与预约排期", "灵活计费规则及智能结算", "陪练、教练、赛事与拼场运营", "多门店会员及经营数据看板"], metrics: [["经营场景", "8类"], ["计费模式", "6种"], ["数据报表", "20+"]] },
  { id: 3, title: "戎邻生活·退役军人社区服务平台", short: "戎邻生活", category: "社区服务", type: "社区小程序", icon: "🏘️", color: "blue", price: "¥1.98万起", cycle: "最快4周", featured: true, description: "以退役军人身份服务为核心，融合社区活动、政策服务、便民商业与多角色共建。", overview: "链接退役军人、社区、商户与政府服务资源，通过身份认证、政策触达、活动运营和权益服务构建有温度的数字社区。", tags: ["身份认证", "社区共建", "政策服务"], highlights: ["游客、军人、商户、政府多角色体系", "政策精准触达与服务预约", "社区活动发布、报名与核销", "公益互助和便民服务聚合"], metrics: [["用户角色", "4类"], ["服务场景", "30+"], ["活动闭环", "100%"]] },
  { id: 4, title: "搭界·组局活动系统", short: "搭界", category: "社交活动", type: "用户小程序", icon: "👥", color: "pink", price: "¥8,800起", cycle: "最快2周", description: "覆盖搭子、活动组局、主理人运营、报名支付、现场核销、评价沉淀与安全治理。", overview: "为兴趣社交和本地活动提供低门槛发起、高效率匹配和可信履约能力，服务普通用户、主理人与平台运营方。", tags: ["兴趣组局", "报名核销", "安全治理"], highlights: ["多维兴趣标签与同城推荐", "主理人工作台和活动模板", "报名候补、退款与现场核销", "信用分、举报与风险预警"], metrics: [["活动类型", "18+"], ["履约节点", "9个"], ["角色终端", "3端"]] },
  { id: 5, title: "芯循宝·数码回收服务平台", short: "芯循宝", category: "循环经济", type: "用户端", icon: "♻️", color: "teal", price: "¥1.68万起", cycle: "最快3周", description: "聚焦内存条与硬盘回收，通过智能估价、寄送质检、数据擦除证明和全程追溯建立信任。", overview: "针对数码回收价格不透明、隐私风险和质检争议，构建标准化估价、检测、履约与环保去向追踪体系。", tags: ["智能估价", "质检追溯", "隐私擦除"], highlights: ["型号识别与动态回收报价", "上门、邮寄和门店多渠道履约", "标准化检测报告及争议处理", "数据擦除证书与环保溯源"], metrics: [["估价维度", "20+"], ["质检项", "32项"], ["履约可追溯", "全程"]] },
  { id: 6, title: "寰智引擎·实体产业AI增长平台", short: "寰智引擎", category: "AI增长", type: "PC工作台", icon: "🧬", color: "violet", price: "¥3.98万起", cycle: "最快5周", featured: true, description: "连接企业知识、营销内容、客户线索与Agent执行，形成可复制的实体产业智能增长闭环。", overview: "把企业沉淀的产品、客户和行业知识转化为可执行的AI能力，贯通洞察、内容、获客、跟进与复盘。", tags: ["Agent中台", "内容增长", "线索运营"], highlights: ["企业知识资产统一治理", "多Agent协同生成营销内容", "客户线索画像与智能跟进", "增长数据归因和策略优化"], metrics: [["Agent角色", "8类"], ["增长链路", "全闭环"], ["内容提效", "5×"]] },
  { id: 7, title: "闪送运动·运动服务平台", short: "闪送运动", category: "运动健康", type: "微信小程序", icon: "🏃", color: "cyan", price: "¥1.28万起", cycle: "最快3周", description: "连接运动用户、教练与场馆，提供课程预约、活动报名、运动搭子、训练记录和会员成长服务。", overview: "面向大众运动服务，将找场馆、找教练、找活动与个人训练成长统一在一个轻量化服务入口中。", tags: ["课程预约", "运动搭子", "训练成长"], highlights: ["附近场馆、课程和教练聚合", "活动组队、报名及签到", "训练计划与成长数据记录", "会员等级、积分与权益运营"], metrics: [["运动品类", "15+"], ["用户旅程", "完整"], ["运营工具", "12个"]] },
  { id: 8, title: "安筑家·可信家装服务平台", short: "安筑家", category: "产业服务", type: "业主端", icon: "🏠", color: "orange", price: "¥2.98万起", cycle: "最快5周", description: "以资金托管、节点验收、材料透明和全程留痕，解决家装信任与资金安全问题。", overview: "重构传统家装签约和履约方式，让业主、设计师、工长、材料商和平台围绕统一项目计划透明协作。", tags: ["施工进度", "资金托管", "材料透明"], highlights: ["预算、合同和变更统一管理", "里程碑验收后分阶段付款", "材料清单、批次与质保留痕", "施工现场影像及问题闭环"], metrics: [["施工节点", "16个"], ["资金安全", "托管"], ["服务角色", "5类"]] },
  { id: 9, title: "工业设备云管平台", short: "设备云", category: "产业服务", type: "PC平台", icon: "🏭", color: "slate", price: "¥3.98万起", cycle: "最快5周", description: "覆盖设备接入、资产管理、远程运维、告警联动与数据驾驶舱的工业互联网底座。", overview: "以设备全生命周期为主线，连接现场设备、边缘网关和云端业务，为生产运营和售后服务提供实时数据支撑。", tags: ["设备监控", "远程运维", "告警联动"], highlights: ["MQTT、OPC UA、Modbus协议接入", "设备影子与远程控制", "规则引擎和多级告警闭环", "资产、工单和能效数据看板"], metrics: [["设备协议", "6+"], ["接入规模", "万级"], ["告警响应", "秒级"]] },
  { id: 10, title: "微信商城与会员中台", short: "会员中台", category: "零售商业", type: "微信小程序", icon: "🛍️", color: "cyan", price: "¥6,800起", cycle: "最快2周", description: "融合商城交易、会员权益、营销活动、订单履约与商家运营的一体化零售平台。", overview: "帮助实体商家快速建立私域交易阵地，通过商品、订单、会员和营销数据统一运营，提高复购和客户生命周期价值。", tags: ["商城交易", "会员成长", "营销自动化"], highlights: ["商品规格、库存和订单履约", "等级、积分、储值与权益体系", "优惠券、拼团和会员日活动", "经营数据和客户分群分析"], metrics: [["营销玩法", "12+"], ["会员权益", "8类"], ["上线周期", "2周起"]] },
  { id: 11, title: "智聘云·AI招聘与人才协同平台", short: "智聘云", category: "企业服务", type: "招聘门户", icon: "🧑‍💼", color: "indigo", price: "¥9,800起", cycle: "最快2周", description: "贯通职位发布、简历解析、人才匹配、面试协同、Offer管理与招聘分析。", overview: "以AI辅助招聘团队提升人才识别与流程协作效率，同时为候选人提供透明、顺畅的应聘体验。", tags: ["人才匹配", "招聘协同", "简历解析"], highlights: ["职位画像和候选人智能匹配", "简历结构化解析与人才库", "面试排期、评价和协同决策", "渠道、周期和转化漏斗分析"], metrics: [["招聘节点", "10个"], ["人才标签", "40+"], ["流程提效", "60%"]] },
  { id: 12, title: "企业级RAG智能知识库", short: "RAG知识库", category: "AI增长", type: "PC工作台", icon: "🧠", color: "violet", price: "¥1.28万起", cycle: "最快3周", description: "面向行业知识的条款级解析、混合检索、证据约束问答与引用追溯平台。", overview: "将散落在PDF、制度、标准与业务文档中的知识转化为可信、可追溯的企业智能问答能力，降低知识获取门槛。", tags: ["混合检索", "证据约束", "引用追溯"], highlights: ["多格式文档解析与条款级切分", "语义检索和BM25融合召回", "重排序及证据约束生成", "答案引用定位与权限隔离"], metrics: [["引用准确率", "97%+"], ["知识格式", "10+"], ["问答可追溯", "100%"]] },
];

const categories = ["全部", "租赁经济", "运动娱乐", "社区服务", "社交活动", "循环经济", "AI增长", "运动健康", "产业服务", "零售商业", "企业服务"];

function ArrowIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function CheckIcon() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }

function ProjectVisual({ project }: { project: Project }) {
  return <div className={`project-visual ${project.color}`}>
    <span className="device-label">{project.type}</span>
    <div className="mock-window">
      <div className="window-dots"><i /><i /><i /></div>
      <div className="mock-content"><div className="mock-icon">{project.icon}</div><div className="mock-lines"><b /><span /><span /><div>{project.tags.slice(0,2).map(t => <em key={t}>{t}</em>)}</div></div></div>
    </div>
    <span className="visual-category">{project.category}</span>
  </div>;
}

export default function Home() {
  const [category, setCategory] = useState("全部");
  const [selected, setSelected] = useState<Project | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const filtered = useMemo(() => category === "全部" ? projects : projects.filter(p => p.category === category), [category]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    const close = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [selected]);

  const goWorks = () => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  const startContact = (project?: Project) => {
    setSelected(null);
    setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 80);
    if (project) sessionStorage.setItem("interest", project.title);
  };

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="返回首页"><span className="brand-mark">CG</span><span><b>数字产品实验室</b><small>DIGITAL PRODUCT STUDIO</small></span></a>
      <nav className={mobileOpen ? "open" : ""} aria-label="主导航">
        <a href="#works" onClick={() => setMobileOpen(false)}>精选作品</a><a href="#capability" onClick={() => setMobileOpen(false)}>核心能力</a><a href="#process" onClick={() => setMobileOpen(false)}>合作流程</a><a href="#about" onClick={() => setMobileOpen(false)}>关于我</a>
      </nav>
      <a className="header-cta" href="#about">微信详聊 <ArrowIcon /></a>
      <button className="menu-btn" aria-label="打开菜单" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}><i /><i /></button>
    </header>

    <section className="hero" id="top">
      <div className="hero-grid" /><div className="hero-glow one" /><div className="hero-glow two" />
      <div className="hero-content">
        <p className="eyebrow"><span /> 企业级产品设计 · 全链路交互 · AI工程化</p>
        <h1>把复杂业务，打造为<br /><em>真正可落地的数字产品</em></h1>
        <p className="hero-lead">近二十年企业级软件研发与架构实践，聚焦 AI 应用、产业互联网、智慧服务与数字化平台，从业务梳理到产品落地，交付可演示、可迭代、可增长的完整解决方案。</p>
        <div className="hero-actions"><button className="primary-btn" onClick={goWorks}>浏览精选作品 <ArrowIcon /></button><a className="text-btn" href="#capability"><span>▶</span> 了解交付能力</a></div>
        <div className="hero-proof"><div><strong>18<sup>+</sup></strong><span>年行业经验</span></div><i /><div><strong>30<sup>+</sup></strong><span>产品与解决方案</span></div><i /><div><strong>12<sup>+</sup></strong><span>行业场景沉淀</span></div></div>
      </div>
      <div className="hero-showcase" aria-label="代表项目预览">
        <div className="orbit orbit-1" /><div className="orbit orbit-2" />
        <div className="showcase-main"><span className="showcase-kicker">FEATURED PRODUCT</span><div className="showcase-screen"><div className="screen-bar"><i /><i /><i /></div><div className="screen-layout"><aside><b /><span /><span /><span /><span /></aside><div className="screen-body"><span>数字运营中心</span><div className="metric-row"><i /><i /><i /></div><div className="chart"><b /><b /><b /><b /><b /><b /><b /></div></div></div></div><strong>AI 驱动的行业数字化平台</strong><small>PRODUCT · DATA · INTELLIGENCE</small></div>
        <div className="float-card f1"><span>交付能力</span><b>全链路产品化</b><i>Strategy → Delivery</i></div>
        <div className="float-card f2"><span>核心技术</span><b>AI Agent + RAG</b><i>Intelligent Workflow</i></div>
      </div>
      <div className="scroll-hint"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>

    <section className="logo-strip"><span>覆盖多元行业场景</span><div><b>AI智能应用</b><b>产业互联网</b><b>社区服务</b><b>运动娱乐</b><b>循环经济</b><b>零售商业</b></div></section>

    <section className="works section" id="works">
      <div className="section-heading"><div><p className="section-no">01 / SELECTED WORKS</p><h2>精选产品作品</h2><p>不是静态概念稿，而是围绕真实业务链路打造的高完成度交互产品。</p></div><span className="work-count"><b>{String(filtered.length).padStart(2,"0")}</b> 个作品</span></div>
      <div className="filter-wrap" role="tablist" aria-label="按行业筛选作品">{categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)} role="tab" aria-selected={category === c}>{c}</button>)}</div>
      <div className="project-grid">{filtered.map((p, index) => <article className={`project-card ${index < 3 && category === "全部" ? "top" : ""}`} key={p.id}>
        <ProjectVisual project={p} />
        <div className="card-content"><div className="card-title-row"><div><span>{String(p.id).padStart(2,"0")}</span><h3>{p.title}</h3></div>{p.featured && <b className="featured">精选</b>}</div>
          <p>{p.description}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
          <div className="card-meta"><div><small>参考价</small><b>{p.price}</b></div><div><small>交付周期</small><strong>{p.cycle}</strong></div></div>
          <div className="card-actions"><button onClick={() => setSelected(p)}>查看项目详情</button><button className="scheme" onClick={() => startContact(p)}>微信详聊方案 <ArrowIcon /></button></div>
        </div>
      </article>)}</div>
      {filtered.length === 0 && <div className="empty">该分类的作品正在整理中</div>}
    </section>

    <section className="capability section dark-section" id="capability">
      <div className="dark-grid" /><div className="section-heading light"><div><p className="section-no">02 / CORE CAPABILITY</p><h2>从想法到落地的完整能力</h2><p>兼顾商业价值、产品体验与技术可行性，避免“只能看、不能用”的演示。</p></div></div>
      <div className="cap-grid">
        <article><span>01</span><div className="cap-icon">◫</div><h3>业务产品化</h3><p>从零散需求中抽象角色、场景、流程与规则，建立可持续演进的产品框架。</p><ul><li>需求梳理与产品规划</li><li>全链路业务流程设计</li><li>多端信息架构</li></ul></article>
        <article><span>02</span><div className="cap-icon">✦</div><h3>AI 工程化</h3><p>将大模型、知识库和业务工具连接为可执行、可追溯的智能业务闭环。</p><ul><li>AI Agent 与工作流</li><li>RAG 企业知识库</li><li>MCP 与工具调用</li></ul></article>
        <article><span>03</span><div className="cap-icon">⌘</div><h3>企业级架构</h3><p>面向复杂业务设计高可用、可扩展、可治理的系统和数据架构。</p><ul><li>微服务与领域拆分</li><li>高并发与性能治理</li><li>IoT 与云边协同</li></ul></article>
        <article><span>04</span><div className="cap-icon">◎</div><h3>高品质交互</h3><p>以真实数据和完整交互构建可演示、可验证、可直接推广的产品体验。</p><ul><li>PC / H5 / 小程序多端</li><li>响应式与动效体验</li><li>业务状态完整闭环</li></ul></article>
      </div>
    </section>

    <section className="process section" id="process"><div className="section-heading"><div><p className="section-no">03 / DELIVERY PROCESS</p><h2>清晰透明的合作流程</h2><p>每一步都有可核验的成果，让交付节奏、范围与质量始终可控。</p></div></div><div className="process-line">
      {[['01','需求诊断','理解业务目标、用户角色与核心痛点'],['02','方案定义','输出产品架构、流程与迭代范围'],['03','交互实现','完成多端界面与全流程可用交互'],['04','验证优化','按真实场景测试并持续打磨体验'],['05','交付推广','提供完整成果与后续演进建议']].map(([n,t,d]) => <article key={n}><span>{n}</span><i /><h3>{t}</h3><p>{d}</p></article>)}
    </div></section>

    <section className="about section" id="about"><div className="about-card"><div className="about-copy"><p className="section-no">04 / ABOUT &amp; COOPERATION</p><h2>懂技术，更懂产品如何<br />创造真实业务价值</h2><p>我是一名 AI 应用架构师与企业级平台架构师，长期深耕金融科技、工业互联网、物联网、智慧城市与行业数字化。擅长把复杂技术能力转化为用户看得懂、业务用得上、团队接得住的数字产品。</p><div className="about-tags"><span>Java / Python</span><span>AI Agent</span><span>RAG / MCP</span><span>微服务架构</span><span>IoT 云边协同</span></div><div className="cooperation-copy"><span>有项目想法或同类方案需求？</span><strong>添加微信，详聊项目需求</strong><p>新产品从 0 到 1、现有系统升级、AI 能力融入业务，都可以先从一次直接沟通开始。</p></div></div><div className="about-side"><div className="about-quote"><span>“</span><blockquote>好的数字产品，不是功能的堆砌，而是让复杂业务变得清晰、可信且高效。</blockquote><small>PRODUCT PHILOSOPHY</small></div><div className="wechat-card"><img src={`${import.meta.env.BASE_URL}wechat-qr.jpg`} alt="奋斗人生微信二维码" /><div><small>PROJECT COOPERATION</small><strong>微信扫码，详聊需求</strong><span>添加时请备注“项目合作”<br />期待了解你的产品想法</span></div></div></div></div></section>

    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">CG</span><span><b>数字产品实验室</b><small>DIGITAL PRODUCT STUDIO</small></span></a><p>专注企业数字化产品、AI应用与产业互联网解决方案</p><div><a href="#works">作品</a><a href="#capability">能力</a><a href="#process">流程</a><a href="#about">微信合作</a></div><small>© 2026 CAO GUOJUN. ALL RIGHTS RESERVED.</small></footer>

    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" aria-label="关闭详情" onClick={() => setSelected(null)}>×</button><ProjectVisual project={selected} /><div className="modal-body"><p className="modal-kicker">PROJECT CASE · {String(selected.id).padStart(2,"0")}</p><h2 id="modal-title">{selected.title}</h2><p className="modal-overview">{selected.overview}</p><div className="modal-metrics">{selected.metrics.map(([v,l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div><h3>核心能力与交付范围</h3><ul className="highlight-list">{selected.highlights.map(x => <li key={x}><span><CheckIcon /></span>{x}</li>)}</ul><div className="modal-footer"><div><small>参考投入</small><b>{selected.price}</b><span> · {selected.cycle}</span></div><button className="primary-btn" onClick={() => startContact(selected)}>微信详聊方案 <ArrowIcon /></button></div></div></section></div>}
  </main>;
}
