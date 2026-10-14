// assets/index-gCVK5XnX 01 — math
// Lines 47337-47502 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
  J = {
    step: 1 / 240,
    mass: 82,
    pitchInertia: 11,
    g: 9.81,
    airG: 8.4,
    wheelbase: 0.98,
    wheelRadius: 0.254,
    bodyLift: 0.04,
    spring: 15500,
    damper: 1450,
    rebound: 3600,
    travel: 0.3,
    pedalForce: 360,
    pedalPower: 720,
    brake: 5.2,
    crrDirt: 0.016,
    crrGrass: 0.055,
    crrRough: 0.08,
    crrWater: 0.3,
    dragUp: 0.312,
    dragTuck: 0.24,
    gripDirt: 1.45,
    gripGrass: 0.95,
    gripRock: 0.8,
    steerRate: 9,
    maxYawRate: 3,
    railAim: 3,
    railHold: 1.2,
    railOut: 0.6,
    crouchRate: 5,
    uncrouchRate: 15,
    hop: 3.3,
    lipPop: 1.2,
    popLate: 0.12,
    pump: 16,
    spinRate: 8.4,
    flipRate: 6.8,
    spinAccel: 60,
    flipAccel: 60,
    spinStop: 55,
    flipStop: 50,
    tuck: 0.4,
    levelling: 3,
    intent: 0.7,
    consume: 0.35,
    leanPitch: 0.3,
    leanYaw: 0.3,
    catchPitch: 1.9,
    catchYaw: 1.7,
    catchRate: 7,
    catchFakie: 1,
    hopTime: 0.6,
    barspinTime: 0.42,
    tailwhipTime: 0.5,
    styleOut: 3,
    styleBack: 8,
    whipFrom: 0.8,
    cleanNose: 0.42,
    noseIn: 0.95,
    cleanBack: 0.6,
    loopOut: 1.2,
    cleanYaw: 0.42,
    sideways: 1.15,
    cleanSide: 0.3,
    laidDown: 0.8,
    stompPitch: 0.16,
    stompYaw: 0.14,
    absorbWindow: 0.35,
    absorbImpact: 0.55,
    absorbSlack: 0.12,
    sweetReach: 2.2,
    keepPerfect: 1.05,
    keepStomped: 1.02,
    keepCased: 0.88,
    keepFlat: 0.9,
    stressFade: 0.4,
    airTurn: 0.3,
    revertRate: 11,
    revertKeep: 0.9,
    hardImpact: 11,
    landImpact: 16,
    glance: 4,
    manualPitch: 0.36,
    manualPoints: 60,
    manualMin: 3,
    shimmyFrom: 18,
    shimmyRange: 10,
  },
  DF = Math.PI * 2,
  Y = (e, t = 0, n = 1) => (e < t ? t : e > n ? n : e),
  OF = (e, t, n) => e + (t - e) * n,
  kF = (e, t) => ((e % t) + t) % t,
  X = (e, t, n) => {
    let r = Y((n - e) / (t - e));
    return r * r * (3 - 2 * r);
  },
  AF = (e) => e - DF * Math.floor((e + Math.PI) / DF),
  jF = (e, t, n) => e + AF(t - e) * n,
  MF = (e, t) => Math.atan2(-e, -t),
  NF = (e, t, n) => (e < t ? Math.min(t, e + n) : Math.max(t, e - n)),
  PF = (e, t) => 1 - Math.exp(-e * t),
  FF = 1 / 120,
  IF = class {
    k;
    x = 0;
    v = 0;
    c;
    constructor(e, t) {
      ((this.k = e), (this.c = 2 * t * Math.sqrt(e)));
    }
    step(e, t) {
      let n = Math.max(1, Math.ceil(t / FF)),
        r = t / n;
      for (let t = 0; t < n; t++)
        ((this.v += (this.k * (e - this.x) - this.c * this.v) * r),
          (this.x += this.v * r));
      return this.x;
    }
  },
  LF = class {
    x;
    v = 0;
    constructor(e = 0) {
      this.x = e;
    }
    to(e, t, n) {
      if (n <= 0) return this.x;
      let r = 2 / t,
        i = r * n,
        a = 1 / (1 + i + 0.48 * i * i + 0.235 * i * i * i),
        o = this.x - e,
        s = (this.v + r * o) * n;
      return (
        (this.v = (this.v - r * s) * a),
        (this.x = e + (o + s) * a),
        this.x
      );
    }
    turn(e, t, n) {
      return this.to(this.x + AF(e - this.x), t, n);
    }
    set(e) {
      ((this.x = e), (this.v = 0));
    }
  },
  RF = class {
    p = new M();
    g = [new LF(), new LF(), new LF()];
    set(e) {
      return (
        this.g.forEach((t, n) => t.set(e.getComponent(n))),
        this.p.copy(e)
      );
    }
    to(e, t, n) {
      let [r, i, a] = this.g;
      return this.p.set(r.to(e.x, t, n), i.to(e.y, t, n), a.to(e.z, t, n));
    }
  },
  zF = class {
    v = 0;
    to(e, t, n, r = n) {
      return ((this.v += (e - this.v) * PF(e > this.v ? n : r, t)), this.v);
    }
  };
