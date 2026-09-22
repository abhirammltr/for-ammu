/* ============================================================
   for Ammushh — configuration
   Edit the text below to customize the experience.
   ============================================================ */

const CONFIG = {
  name: "Ammushh",

  music: {
    src: "./assets/music.mp3",
    volume: 0.45
  },

  chapters: {
    ch1: {
      line1: "Good morning, {name} [[heart]]",
      line2: "You were sleepy last night..."
    },
    ch2: {
      lines: [
        "So I let you go.",
        "You needed your sleep.",
        "Which was the right thing to do...",
        "...but apparently my brain had other plans."
      ]
    },
    ch3: {
      lines: [
        "I started missing you.",
        "Your voice.",
        "Our little conversations.",
        "And honestly...",
        "I wished the call hadn't ended so soon."
      ]
    },
    ch4: {
      title: "Wait... you don't seem okay.\nLet me check — press your thumb here.",
      hint: "Hold still...",
      status: "Test complete. Results are ready.",
      headline: "Oh no... you have a serious deficiency of Vitamin Me [[wink]]",
      reportLabel: "Missing rate",
      medicine: "Don't worry, I have the medicine. [[hug]]"
    },
    ch5: {
      line1: "Come here for a second...",
      line2: "Consider this your morning hug."
    },
    ch7: {
      lines: [
        "Anyway...",
        "You should probably start your morning.",
        "Have some coffee. [[coffee]]",
        "Eat something.",
        "And don't forget...",
        "I still want that longer call."
      ]
    },
    ch8: {
      heading: "One last thing...",
      paragraphs: [
        "I don't need a special reason to miss you.",
        "Sometimes the call just ends...\nand I realize I wish it hadn't.",
        "Maybe that's what happens when someone slowly becomes such an important part of your day.",
        "Last night was just a short call,\nbut somehow you stayed on my mind long after it ended.",
        "So when you see this in the morning,\njust know...\nsomeone was missing you last night. [[heart]]"
      ]
    },
    ch9: {
      line1: "Have a beautiful day my Love [[purpleheart]]",
      line2: "Now go start your day...",
      line3: "And later, you owe me that longer call.",
      signature: "Made with a little too much love. [[heart]]",
      restart: "Read again"
    }
  }
};

/* ============================================================
   engine
   ============================================================ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fill = (str) => str.replace(/\{name\}/g, CONFIG.name);
  const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* ---------------- inline icon set (replaces emoji for a consistent, premium look) ---------------- */
  const ICONS = {
    heart: '<svg class="inline-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3S3.6 15.1 3.6 9.4C3.6 6.4 6 4 9 4c1.7 0 3.1.9 3.9 2.2C13.7 4.9 15.1 4 16.8 4c3 0 5.4 2.4 5.4 5.4 0 5.7-8.4 10.9-10.2 10.9z" fill="currentColor"/></svg>',
    coffee: '<svg class="inline-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 9h12v5.2A4.3 4.3 0 0 1 12.2 18.5H8.8A4.3 4.3 0 0 1 4.5 14.2V9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M16.5 10.3h1.2a2.35 2.35 0 1 1 0 4.7h-1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.8c-.55.75-.55 1.25 0 2M11.4 4.8c-.55.75-.55 1.25 0 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
    wink: '<svg class="inline-icon wink-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M7.3 10.2h3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="15.6" cy="10.2" r="1.15" fill="currentColor"/><path d="M8 15.2c1.2 1.1 2.6 1.6 4 1.6s2.8-.5 4-1.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    hug: '<svg class="inline-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20S4.2 15.1 4.2 9.6C4.2 6.7 6.5 4.4 9.3 4.4c1.6 0 3 .8 3.9 2C14.1 5.2 15.5 4.4 17.1 4.4c1.7 0 3.2 1 3.9 2.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9.6 8.4c-.4 2.6.3 5 2.4 6.7" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity=".65"/></svg>',
    purpleHeart: '<svg class="inline-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3S3.6 15.1 3.6 9.4C3.6 6.4 6 4 9 4c1.7 0 3.1.9 3.9 2.2C13.7 4.9 15.1 4 16.8 4c3 0 5.4 2.4 5.4 5.4 0 5.7-8.4 10.9-10.2 10.9z" fill="#8d6fc4"/></svg>'
  };
  const SPARK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.1 7.4 7.4 2.1-7.4 2.1L12 21.5l-2.1-7.4-7.4-2.1 7.4-2.1z" fill="currentColor"/></svg>';
  const HEART_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3S3.6 15.1 3.6 9.4C3.6 6.4 6 4 9 4c1.7 0 3.1.9 3.9 2.2C13.7 4.9 15.1 4 16.8 4c3 0 5.4 2.4 5.4 5.4 0 5.7-8.4 10.9-10.2 10.9z" fill="currentColor"/></svg>';
  const REPLAY_ICON = '<svg class="inline-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 1 2.5 5.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 17v-4.5h4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function injectIcons(html) {
    return html
      .replace(/\[\[heart\]\]/g, ICONS.heart)
      .replace(/\[\[coffee\]\]/g, ICONS.coffee)
      .replace(/\[\[wink\]\]/g, ICONS.wink)
      .replace(/\[\[hug\]\]/g, ICONS.hug)
      .replace(/\[\[purpleheart\]\]/g, ICONS.purpleHeart);
  }
  const textSpan = (str) => `<span>${injectIcons(escapeHtml(fill(str)))}</span>`;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpArr = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const segT = (progress, start, end) => clamp((progress - start) / (end - start), 0, 1);

  /* ---------------- one-time DOM population from CONFIG ---------------- */
  function populate() {
    const c = CONFIG.chapters;

    document.getElementById("c1-line1").innerHTML = textSpan(c.ch1.line1);
    document.getElementById("c1-line2").innerHTML = textSpan(c.ch1.line2);

    ["c2-b1", "c2-b2", "c2-b3", "c2-b4"].forEach((id, i) => {
      document.getElementById(id).innerHTML = textSpan(c.ch2.lines[i]);
    });

    ["c3-b1", "c3-b2", "c3-b3", "c3-b4", "c3-b5"].forEach((id, i) => {
      document.getElementById(id).innerHTML = textSpan(c.ch3.lines[i]);
    });

    document.getElementById("c4-title").innerHTML = textSpan(c.ch4.title);
    document.getElementById("scanner-hint").textContent = fill(c.ch4.hint);
    document.getElementById("report-status").textContent = fill(c.ch4.status);
    document.getElementById("report-headline").innerHTML = injectIcons(escapeHtml(fill(c.ch4.headline)));
    document.getElementById("report-label").textContent = fill(c.ch4.reportLabel);
    document.getElementById("c4-medicine").innerHTML = textSpan(c.ch4.medicine);

    document.getElementById("c5-b1").innerHTML = textSpan(c.ch5.line1);
    document.getElementById("c5-b2").innerHTML = textSpan(c.ch5.line2);

    ["c7-b1", "c7-b2", "c7-b3", "c7-b4", "c7-b5", "c7-b6"].forEach((id, i) => {
      document.getElementById(id).innerHTML = textSpan(c.ch7.lines[i]);
    });

    document.getElementById("letter-heading").textContent = fill(c.ch8.heading);
    const letterBody = document.getElementById("letter-body");
    c.ch8.paragraphs.forEach((p) => {
      const el = document.createElement("p");
      el.className = "reveal";
      el.innerHTML = injectIcons(escapeHtml(fill(p))).replace(/\n/g, "<br>");
      letterBody.appendChild(el);
    });

    document.getElementById("c9-b1").innerHTML = textSpan(c.ch9.line1);
    document.getElementById("c9-b2").innerHTML = textSpan(c.ch9.line2);
    document.getElementById("c9-b3").innerHTML = textSpan(c.ch9.line3);
    document.getElementById("finale-signature").innerHTML = injectIcons(escapeHtml(fill(c.ch9.signature)));
    document.getElementById("restart-btn").innerHTML = escapeHtml(fill(c.ch9.restart)) + " " + REPLAY_ICON;
  }

  /* ---------------- stars ---------------- */
  function buildStars() {
    const container = document.getElementById("stars");
    const frag = document.createDocumentFragment();
    const count = window.innerWidth < 480 ? 50 : 76;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "star";
      const size = (Math.random() * 1.6 + 1).toFixed(2);
      const o = (Math.random() * 0.5 + 0.35).toFixed(2);
      const dur = (Math.random() * 3 + 3).toFixed(2);
      const delay = (Math.random() * 4).toFixed(2);
      s.style.setProperty("--s", size + "px");
      s.style.setProperty("--o", o);
      s.style.setProperty("--dur", dur + "s");
      s.style.setProperty("--delay", delay + "s");
      s.style.left = (Math.random() * 100).toFixed(2) + "%";
      s.style.top = (Math.random() * 70).toFixed(2) + "%";
      frag.appendChild(s);
    }
    container.appendChild(frag);
  }

  /* ---------------- hug particles (pre-placed, opacity-driven) ---------------- */
  function buildHugParticles() {
    const container = document.getElementById("hug-particles");
    const positions = [
      [50, 12], [38, 18], [62, 18], [30, 28], [70, 28],
      [44, 8], [56, 8], [24, 20], [76, 20], [50, 24]
    ];
    positions.forEach((pos, i) => {
      const el = document.createElement("span");
      el.innerHTML = i % 3 === 0 ? SPARK_ICON : HEART_ICON;
      const size = 9 + (i % 3) * 4;
      el.style.left = pos[0] + "%";
      el.style.top = pos[1] + "%";
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.opacity = String(0.4 + (i % 4) * 0.15);
      container.appendChild(el);
    });
  }

  /* ---------------- beat curve helpers ---------------- */
  function beatCurve(t, opts) {
    opts = opts || {};
    const enter = opts.enter != null ? opts.enter : 0.32;
    const exit = opts.exit != null ? opts.exit : 0.32;
    const holdExit = opts.holdExit !== false;
    const yAmt = opts.y != null ? opts.y : 26;
    const blurAmt = reduceMotion ? 0 : (opts.blur != null ? opts.blur : 10);
    let o, y, b;
    if (t <= enter) {
      const k = enter > 0 ? t / enter : 1;
      o = k; y = (1 - k) * yAmt; b = (1 - k) * blurAmt;
    } else if (holdExit && t >= 1 - exit) {
      const k = exit > 0 ? (t - (1 - exit)) / exit : 1;
      o = 1 - k; y = -k * yAmt * 0.55; b = k * blurAmt;
    } else {
      o = 1; y = 0; b = 0;
    }
    return { o: clamp(o, 0, 1), y: reduceMotion ? 0 : y, b: clamp(b, 0, 40) };
  }

  function setBeat(el, curve, scale) {
    if (!el) return;
    el.style.opacity = curve.o;
    const t = scale && !reduceMotion ? `translateY(${curve.y}px) scale(${scale})` : `translateY(${curve.y}px)`;
    el.style.transform = t;
    el.style.filter = curve.b > 0.4 ? `blur(${curve.b}px)` : "none";
  }

  function sequenceUpdate(progress, elements, weights) {
    const total = weights ? weights.reduce((a, b) => a + b, 0) : elements.length;
    let acc = 0;
    elements.forEach((el, i) => {
      const w = weights ? weights[i] : 1;
      const start = acc / total;
      acc += w;
      const end = acc / total;
      const isLast = i === elements.length - 1;
      const t = segT(progress, start, end);
      const curve = beatCurve(t, { enter: 0.22, exit: isLast ? 0 : 0.22, holdExit: !isLast });
      setBeat(el, curve);
    });
  }

  /* ---------------- atmosphere (scroll-scrubbed background/orb/stars) ---------------- */

  const STOPS = [
    { p: 0.00, top: [36, 31, 56],  mid: [51, 42, 76],  bottom: [60, 50, 87],  orbX: 50, orbY: 82, orb: [233, 227, 242], alpha: .85, blur: 0,  star: 1 },
    { p: 0.09, top: [42, 34, 62],  mid: [58, 46, 78],  bottom: [70, 55, 84],  orbX: 62, orbY: 68, orb: [239, 224, 220], alpha: .55, blur: 6,  star: .88 },
    { p: 0.20, top: [52, 38, 62],  mid: [76, 52, 66],  bottom: [92, 63, 62],  orbX: 74, orbY: 46, orb: [243, 196, 168], alpha: .38, blur: 12, star: .62 },
    { p: 0.32, top: [66, 43, 55],  mid: [98, 62, 55],  bottom: [128, 78, 58], orbX: 80, orbY: 26, orb: [246, 184, 119], alpha: .4,  blur: 12, star: .32 },
    { p: 0.43, top: [86, 55, 52],  mid: [130, 82, 61],  bottom: [163, 106, 65], orbX: 78, orbY: 14, orb: [252, 196, 115], alpha: .48, blur: 9,  star: .12 },
    { p: 0.53, top: [117, 71, 55], mid: [163, 104, 66], bottom: [201, 133, 68], orbX: 66, orbY: 8,  orb: [255, 193, 111], alpha: .6,  blur: 6,  star: .04 },
    { p: 0.65, top: [166, 104, 65],mid: [206, 143, 90], bottom: [235, 178, 118], orbX: 55, orbY: 8, orb: [255, 199, 116], alpha: .8,  blur: 2,  star: 0 },
    { p: 0.78, top: [221, 175, 122],mid: [238, 202, 149], bottom: [250, 232, 203], orbX: 50, orbY: 11, orb: [255, 210, 122], alpha: .95, blur: 0, star: 0 },
    { p: 1.00, top: [253, 243, 227],mid: [251, 230, 198], bottom: [246, 217, 170], orbX: 50, orbY: 9,  orb: [255, 210, 122], alpha: 1,   blur: 0, star: 0 }
  ];

  const bgEl = document.getElementById("bg");
  const orbEl = document.getElementById("orb");
  const starsEl = document.getElementById("stars");

  function rgb(a) { return `${a[0] | 0},${a[1] | 0},${a[2] | 0}`; }

  function updateAtmosphere(progress) {
    let i = 0;
    while (i < STOPS.length - 2 && progress > STOPS[i + 1].p) i++;
    const a = STOPS[i];
    const b = STOPS[i + 1];
    const t = (progress - a.p) / (b.p - a.p || 1);

    const top = lerpArr(a.top, b.top, t);
    const mid = lerpArr(a.mid, b.mid, t);
    const bottom = lerpArr(a.bottom, b.bottom, t);
    bgEl.style.background = `radial-gradient(120% 90% at 50% 0%, rgb(${rgb(top)}) 0%, rgb(${rgb(mid)}) 55%, rgb(${rgb(bottom)}) 100%)`;

    const orbX = lerp(a.orbX, b.orbX, t);
    const orbY = lerp(a.orbY, b.orbY, t);
    const orbColor = lerpArr(a.orb, b.orb, t);
    const orbAlpha = lerp(a.alpha, b.alpha, t);
    const orbBlur = lerp(a.blur, b.blur, t);
    const dx = ((orbX - 50) / 100) * window.innerWidth;
    const dy = ((orbY - 50) / 100) * window.innerHeight;
    const scale = 0.82 + progress * 0.4;
    orbEl.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(${scale})`;
    orbEl.style.background = `radial-gradient(circle at 35% 30%, rgb(${rgb(orbColor.map((v) => Math.min(255, v + 14)))}), rgb(${rgb(orbColor)}))`;
    orbEl.style.opacity = orbAlpha;
    orbEl.style.filter = orbBlur > 0.4 ? `blur(${orbBlur}px)` : "none";

    const starOpacity = lerp(a.star, b.star, t);
    starsEl.style.opacity = starOpacity;
    if (!reduceMotion) {
      starsEl.style.transform = `translateY(${-progress * 30}px)`;
    }

    document.body.classList.toggle("tone-is-warm", progress > 0.6);
  }

  /* ---------------- chapter registry ---------------- */

  function computeLocalProgress(section) {
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return rect.top <= 0 ? 1 : 0;
    return clamp(-rect.top / total, 0, 1);
  }

  const chapters = [];

  function registerChapter(id, updateFn) {
    const el = document.getElementById(id);
    if (!el) return;
    const entry = { el, updateFn, active: false, progress: 0 };
    chapters.push(entry);
  }

  /* ---- chapter 1 ---- */
  function updateCh1(progress) {
    const line1 = document.getElementById("c1-line1");
    const line2 = document.getElementById("c1-line2");
    if (progress < 0.015 && !line1.dataset.settled) {
      // let the CSS entrance handle the very first frame; nothing to do
      return;
    }
    if (!line1.dataset.settled) {
      line1.style.transition = "none";
    }
    line1.dataset.settled = "1";
    const c1 = beatCurve(segT(progress, 0, 0.5), { enter: 0, exit: 0.6, holdExit: true, y: 14 });
    setBeat(line1, { o: c1.o, y: c1.y, b: c1.b });
    const c2 = beatCurve(segT(progress, 0.35, 1), { enter: 0.4, exit: 0, holdExit: false });
    setBeat(line2, c2);
  }

  /* ---- chapter 2 ---- */
  function updateCh2(progress) {
    sequenceUpdate(progress, [
      document.getElementById("c2-b1"),
      document.getElementById("c2-b2"),
      document.getElementById("c2-b3"),
      document.getElementById("c2-b4")
    ]);
  }

  /* ---- chapter 3 ---- */
  function updateCh3(progress) {
    sequenceUpdate(progress, [
      document.getElementById("c3-b1"),
      document.getElementById("c3-b2"),
      document.getElementById("c3-b3"),
      document.getElementById("c3-b4"),
      document.getElementById("c3-b5")
    ], [2.4, 1, 1, 1, 1.6]);
  }

  /* ---- chapter 4 (thumb scan) ---- */
  const RING_C = 2 * Math.PI * 54;
  const SCAN_DURATION = 2500;
  let scanState = "idle"; // idle | scanning | complete
  let scanStartTime = 0;
  let scanRAF = null;
  let scanHintTimer = null;

  function setScanRing(t) {
    document.getElementById("meter-number").textContent = Math.round(t * 100) + "%";
    document.getElementById("meter-ring-fill").style.strokeDashoffset = String(RING_C * (1 - t));
    const glow = document.getElementById("meter-glow");
    const glowScale = 0.6 + t * 0.65;
    glow.style.opacity = String(0.2 + t * 0.7);
    glow.style.transform = reduceMotion ? "translate(-50%, -50%)" : `translate(-50%, -50%) scale(${glowScale})`;
  }

  function scanTick() {
    if (scanState !== "scanning") return;
    const t = clamp((performance.now() - scanStartTime) / SCAN_DURATION, 0, 1);
    setScanRing(t);
    if (t >= 1) {
      completeScan();
      return;
    }
    scanRAF = requestAnimationFrame(scanTick);
  }

  function startScan() {
    if (scanState === "complete" || scanState === "scanning") return;
    scanState = "scanning";
    scanStartTime = performance.now();
    document.getElementById("scanner-pad").classList.add("scanning");
    document.getElementById("scanner-hint").classList.remove("show");
    if (scanHintTimer) clearTimeout(scanHintTimer);
    if (scanRAF) cancelAnimationFrame(scanRAF);
    scanRAF = requestAnimationFrame(scanTick);

    const titleEl = document.getElementById("c4-title");
    titleEl.style.transition = "opacity .6s var(--ease-soft), filter .6s var(--ease-soft), transform .6s var(--ease-soft)";
    titleEl.style.opacity = "0";
    titleEl.style.transform = "translateY(-10px)";
    titleEl.style.filter = reduceMotion ? "none" : "blur(4px)";
  }

  function cancelScan() {
    if (scanState !== "scanning") return;
    scanState = "idle";
    if (scanRAF) cancelAnimationFrame(scanRAF);
    setScanRing(0);
    document.getElementById("scanner-pad").classList.remove("scanning");
    const hint = document.getElementById("scanner-hint");
    hint.classList.add("show");
    if (scanHintTimer) clearTimeout(scanHintTimer);
    scanHintTimer = setTimeout(() => hint.classList.remove("show"), 1800);

    const titleEl = document.getElementById("c4-title");
    titleEl.style.opacity = "";
    titleEl.style.transform = "";
    titleEl.style.filter = "";
    titleEl.style.transition = "";
  }

  function completeScan() {
    scanState = "complete";
    const pad = document.getElementById("scanner-pad");
    pad.classList.remove("scanning");
    pad.classList.add("complete");
    document.getElementById("scanner-hint").classList.remove("show");
    setTimeout(() => {
      document.getElementById("scanner-wrap").classList.add("done");
    }, reduceMotion ? 100 : 500);
    setTimeout(() => {
      document.getElementById("report-card").classList.add("show");
    }, reduceMotion ? 200 : 950);
  }

  function resetScan() {
    scanState = "idle";
    if (scanRAF) cancelAnimationFrame(scanRAF);
    setScanRing(0);
    const pad = document.getElementById("scanner-pad");
    pad.classList.remove("scanning", "complete");
    document.getElementById("scanner-wrap").classList.remove("done");
    const reportEl = document.getElementById("report-card");
    reportEl.classList.remove("show");
    reportEl.style.opacity = "";
    reportEl.style.transition = "";
    document.getElementById("scanner-hint").classList.remove("show");

    const titleEl = document.getElementById("c4-title");
    titleEl.style.opacity = "";
    titleEl.style.transform = "";
    titleEl.style.filter = "";
    titleEl.style.transition = "";
  }

  function setupScanner() {
    const pad = document.getElementById("scanner-pad");
    pad.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      try { pad.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      startScan();
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach((evt) => {
      pad.addEventListener(evt, cancelScan);
    });
    // Android/older WebKit can still fire these on long-press even with the CSS guards.
    pad.addEventListener("contextmenu", (e) => e.preventDefault());
    pad.addEventListener("dragstart", (e) => e.preventDefault());
    pad.addEventListener("selectstart", (e) => e.preventDefault());
    pad.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); startScan(); }
    });
    pad.addEventListener("keyup", (e) => {
      if (e.key === " " || e.key === "Enter") cancelScan();
    });
  }

  function updateCh4(progress) {
    if (scanState === "idle") {
      setBeat(document.getElementById("c4-title"), beatCurve(segT(progress, 0, 0.14), { enter: 0.5, exit: 0, holdExit: false }));
    }

    const reportEl = document.getElementById("report-card");
    const dismissT = segT(progress, 0.86, 0.97);
    if (scanState === "complete" && dismissT > 0) {
      reportEl.style.transition = "none";
      reportEl.style.opacity = String(1 - dismissT);
    } else if (reportEl.style.opacity !== "") {
      reportEl.style.opacity = "";
      reportEl.style.transition = "";
    }

    const medCurve = beatCurve(segT(progress, 0.9, 1.0), { enter: 0.5, exit: 0, holdExit: false });
    setBeat(document.getElementById("c4-medicine"), {
      o: scanState === "complete" ? medCurve.o : 0,
      y: medCurve.y,
      b: medCurve.b
    });
  }

  /* ---- chapter 5 (hug) ---- */
  function updateCh5(progress) {
    setBeat(document.getElementById("c5-b1"), beatCurve(segT(progress, 0, 0.3), { enter: 0.3, exit: 0.3 }));

    const approachT = easeOutCubic(segT(progress, 0.16, 0.6));
    const maxOffset = Math.min(150, window.innerWidth * 0.32);
    const meetOffset = Math.min(30, window.innerWidth * 0.08);
    const dx = reduceMotion ? meetOffset : lerp(maxOffset, meetOffset, approachT);

    const meetT = segT(progress, 0.5, 0.68);
    const bounce = reduceMotion ? (meetT > 0 ? 1 : 0) : Math.sin(clamp(meetT, 0, 1) * Math.PI * 0.5);
    const squeeze = 1 + bounce * 0.08;
    const lean = reduceMotion ? 0 : bounce * 6;

    const orbA = document.getElementById("hug-orb-a");
    const orbB = document.getElementById("hug-orb-b");
    orbA.style.transform = `translate(calc(-50% - ${dx}px), -50%) rotate(${lean}deg) scale(${squeeze})`;
    orbB.style.transform = `translate(calc(-50% + ${dx}px), -50%) rotate(${-lean}deg) scale(${squeeze})`;
    const glowT = segT(progress, 0.4, 0.68);
    const orbOpacity = String(0.55 + glowT * 0.45);
    orbA.style.opacity = orbOpacity;
    orbB.style.opacity = orbOpacity;

    document.getElementById("hug-orbs").classList.toggle("meeting", meetT > 0.7);

    setBeat(document.getElementById("c5-b2"), beatCurve(segT(progress, 0.74, 0.92), { enter: 0.5, exit: 0, holdExit: false }));

    document.getElementById("hug-particles").style.opacity = String(segT(progress, 0.66, 0.95));
  }

  /* ---- chapter 7 ---- */
  function updateCh7(progress) {
    sequenceUpdate(progress, [
      document.getElementById("c7-b1"),
      document.getElementById("c7-b2"),
      document.getElementById("c7-b3"),
      document.getElementById("c7-b4"),
      document.getElementById("c7-b5"),
      document.getElementById("c7-b6")
    ], [0.7, 1.1, 1, 1, 0.7, 1.3]);
  }

  /* ---- chapter 9 (finale) ---- */
  function updateCh9(progress) {
    setBeat(document.getElementById("c9-b1"), beatCurve(segT(progress, 0, 0.34), { enter: 0.4, exit: 0.28 }));
    setBeat(document.getElementById("c9-b2"), beatCurve(segT(progress, 0.3, 0.62), { enter: 0.4, exit: 0.28 }));
    setBeat(document.getElementById("c9-b3"), beatCurve(segT(progress, 0.58, 0.86), { enter: 0.4, exit: 0, holdExit: false }));

    const sig = document.getElementById("finale-signature");
    const restart = document.getElementById("restart-btn");
    if (progress > 0.78) {
      sig.classList.add("in");
      restart.classList.add("in");
    } else if (progress < 0.5) {
      sig.classList.remove("in");
      restart.classList.remove("in");
    }
  }

  registerChapter("ch1", updateCh1);
  registerChapter("ch2", updateCh2);
  registerChapter("ch3", updateCh3);
  registerChapter("ch4", updateCh4);
  registerChapter("ch5", updateCh5);
  registerChapter("ch7", updateCh7);
  registerChapter("ch9", updateCh9);

  /* ---------------- chapter 1 initial entrance (time-based, one-off) ---------------- */
  function runOpeningEntrance() {
    const line1 = document.getElementById("c1-line1");
    line1.style.transition = `opacity 1.3s var(--ease-soft, ease), transform 1.3s var(--ease-soft, ease), filter 1.3s var(--ease-soft, ease)`;
    line1.style.opacity = "0";
    line1.style.transform = "translateY(16px)";
    line1.style.filter = reduceMotion ? "none" : "blur(10px)";
    requestAnimationFrame(() => {
      setTimeout(() => {
        line1.style.opacity = "1";
        line1.style.transform = "translateY(0)";
        line1.style.filter = "none";
      }, reduceMotion ? 60 : 500);
    });
  }

  /* ---------------- IntersectionObserver activation ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const match = chapters.find((c) => c.el === entry.target);
      if (match) match.active = entry.isIntersecting;
    });
  }, { rootMargin: "20% 0px 20% 0px", threshold: 0 });

  chapters.forEach((c) => io.observe(c.el));

  /* ---------------- letter reveal (IntersectionObserver, one-time) ---------------- */
  function setupLetterReveal() {
    const targets = document.querySelectorAll("#ch8 .reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    targets.forEach((t) => obs.observe(t));
  }

  /* ---------------- main scroll loop ---------------- */
  let ticking = false;
  let lastChapterLabel = "";

  function frame() {
    ticking = false;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const globalProgress = scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;

    updateAtmosphere(globalProgress);
    document.getElementById("progress-fill").style.width = (globalProgress * 100).toFixed(2) + "%";

    chapters.forEach((c) => {
      if (!c.active) return;
      const p = computeLocalProgress(c.el);
      c.updateFn(p);
      if (p > 0.05 && p < 0.95) {
        const label = "Chapter " + c.el.dataset.chapter;
        if (label !== lastChapterLabel) {
          lastChapterLabel = label;
          document.getElementById("sr-status").textContent = label;
        }
      }
    });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(frame);
    }
    armIdleHint();
  }

  /* ---------------- idle scroll hint (reappears after 5s of no scrolling) ---------------- */
  let idleTimer = null;
  function armIdleHint() {
    const hint = document.getElementById("scroll-hint");
    hint.classList.remove("visible");
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      const doc = document.documentElement;
      const atEnd = window.scrollY + window.innerHeight >= doc.scrollHeight - 4;
      if (!atEnd) hint.classList.add("visible");
    }, 5000);
  }

  /* ---------------- music toggle ---------------- */
  function setupMusic() {
    const audio = document.getElementById("bg-audio");
    const btn = document.getElementById("music-toggle");
    const iconNote = document.getElementById("icon-note");
    const iconPause = document.getElementById("icon-pause");
    audio.volume = CONFIG.music.volume;

    btn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => {
          btn.setAttribute("aria-pressed", "true");
          btn.setAttribute("aria-label", "Pause music");
          iconNote.classList.add("icon-hidden");
          iconPause.classList.remove("icon-hidden");
        }).catch(() => {
          btn.setAttribute("aria-pressed", "true");
          btn.setAttribute("aria-label", "Sound on");
          iconNote.classList.add("icon-hidden");
          iconPause.classList.remove("icon-hidden");
        });
      } else {
        audio.pause();
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("aria-label", "Play soft music");
        iconNote.classList.remove("icon-hidden");
        iconPause.classList.add("icon-hidden");
      }
    });
  }

  /* ---------------- restart ---------------- */
  function setupRestart() {
    document.getElementById("restart-btn").addEventListener("click", () => {
      resetScan();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------- init ---------------- */
  function init() {
    populate();
    buildStars();
    buildHugParticles();
    setupMusic();
    setupScanner();
    setupRestart();
    setupLetterReveal();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    runOpeningEntrance();
    armIdleHint();
    frame();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
