// assets/index-gCVK5XnX 53 — lodge_half
// Lines 64329-64783 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var R6 = (e) => uR + fR - Math.abs(e) * E6,
  z6 = class {
    wood = [];
    stone = [];
    steel = [];
    glass = [];
    t = new w6(makeRng(777));
    f;
    y0;
    land;
    constructor(e, t) {
      let n = _R(e);
      ((this.f = nH(n.x, n.z, n.ax, n.az)),
        (this.y0 = n.ground),
        (this.land = (e, r) =>
          t(n.x + n.ax * e + n.cx * r, n.z + n.az * e + n.cz * r) - n.ground));
    }
    at(e, t, n) {
      return trailToWorld(e, this.y0 + t, n);
    }
    board(e, t, n, r, i, a, o, s, c) {
      this.wood.push(
        this.t.board(this.f, this.at(e, t, n), this.at(r, i, a), o, s, c),
      );
    }
    box(e, t, n, r, i, a, o, s = h6) {
      let c = C6(new la(Math.abs(o - r), Math.abs(a - n), Math.abs(i - t)));
      (c.translate((r + o) / 2, this.y0 + (n + a) / 2, -(t + i) / 2),
        e.push(S6(c.applyMatrix4(this.f), s)));
    }
    stained(e = 1) {
      return this.t.shade(e).multiply(A6);
    }
    trim() {
      return this.t.shade(1).multiply(j6);
    }
    foundation() {
      let e = 0;
      for (let t = -LODGE_HALF; t <= LODGE_HALF; t += 1)
        for (let n = 0; n <= 12; n += 1) e = Math.min(e, this.land(t, n));
      (this.box(this.stone, -LODGE_HALF - 0.06, e - 0.5, -0.06, LODGE_HALF + 0.06, uR, 12.06),
        this.box(
          this.stone,
          -LODGE_HALF,
          Math.min(this.land(-LODGE_HALF, -pR), this.land(LODGE_HALF, -pR), 0) - 0.4,
          -pR,
          LODGE_HALF + 3,
          uR - 0.06,
          0,
        ),
        this.box(this.stone, -1.2, -0.3, -pR - Iee, 1.2, uR / 2, -pR));
    }
    walls() {
      let e = (e, t, n, r, i) =>
        this.board(e, t, n, r, t, i, 0.3, 0.285, this.stained());
      for (let t = uR; t < uR + dR - 0.01; t += O6) {
        let n = t + O6 / 2;
        for (let t of [-1, 1])
          e(t * (LODGE_HALF - 0.15), n, -0.3, t * (LODGE_HALF - 0.15), 12.3);
        for (let t of [0.15, 11.85]) e(-LODGE_HALF - 0.3, n, t, LODGE_HALF + 0.3, t);
      }
      for (let t = uR + dR; t < uR + fR - 0.3; t += O6) {
        let n = (uR + fR - t - O6) / E6;
        if (n < 0.2) break;
        for (let r of [0.15, 11.85]) e(-n, t + O6 / 2, r, n, r);
      }
    }
    roof() {
      let e = -pR - 0.3,
        t = 12 + D6,
        n = LODGE_HALF + D6,
        r = uR + fR + 0.1,
        i = r - n * E6;
      for (let a of [-1, 1]) {
        let o = (e + t) / 2;
        this.steel.push(
          this.t.board(
            this.f,
            this.at(0, r, o),
            this.at(a * n, i, o),
            t - e,
            0.2,
            h6,
          ),
        );
        for (let i of [e, t])
          this.board(
            0,
            r - 0.05,
            i,
            a * n,
            r - 0.05 - n * E6,
            i,
            0.05,
            0.3,
            this.trim(),
          );
        this.board(
          a * n,
          i - 0.06,
          e,
          a * n,
          i - 0.06,
          t,
          0.06,
          0.26,
          this.trim(),
        );
      }
      (this.board(0, r + 0.16, e, 0, r + 0.16, t, 0.32, 0.12, this.trim()),
        this.box(this.stone, 1, R6(2.2) - 0.4, 8.8, 2.2, uR + fR + 1.3, 10),
        this.box(
          this.stone,
          0.9,
          uR + fR + 1.3,
          8.7,
          2.3,
          uR + fR + 1.45,
          10.1,
        ));
    }
    windows() {
      for (let e of [-1, 1])
        for (let t of [2.4, 6, 9.6])
          this.window(
            `a`,
            e * LODGE_HALF,
            e,
            t - 0.65,
            t + 0.65,
            uR + k6,
            uR + k6 + 1.5,
          );
      (this.window(`c`, 12, 1, -5.2, 5.2, uR + 0.45, uR + 3, 6),
        this.window(`c`, 12, 1, -2.4, 2.4, uR + dR + 0.4, uR + dR + 2.6, 3));
      for (let e of [-1, 1])
        this.window(
          `c`,
          0,
          -1,
          e * 4 - 0.7,
          e * 4 + 0.7,
          uR + k6,
          uR + k6 + 1.5,
        );
      (this.window(`c`, 0, -1, -0.9, 0.9, uR + dR + 0.9, uR + dR + 2.2, 1),
        this.window(`c`, 0, -1, -0.85, 0.85, uR + 1.15, uR + 2.15, 1),
        this.box(
          this.wood,
          -0.85,
          uR,
          -0.07,
          0.85,
          uR + 1.15,
          -0.01,
          this.trim(),
        ));
    }
    window(e, t, n, r, i, a, o, s = 1) {
      let c = t + n * 0.01,
        l = (t, r, i = 0) =>
          e === `a` ? this.at(c + n * i, r, t) : this.at(t, r, c + n * i),
        u = new la(1, 1, 0.01),
        d = u.getAttribute(`uv`),
        f = u.getAttribute(`position`);
      for (let e = 0; e < d.count; e++)
        d.setXY(e, f.getX(e) + 0.5, f.getY(e) + 0.5);
      let p = l((r + i) / 2, (a + o) / 2),
        m = l(i, (a + o) / 2)
          .sub(p)
          .multiplyScalar(2);
      (u.scale(m.length(), o - a, 1),
        u.lookAt(e === `a` ? new M(0, 0, -n) : new M(n, 0, 0)),
        u.translate(p.x, p.y, p.z),
        this.glass.push(S6(u.applyMatrix4(this.f), h6)));
      let h = (e, t, n, r, i) =>
        this.wood.push(
          this.t.board(
            this.f,
            l(e, t, 0.04),
            l(n, r, 0.04),
            i,
            0.09,
            this.trim(),
          ),
        );
      (h(r - 0.08, a - 0.04, i + 0.08, a - 0.04, 0.16),
        h(r - 0.08, o + 0.04, i + 0.08, o + 0.04, 0.12),
        h(r - 0.04, a, r - 0.04, o, 0.1),
        h(i + 0.04, a, i + 0.04, o, 0.1));
      for (let e = 1; e < s + 1; e++) {
        let t = r + ((i - r) * e) / (s + 1);
        h(t, a, t, o, 0.06);
      }
      o - a > 1.2 && h(r, (a + o) / 2 + 0.25, i, (a + o) / 2 + 0.25, 0.05);
    }
    sign() {
      let e = addMesh(new la(5, 0.62, 0.08), L6(`BMX MOUNTAIN`, 1024));
      (e.position.copy(this.at(0, uR + 2.75, -0.42).applyMatrix4(this.f)),
        e.lookAt(this.at(0, uR + 2.75, -5).applyMatrix4(this.f)));
      for (let e of [-1, 1])
        this.box(
          this.glass,
          e * 1.35 - 0.11,
          uR + 2,
          -0.55,
          e * 1.35 + 0.11,
          uR + 2.32,
          -0.33,
        );
      return e;
    }
    porch() {
      for (let e = -pR + 0.1; e < 0; e += 0.2)
        this.board(
          -LODGE_HALF,
          uR - 0.03,
          e,
          LODGE_HALF + 3,
          uR - 0.03,
          e,
          0.18,
          0.05,
          this.stained(0.9),
        );
      for (let e of [-LODGE_HALF + 0.35, -2.2, 2.2, LODGE_HALF - 0.35])
        this.board(
          e,
          uR,
          -pR + 0.18,
          e,
          R6(e) - 0.12,
          -pR + 0.18,
          0.2,
          0.2,
          this.stained(0.8),
        );
      for (let e = -pR + 0.1; e < -0.4; e += 0.2)
        this.board(
          -LODGE_HALF - Fee,
          0.03,
          e,
          -LODGE_HALF,
          uR - 0.03,
          e,
          0.18,
          0.05,
          this.stained(0.85),
        );
    }
    deck() {
      let e = [
        [LODGE_HALF, LODGE_HALF + 3, 0, 15],
        [-LODGE_HALF - 3, LODGE_HALF, 12, 15],
        [-LODGE_HALF - 3, -LODGE_HALF, 0, 12],
      ];
      for (let [t, n, r, i] of e)
        if (n - t > i - r)
          for (let e = r + 0.1; e < i; e += 0.2)
            this.board(
              t,
              uR - 0.03,
              e,
              n,
              uR - 0.03,
              e,
              0.18,
              0.05,
              this.stained(0.9),
            );
        else
          for (let e = t + 0.1; e < n; e += 0.2)
            this.board(
              e,
              uR - 0.03,
              r,
              e,
              uR - 0.03,
              i,
              0.18,
              0.05,
              this.stained(0.9),
            );
      let t = [
        [LODGE_HALF + 3, -0.1, LODGE_HALF + 3, 15],
        [LODGE_HALF + 3, 15, -LODGE_HALF - 3, 15],
        [-LODGE_HALF - 3, 15, -LODGE_HALF - 3, 0],
      ];
      for (let [e, n, r, i] of t) {
        this.board(
          e,
          uR - 0.2,
          n,
          r,
          uR - 0.2,
          i,
          0.12,
          0.3,
          this.stained(0.75),
        );
        let t = Math.max(1, Math.round(Math.hypot(r - e, i - n) / 1.6));
        for (let a = 0; a <= t; a++) {
          let o = e + ((r - e) * a) / t,
            s = n + ((i - n) * a) / t,
            c = this.land(o, s);
          (a % 2 == 0 &&
            0.45 - 0.35 - c > 0.3 &&
            this.board(
              o,
              c - 0.3,
              s,
              o,
              uR - 0.35,
              s,
              0.3,
              0.3,
              this.stained(0.7),
            ),
            this.board(o, uR, s, o, uR + mR, s, 0.09, 0.09, this.stained(0.8)));
        }
        (this.board(
          e,
          uR + mR - 0.03,
          n,
          r,
          uR + mR - 0.03,
          i,
          0.14,
          0.05,
          this.stained(0.85),
        ),
          this.board(
            e,
            uR + 0.08,
            n,
            r,
            uR + 0.08,
            i,
            0.07,
            0.05,
            this.stained(0.85),
          ));
        let a = Math.round(Math.hypot(r - e, i - n) / 0.16);
        for (let t = 1; t < a; t++) {
          let o = e + ((r - e) * t) / a,
            s = n + ((i - n) * t) / a;
          this.board(
            o,
            uR + 0.1,
            s,
            o,
            uR + mR - 0.06,
            s,
            0.035,
            0.035,
            this.stained(0.85),
          );
        }
      }
    }
    tables() {
      let e = 13.5;
      for (let t of [-4, 2]) {
        for (let n of [-1, 1]) {
          this.board(
            t - 0.9,
            uR + 0.45,
            e + n * 0.62,
            t + 0.9,
            uR + 0.45,
            e + n * 0.62,
            0.3,
            0.04,
            this.stained(1.05),
          );
          for (let r of [-0.7, 0.7])
            this.board(
              t + r,
              uR,
              e + n * 0.32,
              t + r,
              uR + 0.74,
              e + n * 0.32,
              0.07,
              0.07,
              this.stained(0.9),
            );
        }
        for (let n = -1; n <= 1; n++)
          this.board(
            t - 0.95,
            uR + 0.76,
            e + n * 0.16,
            t + 0.95,
            uR + 0.76,
            e + n * 0.16,
            0.15,
            0.04,
            this.stained(1.05),
          );
      }
    }
    gate(e) {
      let t = kR(e),
        n = nH(t.x, t.z, t.ax, t.az),
        r = t.ground + OR;
      for (let e of [-1, 1])
        this.wood.push(
          this.t.board(
            n,
            trailToWorld(0, t.ground - 0.6, e * ER),
            trailToWorld(0, r, e * ER),
            DR,
            DR,
            this.trim(),
          ),
        );
      this.wood.push(
        this.t.board(
          n,
          trailToWorld(0, r - 0.15, -ER - 0.35),
          trailToWorld(0, r - 0.15, ER + 0.35),
          0.26,
          0.3,
          this.trim(),
        ),
      );
      let i = addMesh(new la(2 * ER - 0.5, 0.62, 0.06), L6(`START`, 640));
      return (
        i.position.copy(trailToWorld(0, r - 0.75, 0).applyMatrix4(n)),
        i.lookAt(trailToWorld(-5, r - 0.75, 0).applyMatrix4(n)),
        i
      );
    }
  },
  B6 = class {
    group = new Hn();
    constructor(e, t) {
      let n = new z6(e, t);
      (n.foundation(), n.walls(), n.roof(), n.windows());
      let r = n.sign();
      (n.porch(), n.deck(), n.tables(), this.group.add(n.gate(e)));
      let i = [
        [n.wood, m6(`wood_rough`, tslUv(), 0.86), !0],
        [n.stone, P6(), !0],
        [n.steel, F6(), !0],
        [n.glass, I6(), !1],
      ];
      for (let [e, t, n] of i) this.group.add(addMesh(mergeGeometry(e, x6), t, n));
      this.group.add(r);
    }
  },
  V6 = 64,
  H6 = new $i(),
  U6 = new Hr();
