// assets/index-gCVK5XnX 24 — math
// Lines 54938-55366 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var cq = (function (e) {
    return (
      (e[(e.pelvis = 0)] = `pelvis`),
      (e[(e.chest = 1)] = `chest`),
      (e[(e.head = 2)] = `head`),
      (e[(e.shL = 3)] = `shL`),
      (e[(e.elL = 4)] = `elL`),
      (e[(e.haL = 5)] = `haL`),
      (e[(e.shR = 6)] = `shR`),
      (e[(e.elR = 7)] = `elR`),
      (e[(e.haR = 8)] = `haR`),
      (e[(e.hipL = 9)] = `hipL`),
      (e[(e.knL = 10)] = `knL`),
      (e[(e.ftL = 11)] = `ftL`),
      (e[(e.hipR = 12)] = `hipR`),
      (e[(e.knR = 13)] = `knR`),
      (e[(e.ftR = 14)] = `ftR`),
      e
    );
  })({}),
  lq = [
    0.13, 0.15, 0.14, 0.07, 0.05, 0.05, 0.07, 0.05, 0.05, 0.08, 0.06, 0.06,
    0.08, 0.06, 0.06,
  ],
  uq = [
    1, 1, 0.8, 0.6, 0.35, 0.2, 0.6, 0.35, 0.2, 0.7, 0.4, 0.25, 0.7, 0.4, 0.25,
  ],
  dq = uq.reduce((e, t) => e + t),
  fq = 0.06,
  pq = 1 / 120,
  mq = 14,
  hq = 0.6,
  gq = 0.25,
  _q = 4,
  vq = 14,
  yq = [0, 1, 0],
  bq = new M(),
  xq = new M(),
  Sq = new M(),
  Cq = new M(),
  wq = new M(),
  Tq = new N(),
  Eq = class {
    world;
    p = new Float32Array(45);
    q = new Float32Array(45);
    was = new Float32Array(45);
    alpha = 1;
    free = new Float32Array(45);
    ground = new Float32Array(60);
    hits = new Float32Array(30);
    touching = new Uint8Array(15);
    hit = 0;
    slide = 0;
    bones = [];
    acc = 0;
    still = 0;
    target = new M();
    follow = !1;
    braceDir = new M();
    braceT = 0;
    constructor(e) {
      this.world = e;
    }
    start(e, t, n = 1.2) {
      for (let r = 0; r < 15; r++) {
        let i = r * 3;
        ((this.p[i] = e[r].x),
          (this.p[i + 1] = e[r].y),
          (this.p[i + 2] = e[r].z),
          (this.q[i] = e[r].x - t[r].x * pq),
          (this.q[i + 1] = e[r].y - (t[r].y + n) * pq),
          (this.q[i + 2] = e[r].z - t[r].z * pq));
      }
      let r = (t, n) =>
          Math.hypot(e[t].x - e[n].x, e[t].y - e[n].y, e[t].z - e[n].z),
        i = (e, t) => this.bones.push({ a: e, b: t, len: r(e, t), min: !1 }),
        a = (e, t, n) => this.bones.push({ a: e, b: t, len: n, min: !0 });
      this.bones = [];
      let o = [0, 1, 3, 6, 9, 12, 2];
      for (let e = 0; e < o.length; e++)
        for (let t = e + 1; t < o.length; t++) i(o[e], o[t]);
      for (let [e, t, n] of [
        [3, 4, 5],
        [6, 7, 8],
        [9, 10, 11],
        [12, 13, 14],
      ])
        (i(e, t), i(t, n), a(e, n, (r(e, t) + r(t, n)) * 0.45));
      for (let e of [5, 8]) a(e, 1, 0.2);
      for (let e of [11, 14]) a(e, 0, 0.3);
      let s = 0;
      for (let e = 0; e < 15; e++) {
        let t = e * 3;
        s = Math.max(
          s,
          this.world.height(this.p[t], this.p[t + 2]) + lq[e] - this.p[t + 1],
        );
      }
      if (s > 0)
        for (let e = 1; e < 45; e += 3) ((this.p[e] += s), (this.q[e] += s));
      ((this.still = 0),
        (this.acc = 0),
        (this.hit = this.slide = 0),
        this.touching.fill(0),
        this.was.set(this.p),
        (this.alpha = 1));
    }
    brace(e, t = 0.35) {
      (this.braceDir.copy(e), (this.braceT = t));
    }
    takeHit() {
      let e = this.hit;
      return ((this.hit = 0), e);
    }
    centre(e) {
      return this.at(0, e);
    }
    torso(e) {
      return (
        Cq.subVectors(this.at(1, bq), this.at(0, xq)).normalize(),
        Sq.subVectors(this.at(6, bq), this.at(3, xq)),
        Sq.addScaledVector(Cq, -Sq.dot(Cq)).normalize(),
        wq.crossVectors(Sq, Cq),
        e.setFromRotationMatrix(Tq.makeBasis(Sq, Cq, wq))
      );
    }
    at(e, t) {
      let n = e * 3,
        r = this.was,
        i = this.p,
        a = this.alpha;
      return t.set(
        r[n] + (i[n] - r[n]) * a,
        r[n + 1] + (i[n + 1] - r[n + 1]) * a,
        r[n + 2] + (i[n + 2] - r[n + 2]) * a,
      );
    }
    update(e) {
      for (this.acc += Math.min(e, 0.1); this.acc >= pq;)
        ((this.acc -= pq), this.was.set(this.p), this.step());
      this.alpha = this.acc / pq;
    }
    step() {
      this.follow && this.drift();
      let e = this.integrate();
      (this.braceT > 0 && this.reachOut(),
        this.groundUnder(),
        this.solve(),
        this.impacts(),
        this.limitFixes(),
        this.bounceOff(),
        (this.slide = this.friction() / dq),
        (this.still = e < 0.3 ? this.still + pq : 0));
    }
    drift() {
      let e = this.p,
        t = this.q,
        n = Math.min(1, pq * 3),
        r = (this.target.x - e[0]) * n,
        i = (this.target.y - e[1]) * n,
        a = (this.target.z - e[2]) * n;
      for (let n = 0; n < 45; n += 3)
        ((e[n] += r),
          (e[n + 1] += i),
          (e[n + 2] += a),
          (t[n] += r),
          (t[n + 1] += i),
          (t[n + 2] += a));
    }
    integrate() {
      let e = this.p,
        t = this.q,
        n = this.free,
        r = 0;
      for (let i = 0; i < 45; i += 3) {
        let a = (e[i] - t[i]) * 0.999,
          o = (e[i + 1] - t[i + 1]) * 0.999,
          s = (e[i + 2] - t[i + 2]) * 0.999;
        ((t[i] = e[i]),
          (t[i + 1] = e[i + 1]),
          (t[i + 2] = e[i + 2]),
          (e[i] += a),
          (e[i + 1] += o - J.g * pq * pq),
          (e[i + 2] += s),
          (n[i] = e[i]),
          (n[i + 1] = e[i + 1]),
          (n[i + 2] = e[i + 2]),
          (r = Math.max(r, Math.hypot(a, o, s) / pq)));
      }
      return r;
    }
    reachOut() {
      let e = this.p;
      this.braceT -= pq;
      let t = Math.min(1, pq * vq);
      for (let n of [5, 8]) {
        let r = n * 3;
        ((e[r] += (e[3] + this.braceDir.x * 0.55 - e[r]) * t),
          (e[r + 1] += (e[4] - 0.75 - e[r + 1]) * t),
          (e[r + 2] += (e[5] + this.braceDir.z * 0.55 - e[r + 2]) * t));
      }
    }
    groundUnder() {
      let e = this.p,
        t = this.ground;
      for (let n = 0; n < 15; n++) {
        let r = n * 3,
          i = this.world.height(e[r], e[r + 2]);
        (this.world.normal(e[r], e[r + 2], yq, 0.3),
          (t[n * 4] = i),
          (t[n * 4 + 1] = yq[0]),
          (t[n * 4 + 2] = yq[1]),
          (t[n * 4 + 3] = yq[2]));
      }
    }
    solve() {
      let e = this.p,
        t = this.ground,
        n = this.hits.fill(0);
      for (let r = 0; r < mq; r++) {
        for (let t of this.bones) {
          let n = t.a * 3,
            r = t.b * 3,
            i = e[r] - e[n],
            a = e[r + 1] - e[n + 1],
            o = e[r + 2] - e[n + 2],
            s = Math.hypot(i, a, o) || 1e-6;
          if (t.min && s >= t.len) continue;
          let c = ((s - t.len) / s) * 0.5;
          ((e[n] += i * c),
            (e[n + 1] += a * c),
            (e[n + 2] += o * c),
            (e[r] -= i * c),
            (e[r + 1] -= a * c),
            (e[r + 2] -= o * c));
        }
        for (let r = 0; r < 15; r++) {
          let i = r * 3,
            a = r * 4,
            o = t[a] + lq[r] - e[i + 1];
          if (o > 0) {
            let n = t[a + 2];
            ((e[i] += t[a + 1] * o * n),
              (e[i + 1] += o * n * n),
              (e[i + 2] += t[a + 3] * o * n));
          }
          let s = this.world.obstacleAt(e[i], e[i + 1], e[i + 2], lq[r]);
          s &&
            ((e[i] += s.nx * s.depth),
            (e[i + 2] += s.nz * s.depth),
            (n[r * 2] = s.nx),
            (n[r * 2 + 1] = s.nz));
        }
      }
    }
    impacts() {
      let { p: e, q: t, free: n, ground: r, hits: i } = this;
      for (let a = 0; a < 15; a++) {
        let o = a * 3,
          s = a * 4,
          c = this.touching[a],
          l = (n[o] - t[o]) / pq,
          u = (n[o + 1] - t[o + 1]) / pq,
          d = (n[o + 2] - t[o + 2]) / pq,
          f = e[o + 1] - lq[a] - r[s] < (c & 1 ? fq : 0.02),
          p = i[a * 2] !== 0 || i[a * 2 + 1] !== 0,
          m = 0;
        (f && !(c & 1) && (m = -(l * r[s + 1] + u * r[s + 2] + d * r[s + 3])),
          p &&
            !(c & 2) &&
            (m = Math.max(m, -(l * i[a * 2] + d * i[a * 2 + 1]))),
          (this.hit = Math.max(this.hit, m * uq[a])),
          (this.touching[a] = !!f | (p ? 2 : 0)));
      }
    }
    limitFixes() {
      let { p: e, q: t, free: n } = this;
      for (let r = 0; r < 45; r += 3) {
        let i = e[r] - n[r],
          a = e[r + 1] - n[r + 1],
          o = e[r + 2] - n[r + 2],
          s = Math.hypot(i, a, o);
        if (s <= _q * pq) continue;
        let c = 1 - (_q * pq) / s;
        ((t[r] += i * c), (t[r + 1] += a * c), (t[r + 2] += o * c));
      }
    }
    bounceOff() {
      let { p: e, q: t, hits: n } = this;
      for (let r = 0; r < 15; r++) {
        let i = n[r * 2],
          a = n[r * 2 + 1];
        if (i === 0 && a === 0) continue;
        let o = r * 3,
          s = (e[o] - t[o]) * i + (e[o + 2] - t[o + 2]) * a;
        s < 0 && ((t[o] += i * s * 1.2), (t[o + 2] += a * s * 1.2));
      }
    }
    friction() {
      let { p: e, q: t, ground: n } = this,
        r = 0;
      for (let i = 0; i < 15; i++) {
        let a = i * 3,
          o = i * 4;
        if (e[a + 1] - lq[i] > n[o] + 0.02) continue;
        let s = n[o + 1],
          c = n[o + 2],
          l = n[o + 3],
          u = e[a] - t[a],
          d = e[a + 1] - t[a + 1],
          f = e[a + 2] - t[a + 2],
          p = u * s + d * c + f * l,
          m = u - s * p,
          h = d - c * p,
          g = f - l * p,
          _ = Math.hypot(m, h, g) / pq;
        r += _ * uq[i];
        let v = Math.max(0, _ - hq * J.g * c * pq),
          y = Math.sqrt(Math.max(0, 1 - c * c)) / Math.max(0.2, c),
          b = v < gq && y < hq ? 0 : _ > 1e-6 ? v / _ : 0;
        ((m *= b), (h *= b), (g *= b));
        let x = p < 0 ? -p * 0.2 : p;
        ((u = m + s * x),
          (d = h + c * x),
          (f = g + l * x),
          (t[a] = e[a] - u),
          (t[a + 1] = e[a + 1] - d),
          (t[a + 2] = e[a + 2] - f));
      }
      return r;
    }
  },
  Dq = { limb: 20, torso: 44, neck: 14 },
  Oq = 0.022,
  kq = 2 / 1024,
  Aq = 0.024,
  jq = { shoulder: 0.055, elbow: 0.05, hip: 0.07, knee: 0.06 },
  Mq = { shoulder: 0.05, elbow: 0.06, hip: 0, knee: 0.08 },
  Nq = [
    [-0.14, 0.022, 0.025, 0.018],
    [-0.133, 0.058, 0.05, 0.05, 0.004],
    [-0.12, 0.092, 0.066, 0.084, 0.008],
    [-0.103, 0.12, 0.08, 0.112, 0.012],
    [-0.082, 0.155, 0.092, 0.132, 0.014],
    [-0.055, 0.17, 0.1, 0.143, 0.014],
    [-0.025, 0.178, 0.102, 0.142, 0.012],
    [0.005, 0.178, 0.108, 0.132, 0.006],
    [0.045, 0.171, 0.11, 0.122],
    [0.09, 0.166, 0.108, 0.118],
  ],
  Pq = [
    [0.05, 0.176, 0.12, 0.13],
    [0.1, 0.165, 0.11, 0.12],
    [0.18, 0.16, 0.106, 0.12],
    [0.27, 0.174, 0.114, 0.13],
    [0.36, 0.192, 0.124, 0.14],
    [0.44, 0.2, 0.117, 0.142],
    [0.5, 0.186, 0.1, 0.13],
    [0.545, 0.13, 0.077, 0.097],
    [0.575, 0.068, 0.056, 0.062],
  ],
  Fq = { from: 0.52, to: 0.65, r: [0.054, 0.047] },
  Iq = [
    [`shoulder`, -0.08, 0.06],
    [`shoulder`, -0.03, 0.068],
    [`shoulder`, 0, 0.071],
    [`shoulder`, 0.05, 0.066],
    [`shoulder`, 0.15, 0.057],
    [`elbow`, 0, 0.051],
    [`elbow`, 0.06, 0.05],
    [`end`, -0.05, 0.045],
    [`end`, 0, 0.043],
  ],
  Lq = [
    [`hip`, -0.08, 0.058],
    [`hip`, -0.03, 0.064],
    [`hip`, 0, 0.07],
    [`hip`, 0.05, 0.083],
    [`hip`, 0.12, 0.092],
    [`end`, -0.04, 0.087],
    [`end`, 0, 0.089],
  ],
  Rq = [
    [`knee`, -0.1, 0.064],
    [`knee`, 0, 0.058],
    [`knee`, 0.12, 0.06],
    [`knee`, 0.3, 0.048],
    [`end`, 0, 0.042],
  ],
  zq = 0.42,
  Bq = { shoulder: 0.08, hip: 0.08, knee: 0.1 },
  Vq = { thick: 0.006, up: 0.03 },
  Hq = class extends Vn {
    a;
    b;
    restA;
    restB;
    constructor(e, t) {
      (super(),
        (this.a = e),
        (this.b = t),
        (this.restA = e.quaternion.clone().invert()),
        (this.restB = t.quaternion.clone().invert()),
        this.position.copy(t.position));
    }
    updateMatrix() {
      (Uq.multiplyQuaternions(this.a.quaternion, this.restA),
        Wq.multiplyQuaternions(this.b.quaternion, this.restB),
        this.quaternion.slerpQuaternions(Uq, Wq, 0.5),
        this.position.copy(this.b.position),
        super.updateMatrix());
    }
  },
  Uq = new qt(),
  Wq = new qt(),
  Gq = new qt(),
  Kq = new M(),
  qq = (e, t, n, r, i) => ({
    at: e,
    x: t,
    z: n,
    w: r,
    front: r,
    back: r,
    seam: 0,
    n: 2,
    v: i,
  });
