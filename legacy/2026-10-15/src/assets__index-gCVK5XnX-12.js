// assets__index-gCVK5XnX 12 — math
// Lines 50183-50288 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
function xz(e, t, n) {
  let r = new Float32Array(t);
  for (let i = 0; i < 2; i++) {
    for (let i = 0; i < t; i++) {
      for (let a = 0; a < t; a++) {
        let o = 0;
        for (let r = -n; r <= n; r++) o += e[i * t + Y(a + r, 0, t - 1)];
        r[a] = o / (2 * n + 1);
      }
      for (let n = 0; n < t; n++) e[i * t + n] = r[n];
    }
    for (let i = 0; i < t; i++) {
      for (let a = 0; a < t; a++) {
        let o = 0;
        for (let r = -n; r <= n; r++) o += e[Y(a + r, 0, t - 1) * t + i];
        r[a] = o / (2 * n + 1);
      }
      for (let n = 0; n < t; n++) e[n * t + i] = r[n];
    }
  }
}
var Sz = 44100,
  Cz = { env: 3.2, ride: 4.2, fx: 1.4, master: 0.6 },
  wz = 0.8,
  Tz = 24,
  Ez = 200,
  Dz = 70,
  Oz = 110,
  kz = 0.08,
  Az = 2.75,
  jz = 1.47,
  Mz = DF * J.wheelRadius,
  Nz = 0.06,
  Pz = 343,
  Fz = (e, t) => Array.from({ length: t }, (t, n) => `${e}${n}`),
  Iz = {
    rollDirt: [`roll_dirt`],
    rollGravel: [`roll_gravel`],
    pedal: [`pedal_chain`],
    hub: [`hub_buzz`],
    birds: [`amb_birds`],
    breeze: [`amb_breeze`],
    creek: [`amb_creek`],
    splash: Fz(`splash`, 2),
    slosh: Fz(`slosh`, 3),
    rattle: [`chain_rattle`],
    skid: [`skid_gravel`],
    click: Fz(`click`, 12),
    land: Fz(`land`, 5),
    wood: Fz(`wood`, 3),
    bodyfall: [`bodyfall`],
    bikefall: Fz(`bikefall`, 3),
    breath: [`breath`],
    grunt: Fz(`grunt`, 3),
    hurt: Fz(`hurt`, 3),
  };
function Lz(e) {
  let t = e / Ez;
  return t <= 1 ? t : t ** 0.7;
}
var Rz = (e) => Y(e * Tz, 4, 400),
  zz = (e) => Y(0.85 + e / 45, 0.85, 1.3),
  Bz = (e) => 900 + Math.min(e, 22) * 130,
  Vz = (e, t, n = 0.5) => ({ type: e, frequency: t, Q: n });
function Hz(e, t, n, r) {
  (e.positionX.setTargetAtTime(t.x, n, r),
    e.positionY.setTargetAtTime(t.y, n, r),
    e.positionZ.setTargetAtTime(t.z, n, r));
}
function Uz() {
  let e = async (e) => (await fetch(`sfx/${e}.wav`)).arrayBuffer();
  return Promise.all(
    Object.entries(Iz).map(async ([t, n]) => [t, await Promise.all(n.map(e))]),
  ).then(Object.fromEntries);
}
function Wz(e, t, n) {
  let r = Math.floor(Sz * t),
    i = Math.floor(Sz * 0.3),
    a = e.createBuffer(2, r, Sz);
  for (let e = 0; e < 2; e++) {
    let t = new Float32Array(r + i),
      [o, s, c, l, u, d, f, p, m] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let e = 0; e < t.length; e++) {
      let r = Math.random() * 2 - 1;
      n === `pink`
        ? ((o = 0.99886 * o + r * 0.0555179),
          (s = 0.99332 * s + r * 0.0750759),
          (c = 0.969 * c + r * 0.153852),
          (l = 0.8665 * l + r * 0.3104856),
          (u = 0.55 * u + r * 0.5329522),
          (d = -0.7616 * d - r * 0.016898),
          (t[e] = (o + s + c + l + u + d + f + r * 0.5362) * 0.11),
          (f = r * 0.115926))
        : ((p = p * 0.995 + r * 0.05),
          (m = m * 0.9995 + p * 5e-4),
          (t[e] = (p - m) * 1.6));
    }
    let h = a.getChannelData(e);
    for (let e = 0; e < r; e++) h[e] = t[e];
    for (let e = 0; e < i; e++) {
      let n = e / i;
      h[e] = t[e] * Math.sqrt(n) + t[r + e] * Math.sqrt(1 - n);
    }
  }
  return a;
}
