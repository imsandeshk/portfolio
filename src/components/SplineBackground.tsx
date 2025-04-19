import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
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
        <Spline scene="https://prod.spline.design/lcYR6U6dKrDsG1dR/scene.splinecode" />
      </div>
    </div>
  );
}
