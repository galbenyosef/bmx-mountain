// assets/index-gCVK5XnX 59 — buffer
// Lines 66234-66314 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function J5(e) {
  if (e.byteLength < K5) return null;
  let t = new DataView(e.buffer, e.byteOffset, K5),
    n = t.getUint8(1);
  if (n > RIDE_MODE.Walk) return null;
  let r = t.getUint8(2),
    i = { t: t.getFloat64(4, !0), mode: n, flags: r, pedal: r & W5 ? 1 : 0 },
    a = i;
  for (let e = 0; e < G5.length; e++) {
    let n = t.getFloat32(12 + e * 4, !0);
    if (!Number.isFinite(n)) return null;
    a[G5[e]] = n;
  }
  return Number.isFinite(i.t) ? i : null;
}
function Y5(e, t, n = 0, r = !1) {
  let i = new Uint8Array(24),
    a = new DataView(i.buffer);
  return (
    a.setUint8(0, e),
    a.setUint8(1, +!!r),
    a.setFloat64(8, t, !0),
    a.setFloat64(16, n, !0),
    i
  );
}
function X5(e) {
  if (e.byteLength < 24) return null;
  let t = new DataView(e.buffer, e.byteOffset, 24);
  return {
    a: t.getFloat64(8, !0),
    b: t.getFloat64(16, !0),
    synced: t.getUint8(1) === 1,
  };
}
var Z5 = new TextEncoder(),
  Q5 = new TextDecoder();
function $5(e, t) {
  let n = Z5.encode(JSON.stringify(t)),
    r = new Uint8Array(n.length + 1);
  return ((r[0] = e), r.set(n, 1), r);
}
function e7(e) {
  try {
    let t = JSON.parse(Q5.decode(e.subarray(1)));
    return t && typeof t == `object` ? t : null;
  } catch {
    return null;
  }
}
function t7(e) {
  let t = new Uint8Array(2 + e.length * 4),
    n = new DataView(t.buffer);
  return (
    n.setUint8(0, OPCODE.hears),
    n.setUint8(1, e.length),
    e.forEach((e, t) => n.setUint32(2 + t * 4, e, !0)),
    t
  );
}
function n7(e) {
  let t = new DataView(e.buffer, e.byteOffset, e.byteLength),
    n = e.byteLength >= 2 ? t.getUint8(1) : 0,
    r = [];
  for (let i = 0; i < n && 2 + (i + 1) * 4 <= e.byteLength; i++)
    r.push(t.getUint32(2 + i * 4, !0));
  return r;
}
function r7(e, t, n) {
  let r = new Uint8Array(5 + n.byteLength),
    i = new DataView(r.buffer);
  return (i.setUint8(0, e), i.setUint32(1, t, !0), r.set(n, 5), r);
}
function i7(e) {
  return e.byteLength < 6
    ? null
    : {
        hash: new DataView(e.buffer, e.byteOffset).getUint32(1, !0),
        payload: e.subarray(5),
      };
}
