'use client';

import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

export default function SplineBackground() {
  const isMobile = useIsMobile();

  const style: React.CSSProperties = isMobile
    ? {
        position: 'absolute',
        top: '70%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120vw',
        height: '80vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }
    : {
        position: 'absolute',
        top: '50%',
        left: '35%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      };

  return (
    <div className="spline-bg" style={style}>
      <Spline scene="https://prod.spline.design/8qoypt8sRrMBuxAg/scene.splinecode" />
    </div>
  );
}
