// assets__index-gCVK5XnX 60 — arrived
// Lines 66315-66773 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
var a7 = 0.12,
  o7 = 20,
  s7 = 0.25,
  c7 = 2,
  l7 = 6,
  u7 = 2,
  d7 = 5,
  f7 = 6,
  p7 = Number.MAX_VALUE,
  m7 = 1,
  h7 = 2.5,
  g7 = 1e3,
  _7 = 40,
  v7 = new M(),
  y7 = { x: 0, y: 0, z: 0, yaw: 0 },
  b7 = class {
    ctx;
    clock;
    me = ``;
    name = ``;
    together = 0;
    peers = new Map();
    host = ``;
    kit = 0;
    inWorld = !1;
    joinedAt = 0;
    arrived = null;
    shown = -1;
    sendAt = 0;
    pingAt = 0;
    helloAt = 0;
    hearsAt = 0;
    buf = new Uint8Array(K5);
    net = null;
    constructor(e, t) {
      ((this.ctx = e), (this.clock = t));
    }
    start(e) {
      e &&
        ((this.net = e),
        e.start({
          joined: (e) => this.onJoined(e),
          memberJoined: (e) => this.onMemberJoined(e),
          memberLeft: (e) => this.onMemberLeft(e),
          linkUp: (e) => this.onLink(e, !0),
          linkDown: (e) => this.onLink(e, !1),
          left: () => this.onLeft(),
          retired: () => this.ctx.hud.notice(``, `Riding in another tab`),
          outdated: () => this.ctx.hud.outdated(),
          canMove: () => this.ctx.canMove(),
        }),
        (this.me = e.me),
        (this.name = e.name),
        (this.host = this.me),
        (this.kit = $K(this.me)),
        addEventListener(`pagehide`, () => this.close()));
    }
    get solo() {
      return this.peers.size === 0;
    }
    poll() {
      let e = this.net;
      if (
        !e ||
        (this.clock.woke(this.solo),
        e.receive((e, t) => this.onMessage(e, t)),
        !this.inWorld)
      )
        return;
      let t = e$();
      (!this.clock.synced &&
      t - this.joinedAt > f7 &&
      !this.references(t).length
        ? (this.clock.lead(), (this.arrived = p7), this.announce())
        : this.arrived === p7 &&
          [...this.peers.values()].some(
            (e) => this.eligible(e, t) && e.arrived !== p7,
          ) &&
          (this.clock.unsync(), (this.arrived = null)),
        this.arrived === null &&
          this.clock.synced &&
          ((this.arrived = this.clock.now()), this.announce()));
      for (let e of this.peers.values()) this.check(e, t);
      if ((this.elect(t), this.recount(t), t >= this.pingAt)) {
        let e = this.references(t),
          n =
            !this.clock.synced ||
            e.some((e) => this.clock.samplesFrom(e.id) < l7);
        this.pingAt = t + (n ? s7 : c7);
        let r = Y5(H5.ping, t);
        for (let n of e) this.sendTo(n, r, t);
      }
      if (t >= this.helloAt) {
        this.helloAt = t + u7;
        for (let e of this.peers.values())
          !e.ok && (e.linked || this.relayFor(e, t)) && this.hello(e, !1);
      }
      if (t >= this.hearsAt) {
        this.hearsAt = t + m7;
        let n = [];
        for (let e of this.peers.values()) this.reaches(e, t) && n.push(e.hash);
        e.send(null, !1, t7(n));
      }
    }
    send(e, t) {
      if (!this.net || !this.inWorld || this.solo) return;
      let n = e$();
      n < this.sendAt ||
        ((this.sendAt = n + 1 / o7),
        q5(this.buf, e, t, this.clock.now(), this.clock.synced),
        this.broadcast(this.buf));
    }
    trick(e, t) {
      this.net &&
        this.inWorld &&
        !this.solo &&
        this.broadcast($5(H5.trick, { name: e, pts: t, t: this.clock.now() }));
    }
    update(e) {
      let t = this.clock.now() - a7,
        n = e$();
      for (let r of this.peers.values()) {
        let i = r.rider;
        if (!i) continue;
        i.update(e, t, n);
        let a = i.state,
          o = i.live && i.avatar.group.visible;
        this.ctx.sound.other(
          r.id,
          o ? i.avatar.bike.root.position : null,
          a.speed,
          a.pedal > 0,
          a.mode === kH.Ride,
          a.mode === kH.Air,
        );
      }
      this.shown > 1 && (this.together += e);
    }
    *riders() {
      for (let e of this.peers.values()) {
        let t = e.rider;
        t?.live &&
          (t.state.mode === kH.Ride || t.state.mode === kH.Air) &&
          (yield t.state);
      }
    }
    *heads() {
      for (let e of this.peers.values()) {
        let t = e.rider;
        t?.live && t.avatar.group.visible && (yield t.avatar.rider.head);
      }
    }
    tags(e, t, n) {
      for (let r of this.peers.values()) {
        let i = r.rider,
          a = i?.live && i.avatar.group.visible;
        this.ctx.hud.tag(
          r.id,
          r.name,
          a ? B5(i.avatar.head(v7), e, this.ctx.ground, t, n) : null,
        );
      }
    }
    *aboard() {
      for (let e of this.peers.values()) {
        let t = e.rider?.state;
        if (!t || !e.rider.live || t.chair < 0) continue;
        let n = t.mode !== kH.Seated;
        (n && t.mode !== kH.Ride) ||
          (yield {
            id: e.id,
            chair: Math.round(t.chair),
            seat: Math.round(t.seat),
            waiting: n,
          });
      }
    }
    close() {
      this.net &&
        (this.inWorld && this.broadcast(new Uint8Array([H5.bye])),
        this.net.close());
    }
    onJoined(e) {
      (this.clear(),
        (this.inWorld = !0),
        (this.joinedAt = e$()),
        (this.arrived = null),
        (this.host = ``));
      for (let t of e) this.addPeer(t, !0);
      e.length ? this.clock.unsync() : this.clock.lead();
    }
    onMemberJoined(e) {
      this.inWorld && !this.peers.has(e.id) && this.addPeer(e, !1);
    }
    onMemberLeft(e) {
      let t = this.peers.get(e);
      t && (this.removePeer(t), this.farewell(t));
    }
    onLink(e, t) {
      let n = this.peers.get(e);
      n && ((n.linked = t), t ? this.hello(n, !1) : (n.heard = -1 / 0));
    }
    onLeft() {
      (this.clear(),
        (this.inWorld = !1),
        (this.host = this.me),
        (this.arrived = null),
        this.clock.lead());
    }
    onMessage(e, t, n = !1) {
      let r = this.peers.get(e);
      if (r && t.length !== 0)
        switch (((r.heard = e$()), n || (r.direct = r.heard), t[0])) {
          case H5.state:
            return this.onState(r, t);
          case H5.ping: {
            let e = X5(t);
            e &&
              this.sendTo(
                r,
                Y5(H5.pong, e.a, this.clock.now(), this.clock.synced),
                r.heard,
              );
            return;
          }
          case H5.pong: {
            let n = X5(t);
            if (!n?.synced || !this.references(r.heard).includes(r)) return;
            ((r.synced = !0), this.clock.pong(e, n.a, n.b));
            return;
          }
          case H5.hello:
            return this.onHello(r, t);
          case H5.trick:
            return this.onTrick(r, t);
          case H5.bye:
            ((r.bye = !0), (r.heard = -1 / 0), this.farewell(r));
            return;
          case H5.hears:
            ((r.hears = new Set(n7(t))), (r.hearsAt = r.heard));
            return;
          case H5.relay: {
            let e = i7(t),
              i = e && !n && this.byHash(e.hash);
            i &&
              this.reaches(i, r.heard) &&
              this.net.send(
                i.id,
                U5(e.payload[0]),
                r7(H5.relayed, r.hash, e.payload),
              );
            return;
          }
          case H5.relayed: {
            let e = i7(t),
              r = e && !n && this.byHash(e.hash);
            r &&
              e.payload[0] !== H5.relay &&
              e.payload[0] !== H5.relayed &&
              this.onMessage(r.id, e.payload, !0);
            return;
          }
        }
    }
    onState(e, t) {
      let n = J5(t);
      n &&
        ((e.synced = !!(n.flags & 1)),
        e.ok &&
          !e.bye &&
          e.synced &&
          this.clock.synced &&
          (e.rider ||
            ((e.rider = new N5(
              this.ctx.scene,
              eq(e.id, e.kit ?? void 0, e.name),
              this.ctx.ground,
            )),
            (e.rider.visible = this.here(e, e.heard)),
            (e.rider.seated = (e) =>
              Object.assign(
                e,
                this.ctx.lift.seatAt(
                  Math.round(e.chair),
                  Math.round(e.seat),
                  this.clock.now(),
                  y7,
                ),
              ))),
          e.rider.push(n, e.heard)));
    }
    onHello(e, t) {
      let n = e7(t);
      if (!n || ((e.ok = n.v === 7), !e.ok)) return;
      ((e.bye = !1),
        (e.arrived =
          typeof n.arrived == `number` && Number.isFinite(n.arrived)
            ? n.arrived
            : null));
      let r = Number(n.kit);
      (Number.isInteger(r) &&
        r >= 0 &&
        r < QK.length &&
        r !== e.kit &&
        ((e.kit = r), e.rider?.restyle(eq(e.id, r, e.name))),
        n.ack !== !0 && this.hello(e, !0),
        this.checkKit());
    }
    onTrick(e, t) {
      let n = e7(t);
      if (!n || typeof n.name != `string` || !(Number(n.t) > e.trickAt)) return;
      e.trickAt = Number(n.t);
      let r = Math.round(Number(n.pts)) || 0,
        i = `${n.name.slice(0, _7)} +${r}`;
      (this.ctx.hud.tagTrick(e.id, i),
        r >= g7 && this.ctx.hud.notice(e.name, i));
    }
    hello(e, t) {
      this.sendTo(
        e,
        $5(H5.hello, { v: 7, arrived: this.arrived, kit: this.kit, ack: t }),
        e$(),
      );
    }
    sendTo(e, t, n) {
      let r = this.via(e, n);
      r
        ? this.net.send(r.id, U5(t[0]), r7(H5.relay, e.hash, t))
        : e.linked && this.net.send(e.id, U5(t[0]), t);
    }
    broadcast(e) {
      let t = e$(),
        n = U5(e[0]);
      this.net.send(null, n, e);
      for (let r of this.peers.values()) {
        let i = this.via(r, t);
        i && this.net.send(i.id, n, r7(H5.relay, r.hash, e));
      }
    }
    via(e, t) {
      return this.reaches(e, t) ? null : this.relayFor(e, t);
    }
    reaches(e, t) {
      return e.linked && t - e.direct < h7;
    }
    relayFor(e, t) {
      let n = null;
      for (let r of this.peers.values())
        r === e ||
          !this.reaches(r, t) ||
          t - r.hearsAt > h7 ||
          !r.hears.has(e.hash) ||
          ((!n || r.id < n.id) && (n = r));
      return n;
    }
    byHash(e) {
      for (let t of this.peers.values()) if (t.hash === e) return t;
    }
    announce() {
      for (let e of this.peers.values()) this.hello(e, !0);
    }
    here(e, t) {
      return e.ok && !e.bye && t - e.heard < d7;
    }
    eligible(e, t) {
      return this.here(e, t) && e.synced && e.arrived !== null;
    }
    check(e, t) {
      let n = this.here(e, t);
      (n &&
        !e.seen &&
        ((e.seen = !0), e.before || this.ctx.hud.notice(e.name, `joined`)),
        e.rider && (e.rider.visible = n));
    }
    elect(e) {
      let t = this.arrived !== null && this.clock.synced ? this.me : ``,
        n = t ? this.arrived : 1 / 0;
      for (let r of this.peers.values())
        this.eligible(r, e) &&
          (r.arrived < n || (r.arrived === n && r.id < t)) &&
          ((t = r.id), (n = r.arrived));
      t !== this.host && ((this.host = t), (this.pingAt = 0));
    }
    references(e) {
      if (this.host === this.me) return [];
      let t = this.peers.get(this.host);
      return t
        ? [t]
        : [...this.peers.values()].filter(
            (t) => t.linked && t.synced && this.here(t, e),
          );
    }
    checkKit() {
      let e = Array(QK.length).fill(0),
        t = !1;
      for (let n of this.peers.values())
        n.kit === null ||
          n.bye ||
          (e[n.kit]++, n.kit === this.kit && this.earlier(n) && (t = !0));
      if (!t) return;
      let n = this.kit;
      for (let t = 1; t < QK.length && e[n] > 0; t++) {
        let r = (this.kit + t) % QK.length;
        e[r] < e[n] && (n = r);
      }
      n !== this.kit &&
        ((this.kit = n),
        this.ctx.onLook(eq(this.me, n, this.name)),
        this.announce());
    }
    earlier(e) {
      return e.arrived === null
        ? !1
        : this.arrived === null ||
            e.arrived < this.arrived ||
            (e.arrived === this.arrived && e.id < this.me);
    }
    farewell(e) {
      e.seen && !e.told && ((e.told = !0), this.ctx.hud.notice(e.name, `left`));
    }
    addPeer(e, t) {
      this.peers.set(e.id, {
        id: e.id,
        name: e.name,
        hash: KF(e.id),
        ok: !1,
        rider: null,
        linked: !1,
        heard: -1 / 0,
        direct: -1 / 0,
        hears: new Set(),
        hearsAt: -1 / 0,
        trickAt: -1 / 0,
        arrived: null,
        kit: null,
        synced: !1,
        bye: !1,
        seen: !1,
        before: t,
        told: !1,
      });
    }
    removePeer(e) {
      (e.rider?.dispose(),
        this.ctx.sound.forget(e.id),
        this.ctx.hud.untag(e.id),
        this.peers.delete(e.id));
    }
    clear() {
      for (let e of this.peers.values()) this.removePeer(e);
    }
    recount(e) {
      let t = 1;
      for (let n of this.peers.values()) this.here(n, e) && t++;
      t !== this.shown && ((this.shown = t), (this.ctx.hud.players = t));
    }
  },
  x7 = 150,
  S7 = 3e3;
