'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Spline to avoid SSR issues in Next.js
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function SplineBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) return null; // ❌ Don't render on mobile

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: '25%',
          transform: 'translate(-50%, -50%) scale(1.2)',
          width: '600px',
          height: '600px',
        }}
      >
        <Spline scene="https://prod.spline.design/8qoypt8sRrMBuxAg/scene.splinecode" />
      </div>
    </div>
  );
}
