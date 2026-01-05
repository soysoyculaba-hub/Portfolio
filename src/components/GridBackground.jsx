import React, { useEffect, useRef } from 'react';

const GridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid settings
    const gridSize = 80;
    const lineColor = 'rgba(145, 94, 255, 0.1)';
    const glowColor = 'rgba(145, 94, 255, 0.8)';

    // Traveling lines
    const lines = [];
    const lineCount = 20;

    for (let i = 0; i < lineCount; i++) {
      const isHorizontal = Math.random() > 0.5;
      lines.push({
        x: Math.random() * (canvas.parentElement?.clientWidth || window.innerWidth),
        y: Math.random() * (canvas.parentElement?.clientHeight || window.innerHeight),
        speed: (Math.random() * 5) + 5, // Random speed between 5 and 10
        direction: isHorizontal ? 'horizontal' : 'vertical',
        length: (Math.random() * 150) + 100, // Random length between 100 and 250
      });
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw traveling lines with glow
      lines.forEach(line => {
        ctx.beginPath();
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(145, 94, 255, 0.9)';

        if (line.direction === 'horizontal') {
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x + line.length, line.y);
          line.x += line.speed;

          // Reset when off screen
          if (line.x > canvas.width) {
            line.x = -line.length;
            // distinct reset for randomness
            line.y = Math.random() * canvas.height;
            line.speed = (Math.random() * 5) + 5;
          }
        } else {
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x, line.y + line.length);
          line.y += line.speed;

          // Reset when off screen
          if (line.y > canvas.height) {
            line.y = -line.length;
            // distinct reset for randomness
            line.x = Math.random() * canvas.width;
            line.speed = (Math.random() * 5) + 5;
          }
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none', // Ensure clicks pass through to 3D model
      }}
    />
  );
};

export default GridBackground;