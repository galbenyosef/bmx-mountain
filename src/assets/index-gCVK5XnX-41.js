// assets/index-gCVK5XnX 41 — options
// Lines 60265-60767 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var $0 = class {
    m_w = 123456789;
    m_z = 987654321;
    mask = 4294967295;
    constructor(e) {
      ((this.m_w = (123456789 + e) & this.mask),
        (this.m_z = (987654321 - e) & this.mask));
    }
    random(e = 1, t = 0) {
      ((this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & this.mask),
        (this.m_w =
          (18e3 * (this.m_w & 65535) + (this.m_w >> 16)) & this.mask));
      let n = ((this.m_z << 16) + (this.m_w & 65535)) >>> 0;
      return ((n /= 4294967296), (e - t) * n + t);
    }
  },
  e2 = class {
    constructor(e = new M(), t = new Tn(), n = 0, r = 0, i = 0, a = 0, o = 0) {
      ((this.origin = e.clone()),
        (this.orientation = t.clone()),
        (this.length = n),
        (this.radius = r),
        (this.level = i),
        (this.sectionCount = a),
        (this.segmentCount = o));
    }
  },
  t2 = { Birch: `birch`, Oak: `oak`, Pine: `pine`, Willow: `willow` },
  n2 = { Single: `single`, Double: `double` },
  r2 = { Ash: `ash`, Aspen: `aspen`, Pine: `pine`, Oak: `oak` },
  i2 = { Deciduous: `deciduous`, Evergreen: `evergreen` },
  a2 = class {
    constructor() {
      ((this.seed = 0),
        (this.type = i2.Deciduous),
        (this.bark = {
          type: t2.Oak,
          tint: 16777215,
          flatShading: !1,
          textured: !0,
          textureScale: { x: 1, y: 1 },
        }),
        (this.branch = {
          levels: 3,
          angle: { 1: 70, 2: 60, 3: 60 },
          children: { 0: 7, 1: 7, 2: 5 },
          force: { direction: { x: 0, y: 1, z: 0 }, strength: 0.01 },
          gnarliness: { 0: 0.15, 1: 0.2, 2: 0.3, 3: 0.02 },
          length: { 0: 20, 1: 20, 2: 10, 3: 1 },
          radius: { 0: 1.5, 1: 0.7, 2: 0.7, 3: 0.7 },
          sections: { 0: 12, 1: 10, 2: 8, 3: 6 },
          segments: { 0: 8, 1: 6, 2: 4, 3: 3 },
          start: { 1: 0.4, 2: 0.3, 3: 0.3 },
          taper: { 0: 0.7, 1: 0.7, 2: 0.7, 3: 0.7 },
          twist: { 0: 0, 1: 0, 2: 0, 3: 0 },
        }),
        (this.leaves = {
          type: r2.Oak,
          billboard: n2.Double,
          angle: 10,
          count: 1,
          start: 0,
          size: 2.5,
          sizeVariance: 0.7,
          tint: 16777215,
          alphaTest: 0.5,
        }),
        (this.trellis = {
          enabled: !1,
          position: { x: 0, y: 0, z: -2 },
          width: 10,
          height: 20,
          spacing: 2,
          force: { strength: 0.02, maxDistance: 3, falloff: 1 },
          cylinderRadius: 0.05,
          visible: !0,
          color: 9127187,
        }));
    }
    copy(e, t = this) {
      for (let n in e)
        e.hasOwnProperty(n) &&
          t.hasOwnProperty(n) &&
          (typeof e[n] == `object` && e[n] !== null
            ? this.copy(e[n], t[n])
            : (t[n] = e[n]));
    }
  },
  o2 = class {
    rng;
    options;
    branchQueue = [];
    constructor(e = new a2()) {
      ((this.options = e),
        (this.branchGeometry = null),
        (this.leafGeometry = null));
    }
    loadFromJson(e) {
      (this.options.copy(e), this.generate());
    }
    generate() {
      for (
        this.branches = {
          verts: [],
          normals: [],
          indices: [],
          uvs: [],
          windFactor: [],
        },
          this.leaves = { verts: [], normals: [], indices: [], uvs: [] },
          this.rng = new $0(this.options.seed),
          this.branchQueue.push(
            new e2(
              new M(),
              new Tn(),
              this.options.branch.length[0],
              this.options.branch.radius[0],
              0,
              this.options.branch.sections[0],
              this.options.branch.segments[0],
            ),
          );
        this.branchQueue.length > 0;
      ) {
        let e = this.branchQueue.shift();
        this.generateBranch(e);
      }
      (this.createBranchesGeometry(), this.createLeavesGeometry());
    }
    generateBranch(e) {
      let t = this.branches.verts.length / 3,
        n = e.orientation.clone(),
        r = e.origin.clone(),
        i =
          e.length /
          e.sectionCount /
          (this.options.type === `Deciduous`
            ? this.options.branch.levels - 1
            : 1),
        a = [];
      for (let t = 0; t <= e.sectionCount; t++) {
        let o = e.radius;
        t === e.sectionCount && e.level === this.options.branch.levels
          ? (o = 0.001)
          : this.options.type === i2.Deciduous
            ? (o *=
                1 - this.options.branch.taper[e.level] * (t / e.sectionCount))
            : this.options.type === i2.Evergreen &&
              (o *= 1 - t / e.sectionCount);
        let s;
        for (let i = 0; i < e.segmentCount; i++) {
          let a = (2 * Math.PI * i) / e.segmentCount,
            c = new M(Math.cos(a), 0, Math.sin(a))
              .multiplyScalar(o)
              .applyEuler(n)
              .add(r),
            l = new M(Math.cos(a), 0, Math.sin(a)).applyEuler(n).normalize(),
            u = new j(i / e.segmentCount, t % 2 == 0 ? 0 : 1);
          (this.branches.verts.push(...Object.values(c)),
            this.branches.normals.push(...Object.values(l)),
            this.branches.uvs.push(...Object.values(u)),
            i === 0 && (s = { vertex: c, normal: l, uv: u }));
        }
        (this.branches.verts.push(...Object.values(s.vertex)),
          this.branches.normals.push(...Object.values(s.normal)),
          this.branches.uvs.push(1, s.uv.y),
          a.push({ origin: r.clone(), orientation: n.clone(), radius: o }),
          r.add(new M(0, i, 0).applyEuler(n)));
        let c =
          Math.max(1, 1 / Math.sqrt(o)) *
          this.options.branch.gnarliness[e.level];
        ((n.x += this.rng.random(c, -c)), (n.z += this.rng.random(c, -c)));
        let l = new qt().setFromEuler(n),
          u = new qt().setFromAxisAngle(
            new M(0, 1, 0),
            this.options.branch.twist[e.level],
          ),
          d = new qt().setFromUnitVectors(
            new M(0, 1, 0),
            new M().copy(this.options.branch.force.direction),
          );
        (l.multiply(u),
          l.rotateTowards(d, this.options.branch.force.strength / o),
          n.setFromQuaternion(l));
      }
      if (
        (this.generateBranchIndices(t, e), this.options.type === `deciduous`)
      ) {
        let t = a[a.length - 1];
        e.level < this.options.branch.levels
          ? this.branchQueue.push(
              new e2(
                t.origin,
                t.orientation,
                this.options.branch.length[e.level + 1],
                t.radius,
                e.level + 1,
                e.sectionCount,
                e.segmentCount,
              ),
            )
          : this.generateLeaf(t.origin, t.orientation);
      }
      e.level === this.options.branch.levels
        ? this.generateLeaves(a)
        : e.level < this.options.branch.levels &&
          this.generateChildBranches(
            this.options.branch.children[e.level],
            e.level + 1,
            a,
          );
    }
    generateChildBranches(e, t, n) {
      let r = this.rng.random();
      for (let i = 0; i < e; i++) {
        let a = this.rng.random(1, this.options.branch.start[t]),
          o = Math.floor(a * (n.length - 1)),
          s,
          c;
        ((s = n[o]), (c = o === n.length - 1 ? s : n[o + 1]));
        let l = (a - o / (n.length - 1)) / (1 / (n.length - 1)),
          u = new M().lerpVectors(s.origin, c.origin, l),
          d =
            this.options.branch.radius[t] * ((1 - l) * s.radius + l * c.radius),
          f = new qt().setFromEuler(s.orientation),
          p = new qt().setFromEuler(c.orientation),
          m = new Tn().setFromQuaternion(p.slerp(f, l)),
          h = 2 * Math.PI * (r + i / e),
          g = new qt().setFromAxisAngle(
            new M(1, 0, 0),
            this.options.branch.angle[t] / (180 / Math.PI),
          ),
          _ = new qt().setFromAxisAngle(new M(0, 1, 0), h),
          v = new qt().setFromEuler(m),
          y = new Tn().setFromQuaternion(v.multiply(_.multiply(g))),
          b =
            this.options.branch.length[t] *
            (this.options.type === i2.Evergreen ? 1 - a : 1);
        this.branchQueue.push(
          new e2(
            u,
            y,
            b,
            d,
            t,
            this.options.branch.sections[t],
            this.options.branch.segments[t],
          ),
        );
      }
    }
    generateLeaves(e) {
      let t = this.rng.random();
      for (let n = 0; n < this.options.leaves.count; n++) {
        let r = this.rng.random(1, this.options.leaves.start),
          i = Math.floor(r * (e.length - 1)),
          a,
          o;
        ((a = e[i]), (o = i === e.length - 1 ? a : e[i + 1]));
        let s = (r - i / (e.length - 1)) / (1 / (e.length - 1)),
          c = new M().lerpVectors(a.origin, o.origin, s),
          l = new qt().setFromEuler(a.orientation),
          u = new qt().setFromEuler(o.orientation),
          d = new Tn().setFromQuaternion(u.slerp(l, s)),
          f = 2 * Math.PI * (t + n / this.options.leaves.count),
          p = new qt().setFromAxisAngle(
            new M(1, 0, 0),
            this.options.leaves.angle / (180 / Math.PI),
          ),
          m = new qt().setFromAxisAngle(new M(0, 1, 0), f),
          h = new qt().setFromEuler(d),
          g = new Tn().setFromQuaternion(h.multiply(m.multiply(p)));
        this.generateLeaf(c, g);
      }
    }
    generateLeaf(e, t) {
      let n = this.leaves.verts.length / 3,
        r =
          this.options.leaves.size *
          (1 +
            this.rng.random(
              this.options.leaves.sizeVariance,
              -this.options.leaves.sizeVariance,
            )),
        i = r,
        a = r,
        o = (r) => {
          let o = [
            new M(-i / 2, a, 0),
            new M(-i / 2, 0, 0),
            new M(i / 2, 0, 0),
            new M(i / 2, a, 0),
          ].map((n) =>
            n
              .applyEuler(new Tn(0, r, 0))
              .applyEuler(t)
              .add(e),
          );
          this.leaves.verts.push(
            o[0].x,
            o[0].y,
            o[0].z,
            o[1].x,
            o[1].y,
            o[1].z,
            o[2].x,
            o[2].y,
            o[2].z,
            o[3].x,
            o[3].y,
            o[3].z,
          );
          let s = new M(0, 0, 1).applyEuler(t);
          (this.leaves.normals.push(
            s.x,
            s.y,
            s.z,
            s.x,
            s.y,
            s.z,
            s.x,
            s.y,
            s.z,
            s.x,
            s.y,
            s.z,
          ),
            this.leaves.uvs.push(0, 1, 0, 0, 1, 0, 1, 1),
            this.leaves.indices.push(n, n + 1, n + 2, n, n + 2, n + 3),
            (n += 4));
        };
      (o(0), this.options.leaves.billboard === n2.Double && o(Math.PI / 2));
    }
    generateBranchIndices(e, t) {
      let n,
        r,
        i,
        a,
        o = t.segmentCount + 1;
      for (let s = 0; s < t.sectionCount; s++)
        for (let c = 0; c < t.segmentCount; c++)
          ((n = e + s * o + c),
            (r = e + s * o + (c + 1)),
            (i = n + o),
            (a = r + o),
            this.branches.indices.push(n, i, r, r, i, a));
    }
    createBranchesGeometry() {
      let e = new Xr();
      (e.setAttribute(
        `position`,
        new Fr(new Float32Array(this.branches.verts), 3),
      ),
        e.setAttribute(
          `normal`,
          new Fr(new Float32Array(this.branches.normals), 3),
        ),
        e.setAttribute(`uv`, new Fr(new Float32Array(this.branches.uvs), 2)),
        e.setIndex(new Fr(new Uint32Array(this.branches.indices), 1)),
        e.computeBoundingSphere(),
        (this.branchGeometry = e));
    }
    createLeavesGeometry() {
      let e = new Xr();
      (e.setAttribute(
        `position`,
        new Fr(new Float32Array(this.leaves.verts), 3),
      ),
        e.setAttribute(`uv`, new Fr(new Float32Array(this.leaves.uvs), 2)),
        e.setIndex(new Fr(new Uint32Array(this.leaves.indices), 1)),
        e.computeVertexNormals(),
        e.computeBoundingSphere(),
        (this.leafGeometry = e));
    }
  },
  s2 = {
    seed: 18020,
    type: `deciduous`,
    bark: {
      type: `birch`,
      tint: 16777215,
      flatShading: !1,
      textured: !0,
      textureScale: { x: 1, y: 1 },
    },
    branch: {
      levels: 2,
      angle: { 1: 75, 2: 32, 3: 7 },
      children: { 0: 10, 1: 3, 2: 3 },
      force: { direction: { x: 0, y: 1, z: 0 }, strength: 0.0148 },
      gnarliness: { 0: 0.05, 1: 0.12, 2: 0.12, 3: 0.02 },
      length: { 0: 50, 1: 6.07, 2: 11.19, 3: 1 },
      radius: { 0: 0.72, 1: 0.41, 2: 0.7, 3: 0.7 },
      sections: { 0: 12, 1: 10, 2: 8, 3: 6 },
      segments: { 0: 8, 1: 6, 2: 4, 3: 3 },
      start: { 1: 0.59, 2: 0.35, 3: 0 },
      taper: { 0: 0.37, 1: 0.13, 2: 0.7, 3: 0.7 },
      twist: { 0: 0, 1: 0, 2: 0, 3: 0 },
    },
    leaves: {
      type: `aspen`,
      billboard: `double`,
      angle: 30,
      count: 11,
      start: 0.124,
      size: 2.5,
      sizeVariance: 0.7,
      tint: 16775778,
      alphaTest: 0.5,
    },
    trellis: { enabled: !1 },
  },
  c2 = {
    seed: 13977,
    type: `evergreen`,
    bark: {
      type: `pine`,
      tint: 16777215,
      flatShading: !1,
      textured: !0,
      textureScale: { x: 1, y: 1 },
    },
    branch: {
      levels: 1,
      angle: { 1: 110, 2: 16, 3: 60 },
      children: { 0: 82, 1: 3, 2: 5 },
      force: { direction: { x: 0, y: 1, z: 0 }, strength: -0.003 },
      gnarliness: { 0: 0.05, 1: 0.08, 2: 0, 3: 0 },
      length: { 0: 50, 1: 23.87, 2: 14.08, 3: 1 },
      radius: { 0: 1.05, 1: 0.36, 2: 0.7, 3: 0.7 },
      sections: { 0: 12, 1: 10, 2: 8, 3: 6 },
      segments: { 0: 8, 1: 6, 2: 4, 3: 3 },
      start: { 1: 0.27, 2: 0.14, 3: 0.3 },
      taper: { 0: 0.7, 1: 0.7, 2: 0.7, 3: 0.7 },
      twist: { 0: 0, 1: 0, 2: 0, 3: 0 },
    },
    leaves: {
      type: `pine`,
      billboard: `double`,
      angle: 39,
      count: 30,
      start: 0.09,
      size: 1.435,
      sizeVariance: 0.201,
      tint: 16777215,
      alphaTest: 0.3,
    },
    trellis: { enabled: !1 },
  },
  l2 = 16,
  u2 = 0.5,
  d2 = 1.04,
  f2 = 0.45,
  p2 = class {
    rows;
    cell;
    colour;
    normal;
    constructor(e, t) {
      ((this.rows = e), (this.cell = t));
      let n = { generateMipmaps: !0, minFilter: l, magFilter: s };
      ((this.colour = new mn(t * l2, t * e, n)),
        (this.colour.texture.colorSpace = Ye),
        (this.normal = new mn(t * l2, t * e, n)));
    }
    bake(e, t) {
      let n = new Zn(),
        r = new Es(-0.5, u2, d2, 0, 0.01, 10),
        i = e.autoClear,
        a = e.getRenderTarget(),
        o = e.getClearColor(new Yn()),
        s = e.getClearAlpha();
      for (let [i, a] of [
        [this.colour, `colour`],
        [this.normal, `normal`],
      ])
        (e.setRenderTarget(i),
          e.setClearColor(a === `normal` ? 8421631 : 0, 0),
          (e.autoClear = !0),
          i.viewport.set(0, 0, i.width, i.height),
          e.clear(),
          (e.autoClear = !1),
          t.forEach((t, o) => {
            n.clear();
            let s = a === `colour` ? t.colour : t.normal;
            n.add(new wi(t.bark, s[0]), new wi(t.leaves, s[1]));
            for (let t = 0; t < l2; t++) {
              let a = (t / l2) * DF;
              (r.position.set(Math.sin(a) * 5, 0, Math.cos(a) * 5),
                r.lookAt(0, 0, 0),
                r.updateMatrixWorld(),
                i.viewport.set(
                  t * this.cell,
                  o * this.cell,
                  this.cell,
                  this.cell,
                ),
                e.render(n, r));
            }
          }));
      (e.setClearColor(o, s), (e.autoClear = i), e.setRenderTarget(a));
    }
  };
