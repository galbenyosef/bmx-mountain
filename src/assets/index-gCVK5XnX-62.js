// assets/index-gCVK5XnX 62 — metadata
// Lines 67117-67126 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function W7(e, t) {
  let n = Number(e.metadata?.live),
    r = t - Number(e.metadata?.at),
    i = Number.isFinite(n) && Math.abs(r) < L7;
  return {
    id: e.lobbyId,
    players: i ? n : e.playerCount - 1,
    born: U7(e.metadata),
  };
}
