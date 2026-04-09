// ─────────────────────────────────────────────────────────────
// BIOSYSTEMA — app.js
// ─────────────────────────────────────────────────────────────

// ── STATE ─────────────────────────────────────────────────────
let S = {
view: ‘home’,
dayKey: null,
expanded: {},
workOpen: false,
principleOpen: null,
focusOpen: null,
};

function setState(patch) {
const sa = document.querySelector(’.scroll-area’);
const st = sa ? sa.scrollTop : 0;
S = { …S, …patch };
render();
const nsa = document.querySelector(’.scroll-area’);
if (nsa) nsa.scrollTop = st;
}

// ── UTILITIES ─────────────────────────────────────────────────
function toMins(t) {
const [h, m] = t.split(’:’).map(Number);
let v = h * 60 + m;
if (v < 6 * 60) v += 24 * 60;
return v;
}

function greeting() {
const h = new Date().getHours();
if (h < 12) return ‘Good morning.’;
if (h < 17) return ‘Good afternoon.’;
return ‘Good evening.’;
}

function getSci(block) {
if (block.s && block.r) return block;
if (block.key && SCI[block.key]) return SCI[block.key];
return null;
}

function setAccent(color) {
document.documentElement.style.setProperty(’–day-accent’, color);
}

// ── RENDER HELPERS ────────────────────────────────────────────
function miniBar() {
const START = toMins(‘8:30’), END = toMins(‘18:00’), TOTAL = END - START;
return `<div class="mini-bar">${WORK_BLOCKS.map(b => { const left  = ((toMins(b.time) - START) / TOTAL) * 100; const width = (b.dur / TOTAL) * 100; return `<div class="mini-bar-seg" style="left:${left}%;width:${Math.max(width,0.8)}%;background:${CAT[b.cat].color}"></div>`; }).join('')}</div>`;
}

function timelineBar(allBlocks) {
const START = 6 * 60, TOTAL = 24 * 60;
const segs = allBlocks.map(b => {
const left  = ((toMins(b.time) - START) / TOTAL) * 100;
const width = (b.dur / TOTAL) * 100;
return `<div class="timeline-seg" style="left:${left}%;width:${Math.max(width,0.4)}%;background:${CAT[b.cat].color};opacity:0.85"></div>`;
}).join(’’);
return `<div class="timeline-wrap">
<div class="timeline-bar">${segs}</div>
<div class="timeline-labels"><span>6:30</span><span>10AM</span><span>2PM</span><span>6PM</span><span>11PM</span></div>

  </div>`;
}

function blockHTML(block, id) {
const cat  = CAT[block.cat];
const data = getSci(block);
const open = !!S.expanded[id];
const tap  = !!data;
return `<div class="block${tap?' tappable':''}${open?' open':''}" style="border-color:${open?cat.color+'70':'var(--border)'};box-shadow:${open?`0 0 20px ${cat.color}12`:'none'}" ${tap?`onclick=“toggleBlock(’${id}’)”`:''}> <div class="block-row"> <span class="block-icon">${block.icon}</span> <div class="block-meta"> <div class="block-time"> <span class="block-time-val">${block.time}</span> <span class="block-dur">${block.dur}m</span> </div> <div class="block-label">${block.label}</div> ${block.note?`<div class="block-note" style="color:${cat.color}">${block.note}</div>`:''} </div> <div class="block-right"> <span class="block-pill" style="background:${cat.dim};border:1px solid ${cat.color}35;color:${cat.color}">${cat.label.toUpperCase()}</span> ${tap?`<span class="block-chevron${open?' open':''}">▾</span>`:''} </div> </div> ${open&&data?`<div class="block-detail">
<div class="detail-box" style="background:${cat.dim};border:1px solid ${cat.color}25">
<div class="detail-label" style="color:${cat.color}">THE SCIENCE</div>
<div class="detail-text">${data.s}</div>
</div>
<div class="rule-box">
<div class="rule-label">THE RULE</div>
<div class="rule-text">${data.r}</div>
</div>
</div>`:’’}

  </div>`;
}

function innerBlockHTML(block, idx) {
const cat  = CAT[block.cat];
const data = getSci(block);
const id   = `inner-${idx}`;
const open = !!S.expanded[id];
return `<div class="inner-block${open?' open':''}" style="border-color:${open?cat.color+'60':'var(--border2)'}" ${data?`onclick=“toggleBlock(’${id}’)”`:''}>  <div class="inner-block-row"> <span class="inner-icon">${block.icon}</span> <div class="inner-meta"> <div class="inner-time"> <span class="inner-time-val">${block.time}</span> <span class="inner-dur">${block.dur}m</span> </div> <div class="inner-label">${block.label}</div> ${block.note?`<div class="inner-note" style="color:${cat.color}">${block.note}</div>`:''} </div> <div class="inner-right"> <span class="inner-pill" style="background:${cat.dim};border:1px solid ${cat.color}30;color:${cat.color}">${cat.label.toUpperCase()}</span> ${data?`<span class="inner-chevron${open?' open':''}">▾</span>`:''} </div> </div> ${open&&data?`<div class="inner-detail">
<div class="inner-sci-box" style="background:${cat.dim};border:1px solid ${cat.color}20">
<div class="inner-sci-label" style="color:${cat.color}">THE SCIENCE</div>
<div class="inner-sci-text">${data.s}</div>
</div>
<div class="inner-rule-box">
<div class="inner-rule-label">THE RULE</div>
<div class="inner-rule-text">${data.r}</div>
</div>
</div>`:’’}

  </div>`;
}

function workCollapsible() {
const open   = S.workOpen;
const accent = ‘#6366f1’;
return `<div class="work-block${open?' open':''}" style="border-color:${open?accent+'90':'var(--border)'};box-shadow:${open?'0 0 24px #6366f112':'none'}"> <div class="work-header" onclick="toggleWork()"> <div class="block-row"> <span class="block-icon">💼</span> <div class="block-meta"> <div class="block-time"> <span class="block-time-val">8:30</span> <span class="block-dur">9h 30m</span> </div> <div class="block-label">Work Day</div> ${miniBar()} <div class="work-pills"> ${[['deepwork','5× Deep Work'],['break','3× Break'],['recovery','NSDR'],['nutrition','Lunch'],['anchor','Startup + Shutdown']] .map(([cat,lbl])=>`<span class="work-pill" style="color:${CAT[cat].color}">${lbl}</span>`).join('')} </div> </div> <div class="block-right"> <span class="block-pill" style="background:${CAT.deepwork.dim};border:1px solid ${CAT.deepwork.color}35;color:${CAT.deepwork.color}">WORK</span> <span class="block-chevron${open?' open':''}">▾</span> </div> </div> </div> ${open?`<div class="work-inner">
<div class="work-inner-label">INSIDE THE WORK DAY</div>
${WORK_BLOCKS.map((b,i)=>innerBlockHTML(b,i)).join(’’)}
</div>`:’’}

  </div>`;
}

// ── VIEWS ─────────────────────────────────────────────────────
function viewHome() {
setAccent(S.dayKey ? DAYS[S.dayKey].accent : ‘#6366f1’);
return `<div class="home"> <div class="home-greeting">${greeting()} What kind of day is today?</div> <div class="home-question">SELECT YOUR DAY</div> <div class="day-cards"> ${Object.entries(DAYS).map(([key,day])=>`
<div class="day-card" onclick="selectDay('${key}')"
style="border-color:${S.dayKey===key?day.accent+'80':'var(--border)'}">
<div class="day-card-glow" style="background:radial-gradient(ellipse at 0% 50%,${day.accent}12 0%,transparent 60%)"></div>
<div class="day-card-top">
<span class="day-card-emoji">${day.emoji}</span>
<div>
<div class="day-card-title">${day.label}</div>
<div class="day-card-tag" style="color:${day.accent}">${key.toUpperCase()}</div>
</div>
</div>
<div class="day-card-tagline">${day.tagline}</div>
<div class="day-card-pills">
${day.pills.map(([cat,lbl])=>`<span class="day-card-pill" style="background:${CAT[cat].dim};border:1px solid ${CAT[cat].color}35;color:${CAT[cat].color}">${lbl}</span>`).join(’’)}
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
return `<div class="day-view"> <button class="back-btn" onclick="goHome()">← CHANGE DAY</button> ${timelineBar(allBlocks)} <p class="day-tagline">${day.tagline}</p> <div class="section-label">MORNING</div> <div class="blocks">${day.morning.map((b,i)=>blockHTML(b,`m-${i}`)).join('')}</div> <div class="section-label">WORK</div> <div class="blocks">${workCollapsible()}</div> <div class="section-label">EVENING</div> <div class="blocks"> ${day.afternoon.map((b,i)=>blockHTML(b,`a-${i}`)).join('')} ${EVENING.map((b,i)=>blockHTML(b,`e-${i}`)).join(’’)}
</div>
<div class="footer-card">
<div class="footer-icon">🔑</div>
<div class="footer-text">Miss a block? Don’t skip the next one.<br><span class="footer-highlight">Start the next block, even late.</span></div>
</div>

  </div>`;
}

function viewSystem() {
setAccent(S.dayKey ? DAYS[S.dayKey].accent : ‘#34d399’);
return `<div class="system-wrap"> <div class="section-label" style="margin-top:20px">REFERENCE</div> <p class="system-intro">The science behind every decision. Return here when motivation dips — understanding <em>why</em> is the most durable form of commitment.</p> ${PRINCIPLES.map((p,i)=>{ const open = S.principleOpen === i; return `<div class="principle${open?' open':''}"
style="border-color:${open?p.color+'70':'var(--border)'};box-shadow:${open?`0 0 20px ${p.color}10`:''}"
onclick="togglePrinciple(${i})">
<div class="principle-row">
<span class="principle-icon">${p.icon}</span>
<div class="principle-meta">
<div class="principle-tag" style="color:${p.color}">${p.tag.toUpperCase()}</div>
<div class="principle-title">${p.title}</div>
</div>
<span class="block-chevron${open?' open':''}">▾</span>
</div>
${open?`<div class="principle-body">${p.body}</div>`:’’}
</div>`;
}).join(’’)}

  </div>`;
}

function viewFocus() {
setAccent(S.dayKey ? DAYS[S.dayKey].accent : ‘#34d399’);
return `<div class="focus-wrap"> <div class="section-label" style="margin-top:20px">FOCUS MODES</div> <p class="focus-intro">Four iPhone Focus Modes that make the right behaviour the environmental default. Science-backed context design — your phone reinforces the system instead of fighting it.</p> ${FOCUS_MODES.map((m,i)=>{ const open = S.focusOpen === i; return `<div class="focus-mode${open?' open':''}" style="border-color:${open?m.color+'70':'var(--border)'}">
<div class="focus-header" onclick="toggleFocus(${i})">
<div class="focus-header-row">
<span class="focus-emoji">${m.emoji}</span>
<div class="focus-meta">
<div class="focus-trigger" style="color:${m.color}">${m.trigger.toUpperCase()}</div>
<div class="focus-name">${m.name}</div>
</div>
<span class="block-chevron${open?' open':''}">▾</span>
</div>
<div class="focus-purpose">${m.purpose}</div>
</div>
${open?`<div class="focus-body"> <div class="focus-science" style="background:${m.dim};border:1px solid ${m.color}25"> <div class="focus-science-label" style="color:${m.color}">THE SCIENCE</div> <div class="focus-science-text">${m.science}</div> </div> <div class="focus-section-label">NOTIFICATIONS</div> <div class="focus-detail-text">${m.notifications}</div> <div class="focus-section-label">HOME SCREEN</div> <div class="focus-detail-text">${m.homeScreen}</div> <div class="focus-section-label">SETUP STEPS</div> <div class="focus-steps"> ${m.setup.map((step,j)=>`<div class="focus-step">
<span class="focus-step-num">${j+1}.</span>
<span class="focus-step-text">${step}</span>
</div>`).join('')} </div> ${i===3?`<div class="focus-shortcut">
<div class="focus-shortcut-label">⚡ AUTOMATION</div>
<div class="focus-shortcut-text">Shortcuts → Automation → Focus → When Deep Work turns off → Turn on Personal. Links the two modes so the evening transition is automatic — no decision required.</div>
</div>`:''} </div>`:’’}
</div>`;
}).join(’’)}
<div class="footer-card" style="margin-top:8px">
<div class="footer-icon">📱</div>
<div class="footer-text">These four modes are the minimum infrastructure.<br><span class="footer-highlight">Resist the urge to add more.</span></div>
</div>

  </div>`;
}

// ── HEADER + NAV ──────────────────────────────────────────────
function renderHeader() {
const accent = S.dayKey ? DAYS[S.dayKey].accent : ‘#6366f1’;
return `<div class="header">
<div class="header-glow" style="background:radial-gradient(ellipse at 50% -10%,${accent}18 0%,transparent 60%)"></div>
<div style="position:relative">
<div class="header-eyebrow">Daily Architecture</div>
<div class="header-title">Biosystema</div>
<div class="header-greek">βιοσύστημα — organized life</div>
<div class="header-anchors">
<div class="header-anchor"><div class="header-anchor-icon">⏰</div>Wake 6:30</div>
<div class="header-anchor"><div class="header-anchor-icon">💤</div>7.5 hrs</div>
<div class="header-anchor"><div class="header-anchor-icon">🛏️</div>Bed 10:30</div>
</div>
</div>

  </div>`;
}

function renderNav() {
const tabs = [
{ key: ‘home’,   icon: ‘🏠’, label: ‘HOME’ },
{ key: ‘day’,    icon: S.dayKey ? DAYS[S.dayKey].emoji : ‘📅’, label: ‘TODAY’ },
{ key: ‘system’, icon: ‘📖’, label: ‘SYSTEM’ },
{ key: ‘focus’,  icon: ‘📵’, label: ‘FOCUS’ },
];
return `<nav class="bottom-nav">${tabs.map(t=>`
<button class="nav-btn${S.view===t.key?' active':''}" onclick="navTo('${t.key}')">
<div class="nav-btn-icon">${t.icon}</div>${t.label}
</button>`).join('')}</nav>`;
}

// ── MAIN RENDER ───────────────────────────────────────────────
function render() {
let content = ‘’;
if      (S.view === ‘home’)   content = viewHome();
else if (S.view === ‘day’)    content = S.dayKey ? viewDay() : viewHome();
else if (S.view === ‘system’) content = viewSystem();
else if (S.view === ‘focus’)  content = viewFocus();
document.getElementById(‘app’).innerHTML =
renderHeader() +
`<div class="scroll-area">${content}</div>` +
renderNav();
}

// ── ACTIONS ───────────────────────────────────────────────────
function selectDay(key)     { setState({ dayKey: key, view: ‘day’, expanded: {}, workOpen: false }); }
function goHome()           { setState({ view: ‘home’ }); }
function toggleWork()       { setState({ workOpen: !S.workOpen }); }
function toggleBlock(id)    { setState({ expanded: { …S.expanded, [id]: !S.expanded[id] } }); }
function togglePrinciple(i) { setState({ principleOpen: S.principleOpen === i ? null : i }); }
function toggleFocus(i)     { setState({ focusOpen: S.focusOpen === i ? null : i }); }
function navTo(v) {
if (v === ‘day’ && !S.dayKey) { setState({ view: ‘home’ }); return; }
setState({ view: v, expanded: {}, workOpen: false, principleOpen: null, focusOpen: null });
}

// ── INIT ──────────────────────────────────────────────────────
render();
