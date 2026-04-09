// ── CATEGORIES ────────────────────────────────────────────────────────────
const CAT = {
  anchor:    { label: "Anchor",    color: "#f97316", dim: "#431407" },
  deepwork:  { label: "Deep Work", color: "#6366f1", dim: "#1e1b4b" },
  break:     { label: "Break",     color: "#10b981", dim: "#052e16" },
  nutrition: { label: "Nutrition", color: "#eab308", dim: "#1c1107" },
  recovery:  { label: "Recovery",  color: "#a855f7", dim: "#1a0533" },
  transit:   { label: "Commute",   color: "#38bdf8", dim: "#0c1a3d" },
  exercise:  { label: "Exercise",  color: "#ec4899", dim: "#2d0a1e" },
  social:    { label: "Life",      color: "#34d399", dim: "#052e16" },
  sleep:     { label: "Sleep",     color: "#818cf8", dim: "#0f0f2e" },
  admin:     { label: "Admin",     color: "#94a3b8", dim: "#0f172a" },
};

// ── SCIENCE ENTRIES ───────────────────────────────────────────────────────
const SCI = {
  wake:         { s: "Consistent wake time is the single most powerful circadian anchor. Even one day of variance degrades sleep quality across the whole week (Walker, 2017). Light exposure in the first 30 min sets your cortisol peak and melatonin offset for the next 16 hours.", r: "Same time. Every day. No exceptions. This is the load-bearing wall of the entire system." },
  dogAM:        { s: "Morning light + gentle movement is the most powerful combination for circadian priming. The vestibular activation from walking combined with outdoor light suppresses residual melatonin and elevates alertness naturally. An unhurried walk keeps cortisol from spiking unnecessarily.", r: "No phone. Eyes up, light in. Take your time. This is the highest-ROI 20 minutes of your morning." },
  breakfast:    { s: "High-protein morning meals stabilize blood glucose for 4–6 hours, preventing the mid-morning focus crash. Protein supplies tyrosine — precursor to dopamine, your focus neurotransmitter. An unhurried breakfast with no screens is associated with measurably lower daily cortisol.", r: "Sit down. No phone. Eat slowly. Prep the night before on commute days." },
  morningWFH:   { s: "The cortisol awakening response peaks 30–45 min after waking and sets the neurological tone for the entire day. Low-stress, sensory-rich, unrushed morning activity produces lower baseline cortisol across the full day — less anxiety, better emotional regulation, more sustained focus. Checking your phone in the first hour spikes cortisol sharply and sets a reactive baseline that persists for hours.", r: "No urgency. No productivity. No phone. Journal, stretch, coffee, silence. This is preparation, not idle time." },
  commutePrep:  { s: "Every decision made in the morning depletes the cognitive resources available for deep work. Bag packed the night before, clothes laid out — zero decisions this morning.", r: "Everything prepared the night before. This block is pure execution." },
  commuteGo:    { s: "Transit commute is not dead time. Commuters who use transit for reading, audio learning, or mindful observation report higher daily wellbeing than those who stress or scroll.", r: "Podcast, audiobook, or eyes-closed rest. Not news, not email. You're priming, not reacting." },
  commuteHome:  { s: "The transition from work identity to home identity is psychologically important. Research on commute detachment shows people who mentally disengage during the commute home report better evening mood, lower conflict in relationships, and higher sleep quality.", r: "No work email. Something enjoyable. You're transitioning, not extending the workday." },
  startup:      { s: "A consistent startup ritual signals 'deep work mode' to your brain via classical conditioning. Over time, the ritual itself triggers the neurological state — no willpower required.", r: "Write your 3 priorities. Open only what you need. Nothing else." },
  meeting845:   { s: "Cortisol is still rising at 8:45am — your cognitive peak hasn't fully arrived. Light coordination meetings here don't waste your prime window. By 9:15 the peak has landed.", r: "Use this meeting to orient, not to do your best thinking." },
  deepwork90:   { s: "Ultradian rhythm research (Kleitman, Lavie) shows the brain cycles through ~90-min peaks of high alertness followed by 20-min recovery troughs. Working within these windows is the foundation of sustainable high performance. Forcing focus beyond the peak depletes prefrontal resources and degrades every subsequent block.", r: "One task. No notifications. Phone face down or in another room." },
  break20:      { s: "The 20-min trough between ultradian peaks is biologically real. The break is not lost time — it makes the next 90 minutes possible. Movement during breaks elevates BDNF and restores attention networks more effectively than passive rest.", r: "Away from screens. Walk, stretch, look outside. Not social media." },
  lunch:        { s: "Eating at your desk extends cognitive load with no recovery credit. A full contextual break — different room, posture, stimulation — allows parasympathetic activation that restores focus capacity for the afternoon.", r: "Away from desk. No screens. Real food." },
  nsdr:         { s: "Non-Sleep Deep Rest (Huberman Lab, Yoga Nidra research) restores dopamine to the nucleus accumbens and consolidates morning learning. Stanford research shows it replicates some restorative benefits of a full sleep cycle in 20 minutes.", r: "Set a 20-min alarm. Eyes closed, body still. Guided NSDR audio works well. Do it for two weeks before judging it." },
  shutdown:     { s: "The Zeigarnik effect: incomplete tasks occupy working memory involuntarily, generating background anxiety. Externalizing tomorrow's priorities closes those loops and frees your brain to fully disengage from work mode.", r: "Write 3 priorities for tomorrow. Close all tabs. Say 'shutdown complete' aloud — the verbal cue matters." },
  workout60:    { s: "Late afternoon body temperature peaks align with peak strength output and coordination. Post-exercise BDNF elevation primes neuroplasticity for evening learning. Exercise is the most powerful legal cognitive enhancer and most reliable mood stabilizer known to science.", r: "Show up even when motivation is low. Consistency over intensity, always." },
  workout45:    { s: "45 minutes of quality training yields ~85–90% of the adaptation stimulus of 60 minutes. On constrained days, 45 min fully preserves the circadian, hormonal, and neurological benefits of exercise.", r: "Shorter session means higher intensity. No filler sets. Every minute counts." },
  bikeCommute:  { s: "Zone 2 cardio (conversational pace cycling) for 60 min builds mitochondrial density, improves VO2 max, and elevates BDNF. You arrive at work cognitively primed. This is among the highest-ROI hours in your week.", r: "This IS your workout. No additional training needed. Protect the evening this frees up." },
  bikeHome:     { s: "Second Zone 2 session. Total ~2 hours of aerobic work today — associated with substantial improvements in cardiovascular fitness, mood, and metabolic health over weeks of consistency. The ride home also serves as active commute detachment.", r: "Same pace as morning — Zone 2, not a race. Conversational effort." },
  shower:       { s: "Changing environment after exercise signals the brain to exit performance mode. This behavioral transition closes the physical effort loop and opens personal time.", r: "Deliberate, not rushed. What begins now is personal time." },
  dogPM:        { s: "Evening movement aids glucose clearance, reduces accumulated cortisol, and provides a light-to-dark transition that primes melatonin onset. The gentle rhythm of walking activates the parasympathetic nervous system.", r: "Keep it gentle. This is decompression, not training." },
  dinner:       { s: "Social connection is the #1 predictor of long-term wellbeing (Harvard Study of Adult Development, 80 years of data). Shared device-free meals show measurably higher relationship satisfaction. This is non-negotiable infrastructure.", r: "Phones away. Every night. This is the highest-ROI 50 minutes of your evening." },
  personalTime: { s: "The hour after dinner is the optimal window for winding down gradually. Low-stimulation enjoyable activity — reading, light conversation, a calm hobby — allows the nervous system to shift from sympathetic to parasympathetic dominance. Trying to switch directly from stimulating activity to sleep doesn't work physiologically.", r: "Reading, talking, a calm hobby. No screens, no news, nothing that excites. This is the natural on-ramp to wind-down." },
  winddown:     { s: "Blue light suppresses melatonin for up to 3 hours. Core body temperature must drop 1–2°F to initiate sleep. Dimming lights and removing stimulation 30–60 min before bed accelerates both processes significantly.", r: "Dim lights. No screens. Prepare for sleep. Non-negotiable — it's what makes 11pm sleep actually happen." },
  inBed:        { s: "10:30pm in bed gives your body 30 min to fall asleep and exactly 7.5 hours — 5 complete 90-min sleep cycles. The final cycles are REM-rich, handling emotional regulation and memory integration. Cutting them by sleeping late removes the most valuable sleep.", r: "In bed at 10:30. Non-negotiable. Tomorrow's performance is decided right now." },
  sleep:        { s: "7.5 hours = exactly 5 complete 90-min sleep cycles. Memory consolidation, emotional regulation, growth hormone release, immune function — all peak during sleep. Walker: 6 hours produces impairment equivalent to 24hrs of sleep deprivation, and you cannot feel how impaired you are.", r: "65–68°F room. Dark. Consistent. This is the foundation everything else rests on." },
  adminLife:    { s: "Batching life admin on specific days eliminates the cognitive overhead of deciding when to do it. Decision fatigue is real — pre-deciding protects mental energy for higher-leverage work.", r: "WFH days carry the admin load so other days stay clean." },
  cookTogether: { s: "Cooking together is a high-quality connection ritual shown to increase relationship satisfaction and daily wellbeing. Shared physical activity creates genuine presence — more valuable than side-by-side screen time.", r: "Protect this time. Don't fill it with productivity. Fill it with life." },
  simpleDinner: { s: "On constrained days, dinner should be pre-prepped or simple by design. Decision fatigue and physical tiredness make complex cooking a liability. Batch cooking on WFH days protects these evenings.", r: "Pre-prep on WFH days. Keep it simple tonight." },
  freshenUp:    { s: "BDNF is elevated after aerobic exercise for 2–4 hours. You arrive at work neurologically primed — in a peak state for the deep work blocks ahead.", r: "Quick change, freshen up. You're walking in ahead of almost everyone neurologically." },
  bikePrep:     { s: "Small pre-performance rituals prime the motor cortex and signal the body that physical exertion is coming. Gear checked the night before eliminates morning decision overhead.", r: "Helmet, lights, water. Everything checked the night before." },
  commsBlock:   { s: "Post-siesta alertness supports collaborative and communicative work. Your cognitive peak has passed — use remaining alertness for coordination, not deep analysis.", r: "Meetings, email, async responses. Don't fight your biology." },
  wrapBlock:    { s: "Final work block. Tie up loose ends, respond to anything time-sensitive, prepare for tomorrow. Starting new deep work here is a trap — it extends the day and degrades the shutdown ritual.", r: "Close, document, prepare. Leave nothing open." },
};

// ── WORK BLOCKS (shared across all day types) ─────────────────────────────
const WORK_BLOCKS = [
  { time: "8:30", dur: 15,  icon: "📋", label: "Startup Ritual",           cat: "anchor",    key: "startup" },
  { time: "8:45", dur: 30,  icon: "📞", label: "Daily Meeting",            cat: "deepwork",  key: "meeting845" },
  { time: "9:15", dur: 90,  icon: "🧠", label: "Deep Work Block 1",        cat: "deepwork",  key: "deepwork90", note: "Cognitive prime time. Guard it." },
  { time: "10:45",dur: 20,  icon: "🚶", label: "Break — Move",             cat: "break",     key: "break20" },
  { time: "11:05",dur: 90,  icon: "⚡", label: "Deep Work Block 2",        cat: "deepwork",  key: "deepwork90" },
  { time: "12:35",dur: 30,  icon: "🥗", label: "Lunch — Away from Desk",  cat: "nutrition", key: "lunch" },
  { time: "1:05", dur: 20,  icon: "😌", label: "NSDR",                     cat: "recovery",  key: "nsdr" },
  { time: "1:25", dur: 90,  icon: "💼", label: "Deep Work Block 3",        cat: "deepwork",  key: "deepwork90" },
  { time: "2:55", dur: 20,  icon: "🌿", label: "Break — Move",             cat: "break",     key: "break20" },
  { time: "3:15", dur: 90,  icon: "📬", label: "Work Block 4 — Comms",     cat: "deepwork",  key: "commsBlock" },
  { time: "4:45", dur: 15,  icon: "☕", label: "Break",                    cat: "break",     key: "break20" },
  { time: "5:00", dur: 55,  icon: "📝", label: "Work Block 5 — Wrap",      cat: "deepwork",  key: "wrapBlock" },
  { time: "5:55", dur: 5,   icon: "🔒", label: "Shutdown Ritual",          cat: "anchor",    key: "shutdown" },
];

// ── EVENING (identical across ALL day types) ──────────────────────────────
const EVENING = [
  { time: "8:40", dur: 50,  icon: "🍽️", label: "Dinner with Wife",        cat: "social",    key: "dinner" },
  { time: "9:30", dur: 30,  icon: "📖", label: "Personal Time — Calm",     cat: "social",    key: "personalTime", note: "Reading, light conversation, calm hobby. No screens." },
  { time: "10:00",dur: 30,  icon: "🌙", label: "Wind Down",                cat: "sleep",     key: "winddown" },
  { time: "10:30",dur: 30,  icon: "🛏️", label: "In Bed",                  cat: "sleep",     key: "inBed" },
  { time: "11:00",dur: 450, icon: "💤", label: "Sleep — 7.5 hrs",          cat: "sleep",     key: "sleep" },
];

// ── DAY TYPES ─────────────────────────────────────────────────────────────
const DAYS = {
  wfh: {
    label: "Work From Home", emoji: "🏠", accent: "#6366f1",
    tagline: "Unhurried mornings. Full control. Life admin lives here.",
    pills: [["anchor","Morning Ritual"],["deepwork","Deep Work"],["exercise","60 min Workout"],["admin","Life Admin"]],
    morning: [
      { time: "6:30", dur: 15,  icon: "☀️", label: "Wake + Light",              cat: "anchor",    key: "wake" },
      { time: "6:45", dur: 30,  icon: "🐕", label: "Morning Dog Walk — Slow",   cat: "anchor",    key: "dogAM", note: "Longer and unhurried. This is the point." },
      { time: "7:15", dur: 45,  icon: "🥣", label: "Breakfast — No Screens",    cat: "nutrition", key: "breakfast" },
      { time: "8:00", dur: 30,  icon: "🧘", label: "Unhurried Morning",         cat: "anchor",    key: "morningWFH", note: "Journal, stretch, coffee, silence. No urgency." },
    ],
    afternoon: [
      { time: "6:00", dur: 60,  icon: "🏋️", label: "Workout — 60 min",         cat: "exercise",  key: "workout60" },
      { time: "7:00", dur: 20,  icon: "🚿", label: "Shower + Transition",       cat: "anchor",    key: "shower" },
      { time: "7:20", dur: 20,  icon: "🐕", label: "Evening Dog Walk",          cat: "anchor",    key: "dogPM" },
      { time: "7:40", dur: 60,  icon: "🍳", label: "Cook + Life Admin",         cat: "admin",     key: "adminLife" },
    ],
  },
  office: {
    label: "Office Day", emoji: "🏢", accent: "#38bdf8",
    tagline: "Execution day. Pre-decided, lean, zero overhead.",
    pills: [["transit","1hr Commute"],["deepwork","Deep Work"],["exercise","45 min Workout"],["nutrition","Pre-prepped Dinner"]],
    morning: [
      { time: "6:30", dur: 15,  icon: "☀️", label: "Wake + Light",              cat: "anchor",    key: "wake" },
      { time: "6:45", dur: 20,  icon: "🐕", label: "Morning Dog Walk",          cat: "anchor",    key: "dogAM" },
      { time: "7:05", dur: 20,  icon: "🥣", label: "Breakfast — No Screens",    cat: "nutrition", key: "breakfast" },
      { time: "7:25", dur: 5,   icon: "🎒", label: "Commute Prep",              cat: "anchor",    key: "commutePrep" },
      { time: "7:30", dur: 60,  icon: "🚌", label: "Commute to Office — 1hr",   cat: "transit",   key: "commuteGo" },
    ],
    afternoon: [
      { time: "6:00", dur: 60,  icon: "🚌", label: "Commute Home — 1hr",        cat: "transit",   key: "commuteHome" },
      { time: "7:00", dur: 45,  icon: "🏋️", label: "Workout — 45 min",         cat: "exercise",  key: "workout45" },
      { time: "7:45", dur: 15,  icon: "🚿", label: "Shower + Transition",       cat: "anchor",    key: "shower" },
      { time: "8:00", dur: 15,  icon: "🐕", label: "Evening Dog Walk",          cat: "anchor",    key: "dogPM" },
      { time: "8:15", dur: 25,  icon: "🍳", label: "Simple Dinner Prep",        cat: "nutrition", key: "simpleDinner" },
    ],
  },
  bike: {
    label: "Bike to Work", emoji: "🚴", accent: "#ec4899",
    tagline: "Commute = workout. Richest evenings of the week.",
    pills: [["exercise","Zone 2 Both Ways"],["deepwork","Deep Work"],["social","Cook Together"],["social","Free Time"]],
    morning: [
      { time: "6:30", dur: 15,  icon: "☀️", label: "Wake + Light",              cat: "anchor",    key: "wake" },
      { time: "6:45", dur: 20,  icon: "🐕", label: "Morning Dog Walk",          cat: "anchor",    key: "dogAM" },
      { time: "7:05", dur: 15,  icon: "🥣", label: "Breakfast — Light",         cat: "nutrition", key: "breakfast", note: "Lighter meal before Zone 2 effort." },
      { time: "7:20", dur: 10,  icon: "🚴", label: "Bike Prep",                 cat: "anchor",    key: "bikePrep" },
      { time: "7:30", dur: 60,  icon: "🚴", label: "Bike Commute — Zone 2",     cat: "exercise",  key: "bikeCommute" },
      { time: "8:30", dur: 15,  icon: "🧴", label: "Freshen Up + Arrive",       cat: "anchor",    key: "freshenUp" },
    ],
    afternoon: [
      { time: "6:00", dur: 60,  icon: "🚴", label: "Bike Home — Zone 2",        cat: "exercise",  key: "bikeHome" },
      { time: "7:00", dur: 20,  icon: "🚿", label: "Shower + Transition",       cat: "anchor",    key: "shower" },
      { time: "7:20", dur: 20,  icon: "🐕", label: "Evening Dog Walk",          cat: "anchor",    key: "dogPM" },
      { time: "7:40", dur: 60,  icon: "🍳", label: "Cook Together",             cat: "social",    key: "cookTogether" },
    ],
  },
};

// ── SYSTEM PRINCIPLES ─────────────────────────────────────────────────────
const PRINCIPLES = [
  { icon: "〰️", color: "#6366f1", tag: "Performance Biology",
    title: "Ultradian Rhythms — Why 90-Min Blocks",
    body: "Your brain cycles through ~90-min peaks of high alertness followed by 20-min recovery troughs throughout the entire day (Kleitman, Lavie). Working within these peaks and fully resting in the troughs is the foundation of sustainable output. Fighting the trough depletes prefrontal resources and degrades every subsequent block. The breaks aren't lost time — they're what make the next 90 minutes possible." },
  { icon: "🕖", color: "#f97316", tag: "Chronobiology",
    title: "Circadian Anchors — Why Same Wake & Sleep Every Day",
    body: "Your circadian rhythm is set by light and timing consistency. Even one day of shifted sleep degrades cognitive performance and mood across the following days (Walker, 2017). The wake time is more critical than sleep time — it sets the cortisol awakening response, which drives morning alertness. Melatonin onset follows ~16 hours later. 6:30am every day, including weekends." },
  { icon: "🌅", color: "#eab308", tag: "Stress Physiology",
    title: "The Unhurried Morning — Why It Changes the Whole Day",
    body: "The cortisol awakening response peaks 30–45 min after waking and sets the neurological tone for the entire day. People in low-stress, unrushed morning states show measurably lower baseline cortisol all day — less anxiety, better emotional regulation, more sustained focus. Checking your phone in the first hour spikes cortisol sharply and sets a reactive baseline that persists for hours. On WFH days the extra time is the most important hour, used correctly by doing almost nothing." },
  { icon: "😌", color: "#a855f7", tag: "Neuroscience",
    title: "NSDR — The 20-Minute Superpower",
    body: "Non-Sleep Deep Rest (Huberman Lab, Stanford) restores dopamine to the nucleus accumbens and consolidates morning learning into longer-term memory. A 20-min session after lunch replicates some restorative effects of a full sleep cycle. It feels unproductive. It is the opposite. Do it for two weeks before judging it." },
  { icon: "🏋️", color: "#ec4899", tag: "Exercise Science",
    title: "Exercise Timing — Why After Work and Why Daily",
    body: "Core body temperature peaks in late afternoon, aligning with peak strength and coordination. Post-exercise BDNF primes neuroplasticity for evening learning. On bike days, two hours of Zone 2 cardio delivers outsized cardiovascular and metabolic adaptation. Daily exercise is not just fitness — it is the most reliable mood stabilizer, stress clearer, and sleep quality improver known to science." },
  { icon: "🛏️", color: "#818cf8", tag: "Sleep Science",
    title: "Sleep Architecture — Why 7.5 Hours Exactly",
    body: "7.5 hours = exactly 5 complete 90-min sleep cycles. The final cycles are REM-rich, handling emotional regulation, creative insight, and memory integration. Cutting sleep by 90 min removes an entire REM-rich cycle. Walker's research: 6 hours produces impairment equivalent to 24hrs of sleep deprivation — and you cannot feel how impaired you are." },
  { icon: "🍽️", color: "#34d399", tag: "Behavioral Science",
    title: "Consistent Evenings — Why the Same Every Night",
    body: "Behavioral research on habit formation shows that consistent evening sequences — same dinner time, same wind-down, same sleep time — produce the strongest circadian entrainment and the most durable routines. The evening is identical across all three day types by design: dinner 8:40, personal time 9:30, wind down 10:00, in bed 10:30. What varies is only what happens before dinner." },
  { icon: "🔁", color: "#10b981", tag: "Habit Formation",
    title: "The 70% Rule — Why This System Will Stick",
    body: "Systems built on perfect adherence fail the moment real life interrupts — and it always does. Consistency at 70% adherence compounds dramatically over months, while the pursuit of perfection creates an all-or-nothing mindset that breaks systems entirely. The rule: never miss twice in a row. Miss a block? Start the next one, even late. That single constraint, followed imperfectly, outperforms any perfect schedule followed briefly." },
];

// ── FOCUS MODES ───────────────────────────────────────────────────────────
const FOCUS_MODES = [
  {
    name: "Morning",
    emoji: "🌅",
    color: "#f97316",
    dim: "#431407",
    trigger: "Automatic — 6:30am to 8:30am daily",
    purpose: "Protects the cortisol awakening response. The phone becomes almost invisible.",
    science: "Checking your phone in the first hour spikes cortisol sharply and sets a reactive, anxious baseline that persists for hours. This mode removes that threat entirely.",
    steps: [
      { icon: "🔕", text: "Allow notifications from: nobody. Zero reactive stimulation." },
      { icon: "📱", text: "Home Screen: Biosystema, Clock, Apple Health only. One page." },
      { icon: "💬", text: "Auto-reply: 'Morning routine — back at 8:30'" },
      { icon: "⚙️", text: "Settings → Focus → Morning → Add Schedule → 6:30–8:30am daily" },
    ],
  },
  {
    name: "Deep Work",
    emoji: "🧠",
    color: "#6366f1",
    dim: "#1e1b4b",
    trigger: "Manual — you turn this ON at 8:30am as your startup ritual",
    purpose: "The manual trigger IS part of the startup ritual. The deliberate act of turning it on signals cognitive commitment — research on implementation intentions shows this strengthens the behavioral cue more than an automatic trigger would.",
    science: "Attention residue (Sophie Leroy) shows that even seeing a personal app icon keeps part of your brain off-task. This mode removes that residue entirely during work hours.",
    steps: [
      { icon: "🔔", text: "Allow: Teams (calls only), Calendar (event alerts only)" },
      { icon: "📵", text: "Silence: everything else — all badges, all social, all news" },
      { icon: "📱", text: "Home Screen: Outlook, Teams, Smartsheet, Todoist, Calendar, Biosystema" },
      { icon: "📞", text: "Calls from: Starred contacts only (wife, close family)" },
      { icon: "⚙️", text: "Settings → Focus → Deep Work → turn on manually at 8:30am each day" },
    ],
  },
  {
    name: "Recovery",
    emoji: "😌",
    color: "#a855f7",
    dim: "#1a0533",
    trigger: "Automatic — 1:05pm to 1:25pm daily",
    purpose: "Short, surgical, automatic. Protects the NSDR block — the single most skipped and most valuable 20 minutes of the day.",
    science: "NSDR only works if you actually do it. This mode makes the phone inert during the window so re-engagement is impossible before the 20 minutes are up.",
    steps: [
      { icon: "🔕", text: "Allow notifications from: nobody" },
      { icon: "📱", text: "Home Screen: plain dark wallpaper, no apps visible. Phone = timer only." },
      { icon: "⏰", text: "Set your 20-min NSDR alarm before activating, then put phone face down" },
      { icon: "⚙️", text: "Settings → Focus → Recovery → Add Schedule → 1:05–1:25pm daily" },
    ],
  },
  {
    name: "Personal",
    emoji: "🌿",
    color: "#34d399",
    dim: "#052e16",
    trigger: "Automatic — 6:00pm daily to 10:30pm",
    purpose: "The most important mode psychologically. Work apps disappear from view entirely — not just silenced. Research shows even seeing a work app icon keeps part of your brain in work mode.",
    science: "Attention residue persists as long as work cues are visible. Removing them from the home screen — not just muting them — is what actually allows full psychological detachment from work.",
    steps: [
      { icon: "🔔", text: "Allow: wife, close friends and family, all personal apps" },
      { icon: "📵", text: "Remove from Home Screen: Teams, Outlook, Smartsheet — all work apps" },
      { icon: "📱", text: "Home Screen: Biosystema, Messages, Phone, Music, Photos, hobby apps" },
      { icon: "💬", text: "Auto-reply to work contacts: 'Personal time — available tomorrow at 8:30am'" },
      { icon: "⚙️", text: "Settings → Focus → Personal → Add Schedule → 6:00–10:30pm daily" },
    ],
  },
];

// ── AUTOMATION TIP ────────────────────────────────────────────────────────
const AUTOMATION_TIP = {
  title: "The One Automation That Ties It All Together",
  body: "In the Shortcuts app: When Deep Work Focus turns OFF → automatically turn ON Personal Focus. At 6pm, the environment shifts without you having to remember. On iPhone: Shortcuts → Automation → Focus → When Deep Work turns off → Turn on Personal.",
  icon: "⚡",
};
