// assets__index-gCVK5XnX 70 — update
// Lines 68899-69248 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
async function Hte() {
  uQ.progress(0.02);
  let e = document.getElementById(`game`),
    t = await m3.create(e),
    n = await E5(t),
    {
      trail: r,
      terrain: i,
      ground: a,
      liftMesh: o,
      trialsMesh: s,
      trees: c,
      grass: l,
      deerMesh: u,
    } = n,
    d = i.trials,
    f = new Gee(),
    p = new Kee(i),
    m = new $ee(i),
    h = new rte();
  t.scene.add(f.mesh, p.mesh, m.tracks, m.shadows, h.mesh);
  let g = new O1(i),
    _ = new Hee(r, (e, t) => i.height(e, t));
  t.scene.add(u.group, _.mesh);
  let v = new Ate(),
    y = new FQ();
  y.capture(e);
  let b = new Cte(r, v),
    x = new Gz(),
    S = new fte(),
    C = new hQ(),
    w = new BQ(f, p, x),
    T = new r$(),
    E = null,
    D = new b7(
      {
        scene: t.scene,
        hud: v,
        sound: x,
        ground: i,
        lift: i.lift,
        canMove: () => O.mode !== `air`,
        onLook: (e) => (E = e),
      },
      T,
    ),
    O = new yU(i, {
      takeoff: () => {
        (x.takeoff(), S.pop());
      },
      land: (e, t) => {
        b.landed(O, t);
        let n = t >= jH.Clean && O.airTime > 0.6;
        (x.land(e, n, !!(O.onBlock[0] || O.onBlock[1])),
          n && O.lastJump > 8 && x.stinger(t === jH.Perfect),
          S.land(e, n, t === jH.Perfect, t === jH.Sketchy),
          C.hold(0.1),
          te.land(e, n),
          w.land(O, e));
      },
      crash: (e) => {
        (b.crashed(e), x.crash(), S.crash(), te.hit(0.9), w.crash(O));
      },
      trick: (e, t) => {
        (b.trick(e, t), D.trick(e, t));
      },
      whip: () => x.whoosh(),
    }),
    ee = new dZ(eq(`rider`), i);
  t.scene.add(ee.group);
  let te = new nQ(t.camera, i),
    ne = new SJ(),
    re = new CJ(49);
  t.scene.add(ne.light, ...re.objects);
  let ie = MX(),
    ae = new WQ(i.lift),
    oe = new a9(i, x, f),
    se = () => {
      (ae.phase !== `off` && v.hideHint(), ae.reset());
    },
    ce = () => {
      (O.state(ie), ee.pose(ie, 0), te.snap(O));
    },
    le = () => {
      ((oe.on = !1), se(), O.place(zI), b.reset(), ce());
    },
    ue = (e) => {
      (ee.dispose(),
        (ee = new dZ(e, i)),
        t.scene.add(ee.group),
        ee.pose(ie, 0));
    };
  (le(),
    await D5(t, n, f, p, [re, u, _]),
    te.snap(O),
    c.update(t.camera),
    l.update(t.camera),
    t.render(0),
    uQ.progress(1),
    uQ.init());
  try {
    D.start(Vte());
  } catch (e) {
    console.warn(`[multiplayer] couldn't start; riding alone`, e);
  }
  ((ae.me = D.me),
    D.me && ue(eq(D.me, void 0, D.name)),
    v.hint(V9.ride),
    addEventListener(`resize`, () => t.resize()));
  let de = !1,
    fe = !1,
    pe = !1,
    me = () =>
      v.fade(() => {
        ((oe.on = !1), se(), O.respawn(), ce(), fe && v.hideHint(), (fe = !1));
      }),
    he = new Ite({
      onChange: (e) => {
        ((y.enabled = !e),
          y.clear(),
          e
            ? document.pointerLockElement && document.exitPointerLock()
            : y.lock());
      },
      toTop: () => v.fade(le),
      toTrail: me,
      toggleSound: () => x.toggleMute(),
      isMuted: () => x.muted,
    });
  document.addEventListener(
    `pointerlockchange`,
    () => !document.pointerLockElement && he.open(),
  );
  let ge = performance.now(),
    _e = new M(),
    ve = new M(),
    ye = new M(),
    be = new M(),
    xe = { x: 0, y: 0, z: 0, t: 0 },
    Se = () => {
      (oe.getOff(O), b.reset(), uQ.presence(`walking`), v.hint(V9.foot, 6));
    },
    Ce = () => {
      let e = () => {
        ((oe.on = !1),
          O.placeAt(O.pos.x, O.pos.z, -Math.sin(O.yaw), -Math.cos(O.yaw), 0),
          ce(),
          v.hideHint(),
          uQ.presence(`top`));
      };
      oe.near(O) ? e() : v.fade(e);
    },
    we = () => {
      let e = y.poll();
      return (
        he.update(y.menuPad(), y.padKind),
        he.isOpen && (e.back = +(O.mode === `ride`)),
        ae.phase === `waiting` && Object.assign(e, AH),
        !de &&
          (e.fwd > 0 || e.steer !== 0 || O.speed > 1.5) &&
          ((de = !0), setTimeout(() => v.hideHint(), zte * 1e3)),
        y.pressed(`KeyR`) && v.fade(le),
        y.pressed(`KeyM`) && x.toggleMute(),
        y.pressed(`KeyE`) &&
          ae.phase === `off` &&
          (oe.on
            ? Ce()
            : O.mode === `ride` && O.speed < 1.5
              ? Se()
              : O.mode === `ride` && !y.padKind && v.hint(V9.tooFast, 2)),
        e
      );
    },
    Te = () => {
      switch (
        (ae.phase !== `off` && y.pressed(`Space`)
          ? v.fade(le)
          : !oe.on &&
            ae.arriving(O) &&
            v.fade(() => {
              (ae.queue(O, T.now(), D.aboard()), ce(), v.hint(V9.queued));
            }),
        ae.update(O, T.now(), D.aboard()))
      ) {
        case `seated`:
          (uQ.presence(`lift`), v.hint(V9.lift));
          break;
        case `moved`:
          ce();
          break;
        case `tower`:
          (x.sheaves(), S.sheaves());
          break;
        case `top`:
          v.fade(le);
      }
    },
    Ee = (e) => {
      (O.offCourse > 5 &&
        !pe &&
        ae.phase === `off` &&
        !oe.on &&
        ((pe = !0), v.hint(V9.lost, 5)),
        O.offCourse === 0 && (pe = !1),
        e && O.modeT > 1.2 && !fe && ((fe = !0), v.hint(V9.down)));
      let t = ee.ragdoll?.p,
        n = !!t && (Math.abs(t[0]) > 1012 || Math.abs(t[2]) > 1012);
      ((e &&
        ((O.modeT > 0.4 && y.pressed(`Space`)) ||
          (O.modeT > 1 && ee.settled) ||
          n)) ||
        O.outOfBounds ||
        y.pressed(`KeyT`)) &&
        me();
    },
    De = (e, t, n) => {
      if (
        (t
          ? ae.sit(O, ie)
          : oe.on
            ? oe.pose(O, ie)
            : (O.state(ie), ae.queued(ie)),
        ee.pose(ie, e),
        ee.rider.head.updateWorldMatrix(!0, !1),
        ne.update(ee.rider.head),
        (O.bodyDriven = !!ee.ragdoll),
        n && ee.ragdoll)
      ) {
        let e = ee.ragdoll.takeHit();
        (x.tumble(e),
          S.tumble(e),
          ee.ragdoll.centre(O.bodyPos),
          O.drawBodyPos.copy(O.bodyPos),
          ee.ragdoll.torso(O.bodyRot));
        let { bodyPos: t, bodyRot: n } = O;
        Object.assign(ie, {
          bx: t.x,
          by: t.y,
          bz: t.z,
          bqx: n.x,
          bqy: n.y,
          bqz: n.z,
          bqw: n.w,
        });
      }
    },
    Oe = (e, t) => {
      (D.poll(),
        E && !t && (ue(E), (E = null)),
        T.frame(e, D.solo),
        D.send(ie, oe.on ? be : O.vel),
        D.update(e));
    },
    ke = (e, t, n) => {
      let r = oe.walker;
      t
        ? te.ride(e, ae.spot, y.look())
        : n
          ? te.walk(e, r.pos, r.yaw, r.speed > 0.3 && n.y > 0.3, y.look(!0))
          : (te.update(e, O), b.update(e, O));
    },
    Ae = (e) => {
      for (let t of d.seesaws) {
        if (t.slam > 0.4) {
          let n = Math.hypot(e.x - t.x, e.y - t.pivotY, e.z - t.z) / Lte,
            r = Y(t.slam / 3) * Y(1 - n);
          (x.slam(r), S.slam(r));
        }
        t.slam = 0;
      }
    },
    je = (e, n, r, a) => {
      let o = C.update(
        e,
        O,
        ie.compF + ie.compR,
        n,
        r,
        ee.ragdoll?.slide ?? 0,
        oe.on ? oe.walker.speed : null,
      );
      (x.update(e, o),
        S.update(e, o, he.isOpen ? null : y.gamepad),
        x.listen(a, t.camera.getWorldDirection(_e)),
        i.creek.nearest(a.x, a.z, xe) < Rte
          ? x.creek(xe, Y((i.creek.flowAt(xe.t) - 2) / 4))
          : x.creek(null, 0));
    },
    Me = (e, n, r, i) => {
      (f.update(e, t.camera),
        re.update(e, D.heads(), t.camera),
        p.update(e),
        (m.shadows.visible = i),
        i &&
          m.update(O, [
            ee.bike.frontWheel.getWorldPosition(ve),
            ee.bike.rearWheel.getWorldPosition(ye),
          ]));
      let a = r ? O.drawBodyPos : oe.on ? oe.walker.pos : O.drawPos;
      return (
        !n && (r || oe.on || O.mode === `ride`) && l.press(a.x, a.z),
        h.update(i ? O.vel : be),
        (t.fringe.value = i ? Y((O.speed - 20) / 10) : 0),
        (t.blur.value = Y((O.speed - 8) / 40, 0, 0.3)),
        a
      );
    },
    Ne = () => {
      let e = performance.now(),
        n = Math.min(0.1, (e - ge) / 1e3);
      ((ge = e), (yW.value += n));
      let r = we();
      Te();
      let i = ae.phase === `seated`,
        f = !i && !oe.on;
      d.weighOthers(D.riders());
      let p = oe.on ? y.walk() : null;
      (p && oe.walk(n, p, te.footHeading), f ? O.update(n, r) : d.idle(n));
      let m = O.mode === `crash`;
      (Ee(m),
        De(n, i, m),
        Oe(n, m),
        g.update(T.now(), i ? null : oe.on ? oe.walker.pos : O.pos, D.riders()),
        u.update([g.doe, g.fawn]),
        _.update(T.now(), n),
        D.together > Bte && uQ.achieve(`TOGETHER`),
        ke(n, i, p),
        o.update(T.now()),
        t.setTime(T.now(), n),
        s.update());
      let h = t.camera.position;
      (Ae(h), je(n, i, m, h), w.update(n, O, f));
      let b = Me(n, i, m, f);
      (a.update(h),
        c.update(t.camera),
        c.setRider(b, h),
        l.update(t.camera),
        D.tags(t.camera, innerWidth, innerHeight),
        v.update(n),
        t.render(n),
        y.endFrame(),
        requestAnimationFrame(Ne));
    };
  (setInterval(() => {
    performance.now() - ge < 500 ||
      (D.poll(), T.frame(0, D.solo), D.send(ie, O.vel));
  }, 250),
    Ne(),
    uQ.presence(`top`));
}
