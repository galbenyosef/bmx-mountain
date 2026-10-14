// assets/index-gCVK5XnX 07 — math
// Lines 48746-49109 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var RL = 5.6,
  zL = 2.6,
  BL = 0.55,
  VL = 7,
  HL = 1.2,
  UL = 7,
  WL = 5,
  GL = 7,
  KL = 0.62,
  qL = 7.5,
  JL = 0.012,
  YL = 100,
  XL = 9,
  ZL = 30,
  QL = { back: 8, front: 20, left: 9.5, right: 9, blend: 10 },
  $L = 9,
  eR = [
    { a: -1.6, v: 0 },
    { a: 12.8, v: 0 },
  ],
  tR = RL / 2,
  nR = Math.PI * tR,
  STATION = { a: -2, v: -8.2, along: 3.2, across: 2.4, high: 2.7 },
  iR = { back: -4.2, front: 14.5, above: 0.35, tall: 1.5 },
  aR = 0.25,
  oR = 0.02,
  sR = { x: 0, z: 0 },
  cR = { u: 0, v: 0 },
  Nee = class {
    bottom = { x: 0, z: 0 };
    top = { x: 0, z: 0 };
    dx;
    dz;
    rx;
    rz;
    length;
    towers = [];
    bottomY = 0;
    topY = 0;
    chairs = 0;
    loadD;
    unloadD;
    period = 0;
    loop;
    profile = new Float32Array();
    dAt = new Float32Array();
    tAt = new Float32Array();
    constructor(e) {
      let t = { x: 0, z: 0, tx: 0, tz: 0 };
      e.pointAt(e.length - 0.01, t);
      let n = {
        x: t.x + t.tx * 12 - t.tz * 12,
        z: t.z + t.tz * 12 + t.tx * 12,
      };
      (e.pointAt(RI, t), (this.top.x = t.x + 4), (this.top.z = t.z - 42));
      let r = 0,
        i = -1,
        a = n.x,
        o = n.z;
      for (let e = 0; e < 4; e++) {
        let e = Math.hypot(this.top.x - a, this.top.z - o);
        ((r = (this.top.x - a) / e),
          (i = (this.top.z - o) / e),
          (a = n.x - r * WL + i * tR),
          (o = n.z - i * WL - r * tR));
      }
      ((this.bottom.x = a),
        (this.bottom.z = o),
        (this.dx = r),
        (this.dz = i),
        (this.rx = -i),
        (this.rz = r),
        (this.length = Math.hypot(this.top.x - a, this.top.z - o)),
        (this.loop = 2 * this.length + 2 * nR),
        (this.loadD = WL),
        (this.unloadD = this.length - GL));
    }
    world(e, t, n) {
      return (
        (n.x = this.bottom.x + this.dx * e + this.rx * t),
        (n.z = this.bottom.z + this.dz * e + this.rz * t),
        n
      );
    }
    pad(e, t) {
      let { u: n, v: r } = this.local(e, t),
        i = n < this.length / 2,
        a = i ? n : this.length - n,
        o = Math.max(-QL.back - a, a - QL.front, -QL.left - r, r - QL.right, 0);
      return { w: 1 - smoothstep(0, QL.blend, o), top: !i };
    }
    clearance(e, t) {
      let { u: n, v: r } = this.local(e, t),
        i = n < 0 ? -n : n > this.length ? n - this.length : 0,
        a = Math.hypot(i, r) - $L,
        o = this.pad(e, t).w > 0 ? -1 : 1 / 0;
      return Math.min(a, o);
    }
    loading() {
      let e = this.world(this.loadD, tR, { x: 0, z: 0 });
      return {
        x: e.x,
        y: this.bottomY - zL - BL,
        z: e.z,
        yaw: headingFromXZ(this.dx, this.dz),
      };
    }
    stationAt(e, t, n, r) {
      let i = this.world(e ? this.length - t : t, n, { x: 0, z: 0 });
      return (
        (r.x = i.x),
        (r.z = i.z),
        (r.y = (e ? this.topY : this.bottomY) - zL - BL),
        r
      );
    }
    solids() {
      let e = (e, t, n, r, i) => ({
          x: e,
          z: t,
          r,
          bottom: n - 1,
          top: i,
          what: `Hit the chairlift`,
        }),
        t = this.towers.map((t) => e(t.x, t.z, t.y, 0.45, t.y + t.h + 1)),
        n = { x: 0, y: 0, z: 0 };
      for (let r of [!1, !0]) {
        let i = r ? this.topY : this.bottomY;
        for (let a of eR)
          (this.stationAt(r, a.a, a.v, n),
            t.push(e(n.x, n.z, n.y, 0.42, i + iR.above + iR.tall)));
        for (let i of [-0.8, 0.8])
          (this.stationAt(r, STATION.a + i, STATION.v, n),
            t.push(e(n.x, n.z, n.y, 1.35, n.y + STATION.high)));
      }
      return t;
    }
    build(e) {
      ((this.bottomY = this.groundAt(e, this.loadD, tR) + BL + zL),
        (this.topY = this.groundAt(e, this.unloadD, tR) + BL + zL),
        this.placeTowers(e),
        this.raiseCable(e),
        this.lay(),
        this.time());
    }
    placeTowers(e) {
      let t = this.length - 14 - 22,
        n = Math.max(1, Math.round((t - 36) / YL));
      this.towers = [];
      for (let r = 0; r <= n; r++) {
        let i = this.towerSpot(e, 36 + ((t - 36) * r) / n);
        i !== null &&
          !this.towers.some((e) => Math.abs(e.u - i) < 30) &&
          this.towers.push(this.tower(e, i));
      }
    }
    raiseCable(e) {
      let t = this.length,
        n = (t) =>
          Math.max(
            this.groundAt(e, t, tR),
            this.groundAt(e, t, -2.8),
            this.groundAt(e, t, 0),
          );
      for (let r = 0; r < 80; r++) {
        (this.towers.sort((e, t) => e.u - t.u), this.lay());
        let r = 0,
          i = 0;
        for (let e = 14; e <= t - 14; e += 2) {
          let a = Math.min(e - 14, t - 14 - e),
            o =
              Math.min(qL, 3.1500000000000004 + a * 0.13) -
              (this.cableY(e) - n(e));
          o > r && ((r = o), (i = e));
        }
        if (r < 0.05) return;
        let a =
          Math.min(
            ...this.towers.map((e) => Math.abs(e.u - i)),
            i - 14,
            t - 14 - i,
          ) > 35 && r > 1.5
            ? this.towerSpot(e, i)
            : null;
        if (a !== null && !this.towers.some((e) => Math.abs(e.u - a) < 25)) {
          this.towers.push(this.tower(e, a));
          continue;
        }
        let o = !1;
        for (let e of this.towers) {
          let t = Math.abs(e.u - i);
          t < YL * 1.1 &&
            e.h < ZL &&
            ((e.h = Math.min(ZL, e.h + r * (1 - t / (YL * 1.1)) + 0.25)),
            (o = !0));
        }
        if (!o) return;
      }
    }
    groundAt(e, t, n) {
      return (this.world(t, n, sR), e.height(sR.x, sR.z));
    }
    towerSpot(e, t) {
      let n = (t) =>
        t < 24 || t > this.length - 14 - 10
          ? !1
          : (this.world(t, 0, sR),
            e.trailDistance(sR.x, sR.z, 40) > 9 &&
              e.trailDistance(sR.x + this.rx * 2.8, sR.z + this.rz * 2.8, 40) >
                7 &&
              e.trailDistance(sR.x - this.rx * 2.8, sR.z - this.rz * 2.8, 40) >
                7);
      for (let e = 0; e < 40; e += 2)
        for (let r of [t + e, t - e]) if (n(r)) return r;
      return null;
    }
    tower(e, t) {
      return (
        this.world(t, 0, sR),
        { u: t, x: sR.x, z: sR.z, y: e.height(sR.x, sR.z), h: XL }
      );
    }
    cableY(e) {
      return yI(this.profile, e);
    }
    chairD(e, t) {
      let n = this.period,
        r = wrap(t + (e * n) / this.chairs, n);
      return yI(this.dAt, r / oR);
    }
    nextChair(e, t) {
      let [n, r, i] = this.due(e, t);
      return { chair: wrap(-r, this.chairs), at: n + r * i };
    }
    arrival(e, t, n) {
      let [r, i, a] = this.due(t, n);
      return r + (i + wrap(-e - i, this.chairs)) * a;
    }
    due(e, t) {
      let n = this.period / this.chairs,
        r = yI(this.tAt, e / aR);
      return [r, Math.ceil((t - r) / n - 1e-6), n];
    }
    chairAt(e, t, n) {
      return this.gripAt(this.chairD(e, t), n);
    }
    seatAt(e, t, n, r) {
      this.chairAt(e, n, r);
      let i = (t - 3 / 2) * KL,
        a = -Math.sin(r.yaw),
        o = -Math.cos(r.yaw);
      return ((r.x += -o * i), (r.z += a * i), (r.y -= zL), r);
    }
    local(e, t) {
      let n = e - this.bottom.x,
        r = t - this.bottom.z;
      return (
        (cR.u = n * this.dx + r * this.dz),
        (cR.v = n * this.rx + r * this.rz),
        cR
      );
    }
    lay() {
      let e = this.length,
        t = [
          [0, this.bottomY, !1],
          [14, this.bottomY, !1],
          ...this.towers.map((e) => [e.u, e.y + e.h, !0]),
          [e - 14, this.topY, !1],
          [e, this.topY, !1],
        ],
        n = Math.ceil(e) + 1;
      this.profile = new Float32Array(n);
      let r = 0;
      for (let i = 0; i < n; i++) {
        let n = Math.min(i, e);
        for (; r < t.length - 2 && t[r + 1][0] < n;) r++;
        let [a, o] = t[r],
          [s, c] = t[r + 1],
          l = s - a,
          u = l > 0 ? (n - a) / l : 0,
          d = n > 14 && n < e - 14;
        this.profile[i] = lerp(o, c, u) - (d ? JL * l * 4 * u * (1 - u) : 0);
      }
    }
    speedAt(e) {
      let t = this.length;
      if ((e >= t && e < t + nR) || e >= 2 * t + nR) return HL;
      let n = e < t ? e : 2 * t + nR - e;
      return lerp(HL, VL, smoothstep(14, 26, n) * smoothstep(14, 26, t - n));
    }
    time() {
      let e = Math.ceil(this.loop / aR) + 1;
      this.tAt = new Float32Array(e);
      for (let t = 1; t < e; t++) {
        let e = (t - 0.5) * aR;
        this.tAt[t] =
          this.tAt[t - 1] + aR / this.speedAt(Math.min(e, this.loop - 0.001));
      }
      ((this.period = this.tAt[e - 1] * (this.loop / ((e - 1) * aR))),
        (this.chairs = Math.max(1, Math.round(this.period / UL))));
      let t = Math.ceil(this.period / oR) + 1;
      this.dAt = new Float32Array(t);
      let n = 0;
      for (let r = 0; r < t; r++) {
        let t = r * oR;
        for (; n < e - 2 && this.tAt[n + 1] < t;) n++;
        let i = this.tAt[n + 1] - this.tAt[n],
          a = i > 0 ? Math.min(1, (t - this.tAt[n]) / i) : 0;
        this.dAt[r] = Math.min(this.loop, (n + a) * aR);
      }
    }
    gripAt(e, t) {
      let n = this.length,
        r,
        i,
        a,
        o,
        s;
      if (e < n)
        ((r = e), (i = tR), (a = this.dx), (o = this.dz), (s = this.cableY(r)));
      else if (e < n + nR) {
        let t = (e - n) / tR;
        ((r = n + Math.sin(t) * tR),
          (i = Math.cos(t) * tR),
          (a = this.dx * Math.cos(t) - this.rx * Math.sin(t)),
          (o = this.dz * Math.cos(t) - this.rz * Math.sin(t)),
          (s = this.topY));
      } else if (e < 2 * n + nR)
        ((r = n - (e - n - nR)),
          (i = -2.8),
          (a = -this.dx),
          (o = -this.dz),
          (s = this.cableY(r)));
      else {
        let t = (e - 2 * n - nR) / tR;
        ((r = -Math.sin(t) * tR),
          (i = -Math.cos(t) * tR),
          (a = -this.dx * Math.cos(t) + this.rx * Math.sin(t)),
          (o = -this.dz * Math.cos(t) + this.rz * Math.sin(t)),
          (s = this.bottomY));
      }
      return (
        this.world(r, i, sR),
        (t.x = sR.x),
        (t.y = s),
        (t.z = sR.z),
        (t.yaw = headingFromXZ(a, o)),
        t
      );
    }
  },
  lR = 34,
  Pee = 10,
  uR = 0.45,
  dR = 3.4,
  fR = 8.6,
  pR = 2.4,
  Fee = 4.5,
  Iee = 0.8,
  mR = 1.05,
  Lee = 32,
  hR = 7;
