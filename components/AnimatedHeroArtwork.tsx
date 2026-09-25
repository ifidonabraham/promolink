"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SparklesIcon, ArrowRightIcon } from "@/components/icons";

type ShowcaseMode = "offset" | "signage" | "merchandise";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export function AnimatedHeroArtwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<ShowcaseMode>("offset");
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [printCycle, setPrintCycle] = useState(0);

  // Cycle showcase modes every 8 seconds automatically unless hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setMode((prev) => {
        if (prev === "offset") return "signage";
        if (prev === "signage") return "merchandise";
        return "offset";
      });
      setPrintCycle((c) => c + 1);
    }, 7500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Canvas particle engine & CMYK dynamic print wave
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener("resize", handleResize);

    const cmykColors = [
      "rgba(227, 38, 46, 0.75)",   // Brand Red
      "rgba(0, 174, 239, 0.65)",   // Cyan
      "rgba(236, 0, 140, 0.65)",   // Magenta
      "rgba(255, 222, 0, 0.55)",   // Yellow
      "rgba(240, 217, 184, 0.6)",  // Champagne Gold
    ];

    let particles: Particle[] = [];
    const spawnCount = 28;
    for (let i = 0; i < spawnCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1.5,
        color: cmykColors[Math.floor(Math.random() * cmykColors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      });
    }

    let scanY = 0;
    let scanDirection = 1;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic CMYK Fluid Waves
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const yOffset = height * (0.65 + w * 0.1);
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= width; x += 15) {
          const waveY =
            Math.sin(x * 0.006 + time + w * 1.5) * 16 +
            Math.cos(x * 0.003 - time * 0.8) * 12;
          ctx.lineTo(x, yOffset + waveY);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yOffset - 30, width, height);
        if (w === 0) {
          grad.addColorStop(0, "rgba(227, 38, 46, 0.08)");
          grad.addColorStop(1, "rgba(0, 174, 239, 0.06)");
        } else if (w === 1) {
          grad.addColorStop(0, "rgba(236, 0, 140, 0.06)");
          grad.addColorStop(1, "rgba(255, 222, 0, 0.04)");
        } else {
          grad.addColorStop(0, "rgba(227, 38, 46, 0.05)");
          grad.addColorStop(1, "rgba(240, 217, 184, 0.08)");
        }
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // 2. High-precision Laser Print Registration Scan Line
      scanY += 1.8 * scanDirection;
      if (scanY > height) scanDirection = -1;
      if (scanY < 0) scanDirection = 1;

      const scanGrad = ctx.createLinearGradient(0, scanY - 14, 0, scanY + 14);
      scanGrad.addColorStop(0, "rgba(227, 38, 46, 0)");
      scanGrad.addColorStop(0.5, "rgba(227, 38, 46, 0.38)");
      scanGrad.addColorStop(1, "rgba(227, 38, 46, 0)");

      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 14, width, 28);

      ctx.strokeStyle = "rgba(227, 38, 46, 0.75)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      // Laser scan bead that travels with the beam
      const beadX = ((Math.sin(time * 2.5) + 1) / 2) * width;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(beadX, scanY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 3. Technical Alignment Marks / Crop Crosses
      const crossSize = 10;
      const crosses = [
        { x: 30, y: 30 },
        { x: width - 30, y: 30 },
        { x: 30, y: height - 30 },
        { x: width - 30, y: height - 30 },
      ];
      ctx.strokeStyle = "rgba(227, 38, 46, 0.4)";
      ctx.lineWidth = 1;
      crosses.forEach((pt) => {
        ctx.beginPath();
        ctx.moveTo(pt.x - crossSize, pt.y);
        ctx.lineTo(pt.x + crossSize, pt.y);
        ctx.moveTo(pt.x, pt.y - crossSize);
        ctx.lineTo(pt.x, pt.y + crossSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 4. CMYK Floating Ink Particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (p.life > p.maxLife) {
          particles[idx] = {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 1.5,
            color: cmykColors[Math.floor(Math.random() * cmykColors.length)],
            alpha: Math.random() * 0.6 + 0.2,
            life: 0,
            maxLife: Math.random() * 200 + 100,
          };
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Handle interactive 3D perspective tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleBurst = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * window.devicePixelRatio;
    const clickY = (e.clientY - rect.top) * window.devicePixelRatio;

    // Ink splash effect
    const splashColors = ["#e3262e", "#00aeef", "#ec008c", "#fff200", "#17202a"];
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16;
      const speed = Math.random() * 5 + 2;
      const color = splashColors[Math.floor(Math.random() * splashColors.length)];
      ctx.beginPath();
      ctx.arc(
        clickX + Math.cos(angle) * speed * 4,
        clickY + Math.sin(angle) * speed * 4,
        Math.random() * 5 + 2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = color;
      ctx.fill();
    }
  };

  const tiltX = (mousePos.y - 0.5) * -12;
  const tiltY = (mousePos.x - 0.5) * 14;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onClick={handleBurst}
      className="group relative mx-auto w-full max-w-[32rem] select-none overflow-hidden rounded-3xl border border-brand-border/90 bg-gradient-to-b from-white via-brand-light/70 to-brand-secondary/20 p-4 shadow-2xl transition-all duration-300 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      style={{ perspective: 1200 }}
      title="Click anywhere to burst ink calibration!"
    >
      {/* Ambient Red Glow Behind Card */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-brand/20 blur-3xl transition-opacity duration-700 group-hover:bg-brand/30 dark:bg-brand/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl transition-opacity duration-700 dark:bg-cyan-500/10"
        aria-hidden="true"
      />

      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-80 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Top HUD: Status, Telemetry & Mode Selector */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-brand-border/60 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Press Active • 2,400 DPI
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-white/90 p-0.5 shadow-sm backdrop-blur dark:bg-slate-800/90 dark:border dark:border-slate-700">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode("offset");
            }}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide transition-all ${
              mode === "offset"
                ? "bg-brand text-white shadow"
                : "text-slate-600 hover:text-brand dark:text-slate-400"
            }`}
          >
            Offset & Print
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode("signage");
            }}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide transition-all ${
              mode === "signage"
                ? "bg-brand text-white shadow"
                : "text-slate-600 hover:text-brand dark:text-slate-400"
            }`}
          >
            Signage
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMode("merchandise");
            }}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide transition-all ${
              mode === "merchandise"
                ? "bg-brand text-white shadow"
                : "text-slate-600 hover:text-brand dark:text-slate-400"
            }`}
          >
            Merch
          </button>
        </div>
      </div>

      {/* Central 3D Interactive Print Stage */}
      <div
        className="relative my-4 flex min-h-[300px] items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(12px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Shadow underneath 3D objects */}
        <div
          className="pointer-events-none absolute bottom-4 h-12 w-3/4 rounded-full bg-black/15 blur-xl transition-all duration-300 dark:bg-black/40"
          style={{
            transform: `translate(${tiltY * -1.5}px, ${tiltX * 1.5}px) scale(${
              isHovered ? 1.05 : 1
            })`,
          }}
        />

        {/* MODE 1: Supplied print stationery and executive-card artwork */}
        {mode === "offset" && (
          <div className="relative h-[280px] w-full max-w-[22rem] transition-all duration-500 animate-fadeIn">
            <CollageCrop
              region={{ x: 585, y: 0, width: 489, height: 415 }}
              alt="PromoLink corporate stationery and letterhead examples"
              className="left-[9%] top-[3%] z-10 w-[84%] rounded-2xl border border-white/80 shadow-2xl"
            />
            <CollageCrop
              region={{ x: 0, y: 0, width: 580, height: 415 }}
              alt="PromoLink executive foil business card examples"
              className="bottom-[2%] right-[1%] z-20 w-[72%] rounded-xl border border-white/80 shadow-2xl"
            />
            <span className="absolute bottom-1 left-1 z-30 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-dark shadow-lg">
              Offset print · foil · stationery
            </span>
          </div>
        )}

        {/* MODE 2: Supplied illuminated signage and roll-up banner artwork */}
        {mode === "signage" && (
          <div className="relative h-[280px] w-full max-w-[22rem] transition-all duration-500 animate-fadeIn">
            <CollageCrop
              region={{ x: 803, y: 450, width: 451, height: 286 }}
              alt="PromoLink illuminated 3D signage example"
              className="right-0 top-[5%] z-10 w-[78%] rounded-2xl border border-white/80 shadow-2xl"
            />
            <CollageCrop
              region={{ x: 0, y: 779, width: 438, height: 438 }}
              alt="PromoLink roll-up banner design examples"
              className="bottom-[1%] left-0 z-20 w-[57%] rounded-xl border border-white/80 shadow-2xl"
            />
            <span className="absolute bottom-[4%] right-0 z-30 rounded-full bg-slate-950/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
              Lightboxes · banners · displays
            </span>
          </div>
        )}

        {/* MODE 3: Supplied screen-print, embroidery, and gift artwork */}
        {mode === "merchandise" && (
          <div className="relative h-[280px] w-full max-w-[22rem] transition-all duration-500 animate-fadeIn">
            <CollageCrop
              region={{ x: 0, y: 450, width: 438, height: 286 }}
              alt="PromoLink screen-printing design example"
              className="left-[7%] top-[2%] z-10 w-[74%] rounded-2xl border border-white/80 shadow-2xl"
            />
            <CollageCrop
              region={{ x: 445, y: 450, width: 355, height: 286 }}
              alt="PromoLink embroidery design example"
              className="bottom-[2%] left-0 z-20 w-[59%] rounded-xl border border-white/80 shadow-2xl"
            />
            <CollageCrop
              region={{ x: 953, y: 779, width: 301, height: 438 }}
              alt="PromoLink laser-etched tumbler example"
              className="bottom-[1%] right-0 z-30 w-[29%] rounded-xl border border-white/80 shadow-2xl"
            />
            <span className="absolute right-0 top-0 z-40 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-dark shadow-lg">
              <SparklesIcon className="h-3 w-3 text-brand" />
              Branded merchandise
            </span>
          </div>
        )}
      </div>

      {/* Bottom Live Metrics & Interactive Hint */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-brand-border/60 pt-3 text-xs dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {mode === "offset" && "Offset & Digital Production"}
            {mode === "signage" && "Large Format & Signage"}
            {mode === "merchandise" && "Corporate Gifts & Apparel"}
          </span>
          <span className="text-[10px] text-brand font-bold">
            • Lagos Hub
          </span>
        </div>

        <Link
          href="/all-products"
          className="group/link inline-flex items-center gap-1 text-xs font-bold text-brand hover:text-brand-strong transition"
        >
          <span>Explore print catalog</span>
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

const COLLAGE_IMAGE = "/brand/promolink-showcase-collage.png";

function CollageCrop({
  region,
  alt,
  className,
}: {
  region: { x: number; y: number; width: number; height: number };
  alt: string;
  className: string;
}) {
  const sourceSize = 1254;

  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute overflow-hidden bg-white ${className}`}
      style={{ aspectRatio: `${region.width} / ${region.height}` }}
    >
      <Image
        src={COLLAGE_IMAGE}
        alt=""
        width={sourceSize}
        height={sourceSize}
        sizes="(max-width: 640px) 70vw, 22rem"
        className="absolute max-w-none"
        style={{
          width: `${(sourceSize / region.width) * 100}%`,
          left: `${(-region.x / region.width) * 100}%`,
          top: `${(-region.y / region.height) * 100}%`,
        }}
      />
    </div>
  );
}
