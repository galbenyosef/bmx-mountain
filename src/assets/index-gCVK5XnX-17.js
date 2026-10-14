// assets/index-gCVK5XnX 17 — math
// Lines 51911-52216 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function SH(e) {
  let t = [];
  e.traverse((e) => {
    e.isMesh && t.push(e);
  });
  let n = [...t],
    r = t.map(() => new N()),
    i = new Map();
  t.forEach((e, t) => {
    let a = e.material,
      o = !a.map && !a.colorNode,
      s = `${o ? `plain` : a.uuid}|${e.castShadow}`,
      c = i.get(s);
    c ||
      i.set(s, (c = { material: o ? null : a, cast: e.castShadow, parts: [] }));
    let l = e.geometry.clone(),
      u = e.userData.skin;
    (aH(iH(l, `position`, `normal`, `uv`, `skinIndex`, `skinWeight`)),
      l.getAttribute(`uv`) ||
        l.setAttribute(`uv`, XV(l.getAttribute(`position`).count)),
      u ? xH(l, u, n, r) : bH(l, t),
      o && vH(l, a.color, a.roughness, a.metalness),
      c.parts.push(l),
      (e.visible = !1));
  });
  let a = new Bi(n, r),
    o = null;
  for (let t of i.values()) {
    let n = t.material ?? (o ??= yH()),
      r = new Fi(UV(t.parts, !1), n);
    for (let e of t.parts) e.dispose();
    (r.bind(a, new N()),
      (r.castShadow = t.cast),
      (r.receiveShadow = !0),
      (r.frustumCulled = !1),
      e.add(r));
  }
}
var TRICK = (function (e) {
    return (
      (e[(e.None = 0)] = `None`),
      (e[(e.Superman = 1)] = `Superman`),
      (e[(e.CanCan = 2)] = `CanCan`),
      (e[(e.Turndown = 3)] = `Turndown`),
      (e[(e.Tabletop = 4)] = `Tabletop`),
      e
    );
  })({}),
  wH = {
    barspin: [`Barspin`, 300],
    tailwhip: [`Tailwhip`, 500],
    noHander: [`No-hander`, 250],
    superman: [`Superman`, 600],
    canCan: [`Can-can`, 350],
    turndown: [`Turndown`, 350],
    tabletop: [`Tabletop`, 450],
    whip: [`Whip`, 300],
  },
  TH = {
    1: { trick: wH.superman, bail: `Feet off the pedals` },
    2: { trick: wH.canCan, bail: `Foot off the pedal` },
    3: { trick: wH.turndown, bail: `Bars turned` },
    4: { trick: wH.tabletop, bail: `Bike still sideways` },
  },
  EH = [``, ``, `Double `, `Triple `, `Quadruple `, `Quintuple `],
  DH = (e, t) => (EH[e] ?? `${e}× `) + t,
  OH = class {
    spun = 0;
    flipped = 0;
    corked = 0;
    whipped = 0;
    tricks = [];
    points = 0;
    start() {
      ((this.spun = this.flipped = this.corked = this.whipped = 0),
        (this.tricks = []),
        (this.points = 0));
    }
    score([e, t]) {
      (this.tricks.push(e), (this.points += t));
    }
    has([e]) {
      return this.tricks.includes(e);
    }
    get spins() {
      return Math.round(Math.abs(this.spun) / Math.PI);
    }
    get flips() {
      return Math.floor(Math.abs(this.flipped) / TAU + 0.15);
    }
    get corks() {
      return Math.round(this.corked / Math.PI);
    }
    name(e, t, n) {
      let r = [],
        i = this.spins,
        a = this.corks,
        o = e ? ` to fakie` : ``;
      a >= 2
        ? r.push(`Cork ${a * 180}${o}`)
        : i >= 1
          ? r.push(`${i * 180}${o}`)
          : e && r.push(`Fakie`);
      let s = this.flips;
      s > 0 &&
        a < 2 &&
        r.push(DH(s, this.flipped > 0 ? `Backflip` : `Frontflip`));
      for (let e of new Set(this.tricks))
        r.push(DH(this.tricks.filter((t) => t === e).length, e));
      return (
        r.length === 0 && n > 1.1 && r.push(`Big air`),
        r.length && t && r.push(`· ${t}`),
        r.join(` `)
      );
    }
    worth(e, t, n, r) {
      let i = this.points,
        a = this.corks,
        o = this.spins,
        s = this.flips;
      (a >= 2
        ? (i += 500 + (a - 2) * 300)
        : ((i += Math.max(0, o - 1) * 180 + (o >= 2 ? 120 : 0)),
          (i += s * (this.flipped > 0 ? 600 : 900))),
        (i += Math.round(n * 40 + r * 25)),
        e && (i += 150));
      let c = (a >= 2 ? 2 : +(o >= 2) + s) + this.tricks.length;
      return (
        c > 1 && (i = Math.round(i * (1 + 0.5 * (c - 1)))),
        t === `Perfect` && (i = Math.round(i * 1.3) + 200),
        t === `Stomped` && (i = Math.round(i * 1.15) + 100),
        t === `Sketchy` && (i = Math.round(i * 0.5)),
        i
      );
    }
  },
  RIDE_MODE = (function (e) {
    return (
      (e[(e.Ride = 0)] = `Ride`),
      (e[(e.Air = 1)] = `Air`),
      (e[(e.Crash = 2)] = `Crash`),
      (e[(e.Seated = 3)] = `Seated`),
      (e[(e.Walk = 4)] = `Walk`),
      e
    );
  })({}),
  AH = {
    steer: 0,
    fwd: 0,
    back: 0,
    crouch: !1,
    barspin: !1,
    tailwhip: !1,
    nohand: !1,
    style: TRICK.None,
  },
  jH = (function (e) {
    return (
      (e[(e.Sketchy = 0)] = `Sketchy`),
      (e[(e.Clean = 1)] = `Clean`),
      (e[(e.Stomped = 2)] = `Stomped`),
      (e[(e.Perfect = 3)] = `Perfect`),
      e
    );
  })({}),
  MH = (function (e) {
    return (
      (e[(e.Slide = 0)] = `Slide`),
      (e[(e.Over = 1)] = `Over`),
      (e[(e.Back = 2)] = `Back`),
      (e[(e.Side = 3)] = `Side`),
      (e[(e.Stopped = 4)] = `Stopped`),
      e
    );
  })({}),
  NH = `Couldn't hold it`,
  PH = {
    "Nosed in": 1,
    "Landed on your head": 1,
    "Cased it": 1,
    "Bars still spinning": 1,
    "No hands on the bars": 1,
    "Looped out": 2,
    "Upside down": 2,
    "Frame still whipping": 2,
    "Feet off the pedals": 1,
    "Bars turned": 1,
    "Landed sideways": 3,
    "Foot off the pedal": 3,
    "Bike still sideways": 3,
    "Laid it down": 3,
    [NH]: 3,
  },
  FH = (e) => (e.startsWith(`Hit`) ? 4 : (PH[e] ?? 0)),
  IH = new M(0, 0.79, 0.07),
  LH = new M(0, 0, 1),
  RH = [
    [PHYSICS.wheelbase / 2, -PHYSICS.bodyLift, 0, PHYSICS.wheelRadius + 0.02],
    [-PHYSICS.wheelbase / 2, -PHYSICS.bodyLift, 0, PHYSICS.wheelRadius + 0.02],
    [0.32, 0.75, 0.33, 0.07],
    [0.32, 0.75, -0.33, 0.07],
    [-0.05, 0.85, 0, 0.2],
    [0.1, 1.45, 0, 0.17],
  ],
  zH = {
    [SURFACE.Trail]: PHYSICS.gripDirt,
    [SURFACE.Dirt]: PHYSICS.gripDirt,
    [SURFACE.Wood]: PHYSICS.gripDirt,
    [SURFACE.Grass]: PHYSICS.gripGrass,
    [SURFACE.Forest]: PHYSICS.gripGrass,
    [SURFACE.Rock]: PHYSICS.gripRock,
    [SURFACE.Water]: PHYSICS.gripGrass,
  },
  BH = {
    [SURFACE.Trail]: PHYSICS.crrDirt,
    [SURFACE.Wood]: PHYSICS.crrDirt * 0.7,
    [SURFACE.Dirt]: PHYSICS.crrDirt * 1.6,
    [SURFACE.Grass]: PHYSICS.crrGrass,
    [SURFACE.Forest]: PHYSICS.crrRough,
    [SURFACE.Rock]: PHYSICS.crrRough,
    [SURFACE.Water]: PHYSICS.crrWater,
  },
  VH = { ride: 0, air: 1, crash: 2 },
  HH = {
    [SURFACE.Trail]: 0,
    [SURFACE.Wood]: 0,
    [SURFACE.Dirt]: 0.5,
    [SURFACE.Grass]: 0.7,
    [SURFACE.Forest]: 0.9,
    [SURFACE.Rock]: 1,
    [SURFACE.Water]: 0.4,
  },
  UH = new qt(),
  WH = new M(),
  GH = new M(),
  KH = new M(),
  qH = new M(),
  JH = new M(),
  YH = new M(),
  XH = new Tn(),
  ZH = new M(),
  QH = new M(),
  $H = new M(),
  eU = new qt(),
  tU = new qt(),
  nU = new Tn(),
  rU = new M(),
  iU = new M(),
  aU = new M(),
  oU = new qt(),
  scratchNormal = [0, 1, 0],
  cU = { s: 0, u: 0 },
  lU = { pitch: 0, yaw: 0, roll: 0 },
  uU = { y: 0, nx: 0, ny: 1, nz: 0, block: null, a: 0 },
  dU = { force: 0, torque: 0, nx: 0, ny: 0, nz: 0, touching: 0 },
  fU = {
    pitchErr: 0,
    upright: 0,
    side: 0,
    flat: 0,
    travel: 0,
    heading: 0,
    yawErr: 0,
    fakie: !1,
    absorbed: !1,
    impact: 0,
  };
function pU(e, t, n) {
  nU.setFromQuaternion(e, `YXZ`);
  let r = t.pitch,
    i = t.yaw,
    a = t.roll,
    o = 1 / 0;
  for (let e = 0; e < 2; e++) {
    let t = e === 0 ? nU.x : Math.PI - nU.x,
      s = e === 0 ? nU.y : nU.y + Math.PI,
      c = e === 0 ? -nU.z : -nU.z - Math.PI,
      l = r + wrapAngle(t - r),
      u = i + wrapAngle(s - i),
      d = a + wrapAngle(c - a),
      f = (l - r) ** 2 + (u - i) ** 2 + (d - a) ** 2;
    f < o && ((o = f), (n.pitch = l), (n.yaw = u), (n.roll = d));
  }
  return n;
}
var mU = (e, t, n, r) => r.setFromEuler(XH.set(e, t, -n, `YXZ`));
function hU(e, t, n) {
  return Math.min(t, Math.sqrt(1.4 * n * e), e * PHYSICS.catchRate);
}
function gU(e, t, n, r, i, a, o) {
  let s = (t * Math.abs(t)) / (2 * i),
    c = n + TAU * Math.round((e + s - n) / TAU) - e,
    l = 0;
  return (
    Math.abs(c) < a && (l = Math.sign(c) * hU(Math.abs(c), r, i)),
    approach(t, l, o * i)
  );
}
function _U(e, t, n, r, i = 1) {
  ((e.x += n.nx * n.depth), (e.z += n.nz * n.depth));
  let a = t.x * n.nx + t.z * n.nz;
  a >= 0 || ((t.x -= n.nx * a * r), (t.z -= n.nz * a * r), t.multiplyScalar(i));
}
function vU(e) {
  ((e.pitch = Math.PI - e.pitch), (e.yaw += Math.PI), (e.roll -= Math.PI));
}
