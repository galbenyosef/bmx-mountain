// assets/index-gCVK5XnX 13 — gain
// Lines 50289-50953 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var Gz = class {
  isMuted = !1;
  ctx = null;
  master;
  env;
  ride;
  fx;
  pink;
  brown;
  wind;
  rush;
  buffet;
  rumble;
  swish;
  swirl;
  boards;
  clickBus;
  files = Uz();
  rec = null;
  nextClick = 0;
  last = {};
  e = {
    speed: new zF(),
    contact: new zF(),
    air: new zF(),
    hard: new zF(),
    loose: new zF(),
    grass: new zF(),
    wood: new zF(),
    wet: new zF(),
    skid: new zF(),
    rot: new zF(),
    coast: new zF(),
    pedal: new zF(),
    spin: new zF(),
    scrub: new zF(),
    pump: new zF(),
    effort: new zF(),
    scrape: new zF(),
  };
  gruntAt = -99;
  thumpSpeed = 0;
  thumpAt = 0;
  time = 0;
  others = new Map();
  ear = { x: 0, y: 0, z: 0, t: -1, vx: 0, vy: 0, vz: 0 };
  constructor() {
    (this.files.catch(() => {}),
      addEventListener(`keydown`, () => this.start()),
      addEventListener(`pointerdown`, () => this.start()),
      document.addEventListener(`visibilitychange`, () => {
        this.ctx && (document.hidden ? this.ctx.suspend() : this.ctx.resume());
      }));
  }
  start() {
    if (this.ctx) {
      this.ctx.state === `suspended` && this.ctx.resume();
      return;
    }
    let e = (this.ctx = new AudioContext()),
      t = new DynamicsCompressorNode(e, {
        threshold: -6,
        knee: 4,
        ratio: 12,
        attack: 0.003,
        release: 0.2,
      });
    ((this.master = new GainNode(e, { gain: this.isMuted ? 0 : Cz.master })),
      this.master.connect(t).connect(e.destination));
    let n = (t) => {
      let n = new GainNode(e, { gain: t });
      return (n.connect(this.master), n);
    };
    ((this.env = n(Cz.env)),
      (this.ride = n(Cz.ride)),
      (this.fx = n(Cz.fx)),
      (this.pink = Wz(e, 7, `pink`)),
      (this.brown = Wz(e, 7, `brown`)),
      (this.wind = this.voice(this.pink, this.env, Vz(`lowpass`, 400), 70)),
      (this.rush = this.voice(
        this.pink,
        this.env,
        Vz(`lowpass`, 800, 0.4),
        70,
      )),
      (this.buffet = this.voice(
        this.brown,
        this.env,
        Vz(`lowpass`, 180, 0.6),
        70,
      )),
      (this.rumble = this.voice(
        this.pink,
        this.ride,
        Vz(`lowpass`, 400, 0.6),
        70,
      )),
      (this.swish = this.voice(
        this.pink,
        this.ride,
        Vz(`bandpass`, 2600, 0.8),
        70,
      )),
      (this.swirl = this.voice(
        this.pink,
        this.env,
        Vz(`bandpass`, 600, 1.2),
        70,
      )),
      (this.boards = this.knocks(this.ride)),
      (this.clickBus = new GainNode(e)),
      this.clickBus
        .connect(new BiquadFilterNode(e, Vz(`lowpass`, 6e3)))
        .connect(this.ride),
      this.load(e));
  }
  async load(e) {
    try {
      let t = await this.files,
        n = await Promise.all(
          Object.entries(t).map(async ([t, n]) => [
            t,
            await Promise.all(n.map((t) => e.decodeAudioData(t))),
          ]),
        );
      if (this.ctx !== e) return;
      let r = Object.fromEntries(n),
        i = (e, t, n = 8e3) => this.voice(r[e][0], t, Vz(`lowpass`, n)),
        a = new PannerNode(e, {
          panningModel: `equalpower`,
          distanceModel: `inverse`,
          refDistance: 5,
          maxDistance: 300,
          rolloffFactor: 1.1,
        });
      (a.connect(this.env),
        (this.rec = {
          samples: r,
          rollDirt: i(`rollDirt`, this.ride),
          rollGravel: i(`rollGravel`, this.ride),
          pedal: i(`pedal`, this.ride, 6e3),
          hub: i(`hub`, this.ride, 4200),
          skid: i(`skid`, this.ride),
          scrape: i(`skid`, this.ride, 1e3),
          breeze: i(`breeze`, this.env, 1200),
          breath: i(`breath`, this.fx, 7e3),
          creek: { ...i(`creek`, a, 6e3), panner: a },
          spray: i(`creek`, this.ride, 7e3),
        }),
        i(`birds`, this.env, 9e3).gain.gain.setTargetAtTime(
          0.016,
          e.currentTime,
          0.5,
        ));
    } catch (e) {
      console.warn(`[sound] recordings didn't load`, e);
    }
  }
  voice(e, t, n, r = 0) {
    let i = this.ctx,
      a = new AudioBufferSourceNode(i, { buffer: e, loop: !0 }),
      o = new BiquadFilterNode(i, n),
      s = new GainNode(i, { gain: 0 }),
      c = a.connect(o);
    return (
      (r ? c.connect(new BiquadFilterNode(i, Vz(`highpass`, r, 1))) : c)
        .connect(s)
        .connect(t),
      a.start(0, Math.random() * e.duration),
      { src: a, filter: o, gain: s }
    );
  }
  knocks(e) {
    let t = this.ctx,
      n = new Float32Array(160).fill(1);
    n[0] = 0;
    let r = new OscillatorNode(t, {
        periodicWave: t.createPeriodicWave(n, new Float32Array(160)),
        frequency: 10,
      }),
      i = new GainNode(t, { gain: 0 });
    return (
      r
        .connect(new BiquadFilterNode(t, Vz(`bandpass`, 420, 2.2)))
        .connect(new BiquadFilterNode(t, Vz(`highpass`, 140, 1)))
        .connect(i)
        .connect(e),
      r.start(),
      { osc: r, gain: i }
    );
  }
  play(e, t, n, r, i = 1, a = 0, o = 0) {
    let s = this.rec?.samples[e];
    if (!s || n < 1e-4) return;
    let c = Math.floor(Math.random() * s.length);
    (s.length > 1 && c === this.last[e] && (c = (c + 1) % s.length),
      (this.last[e] = c));
    let l = this.ctx,
      u = new AudioBufferSourceNode(l, {
        buffer: s[c],
        playbackRate: i * (0.96 + Math.random() * 0.08),
      }),
      d = new GainNode(l),
      f = n * (0.85 + Math.random() * 0.3);
    (o > 0
      ? (d.gain.setValueAtTime(0, t),
        d.gain.linearRampToValueAtTime(f, t + Math.min(0.02, o * 0.25)),
        d.gain.setValueAtTime(f, t + o * 0.6),
        d.gain.linearRampToValueAtTime(0, t + o),
        u.start(t, a, o + 0.02))
      : ((d.gain.value = f), u.start(t)),
      u.connect(d).connect(r));
  }
  get muted() {
    return this.isMuted;
  }
  toggleMute() {
    ((this.isMuted = !this.isMuted),
      this.ctx &&
        this.master.gain.setTargetAtTime(
          this.isMuted ? 0 : Cz.master,
          this.ctx.currentTime,
          0.08,
        ));
  }
  update(e, t) {
    let n = this.ctx;
    if (!n || e <= 0) return;
    this.time += e;
    let r = n.currentTime;
    this.thumpSpeed > 0 &&
      r - this.thumpAt >= Nz &&
      (this.thump(r, this.thumpSpeed), (this.thumpSpeed = 0));
    let i = (e, t, n = 0.05) => e.setTargetAtTime(t, r, n),
      a = this.e,
      o = a.speed.to(t.speed, e, 6);
    t.air && (a.contact.v = 0);
    let s = a.contact.to(+!!t.rolling, e, 30, 5),
      c = a.air.to(+!!t.air, e, 12, 18),
      l = t.air ? 0.008 : 0.06,
      u = t.surface,
      d = a.hard.to(+(u === SURFACE.Trail), e, 4),
      f = a.loose.to(+(u === SURFACE.Dirt || u === SURFACE.Rock), e, 4),
      p = a.grass.to(+(u === SURFACE.Grass || u === SURFACE.Forest), e, 4),
      m = a.wood.to(+(u === SURFACE.Wood), e, 10),
      h = a.wet.to(u === SURFACE.Water && t.rolling ? 1 : 0, e, 14, 4),
      g = clamp(o / 26),
      _ = clamp(o / 7) ** 0.8,
      v = _ * (0.55 + 0.45 * clamp((o - 5) / 15)),
      y =
        0.85 +
        0.15 * Math.sin(this.time * 0.37) * Math.sin(this.time * 0.13 + 1);
    (i(this.wind.gain.gain, (0.004 + g * g * (0.1 + 0.08 * c)) * y, 0.12),
      i(this.wind.filter.frequency, 260 + g * 700 + c * 250, 0.15),
      i(this.buffet.gain.gain, g * g * g * (0.06 + 0.08 * c) * y, 0.12));
    let b = v * (0.075 + 0.02 * d + 0.03 * f) * (Cz.ride / Cz.env);
    (i(this.rush.gain.gain, Math.sqrt(c) * b * wz * (0.9 + 0.1 * y), 0.05),
      i(this.rush.filter.frequency, 450 + g * 900, 0.15));
    let x = a.pump.to(t.pump, e, 14, 4),
      S = s * clamp(o / 9) * (1 + 0.6 * x);
    (i(this.rumble.gain.gain, S * (0.0315 + 0.009 * d + 0.0135 * f), l),
      i(this.rumble.filter.frequency, 260 + Math.min(o, 22) * 26, 0.1),
      i(this.swish.gain.gain, S * p * 0.06, t.air ? l : 0.08),
      i(this.boards.osc.frequency, clamp(o / 0.13, 4, 200), 0.04),
      i(this.boards.gain.gain, S * m * 0.09, t.air ? l : 0.05));
    let C = a.rot.to(t.air ? clamp(t.rotation / 9) : 0, e, 6, 4);
    (i(this.swirl.gain.gain, C * C * 0.08, 0.06),
      i(this.swirl.filter.frequency, 450 + C * 900, 0.08));
    let w = t.bump;
    w >= 0 && this.knock(r, w * 0.12);
    let T = clamp((t.carve - 0.8) / 1.2),
      E = a.scrub.to(t.rolling ? smoothstep(0.7, 1, t.grip) * clamp(o / 10) : 0, e, 10, 5);
    t.air && (a.skid.v = 0);
    let D = a.skid.to(
        t.rolling
          ? Math.max(t.skid * clamp(o / 3), T * 0.45, E * 0.6)
          : clamp(t.bikeScrape / 8) * 0.7,
        e,
        12,
        6,
      ),
      O = a.scrape.to(clamp(t.scrape / 10) ** 0.7, e, 14, 6),
      ee = a.coast.to(
        (t.air || !t.pedalling) && t.wheelRate > 0.3 ? 1 : 0,
        e,
        10,
        8,
      ),
      te = a.spin.to(t.wheelRate, e, t.air ? 0.08 : 12),
      ne = t.wheelRate / Az,
      re = a.pedal.to(t.pedalling && !t.air && ne > 0.2 ? 1 : 0, e, 8, 5),
      ie = this.rec;
    if (!ie) return;
    (i(
      ie.rollDirt.gain.gain,
      s *
        v *
        (d + 0.8 * f + 0.55 * p + 0.3 * m) *
        0.09 *
        (1 + 0.5 * T + 0.5 * x),
      l,
    ),
      i(ie.rollDirt.filter.frequency, Bz(o) - p * 300, 0.1),
      i(ie.rollDirt.src.playbackRate, zz(o), 0.1),
      i(ie.rollGravel.gain.gain, s * _ * f * 0.05, l),
      i(ie.rollGravel.filter.frequency, 1e3 + Math.min(o, 22) * 80, 0.1),
      i(ie.rollGravel.src.playbackRate, zz(o), 0.1),
      w >= 0 &&
        this.play(
          `rattle`,
          r,
          0.09 + w * 0.32,
          this.fx,
          1,
          Math.random() * 3.6,
          0.1 + w * 0.15,
        ),
      i(ie.skid.gain.gain, D * 0.13, t.air ? l : 0.05),
      i(ie.skid.src.playbackRate, clamp(0.85 + o / 40, 0.85, 1.25), 0.1),
      i(ie.scrape.gain.gain, O * 0.12, 0.05),
      i(ie.scrape.src.playbackRate, 0.6 + 0.3 * O, 0.1),
      i(ie.breeze.gain.gain, 0.012 * y, 0.5),
      i(ie.spray.gain.gain, h * clamp(o / 6) * 0.2, 0.04),
      i(ie.spray.src.playbackRate, 0.9 + clamp(o / 25) * 0.4, 0.1));
    let ae = a.effort.to(
      t.pedalling && !t.air ? clamp((o - 6) / 14) : 0,
      e,
      0.35,
      0.2,
    );
    (i(ie.breath.gain.gain, ae * ae * 0.05, 0.3),
      this.drivetrain(ie, r, o, ee, te, re, ne));
  }
  drivetrain(e, t, n, r, i, a, o) {
    let s = Rz(i),
      c = smoothstep(Dz, Oz, s),
      l = r * (0.014 + 0.01 * clamp(n / 20));
    (e.hub.gain.gain.setTargetAtTime(l * c, t, 0.05),
      e.hub.src.playbackRate.setTargetAtTime(Lz(s), t, 0.04));
    let u = l * (1 - c) * 0.65 * Math.sqrt(90 / Math.max(20, s));
    for (
      this.nextClick < t && (this.nextClick = t + 0.005);
      u > 0.002 && this.nextClick < t + kz;
    )
      (this.play(`click`, this.nextClick, u, this.clickBus),
        (this.nextClick += (1 / s) * (0.94 + Math.random() * 0.12)));
    (e.pedal.gain.gain.setTargetAtTime(a * (0.018 + 0.012 * clamp(o / 3)), t, 0.06),
      e.pedal.src.playbackRate.setTargetAtTime(
        clamp(Math.sqrt(o / jz), 0.8, 1.35),
        t,
        0.08,
      ));
  }
  land(e, t, n) {
    let r = this.ctx;
    if (!r) return;
    let i = clamp(e / 10, t ? 0.45 : 0.06, 1),
      a = r.currentTime;
    (this.play(
      n ? `wood` : `land`,
      a,
      (n ? 0.35 : 0.5) * (0.25 + 0.75 * i),
      this.fx,
      1.04 - 0.1 * i,
    ),
      this.thud(a, 50 + 20 * (1 - i), 0.2 * i, 0.18 + 0.1 * i),
      t && this.thud(a + 0.01, 44, 0.18, 0.3),
      e > 6 && this.duck(clamp((e - 6) / 8)),
      e > 5 &&
        a - this.gruntAt > 2.5 &&
        ((this.gruntAt = a),
        this.play(`grunt`, a + 0.04, 0.22 * clamp((e - 4) / 6, 0.4, 1), this.fx)));
  }
  stinger(e) {
    let t = this.ctx;
    if (!t) return;
    let n = t.currentTime + 0.03,
      r = e ? [196, 293.7, 392, 587.3] : [196, 293.7],
      i = new BiquadFilterNode(t, Vz(`lowpass`, e ? 2400 : 1500));
    (i.connect(this.fx),
      r.forEach((e, r) => {
        let a = n + r * 0.025,
          o = new OscillatorNode(t, {
            type: r % 2 ? `sine` : `triangle`,
            frequency: e,
          });
        (o.connect(this.swell(a, 0.035 / (1 + r * 0.4), 0.02, 0.9)).connect(i),
          o.start(a),
          o.stop(a + 1));
      }));
  }
  duck(e) {
    let t = this.env.gain,
      n = this.ctx.currentTime;
    (t.cancelScheduledValues(n),
      t.setValueAtTime(t.value, n),
      t.linearRampToValueAtTime(Cz.env * (1 - 0.45 * e), n + 0.03),
      t.setTargetAtTime(Cz.env, n + 0.15, 0.25));
  }
  splash(e) {
    this.ctx &&
      this.play(
        `splash`,
        this.ctx.currentTime,
        0.55 * clamp(e / 18, 0.2, 1),
        this.fx,
        1.1 - 0.2 * clamp(e / 25),
      );
  }
  creek(e, t) {
    let n = this.ctx,
      r = this.rec?.creek;
    if (!n || !r) return;
    let i = n.currentTime;
    (r.gain.gain.setTargetAtTime(e ? 0.05 + 0.08 * t : 0, i, 0.4),
      e && Hz(r.panner, e, i, 0.1));
  }
  slam(e) {
    this.ctx &&
      e > 0.01 &&
      this.play(`wood`, this.ctx.currentTime, 0.4 * e, this.fx, 1.08);
  }
  takeoff() {
    let e = this.ctx;
    if (!e) return;
    let t = e.currentTime;
    (this.puff(t, 300, 0.7, 0.06, 0.08),
      this.play(
        `rattle`,
        t + 0.02,
        0.12,
        this.fx,
        1,
        Math.random() * 3.6,
        0.16,
      ));
  }
  whoosh() {
    let e = this.ctx;
    if (!e) return;
    let t = e.currentTime,
      n = new AudioBufferSourceNode(e, { buffer: this.pink }),
      r = new BiquadFilterNode(e, Vz(`bandpass`, 380, 1.1));
    (r.frequency.setValueAtTime(380, t),
      r.frequency.exponentialRampToValueAtTime(1500, t + 0.16),
      r.frequency.exponentialRampToValueAtTime(500, t + 0.4),
      n
        .connect(r)
        .connect(this.swell(t, 0.11, 0.1, 0.44))
        .connect(this.fx),
      n.start(t, Math.random() * 5),
      n.stop(t + 0.46));
  }
  sheaves() {
    let e = this.ctx;
    if (e)
      for (let t = 0; t < 4; t++) {
        let n = e.currentTime + t * 0.14 + Math.random() * 0.02;
        (this.thud(n, 85 + Math.random() * 20, 0.12, 0.1),
          this.clink(n + 0.004, 620 + Math.random() * 120, 0.012));
      }
  }
  crash() {
    let e = this.ctx;
    if (!e) return;
    let t = e.currentTime;
    (this.play(`hurt`, t + 0.08, 0.32, this.fx),
      (this.gruntAt = t),
      this.play(`bikefall`, t + 0.12 + Math.random() * 0.1, 0.55, this.fx),
      this.play(`rattle`, t + 0.05, 0.3, this.fx, 0.9, Math.random() * 3, 0.4),
      this.thud(t, 50, 0.3, 0.3),
      this.duck(1));
  }
  tumble(e) {
    let t = this.ctx;
    !t ||
      e < 1.5 ||
      (this.thumpSpeed === 0 && (this.thumpAt = t.currentTime),
      (this.thumpSpeed = Math.max(this.thumpSpeed, e)));
  }
  thump(e, t) {
    let n = clamp((t - 1.5) / 10),
      r = Math.sqrt(n);
    (this.play(
      `bodyfall`,
      e,
      0.15 + 0.5 * r,
      this.fx,
      1.1 - 0.25 * n,
      Math.random() < 0.3 - n ? 0.43 : 0.27,
      0.32,
    ),
      this.thud(e, 48 + 22 * (1 - n), 0.06 + 0.24 * r, 0.12 + 0.15 * n),
      n > 0.3 && this.duck((n - 0.3) * 1.2),
      n > 0.7 &&
        e - this.gruntAt > 2 &&
        ((this.gruntAt = e), this.play(`grunt`, e + 0.03, 0.2 * n, this.fx)));
  }
  step(e, t, n) {
    let r = this.ctx;
    if (!r) return;
    let i = r.currentTime,
      a = clamp(0.45 + n / 5, 0.45, 1);
    if (e === SURFACE.Water) {
      this.play(`slosh`, i, 0.3 * a, this.fx);
      return;
    }
    if (t) {
      (this.thud(i, 120 + Math.random() * 20, 0.05 * a, 0.07),
        this.puff(i, 900, 1.4, 0.035 * a, 0.05));
      return;
    }
    let o = e === SURFACE.Grass || e === SURFACE.Forest;
    (this.thud(i, 70 + Math.random() * 15, 0.035 * a, 0.06),
      this.puff(
        i,
        o ? 1300 : 2200,
        o ? 0.7 : 1.1,
        (o ? 0.03 : 0.045) * a,
        o ? 0.09 : 0.07,
      ));
  }
  swell(e, t, n, r) {
    let i = new GainNode(this.ctx);
    return (
      i.gain.setValueAtTime(1e-4, e),
      i.gain.exponentialRampToValueAtTime(t, e + n),
      i.gain.exponentialRampToValueAtTime(1e-4, e + r),
      i
    );
  }
  thud(e, t, n, r) {
    let i = this.ctx,
      a = new OscillatorNode(i, { type: `sine` });
    (a.frequency.setValueAtTime(t * 1.6, e),
      a.frequency.exponentialRampToValueAtTime(t, e + 0.05),
      a.connect(this.swell(e, n, 0.006, r)).connect(this.fx),
      a.start(e),
      a.stop(e + r + 0.02));
  }
  knock(e, t) {
    t < 0.005 ||
      (this.thud(e, 95, t, 0.08), this.puff(e, 400, 0.8, t * 0.6, 0.05));
  }
  puff(e, t, n, r, i) {
    let a = this.ctx,
      o = new AudioBufferSourceNode(a, { buffer: this.brown }),
      s = new BiquadFilterNode(a, Vz(`lowpass`, t, n));
    (o
      .connect(s)
      .connect(this.swell(e, r, Math.min(0.012, i * 0.2), i))
      .connect(this.fx),
      o.start(e, Math.random() * (this.brown.duration - i - 0.1)),
      o.stop(e + i + 0.02));
  }
  clink(e, t, n) {
    let r = this.ctx;
    for (let [i, a, o] of [
      [1, 1, 0.09],
      [2.76, 0.45, 0.05],
    ]) {
      let s = new OscillatorNode(r, { type: `sine`, frequency: t * i });
      (s.connect(this.swell(e, n * a, 0.002, o)).connect(this.fx),
        s.start(e),
        s.stop(e + o + 0.02));
    }
  }
  listen(e, t) {
    let n = this.ctx;
    if (!n?.listener.positionX) return;
    let r = n.listener,
      i = n.currentTime,
      a = this.ear,
      o = i - a.t;
    if (a.t >= 0 && o > 0) {
      let t = Math.min(1, o * 8);
      ((a.vx += ((e.x - a.x) / o - a.vx) * t),
        (a.vy += ((e.y - a.y) / o - a.vy) * t),
        (a.vz += ((e.z - a.z) / o - a.vz) * t));
    }
    ((a.x = e.x),
      (a.y = e.y),
      (a.z = e.z),
      (a.t = i),
      r.positionX.setValueAtTime(e.x, i),
      r.positionY.setValueAtTime(e.y, i),
      r.positionZ.setValueAtTime(e.z, i),
      r.forwardX.setValueAtTime(t.x, i),
      r.forwardY.setValueAtTime(t.y, i),
      r.forwardZ.setValueAtTime(t.z, i));
  }
  other(e, t, n, r, i, a) {
    let o = this.ctx,
      s = this.rec;
    if (!o || !s) return;
    let c = o.currentTime;
    if (!t) {
      let t = this.others.get(e);
      (t?.roll.gain.gain.setTargetAtTime(0, c, 0.15),
        t?.hub.gain.gain.setTargetAtTime(0, c, 0.15));
      return;
    }
    let l = this.others.get(e) ?? this.hear(e, o, s, t, c),
      u = c - l.t;
    if (u > 0) {
      let e = this.ear,
        n = e.x - t.x,
        r = e.y - t.y,
        i = e.z - t.z,
        a = Math.hypot(n, r, i) || 1,
        o = ((t.x - l.x) * n + (t.y - l.y) * r + (t.z - l.z) * i) / (u * a),
        s = clamp(
          (Pz - (e.vx * n + e.vy * r + e.vz * i) / a) / (Pz - clamp(o, -40, 40)),
          0.8,
          1.25,
        );
      l.doppler += (s - l.doppler) * Math.min(1, u * 6);
    }
    ((l.x = t.x),
      (l.y = t.y),
      (l.z = t.z),
      (l.t = c),
      Hz(l.panner, t, c, 0.05),
      l.roll.gain.gain.setTargetAtTime(i ? clamp(n / 7) * 0.4 : 0, c, 0.15),
      l.roll.filter.frequency.setTargetAtTime(Bz(n), c, 0.1),
      l.roll.src.playbackRate.setTargetAtTime(zz(n) * l.doppler, c, 0.1));
    let d = (a || (!r && i)) && n > 0.3,
      f = Rz(n / Mz);
    (l.hub.gain.gain.setTargetAtTime(
      d ? 0.024 * smoothstep(Dz * 0.5, Oz, f) : 0,
      c,
      0.12,
    ),
      l.hub.src.playbackRate.setTargetAtTime(Lz(f) * l.doppler, c, 0.05));
  }
  hear(e, t, n, r, i) {
    let a = new PannerNode(t, {
      panningModel: `HRTF`,
      distanceModel: `inverse`,
      refDistance: 3,
      maxDistance: 200,
      rolloffFactor: 1.4,
    });
    a.connect(this.ride);
    let o = {
      panner: a,
      roll: this.voice(n.samples.rollDirt[0], a, Vz(`lowpass`, 8e3)),
      hub: this.voice(n.samples.hub[0], a, Vz(`lowpass`, 8e3)),
      x: r.x,
      y: r.y,
      z: r.z,
      t: i,
      doppler: 1,
    };
    return (this.others.set(e, o), o);
  }
  forget(e) {
    let t = this.others.get(e);
    t &&
      (t.roll.src.stop(),
      t.hub.src.stop(),
      t.panner.disconnect(),
      this.others.delete(e));
  }
};
