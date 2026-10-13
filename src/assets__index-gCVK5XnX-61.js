// assets__index-gCVK5XnX 61 — sdk
// Lines 66774-67116 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
async function C7(e, t) {
  if (typeof BroadcastChannel > `u`) return;
  let n = Math.random().toString(36).slice(2),
    r = new BroadcastChannel(`bmx-mountain-tab-${e}`),
    i = (e) => r.postMessage({ k: e, tab: n }),
    a = (e, t) =>
      new Promise((i) => {
        let a = setTimeout(() => s(!1), t),
          o = (t) => t.data.k === e && t.data.tab !== n && s(!0),
          s = (e) => {
            (clearTimeout(a), r.removeEventListener(`message`, o), i(e));
          };
        r.addEventListener(`message`, o);
      }),
    o = a(`here`, x7);
  (i(`new`), (await o) && (await a(`out`, S7)));
  let s = !0;
  r.addEventListener(`message`, async (e) => {
    s &&
      e.data.tab !== n &&
      e.data.k === `new` &&
      ((s = !1), i(`here`), await t(), i(`out`));
  });
}
var w7 = `bmx`,
  T7 = 4e3,
  E7 = 6e3,
  D7 = 1e3,
  O7 = 500,
  k7 = 1500,
  A7 = 1500,
  j7 = 1e4,
  M7 = 2e3,
  N7 = 6e4,
  P7 = 1500,
  F7 = 6e4,
  I7 = 1e4,
  L7 = 35e3,
  R7 = 512,
  z7 = 0,
  B7 = 1,
  V7 = class {
    sdk;
    me = ``;
    name = ``;
    ev;
    lobby = null;
    last = null;
    born = 1 / 0;
    members = new Map();
    links = new Map();
    up = new Set();
    busy = !1;
    retired = !1;
    fruitless = 0;
    restUntil = 0;
    lookedAt = 0;
    linkedAt = 0;
    shunned = new Map();
    posted = { live: 0, at: 0 };
    outdated = !1;
    constructor(e) {
      this.sdk = e;
    }
    start(e) {
      this.ev = e;
      let t = this.sdk;
      ((this.me = t.getUserId()), (this.name = t.getUsername()));
      let n = t.Events;
      (t.on(n.LOBBY_JOINED, (e) => this.onJoined(e)),
        t.on(n.LOBBY_USERS_UPDATED, (e) => this.onUser(e)),
        t.on(n.LOBBY_KICKED, () => {
          (this.drop(), (this.restUntil = Date.now() + P7));
        }),
        t.on(n.P2P_CONNECTION_ESTABLISHED, (e) => this.link(e.userId, !0)),
        t.on(n.P2P_PEER_RECONNECTED, (e) => this.link(e.userId, !0)),
        t.on(n.P2P_PEER_RECONNECTING, (e) => this.link(e.userId, !1)),
        t.on(n.P2P_PEER_DISCONNECTED, (e) => this.link(e.userId, !1)),
        t.on(n.P2P_CONNECTION_FAILED, (e) => this.link(e.userId, !1)));
      let r;
      try {
        r = t.getLaunchParams()?.lobby ?? void 0;
      } catch {}
      (this.task(async () => {
        (await C7(this.me, () => this.retire()),
          await this.arrive(r),
          (this.lookedAt = Date.now() - T7 + A7));
      }),
        setInterval(() => this.regroup(), T7 / 4 + Math.random() * D7),
        document.addEventListener(`visibilitychange`, () => this.regroup()));
    }
    send(e, t, n) {
      if (!this.lobby) return;
      let r = t ? B7 : z7;
      try {
        e
          ? this.sdk.sendP2PMessage(e, r, t, n)
          : this.sdk.broadcastP2PMessage(r, t, n);
      } catch {}
    }
    receive(e) {
      for (let e of this.members.keys()) this.check(e);
      this.up.size > 0 && (this.linkedAt = Date.now());
      for (let t of [z7, B7])
        for (let n = 0; n < R7; n++) {
          let n = this.sdk.readP2PMessageFromChannel(t);
          if (!n) break;
          (this.up.has(n.fromUserId) || this.link(n.fromUserId, !0),
            e(n.fromUserId, n.payload));
        }
    }
    close() {
      let e = this.lobby;
      if (e) {
        this.lobby = null;
        try {
          this.sdk.leaveLobby(e);
        } catch {}
      }
    }
    async task(e) {
      if (!this.busy) {
        this.busy = !0;
        try {
          await e();
        } catch (e) {
          console.warn(`[multiplayer] matchmaking`, e);
        } finally {
          this.busy = !1;
        }
      }
    }
    async arrive(e) {
      if (e) {
        if (
          ((await this.sdk.leaveLobby(e).catch(() => null))?.success &&
            (await n$(M7)),
          (await this.alive(e)) &&
            (await this.join(e)) &&
            this.members.size > 0)
        )
          return;
        await this.leave();
      }
      await this.place();
    }
    async place() {
      (await this.joinBest()) ||
        (await n$(Math.random() * k7),
        !(await this.joinBest()) && (await this.create()));
    }
    async joinBest() {
      for (let e of await this.worlds())
        if (!this.shuns(e) && K7(e) && (await this.join(e.lobbyId))) return !0;
      return !1;
    }
    regroup() {
      if (this.retired) return;
      let e = Date.now();
      this.post(e);
      let t = this.up.size > 0 ? E7 : T7;
      this.busy ||
        document.hidden ||
        e < this.restUntil ||
        e - this.lookedAt < t - O7 ||
        ((this.lookedAt = e),
        this.task(async () => {
          if (!this.lobby) return this.arrive(this.last);
          let e = this.lobby,
            t = await this.worlds();
          if (this.lobby !== e) return;
          let n = Date.now(),
            r = { id: e, players: this.live(n), born: this.born },
            i = t.find(
              (t) =>
                t.lobbyId !== e && !this.shuns(t) && K7(t) && H7(W7(t, n), r),
            );
          if (i && this.ev.canMove()) return this.move(i.lobbyId);
          if (
            this.members.size > 0 &&
            this.live(n) === 1 &&
            n - this.linkedAt > j7
          )
            return this.strand();
        }));
    }
    live(e) {
      let t = 1;
      for (let n of this.members.values())
        (this.up.has(n.id) || e - n.since < j7) && t++;
      return t;
    }
    post(e) {
      let t = this.lobby,
        n = this.up.size + 1;
      if (!(!t || (n === this.posted.live && e - this.posted.at < I7)))
        try {
          if (this.sdk.getLobbyHostId(t) !== this.me) return;
          (this.sdk.setLobbyData(t, `live`, n),
            this.sdk.setLobbyData(t, `at`, e),
            (this.posted = { live: n, at: e }));
        } catch {}
    }
    async move(e) {
      (this.rest(),
        await this.leave(),
        (await this.join(e)) || (await this.place()));
    }
    async strand() {
      let e = this.lobby;
      (this.rest(),
        this.shunned.set(e, Date.now() + F7),
        await this.leave(),
        await n$(M7),
        await this.place());
    }
    shuns(e) {
      let t = this.shunned.get(e.lobbyId);
      if (t === void 0) return !1;
      let n = Date.now();
      return (
        n > t && this.shunned.delete(e.lobbyId),
        n <= t && W7(e, n).players < 2
      );
    }
    rest() {
      (this.fruitless++,
        (this.restUntil = Date.now() + Math.min(N7, T7 * 2 ** this.fruitless)));
    }
    async alive(e) {
      let t = await this.sdk.getLobby(e);
      return t.success && G7(t.data) && t.data.playerCount > 0 && K7(t.data);
    }
    async worlds() {
      let e = await this.sdk.listAvailableLobbies(!1);
      if (!e.success) return [];
      !this.outdated &&
        e.data.some(
          (e) =>
            e.metadata?.game === w7 &&
            Number(e.metadata?.v) > 7 &&
            e.playerCount > 0,
        ) &&
        ((this.outdated = !0), this.ev.outdated());
      let t = Date.now();
      return e.data
        .filter((e) => G7(e) && e.playerCount > 0)
        .sort((e, n) => (H7(W7(e, t), W7(n, t)) ? -1 : 1));
    }
    async join(e) {
      return !this.retired && (await this.sdk.joinLobby(e)).success;
    }
    async create() {
      if (this.retired) return;
      let e = await this.sdk.createLobby(this.sdk.LobbyVisibility.PUBLIC, 50);
      if (!e.success) return;
      let t = Date.now();
      ((this.born = t), (this.posted = { live: 1, at: t }));
      for (let [n, r] of Object.entries({
        game: w7,
        v: 7,
        born: t,
        live: 1,
        at: t,
      }))
        this.sdk.setLobbyData(e.data, n, r);
    }
    async leave() {
      let e = this.lobby;
      e && (this.drop(), await this.sdk.leaveLobby(e).catch(() => null));
    }
    async retire() {
      for (this.retired = !0; this.busy;) await n$(100);
      (await this.leave(), this.ev.retired());
    }
    onJoined(e) {
      this.lobby && this.drop();
      let t = Date.now(),
        n = U7(e.metadata);
      ((this.lobby = this.last = e.lobbyId),
        (this.born = n === 1 / 0 ? t : n),
        (this.linkedAt = t),
        (this.posted = { live: 0, at: 0 }));
      for (let n of e.users)
        n.userId !== this.me &&
          this.members.set(n.userId, {
            id: n.userId,
            name: n.username,
            since: t,
          });
      this.ev.joined([...this.members.values()]);
      for (let e of this.members.keys()) this.check(e);
    }
    onUser(e) {
      if (this.lobby && e.lobbyId === this.lobby && e.userId !== this.me) {
        if (e.changeType === this.sdk.LobbyUserChangeType.JOINED) {
          if (this.members.has(e.userId)) return;
          let t = { id: e.userId, name: e.username, since: Date.now() };
          (this.members.set(t.id, t),
            this.ev.memberJoined(t),
            this.check(t.id));
        } else
          this.members.delete(e.userId) &&
            (this.links.delete(e.userId),
            this.up.delete(e.userId),
            this.ev.memberLeft(e.userId));
      }
    }
    link(e, t) {
      (this.links.set(e, t), this.check(e));
    }
    check(e) {
      if (!this.members.has(e)) return;
      let t = this.isUp(e);
      t !== this.up.has(e) &&
        (t
          ? (this.up.add(e), (this.fruitless = 0), this.ev.linkUp(e))
          : (this.up.delete(e), this.ev.linkDown(e)));
    }
    isUp(e) {
      let t;
      try {
        t = this.sdk.p2pManager?.isPeerReady?.(e);
      } catch {}
      return t !== !1 && (this.links.get(e) ?? t === !0);
    }
    drop() {
      this.lobby &&
        ((this.lobby = null),
        this.members.clear(),
        this.links.clear(),
        this.up.clear(),
        this.ev.left());
    }
  };
function H7(e, t) {
  return e.players === t.players
    ? e.born === t.born
      ? e.id < t.id
      : e.born < t.born
    : e.players > t.players;
}
var U7 = (e) => Number(e?.born) || 1 / 0;
