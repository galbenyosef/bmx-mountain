// assets__index-gCVK5XnX 57 — board
// Lines 65505-65891 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
var o5 = class {
    wood = [];
    bark = [];
    steel = [];
    rubber = [];
    timber = new w6(HF(4242));
    prop(e) {
      let t = new N().makeRotationY(e.yaw).setPosition(e.x, e.y, e.z),
        n = this.timber.r,
        r = (e, n, r) => {
          (e.applyMatrix4(t), n.push(S6(e, r)));
        };
      if (e.kind === `tyres`)
        for (let e = 0; e < 3; e++) {
          let t = new Mo(0.4, 0.14, 10, 28);
          (t.rotateX(Math.PI / 2),
            t.translate(
              (n() - 0.5) * 0.08,
              0.14 + e * 0.28,
              (n() - 0.5) * 0.08,
            ),
            r(t, this.rubber, h6));
        }
      else if (e.kind === `pallets`)
        for (let e = 0; e < 4; e++)
          this.pallet(t, e * QR - 0.01, (n() - 0.5) * 0.12);
      else {
        let t = [];
        for (let e of [0.02, 0.73])
          t.push([
            C6(new fa(0.6, 0.6, 0.045, 28), 1 / 1.2, n() * 5).translate(
              0,
              e,
              0,
            ),
            this.wood,
            this.timber.shade(1.05),
          ]);
        (t.push([
          C6(new fa(0.22, 0.22, 0.7, 16)).translate(0, 0.375, 0),
          this.wood,
          this.timber.shade(),
        ]),
          t.push([
            new fa(0.34, 0.34, 0.5, 20).translate(0, 0.375, 0),
            this.rubber,
            h6,
          ]));
        for (let [n, i, a] of t)
          (e.kind === `spoolSide` &&
            n
              .applyMatrix4(new N().makeRotationX(Math.PI / 2))
              .translate(0, 0.6, 0.375),
            r(n, i, a));
      }
    }
    pallet(e, t, n) {
      let r = new N().multiplyMatrices(
          e,
          t5.compose(rH(0, t, 0), n5.setFromAxisAngle(GV, n), qV),
        ),
        i = 0.95 + this.timber.r() * 0.15,
        a = (e, t, n, a, o, s, c, l, u = i) =>
          this.wood.push(
            this.timber.board(
              r,
              new M(e, t, n),
              new M(a, o, s),
              c,
              l,
              this.timber.shade(u),
            ),
          ),
        o = QR - 0.011;
      for (let e = 0; e < 7; e++) {
        let t = -0.45 + e * 0.15;
        a(t, o, 0.6, t, o, -0.6, 0.1, 0.022);
      }
      for (let e of [-0.55, 0, 0.55])
        a(-0.5, QR - 0.033, e, 0.5, QR - 0.033, e, 0.1, 0.022);
      for (let e of [-0.45, 0, 0.45])
        for (let t of [-0.55, 0, 0.55])
          a(e, 0.022, t, e, 0.1, t, 0.1, 0.1, i * 0.92);
      for (let e of [-0.45, 0, 0.45])
        a(e, 0.011, 0.6, e, 0.011, -0.6, 0.1, 0.022);
    }
  },
  s5 = class {
    st;
    ground;
    out;
    f;
    constructor(e, t, n) {
      ((this.st = e),
        (this.ground = t),
        (this.out = n),
        (this.f = nH(e.x, e.z, e.ax, e.az, e.tilt)));
    }
    g(e, t) {
      let n = this.st;
      return (
        this.ground(n.x + n.ax * e - n.az * t, n.z + n.az * e + n.ax * t) -
        t * n.tilt
      );
    }
    span(e) {
      let t = this.st,
        n = (e.x - t.x) * t.ax + (e.z - t.z) * t.az;
      return {
        a0: n - e.half,
        a1: n + e.half,
        y0: WR(e, -e.half, 0),
        y1: WR(e, e.half, 0),
      };
    }
    board(e, t, n, r, i) {
      this.out.wood.push(this.out.timber.board(this.f, e, t, n, r, i));
    }
    shade(e) {
      return this.out.timber.shade(e);
    }
    lengthwise(e, t, n = 0.04) {
      let r = this.span(e),
        i = (2 * e.w) / t;
      for (let a = 0; a < t; a++) {
        let t = -e.w + i * (a + 0.5);
        this.board(
          rH(r.a0, r.y0 - n / 2, t),
          rH(r.a1, r.y1 - n / 2, t),
          i - 0.012,
          n,
        );
      }
    }
    ladder(e, t) {
      let n = this.span(e),
        r = (n.y1 - n.y0) / (n.a1 - n.a0);
      for (let r of [-1, 1]) {
        let i = r * (e.w - t / 2);
        this.board(
          rH(n.a0, n.y0 - 0.03 - 0.09, i),
          rH(n.a1, n.y1 - 0.03 - 0.09, i),
          t,
          0.18,
        );
      }
      for (let t = n.a0 + 0.06; t < n.a1 - 0.03; t += 0.13) {
        let i = n.y0 + (t - n.a0) * r - 0.014;
        this.board(rH(t, i, -e.w), rH(t, i, e.w), 0.095, 0.028);
      }
    }
    posts(e, t, n, r) {
      let i = this.span(e),
        a = Math.max(1, Math.round((i.a1 - i.a0) / t));
      for (let t = 0; t <= a; t++) {
        let o = i.a0 + 0.15 + ((i.a1 - i.a0 - 0.3) * t) / a,
          s = i.y0 + ((i.y1 - i.y0) * (o - i.a0)) / (i.a1 - i.a0) - r;
        for (let t of n ? [-e.w + 0.05, e.w - 0.05] : [0]) {
          let e = this.g(o, t) - 0.2;
          s - e < 0.25 ||
            this.board(rH(o, e, t), rH(o, s, t), 0.09, 0.09, this.shade(0.85));
        }
        if (n && s - this.g(o, 0) > 0.45)
          this.board(
            rH(o, this.g(o, -e.w) + 0.08, -e.w + 0.05),
            rH(o, s - 0.05, e.w - 0.05),
            0.09,
            0.04,
            this.shade(0.85),
          );
        else if (!n && s - this.g(o, 0) > 0.3)
          for (let e of [-1, 1])
            this.board(
              rH(o, this.g(o, e * 0.35) - 0.05, e * 0.35),
              rH(o, s - 0.06, e * 0.03),
              0.07,
              0.04,
              this.shade(0.85),
            );
      }
    }
    skinny() {
      for (let e of this.st.blocks) {
        let t = this.span(e),
          n = Math.abs(t.y1 - t.y0) < 0.05 && t.y0 - this.g(t.a0, 0) > 0.2;
        (this.lengthwise(e, b6(2 * e.w)),
          this.board(
            rH(t.a0, t.y0 - 0.04 - 0.07, 0),
            rH(t.a1, t.y1 - 0.04 - 0.07, 0),
            0.09,
            0.14,
            this.shade(0.85),
          ),
          n && this.posts(e, 1.4, !1, 0.18));
      }
    }
    bridge() {
      for (let e of this.st.blocks) {
        this.ladder(e, 0.05);
        let t = this.span(e);
        Math.max(t.y0 - this.g(t.a0, 0), t.y1 - this.g(t.a1, 0)) > 0.35 &&
          this.posts(e, 1.6, !0, 0.21);
      }
    }
    logride() {
      let e = this.st.blocks;
      for (let t of e.slice(0, -1)) this.ladder(t, 0.05);
      let t = e[e.length - 1],
        n = this.span(t),
        r = t.log,
        i = rH(n.a0, n.y0 - r, 0),
        a = rH(n.a1, n.y1 - r, 0),
        o = i.distanceTo(a),
        s = new fa(r * 0.94, r, o, 22, 1, !0);
      (a5(s, (DF * r) / 1.1, o / 1.6),
        s.applyMatrix4(
          t5.compose(
            r5.addVectors(i, a).multiplyScalar(0.5),
            n5.setFromUnitVectors(GV, i5.subVectors(a, i).normalize()),
            qV,
          ),
        ),
        s.applyMatrix4(this.f),
        this.out.bark.push(S6(s, new Yn(0.95, 0.92, 0.88))));
      for (let [e, t, n] of [
        [i, r, -1],
        [a, r * 0.94, 1],
      ]) {
        let r = C6(new da(t, 22), 1 / 0.9, this.out.timber.r() * 5);
        (r.applyMatrix4(
          t5.compose(
            e,
            n5.setFromUnitVectors(
              new M(0, 0, 1),
              i5.subVectors(a, i).normalize().multiplyScalar(n),
            ),
            qV,
          ),
        ),
          r.applyMatrix4(this.f),
          this.out.wood.push(S6(r, new Yn(1.15, 0.98, 0.78))));
      }
      for (let e of [n.a0 + 0.4, n.a1 - 0.4])
        for (let t of [-1, 1]) {
          let n = t * (r + 0.05);
          this.board(
            rH(e, this.g(e, n) - 0.25, n),
            rH(e, this.g(e, n) + r * 0.9, t * (r + 0.08)),
            0.06,
            0.06,
            this.shade(0.8),
          );
        }
    }
    seesaw(e) {
      let t = this.st.blocks;
      this.lengthwise(t[0], b6(2 * t[0].w), 0.03);
      let n = t[1],
        r = n.seesaw,
        i = this.span(n),
        a = (i.a0 + i.a1) / 2,
        o = this.g(a, 0),
        s = r.pivotY - RR - 0.05;
      for (let e of [-1, 1]) {
        let t = e * (n.w + 0.07);
        for (let e of [-0.55, 0.55])
          this.board(
            rH(a + e, o - 0.15, t),
            rH(a + e * 0.12, s + 0.04, t),
            0.09,
            0.07,
            this.shade(0.85),
          );
        this.board(
          rH(a - 0.62, o + 0.12, t),
          rH(a + 0.62, o + 0.12, t),
          0.09,
          0.05,
          this.shade(0.85),
        );
      }
      let c = new fa(0.035, 0.035, 2 * n.w + 0.3, 12);
      (c.applyMatrix4(
        t5.compose(rH(a, s, 0), n5.setFromUnitVectors(GV, new M(1, 0, 0)), qV),
      ),
        c.applyMatrix4(this.f),
        this.out.steel.push(S6(c, h6)));
      let l = [],
        u = this.out.timber,
        d = new N(),
        f = r.half,
        p = b6(2 * n.w);
      for (let e = 0; e < p; e++) {
        let t = -n.w + ((2 * n.w) / p) * (e + 0.5);
        l.push(
          u.board(
            d,
            new M(t, -RR / 2, f),
            new M(t, -RR / 2, -f),
            (2 * n.w) / p - 0.012,
            RR,
          ),
        );
      }
      for (let e = -f + 0.25; e < f - 0.1; e += 0.42)
        l.push(
          u.board(
            d,
            new M(-n.w, 0.008, e),
            new M(n.w, 0.008, e),
            0.035,
            0.018,
            u.shade(0.8),
          ),
        );
      l.push(
        u.board(
          d,
          new M(-n.w, -RR - 0.03, 0),
          new M(n.w, -RR - 0.03, 0),
          0.12,
          0.06,
          u.shade(0.85),
        ),
      );
      let m = new Hn();
      return (m.add(eH(tH(l, x6), e)), m.position.set(n.x, r.pivotY, n.z), m);
    }
  },
  c5 = class {
    group = new Hn();
    planks = [];
    constructor(e, t) {
      let n = {
          wood: m6(`wood_rough`, FV(), 0.88),
          bark: m6(`bark_pine`, FV().mul(LV(1, 0.5)), 0.92),
          steel: hH(pH.steel),
          rubber: hH(pH.rubber),
        },
        r = new o5();
      for (let i of e.stunts) {
        let e = new s5(i, t, r);
        if (i.kind !== `seesaw`) e[i.kind]();
        else {
          let t = e.seesaw(n.wood);
          (this.planks.push({
            pivot: t,
            s: i.blocks[1].seesaw,
            ax: i.ax,
            az: i.az,
            tilt: i.tilt,
          }),
            this.group.add(t));
        }
      }
      for (let t of e.props) r.prop(t);
      for (let [e, t] of [
        [r.wood, n.wood],
        [r.bark, n.bark],
        [r.steel, n.steel],
        [r.rubber, n.rubber],
      ])
        e.length && this.group.add(eH(tH(e, x6), t));
      this.update();
    }
    update() {
      for (let e of this.planks)
        e.pivot.rotation.set(
          e.s.angle,
          Math.atan2(e.ax, e.az),
          -Math.atan(e.tilt),
          `YXZ`,
        );
    }
  },
  l5 = SI + 0.7,
  u5 = 3.5,
  d5 = 10,
  f5 = [0.3, 0.8],
  p5 = [1, 3],
  m5 = [5.5, 8],
  h5 = 6,
  g5 = 10,
  _5 = 15,
  v5 = { stunt: 6, creek: 4, tower: 3 },
  y5 = RI + 20,
  b5 = { x: 0, z: 0, tx: 0, tz: 0 };
