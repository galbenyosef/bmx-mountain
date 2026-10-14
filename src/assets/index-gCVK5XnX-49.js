// assets/index-gCVK5XnX 49 — math
// Lines 63304-63629 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var I3 = new Hr(),
  L3 = new $i(),
  R3 = class {
    meshes;
    place;
    facing;
    geos;
    constructor(e, t, n, r, i) {
      ((this.place = dH(n, 4)),
        (this.facing = dH(n, 4)),
        (this.geos = e.map(w3)),
        (this.meshes = this.geos.map((e, n) => {
          (e.setAttribute(`place`, this.place),
            e.setAttribute(`facing`, this.facing));
          let a = eH(e, t[n], i);
          return ((a.frustumCulled = !1), a.layers.set(r), a);
        })),
        this.show(0));
    }
    show(e) {
      for (let t of this.geos) t.instanceCount = e;
      for (let t of this.meshes) t.visible = e > 0;
      (sH(this.place, e), sH(this.facing, e));
    }
  },
  z3 = class {
    reach;
    all;
    inView;
    balls;
    count = 0;
    constructor(e, t, n, r, i) {
      ((this.reach = i),
        (this.all = new R3(e, t, n, r, !0)),
        (this.inView = new R3(e, t, n, f3.Eye, !1)),
        (this.balls = new Float32Array(n * 4)));
    }
    get meshes() {
      return [...this.all.meshes, ...this.inView.meshes];
    }
    begin() {
      this.count = 0;
    }
    add(e, t) {
      let n = this.count;
      if (n * 4 >= this.balls.length) return;
      let r = e.h * yL(e),
        i = e.y - y3,
        a = this.all.place.array,
        o = this.all.facing.array,
        s = this.balls;
      ((a[n * 4] = s[n * 4] = e.x),
        (a[n * 4 + 1] = i),
        (a[n * 4 + 2] = s[n * 4 + 2] = e.z),
        (a[n * 4 + 3] = e.h),
        (o[n * 4] = Math.cos(e.rot) * r),
        (o[n * 4 + 1] = Math.sin(e.rot) * r),
        (o[n * 4 + 2] = n),
        (o[n * 4 + 3] = t),
        (s[n * 4 + 1] = i + e.h / 2),
        (s[n * 4 + 3] = Math.hypot(e.h / 2, this.reach * r) + b3),
        this.count++);
    }
    end() {
      this.all.show(this.count);
    }
    cull(e) {
      let t = this.balls,
        n = this.all.place.array,
        r = this.all.facing.array,
        i = this.inView.place.array,
        a = this.inView.facing.array,
        o = 0;
      for (let s = 0; s < this.count; s++)
        if (
          (I3.center.set(t[s * 4], t[s * 4 + 1], t[s * 4 + 2]),
          (I3.radius = t[s * 4 + 3]),
          !e || e.intersectsSphere(I3))
        ) {
          for (let e = 0; e < 4; e++)
            ((i[o * 4 + e] = n[s * 4 + e]), (a[o * 4 + e] = r[s * 4 + e]));
          o++;
        }
      this.inView.show(o);
    }
  },
  B3 = class e {
    group = new Hn();
    near = [[], []];
    side = [[], []];
    levels = [];
    bySide = [];
    impostors = [];
    standIns = [];
    bySpecies = [[], []];
    variant = [];
    lastX = 1 / 0;
    lastZ = 1 / 0;
    static async create(t, n, r) {
      let i = new e(n);
      return (await i.init(t, r), i);
    }
    constructor(e) {
      for (let t of e) this.bySpecies[t.species].push(t);
    }
    async init(e, t) {
      let n = C$(t),
        r = N3(),
        i = [];
      for (let e of [vL.Pine, vL.Aspen]) {
        let t = this.bySpecies[e].length,
          a = r[e],
          o = P3(a, n),
          s = F3(a, n),
          c = m2(a.barkColour, a.leafColour, a.leafAlpha);
        for (let n of [11, 23]) {
          let r = C3(e, n + e * 100);
          (this.near[e].push(
            new z3(
              [r.bark, r.leaves],
              [o, s],
              Math.min(t, _3),
              f3.NearShadow,
              r.reach,
            ),
          ),
            this.side[e].push(
              new z3(
                [r.bark, r.leaves],
                [o, s],
                Math.min(t, _3),
                f3.Shadows,
                r.reach,
              ),
            ),
            i.push({ bark: r.bark, leaves: r.leaves, ...c }));
        }
      }
      let a = new p2(i.length, _Q ? 192 : 320);
      (await h$(),
        a.bake(e, i),
        (this.levels = [...this.near.flat(), ...this.side.flat()]));
      for (let e of this.levels) this.group.add(...e.meshes);
      let o = HF(5);
      for (let n of [vL.Pine, vL.Aspen])
        this.plant(n, a, r[n].glow, d3(e), t, o);
    }
    plant(e, t, n, r, i, a) {
      let o = this.bySpecies[e],
        s = new g2(t, o.length, n, r),
        c = new Uint8Array(o.length),
        l = new Uint8Array(o.length);
      (o.forEach((t, n) => {
        c[n] = a() < 0.5 ? 0 : 1;
        let r = this.near[e][c[n]].reach * t.h * yL(t);
        ((l[n] = +(i.trailDistance(t.x, t.z, r + 6.1 + 4) < r + 6.1 + 2)),
          H3(s, n, t, e * 2 + c[n], 0));
      }),
        s.commit(!1),
        this.impostors.push(s),
        this.variant.push(c),
        this.bySide.push(l),
        this.group.add(s.mesh));
      let u = new g2(t, Math.min(o.length, v3), n, r);
      (u.mesh.layers.set(f3.FarShadow),
        u.show(0),
        this.standIns.push(u),
        this.group.add(u.mesh));
    }
    setRider(e, t) {
      (O3.value.copy(e), k3.value.copy(t));
    }
    showAll(e, t, n) {
      let r = { x: e, y: t, z: n, h: 12, rot: 0, species: vL.Pine, tint: 0.5 };
      for (let e of this.levels)
        (e.begin(), e.add(r, 1), e.end(), e.cull(null));
      for (let r of this.standIns)
        (r.set(0, e, t, n, 12, 0, 1, 0, 1, 1), r.show(1), r.commit(!1));
      this.lastX = this.lastZ = 1 / 0;
    }
    update(e) {
      (this.sort(e.position.x, e.position.z), e.updateMatrixWorld(), lH(e, L3));
      for (let e of this.levels) e.cull(L3);
    }
    sort(e, t) {
      Math.hypot(e - this.lastX, t - this.lastZ) < 3 ||
        ((this.lastX = e),
        (this.lastZ = t),
        this.bySpecies.forEach((n, r) => {
          let i = [...this.near[r], ...this.side[r]];
          for (let e of i) e.begin();
          let a = this.impostors[r],
            o = this.standIns[r],
            s = this.variant[r],
            c = this.bySide[r],
            l = 0;
          n.forEach((n, i) => {
            let u = V3(Math.hypot(n.x - e, n.z - t));
            (u < 1 &&
              (c[i]
                ? this.side[r][s[i]].add(n, 1 - u)
                : (this.near[r][s[i]].add(n, 1 - u),
                  l < o.fade.count && H3(o, l++, n, r * 2 + s[i], 1))),
              a.setFade(i, u));
          });
          for (let e of i) e.end();
          (a.commit(!0), o.show(l), o.commit(!1));
        }));
    }
  },
  V3 = (e) => Y((e - (h3 - g3 / 2)) / g3);
function H3(e, t, n, r, i) {
  e.set(t, n.x, n.y - y3, n.z, n.h, n.rot, yL(n), r, 0.85 + n.tint * 0.3, i);
}
var U3 = 12,
  W3 = 1.1,
  G3 = 0.5,
  K3 = 10,
  q3 = 4,
  J3 = [
    {
      patch: 30,
      spacing: 0.2,
      blades: 7,
      segs: 4,
      wide: 1,
      spread: 0.1,
      far: 13,
      seed: 1,
    },
    {
      patch: 70,
      spacing: 0.42,
      blades: 9,
      segs: 2,
      wide: 1.7,
      spread: 0.2,
      far: 32,
      seed: 2,
    },
    {
      patch: 136,
      spacing: 0.85,
      blades: 11,
      segs: 1,
      wide: 3,
      spread: 0.42,
      far: 64,
      seed: 3,
    },
  ],
  Y3 = [
    {
      patch: 24,
      spacing: 0.28,
      blades: 6,
      segs: 3,
      wide: 1.2,
      spread: 0.12,
      far: 10,
      seed: 1,
    },
    {
      patch: 56,
      spacing: 0.6,
      blades: 8,
      segs: 2,
      wide: 2,
      spread: 0.25,
      far: 25,
      seed: 2,
    },
    {
      patch: 100,
      spacing: 1.2,
      blades: 10,
      segs: 1,
      wide: 3.5,
      spread: 0.5,
      far: 46,
      seed: 3,
    },
  ];
function X3({ blades: e, seed: t, segs: n, wide: r, spread: i }) {
  let a = HF(t),
    o = [],
    s = [],
    c = [];
  for (let t = 0; t < e; t++) {
    let e = a() * DF,
      t = Math.sqrt(a()) * i,
      l = Math.cos(e) * t,
      u = Math.sin(e) * t,
      d = a() * Math.PI,
      f = Math.cos(d),
      p = Math.sin(d),
      m = 0.15 + a() * 0.35,
      h = 0.55 + a() * 0.45,
      g = (0.011 + a() * 0.01) * r,
      _ = o.length / 3;
    for (let t = 0; t <= n; t++) {
      let r = t / n,
        i = g * (1 - r * 0.85),
        a = m * r * r,
        c = l + Math.cos(e) * a * 0.4,
        d = u + Math.sin(e) * a * 0.4;
      (o.push(c - f * i, r * h, d - p * i, c + f * i, r * h, d + p * i),
        s.push(0, r, 1, r));
    }
    for (let e = 0; e < n; e++) {
      let t = _ + e * 2;
      c.push(t, t + 1, t + 2, t + 1, t + 3, t + 2);
    }
  }
  let l = new Ns();
  return (
    l.setAttribute(`position`, new zr(o, 3)),
    l.setAttribute(`uv`, new zr(s, 2)),
    oH(l, `normal`, [0, 1, 0]),
    l.setIndex(c),
    l
  );
}
var Z3 = new $i(),
  Q3 = new fr(),
  $3 = new j();
