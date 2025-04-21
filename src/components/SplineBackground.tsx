'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function SplineBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scale = isMobile ? 0.9 : 1.1;
  const top = isMobile ? '28%' : '40%';
  const left = isMobile ? '50%' : '25%';

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        style={{
          position: 'absolute',
          top,
          left,
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: '500px',
          height: '500px',
        }}
      >
        <Spline scene="https://prod.spline.design/8qoypt8sRrMBuxAg/scene.splinecode" />
      </div>
    </div>
  );
}
