// assets/index-gCVK5XnX 10 — url
// Lines 49779-49816 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function az(e) {
  let t = iz(e);
  switch (e.kind) {
    case `skinny`:
    case `bridge`:
      return t + e.len + (e.rampOut ? t : 0);
    case `logride`:
      return t + e.len;
    case `seesaw`:
      return tz + e.len;
  }
}
var GRID_N = (WORLD_HALF * 2) / 2 + 1,
  sz = (e) => -WORLD_HALF + e * 2,
  cz = (e) => clamp(Math.round((e + WORLD_HALF) / 2), 0, GRID_N - 1);
async function lz() {
  let e = GRID_N,
    t = new Float32Array(e * e);
  return (
    await VF(e, async (n, r) => {
      let i = [n, r, e, 2],
        a = await BF(
          () =>
            new Worker(
              new URL(
                new URL(`natural.worker-i0ZaMPjG.js`, import.meta.url).href,
                `` + import.meta.url,
              ),
              { type: `module` },
            ),
          i,
          () => cI(...i),
        );
      t.set(a, n * e);
    }),
    t
  );
}
