import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

const WaterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const { darkMode } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    contextRef.current = context;

    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Ensure the context is reset after resize
      if (contextRef.current) {
        contextRef.current.scale(1, 1);
      }
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize ripple arrays
    const cols = Math.floor(canvas.width / 20);
    const rows = Math.floor(canvas.height / 20);
    const resolution = 20;
    
    let current = new Array(cols * rows).fill(0);
    let previous = new Array(cols * rows).fill(0);

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;

    // Update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = Math.floor((e.clientX - rect.left) / resolution);
      mouseY = Math.floor((e.clientY - rect.top) / resolution);
      
      if (isMouseDown) {
        current[mouseY * cols + mouseX] = 500;
      } else {
        current[mouseY * cols + mouseX] = 50;
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    // Click handler for ripple effect
    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / resolution);
      const y = Math.floor((e.clientY - rect.top) / resolution);
      current[y * cols + x] = 500;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleClick);

    // Animation function
    function animate() {
      if (!canvas || !contextRef.current) return;
      const ctx = contextRef.current;

      for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
          const idx = i * cols + j;
          current[idx] = (
            previous[idx - 1] +
            previous[idx + 1] +
            previous[idx - cols] +
            previous[idx + cols]
          ) / 2 - current[idx];
          current[idx] *= 0.99; // Damping
        }
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw water effect base
      ctx.fillStyle = darkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(219, 234, 254, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ripples with enhanced visibility
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const idx = i * cols + j;
          const x = j * resolution;
          const y = i * resolution;
          const value = Math.abs(current[idx]);
          
          const color = darkMode 
            ? `rgba(59, 130, 246, ${Math.min(value / 50, 0.8)})`
            : `rgba(59, 130, 246, ${Math.min(value / 100, 0.5)})`;
          
          ctx.fillStyle = color;
          ctx.fillRect(x, y, resolution, resolution);
        }
      }

      // Swap buffers
      [current, previous] = [previous, current];
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('click', handleClick);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ 
        zIndex: -1,
        touchAction: 'none',
        opacity: 1,
        background: darkMode ? 'rgb(17, 24, 39)' : 'rgb(219, 234, 254)'
      }}
    />
  );
};

export default WaterBackground; 