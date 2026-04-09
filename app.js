// BIOSYSTEMA — APP

// ── STATE ────────────────────────────────────────────────────────────────
let S = { view: ‘home’, dayKey: null, expanded: {}, workOpen: false, principleOpen: null };

function setState(patch) {
const sa = document.querySelector(”.scroll-area”);
const st = sa ? sa.scrollTop : 0;
S = { …S, …patch };
render();
const nsa = document.querySelector(”.scroll-area”);
if (nsa) nsa.scrollTop = st;
}

// ── HELPERS ──────────────────────────────────────────────────────────────
function toMins(t) {
const [h, m] = t.split(’:’).map(Number);
let v = h * 60 + m;
if (v < 6 * 60) v += 24 * 60;
return v;
}

function getSci(block) {
if (block.s && block.r) return { s: block.s, r: block.r };
if (block.key && SCI[block.key]) return SCI[block.key];
return null;
}

function getGreeting() {
const h = new Date().getHours();
if (h < 12) return ‘Good morning.’;
if (h < 17) return ‘Good afternoon.’;
return ‘Good evening.’;
}

function setAccent(color) {
document.documentElement.style.setProperty(’–accent’, color);
}

// ── RENDER HELPERS ───────────────────────────────────────────────────────
function miniBar() {
const START = toMins(‘8:30’), END = toMins(‘18:00’), TOTAL = END - START;
return ‘<div class="mini-bar">’ + WORK_BLOCKS.map(b => {
const left = ((toMins(b.time) - START) / TOTAL) * 100;
const w = (b.dur / TOTAL) * 100;
return `<div class="mini-seg" style="left:${left}%;width:${Math.max(w,0.8)}%;background:${CAT[b.cat].color};opacity:0.85"></div>`;
}).join(’’) + ‘</div>’;
}

function timelineBar(allBlocks) {
const START = 6 * 60, TOTAL = 24 * 60;
const segs = allBlocks.map(b => {
const left = ((toMins(b.time) - START) / TOTAL) * 100;
const w = (b.dur / TOTAL) * 100;
return `<div class="tl-seg" style="left:${left}%;width:${Math.max(w,0.4)}%;background:${CAT[b.cat].color};opacity:0.85"></div>`;
}).join(’’);
return `<div class="timeline-wrap"><div class="tl-bar">${segs}</div> <div class="tl-labels"><span>6:30</span><span>10AM</span><span>2PM</span><span>6PM</span><span>11PM</span></div></div>`;
}

function renderBlock(block, id) {
const cat = CAT[block.cat];
const sci = getSci(block);
const isOpen = !!S.expanded[id];
const tappable = !!sci;
return `<div class="block${tappable?' tappable':''}${isOpen?' open':''}" style="border-color:${isOpen ? cat.color+'70' : 'var(--border)'};box-shadow:${isOpen?`0 0 18px ${cat.color}10`:''}" ${tappable ? `onclick=“toggleBlock(’${id}’)”`: ''}> <div class="block-row"> <span class="block-icon">${block.icon}</span> <div class="block-meta"> <div class="block-timewrap"><span class="block-time">${block.time}</span><span class="block-dur">${block.dur}m</span></div> <div class="block-label">${block.label}</div> ${block.note ?`<div class="block-note" style="color:${cat.color}">${block.note}</div>`: ''} </div> <div class="block-right"> <span class="block-pill" style="background:${cat.dim};border:1px solid ${cat.color}35;color:${cat.color}">${cat.label.toUpperCase()}</span> ${tappable ?`<span class="chevron${isOpen?' open':''}">▾</span>`: ''} </div> </div> ${isOpen && sci ?`<div class="block-detail">
<div class="sci-box" style="background:${cat.dim};border:1px solid ${cat.color}25">
<div class="sci-label" style="color:${cat.color}">THE SCIENCE</div>
<div class="sci-text">${sci.s}</div>
</div>
<div class="rule-box"><div class="rule-label">THE RULE</div><div class="rule-text">${sci.r}</div></div>
</div>` : ‘’}

  </div>`;
}

function renderInnerBlock(block, idx) {
const cat = CAT[block.cat];
const sci = getSci(block);
const id = `inner-${idx}`;
const isOpen = !!S.expanded[id];
return `<div class="inner-block${isOpen?' open':''}" style="border-color:${isOpen?cat.color+'60':'var(--border2)'}" ${sci?`onclick=“toggleBlock(’${id}’)”`:''}"> <div class="inner-row"> <span class="inner-icon">${block.icon}</span> <div class="inner-meta"> <div class="inner-timewrap"><span class="inner-time">${block.time}</span><span class="inner-dur">${block.dur}m</span></div> <div class="inner-lbl">${block.label}</div> ${block.note?`<div class="inner-note" style="color:${cat.color}">${block.note}</div>`:''} </div> <div class="inner-right"> <span class="inner-pill" style="background:${cat.dim};border:1px solid ${cat.color}30;color:${cat.color}">${cat.label.toUpperCase()}</span> ${sci?`<span class="chevron${isOpen?' open':''}">▾</span>`:''} </div> </div> ${isOpen&&sci?`<div class="inner-detail">
<div class="inner-sci" style="background:${cat.dim};border:1px solid ${cat.color}20">
<div class="inner-sci-lbl" style="color:${cat.color}">THE SCIENCE</div>
<div class="inner-sci-txt">${sci.s}</div>
</div>
<div class="inner-rule"><div class="inner-rule-lbl">THE RULE</div><div class="inner-rule-txt">${sci.r}</div></div>
</div>`:’’}

  </div>`;
}

function renderWork() {
const isOpen = S.workOpen;
const c = CAT.deepwork;
return `<div class="work-block${isOpen?' open':''}" style="border-color:${isOpen?c.color+'80':'var(--border)'};box-shadow:${isOpen?`0 0 20px ${c.color}10`:''}"> <div class="work-header" onclick="toggleWork()"> <div class="block-row"> <span class="block-icon">💼</span> <div class="block-meta"> <div class="block-timewrap"><span class="block-time">8:30</span><span class="block-dur">9h 30m</span></div> <div class="block-label">Work Day</div> ${miniBar()} <div class="work-pills"> ${[['deepwork','5× Deep Work'],['break','3× Break'],['recovery','NSDR'],['nutrition','Lunch'],['anchor','Shutdown']].map(([cat,lbl])=> `<span class="work-pill-text" style="color:${CAT[cat].color}">${lbl}</span>`).join('')} </div> </div> <div class="block-right"> <span class="block-pill" style="background:${c.dim};border:1px solid ${c.color}35;color:${c.color}">WORK</span> <span class="chevron${isOpen?' open':''}">▾</span> </div> </div> </div> ${isOpen?`<div class="work-inner">
<div class="inner-label-hdr">INSIDE THE WORK DAY</div>
${WORK_BLOCKS.map((b,i)=>renderInnerBlock(b,i)).join(’’)}
</div>`:’’}

  </div>`;
}

// ── VIEWS ────────────────────────────────────────────────────────────────
function viewHome() {
setAccent(S.dayKey ? DAYS[S.dayKey].accent : ‘#6366f1’);
return `<div class="home"> <div class="home-q">${getGreeting()} What kind of day is today?</div> <div class="day-cards"> ${Object.entries(DAYS).map(([key, day]) => `
<div class="day-card" onclick="selectDay('${key}')"
style="border-color:${S.dayKey===key?day.accent+'80':'var(--border)'}">
<div style="position:absolute;inset:0;border-radius:14px;background:radial-gradient(ellipse at 0% 50%,${day.accent}12,transparent 60%);pointer-events:none"></div>
<div class="day-card-top">
<span class="day-card-emoji">${day.emoji}</span>
<div><div class="day-card-name">${day.label}</div>
<div class="day-card-type" style="color:${day.accent}">${key.toUpperCase()}</div></div>
</div>
<div class="day-card-tagline">${day.tagline}</div>
<div class="pills">
${day.pills.map(([cat,lbl])=>`<span class="pill" style="background:${CAT[cat].dim};border:1px solid ${CAT[cat].color}35;color:${CAT[cat].color}">${lbl}</span>`).join(’’)}
</div>
<span class="day-card-arrow" style="color:${day.accent}">→</span>
</div>`).join(’’)}
</div>
<div class="home-hint">TAP A DAY TYPE TO BEGIN</div>

  </div>`;
}

function viewDay() {
const day = DAYS[S.dayKey];
setAccent(day.accent);
const allBlocks = […day.morning, …WORK_BLOCKS, …day.afternoon, …EVENING];
return `<div class="day-view"> <button class="back-btn" onclick="goHome()">← CHANGE DAY</button> ${timelineBar(allBlocks)} <p class="day-tagline">${day.tagline}</p> <div class="section-label">MORNING</div> <div class="blocks">${day.morning.map((b,i)=>renderBlock(b,`m-${i}`)).join('')}</div> <div class="section-label">WORK</div> <div class="blocks">${renderWork()}</div> <div class="section-label">EVENING</div> <div class="blocks"> ${day.afternoon.map((b,i)=>renderBlock(b,`a-${i}`)).join('')} ${EVENING.map((b,i)=>renderBlock(b,`e-${i}`)).join(’’)}
</div>
<div class="footer-card">
<div class="footer-icon">🔑</div>
<div class="footer-text">Miss a block? Don’t skip the next one.<br>
<span class="footer-hl">Start the next block, even late.</span> That’s the entire game.</div>
</div>

  </div>`;
}

function viewSystem() {
setAccent(S.dayKey ? DAYS[S.dayKey].accent : ‘#34d399’);
return `<div class="system-wrap"> <div class="section-label">REFERENCE</div> <p class="system-intro">The science behind every decision. Return here when motivation dips — understanding <em>why</em> is the most durable form of commitment.</p> ${PRINCIPLES.map((p,i)=>{ const isOpen = S.principleOpen === i; return `<div class="principle${isOpen?' open':''}"
style="border-color:${isOpen?p.color+'70':'var(--border)'};box-shadow:${isOpen?`0 0 18px ${p.color}10`:''}"
onclick="togglePrinciple(${i})">
<div class="principle-row">
<span class="principle-icon">${p.icon}</span>
<div class="principle-meta">
<div class="principle-tag" style="color:${p.color}">${p.tag.toUpperCase()}</div>
<div class="principle-title">${p.title}</div>
</div>
<span class="chevron${isOpen?' open':''}">▾</span>
</div>
${isOpen?`<div class="principle-body">${p.body}</div>`:’’}
</div>`;
}).join(’’)}

  </div>`;
}

function viewFocus() {
setAccent(S.dayKey ? DAYS[S.dayKey].accent : ‘#f97316’);
return `<div class="focus-wrap"> <div class="section-label">FOCUS MODES</div> <p class="focus-intro">Four iPhone Focus Modes that make your phone match your biology. Environment design is more reliable than willpower.</p> ${FOCUS_MODES.map(fm=>`
<div class="focus-card" style="border-color:${fm.color}30">
<div class="focus-header">
<span class="focus-emoji">${fm.emoji}</span>
<div>
<div class="focus-name">${fm.name}</div>
<div class="focus-trigger" style="color:${fm.color}">${fm.trigger}</div>
</div>
</div>
<div class="focus-row">
<div class="focus-row-lbl" style="color:${fm.color}">PURPOSE</div>
<div class="focus-row-txt">${fm.purpose}</div>
</div>
<div class="focus-row">
<div class="focus-row-lbl" style="color:${fm.color}">ALLOWED NOTIFICATIONS</div>
<div class="focus-row-txt">${fm.allowed}</div>
</div>
<div class="focus-row">
<div class="focus-row-lbl" style="color:${fm.color}">HOME SCREEN</div>
<div class="focus-row-txt">${fm.homeScreen}</div>
</div>
${fm.autoReply?`<div class="focus-row"> <div class="focus-row-lbl" style="color:${fm.color}">AUTO-REPLY</div> <div class="focus-row-txt">"${fm.autoReply}"</div> </div>`:’’}
<div class="focus-steps">
<div class="focus-row-lbl" style="color:${fm.color}">SETUP STEPS</div>
${fm.steps.map((step,i)=>`<div class="focus-step"><span class="focus-step-n">${i+1}.</span><span>${step}</span></div>`).join(’’)}
</div>
${fm.name===‘Deep Work’?`<div class="focus-shortcut"> <div class="focus-shortcut-lbl">KEY AUTOMATION</div> <div class="focus-shortcut-txt">Shortcuts → Automation → Focus → When Deep Work turns OFF → Turn on Personal. This means when you finish work, the phone switches automatically. You never have to remember.</div> </div>`:’’}
</div>`).join(’’)}

  </div>`;
}

// ── HEADER + NAV ─────────────────────────────────────────────────────────
function renderHeader() {
const accent = S.dayKey ? DAYS[S.dayKey].accent : ‘#6366f1’;
return `<div class="header">
<div class="header-glow" style="background:radial-gradient(ellipse at 50% -10%,${accent}18,transparent 60%)"></div>
<div style="position:relative">
<div class="header-label">Daily Architecture</div>
<div class="header-title">Biosystema</div>
<div class="header-greek">βιοσύστημα — organized life</div>
<div class="header-anchors">
<div class="anchor-chip"><div class="anchor-chip-icon">⏰</div>Wake 6:30</div>
<div class="anchor-chip"><div class="anchor-chip-icon">💤</div>7.5 hrs</div>
<div class="anchor-chip"><div class="anchor-chip-icon">🛏️</div>Bed 10:30</div>
</div>
</div>

  </div>`;
}

function renderNav() {
const tabs = [
{ key: ‘home’,   icon: ‘🏠’, label: ‘HOME’ },
{ key: ‘day’,    icon: S.dayKey ? DAYS[S.dayKey].emoji : ‘📅’, label: ‘TODAY’ },
{ key: ‘system’, icon: ‘📖’, label: ‘SYSTEM’ },
{ key: ‘focus’,  icon: ‘🎯’, label: ‘FOCUS’ },
];
return `<nav class="bottom-nav">${tabs.map(t=>`
<button class="nav-btn${S.view===t.key?' active':''}" onclick="navTo('${t.key}')">
<div class="nav-btn-icon">${t.icon}</div>${t.label}
</button>`).join('')}</nav>`;
}

// ── MAIN RENDER ──────────────────────────────────────────────────────────
function render() {
let content = ‘’;
if (S.view === ‘home’)   content = viewHome();
else if (S.view === ‘day’)    content = S.dayKey ? viewDay() : viewHome();
else if (S.view === ‘system’) content = viewSystem();
else if (S.view === ‘focus’)  content = viewFocus();
document.getElementById(‘app’).innerHTML = renderHeader() +
`<div class="scroll-area">${content}</div>` + renderNav();
}

// ── ACTIONS ──────────────────────────────────────────────────────────────
function selectDay(key) { setState({ dayKey: key, view: ‘day’, expanded: {}, workOpen: false }); }
function goHome() { setState({ view: ‘home’ }); }
function navTo(v) {
if (v === ‘day’ && !S.dayKey) { setState({ view: ‘home’ }); return; }
setState({ view: v, expanded: {}, workOpen: false, principleOpen: null });
}
function toggleBlock(id) { setState({ expanded: { …S.expanded, [id]: !S.expanded[id] } }); }
function toggleWork() { setState({ workOpen: !S.workOpen }); }
function togglePrinciple(i) { setState({ principleOpen: S.principleOpen === i ? null : i }); }

// ── INIT ─────────────────────────────────────────────────────────────────
render();
