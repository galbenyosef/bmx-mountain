# BMX MOUNTAIN — offline mirror

Full mirror of **BMX Mountain** (https://wavedash.com/games/bmx-mountain).

Source: https://wavedash.com/games/bmx-mountain

![BMX MOUNTAIN](docs/cover.png)

## Stack

- **Custom Vite production build** (engine `CUSTOM` on the platform) — entry
  `index.html` + one minified ESM bundle `assets/index-gCVK5XnX.js` (1.31 MB)
  and four module workers (`horizon`, `cover`, `deerSkin`, `natural`).
- **three.js r186 bundled into the entry chunk** — the node/TSL system and the
  `WebGPURenderer`/`WebGLRenderer` cores are minifier-merged into
  `assets/index-gCVK5XnX.js` (registered at `window.__THREE__ = "186"`); the
  game targets WebGPU with a WebGL2 fallback.
- **Fully procedural world** — terrain, trees, rocks, the rider, the bike, the
  deer herd and the lodge are generated in code (signed-distance/triplanar
  textures + skinned procedural meshes); there are no model files at all.
- **Wavedash platform glue** — `embed` (HTML shell), `embed.js` (embed SDK),
  `embed.css`, `sw-embed.js` (service worker) serve the build on the platform;
  the game itself only needs `index.html`, `assets/`, `tex/` and `sfx/`.
- **Payload set** — 24 WebP textures (`tex/`) and 45 WAV effects (`sfx/`);
  no fonts ship (CSS system-font stacks only).

## What this is

BMX Mountain (wavedash.com/games/bmx-mountain) — "Bomb down a steep, fast dirt
trail through pine forest and golden aspens, carving berms, pumping rollers and
launching off jumps with snowy peaks all around": a 3D mountain-bike descent
game by the Wavedash developer **@portner**, played in the browser on the
Wavedash platform (keyboard/mouse and controller). The mountain carries a live
multiplayer presence on the platform ("N on the mountain").

Capture-class mirror: the game is NOT served from `wavedash.com`. The platform
server-renders the game page with a per-load bootstrap (`playKey`, `gameCloudId`,
`gameBuild` metadata) and the build runs in an iframe on a per-build CDN host

```
https://<gameCloudId>-<fnv32(userId)>-<fnv32(gameBuildId)>.builds.wavedashcdn.com
```

whose `/embed` shell mints a ~1 h gameplay JWT; every build-file request then
travels with `Authorization: Bearer <jwt>` + `X-Wd-Sw: jwt` (what
`sw-embed.js` adds in a browser). The mirror captures the build host's closure
at the repo root (repo root == CDN host root), so a static server reproduces
the game's own request graph: `index.html` → `./assets/index-gCVK5XnX.js` →
the four workers + `tex/*.webp` + `sfx/*.wav`.

Build at capture (2026-10-13): `gameBuild mn79ffen43qqtarbeqsw0mkvdh8g34bf`,
buildNumber 86, engine `CUSTOM`, entrypoint `index.html`, `buildSizeBytes`
17,271,305. The captured closure is 79 files / 18,043,450 bytes — the build
payload plus the platform's public embed files (`embed.js` 732,728 +
`sw-embed.js` 30,200 + `embed.css` 9,831 B ≈ 772 KB); a ~614 B remainder of the
upload-side build record is not reachable by any runtime request.

External at runtime (platform backend, never part of the closure):
`convex-api.wavedash.com` (realtime backend behind the Wavedash SDK),
`uploads.wavedash.com` / `ugc.wavedashcdn.com` (UGC/cloud saves),
`o4510067032457216.ingest.us.sentry.io` (SDK telemetry),
`accounts.google.com` (sign-in iframe on the platform page) and the platform
auth endpoints `/auth/token` + `/auth/refresh` (dynamic JWT mint/refresh —
documented, never captured). Playing the mirror standalone is offline: no
platform session, no cloud saves, no other riders.

§0.4 fork-over-mirror checked 2026-10-13: the page credits the game to the
platform developer **@portner** and links no public source repository (the only
`github.com` URL in the bundle is three.js's own issue link inside the vendored
library; `github.com/wvdsh` is the platform org, not this game's source). No
upstream repo to fork — the mirror stands.

## Layout

- `index.html`, `assets/`, `tex/`, `sfx/` — the game's own closure (entry,
  bundle + module workers, textures, sounds), byte-exact as served
- `embed`, `embed.js`, `embed.css`, `sw-embed.js` — the platform's embed shell /
  SDK / service worker as served on the same host (`embed` is dynamic — the
  rotating JWT/sessionToken snapshot; `embed.js`/`embed.css`/`sw-embed.js` are
  the public platform files)
- `.upstream/manifest.json` — sha256 for every captured file (79; `embed`
  marked `dynamic`)
- `readable/` — prettified derived layer (pinned prettier 3.9.6, fixed point)
  that **mirrors the served paths**: 8 JS pretties under `readable/assets/…`
  plus `readable/embed.pretty.js` / `readable/sw-embed.pretty.js`, the
  stylesheet `readable/embed.pretty.css`, the two inline-block twins from
  `index.html` + `embed`, and `readable/index-inline-map.json`
- `src/` + `split-spec.json` — 75 statement-aligned slices in the same
  served-path structure (`src/assets/<chunk>-NN.js`), re-cut through the
  recorded rename map, with the derivation spec
- `rename-map.json` + `tools/names.json` — the identifier rename campaign: the
  recovered per-slice map (619 word-boundary records) and the reviewed worklist
  with per-name evidence
- `legacy/2026-10-15/` — the superseded flat derived layers (both `readable/`
  and `src/` with `__`-flattened names), archived before the served-path re-cut
- `docs/` — cover, boot evidence (`boot-2026-10-13.png`, `boot-2026-10-15.png`),
  network log
- `tools/derive.mjs` — rebuild `readable/` + `src/` + `split-spec.json`
- `tools/apply-names.mjs`, `tools/recover-scoped-map.mjs` — write / record the
  rename batches (PLAN §5)
- `tools/verify-rename.mjs`, `tools/check-chunk.mjs`, `tools/refcheck.mjs`,
  `tools/engine/rename-layer.mjs`, `tools/lib-acorn.mjs` (+ gitignored
  `tools/.deps`, acorn 8.14.1, authoring-time only) — the rename gates and the
  shared tokenizer layer
- `tools/probe-structure.mjs` — from-bytes structure / bundler-signature probe
- `tools/record-manifest.mjs` — re-cut `.upstream/manifest.json` (`--check`
  reproduces the committed record)
- `tools/scan.mjs` — closure scanner (referenced-but-missing files)
- `tools/capture.mjs` — reproducible bootstrap + re-fetch path (PLAN §3)
- `tools/update.mjs` — read-only drift probe against the live platform
- `tools/verify.mjs` — re-hash the capture against the manifest
- `tools/audit.js` — integrity gate for the derived layers + rename map (`AUDIT PASS`)
- `tools/serve.mjs` — minimal static server for boot tests

## Assets

- **textures** — 24 file(s): `tex/` (8 ground sets × colour+normal WebP:
  `aerial_grass_rock`, `aerial_rocks_02`, `dirt_floor`, `forest_floor`,
  `forrest_ground_01`, `mossy_rock`, `rocky_trail`, `snow_02`; bark
  `bark_pine`/`bark_birch` colour+normal; leaf masks `leaf_pine`/`leaf_aspen`;
  `wood_rough` colour+normal)
- **audio** — 45 file(s): `sfx/` (ride loops `roll_dirt`/`roll_gravel`/
  `pedal_chain`/`hub_buzz`/`skid_gravel`, ambience `amb_birds`/`amb_breeze`/
  `amb_creek`, impacts `land0-4`/`bikefall0-2`/`bodyfall`/`wood0-2`, water
  `splash0-1`/`slosh0-2`, human `grunt0-2`/`hurt0-2`/`breath`, UI `click0-11`)
- **models** — none — the world, rider, bike and deer are procedural (no
  glTF/GLB anywhere in the closure)
- **fonts** — none — the platform CSS and game UI use system font stacks
- **code payloads** — 5 file(s): `assets/` (entry bundle + `horizon`/`cover`/
  `deerSkin`/`natural` module workers)
- **platform** — 4 file(s): `embed`, `embed.js`, `embed.css`, `sw-embed.js`

## Run

Open `index.html` through any static file server (the capture is a static
site; no build step):

```
node tools/serve.mjs 8747        # or: npx serve .
```

then open `http://127.0.0.1:8747/`. The game boots straight from local files
(no platform session — the platform-only extras such as cloud saves and other
riders stay external).

## Verify

```
node tools/verify.mjs               # re-hash the capture against the manifest
node tools/audit.js                 # derived-layer + rename-map integrity gate
node tools/verify-rename.mjs --all  # per-slice rename reproduction + references/bindings
node tools/check-chunk.mjs --all    # cross-slice calls resolve after renames
node tools/refcheck.mjs             # scope/binding-drift library (the drift checks run inside the two above)
node tools/check-exports.mjs        # the derived layer still exports every public name
node tools/record-manifest.mjs --check  # the committed manifest reproduces exactly
```

The rename gates need acorn (authoring-time only): it installs into the
gitignored `tools/.deps` on first use and is never shipped or required at
runtime.

## Updating from upstream

```
node tools/update.mjs     # read-only drift probe: what changed upstream
```

The probe never rewrites the capture — a mirror is a point-in-time snapshot.
It re-derives the platform host, mints a fresh gameplay JWT via `/embed` and
re-hashes every captured file against the live build (build-id changes show up
as a `<build>` row). Refreshing means re-running `tools/capture.mjs` into a
clean tree, re-cutting `.upstream/manifest.json` (`node tools/record-manifest.mjs`),
and re-cutting the derived layers on top of the new build
(`node tools/derive.mjs && node tools/audit.js`). A refresh renames the chunk
hashes in the filenames, so the rename map must be re-recorded: the campaign
engine keeps the reviewed rules (`tools/names.json`) while
`node tools/recover-scoped-map.mjs` re-derives `rename-map.json` against the new
slices, and the gates (`verify-rename` / `check-chunk` / `audit`) re-prove it.

Known platform noise: the game page occasionally answers a smaller
client-rendered variant (no `playKey`/`gameBuild` in the HTML) — the probe
fails loudly in that case and succeeds on retry.

### 2026-10-15 structure + rename campaign (reversal pass)

Mission: converge the derived layers on the real project shape and close the
PLAN §5 identifier rename campaign. The capture was **not** touched —
`node tools/verify.mjs` still re-hashes all 79 files (0 problems) — so this
section is entirely about `readable/`, `src/`, `split-spec.json`,
`rename-map.json` and `tools/`.

- **Inventory (source maps + module boundaries) — both negative, recorded**:
  - *Source maps*: zero `sourceMappingURL` in the capture's own JS (only the
    platform `embed.js` carries one, and it is a vendor whole-file); no `.map`
    file in the closure, so no original tree can be reconstructed — the
    derivation stays a prettier/slice pass.
  - *Module boundaries*: the entry chunk `assets/index-gCVK5XnX.js` is a
    **flat ESM module** — 1,016 top-level statements (324 `var`, 541
    `function`, 144 expression statements), **0** `__defs[` / `__webpack_require__`
    / `turbopack_` / `__vite__mapDeps` / `.push([` module-factory signatures, no
    dynamic `import()`, no export table. There is no factory family to split
    on, so the statement-aligned slice remains the true boundary this bundle
    exposes (PLAN §5 structural precedence). The four module workers are each a
    whole-program IIFE (one statement → one slice), which the campaign engine
    re-roots at the IIFE callee (proposals (ag)/(ah)).
- **Structure — `readable/` and `src/` now mirror the served paths** (PLAN §5
  "the served path is the truth"): a captured file at
  `assets/index-gCVK5XnX.js` derives to
  `readable/assets/index-gCVK5XnX.pretty.js` and
  `src/assets/index-gCVK5XnX-NN.js`; `__`-flattening is gone. Before/after:
  `readable/` 10 flat pretties → 8 under `readable/assets/` + `embed` /
  `sw-embed` / `embed.css` at the readable root + the two inline twins +
  `readable/index-inline-map.json`; `src/` 75 flat slices → 75 under
  `src/assets/`. Slice headers carry the served tag (e.g.
  `// assets/index-gCVK5XnX 01 — math`); `split-spec.json`'s
  `file` / `sourceFile` / `defaultFile` all use the new paths. The superseded
  flat layers are archived in `legacy/2026-10-15/{readable,src}`.
- **Rename campaign (PLAN §5) — tooling + 67 reviewed rules over the one app
  chunk**: `tools/names.json` is the reviewed worklist (every entry carries its
  evidence in `__evidence`: the declaration line the rule was authored from);
  `tools/apply-names.mjs` is the scope-aware writer (renames only identifiers
  resolving to the chunk's top-level bindings, cross-slice references included);
  `tools/recover-scoped-map.mjs` records what actually fired into
  `rename-map.json` by mechanical token alignment (both sides must agree in
  every non-identifier position); `tools/derive.mjs` re-applies that map on
  every re-cut, so the layer is reproducible. The engine is the newest fleet
  lineage (`templates/rename-campaign`, roadster-flying-car; re-synced
  2026-10-20) carrying the canonical guard family — marked
  Function/ClassDeclaration ids (p), the brace-depth template scanner (r),
  ranged-declaration refusal + per-source line cache (s), the index-only
  binding map (t1), `of`/`in` keyword safety (x), token-wise import specifiers
  (ab), per-chunk target uniqueness (ad), flat occurrence counting (af),
  fixed-point pretties (t3), the labeled-loop body walk (aj — the voxelrush
  live fix), the spread-call property-access guard (wonderforge — `...HM(c)`
  is a call, not a property read) and whole-program-IIFE re-rooting (ag)/(ah).
  Renames applied: **67 (of 67 rules) over the entry chunk, 2,673 identifier
  occurrences**; the recovered map holds **619 word-boundary records, 0 indexed
  records**, all index-validated by the audit.
  **Rules refused by the writer: 0 of 67** — the refusal preflight was clean
  (every rule bound exactly one program-scope name; none sat in a shorthand
  property, property access, object key or keyword position; none was bound in
  more than one place; and every eligible occurrence of every named binding was
  renamed, since a partial application is refused). So `tools/names.json` carries
  an empty `refused` section and there is no per-rule refusal to record; the
  bindings that were *not* renamed are scope decisions, not refusals (see the
  deliberate non-renames below). Highlights: `PHYSICS` (the
  physics config object), the math/utility helpers read out of the
  minifier-merged `var` (`TAU`, `clamp`, `smoothstep`, `lerp`, `wrap`,
  `wrapAngle`, `lerpAngle`, `headingFromXZ`, `approach`, `approachExp`,
  `FIXED_DT`, `makeRng`, `hash01`, `hashString`, `randSpread`, `SAMPLE_STEP`,
  `GRID_N`, `WORLD_HALF`, `LODGE_HALF`, `TRAIL_FADE`, `TRAIL_HALF_WIDTH`,
  `FIXED_STEP`, `DEER_CHANCE`), the TSL node aliases (`tslVec3` / `tslVec2` /
  `tslVec4` / `tslFloat` / `tslInt` / `tslSmoothstep` / `tslMix` / `tslUniform` /
  `tslMax` / `tslTexture` / `tslAttribute` / `tslFn` / `tslUv` / `tslIf` /
  `tslDot` / `tslLength` / `tslNormalize` / `tslAbs` / `tslSin`), the game
  tables/enums (`SURFACE`, `RIDE_MODE`, `TRICK`, `OPCODE`, `DEER_COLORS`,
  `FOLIAGE`, `PAD`, `CSS_VARS`, `BONES`, `LIMB_LENGTHS`, `STATION`, `wavedash`)
  and the named helpers (`makeEl`, `addMesh`, `mergeGeometry`, `makeTube`,
  `trailToWorld`, `valueNoise`, `fbmNoise`, `cssColor`, `mixColor`,
  `makeBuffer`, `creekProbe`, `scratchNormal`).
- **What the campaign deliberately does not rename** (honest scope):
  - **vendor identifiers** — the bundled three.js r186 region (the wholeFile
    band, lines 32–47336) is never rewritten, and the TSL namespace `K` itself
    is declared there, so it keeps its minified name; the wholeFile vendor
    bundles `embed.js` / `sw-embed.js` likewise;
  - **locals inside function bodies** — the campaign renames top-level bindings
    only (1,609 program-scope names are ELIGIBLE in the entry chunk; 67 are
    named so far, the tooling is in place for further batches);
  - **names in shorthand positions** (`{x}`, `const {x} = …`) — the key shares
    the token text, so a token rename cannot express it (the writer refuses
    them at preflight);
  - **object keys** — the physics config's own property names (`step`, `mass`,
    `wheelRadius`, …) are property positions and are never renamed.
- **Gates (verbatim tails)**:

  ```
  node tools/verify.mjs         → 79 files checked, 0 problems
  node tools/audit.js           → AUDIT PASS — 82 spec sections (75/75 src↔pretty round-trips byte-exact through the recorded rename map, 67 renamed slice(s), 10/10 pretty sources tiled contiguously, 75/75 src slices + 8/8 readable/*.pretty.js parse standalone (node --input-type=module --check -), 10/10 pretties provably distinct from their capture source, 69/69 notRendered payloads byte-exact on disk, 7 index-only wholeFile/skipped sections carry no src file, 2 inline content block(s) with twins + index-inline-map.json, 4/4 imports resolve inside the capture (0 whitelisted machinery), rename map: 619 record(s) over 67 slice(s), all indices address the recorded identifiers and no foreign position, 10/10 pretties re-render byte-exact under pinned prettier 3.9.6 (fixed point), capture manifest free of derived layers)
  node tools/verify-rename.mjs --all → 75/75 slice(s) reproduce byte-exact, 67 renamed slice(s) (0 indexed occurrence(s)), 5/5 chunk(s) references+bindings YES
  node tools/check-chunk.mjs --all   → 5 chunk(s), 75 slice body(ies) substituted — all cross-slice calls resolve
  node tools/record-manifest.mjs --check → record-manifest --check: 79 files match the committed record
  ```

  `tools/derive.mjs` re-run is byte-identical (`split-spec.json` and
  `rename-map.json` stable); `tools/apply-names.mjs --all` re-run reports
  0 changed. Serve probe (2026-10-15): the mirror root served on loopback
  (`http://127.0.0.1:8747/`), the game booted from local files and rendered
  (canvas 1267×716, `window.__THREE__ = "186"`, gameplay at the START gate —
  evidence `docs/boot-2026-10-15.png`), the listener PID killed and the port
  proven closed (`netstat` shows no LISTENING socket; `curl` → connection
  refused).
- **Honest gaps**: the campaign is a first batch over the entry chunk (67 of
  1,609 eligible program-scope names); the four module workers keep the
  bundle's own minified names (their bindings are IIFE-locals, out of scope for
  this pass). The platform-only extras (cloud saves, other riders) still need a
  platform session, and the ~614 B upload-side remainder stays unreachable.

### 2026-10-20 rename-campaign re-verification

The rename layer was re-run end to end against the committed capture, and the
toolchain was brought level with the current fleet set. The capture was not
touched (`node tools/verify.mjs` still re-hashes all 79 files, 0 problems).

- **The reviewed worklist was already applied — 67 of 67 rules, 0 refusals.**
  `node tools/apply-names.mjs --all` reports *75 file(s) visited, 0 changed,
  2,673 identifier splice(s) (app: 67 name(s) over 1 chunk(s))* — every rule
  fires, every file already carries its rename, and the writer refuses
  nothing. `node tools/recover-scoped-map.mjs` re-derives `rename-map.json`
  mechanically (75 slices aligned over 249,743 token positions → 619
  word-boundary records, 0 indexed records) and `node tools/derive.mjs`
  re-derives the whole layer byte-identically: `src/`, `readable/`,
  `split-spec.json` and `rename-map.json` come back unchanged, so the spec
  still records all 67 bindings under `sources[].renameBindings`. The
  worklist's outcome is now stated in `tools/names.json` itself (`__outcome`,
  plus an explicit empty `refused` section — there is no per-rule refusal to
  record).
- **The engine was the one stale tool.** `tools/engine/rename-layer.mjs` was
  still the 2026-10-15 copy and carried the roadster-flying-car layout note
  (an inline `<script>` module, a `__defs`/`__req` registry, three.js r187dev —
  none of which is true of this capture). It was re-synced with the current
  fleet engine (`templates/rename-campaign/engine/rename-layer.mjs`), which
  adds the spread-call property-access guard (wonderforge: `...HM(c)` is a
  call, not a property read, and matching it demoted a clean word-boundary
  rename to the index-addressed map), and the layout note was rewritten for
  this mirror's real shape (served-path capture, flat ESM entry chunk, the
  three.js r186 vendor band, four whole-program-IIFE workers). The fix is
  provably a no-op here: none of the 67 names occurs after a dot anywhere in
  the chunk, so the recovered map is byte-identical before and after.
- **Gates (verbatim tails, 2026-10-20)**:

  ```
  node tools/verify.mjs         → 79 files checked, 0 problems
  node tools/verify-rename.mjs --all → 75/75 slice(s) reproduce byte-exact, 67 renamed slice(s) (0 indexed occurrence(s)), 5/5 chunk(s) references+bindings YES
  node tools/check-chunk.mjs --all   → 5 chunk(s), 75 slice body(ies) substituted — all cross-slice calls resolve
  node tools/derive.mjs --check → re-derives in a throwaway scratch copy outside the mirror and compares the result with the committed tree — DERIVE CHECK PASS (nothing written)
  node tools/audit.js           → AUDIT PASS — 82 spec sections (75/75 src↔pretty round-trips byte-exact through the recorded rename map, 67 renamed slice(s), …, rename map: 619 record(s) over 67 slice(s), all indices address the recorded identifiers and no foreign position, …)
  node tools/record-manifest.mjs --check → record-manifest --check: 79 files match the committed record
  ```

  `node tools/refcheck.mjs` is a library (its scope/binding-drift checks run
  inside `verify-rename` and `check-chunk`); it exits 0.

## Mirror conventions

- **Capture layer** — the captured files are byte-exact copies of what the
  origin served; nothing in them is edited.
- **Readable layer** — `readable/` is derived (prettified) and never shipped to
  a browser; it exists so the bundle can actually be read. Both derived layers
  mirror the served paths (`readable/assets/…`, `src/assets/…`).
- **Rename layer** — `src/` keeps the served chunk names; the campaign renames
  only the chunk's top-level bindings, records every rename in
  `rename-map.json`, and `tools/derive.mjs` re-applies the recorded map on every
  re-cut, so the layer is reproducible (never ad-hoc).
- **Provenance** — `.upstream/manifest.json` records sha256 for each captured
  artifact, and `tools/verify.mjs` re-checks it.
- **Drift** — `tools/update.mjs` is read-only: it reports what changed upstream
  and never rewrites the capture.

## Fleet status

<!-- mirror-status:start — feeds _standard/REPO-INDEX.md. Update ONLY your own mirror's block; never edit the shared index (PLAN §8). Rebuild: node _standard/build-index.mjs -->
<!-- cols: cls=classification · ver=verify 0 problems · upd=drift probe · man=manifest · rdbl=readable re-derived · src=reversed src · boot=boot test · top=offline-mirror topic · tag=backup tag · staged=staged not committed -->
| # | repo | cls | ver | upd | man | rdbl | src | boot | top | tag | staged |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 312 | bmx-mountain | mirror | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
<!-- mirror-status:end -->
