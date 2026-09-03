import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
}

export const AmbientStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let stars: Star[] = [];

    const createStars = () => {
      stars = [];
      const numStars = Math.max(45, Math.min(Math.floor((width * height) / 16000), 100));

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 0.6 + 0.4,
          baseAlpha: Math.random() * 0.3 + 0.15,
          twinkleSpeed: Math.random() * 0.002 + 0.0008,
          twinkleOffset: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.02,
          vy: -(Math.random() * 0.03 + 0.01),
        });
      }
    };

    createStars();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createStars();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let isRunning = true;
    const render = (time: number) => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const alpha = Math.max(
          0.06,
          Math.min(
            0.55,
            star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.2
          )
        );

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{
        width: '100vw',
        height: '100vh',
        opacity: 0.9,
      }}
    />
  );
};

export default AmbientStarfield;
