'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import to prevent SSR issues in Next.js
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function SplineBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Run once on load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scale = isMobile ? 0.98 : 1.2;
  const top = isMobile ? '25%' : '38%';
  const left = isMobile ? '50%' : '25%';

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        style={{
          position: 'absolute',
          top,
          left,
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: '600px',
          height: '600px',
        }}
      >
        <Spline scene="https://prod.spline.design/8qoypt8sRrMBuxAg/scene.splinecode" />
      </div>
    </div>
  );
}
