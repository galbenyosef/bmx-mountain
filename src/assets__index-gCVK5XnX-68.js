// assets__index-gCVK5XnX 68 — shown
// Lines 68504-68894 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
var Tte = `
:root {
  ${Q9(`color`, Z9.color)}
  --shadow-text: 0 1px 2px var(--color-shade), 0 0 18px var(--color-glow);
  --font: ${Z9.font.family};
  --leading: ${Z9.font.leading};
  --leading-tight: ${Z9.font.leadingTight};
  --tracking: ${Z9.font.tracking};
  --easing: ${Z9.easing};
  ${Q9(`size`, Z9.size, `px`)}
  ${Q9(`weight`, Z9.weight)}
  ${Q9(`space`, Z9.space, `px`)}
  ${Q9(`radius`, Z9.radius, `px`)}
  ${Q9(`measure`, Z9.measure, `px`)}
  ${Q9(`gutter`, Z9.gutter, `px`)}
  ${Q9(`grow`, Z9.grow)}
  ${Q9(`stroke`, Z9.stroke, `px`)}
  ${Q9(`place`, Z9.place, `%`)}
  ${Q9(`motion`, Z9.motion, `ms`)}
  ${Q9(`opacity`, Z9.opacity)}
  ${Q9(`layer`, Z9.layer)}
}
body { background: var(--color-backdrop); }
kbd {
  font: inherit; font-weight: var(--weight-bold); padding: 0 var(--space-xs); border-radius: var(--radius-sm);
  background: var(--color-key);
}
`,
  Ete = `
.hud {
  position: fixed; inset: 0; z-index: var(--layer-hud); pointer-events: none; transition: opacity var(--motion-fast) var(--easing);
  color: var(--color-text); text-shadow: var(--shadow-text); letter-spacing: var(--tracking);
  font: var(--weight-medium) var(--size-md) / var(--leading) var(--font);
}
:root.menu-open .hud { opacity: 0; }
.hud .call, .hud .note, .hud .tag small, .hud .curtain { opacity: 0; transition: opacity var(--motion-medium) var(--easing); }
.hud .call {
  position: absolute; left: 50%; top: var(--place-call); transform: translate(-50%, 0); text-align: center; white-space: nowrap;
  transition-property: opacity, transform; transition-duration: var(--motion-fast);
}
.hud .call.on { opacity: 1; transform: translate(-50%, calc(-1 * var(--space-sm))); }
.hud .call b { display: block; font-size: var(--size-xl); font-weight: var(--weight-heavy); }
.hud .call small { font-size: inherit; opacity: var(--opacity-soft); }
.hud .note {
  position: absolute; left: 50%; bottom: var(--place-note); transform: translateX(-50%); white-space: nowrap;
  font-size: var(--size-sm); font-weight: var(--weight-regular);
}
.hud .note.on, .hud .tag small.on { opacity: var(--opacity-soft); }
.hud .cue + .cue { margin-left: var(--space-sm); }
.hud .curtain { position: absolute; inset: 0; background: var(--color-curtain); transition-duration: var(--motion-fast); }
.hud .curtain.on { opacity: 1; }
.hud .tag {
  position: absolute; left: 0; top: 0; text-align: center; white-space: nowrap; will-change: transform, opacity;
  font-size: var(--size-sm); font-weight: var(--weight-bold); transition: opacity var(--motion-fast) var(--easing);
}
.hud .tag small { display: block; font-size: var(--size-xs); font-weight: var(--weight-medium); }
.hud .feed {
  position: absolute; left: var(--space-lg); top: var(--space-md); opacity: var(--opacity-soft);
  font-size: var(--size-sm); font-weight: var(--weight-regular);
}
.hud .feed b { font-weight: var(--weight-bold); }
.hud .feed .line { transition: opacity var(--motion-slow) var(--easing); }
.hud .feed .line.off { opacity: 0; }
`,
  Dte = 4,
  Ote = 7,
  kte = 2.5,
  Ate = class {
    root = J9(`div`, document.body, `hud`);
    call = J9(`div`, this.root, `call`);
    note = J9(`div`, this.root, `note`);
    curtain = J9(`div`, this.root, `curtain`);
    feed = J9(`div`, this.root, `feed`);
    count = J9(`div`, this.feed);
    news = J9(`div`, this.feed);
    lines = J9(`div`, this.feed);
    tags = new Map();
    shown = new Map();
    fading = !1;
    constructor() {
      Y9(Ete);
    }
    set players(e) {
      this.count.textContent = e > 1 ? `${e} on the mountain` : ``;
    }
    outdated() {
      this.news.textContent = `A new version is out: reload to ride with everyone`;
    }
    notice(e, t) {
      let n = J9(`div`, this.lines, `line`);
      for (
        e && J9(`b`, n, ``, e).after(` `), n.append(t);
        this.lines.children.length > Dte;
      )
        this.lines.firstElementChild.remove();
      setTimeout(() => {
        (n.addEventListener(`transitionend`, () => n.remove(), { once: !0 }),
          n.classList.add(`off`));
      }, Ote * 1e3);
    }
    callout(e, t = ``, n = 1.8) {
      (this.call.replaceChildren(),
        J9(`b`, this.call, ``, e),
        t && J9(`small`, this.call, ``, t),
        this.show(this.call, n));
    }
    hint(e, t = 1 / 0) {
      this.note.replaceChildren();
      for (let [t, n] of e) {
        let e = J9(`span`, this.note, `cue`);
        (X9(e, t.split(` `).filter(Boolean)), e.append(t ? ` ${n}` : n));
      }
      this.show(this.note, t);
    }
    hideHint() {
      this.hide(this.note);
    }
    fade(e) {
      this.fading ||
        ((this.fading = !0),
        this.curtain.classList.add(`on`),
        setTimeout(() => {
          (e(),
            setTimeout(() => {
              (this.curtain.classList.remove(`on`), (this.fading = !1));
            }, Z9.motion.hold));
        }, Z9.motion.fast));
    }
    update(e) {
      for (let [t, n] of this.shown)
        n - e > 0 ? this.shown.set(t, n - e) : this.hide(t);
    }
    tag(e, t, n) {
      let r = this.tagFor(e, t).el;
      if (!n) {
        r.style.opacity = `0`;
        return;
      }
      ((r.style.opacity = String(Math.min(1, n.scale * 1.5))),
        (r.style.transform = `translate(${n.x}px, ${n.y}px) translate(-50%, -100%) scale(${0.75 + 0.25 * n.scale})`));
    }
    tagTrick(e, t) {
      let n = this.tags.get(e);
      n && ((n.trick.textContent = t), this.show(n.trick, kte));
    }
    untag(e) {
      let t = this.tags.get(e);
      t && (this.shown.delete(t.trick), t.el.remove(), this.tags.delete(e));
    }
    show(e, t) {
      (e.classList.add(`on`), this.shown.set(e, t));
    }
    hide(e) {
      (e.classList.remove(`on`), this.shown.delete(e));
    }
    tagFor(e, t) {
      let n = this.tags.get(e);
      if (!n) {
        let r = J9(`div`, this.root, `tag`);
        (J9(`span`, r, ``, t),
          (n = { el: r, trick: J9(`small`, r) }),
          this.tags.set(e, n));
      }
      return n;
    }
  },
  jte = `
.menu {
  position: fixed; inset: 0; z-index: var(--layer-menu); overflow: auto; opacity: 0; pointer-events: none;
  background: var(--color-veil); color: var(--color-text); letter-spacing: var(--tracking);
  font: var(--weight-medium) var(--size-md) / var(--leading) var(--font);
  transition: opacity var(--motion-fast) var(--easing);
}
.menu.open { opacity: 1; pointer-events: auto; }
.menu-in {
  min-height: 100%; box-sizing: border-box; display: grid; align-content: center; align-items: start;
  grid-template-columns: minmax(var(--measure-column), var(--measure-nav)) minmax(0, var(--measure-content));
  gap: var(--space-xl) clamp(var(--space-xxl), var(--grow-columns), var(--gutter-columns));
  padding: clamp(var(--space-lg), var(--grow-block), var(--gutter-block)) clamp(var(--space-xl), var(--grow-inline), var(--gutter-inline));
}
.menu h2 {
  margin: 0 0 var(--space-lg); font-size: var(--size-xxl); font-weight: var(--weight-heavy); line-height: var(--leading-tight); white-space: nowrap;
}
.menu-items { display: flex; flex-direction: column; }
.menu-items button {
  position: relative; display: flex; align-items: baseline; gap: var(--space-md);
  padding: var(--space-sm) 0 var(--space-sm) var(--space-lg); border: 0; background: none; outline: none; cursor: pointer;
  font: var(--weight-bold) var(--size-lg) var(--font); letter-spacing: inherit; text-align: left; color: var(--color-text-muted);
  transition: color var(--motion-fast) var(--easing);
}
.menu-items button::before {
  content: ""; position: absolute; left: 0; top: 50%; width: var(--space-sm); height: var(--stroke-mark); translate: 0 -50%;
  background: var(--color-text); opacity: 0; transition: opacity var(--motion-fast) var(--easing);
}
.menu-items button:focus, .menu-items button:hover { color: var(--color-text); }
.menu-items button:focus::before { opacity: 1; }
.menu-value { font-size: var(--size-md); font-weight: var(--weight-medium); color: var(--color-text-muted); }
.menu-aside { margin: var(--space-lg) 0 0 var(--space-lg); max-width: var(--measure-column); font-size: var(--size-sm); color: var(--color-text-faint); }
.menu-tip { margin: 0 0 var(--space-xl); max-width: var(--measure-tip); color: var(--color-text-soft); }
.menu h3 {
  margin: 0; padding-bottom: var(--space-sm); font-size: var(--size-sm); font-weight: var(--weight-bold);
  color: var(--color-text-muted); border-bottom: var(--stroke-hair) solid var(--color-rule);
}
.menu-groups { display: grid; grid-template-columns: 1fr 1fr; column-gap: var(--space-xxl); font-size: var(--size-sm); }
.menu-group { padding-top: var(--space-lg); }
.menu-group h4 { margin: 0 0 var(--space-xs); font-size: var(--size-xs); font-weight: var(--weight-bold); color: var(--color-text-muted); }
.menu-row {
  display: flex; justify-content: space-between; align-items: baseline; gap: var(--space-md);
  padding: var(--space-xs) 0; border-bottom: var(--stroke-hair) solid var(--color-rule-faint);
}
.menu-note { margin-left: var(--space-sm); color: var(--color-text-faint); }
.menu-keys { flex-shrink: 0; white-space: nowrap; color: var(--color-text-faint); }
.menu kbd { display: inline-block; margin-left: var(--space-xs); color: var(--color-text); }
.menu-foot { margin: var(--space-md) 0 0; font-size: var(--size-xs); color: var(--color-text-faint); }

@media (max-width: ${Z9.breakpoint.narrow}px) {
  .menu { background: var(--color-scrim); }
  .menu-in { grid-template-columns: 1fr; align-content: start; padding: var(--space-xl) var(--space-lg); }
}
@media (max-width: ${Z9.breakpoint.phone}px) {
  .menu-groups { grid-template-columns: 1fr; }
}
@media (max-height: ${Z9.breakpoint.short}px) and (min-width: ${Z9.breakpoint.narrow + 1}px) {
  .menu-in { padding-block: var(--space-lg); }
  .menu h2 { margin-bottom: var(--space-sm); font-size: var(--size-xl); }
  .menu-items button { padding-block: var(--space-xs); }
  .menu-tip { margin-bottom: var(--space-sm); }
  .menu-group { padding-top: var(--space-sm); }
  .menu-row { padding: 0; }
  .menu-note { display: none; }
}
`,
  Mte = 0.35,
  $9 = { ArrowUp: -1, KeyW: -1, ArrowDown: 1, KeyS: 1 },
  Nte = (e) => {
    let t = J9(`span`, null, `menu-keys`);
    return (
      e.forEach((e, n) => {
        (n && t.append(` / `), X9(t, e));
      }),
      t
    );
  },
  Pte = (e) => {
    let t = J9(`div`, null, `menu-row`),
      n = J9(`span`, t, ``, e.action);
    return (
      e.note && J9(`span`, n, `menu-note`, e.note),
      t.append(Nte(e.keys)),
      t
    );
  },
  Fte = (e) => {
    let t = J9(`div`, null, `menu-group`);
    return (J9(`h4`, t, ``, e.title), t.append(...e.rows.map(Pte)), t);
  },
  Ite = class {
    hooks;
    root = J9(`div`, document.body, `menu`);
    shown = !1;
    openedAt = 0;
    device;
    items = [];
    soundValue = document.createElement(`span`);
    groups;
    foot;
    constructor(e) {
      ((this.hooks = e),
        Y9(jte),
        Object.assign(this.root, {
          role: `dialog`,
          ariaModal: `true`,
          ariaLabel: `Menu`,
        }));
      let t = J9(`div`, this.root, `menu-in`),
        n = J9(`div`, t);
      J9(`h2`, n, ``, `BMX Mountain`);
      let r = J9(`nav`, n, `menu-items`);
      ((this.soundValue.className = `menu-value`),
        this.item(r, [`Resume`], () => this.close()),
        this.item(r, [`Back to the top`], () => this.leave(e.toTop)),
        this.item(r, [`Back on the trail`], () => this.leave(e.toTrail)),
        this.item(r, [`Sound `, this.soundValue], () => this.toggleSound()),
        J9(
          `p`,
          n,
          `menu-aside`,
          `The mountain carries on while you're here. You've pulled up.`,
        ));
      let i = J9(`div`, t);
      (J9(`p`, i, `menu-tip`, pte),
        J9(`h3`, i, ``, `Controls`),
        (this.groups = J9(`div`, i, `menu-groups`)),
        (this.foot = J9(`p`, i, `menu-foot`)),
        addEventListener(`keydown`, (e) => this.onKey(e)),
        addEventListener(`blur`, () => this.open()),
        addEventListener(
          `focus`,
          () =>
            this.shown &&
            !this.items.includes(document.activeElement) &&
            this.items[0].focus({ preventScroll: !0 }),
        ),
        document.addEventListener(
          `visibilitychange`,
          () => document.hidden && this.open(),
        ));
    }
    get isOpen() {
      return this.shown;
    }
    open() {
      this.shown ||
        ((this.openedAt = performance.now()),
        this.set(!0),
        this.items[0].focus({ preventScroll: !0 }));
    }
    close() {
      this.shown && (document.activeElement?.blur(), this.set(!1));
    }
    update(e, t) {
      if (t !== this.device) {
        this.device = t;
        let e = _te(t);
        (this.groups.replaceChildren(...e.groups.map(Fte)),
          (this.foot.textContent = e.note));
      }
      if (e.toggle) return this.shown ? this.close() : this.open();
      this.shown &&
        (e.step
          ? this.move(e.step)
          : e.choose
            ? document.activeElement?.click()
            : e.back && this.close());
    }
    item(e, t, n) {
      let r = J9(`button`, e);
      ((r.type = `button`),
        r.append(...t),
        r.addEventListener(`click`, n),
        r.addEventListener(`pointerenter`, () =>
          r.focus({ preventScroll: !0 }),
        ),
        this.items.push(r));
    }
    move(e) {
      let t = this.items.indexOf(document.activeElement);
      this.items[(t + e + this.items.length) % this.items.length].focus({
        preventScroll: !0,
      });
    }
    set(e) {
      ((this.shown = e),
        this.showSound(),
        this.root.classList.toggle(`open`, e),
        document.documentElement.classList.toggle(`menu-open`, e),
        this.hooks.onChange(e));
    }
    leave(e) {
      (this.close(), e());
    }
    toggleSound() {
      (this.hooks.toggleSound(), this.showSound());
    }
    showSound() {
      this.soundValue.textContent = this.hooks.isMuted() ? `Off` : `On`;
    }
    onKey(e) {
      if (!e.repeat) {
        if (e.code === `Escape`) {
          (e.preventDefault(),
            this.shown
              ? performance.now() - this.openedAt >= Mte * 1e3 && this.close()
              : this.open());
          return;
        }
        this.shown &&
          (e.code === `KeyM`
            ? this.toggleSound()
            : e.code === `KeyR`
              ? this.leave(this.hooks.toTop)
              : e.code === `KeyT`
                ? this.leave(this.hooks.toTrail)
                : $9[e.code] && (e.preventDefault(), this.move($9[e.code])));
      }
    }
  },
  Lte = 45,
  Rte = 120,
  zte = 4,
  Bte = 30;
