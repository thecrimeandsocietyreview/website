import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useCallback } from "react";

interface GlobeProps {
  className?: string;
  size?: number;
  dotColor?: string;
  autoRotateSpeed?: number;
}

function rotateY(
  x: number,
  y: number,
  z: number,
  angle: number
): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(
  x: number,
  y: number,
  z: number,
  angle: number
): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  fov: number
): [number, number, number] {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy, z];
}

export function Component({
  className,
  size = 600,
  dotColor = "rgba(125, 195, 255, ALPHA)",
  autoRotateSpeed = 0.0018,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef = useRef(-1.2);
  const rotXRef = useRef(0.2);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    startRotY: number;
    startRotX: number;
  }>({ active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 });
  const animRef = useRef<number>(0);

  // Generate globe dots (Fibonacci sphere distribution)
  const dotsRef = useRef<[number, number, number][]>([]);

  useEffect(() => {
    const dots: [number, number, number][] = [];
    const numDots = 1350;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numDots; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      const z = Math.sin(theta) * Math.sin(phi);
      dots.push([x, y, z]);
    }
    dotsRef.current = dots;
  }, []);

  const sizeRef = useRef<{ w: number; h: number; dpr: number }>({ w: 0, h: 0, dpr: 1 });
  const isVisibleRef = useRef<boolean>(true);

  // ResizeObserver to update canvas pixel dimensions only when size actually changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w > 0 && h > 0) {
        sizeRef.current = { w, h, dpr };
        if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
          canvas.width = Math.round(w * dpr);
          canvas.height = Math.round(h * dpr);
        }
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  const draw = useCallback(() => {
    if (!isVisibleRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h, dpr } = sizeRef.current;
    if (w <= 0 || h <= 0) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.46;
    const fov = 600;

    // Auto rotate slowly when user is not dragging
    if (!dragRef.current.active) {
      rotYRef.current += autoRotateSpeed;
    }

    ctx.clearRect(0, 0, w, h);

    // Subtle ambient glow
    const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.4);
    glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.05)");
    glowGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle globe circular outline
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(125, 195, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const ry = rotYRef.current;
    const rx = rotXRef.current;

    // Draw dots
    const dots = dotsRef.current;
    for (let i = 0; i < dots.length; i++) {
      let [x, y, z] = dots[i];
      x *= radius;
      y *= radius;
      z *= radius;

      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);

      if (z > 0) continue; // back-face cull for 3D sphere feel

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const depthAlpha = Math.max(0.12, 1 - (z + radius) / (2 * radius));
      const dotSize = 1.1 + depthAlpha * 0.85;

      ctx.beginPath();
      ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = dotColor.replace("ALPHA", depthAlpha.toFixed(2));
      ctx.fill();
    }

    animRef.current = requestAnimationFrame(draw);
  }, [dotColor, autoRotateSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(([entry]) => {
      const isIntersecting = entry.isIntersecting;
      isVisibleRef.current = isIntersecting;
      if (isIntersecting) {
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animRef.current);
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  // Pointer drag handlers (smooth rotation on drag with native vertical mobile scroll preservation)
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startRotY: rotYRef.current,
        startRotX: rotXRef.current,
      };
      if (e.pointerType === 'mouse') {
        try {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        } catch {}
      }
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      rotYRef.current = dragRef.current.startRotY + dx * 0.005;
      rotXRef.current = Math.max(
        -1.2,
        Math.min(1.2, dragRef.current.startRotX + dy * 0.005)
      );
    },
    []
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      dragRef.current.active = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    },
    []
  );

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "w-full h-full max-w-full aspect-square cursor-grab active:cursor-grabbing select-none touch-pan-y",
        className
      )}
      style={{
        maxWidth: size || undefined,
        maxHeight: size || undefined,
        touchAction: 'pan-y'
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
}

export const Globe = Component;
export default Component;
