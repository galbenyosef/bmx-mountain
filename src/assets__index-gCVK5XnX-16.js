// assets__index-gCVK5XnX 16 — console
// Lines 51577-51910 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
function UV(e, t = !1) {
  let n = e[0].index !== null,
    r = new Set(Object.keys(e[0].attributes)),
    i = new Set(Object.keys(e[0].morphAttributes)),
    a = {},
    o = {},
    s = e[0].morphTargetsRelative,
    c = new Xr(),
    l = 0;
  for (let u = 0; u < e.length; ++u) {
    let d = e[u],
      f = 0;
    if (n !== (d.index !== null))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
            u +
            `. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`,
        ),
        null
      );
    for (let e in d.attributes) {
      if (!r.has(e))
        return (
          console.error(
            `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
              u +
              `. All geometries must have compatible attributes; make sure "` +
              e +
              `" attribute exists among all geometries, or in none of them.`,
          ),
          null
        );
      (a[e] === void 0 && (a[e] = []), a[e].push(d.attributes[e]), f++);
    }
    if (f !== r.size)
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
            u +
            `. Make sure all geometries have the same number of attributes.`,
        ),
        null
      );
    if (s !== d.morphTargetsRelative)
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
            u +
            `. .morphTargetsRelative must be consistent throughout all geometries.`,
        ),
        null
      );
    for (let e in d.morphAttributes) {
      if (!i.has(e))
        return (
          console.error(
            `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
              u +
              `.  .morphAttributes must be consistent throughout all geometries.`,
          ),
          null
        );
      (o[e] === void 0 && (o[e] = []), o[e].push(d.morphAttributes[e]));
    }
    if (t) {
      let e;
      if (n) e = d.index.count;
      else if (d.attributes.position !== void 0)
        e = d.attributes.position.count;
      else
        return (
          console.error(
            `THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index ` +
              u +
              `. The geometry must have either an index or a position attribute`,
          ),
          null
        );
      (c.addGroup(l, e, u), (l += e));
    }
  }
  if (n) {
    let t = 0,
      n = [];
    for (let r = 0; r < e.length; ++r) {
      let i = e[r].index;
      for (let e = 0; e < i.count; ++e) n.push(i.getX(e) + t);
      t += e[r].attributes.position.count;
    }
    c.setIndex(n);
  }
  for (let e in a) {
    let t = WV(a[e]);
    if (!t)
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ` +
            e +
            ` attribute.`,
        ),
        null
      );
    c.setAttribute(e, t);
  }
  for (let e in o) {
    let t = o[e][0].length;
    if (t !== 0) {
      ((c.morphAttributes = c.morphAttributes || {}),
        (c.morphAttributes[e] = []));
      for (let n = 0; n < t; ++n) {
        let t = [];
        for (let r = 0; r < o[e].length; ++r) t.push(o[e][r][n]);
        let r = WV(t);
        if (!r)
          return (
            console.error(
              `THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the ` +
                e +
                ` morphAttribute.`,
            ),
            null
          );
        c.morphAttributes[e].push(r);
      }
    }
  }
  return c;
}
function WV(e) {
  let t,
    n,
    r,
    i = -1,
    a = 0;
  for (let o = 0; o < e.length; ++o) {
    let s = e[o];
    if ((t === void 0 && (t = s.array.constructor), t !== s.array.constructor))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`,
        ),
        null
      );
    if ((n === void 0 && (n = s.itemSize), n !== s.itemSize))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`,
        ),
        null
      );
    if ((r === void 0 && (r = s.normalized), r !== s.normalized))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`,
        ),
        null
      );
    if ((i === -1 && (i = s.gpuType), i !== s.gpuType))
      return (
        console.error(
          `THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`,
        ),
        null
      );
    a += s.count * n;
  }
  let o = new t(a),
    s = new Fr(o, n, r),
    c = 0;
  for (let t = 0; t < e.length; ++t) {
    let r = e[t];
    if (r.isInterleavedBufferAttribute) {
      let e = c / n;
      for (let t = 0, i = r.count; t < i; t++)
        for (let i = 0; i < n; i++) {
          let n = r.getComponent(t, i);
          s.setComponent(t + e, i, n);
        }
    } else o.set(r.array, c);
    c += r.count * n;
  }
  return (i !== void 0 && (s.gpuType = i), s);
}
var GV = new M(0, 1, 0),
  KV = new M(0, 0, -1),
  qV = new M(1, 1, 1),
  JV = new N(),
  YV = new qt(),
  XV = (e) => new Fr(new Float32Array(e * 2), 2);
function ZV(e, t) {
  let n = [];
  for (let r = 0; r < e - 1; r++)
    for (let e = 0; e < t - 1; e++) {
      let i = r * t + e,
        a = i + 1,
        o = i + t,
        s = o + 1;
      n.push(i, a, o, a, s, o);
    }
  return n;
}
function QV(e = -0.5, t = 0.5, n = -0.5, r = 0.5) {
  let i = new Ns();
  return (
    i.setAttribute(`position`, new zr([e, n, 0, t, n, 0, t, r, 0, e, r, 0], 3)),
    i.setAttribute(`normal`, new zr([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], 3)),
    i.setAttribute(`uv`, new zr([0, 0, 1, 0, 1, 1, 0, 1], 2)),
    i.setIndex([0, 1, 2, 0, 2, 3]),
    i
  );
}
function $V(e, t, n, r = n, i = 10) {
  let a = t.clone().sub(e);
  return new fa(r, n, a.length(), i).applyMatrix4(
    JV.compose(
      e.clone().lerp(t, 0.5),
      YV.setFromUnitVectors(GV, a.normalize()),
      qV,
    ),
  );
}
function eH(e, t, n = !0) {
  let r = new wi(e, t);
  return ((r.castShadow = n), (r.receiveShadow = !0), r);
}
function tH(e, t = [`position`, `normal`, `uv`]) {
  let n = e.every((e) => e.index);
  return UV(
    e.map((e) => {
      let r = iH(n || !e.index ? e : e.toNonIndexed(), ...t);
      return (
        r.getAttribute(`uv`) ||
          r.setAttribute(`uv`, XV(r.getAttribute(`position`).count)),
        r
      );
    }),
    !1,
  );
}
function nH(e, t, n, r, i = 0) {
  return new N()
    .makeBasis(new M(-r, i, n), GV, new M(-n, 0, -r))
    .setPosition(e, 0, t);
}
var rH = (e, t, n) => new M(n, t, -e);
function iH(e, ...t) {
  for (let n of Object.keys(e.attributes))
    t.includes(n) || e.deleteAttribute(n);
  return e;
}
var aH = (e) =>
  e.index
    ? e
    : e.setIndex(
        Array.from({ length: e.getAttribute(`position`).count }, (e, t) => t),
      );
function oH(e, t, n) {
  let r = e.getAttribute(`position`).count,
    i = new Float32Array(r * n.length);
  for (let e = 0; e < r; e++) i.set(n, e * n.length);
  e.setAttribute(t, new Fr(i, n.length));
}
function sH(e, t) {
  (e.clearUpdateRanges(),
    e.addUpdateRange(0, t * e.itemSize),
    (e.needsUpdate = !0));
}
function cH(e, t, ...n) {
  ((e.geometry.instanceCount = t), (e.visible = t > 0));
  for (let e of n) sH(e, t);
}
function lH(e, t) {
  return (
    JV.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
    t.setFromProjectionMatrix(JV, e.coordinateSystem, e.reversedDepth)
  );
}
var uH = (e) => new Ns().copy(e),
  dH = (e, t) => new Vi(new Float32Array(e * t), t);
function fH(e, t) {
  let n = new Xr();
  for (let [t, r] of Object.entries(e)) n.setAttribute(t, r);
  return (
    n.setAttribute(`uv`, XV(e.position.count)),
    n.setIndex(t),
    n.computeVertexNormals(),
    n.computeBoundingSphere(),
    n
  );
}
var pH = {
    rubber: [1447446, 0.85, 0],
    steel: [5661035, 0.45, 0.55],
    darkSteel: [2369581, 0.5, 0.5],
    cable: [2894892, 0.4, 0.8],
    concrete: [9276035, 0.92, 0],
    wood: [8213042, 0.85, 0],
  },
  mH = {
    dust: [0.62, 0.5, 0.36],
    clod: [0.3, 0.22, 0.14],
    track: [0.13, 0.095, 0.065],
  };
function hH([e, t, n]) {
  return new nS({ color: e, roughness: t, metalness: n });
}
var gH = (e) => $(e.r, e.g, e.b),
  _H = [`position`, `normal`, `uv`, `color`, `surface`];
function vH(e, t, n, r) {
  (oH(e, `color`, t.toArray()), oH(e, `surface`, [n, r]));
}
function yH() {
  let e = new nS();
  e.vertexColors = !0;
  let t = oB(`surface`, `vec2`);
  return ((e.roughnessNode = t.x), (e.metalnessNode = t.y), e);
}
function bH(e, t) {
  let n = e.getAttribute(`position`).count,
    r = new Uint16Array(n * 4),
    i = new Float32Array(n * 4);
  for (let e = 0; e < n; e++) ((r[e * 4] = t), (i[e * 4] = 1));
  (e.setAttribute(`skinIndex`, new Fr(r, 4)),
    e.setAttribute(`skinWeight`, new Fr(i, 4)));
}
function xH(e, t, n, r) {
  let i = t.bones.map((e, i) => {
      let a = n.indexOf(e);
      return (a < 0 && ((a = n.push(e) - 1), r.push(t.inverses[i])), a);
    }),
    a = e.getAttribute(`skinIndex`).array;
  for (let e = 0; e < a.length; e++) a[e] = i[a[e]];
}
