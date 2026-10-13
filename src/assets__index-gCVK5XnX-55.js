// assets__index-gCVK5XnX 55 — math
// Lines 65007-65354 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
var T8 = class {
  terrain;
  group = new Hn();
  tiles = [];
  blocks = [];
  material = w8();
  constructor(e) {
    this.terrain = e;
    for (let e = 0; e < _8; e++)
      for (let t = 0; t < _8; t++) {
        let n = -ZF + (t + 0.5) * g8 * 2,
          r = -ZF + (e + 0.5) * g8 * 2;
        this.tiles.push({
          i: t,
          j: e,
          cx: n,
          cz: r,
          lod: -1,
          geos: v8.map(() => null),
        });
      }
    for (let e = 0; e < _8; e += x8[0])
      for (let t = 0; t < _8; t += x8[0]) this.blocks.push(this.block(t, e, 0));
    for (let e of this.blocks) this.group.add(e.group);
  }
  block(e, t, n) {
    let r = x8[n],
      i = {
        group: new Hn(),
        mesh: eH(new Xr(), this.material, !1),
        i: e,
        j: t,
        size: r,
        coarse: S8[n],
        geos: v8.map(() => null),
        parts: [],
        tiles: [],
        merged: null,
        mergedFrom: ``,
        drawn: null,
        min: 0,
        max: 0,
      };
    if (((i.mesh.visible = !1), i.group.add(i.mesh), n + 1 < x8.length)) {
      let a = x8[n + 1];
      for (let o = 0; o < r / a; o++)
        for (let s = 0; s < r / a; s++)
          i.parts.push(this.block(e + s * a, t + o * a, n + 1));
      for (let e of i.parts) i.group.add(e.group);
    } else
      for (let n = 0; n < r; n++)
        for (let a = 0; a < r; a++)
          i.tiles.push(this.tiles[(t + n) * _8 + e + a]);
    return i;
  }
  update(e) {
    let t = !1;
    for (let n of this.tiles) {
      let r = Math.hypot(n.cx - e.x, n.cz - e.z) - g8 * 2 * 0.7,
        i = 0;
      for (; i < y8.length && r >= y8[i];) i++;
      (n.lod >= 0 &&
        Math.abs(i - n.lod) === 1 &&
        Math.abs(r - y8[Math.min(i, n.lod)]) < b8) ||
        (i !== n.lod &&
          ((n.lod = i),
          (n.geos[i] ??= this.build(n.i * g8, n.j * g8, g8, v8[i])),
          (t = !0)));
    }
    if (t) for (let e of this.blocks) this.place(e);
  }
  place(e) {
    ((e.min = v8.length - 1), (e.max = 0));
    for (let t of e.parts)
      (this.place(t),
        (e.min = Math.min(e.min, t.min)),
        (e.max = Math.max(e.max, t.max)));
    for (let t of e.tiles)
      ((e.min = Math.min(e.min, t.lod)), (e.max = Math.max(e.max, t.lod)));
    if (((e.drawn = null), e.min === e.max || e.min >= e.coarse))
      e.drawn = e.geos[e.min] ??= this.build(
        e.i * g8,
        e.j * g8,
        e.size * g8,
        v8[e.min],
      );
    else {
      let t = e.tiles.length
          ? e.tiles.map((e) => e.geos[e.lod])
          : e.parts.map((e) => e.drawn),
        n = t.reduce(
          (e, t) => e + (t ? t.getAttribute(`position`).count : 1 / 0),
          0,
        );
      if (e.tiles.length || n <= C8) {
        let n = t.map((e) => e.id).join();
        (n !== e.mergedFrom &&
          (e.merged?.dispose(), (e.merged = UV(t)), (e.mergedFrom = n)),
          (e.drawn = e.merged));
      }
    }
    ((e.mesh.visible = e.drawn !== null),
      e.drawn && (e.mesh.geometry = e.drawn));
    for (let t of e.parts) t.group.visible = !e.drawn;
  }
  build(e, t, n, r) {
    let i = this.terrain.h,
      a = n / r + 1,
      o = E8(a),
      s = a * a + o.length,
      c = new Float32Array(s * 3),
      l = new Float32Array(s * 3),
      u = (e, t, n, r) => {
        let a = n * oz + t;
        ((c[e * 3] = sz(t)), (c[e * 3 + 1] = i[a] - r), (c[e * 3 + 2] = sz(n)));
        let o = i[n * oz + Math.max(0, t - 1)],
          s = i[n * oz + Math.min(oz - 1, t + 1)],
          u = i[Math.max(0, n - 1) * oz + t],
          d = i[Math.min(oz - 1, n + 1) * oz + t],
          f = o - s,
          p = u - d,
          m = Math.hypot(f, 4, p);
        ((l[e * 3] = f / m), (l[e * 3 + 1] = 4 / m), (l[e * 3 + 2] = p / m));
      };
    for (let n = 0; n < a; n++)
      for (let i = 0; i < a; i++) u(n * a + i, e + i * r, t + n * r, 0);
    let d = 1 + r * 1.5;
    o.forEach((n, i) =>
      u(a * a + i, e + (n % a) * r, t + Math.floor(n / a) * r, d),
    );
    let f = new Xr();
    return (
      f.setAttribute(`position`, new Fr(c, 3)),
      f.setAttribute(`normal`, new Fr(l, 3)),
      f.setAttribute(`uv`, XV(s)),
      f.setIndex(D8(a, o)),
      f.computeBoundingSphere(),
      f
    );
  }
};
function E8(e) {
  let t = [];
  for (let n = 0; n < e - 1; n++) t.push(n);
  for (let n = 0; n < e - 1; n++) t.push(n * e + e - 1);
  for (let n = e - 1; n > 0; n--) t.push((e - 1) * e + n);
  for (let n = e - 1; n > 0; n--) t.push(n * e);
  return t;
}
function D8(e, t) {
  let n = [];
  for (let t = 0; t < e - 1; t++)
    for (let r = 0; r < e - 1; r++) {
      let i = t * e + r,
        a = i + 1,
        o = i + e,
        s = o + 1;
      (r + t) & 1 ? n.push(i, o, a, a, o, s) : n.push(i, o, s, i, s, a);
    }
  let r = t.length;
  for (let i = 0; i < r; i++) {
    let a = t[i],
      o = t[(i + 1) % r],
      s = e * e + i,
      c = e * e + ((i + 1) % r);
    n.push(a, o, s, o, c, s);
  }
  return n;
}
var O8 = 128,
  k8 = 3.2,
  A8 = [0.03, 0.12],
  j8 = 4,
  M8 = [0.085, 0.035],
  N8 = 14,
  P8 = 6,
  F8 = { x: 0, z: 0, tx: 0, tz: 0 },
  I8 = new M();
function L8() {
  let e = new nS({ roughness: 0.8, flatShading: !0 }),
    t = oB(`pebble`, `vec4`),
    n = oB(`look`, `vec4`);
  return (
    (e.positionNode = gV(sV.mul($(1, 0.6, 0.85)).mul(t.w), n.xyz).add(t.xyz)),
    (e.colorNode = $(0.46, 0.43, 0.38).mul(n.w)),
    e
  );
}
function R8() {
  let e = new nS({ roughness: 0.85 }),
    t = g$(`bark_pine`, FV().mul(LV(1, 0.35)));
  return (
    (e.colorNode = t.colour.mul($(0.95, 0.85, 0.75)).add(0.04)),
    (e.normalNode = t.normal),
    e
  );
}
var z8 = class {
  group = new Hn();
  constructor(e) {
    let t = L8(),
      n = R8(),
      r = e.trail,
      i = HF(29),
      a = new Do(1, 0);
    for (let o = 0; o < r.length; o += O8) {
      let s = Math.min(r.length, o + O8);
      this.group.add(eH(this.pebbles(e, a, o, s, i), t, !1));
      let c = this.roots(e, o, s, i);
      c && this.group.add(eH(c, n, !1));
    }
  }
  pebbles(e, t, n, r, i) {
    let a = e.trail,
      o = Math.round((r - n) * k8),
      s = new Float32Array(o * 4),
      c = new Float32Array(o * 4),
      l = 0,
      u = new Hr(new M(), -1);
    for (let t = 0; t < o; t++) {
      let t = n + i() * (r - n),
        o = i() < 0.5 ? -1 : 1,
        d = i() < 0.7 ? xI - 0.6 + i() * 1.2 : xI + i() * (SI - xI - 0.5),
        f = OF(A8[0], A8[1], i() ** 2),
        p = [i() * DF, i() * DF, i() * DF],
        m = 0.75 + i() * 0.5;
      if (a.featureAt(t) > 0.05) continue;
      a.pointAt(t, F8, o * d);
      let { x: h, z: g } = F8,
        _ = e.baseHeight(h, g) + f * 0.25;
      (s.set([h, _, g, f], l * 4),
        c.set([...p, m], l * 4),
        u.expandByPoint(I8.set(h, _, g)),
        l++);
    }
    let d = uH(t);
    return (
      d.setAttribute(`pebble`, new Vi(s.slice(0, l * 4), 4)),
      d.setAttribute(`look`, new Vi(c.slice(0, l * 4), 4)),
      (d.instanceCount = l),
      (u.radius += 1),
      (d.boundingSphere = u),
      d
    );
  }
  roots(e, t, n, r) {
    let i = e.trail,
      a = [];
    for (let o = t + r() * j8; o < n; o += j8 + r() * 8) {
      let t = r() < 0.5 ? -1 : 1,
        n = xI + 0.6 + r() * 1.8,
        s = r() * 2.2,
        c = (r() - 0.5) * 4,
        l = r() * DF,
        u = 0.7 + r() * 0.6;
      if (
        (i.pointAt(o, F8, t * n),
        e.cover[(cz(F8.z) * oz + cz(F8.x)) * 4 + 1] < 140 ||
          i.featureOf(o) ||
          i.featureOf(o + c) ||
          Math.abs(i.bankAt(o)) > 0.12)
      )
        continue;
      let d = [];
      for (let r = 0; r <= N8; r++) {
        let a = r / N8,
          f = t * OF(n, s, a) + Math.sin(a * 6 + l) * 0.22,
          p = o + c * a + Math.sin(a * 4.3 + l * 2) * 0.35;
        i.pointAt(p, F8, f);
        let { x: m, z: h } = F8,
          g = OF(M8[0], M8[1], a) * u * (1 - Math.sin(Math.PI * a)) * 0.9;
        d.push(new M(m, e.baseHeight(m, h) - g, h));
      }
      a.push(B8(d, (e) => OF(M8[0], M8[1], e) * u));
    }
    return a.length ? tH(a) : null;
  }
};
function B8(e, t) {
  let n = e.length,
    r = new Float32Array(n * 7 * 3),
    i = new Float32Array(n * 7 * 2),
    a = new M(),
    o = new M(),
    s = new M(),
    c = 0;
  for (let l = 0; l < n; l++) {
    (l > 0 && (c += e[l].distanceTo(e[l - 1])),
      a
        .subVectors(e[Math.min(n - 1, l + 1)], e[Math.max(0, l - 1)])
        .normalize(),
      o.set(-a.z, 0, a.x).normalize(),
      s.crossVectors(o, a));
    let u = t(l / (n - 1));
    for (let t = 0; t <= P8; t++) {
      let n = (t / P8) * DF,
        a = Math.cos(n),
        d = Math.sin(n),
        f = l * 7 + t;
      ((r[f * 3] = e[l].x + (o.x * a + s.x * d) * u),
        (r[f * 3 + 1] = e[l].y + (o.y * a + s.y * d) * u),
        (r[f * 3 + 2] = e[l].z + (o.z * a + s.z * d) * u),
        (i[f * 2] = t / P8),
        (i[f * 2 + 1] = c));
    }
  }
  let l = [];
  for (let e = 0; e < n - 1; e++)
    for (let t = 0; t < P8; t++) {
      let n = e * 7 + t,
        r = n + P8 + 1;
      l.push(n, r, n + 1, n + 1, r, r + 1);
    }
  let u = new Xr();
  return (
    u.setAttribute(`position`, new Fr(r, 3)),
    u.setAttribute(`uv`, new Fr(i, 2)),
    u.setIndex(l),
    u.computeVertexNormals(),
    u
  );
}
var V8 = [
    -SI,
    -5.2,
    -4.3,
    -3.55,
    -xI,
    -2.3,
    -1.6,
    -0.8,
    0,
    0.8,
    1.6,
    2.3,
    xI,
    3.55,
    4.3,
    5.2,
    SI,
  ],
  H8 = 0.25,
  U8 = 256,
  W8 = 0.11,
  G8 = 0.035,
  K8 = 0.85,
  q8 = 0.05,
  J8 = 40;
