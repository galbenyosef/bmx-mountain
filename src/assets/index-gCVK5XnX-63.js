// assets/index-gCVK5XnX 63 — math
// Lines 67127-67506 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var G7 = (e) => e.metadata?.game === w7 && e.metadata?.v === 7,
  K7 = (e) => e.playerCount < e.maxPlayers,
  q7 = 3.2,
  J7 = 6,
  Y7 = 14,
  X7 = 12,
  Z7 = 0.55,
  Q7 = 1,
  $7 = 0.5,
  e9 = 0.3,
  t9 = class {
    terrain;
    pos = new M();
    yaw = 0;
    speed = 0;
    phase = 0;
    vx = 0;
    vz = 0;
    vy = 0;
    constructor(e) {
      this.terrain = e;
    }
    place(e, t, n) {
      (this.pos.set(e, this.ground(e, t, 1 / 0), t),
        (this.yaw = n),
        (this.vx = this.vz = this.vy = this.speed = 0));
    }
    update(e, t, n, r, i) {
      if (e <= 0) return;
      let a = this.pos,
        o = -Math.sin(r),
        s = -Math.cos(r),
        c = o * n - s * t,
        l = s * n + o * t,
        u = Math.hypot(c, l),
        d = (i ? J7 : q7) * Math.min(1, u);
      ((c = u > 0.001 ? (c / u) * d : 0), (l = u > 0.001 ? (l / u) * d : 0));
      let f = c - this.vx,
        p = l - this.vz,
        m = Math.hypot(f, p),
        h = Math.min(1, (Y7 * e) / (m || 1));
      ((this.vx += f * h), (this.vz += p * h));
      let g = clamp(a.x + this.vx * e, -WORLD_HALF + 12, WORLD_HALF - 12),
        _ = clamp(a.z + this.vz * e, -WORLD_HALF + 12, WORLD_HALF - 12),
        v = Math.hypot(g - a.x, _ - a.z),
        y = this.ground(g, _, a.y),
        b = v > 1e-6 ? (g - a.x) / v : 0,
        x = v > 1e-6 ? (_ - a.z) / v : 0,
        S =
          (this.terrain.baseHeight(a.x + b * $7, a.z + x * $7) -
            this.terrain.baseHeight(a.x, a.z)) /
          $7;
      y - a.y > Z7 || (y - a.y > 0.02 && S > Q7)
        ? (this.vx = this.vz = 0)
        : ((a.x = g), (a.z = _));
      let C = this.terrain.obstacleAt(a.x, a.y + Z7, a.z, e9);
      if (C) {
        ((a.x += C.nx * C.depth), (a.z += C.nz * C.depth));
        let e = this.vx * C.nx + this.vz * C.nz;
        e < 0 && ((this.vx -= C.nx * e), (this.vz -= C.nz * e));
      }
      let w = this.ground(a.x, a.z, a.y);
      (a.y > w + 0.4 || this.vy > 0
        ? ((this.vy -= PHYSICS.g * e),
          (a.y = Math.max(w, a.y + this.vy * e)),
          a.y <= w && (this.vy = 0))
        : ((a.y = w), (this.vy = 0)),
        (this.speed = Math.hypot(this.vx, this.vz)),
        this.speed > 0.2 &&
          (this.yaw = lerpAngle(this.yaw, headingFromXZ(this.vx, this.vz), Math.min(1, X7 * e))),
        this.speed > 0.05 &&
          (this.phase =
            (this.phase + (Math.PI * this.speed * e) / AX(this.speed)) % TAU));
    }
    ground(e, t, n) {
      let r = this.terrain.height(e, t);
      return r - n > Z7 ? this.terrain.baseHeight(e, t) : r;
    }
  },
  n9 = 2.2,
  r9 = 0.45,
  i9 = new M(),
  a9 = class {
    terrain;
    sound;
    dust;
    on = !1;
    walker;
    laidT = 0;
    footfall = 0;
    constructor(e, t, n) {
      ((this.terrain = e),
        (this.sound = t),
        (this.dust = n),
        (this.walker = new t9(e)));
    }
    getOff(e) {
      ((this.on = !0),
        (this.laidT = 0),
        this.walker.place(
          e.pos.x + Math.cos(e.yaw) * 0.7,
          e.pos.z - Math.sin(e.yaw) * 0.7,
          e.yaw,
        ));
    }
    near(e) {
      return (
        Math.hypot(this.walker.pos.x - e.pos.x, this.walker.pos.z - e.pos.z) <
        n9
      );
    }
    walk(e, t, n) {
      let r = this.walker;
      (r.update(e, t.x, t.y, n, t.run), (this.laidT += e));
      let i = Math.floor(r.phase / Math.PI);
      if (i !== this.footfall && r.speed > 0.3) {
        let { x: e, z: t } = r.pos,
          n = this.terrain.surface(e, t);
        (this.sound.step(
          n,
          this.terrain.height(e, t) > this.terrain.baseHeight(e, t) + 0.1,
          r.speed,
        ),
          n === SURFACE.Water && this.dust.spray(r.pos, i9, 3));
      }
      this.footfall = i;
    }
    pose(e, t) {
      e.state(t);
      let n = smoothstep(0, r9, this.laidT),
        r = this.walker;
      Object.assign(t, {
        mode: RIDE_MODE.Walk,
        chair: -1,
        y: lerp(t.y, this.terrain.height(t.x, t.z) + 0.12, n),
        roll: 1.4 * n,
        pitch: t.pitch * (1 - n),
        steer: 0,
        bars: 0,
        crouch: 0,
        compF: 0,
        compR: 0,
        pedal: 0,
        crank: r.phase,
        speed: r.speed,
        bx: r.pos.x,
        by: r.pos.y,
        bz: r.pos.z,
        bqx: 0,
        bqy: Math.sin(r.yaw / 2),
        bqz: 0,
        bqw: Math.cos(r.yaw / 2),
      });
    }
  },
  o9 = 200,
  s9 = 0.5,
  c9 = 85,
  l9 = 11,
  u9 = 22,
  d9 = 120,
  f9 = 0.45,
  p9 = 12,
  m9 = 720,
  h9 = 1.2,
  g9 = 0.7,
  _9 = 18,
  v9 = 0.25,
  Ree = -3,
  y9 = { x: 0, z: 0, tx: 0, tz: 0 },
  b9 = new M(),
  x9 = new M(),
  zee = new M(),
  Bee = new M(),
  Vee = F4(),
  Hee = class {
    trail;
    ground;
    mesh;
    at;
    turn;
    was;
    wasTurn;
    flights = [new Map(), new Map()];
    constructor(e, t) {
      ((this.trail = e), (this.ground = t));
      let n = Uee();
      ((this.at = makeBuffer(_9, 4)),
        (this.turn = makeBuffer(_9, 4)),
        (this.was = makeBuffer(_9, 4)),
        (this.wasTurn = makeBuffer(_9, 4)),
        n.setAttribute(`bird`, this.at),
        n.setAttribute(`birdTurn`, this.turn),
        n.setAttribute(`birdWas`, this.was),
        n.setAttribute(`birdWasTurn`, this.wasTurn),
        (n.instanceCount = 0));
      let r = new nS({ side: 2, roughness: 0.85, metalness: 0 }),
        i = tslAttribute(`bird`, `vec4`),
        a = tslAttribute(`birdTurn`, `vec4`),
        o = tslAttribute(`birdWas`, `vec4`),
        s = tslAttribute(`birdWasTurn`, `vec4`);
      ((r.positionNode = tslFn(
        () => (
          cV.assign(w9(oV, o.xyz, i.w, s.xyz, o.w, !1)),
          YB.assign(w9(JB, tslVec3(0), 1, a.xyz, a.w, !0)),
          w9(oV, i.xyz, i.w, a.xyz, a.w, !1)
        ),
      )()),
        (r.colorNode = tslMix(tslVec3(0.025, 0.024, 0.026), tslVec3(0.11, 0.072, 0.045), s.w)),
        (this.mesh = new wi(n, r)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.visible = !1));
    }
    warm(e) {
      (b9.set(0, 0.5, -6).add(e.position),
        this.write(0, b9, 1, 0, 0, 0, 0.3, 1),
        this.write(0, b9, 1, 0, 0, 0, 0.3, 1, !0),
        this.show(1));
    }
    update(e, t) {
      let n = 0,
        r = e - Math.min(t, 0.1);
      for (let t of [!0, !1]) {
        let i = Math.floor(e / (t ? o9 : d9));
        for (let a of [i - 1, i]) {
          let i = this.flight(t, a);
          for (let a of i?.birds ?? []) {
            if (n === _9 || !this.fly(i, a, e - i.from, b9, x9)) continue;
            let o = t ? h9 : g9;
            (this.write(
              n,
              b9,
              o,
              x9.x,
              x9.y,
              x9.z,
              C9(t, e - i.from + a.beat),
              +!!t,
            ),
              this.fly(i, a, r - i.from, b9, x9),
              this.write(
                n,
                b9,
                o,
                x9.x,
                x9.y,
                x9.z,
                C9(t, r - i.from + a.beat),
                +!!t,
                !0,
              ),
              n++);
          }
        }
      }
      this.show(n);
    }
    flight(e, t) {
      let n = this.flights[+!e];
      if (n.has(t)) return n.get(t);
      for (let e of n.keys()) e < t - 2 && n.delete(e);
      let r = (e ? 1000003 : 2000003) + t * 11,
        i = t * (e ? o9 : d9) + hash01(r + 1) * 20,
        a = null;
      return (
        t >= 1 &&
          hash01(r) < (e ? s9 : f9) &&
          P4(i, Vee).elevation > Ree &&
          (a = e ? this.hawk(i, r) : this.flock(i, r)),
        n.set(t, a),
        a
      );
    }
    hawk(e, t) {
      this.trail.pointAt(
        lerp(150, this.trail.length - 150, hash01(t + 2)),
        y9,
        (hash01(t + 3) - 0.5) * 140,
      );
      let { x: n, z: r } = y9,
        i = this.ground(n, r) + 55 + hash01(t + 4) * 45,
        a = 30 + hash01(t + 5) * 25,
        o = hash01(t + 6) < 0.5 ? -1 : 1,
        s = hash01(t + 7) * TAU,
        c = hash01(t + 8) * TAU,
        l = Math.ceil(c9 / v9) + 1,
        u = new Float32Array(l * 3);
      for (let e = 0; e < l; e++) {
        let t = e * v9,
          l = (1 - smoothstep(0, u9, t)) ** 2 + smoothstep(63, c9, t) ** 2,
          d = a + 240 * l;
        c += (o * l9 * v9) / d;
        let f = n + Math.cos(s) * 1.2 * t + Math.cos(c) * d,
          p = r + Math.sin(s) * 1.2 * t + Math.sin(c) * d;
        u.set(
          [
            f,
            Math.max(
              i + 4 * Math.sin(t * 0.23) + 35 * l,
              this.ground(f, p) + 30,
            ),
            p,
          ],
          e * 3,
        );
      }
      return {
        from: e,
        path: u,
        hawk: !0,
        birds: [{ right: 0, up: 0, back: 0, beat: hash01(t + 9) * 7 }],
      };
    }
    flock(e, t) {
      this.trail.pointAt(lerp(120, this.trail.length - 60, hash01(t + 2)), y9);
      let n =
          Math.atan2(y9.tz, y9.tx) +
          (hash01(t + 3) < 0.5 ? -1 : 1) * (Math.PI / 2 + (hash01(t + 4) - 0.5) * 1.4),
        r = Math.cos(n),
        i = Math.sin(n),
        a = this.ground(y9.x, y9.z) + 28 + hash01(t + 5) * 24,
        o = Math.ceil(m9 / p9 / v9) + 1,
        s = p9 * v9,
        c = new Float32Array(o);
      for (let e = 0; e < o; e++) {
        let t = e * s - m9 / 2;
        c[e] = Math.max(a, this.ground(y9.x + r * t, y9.z + i * t) + 20);
      }
      for (let e = 1; e < o; e++) c[e] = Math.max(c[e], c[e - 1] - s * 0.25);
      for (let e = 239; e >= 0; e--) c[e] = Math.max(c[e], c[e + 1] - s * 0.25);
      let l = new Float32Array(723);
      for (let e = 0; e < o; e++) {
        let t = e * s - m9 / 2;
        l.set([y9.x + r * t, c[e], y9.z + i * t], e * 3);
      }
      let u = 4 + Math.floor(hash01(t + 6) * 6);
      return {
        from: e,
        path: l,
        hawk: !1,
        birds: Array.from({ length: u }, (e, n) => ({
          right: (hash01(t + 20 + n) - 0.5) * 18,
          up: (hash01(t + 40 + n) - 0.5) * 6,
          back: hash01(t + 60 + n) * 20,
          beat: hash01(t + 80 + n) * 3,
        })),
      };
    }
    fly(e, t, n, r, i) {
      let a = n - t.back / (e.hawk ? l9 : p9);
      if (a < -0.2 || a > (e.path.length / 3 - 2) * v9) return !1;
      let o = S9(e.path, a + 0.5, zee);
      S9(e.path, a, r);
      let s = headingFromXZ(o.x - r.x, o.z - r.z),
        c = Math.hypot(o.x - r.x, o.z - r.z),
        l = Math.atan2(o.y - r.y, c),
        u = S9(e.path, a + 1, Bee),
        d = headingFromXZ(u.x - o.x, u.z - o.z),
        f = clamp(Math.atan(((c / 0.5) * wrapAngle(d - s)) / 0.5 / PHYSICS.g), -0.7, 0.7),
        p = -Math.sin(s),
        m = -Math.cos(s);
      return (
        (r.x += -m * t.right),
        (r.z += p * t.right),
        (r.y += t.up),
        i.set(s, l, f),
        !0
      );
    }
    write(e, t, n, r, i, a, o, s, c = !1) {
      c
        ? (this.was.array.set([t.x, t.y, t.z, o], e * 4),
          this.wasTurn.array.set([r, i, a, s], e * 4))
        : (this.at.array.set([t.x, t.y, t.z, n], e * 4),
          this.turn.array.set([r, i, a, o], e * 4));
    }
    show(e) {
      cH(this.mesh, e, this.at, this.turn, this.was, this.wasTurn);
    }
  };
