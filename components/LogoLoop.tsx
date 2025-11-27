'use client'

import React, { useRef, useState } from 'react';

interface Logo {
  node: React.ReactNode;
  title: string;
  href?: string;
}

interface LogoLoopProps {
  logos: Logo[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
}

export function LogoLoop({
  logos,
  speed = 100,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  pauseOnHover = false,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = '#000000',
}: LogoLoopProps) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate logos to create seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: `${logoHeight + 20}px` }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Fade out gradients */}
      {fadeOut && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}

      {/* Scrolling container */}
      <div
        className="flex items-center absolute"
        style={{
          gap: `${gap}px`,
          animation: `scroll-${direction} ${speed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className={`flex items-center justify-center transition-transform duration-300 ${scaleOnHover ? 'hover:scale-125' : ''
              }`}
            style={{
              height: `${logoHeight}px`,
              minWidth: `${logoHeight}px`,
            }}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300"
                style={{ fontSize: `${logoHeight * 0.8}px` }}
                title={logo.title}
              >
                {logo.node}
              </a>
            ) : (
              <div
                className="flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300"
                style={{ fontSize: `${logoHeight * 0.8}px` }}
                title={logo.title}
              >
                {logo.node}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default LogoLoop;
