// assets/index-gCVK5XnX 09 — math
// Lines 49393-49778 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var qR = class {
    hash = new jR(8);
    all = [];
    add(e) {
      (this.hash.add(e, e.x, e.z, Math.hypot(e.half, e.w) + 1),
        this.all.push(e));
    }
    reaches(e) {
      return this.all.map((t) => [t.x, t.z, Math.hypot(t.half, t.w) + e]);
    }
    clearance(e, t) {
      let n = 1 / 0;
      for (let r of this.hash.around(e, t))
        for (let i of r) {
          let { a: r, l: a } = KR(i, e, t);
          n = Math.min(
            n,
            Math.hypot(
              Math.max(0, Math.abs(r) - i.half),
              Math.max(0, Math.abs(a) - i.w),
            ),
          );
        }
      return n;
    }
    top(e, t) {
      let n = this.hash.at(e, t);
      if (!n) return -1 / 0;
      let r = -1 / 0;
      for (let i of n) {
        let { a: n, l: a } = KR(i, e, t);
        Math.abs(n) > i.half ||
          Math.abs(a) > i.w ||
          (r = Math.max(r, WR(i, n, a)));
      }
      return r;
    }
    wheel(e, t, n, r, i) {
      let a = this.hash.at(e, t);
      if (!a) return !1;
      let o = -1 / 0,
        s = null,
        c = 0,
        l = 0;
      for (let i of a) {
        let { a, l: u } = KR(i, e, t);
        if (Math.abs(a) > i.half || Math.abs(u) > i.w) continue;
        let d = WR(i, a, u);
        (i !== r && d > n + LR) ||
          (d > o && ((o = d), (s = i), (c = a), (l = u)));
      }
      if (!s) return !1;
      let u = s.seesaw
          ? -Math.tan(s.seesaw.angle)
          : (s.y1 - s.y0) / (2 * s.half),
        d =
          (s.log > 0
            ? -l / Math.sqrt(Math.max(1e-4, s.log * s.log - l * l))
            : 0) + s.tilt,
        f = u * s.ax - d * s.az,
        p = u * s.az + d * s.ax,
        m = Math.hypot(f, 1, p);
      return (
        (i.y = o),
        (i.nx = -f / m),
        (i.ny = 1 / m),
        (i.nz = -p / m),
        (i.block = s),
        (i.a = c),
        !0
      );
    }
    solid(e, t, n, r) {
      let i = this.hash.at(e, n);
      if (!i) return null;
      let a = null;
      for (let o of i) {
        let { a: i, l: s } = KR(o, e, n),
          c = Y(i, -o.half, o.half),
          l = Y(s, -o.w, o.w),
          u = i - c,
          d = s - l;
        if ((u < -1e-6 && o.joinedBefore) || (u > 1e-6 && o.joinedAfter))
          continue;
        let f = Math.hypot(u, d);
        if (f >= r) continue;
        let p = WR(o, c, l),
          m = o.seesaw ? p - RR - 0.05 : o.bottom;
        if (t > p - 0.06 || t + r < m) continue;
        let h, g, _;
        if (f > 1e-6) ((h = r - f), (g = u / f), (_ = d / f));
        else {
          let e = o.half - Math.abs(i),
            t = o.w - Math.abs(s);
          e < t
            ? ((h = r + e), (g = Math.sign(i) || 1), (_ = 0))
            : ((h = r + t), (g = 0), (_ = Math.sign(s) || 1));
        }
        (a && h <= a.depth) ||
          (a = {
            o: o.solid,
            nx: g * o.ax - _ * o.az,
            nz: g * o.az + _ * o.ax,
            depth: h,
          });
      }
      return a;
    }
  },
  JR = [
    { kind: `logride`, s: 1290.5, u: 0, len: 8, h: 0.9, w: 0.55 },
    { kind: `seesaw`, s: 1320.5, u: -1.6, len: 10, h: 1.1, w: 1.2 },
    { kind: `bridge`, s: 1357.5, u: -2, len: 10, h: 1.2, w: 1.4, rampOut: !0 },
    { kind: `skinny`, s: 1610.5, u: -2.1, len: 12, h: 0.8, w: 0.2 },
  ],
  YR = {
    skinny: { name: `Skinny`, points: 200, what: `Hit the skinny` },
    bridge: { name: `North Shore`, points: 250, what: `Hit the bridge` },
    logride: { name: `Log ride`, points: 300, what: `Hit the log` },
    seesaw: { name: `Teeter`, points: 250, what: `Hit the seesaw` },
  },
  XR = [
    { kind: `spool`, s: 1306.5, u: -9.5 },
    { kind: `tyres`, s: 1316.5, u: 9.5 },
    { kind: `pallets`, s: 1368.5, u: -9.5 },
    { kind: `spoolSide`, s: 1386.5, u: 9.6 },
    { kind: `tyres`, s: 1402.5, u: -9.5 },
    { kind: `pallets`, s: 1613.5, u: 9.5 },
    { kind: `spool`, s: 1623.5, u: -9.5 },
  ],
  ZR = {
    tyres: { r: 0.55, high: 0.75, what: `Hit the tyres` },
    spool: { r: 0.6, high: 0.75, what: `Hit the spool` },
    spoolSide: { r: 0.65, high: 1.25, what: `Hit the spool` },
  },
  QR = 0.144,
  $R = QR * 4,
  ez = 5,
  tz = 0.5,
  nz = { x: 0, z: 0, tx: 0, tz: 0 },
  rz = class extends qR {
    trail;
    ground;
    stunts = [];
    props = [];
    seesaws = [];
    acc = 0;
    constructor(e, t) {
      (super(), (this.trail = e), (this.ground = t));
      for (let e of JR) this.build(e);
      (this.placeProps(), this.lodgeWalls());
    }
    obstacles() {
      let e = [];
      for (let t of this.props) {
        if (t.kind === `pallets`) continue;
        let n = ZR[t.kind];
        e.push({
          x: t.x,
          z: t.z,
          r: n.r,
          bottom: t.y - 0.5,
          top: t.y + n.high,
          what: n.what,
          soft: !0,
        });
      }
      return e;
    }
    step(e) {
      for (let t of this.seesaws) t.step(e);
    }
    idle(e) {
      for (this.acc += Math.min(e, 0.1); this.acc >= J.step;)
        ((this.acc -= J.step), this.step(J.step));
    }
    weighOthers(e) {
      for (let e of this.seesaws) e.clearOthers();
      for (let t of e) {
        let e = this.hash.at(t.x, t.z);
        if (e)
          for (let n of e) {
            if (!n.seesaw) continue;
            let { a: e, l: r } = KR(n, t.x, t.z);
            if (Math.abs(e) > n.half || Math.abs(r) > n.w + 0.2) continue;
            let i = t.y - n.seesaw.top(e);
            i > -0.2 && i < 0.7 && n.seesaw.weigh(e, J.mass * J.g);
          }
      }
    }
    build(e) {
      let t = this.stunt(e),
        { len: n, h: r, w: i } = e;
      switch (e.kind) {
        case `skinny`:
        case `bridge`: {
          let a = iz(e);
          (this.ramp(t, 0, a, i, RR * 0.5, r),
            this.section(t, a, a + n, i, r, r),
            e.rampOut && this.ramp(t, a + n, a + n + a, i, r, RR * 0.5));
          break;
        }
        case `logride`: {
          let a = iz(e);
          (this.ramp(t, 0, a, Math.max(0.3, i * 1.35), RR * 0.5, r - 0.03),
            this.section(t, a, a + n, i, r, r, i));
          break;
        }
        case `seesaw`:
          this.teeter(t, e);
      }
      this.stunts.push(t);
    }
    stunt(e) {
      let t = az(e);
      this.trail.pointAt(e.s + t / 2, nz, e.u);
      let { tx: n, tz: r } = nz,
        i = e.s + t / 2,
        a =
          (this.trail.surface(i, e.u + 1) - this.trail.surface(i, e.u - 1)) / 2,
        o = YR[e.kind],
        s =
          e.kind === `seesaw` ? tz + e.len / 2 + 1 : e.rampOut ? t - iz(e) : t,
        c = nz.x - (t / 2) * n,
        l = nz.z - (t / 2) * r;
      return {
        kind: e.kind,
        x: c,
        z: l,
        ax: n,
        az: r,
        tilt: a,
        blocks: [],
        total: t,
        end: s,
        name: o.name,
        points: o.points,
      };
    }
    under(e, t) {
      return this.ground(e.x + e.ax * t, e.z + e.az * t);
    }
    section(e, t, n, r, i, a, o = 0) {
      let s = this.under(e, t),
        c = this.under(e, n),
        l = (t + n) / 2,
        { ax: u, az: d } = e,
        f = UR(
          {
            x: e.x + u * l,
            z: e.z + d * l,
            ax: u,
            az: d,
            half: (n - t) / 2,
            w: r,
            y0: s + i,
            y1: c + a,
            bottom: Math.min(s, c) - 0.3,
            log: o,
            tilt: e.tilt,
            stunt: e,
          },
          YR[e.kind].what,
        ),
        p = e.blocks[e.blocks.length - 1];
      return (
        p && ((p.joinedAfter = !0), (f.joinedBefore = !0)),
        e.blocks.push(f),
        this.add(f),
        f
      );
    }
    ramp(e, t, n, r, i, a) {
      let o = (n - t) / 4,
        s = (a - i) / 6;
      (this.section(e, t, t + o, r, i, i + s),
        this.section(e, t + o, n - o, r, i + s, a - s),
        this.section(e, n - o, n, r, a - s, a));
    }
    teeter(e, t) {
      let { len: n, h: r, w: i } = t,
        a = tz;
      this.section(e, 0, a, i, 0.01, RR);
      let o = n / 2,
        s = this.under(e, a),
        c = this.under(e, a + n),
        l = this.under(e, a + o) + r,
        u = new HR(
          l,
          o,
          Math.atan((s + RR - l) / o),
          Math.atan((l - c - RR) / o),
        );
      this.seesaws.push(u);
      let d = this.section(e, a, a + n, i, 0, 0);
      ((d.seesaw = u), (u.x = d.x), (u.z = d.z));
    }
    placeProps() {
      for (let [e, t] of XR.entries()) {
        this.trail.pointAt(t.s, nz, t.u);
        let { x: n, z: r } = nz,
          i = Math.atan2(nz.tx, nz.tz) + (((e * 2.39) % 1) - 0.5) * 0.9,
          a = this.ground(n, r);
        if (
          (this.props.push({ kind: t.kind, x: n, y: a, z: r, yaw: i }),
          t.kind !== `pallets`)
        )
          continue;
        let o = a + $R,
          s = {
            x: n,
            z: r,
            ax: Math.sin(i),
            az: Math.cos(i),
            half: 0.6,
            w: 0.5,
            y0: o,
            y1: o,
            bottom: a - 0.3,
            log: 0,
            tilt: 0,
            stunt: null,
          };
        this.add(UR(s, `Hit the pallets`));
      }
    }
    lodgeWalls() {
      let e = _R(this.trail),
        t = { x: 0, y: 0, z: 0 };
      for (let n of TR) {
        let { a0: r, a1: i, c0: a, c1: o } = n;
        (AR(e, (r + i) / 2, (a + o) / 2, 0, t),
          this.hard(
            t.x,
            t.z,
            e.ax,
            e.az,
            (i - r) / 2,
            (o - a) / 2,
            t.y + n.y0,
            t.y + n.y1,
            t.y + n.bottom,
            n.what,
          ));
      }
      let n = kR(this.trail),
        r = n.ground + OR;
      for (let e of [-1, 1])
        (AR(n, 0, e * ER, 0, t),
          this.hard(
            t.x,
            t.z,
            n.ax,
            n.az,
            DR / 2,
            DR / 2,
            r,
            r,
            n.ground - 1,
            `Hit the gate`,
          ));
    }
    hard(e, t, n, r, i, a, o, s, c, l) {
      this.add({
        ...UR(
          {
            x: e,
            z: t,
            ax: n,
            az: r,
            half: i,
            w: a,
            y0: o,
            y1: s,
            bottom: c,
            log: 0,
            tilt: 0,
            stunt: null,
          },
          l,
        ),
        solid: { what: l, soft: !1 },
      });
    }
  },
  iz = (e) => e.h * ez * (e.kind === `logride` ? 0.85 : 1);
