import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const TAU = Math.PI * 2;
const CAM = 1100;
const INTRO = 3.4;
const SPIN = 0.035;
const PUSH_RADIUS = 130;
const PUSH_FORCE = 3.4;
const SPRING = 0.035;
const DAMP = 0.87;

const PALETTE = [
  [207, 228, 255],
  [165, 203, 255],
  [255, 198, 154],
  [255, 255, 255],
  [255, 172, 122],
];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rand) {
  let u = 0;
  while (u === 0) u = rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

const ARMS = [
  {
    span: 11,
    end: -1.06,
    spread: 0.034,
    radius: (p) =>
      16 + 272 * (1 - Math.exp(-p / 2.3)) + 235 * smooth((p - 9.6) / 1.4),
  },
  {
    span: 9.2,
    end: -1.06 + Math.PI,
    spread: 0.045,
    radius: (p) => 14 + 190 * (1 - Math.exp(-p / 2.0)),
  },
];

function buildGalaxy() {
  const rand = rng(7);
  const R = [];
  const TH = [];
  const Z = [];
  const SIZE = [];
  const ALPHA = [];
  const DELAY = [];
  const GROUP = [];
  const STAR = [];

  const pickGroup = () => {
    const q = rand();
    if (q < 0.4) return 0;
    if (q < 0.65) return 1;
    if (q < 0.82) return 2;
    if (q < 0.93) return 3;
    return 4;
  };

  const add = (x, y, z, size, alpha, star) => {
    const r = Math.hypot(x, y);
    R.push(r);
    TH.push(Math.atan2(y, x));
    Z.push(z);
    SIZE.push(size);
    ALPHA.push(alpha);
    DELAY.push((r / 560) * 1.0 + rand() * 0.35);
    GROUP.push(pickGroup());
    STAR.push(star ? 1 : 0);
  };

  const onArm = (arm, phi, sigmaMul) => {
    const a = ARMS[arm];
    const rad = a.radius(phi);
    const th = a.end - (a.span - phi);
    const sigma = (4 + rad * a.spread) * sigmaMul;
    return {
      x: rad * Math.cos(th) + gauss(rand) * sigma,
      y: rad * Math.sin(th) + gauss(rand) * sigma,
      z: gauss(rand) * (6 + rad * 0.05),
      rad,
    };
  };

  const dustCounts = [7000, 4600];
  const starCounts = [210, 150];

  ARMS.forEach((a, arm) => {
    for (let i = 0; i < dustCounts[arm]; i++) {
      const p = onArm(arm, rand() * a.span, 1);
      add(p.x, p.y, p.z, 0.9 + rand() * 1.3, 0.4 + rand() * 0.6, false);
    }
    for (let i = 0; i < starCounts[arm]; i++) {
      const p = onArm(arm, a.span * (0.03 + 0.97 * rand()), 0.55);
      const big = rand() < 0.14;
      add(
        p.x,
        p.y,
        p.z,
        big ? 12 + rand() * 10 : 4.5 + rand() * 6.5,
        0.55 + rand() * 0.45,
        true
      );
    }
  });

  for (let i = 0; i < 1100; i++) {
    const r = Math.abs(gauss(rand)) * 58;
    const th = rand() * TAU;
    add(
      r * Math.cos(th),
      r * Math.sin(th),
      gauss(rand) * 18,
      0.8 + rand() * 1.4,
      0.35 + rand() * 0.6,
      false
    );
  }
  for (let i = 0; i < 34; i++) {
    const r = Math.abs(gauss(rand)) * 40;
    const th = rand() * TAU;
    add(r * Math.cos(th), r * Math.sin(th), gauss(rand) * 12, 5 + rand() * 7, 0.7, true);
  }

  const n = R.length;
  const groups = PALETTE.map(() => ({ dust: [], star: [] }));
  for (let i = 0; i < n; i++) {
    groups[GROUP[i]][STAR[i] ? "star" : "dust"].push(i);
  }

  const bg = [];
  for (let i = 0; i < 230; i++) {
    bg.push({
      x: rand(),
      y: rand(),
      s: 0.6 + rand() * 1.3,
      a: 0.15 + rand() * 0.55,
      d: 0.2 + rand() * 0.8,
      blue: rand() < 0.08,
    });
  }

  return {
    n,
    R: Float32Array.from(R),
    TH: Float32Array.from(TH),
    Z: Float32Array.from(Z),
    SIZE: Float32Array.from(SIZE),
    ALPHA: Float32Array.from(ALPHA),
    DELAY: Float32Array.from(DELAY),
    groups: groups.map((g) => ({
      dust: Int32Array.from(g.dust),
      star: Int32Array.from(g.star),
    })),
    bg,
  };
}

function makeSprite([r, g, b]) {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const x = c.getContext("2d");
  const grad = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.1, `rgba(${r},${g},${b},0.95)`);
  grad.addColorStop(0.32, `rgba(${r},${g},${b},0.26)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = grad;
  x.fillRect(0, 0, 64, 64);
  return c;
}

const Galaxy = forwardRef(function Galaxy(_, ref) {
  const canvasRef = useRef(null);
  const control = useRef({ t0: 0, burst: null });

  useImperativeHandle(ref, () => ({
    replay() {
      control.current.t0 = performance.now();
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const G = buildGalaxy();
    const sprites = PALETTE.map(makeSprite);
    const n = G.n;

    const OX = new Float32Array(n);
    const OY = new Float32Array(n);
    const VX = new Float32Array(n);
    const VY = new Float32Array(n);
    const PX = new Float32Array(n);
    const PY = new Float32Array(n);
    const PA = new Float32Array(n);
    const PF = new Float32Array(n);

    const st = control.current;
    const start = performance.now();
    st.t0 = reduce ? start - INTRO * 4000 : start;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let scale = 1;
    let cx = 0;
    let cy = 0;
    let mouse = null;
    let tiltX = 0;
    let tiltY = 0;
    let last = start;
    let visible = true;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(h / 925, w / 760);
      cx = w / 2;
      cy = h * 0.611;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse = null;
    };
    const onDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      st.burst = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const clock = (now - start) / 1000;
      const intro = (now - st.t0) / 1000;

      const tx = mouse ? clamp((mouse.x - cx) / w, -0.6, 0.6) * 0.55 : 0;
      const ty = mouse ? clamp((mouse.y - cy) / h, -0.6, 0.6) * -0.45 : 0;
      const k = 1 - Math.exp(-dt * 3.2);
      tiltY += (tx - tiltY) * k;
      tiltX += (ty - tiltX) * k;

      const cosY = Math.cos(tiltY);
      const sinY = Math.sin(tiltY);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);
      const rot = reduce ? 0 : clock * SPIN;
      const sz = Math.max(0.8, scale);
      const pr = PUSH_RADIUS * Math.max(0.7, scale);
      const burst = st.burst;
      st.burst = null;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      const mxn = mouse ? (mouse.x / w - 0.5) * 2 : 0;
      const myn = mouse ? (mouse.y / h - 0.5) * 2 : 0;
      ctx.fillStyle = "#cfe0ff";
      for (let i = 0; i < G.bg.length; i++) {
        const b = G.bg[i];
        const bx = b.x * w - mxn * b.d * 22;
        const by = b.y * h - myn * b.d * 14;
        ctx.globalAlpha = b.a;
        ctx.fillStyle = b.blue ? "#6ab8ff" : "#cfe0ff";
        ctx.fillRect(bx, by, b.s, b.s);
      }

      for (let i = 0; i < n; i++) {
        const e = easeOut(clamp((intro - G.DELAY[i]) / INTRO, 0, 1));
        const th = G.TH[i] + rot - (1 - e) * 4.2;
        const r = G.R[i] * (0.12 + 0.88 * e);
        const x = r * Math.cos(th);
        const y = r * Math.sin(th);
        const z = G.Z[i] * e;
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const f = CAM / (CAM - z2);
        const bx = cx + x1 * f * scale;
        const by = cy + y1 * f * scale;

        let px = bx + OX[i];
        let py = by + OY[i];

        if (mouse) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < pr * pr && d2 > 1) {
            const d = Math.sqrt(d2);
            const q = 1 - d / pr;
            const force = q * q * PUSH_FORCE;
            VX[i] += (dx / d) * force;
            VY[i] += (dy / d) * force;
          }
        }
        if (burst) {
          const dx = px - burst.x;
          const dy = py - burst.y;
          const d2 = dx * dx + dy * dy;
          const br = 300 * Math.max(0.7, scale);
          if (d2 < br * br && d2 > 1) {
            const d = Math.sqrt(d2);
            const q = 1 - d / br;
            VX[i] += (dx / d) * q * 16;
            VY[i] += (dy / d) * q * 16;
          }
        }

        VX[i] = (VX[i] - OX[i] * SPRING) * DAMP;
        VY[i] = (VY[i] - OY[i] * SPRING) * DAMP;
        OX[i] += VX[i];
        OY[i] += VY[i];
        px = bx + OX[i];
        py = by + OY[i];

        PX[i] = px;
        PY[i] = py;
        PF[i] = f;
        PA[i] = G.ALPHA[i] * e;
      }

      for (let g = 0; g < PALETTE.length; g++) {
        const [r, gr, b] = PALETTE[g];
        ctx.fillStyle = `rgb(${r},${gr},${b})`;
        const list = G.groups[g].dust;
        for (let j = 0; j < list.length; j++) {
          const i = list[j];
          const s = G.SIZE[i] * sz * PF[i];
          ctx.globalAlpha = PA[i];
          ctx.fillRect(PX[i] - s / 2, PY[i] - s / 2, s, s);
        }
      }

      ctx.globalCompositeOperation = "lighter";
      const coreE = easeOut(clamp(intro / 1.4, 0, 1));
      const cr = 105 * scale * (0.92 + 0.08 * Math.sin(clock * 1.3)) * (0.4 + 0.6 * coreE);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      grad.addColorStop(0, "rgba(255,248,236,0.9)");
      grad.addColorStop(0.18, "rgba(255,226,190,0.5)");
      grad.addColorStop(0.5, "rgba(190,205,255,0.12)");
      grad.addColorStop(1, "rgba(120,150,255,0)");
      ctx.globalAlpha = coreE;
      ctx.fillStyle = grad;
      ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2);

      for (let g = 0; g < PALETTE.length; g++) {
        const list = G.groups[g].star;
        const sprite = sprites[g];
        for (let j = 0; j < list.length; j++) {
          const i = list[j];
          const tw = 0.88 + 0.12 * Math.sin(clock * 1.6 + i * 1.9);
          const s = G.SIZE[i] * sz * PF[i] * tw;
          ctx.globalAlpha = PA[i];
          ctx.drawImage(sprite, PX[i] - s, PY[i] - s, s * 2, s * 2);
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
});

export default Galaxy;
