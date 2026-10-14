// assets__index-gCVK5XnX 32 — time
// Lines 57739-57931 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
function rQ() {
  try {
    return window.Wavedash ?? null;
  } catch {
    return null;
  }
}
function iQ(e) {
  let t = rQ();
  if (t)
    try {
      e(t);
    } catch (e) {
      console.warn(`[wavedash]`, e);
    }
}
var aQ = {
    "best-run": [`DESC`, `NUMERIC`],
    "fastest-descent": [`ASC`, `TIME_MILLISECONDS`],
  },
  oQ = {
    top: `At the top of the mountain`,
    walking: `Walking round the lodge`,
    lift: `Riding the chairlift`,
    riding: `Riding the mountain`,
  },
  sQ = new Map(),
  cQ = new Set(),
  lQ = !1,
  uQ = {
    sdk() {
      return rQ();
    },
    progress(e) {
      iQ((t) => t.updateLoadProgressZeroToOne(Y(e)));
    },
    init() {
      iQ((e) => {
        (e.init({ p2p: { messageSize: 1024, maxIncomingMessages: 4096 } }),
          e.requestStats().catch(() => {}));
      });
    },
    presence(e, t = ``) {
      iQ(
        (n) =>
          void n
            .updateUserPresence({ status: oQ[e], details: t })
            .catch(() => {}),
      );
    },
    achieve(e) {
      cQ.has(e) ||
        (cQ.add(e),
        iQ((t) => {
          t.getAchievement(e) || t.setAchievement(e, !0);
        }));
    },
    addStat(e, t) {
      iQ((n) => {
        (n.setStat(e, (n.getStat(e) || 0) + t, !1), (lQ = !0));
      });
    },
    flushStats() {
      lQ && ((lQ = !1), iQ((e) => e.storeStats()));
    },
    submit(e, t) {
      let n = rQ();
      if (!n) return;
      let r = sQ.get(e);
      if (!r) {
        let [t, i] = aQ[e];
        ((r = n
          .getOrCreateLeaderboard(
            e,
            n.LeaderboardSortOrder[t],
            n.LeaderboardDisplayType[i],
          )
          .then((e) => (e.success ? e.data.id : null))
          .catch(() => null)),
          sQ.set(e, r));
      }
      r.then((e) => {
        if (e) return n.uploadLeaderboardScore(e, Math.round(t), !0);
      }).catch((e) => console.warn(`[wavedash] leaderboard`, e));
    },
  },
  dQ = 0.9,
  fQ = 0.09,
  pQ = 7,
  mQ = class {
    time = 0;
    at = -1 / 0;
    last = 0;
    next(e, t, n) {
      this.time += e;
      let r = e > 0 ? (t - this.last) / e : 0;
      return (
        (this.last = t),
        !n || r <= dQ || this.time - this.at <= fQ
          ? -1
          : ((this.at = this.time), Y((r - dQ) / 3))
      );
    }
    hold(e) {
      this.at = this.time + e;
    }
  },
  hQ = class {
    bumps = new mQ();
    hold(e) {
      this.bumps.hold(e);
    }
    update(e, t, n, r, i, a, o) {
      let s = !r && t.mode === `ride` && (t.contact[0] || t.contact[1]),
        c = {
          speed: r ? pQ : t.speed,
          rolling: s,
          surface: t.surface,
          pedalling: t.pedalling,
          skid: t.skid,
          carve: r ? 0 : t.carve,
          wheelRate: r || i ? 0 : Math.abs(t.wheelRate) / DF,
          air: t.mode === `air`,
          rotation: Math.abs(t.yawRate) + Math.abs(t.pitchRate),
          bump: this.bumps.next(e, n, s),
          grip: r ? 0 : t.gripUse,
          pump: r ? 0 : t.pump,
          scrape: i ? a : 0,
          bikeScrape: i ? t.sliding : 0,
        };
      return (
        o !== null &&
          Object.assign(c, {
            speed: o,
            rolling: !1,
            pedalling: !1,
            skid: 0,
            carve: 0,
            wheelRate: 0,
            grip: 0,
            pump: 0,
          }),
        c
      );
    }
  },
  gQ =
    matchMedia(`(pointer: coarse)`).matches &&
    !matchMedia(`(hover: hover)`).matches,
  _Q = gQ,
  vQ = [`KeyA`, `ArrowLeft`],
  yQ = [`KeyD`, `ArrowRight`],
  bQ = [`KeyW`, `ArrowUp`],
  xQ = [`KeyS`, `ArrowDown`],
  SQ = [`Space`],
  CQ = [`ShiftLeft`, `ShiftRight`],
  wQ = [`KeyJ`, ...CQ],
  TQ = [`KeyK`],
  EQ = [`KeyL`],
  DQ = 0.15,
  OQ = 0.3,
  kQ = {
    a: 0,
    b: 1,
    x: 2,
    y: 3,
    lb: 4,
    rb: 5,
    lt: 6,
    rt: 7,
    back: 8,
    start: 9,
    up: 12,
    down: 13,
    left: 14,
    right: 15,
  },
  AQ = [
    [CH.Superman, `KeyU`, kQ.up],
    [CH.CanCan, `KeyI`, kQ.left],
    [CH.Turndown, `KeyO`, kQ.right],
    [CH.Tabletop, `KeyP`, kQ.down],
  ],
  jQ = 0.5,
  MQ = 0.6,
  NQ = 0.35;
function PQ(e) {
  return /054c|playstation|dualsense|dualshock/i.test(e)
    ? `playstation`
    : /057e|nintendo|joy-con|pro controller/i.test(e)
      ? `nintendo`
      : `xbox`;
}
