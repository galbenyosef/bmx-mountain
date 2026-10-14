// assets/index-gCVK5XnX 35 — math
// Lines 58707-59033 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function Y$() {
  let e = new nS({ transparent: !0 }),
    t = oB(`flow`, `vec4`),
    n = oB(`dir`, `vec2`),
    r = t.z,
    i = t.w,
    a = SB(yW.div(W$)),
    o = SB(a.add(0.5)),
    s = (e, n, i = 0, a = 0) => {
      let o = LV(
        t.y.add(i).mul(1.3),
        t.x.add(a).sub(e.mul(W$).mul(r)).mul(0.7),
      ).add(n);
      return MU(o)
        .mul(0.55)
        .add(MU(o.mul(LV(2.7, 2.2)).add(5.2)).mul(0.3))
        .add(MU(o.mul(LV(6.1, 5.3)).add(9.7)).mul(0.15));
    },
    c = (e = 0, t = 0) =>
      UB(s(a, 0, e, t), s(o, 17, e, t), a.sub(0.5).abs().mul(2)),
    l = c(),
    u = (e, n) =>
      MU(LV(t.y.mul(4.5), t.x.sub(e.mul(W$).mul(r)).mul(0.8)).add(n)),
    d = J$(l, UB(u(a, 3), u(o, 29), a.sub(0.5).abs().mul(2)), r, i),
    f = UB($(0.07, 0.075, 0.05), $(0.012, 0.028, 0.026), Q(0, 0.7, i)),
    p = bB(i.mul(-4)).oneMinus().mul(0.55).add(0.45);
  ((e.colorNode = RV(
    UB(f, $(0.78, 0.82, 0.82), d),
    VB(p, d.mul(0.9)).mul(Q(0, 0.03, i)),
  )),
    (e.roughnessNode = UB(0.05, 0.55, d)));
  let m = 0.05,
    h = UB(0.04, 0.12, Q(0.5, 4, r)).div(m),
    g = c(m, 0).sub(l).mul(h),
    _ = c(0, m).sub(l).mul(h);
  return (
    (e.normalNode = LU(
      eV($(g.mul(n.y).sub(_.mul(n.x)), 1, _.mul(n.y).negate().sub(g.mul(n.x)))),
    )),
    e
  );
}
var X$ = (e, t) => [...e.map((e) => -e).reverse(), 0, ...t],
  Z$ = class {
    group = new Hn();
    constructor(e) {
      let t = e.creek,
        n = q$(),
        r = Y$();
      for (let i = 0; i < t.length; i += L$) {
        let a = Math.min(t.length, i + L$);
        this.group.add(
          eH(this.channel(e, i, a), n, !1),
          eH(this.water(e, i, a), r, !1),
        );
      }
    }
    channel(e, t, n) {
      let r = e.creek,
        i = (z$.length + B$.length + V$.length) * 2 + 1,
        a = Math.round((n - t) / dI) + 1,
        o = new Float32Array(a * i * 3),
        s = new Float32Array(a * i),
        c = new Uint8Array(a * i);
      for (let l = 0; l < a; l++) {
        let a = Math.min(n, t + l * dI);
        r.pointAt(a, K$);
        let u = (e) => {
            let t = r.halfWidth(a, e),
              n = r.riseAt(a, e);
            return [
              ...z$.map((e) => e * t),
              ...B$.map((e) => t + e * n),
              ...V$.map((e) => t + e),
            ];
          },
          d = X$(u(-1), u(1)),
          f = r.waterAt(a);
        for (let t = 0; t < i; t++) {
          let n = d[t],
            r = l * i + t,
            u = K$.x - K$.tz * n,
            p = K$.z + K$.tx * n,
            m = e.channelHeight(a, n);
          (o.set([u, m, p], r * 3),
            (s[r] = f - m),
            (c[r] = +!!e.trail.locate(u, p, G$, 5.5)));
        }
      }
      let l = ZV(a, i),
        u = [];
      for (let e = 0; e < l.length; e += 3)
        (c[l[e]] && c[l[e + 1]] && c[l[e + 2]]) ||
          u.push(l[e], l[e + 1], l[e + 2]);
      return fH({ position: new Fr(o, 3), under: new Fr(s, 1) }, u);
    }
    water(e, t, n) {
      let r = e.creek,
        i = H$.length * 2 + 1,
        a = Math.ceil((n - t) / R$) + 1,
        o = new Float32Array(a * i * 3),
        s = new Float32Array(a * i * 4),
        c = new Float32Array(a * i * 2);
      for (let l = 0; l < a; l++) {
        let a = Math.min(n, t + l * R$);
        r.pointAt(a, K$);
        let u = r.waterAt(a),
          d = r.overTrail(a),
          f = r.flowAt(a),
          p = (e) => [
            ...H$.slice(1).map((t) => t * r.halfWidth(a, e)),
            r.halfWidth(a, e) + U$,
          ],
          m = X$(p(-1), p(1));
        for (let t = 0; t < i; t++) {
          let n = m[t],
            p = r.halfWidth(a, n),
            h = l * i + t,
            g = K$.x - K$.tz * n,
            _ = K$.z + K$.tx * n,
            v = e.baseHeight(g, _),
            y = OF(u, v + tL, d),
            b = OF(u - v, tL * Y((p - Math.abs(n)) / (p * 0.4)) - 0.01, d),
            x =
              d > 0
                ? Math.max(
                    0,
                    v - e.baseHeight(g + K$.tx * 0.5, _ + K$.tz * 0.5),
                  ) / 0.5
                : 0;
          (o.set([g, y, _], h * 3),
            s.set([a, n, OF(f, 0.4 + 6 * Math.sqrt(x), d), b], h * 4),
            c.set([K$.tx, K$.tz], h * 2));
        }
      }
      return fH(
        { position: new Fr(o, 3), flow: new Fr(s, 4), dir: new Fr(c, 2) },
        ZV(a, i),
      );
    }
  },
  Q$ = 160,
  $$ = 0.65,
  e1 = 25,
  t1 = 110,
  n1 = 0.35,
  r1 = 0.62,
  i1 = 45,
  a1 = 22,
  o1 = 0.9,
  s1 = 12,
  c1 = 0.55,
  l1 = 1.3,
  u1 = 1.5,
  d1 = 6,
  f1 = 10,
  p1 = 4.6,
  m1 = 1.15,
  h1 = 0.2,
  g1 = 90,
  _1 = 0.5,
  v1 = 110,
  y1 = 45,
  b1 = 1.25,
  x1 = 0.1,
  S1 = 3,
  C1 = [30, 12],
  w1 = (e) => ({
    shown: 0,
    x: 0,
    y: 0,
    z: 0,
    yaw: 0,
    pitch: 0,
    size: e,
    pace: 0,
    gallop: 0,
    stride: 0,
    graze: 0,
    alert: 0,
    look: 0,
    earL: 0,
    earR: 0,
    tail: 0,
    open: 1,
  }),
  T1 = { x: 0, z: 0, tx: 0, tz: 0 },
  E1 = { x: 0, z: 0, tx: 0, tz: 0 },
  D1 = { x: 0, z: 0, dx: 0, dz: -1 },
  O1 = class {
    terrain;
    doe = w1(1);
    fawn = w1(r1);
    sites;
    visit = null;
    alertAt = -1;
    boltAt = -1;
    boltFrom = 0;
    constructor(e) {
      ((this.terrain = e), (this.sites = j1(e)));
    }
    update(e, t, n) {
      let r = this.visitAt(Math.floor(e / Q$));
      if (
        (r?.slot !== this.visit?.slot &&
          ((this.visit = r), (this.alertAt = this.boltAt = -1)),
        (this.doe.shown = this.fawn.shown = 0),
        !r || e < r.from)
      )
        return;
      let i = e - r.from,
        a = this.doe,
        o = 1 / 0,
        s = 0;
      if (this.boltAt < 0) {
        this.place(a, r.site, 0);
        let c = (e) => {
          let t = Math.hypot(e.x - a.x, e.z - a.z);
          t >= o || ((o = t), (s = MF(e.x - a.x, e.z - a.z)));
        };
        t && c(t);
        for (let e of n) c(e);
        (o < i1 && this.alertAt < 0 && (this.alertAt = e),
          this.alertAt >= 0 &&
            (o < a1 || e - this.alertAt > o1) &&
            ((this.boltAt = e), (this.boltFrom = i > t1 ? l1 * (i - t1) : 0)));
      }
      (this.pose(a, r, r.seed, i, e, 0, s),
        r.fawn && this.pose(this.fawn, r, r.seed + 0.37, i, e, 1, s));
    }
    visitAt(e) {
      return this.visit?.slot === e
        ? this.visit
        : e < 1 || !this.sites.length || UF(e * 7 + 1) > $$
          ? null
          : {
              slot: e,
              site: this.sites[Math.floor(UF(e * 7 + 2) * this.sites.length)],
              from: e * Q$ + UF(e * 7 + 3) * e1,
              fawn: UF(e * 7 + 4) < n1,
              seed: UF(e * 7 + 5),
            };
    }
    pose(e, t, n, r, i, a, o) {
      let s = X(0, u1, r),
        c = 0,
        l = 0,
        u = 1;
      if (((e.gallop = 0), this.boltAt >= 0)) {
        let t = i - this.boltAt;
        ((l = 1 - Math.exp(-t / c1)),
          (c = this.boltFrom + s1 * (t - c1 * l)),
          (e.gallop = 1),
          (u = 1 - X(5, d1, t)));
      } else if (r > t1) {
        let e = r - t1;
        ((c = l1 * e), (l = X(0, 1, e)), (u = 1 - X(8.5, f1, e)));
      }
      let d = a * (l > 0 ? 2.2 : 1.2);
      (this.place(e, t.site, Math.max(0, c - d), a * 1.2),
        a && l === 0 && (e.yaw += 0.5),
        (e.shown = s * u),
        (e.pace = l),
        (e.stride =
          (Math.max(0, c - d) / (e.gallop ? p1 : m1) / e.size + n) % 1),
        this.mood(e, n, r, i, l, o));
    }
    mood(e, t, n, r, i, a) {
      let o = 8 + t * 5,
        s = Math.floor(n / o + t),
        c = n / o + t - s,
        l = 0.18 + 0.25 * UF(s * 13 + 1),
        u = 1 - i;
      ((e.graze = X(0.02, 0.1, c) * (1 - X(1 - l - 0.06, 1 - l, c)) * u),
        (e.look = (UF(s * 13 + 2) - 0.5) * 1.2 * (1 - e.graze)),
        (e.alert =
          this.alertAt >= 0 ? X(0, 0.3, r - this.alertAt) * (1 - i) : 0),
        e.alert > 0 &&
          ((e.graze *= 1 - e.alert),
          (e.look += (Y(AF(a - e.yaw), -1.2, 1.2) - e.look) * e.alert)),
        (e.earL = k1(n * 1.7 + t * 19, 3)),
        (e.earR = k1(n * 1.5 + t * 31, 5)),
        (e.tail =
          this.boltAt >= 0
            ? Math.min(1, (r - this.boltAt) * 3)
            : 0.25 * Math.max(0, k1(n * 2.1 + t * 7, 11))));
    }
    place(e, t, n, r = 0) {
      (A1(t, n, D1), (e.yaw = n > 0 ? MF(D1.dx, D1.dz) : t.yaw));
      let i = -Math.sin(e.yaw),
        a = -Math.cos(e.yaw);
      ((e.x = D1.x - a * r), (e.z = D1.z + i * r));
      let o = (e, t) => this.terrain.height(e, t);
      ((e.open = X(-3, S1, t.open - n)),
        (e.y = o(e.x, e.z)),
        (e.pitch = Y(
          0.7 *
            Math.atan2(
              o(e.x + i * 0.5, e.z + a * 0.5) - o(e.x - i * 0.5, e.z - a * 0.5),
              1,
            ),
          -0.2,
          h1,
        )));
    }
  };
function k1(e, t) {
  let n = Math.floor(e);
  return UF(n * 17 + t) > 0.14
    ? 0
    : Math.sin((e - n) * DF) *
        (UF(n * 17 + t + 1) < 0.5 ? -1 : 1) *
        X(0, 0.15, e - n);
}
function A1(e, t, n) {
  let r = e.route,
    i = r.length / 2 - 1,
    a = Math.min(t / _1, i - 0.001),
    o = Math.floor(a),
    s = a - o;
  ((n.x = r[o * 2] + (r[o * 2 + 2] - r[o * 2]) * s),
    (n.z = r[o * 2 + 1] + (r[o * 2 + 3] - r[o * 2 + 1]) * s));
  let c = r[o * 2 + 2] - r[o * 2],
    l = r[o * 2 + 3] - r[o * 2 + 1],
    u = Math.hypot(c, l) || 1;
  ((n.dx = c / u), (n.dz = l / u));
}
