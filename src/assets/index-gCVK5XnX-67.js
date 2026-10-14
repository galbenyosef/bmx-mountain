// assets/index-gCVK5XnX 67 — block
// Lines 68447-68503 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function J9(e, t, n = ``, r = ``) {
  let i = document.createElement(e);
  return (n && (i.className = n), r && (i.textContent = r), t?.append(i), i);
}
function Y9(e) {
  J9(`style`, document.head, ``, e);
}
function X9(e, t) {
  for (let n of t) J9(`kbd`, e, ``, n);
}
var Z9 = {
    color: {
      text: `#fff`,
      textSoft: `rgba(255, 255, 255, 0.72)`,
      textMuted: `rgba(255, 255, 255, 0.5)`,
      textFaint: `rgba(255, 255, 255, 0.34)`,
      rule: `rgba(255, 255, 255, 0.18)`,
      ruleFaint: `rgba(255, 255, 255, 0.08)`,
      veil: `linear-gradient(90deg, rgba(10, 12, 14, 0.88), rgba(10, 12, 14, 0.76) 55%, rgba(10, 12, 14, 0.5))`,
      scrim: `rgba(10, 12, 14, 0.86)`,
      shade: `rgba(0, 0, 0, 0.45)`,
      glow: `rgba(0, 0, 0, 0.25)`,
      key: `rgba(255, 255, 255, 0.16)`,
      curtain: `#000`,
      backdrop: `linear-gradient(to bottom, #5d86b8 0%, #e9b98a 55%, #2b3326 56%, #1c2219 100%)`,
    },
    font: {
      family: `ui-rounded, "SF Pro Rounded", system-ui, -apple-system, "Segoe UI", sans-serif`,
      leading: 1.3,
      leadingTight: 1,
      tracking: `0.01em`,
    },
    size: { xs: 12, sm: 13, md: 15, lg: 22, xl: 26, xxl: 44 },
    weight: { regular: 550, medium: 600, bold: 700, heavy: 750 },
    space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 40 },
    radius: { sm: 4 },
    measure: { column: 240, nav: 300, tip: 560, content: 640 },
    gutter: { columns: 96, block: 72, inline: 120 },
    grow: { columns: `6vw`, block: `6vh`, inline: `7vw` },
    stroke: { hair: 1, mark: 2 },
    place: { call: 12, note: 8 },
    breakpoint: { narrow: 760, phone: 480, short: 560 },
    opacity: { soft: 0.85 },
    motion: { fast: 300, medium: 500, slow: 800, hold: 60 },
    easing: `ease`,
    layer: { hud: 5, menu: 10 },
  },
  Q9 = (e, t, n = ``) =>
    Object.entries(t)
      .map(
        ([t, r]) =>
          `--${e}-${t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`)}: ${r}${n};`,
      )
      .join(` `);
function wte() {
  Y9(Tte);
}
