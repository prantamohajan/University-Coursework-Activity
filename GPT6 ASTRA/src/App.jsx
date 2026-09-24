import React, { useEffect, useRef } from 'react';
import { ArrowDown, CheckCircle2, Cpu, ShieldAlert, Zap } from 'lucide-react';

// --- CANVAS PHYSICS ENGINE ---
const CanvasAstra6 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let width, height;
    let dpr = window.devicePixelRatio || 1;
    let animationFrameId;

    let particles = [];
    let backgroundStars = [];
    const NUM_PARTICLES = 2500;
    const NUM_STARS = 600;

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * dpr;
      mouseY = (e.clientY - rect.top) * dpr;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Quadratic Bezier interpolation
    const getBezierPoint = (u, P0, P1, P2) => {
      const x = Math.pow(1 - u, 2) * P0.x + 2 * (1 - u) * u * P1.x + Math.pow(u, 2) * P2.x;
      const y = Math.pow(1 - u, 2) * P0.y + 2 * (1 - u) * u * P1.y + Math.pow(u, 2) * P2.y;
      return { x, y };
    };

    class Particle {
      constructor() {
        this.reset();
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = (Math.random() - 0.5) * 1000;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
      }

      reset() {
        // Dual-path mathematical spiral system for '6'
        const isLoop = Math.random() > 0.4;
        
        // Base scale for the '6'
        const scale6 = Math.min(width, height) * 0.0015; 
        
        if (isLoop) {
          // Inner Loop: Circular/elliptical orbital core
          const angle = Math.random() * Math.PI * 2;
          // Center of loop is slightly lower
          const cx = 0;
          const cy = 60;
          const r = 80;
          this.baseX = (cx + r * Math.cos(angle)) * scale6;
          this.baseY = (cy + r * Math.sin(angle)) * scale6;
        } else {
          // Outer Tail: Upward extending curve
          const u = Math.random(); // 0 to 1
          const P0 = { x: 80, y: 60 }; // Connects to right side of loop
          const P1 = { x: 80, y: -100 }; // Control point pulling up and right
          const P2 = { x: -50, y: -160 }; // End point at top left
          
          const pt = getBezierPoint(u, P0, P1, P2);
          this.baseX = pt.x * scale6;
          this.baseY = pt.y * scale6;
        }

        // Add volume thickness to the mathematical path
        const volumeRadius = Math.random() * 30 * scale6;
        const volumeAngle = Math.random() * Math.PI * 2;
        
        this.baseX += Math.cos(volumeAngle) * volumeRadius;
        this.baseY += Math.sin(volumeAngle) * volumeRadius;
        this.baseZ = (Math.random() - 0.5) * 80 * scale6;

        // Color distribution: intense stellar white, icy electric blue, soft warm champagne gold
        const rand = Math.random();
        if (rand < 0.4) this.color = '#ffffff';
        else if (rand < 0.7) this.color = '#a5c9ff';
        else this.color = '#ffe2b8';

        this.size = (Math.random() * 1.5 + 0.5) * dpr;
        
        // Orbital properties for continuous swirling
        this.orbitRadius = Math.random() * 15 * scale6;
        this.orbitSpeed = (Math.random() - 0.5) * 0.004;
        this.orbitAngle = Math.random() * Math.PI * 2;
      }

      update(time) {
        const currentOrbit = this.orbitAngle + time * this.orbitSpeed;
        
        // Continuous angular velocity rotating the entire constellation slowly clockwise
        const rotTime = time * 0.0002;
        const rotX = Math.sin(rotTime) * 0.2;
        const rotY = Math.cos(rotTime) * 0.2;

        let localX = this.baseX + Math.cos(currentOrbit) * this.orbitRadius;
        let localY = this.baseY + Math.sin(currentOrbit) * this.orbitRadius;
        let localZ = this.baseZ + Math.cos(currentOrbit * 1.5) * this.orbitRadius;

        // Apply 3D rotation
        let rx = localX * Math.cos(rotY) - localZ * Math.sin(rotY);
        let rz = localX * Math.sin(rotY) + localZ * Math.cos(rotY);
        
        let finalX = rx;
        let finalY = localY * Math.cos(rotX) - rz * Math.sin(rotX);
        let finalZ = localY * Math.sin(rotX) + rz * Math.cos(rotX);

        let tx = finalX;
        let ty = finalY;
        let tz = finalZ;

        // Anti-Gravity Cursor Interaction (Inverse-square gravitational repulsion)
        const fov = 400 * dpr;
        const scale = fov / (fov + tz);
        const screenX = width / 2 + tx * scale;
        const screenY = height / 2 + ty * scale;

        const dx = screenX - mouseX;
        const dy = screenY - mouseY;
        const dist = Math.hypot(dx, dy);
        const maxDist = 250 * dpr;

        if (dist < maxDist && dist > 0) {
          const force = Math.pow((maxDist - dist) / maxDist, 2);
          const angle = Math.atan2(dy, dx);
          // Scatter smoothly away
          tx += Math.cos(angle) * force * 400 * dpr;
          ty += Math.sin(angle) * force * 400 * dpr;
          tz += force * 200 * dpr;
        }

        // Spring tension damping to drift back
        this.vx += (tx - this.x) * 0.02;
        this.vy += (ty - this.y) * 0.02;
        this.vz += (tz - this.z) * 0.02;

        this.vx *= 0.9;
        this.vy *= 0.9;
        this.vz *= 0.9;

        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
      }

      draw(ctx) {
        const fov = 400 * dpr;
        const scale = fov / (fov + this.z);
        if (scale < 0) return;

        const x2d = width / 2 + this.x * scale;
        const y2d = height / 2 + this.y * scale;

        if (x2d < 0 || x2d > width || y2d < 0 || y2d > height) return;

        const speed = Math.hypot(this.vx, this.vy);
        const brightness = Math.min(1, scale * 0.8 + speed * (0.01 / dpr));

        ctx.globalAlpha = brightness;
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class BackgroundStar {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.2 * dpr;
        this.twinkleSpeed = 0.001 + Math.random() * 0.003;
        this.baseAlpha = Math.random() * 0.5 + 0.1;
      }
      draw(ctx, time) {
        const alpha = this.baseAlpha + Math.sin(time * this.twinkleSpeed) * 0.3;
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initScene = () => {
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle());
      backgroundStars = [];
      for (let i = 0; i < NUM_STARS; i++) backgroundStars.push(new BackgroundStar());
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width * dpr;
      height = rect.height * dpr;
      canvas.width = width;
      canvas.height = height;
      initScene();
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = (time) => {
      // Deep pitch black void
      ctx.globalAlpha = 0.3; // Trail effect
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';

      // Draw background ambient cosmic dust
      backgroundStars.forEach(star => star.draw(ctx, time));

      // Draw Multi-layered radial gradient pulsing core
      const pulse = Math.sin(time * 0.001) * 0.1 + 0.9;
      const coreGradient = ctx.createRadialGradient(width/2, height/2 + (60 * (Math.min(width, height) * 0.0015)), 0, width/2, height/2 + (60 * (Math.min(width, height) * 0.0015)), width * 0.3 * pulse);
      coreGradient.addColorStop(0, 'rgba(165, 201, 255, 0.06)');
      coreGradient.addColorStop(0.4, 'rgba(165, 201, 255, 0.01)');
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.globalAlpha = 1;
      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw mathematical particles
      particles.forEach(p => {
        p.update(time);
        p.draw(ctx);
      });

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0 touch-none"
    />
  );
};


// --- UI COMPONENTS ---
const Navbar = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[rgba(0,0,0,0.55)] backdrop-blur-[16px] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => scrollTo('home')}>
          <span className="font-heading font-semibold text-lg tracking-tight text-white">OpenAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Introduction', 'Advantage', 'Disadvantage', 'Conclusion'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-screen bg-[#000000] overflow-hidden flex items-center justify-center">
      <CanvasAstra6 />
      
      <div className="absolute z-10 w-full max-w-[1400px] px-6 flex justify-between items-center pointer-events-none">
        <h1 className="text-white/90 font-sans font-light text-[12vw] md:text-[9vw] leading-none tracking-tight mix-blend-screen">
          GPT
        </h1>
        <h1 className="text-white/90 font-sans font-light text-[12vw] md:text-[9vw] leading-none tracking-tight mix-blend-screen">
          Astra
        </h1>
      </div>

      <div className="absolute bottom-10 z-20 flex justify-center w-full animate-bounce">
        <button 
          onClick={() => document.getElementById('introduction').scrollIntoView({ behavior: 'smooth' })}
          className="text-white/40 hover:text-white transition-colors p-2 cursor-pointer"
        >
          <ArrowDown size={24} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
};

const Introduction = () => {
  return (
    <section id="introduction" className="relative w-full bg-[#000000] border-t border-white/[0.08] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 max-w-3xl">
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] text-white/50 mb-6 uppercase">
            01 / INTRODUCTION
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-white mb-8 leading-tight">
            GPT-6 Astra: Autonomous Foundation System.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed font-light">
            Engineered for looped transformer recurrent depth, multi-hour autonomy, and zero-loss multi-file synthesis. GPT-6 Astra acts not just as an interactive tool, but as a deeply embedded structural intelligence capable of persistent reasoning and continuous self-correction over extended horizons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "1.2M Tokens", desc: "Context Window allowing zero-loss retrieval over millions of code tokens and multi-repo architectures." },
            { title: "Looped Transformers", desc: "Self-Correcting Reasoning loops enable internal verification before execution, drastically reducing hallucination drift." },
            { title: "Native OS Control", desc: "Direct GUI & Browser Interaction capabilities to navigate systems organically without synthetic API layers." }
          ].map((card, i) => (
            <div key={i} className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 shadow-2xl cursor-pointer">
              <h3 className="text-xl font-heading font-medium text-white mb-3">{card.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Advantage = () => {
  return (
    <section id="advantage" className="w-full bg-[#000000] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] text-[#a5c9ff] mb-4 uppercase">
            02 / ADVANTAGE
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-white">
            Architectural Breakthroughs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: <Cpu size={20} className="text-[#a5c9ff]" />, title: "Long-Horizon Autonomous Agency", desc: "Executes 12+ hour task chains autonomously without degradation." },
            { icon: <CheckCircle2 size={20} className="text-[#a5c9ff]" />, title: "Autonomous Codebase Healing", desc: "Capable of multi-repo refactoring, test-suite generation, and live runtime debugging." },
            { icon: <Zap size={20} className="text-[#a5c9ff]" />, title: "GUI & Native Software Execution", desc: "Operates natively across operating systems without requiring synthetic APIs." },
            { icon: <ShieldAlert size={20} className="text-[#a5c9ff]" />, title: "Optimal Compute & Token Efficiency", desc: "40% reduction in inference compute via Adaptive Reasoning Depth." }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-2xl bg-black border border-white/[0.08] hover:border-[#a5c9ff]/40 transition-colors duration-500">
              <div className="mb-6 opacity-80">{item.icon}</div>
              <h4 className="text-lg font-heading font-medium text-white mb-2">{item.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Disadvantage = () => {
  return (
    <section id="disadvantage" className="w-full bg-[#000000] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] text-[#ff2a5f] mb-4 uppercase">
            03 / DISADVANTAGE
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-white">
            Systemic Limits & Safety Imperatives
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { title: "Cybersecurity Sandboxing & High-Privilege Agent Hazards", desc: "Unprecedented OS control requires rigorous sandboxing to prevent rogue execution vectors and unintended lateral movement." },
            { title: "Opaque Latent Reasoning", desc: "Interpretability challenges in deep recursive loops make internal Chain-of-Thought attribution harder to audit in real time." },
            { title: "High Computational & Energy Density Requirements", desc: "Peak agency workflows require dedicated high-density cluster infrastructure, introducing significant energy overhead." }
          ].map((alert, i) => (
            <div key={i} className="group p-8 md:p-10 bg-[#050505] border border-white/[0.05] rounded-xl flex flex-col md:flex-row md:items-start gap-6 hover:border-[#ff2a5f]/30 transition-colors duration-500">
              <div className="flex-shrink-0 w-1.5 h-full min-h-[40px] bg-[#ff2a5f] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <div>
                <h4 className="text-lg font-heading font-medium text-white mb-2">{alert.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed font-light">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Conclusion = () => {
  return (
    <section id="conclusion" className="w-full bg-[#000000] pt-32 pb-12 px-6 border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="inline-block text-[11px] font-semibold tracking-[0.25em] text-white/40 mb-8 uppercase">
          04 / CONCLUSION
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-medium text-white mb-8 tracking-tight">
          The Autonomous Era of Computing.
        </h2>
        <p className="text-lg text-white/50 leading-relaxed mb-16 max-w-2xl font-light">
          GPT-6 Astra represents the definitive paradigm shift in artificial intelligence. We are moving beyond chat prompts and text generation into an era of fully autonomous digital coworkers—embedded directly into our operational fabric.
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[11px] font-medium text-white/60 tracking-wider mb-32">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_8px_#00ff88]" />
          Astra Core: Active <span className="text-white/20 mx-1">•</span> 60 FPS Anti-Gravity Canvas <span className="text-white/20 mx-1">•</span> OpenAI Frontier
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-light">
        <div>&copy; 2026 OpenAI. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Research Index</a>
        </div>
      </div>
    </section>
  );
};

// --- MAIN APPLICATION ENTRY ---
export default function App() {
  return (
    <main className="w-full min-h-screen bg-[#000000] text-white font-sans selection:bg-white/20">
      <Navbar />
      <Hero />
      <Introduction />
      <Advantage />
      <Disadvantage />
      <Conclusion />
    </main>
  );
}
