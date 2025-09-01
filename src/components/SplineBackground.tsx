'use client';

import Spline from '@splinetool/react-spline';
import { useIsMobile } from '@/hooks/use-mobile';
import { memo } from 'react';

const SplineBackground = memo(() => {
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
        willChange: 'transform',
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
        willChange: 'transform',
      };

  return (
    <div className="spline-bg" style={style}>
      <Spline 
        scene="https://prod.spline.design/8qoypt8sRrMBuxAg/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
});

SplineBackground.displayName = 'SplineBackground';

export default SplineBackground;
