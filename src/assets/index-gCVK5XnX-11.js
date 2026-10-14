// assets/index-gCVK5XnX 11 — math
// Lines 49817-50182 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var uz = (function (e) {
    return (
      (e[(e.Trail = 0)] = `Trail`),
      (e[(e.Dirt = 1)] = `Dirt`),
      (e[(e.Grass = 2)] = `Grass`),
      (e[(e.Forest = 3)] = `Forest`),
      (e[(e.Rock = 4)] = `Rock`),
      (e[(e.Wood = 5)] = `Wood`),
      (e[(e.Water = 6)] = `Water`),
      e
    );
  })({}),
  dz = { 0: 0.3, 1: 0.6, 2: 0.7, 3: 0.9, 4: 1, 5: 0.8, 6: 0.5 },
  fz = 36,
  pz = 64,
  mz = 0.3,
  hz = 4,
  gz = 10,
  _z = { s: 0, u: 0 },
  vz = { s: 0, u: 0 },
  yz = { x: 0, z: 0, tx: 0, tz: 0 },
  bz = class {
    trail;
    h = new Float32Array(oz * oz);
    cover = new Uint8Array(oz * oz * 4);
    grass = new Uint8Array(oz * oz);
    cover2 = new Uint8Array(oz * oz * 4);
    obstacles = new FR();
    lift;
    creek;
    trials = null;
    constructor(e) {
      ((this.trail = e), (this.lift = new Nee(e)), (this.creek = new uL(e)));
    }
    setObstacles(e, t) {
      for (let n of [
        ...e.map(NR),
        ...(this.trials?.obstacles() ?? []),
        ...this.lift.solids(),
        ...t.map(PR),
      ])
        this.obstacles.add(n);
    }
    obstacleAt(e, t, n, r) {
      let i = this.obstacles.at(e, t, n, r),
        a = this.trials?.solid(e, t, n, r);
      return a && (!i || a.depth > i.depth) ? a : i;
    }
    async bake(e) {
      let t = lz(),
        n = this.nearTrail(),
        r = await t;
      await e(0.6);
      let i = this.bench(r, n);
      await e(0.75);
      for (let e = 0; e < oz * oz; e++) this.h[e] = r[e] + i[e];
      let a = this.levelPads(n),
        o = this.carveCreek(),
        s = this.sinkRibbon(n);
      await e(0.85);
      let c = this.bakeCover(s, o, a);
      (this.lift.build(this),
        (this.trials = new rz(this.trail, (e, t) => this.baseHeight(e, t))),
        await c,
        this.wearRoundStunts(this.trials),
        await e(1));
    }
    liftClearance(e, t) {
      return this.lift.clearance(e, t);
    }
    stuntClearance(e, t) {
      return this.trials ? this.trials.clearance(e, t) : 1 / 0;
    }
    height(e, t) {
      let n = this.baseHeight(e, t),
        r = this.trials ? this.trials.top(e, t) : -1 / 0;
      return r > n ? r : n;
    }
    baseHeight(e, t) {
      return this.trail.locate(e, t, _z, 6.1)
        ? this.ribbonHeight(_z.s, _z.u)
        : this.groundHeight(e, t);
    }
    channelHeight(e, t) {
      return (
        this.creek.pointAt(e, yz, Math.sign(t) * this.creek.reach(e, t)),
        this.creek.channel(e, t, this.gridHeight(yz.x, yz.z))
      );
    }
    water(e, t) {
      if (
        !this.creek.locate(e, t, vz, 14) ||
        Math.abs(vz.u) > this.creek.halfWidth(vz.s, vz.u) + 0.6
      )
        return -1 / 0;
      let n = this.creek.overTrail(vz.s);
      return OF(
        this.creek.waterAt(vz.s),
        n > 0 ? this.baseHeight(e, t) + tL : 0,
        n,
      );
    }
    creekClearance(e, t) {
      return this.creek.locate(e, t, vz, 14)
        ? Math.abs(vz.u) - this.creek.reach(vz.s, vz.u)
        : 1 / 0;
    }
    ribbonHeight(e, t) {
      let n = Math.abs(t);
      if (n <= 2.9) return this.trail.surface(e, t);
      let r = t < 0 ? -1 : 1;
      return OF(
        this.trail.surface(e, r * xI),
        this.ribbonEdge(e, r),
        X(xI, SI, n),
      );
    }
    normal(e, t, n, r, i = !1) {
      let a = (e, t) => (i ? this.baseHeight(e, t) : this.height(e, t)),
        o = a(e + r, t) - a(e - r, t),
        s = a(e, t + r) - a(e, t - r),
        c = Math.hypot(o, 2 * r, s);
      return ((n[0] = -o / c), (n[1] = (2 * r) / c), (n[2] = -s / c), n);
    }
    slope(e, t) {
      return (
        Math.hypot(
          this.gridHeight(e + 2, t) - this.gridHeight(e - 2, t),
          this.gridHeight(e, t + 2) - this.gridHeight(e, t - 2),
        ) / 4
      );
    }
    trailDistance(e, t, n) {
      if (!this.trail.locate(e, t, _z, n)) return 1 / 0;
      let r = this.trail.at(_z.s).k,
        i = _z.u * r < 0;
      return (
        Math.abs(_z.u) -
        (i ? 14 * X(1 / 160, 1 / 45, Math.abs(r)) : 0) -
        gz * this.trail.jumpClearing(_z.s)
      );
    }
    surface(e, t) {
      if (this.water(e, t) > this.baseHeight(e, t) + 0.02) return 6;
      if (this.trail.locate(e, t, _z, 6.1)) return Math.abs(_z.u) < 3.3 ? 0 : 1;
      let n = (cz(t) * oz + cz(e)) * 4,
        r = this.cover;
      return r[n + 2] > 150 ? 4 : r[n] > 120 ? 1 : r[n + 1] > 140 ? 3 : 2;
    }
    gridHeight(e, t) {
      let n = (e + ZF) / 2,
        r = (t + ZF) / 2;
      if (n < 0 || r < 0 || n >= oz - 1 || r >= oz - 1) return uI(e, t);
      let i = Math.floor(n),
        a = Math.floor(r),
        o = n - i,
        s = r - a,
        c = a * oz + i,
        l = this.h,
        u = l[c],
        d = l[c + 1],
        f = l[c + oz],
        p = l[c + oz + 1];
      return (i + a) & 1
        ? o + s <= 1
          ? u + (d - u) * o + (f - u) * s
          : p + (f - p) * (1 - o) + (d - p) * (1 - s)
        : s >= o
          ? u + (p - f) * o + (f - u) * s
          : u + (d - u) * o + (p - d) * s;
    }
    ribbonEdge(e, t) {
      return (
        this.trail.pointAt(e, yz, t * SI),
        this.groundHeight(yz.x, yz.z) - 0.04
      );
    }
    groundHeight(e, t) {
      return this.creek.locate(e, t, vz, 14) &&
        Math.abs(vz.u) < this.creek.reach(vz.s, vz.u)
        ? this.channelHeight(vz.s, vz.u)
        : this.gridHeight(e, t);
    }
    nearTrail() {
      let e = oz,
        t = {
          d2: new Float32Array(e * e).fill(1 / 0),
          s: new Float32Array(e * e),
          u: new Float32Array(e * e),
        },
        n = this.trail.path,
        r = Math.ceil(pz / 2);
      for (let i = 0; i < n.length; i += 3) {
        let a = n[i],
          o = cz(a.x),
          s = cz(a.z);
        for (let n = Math.max(0, s - r); n <= Math.min(e - 1, s + r); n++) {
          let s = sz(n);
          for (let c = Math.max(0, o - r); c <= Math.min(e - 1, o + r); c++) {
            let r = sz(c),
              o = (r - a.x) ** 2 + (s - a.z) ** 2,
              l = n * e + c;
            o < t.d2[l] &&
              ((t.d2[l] = o),
              (t.s[l] = i * dI),
              (t.u[l] = (r - a.x) * -a.tz + (s - a.z) * a.tx));
          }
        }
      }
      return t;
    }
    bench(e, t) {
      let n = oz,
        r = new Float32Array(n * n);
      for (let i = 0; i < n * n; i++) {
        if (t.d2[i] === 1 / 0) continue;
        let n = Math.sqrt(t.d2[i]);
        if (n > pz) continue;
        let a = t.s[i],
          o = Math.abs(t.u[i]),
          s = this.trail.baseAt(a),
          c = this.trail.ground[Math.round(a / dI)],
          l = X(xI + 2, fz, o),
          u =
            s +
            this.trail.bermAt(a, t.u[i]) * (1 - X(xI, xI + 12, o)) +
            (e[i] - c) * l,
          d = 1 - X(fz * 0.75, pz, n);
        r[i] = (u - e[i]) * d;
      }
      return (xz(r, n, 3), r);
    }
    levelPads(e) {
      let t = oz,
        n = this.h,
        r = [!1, !0].map((e) => {
          let r = this.lift,
            i = r.world(e ? r.length - 7 : 7, tR, { x: 0, z: 0 });
          return n[cz(i.z) * t + cz(i.x)];
        }),
        i = new Float64Array(t * t);
      for (let e = 0; e < t; e++)
        for (let a = 0; a < t; a++) {
          let o = this.lift.pad(sz(a), sz(e));
          if (o.w <= 0) continue;
          let s = e * t + a;
          ((i[s] = o.w), (n[s] += (r[+!!o.top] - n[s]) * o.w));
        }
      let a = _R(this.trail).ground;
      for (let r = 0; r < t * t; r++) {
        if (e.d2[r] > pz ** 2) continue;
        let t = vR(e.s[r], e.u[r]);
        t <= 0 || ((i[r] = Math.max(i[r], t)), (n[r] += (a - n[r]) * t));
      }
      return i;
    }
    carveCreek() {
      let e = oz,
        t = this.h,
        n = this.creek;
      n.settle((e, t) => this.gridHeight(e, t));
      let r = new Uint8Array(e * e).fill(255),
        [i, a, o, s] = vI(n.path);
      for (let c = cz(a - 28); c <= cz(s + 28); c++)
        for (let a = cz(i - 28); a <= cz(o + 28); a++) {
          let i = sz(a),
            o = sz(c);
          if (!n.locate(i, o, vz, 28)) continue;
          let s = c * e + a,
            l = Math.abs(vz.u) - n.reach(vz.s, vz.u),
            u = Math.abs(vz.u) - n.halfWidth(vz.s, vz.u) - n.riseAt(vz.s, vz.u);
          if (((r[s] = Y(u, 0, 255)), this.trail.locate(i, o, _z, 5.8)))
            continue;
          let d = n.top(vz.s);
          t[s] =
            l >= 0
              ? OF(t[s], n.gully(vz.s, vz.u), 1 - X(0, 14, l))
              : u > 0
                ? d
                : n.channel(vz.s, vz.u, d) - mz;
        }
      return r;
    }
    sinkRibbon(e) {
      let t = oz,
        n = this.h,
        r = new Uint8Array(t * t);
      for (let i = 0; i < t; i++)
        for (let a = 0; a < t; a++) {
          let o = i * t + a;
          if (e.d2[o] > 12.1 ** 2) {
            r[o] = Math.min(255, Math.sqrt(e.d2[o]));
            continue;
          }
          let s = this.trail.locate(sz(a), sz(i), _z, 14.1)
            ? Math.abs(_z.u)
            : SI + 8;
          ((r[o] = s), (n[o] -= mz * (1 - X(SI - 2, SI + 0.6, s))));
        }
      let i = [];
      for (let n = 0; n < t; n++)
        for (let r = 0; r < t; r++) {
          let a = n * t + r;
          e.d2[a] > 6.1 ** 2 ||
            (this.trail.locate(sz(r), sz(n), _z, 6.1) &&
              Math.abs(_z.u) < 5.8 &&
              i.push(a, _z.s, _z.u));
        }
      for (let e = 0; e < 3; e++)
        for (let e = 0; e < i.length; e += 3) {
          let t = i[e];
          n[t] = Math.min(n[t], this.ribbonHeight(i[e + 1], i[e + 2]) - mz);
        }
      return r;
    }
    async bakeCover(e, t, n) {
      let r = oz;
      await VF(r, async (i, a) => {
        let o = Math.max(0, i - 1),
          s = {
            j0: i,
            j1: a,
            n: r,
            cell: 2,
            h: this.h.slice(o * r, Math.min(r, a + 1) * r),
            hFrom: o,
            trailDist: e.slice(i * r, a * r),
            creekDist: t.slice(i * r, a * r),
            pads: n.slice(i * r, a * r),
          },
          c = await BF(
            () =>
              new Worker(
                new URL(
                  new URL(`cover.worker-DrUDywG9.js`, import.meta.url).href,
                  `` + import.meta.url,
                ),
                { type: `module` },
              ),
            s,
            () => LL(s, this.lift),
          );
        (this.cover.set(c.cover, i * r * 4),
          this.grass.set(c.grass, i * r),
          this.cover2.set(c.cover2, i * r * 4));
      });
    }
    wearRoundStunts(e) {
      let t = oz,
        n = new Uint8Array(t * t);
      for (let [r, i, a] of e.reaches(6))
        for (let e = cz(i - a); e <= cz(i + a); e++)
          for (let i = cz(r - a); i <= cz(r + a); i++) n[e * t + i] = 1;
      for (let r = 0; r < t; r++)
        for (let i = 0; i < t; i++) {
          let a = r * t + i;
          if (!n[a]) continue;
          let o = e.clearance(sz(i), sz(r));
          if (o > hz) continue;
          let s = 1 - X(0.5, 3.5, o);
          ((this.grass[a] *= 1 - s),
            (this.cover2[a * 4 + 1] = this.grass[a]),
            (this.cover[a * 4] = Math.max(this.cover[a * 4], 230 * s)));
        }
    }
  };
