// assets/index-gCVK5XnX 66 — action
// Lines 67881-68446 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var $ee = class {
    terrain;
    pos = new Fr(new Float32Array(A9 * 4 * 3), 3);
    nor = new Fr(new Float32Array(A9 * 4 * 3), 3);
    alpha = new Fr(new Float32Array(A9 * 4), 1);
    spot = dH(2, 4);
    along = dH(2, 4);
    across = dH(2, 3);
    tracks = Zee(this.pos, this.nor, this.alpha);
    shadows = Qee(this.spot, this.along, this.across);
    next = 0;
    last = [null, null];
    lastAlpha = [0, 0];
    fresh = [];
    constructor(e) {
      this.terrain = e;
    }
    update(e, t) {
      let n = e.mode === `ride`,
        r = n ? Jee[e.surface] : 0;
      for (let t = 0; t < 2; t++) {
        let i = e.under[t],
          a = n && e.contact[t] && r > 0,
          o = a ? Math.min(0.75, r * (1 + e.skid * 1.8)) : 0,
          s = this.last[t];
        a
          ? s
            ? Math.hypot(i.x - s.x, i.z - s.z) >= qee &&
              (this.piece(s, i, this.lastAlpha[t], o, Yee + 0.032 * e.skid),
              s.set(i.x, i.y, i.z),
              (this.lastAlpha[t] = o))
            : ((this.last[t] = new M(i.x, i.y, i.z)), (this.lastAlpha[t] = o))
          : (this.last[t] = null);
      }
      if (this.fresh.length) {
        for (let e of [this.pos, this.nor, this.alpha]) {
          e.clearUpdateRanges();
          for (let t of this.fresh)
            e.addUpdateRange(t * 4 * e.itemSize, 4 * e.itemSize);
          e.needsUpdate = !0;
        }
        this.fresh.length = 0;
      }
      this.shade(e, t);
    }
    piece(e, t, n, r, i) {
      let a = this.next;
      ((this.next = (a + 1) % A9),
        P9.set(-(t.z - e.z), 0, t.x - e.x)
          .normalize()
          .multiplyScalar(i));
      let o = this.pos.array,
        s = this.nor.array,
        c = this.alpha.array;
      ([
        [e.x - P9.x, e.y + N9, e.z - P9.z, n],
        [e.x + P9.x, e.y + N9, e.z + P9.z, n],
        [t.x - P9.x, t.y + N9, t.z - P9.z, r],
        [t.x + P9.x, t.y + N9, t.z + P9.z, r],
      ].forEach(([e, n, r, i], l) => {
        let u = a * 4 + l;
        (o.set([e, n, r], u * 3), s.set([t.nx, t.ny, t.nz], u * 3), (c[u] = i));
      }),
        this.fresh.push(a));
      let l = this.tracks.geometry;
      l.drawRange.count = Math.max(l.drawRange.count, (a + 1) * 6);
    }
    shade(e, t) {
      let n = this.spot.array,
        r = this.along.array,
        i = this.across.array;
      (t.forEach((t, a) => {
        let o = this.terrain.height(t.x, t.z),
          s = Math.max(0, t.y - J.wheelRadius - o),
          c = e.mode === `crash` ? 0 : Math.max(0, 1 - s / M9),
          l = this.terrain.normal(t.x, t.z, Xee, 0.4);
        (I9.set(-Math.sin(e.yaw), 0, -Math.cos(e.yaw)),
          I9.addScaledVector(F9.set(l[0], l[1], l[2]), -I9.dot(F9)).normalize(),
          L9.crossVectors(I9, F9),
          n.set([t.x, o + 0.02, t.z, 0.42 * c * c], a * 4),
          r.set([I9.x, I9.y, I9.z, 1 - Math.min(1, s / M9) * 0.8], a * 4),
          i.set([L9.x, L9.y, L9.z], a * 3));
      }),
        sH(this.spot, 2),
        sH(this.along, 2),
        sH(this.across, 2));
    }
  },
  R9 = 220,
  z9 = 18,
  B9 = 16,
  ete = 28,
  tte = 0.028,
  nte = 0.012,
  rte = class {
    mesh;
    vel = MV(new M());
    constructor() {
      let e = QV(),
        t = HF(9),
        n = new Float32Array(880);
      for (let e = 0; e < R9; e++)
        n.set([t() * z9, t() * z9, t() * z9, t()], e * 4);
      (e.setAttribute(`mote`, new Vi(n, 4)), (e.instanceCount = R9));
      let r = new Wy({ transparent: !0, depthWrite: !1, blending: 2 }),
        i = oB(`mote`, `vec4`),
        a = i.xyz.add(xB(lB.sub(i.xyz).div(z9).add(0.5)).mul(z9)),
        o = this.vel,
        s = MB(o),
        c = o.div(VB(s, 0.001)),
        l = eV(gB(c, eV(lB.sub(a))).add($(0, 1e-4, 0))),
        u = oV;
      r.positionNode = a
        .add(c.mul(u.y.mul(s.mul(tte))))
        .add(l.mul(u.x.mul(nte)));
      let d = MB(a.sub(lB)),
        f = Q(1.2, -0.5, a.y.sub(lB.y)),
        p = Q(0.5, 0.2, MB(FV().sub(0.5).mul(LV(2, 1)))),
        m = Q(B9, ete, s)
          .mul(Q(1.5, 3, d))
          .mul(Q(z9 * 0.5, z9 * 0.3, d))
          .mul(f),
        h = p.mul(m).mul(i.w.mul(0.5).add(0.5)).mul(0.16);
      ((r.colorNode = RV(gW.mul(0.25).add(0.08), h)),
        (r.fog = !1),
        (r.alphaTestNode = Z(0.002)),
        (r.mrtNode = zU()),
        (this.mesh = new wi(e, r)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = 6));
    }
    update(e) {
      (this.vel.value.copy(e), (this.mesh.visible = e.length() > B9));
    }
  },
  ite = 0.05,
  ate = 0.12,
  ote = 0.3,
  ste = 28,
  cte = 0.35,
  lte = 0.15,
  ute = 0.15,
  dte = 0.3,
  fte = class {
    hits = [];
    time = 0;
    sentAt = -1 / 0;
    on = !1;
    pad = null;
    thumpAt = 0;
    hit(e, t, n, r = 0) {
      (this.hits.push({ at: this.time + r, strong: e, weak: t, len: n }),
        r === 0 && (this.sentAt = -1 / 0));
    }
    pop() {
      this.hit(0.25, 0.1, 0.06);
    }
    land(e, t, n, r) {
      let i = Y(e / 12);
      if ((this.hit(0.1 + 0.8 * i, 0.15 + 0.5 * i, 0.1 + 0.15 * i), n))
        for (let e of [0.1, 0.19]) this.hit(0, 0.55, 0.045, e);
      else t && this.hit(0, 0.4, 0.05, 0.1);
      r && this.hit(0.35, 0.1, 0.35, 0.08);
    }
    crash() {
      this.hit(1, 0.8, 0.35);
    }
    tumble(e) {
      if (e < 1.5 || this.time - this.thumpAt < 0.06) return;
      this.thumpAt = this.time;
      let t = Y((e - 1.5) / 10);
      this.hit(0.2 + 0.6 * t, 0.15 + 0.4 * t, 0.08 + 0.08 * t);
    }
    slam(e) {
      e > 0.01 && this.hit(0.6 * e, 0.3 * e, 0.12);
    }
    sheaves() {
      for (let e = 0; e < 4; e++) this.hit(0.12, 0.25, 0.04, e * 0.14);
    }
    update(e, t, n) {
      this.time += e;
      let r = this.time;
      t.bump >= 0 && this.hit(0.1 + 0.3 * t.bump, 0.15 + 0.3 * t.bump, 0.07);
      let i = 0,
        a = 0;
      (t.rolling &&
        ((a = dz[t.surface] * Y(t.speed / ste) * ote),
        (a = Math.max(a, t.skid * Y(t.speed / 3) * cte)),
        (i = Math.max(Y((t.carve - 0.8) / 1.2) * lte, t.pump * ute))),
        (a = Math.max(a, Y(Math.max(t.scrape, t.bikeScrape) / 10) * dte)),
        (this.hits = this.hits.filter((e) => r < e.at + e.len)));
      for (let e of this.hits) {
        if (r < e.at) continue;
        let t = 1 - (r - e.at) / e.len;
        ((i += e.strong * t), (a += e.weak * t));
      }
      this.send(n, Y(i), Y(a));
    }
    send(e, t, n) {
      let r = t > 0.01 || n > 0.01;
      if (
        !(
          (e?.index !== this.pad?.index || !r) &&
          (this.on && this.stop(), !r)
        ) &&
        ((this.pad = e), !(!e || this.time - this.sentAt < ite))
      ) {
        ((this.sentAt = this.time), (this.on = !0));
        try {
          e.vibrationActuator
            ?.playEffect(`dual-rumble`, {
              duration: ate * 1e3,
              strongMagnitude: t,
              weakMagnitude: n,
            })
            .catch(() => {});
        } catch {}
      }
    }
    stop() {
      ((this.on = !1), (this.sentAt = -1 / 0));
      try {
        this.pad?.vibrationActuator?.reset().catch(() => {});
      } catch {}
    }
  },
  V9 = {
    ride: [
      [`W`, `pedal`],
      [`A D`, `steer`],
      [`S`, `brake`],
      [`Space`, `hold & release to pop`],
      [`S Space`, `manual`],
      [``, `in the air:`],
      [`W S`, `flip`],
      [`A D`, `spin`],
      [`Space`, `tuck`],
      [`J K L U I O P`, `tricks`],
      [`E`, `get off`],
      [`Esc`, `menu`],
    ],
    foot: [
      [`W A S D`, `jog`],
      [`Shift`, `sprint`],
      [`Mouse`, `look around`],
      [`E`, `get back on`],
    ],
    tooFast: [[``, `Slow down to get off`]],
    queued: [[`Space`, `skip the ride up`]],
    lift: [
      [`Mouse`, `look around`],
      [`Space`, `skip the ride up`],
    ],
    lost: [[`T`, `back to the trail`]],
    down: [[`Space`, `get back on`]],
    finished: [
      [``, `Ride on into the chairlift, or`],
      [`R`, `back to the top`],
    ],
  },
  pte = `Pedal down the trail and pop off each lip. Land square on the far slope's sweet spot for a perfect landing that keeps your speed. Tricks, manuals and perfect landings one after another make a chain, each worth more: land sketchy and it's banked, crash and it's lost.`,
  H9 = (e, t) => (t ? [{ action: e, keys: t }] : []),
  U9 = (e) => [
    {
      title: `Riding`,
      rows: [
        { action: `Pedal`, keys: e.pedal },
        { action: `Steer`, keys: e.steer },
        { action: `Brake`, keys: e.brake },
        { action: `Pop`, keys: e.pop, note: `hold, release` },
        { action: `Pump`, keys: e.pop, note: `release down a roller` },
        { action: `Manual`, keys: e.manual },
        { action: `Wheelie`, keys: e.wheelie },
      ],
    },
    {
      title: `In the air`,
      rows: [
        { action: `Flip`, keys: e.flip },
        { action: `Spin`, keys: e.steer },
        { action: `Whip`, keys: e.steer, note: `tap` },
        { action: `Tuck`, keys: e.pop, note: `turn faster` },
        { action: `Barspin`, keys: e.barspin },
        { action: `Tailwhip`, keys: e.tailwhip },
        { action: `No-hander`, keys: e.nohand },
        { action: `Superman`, keys: e.superman },
        { action: `Can-can`, keys: e.canCan },
        { action: `Turndown`, keys: e.turndown },
        { action: `Tabletop`, keys: e.tabletop },
      ],
    },
    {
      title: `Coming down`,
      rows: [
        { action: `Absorb a landing`, keys: e.pop, note: `just before` },
        { action: `Get back on`, keys: e.pop, note: `after a crash` },
      ],
    },
    {
      title: `On foot`,
      rows: [
        { action: `Get off, back on`, keys: e.getOff, note: `stopped` },
        { action: `Jog`, keys: e.walk },
        { action: `Sprint`, keys: e.run },
      ],
    },
    {
      title: `Anytime`,
      rows: [
        {
          action: `Look around`,
          keys: e.look,
          note: `on foot, on the chairlift`,
        },
        { action: `Skip the chairlift`, keys: e.pop },
        { action: `Back to the top`, keys: e.top },
        ...H9(`Back on the trail`, e.trail),
        ...H9(`Sound`, e.sound),
        { action: `Menu`, keys: e.menu },
      ],
    },
  ],
  mte = {
    groups: U9({
      pedal: [[`W`]],
      steer: [[`A`], [`D`]],
      brake: [[`S`]],
      pop: [[`Space`]],
      manual: [[`S`, `Space`]],
      wheelie: [[`S`, `W`]],
      flip: [[`W`], [`S`]],
      barspin: [[`J`], [`Shift`]],
      tailwhip: [[`K`]],
      nohand: [[`L`]],
      superman: [[`U`]],
      canCan: [[`I`]],
      turndown: [[`O`]],
      tabletop: [[`P`]],
      top: [[`R`]],
      trail: [[`T`]],
      sound: [[`M`]],
      look: [[`Mouse`]],
      getOff: [[`E`]],
      walk: [[`W`], [`A`], [`S`], [`D`]],
      run: [[`Shift`]],
      menu: [[`Esc`]],
    }),
    note: `Arrow keys work too.`,
  },
  hte = {
    xbox: {
      a: `A`,
      b: `B`,
      x: `X`,
      y: `Y`,
      lb: `LB`,
      rb: `RB`,
      lt: `LT`,
      rt: `RT`,
      view: `View`,
      menu: `Menu`,
    },
    playstation: {
      a: `✕`,
      b: `○`,
      x: `□`,
      y: `△`,
      lb: `L1`,
      rb: `R1`,
      lt: `L2`,
      rt: `R2`,
      view: `Create`,
      menu: `Options`,
    },
    nintendo: {
      a: `B`,
      b: `A`,
      x: `Y`,
      y: `X`,
      lb: `L`,
      rb: `R`,
      lt: `ZL`,
      rt: `ZR`,
      view: `−`,
      menu: `+`,
    },
  },
  gte = (e) => ({
    groups: U9({
      pedal: [[e.rt]],
      steer: [[`Stick ←→`]],
      brake: [[e.lt]],
      pop: [[e.a]],
      manual: [[e.lt, e.a]],
      wheelie: [[e.lt, e.rt]],
      flip: [[`Stick ↑↓`]],
      barspin: [[e.x], [e.rb]],
      tailwhip: [[e.y], [e.lb]],
      nohand: [[e.b]],
      superman: [[`D-pad ↑`]],
      canCan: [[`D-pad ←`]],
      turndown: [[`D-pad →`]],
      tabletop: [[`D-pad ↓`]],
      top: [[e.view]],
      look: [[`Right stick`]],
      getOff: [[e.y]],
      walk: [[`Stick`]],
      run: [[`Stick, full`]],
      menu: [[e.menu]],
    }),
    note: `The stick pedals and brakes too.`,
  }),
  _te = (e) => (e ? gte(hte[e]) : mte),
  W9 = (e) => {
    let t = Math.floor(e / 60);
    return `${t}:${(e - t * 60).toFixed(1).padStart(4, `0`)}`;
  },
  vte = [
    [`SPIN_360`, [`360`, `540`, `720`, `900`, `1080`]],
    [`SPIN_720`, [`720`, `900`, `1080`]],
    [`BACKFLIP`, [`Backflip`]],
    [`FRONTFLIP`, [`Frontflip`]],
    [`BARSPIN`, [`Barspin`]],
    [`TAILWHIP`, [`Tailwhip`]],
    [`NO_HANDER`, [`No-hander`]],
  ],
  G9 = [
    `Double`,
    `Triple`,
    `Quadruple`,
    `Quintuple`,
    `Big`,
    `air`,
    `·`,
    `Stomped`,
    `Sketchy`,
    `Perfect`,
  ],
  yte = 4,
  bte = 150,
  K9 = `  ·  `,
  q9 = 25,
  xte = 110,
  Ste = 1e4,
  Cte = class {
    trail;
    hud;
    state = `ready`;
    time = 0;
    score = 0;
    crashes = 0;
    ridden = new Uint8Array();
    links = 0;
    chained = 0;
    idle = 0;
    called = !1;
    constructor(e, t) {
      ((this.trail = e), (this.hud = t));
    }
    reset() {
      ((this.state = `ready`), (this.links = 0));
    }
    update(e, t) {
      ((this.called = !1),
        this.links > 0 &&
          t.mode !== `air` &&
          (this.idle += e) > yte &&
          this.bank(),
        this.state === `ready` &&
        t.onTrail &&
        t.trailS > 78.5 &&
        t.mode !== `crash`
          ? ((this.state = `running`),
            (this.time = this.score = this.crashes = 0),
            (this.ridden = new Uint8Array(Math.ceil(this.trail.length / q9))),
            uQ.presence(`riding`))
          : this.state === `running` &&
            ((this.time += e),
            t.onTrail &&
              Math.abs(t.trailU) < 6.1 &&
              (this.ridden[Math.floor(t.trailS / q9)] = 1),
            t.onTrail &&
              t.trailS >= this.trail.finish &&
              t.mode !== `crash` &&
              this.finish()));
    }
    trick(e, t) {
      let n = e.split(` `);
      if (n.every((e) => G9.includes(e)) && !n.includes(`Perfect`)) {
        (this.add(t), this.hud.callout(e, `+${t.toLocaleString()}`));
        return;
      }
      ((this.called = !0), this.link(e, t), uQ.addStat(`TRICKS`, 1));
      for (let [e, t] of vte) t.some((e) => n.includes(e)) && uQ.achieve(e);
      (n.filter((e) => !G9.includes(e)).length >= 3 && uQ.achieve(`COMBO`),
        uQ.flushStats());
    }
    landed(e, t) {
      (e.lastJump >= 20 && uQ.achieve(`LONG_JUMP`),
        e.peakHeight >= 5 && uQ.achieve(`BIG_AIR`),
        !(e.airTime < 0.6) &&
          (t === jH.Sketchy
            ? this.bank()
            : t === jH.Perfect &&
              !this.called &&
              this.link(`Perfect landing`, bte)));
    }
    crashed(e) {
      let t = this.links > 1;
      ((this.links = 0),
        this.state === `running` && this.crashes++,
        this.hud.callout(e, t ? `Chain lost` : ``, 1.6),
        uQ.addStat(`CRASHES`, 1));
    }
    link(e, t) {
      (this.links === 0 && (this.chained = 0),
        this.links++,
        (this.chained += t),
        (this.idle = 0));
      let n =
        this.links > 1
          ? `${K9}chain ×${this.links}${K9}${(this.chained * this.links).toLocaleString()}`
          : ``;
      this.hud.callout(e, `+${t.toLocaleString()}${n}`);
    }
    bank() {
      if (this.links === 0) return;
      let e = this.links,
        t = this.chained * e;
      ((this.links = 0),
        this.add(t),
        e > 1 &&
          !this.called &&
          this.hud.callout(
            `Chain ×${e}`,
            `+${t.toLocaleString()}${this.state === `running` ? `${K9}${this.score.toLocaleString()}` : ``}`,
          ));
    }
    add(e) {
      this.state === `running` &&
        ((this.score += e), this.score >= Ste && uQ.achieve(`SCORE_10K`));
    }
    finish() {
      (this.bank(), (this.state = `done`));
      let e = this.crashes === 0,
        t = Math.ceil(RI / q9) + 1,
        n = Math.floor(this.trail.finish / q9) - 1,
        r = 0;
      for (let e = t; e <= n; e++) r += this.ridden[e];
      let i = r >= (n - t + 1) * 0.9,
        a = i
          ? `${this.score.toLocaleString()} points${e ? `${K9}clean run` : ``}`
          : `off the trail: not timed`;
      (this.hud.callout(W9(this.time), a, 6),
        this.hud.hint(V9.finished, 8),
        uQ.addStat(`RUNS`, 1),
        uQ.achieve(`FIRST_RUN`),
        i &&
          (uQ.submit(`fastest-descent`, this.time * 1e3),
          uQ.submit(`best-run`, this.score),
          e && uQ.achieve(`CLEAN_RUN`),
          this.time < xte && uQ.achieve(`SUB_150`),
          uQ.presence(`riding`, `Last run ${W9(this.time)}`)),
        uQ.flushStats());
    }
  };
