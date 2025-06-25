
import { useEffect } from 'react';

export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navigation = entry as PerformanceNavigationTiming;
          console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
        }
        
        if (entry.entryType === 'paint') {
          console.log(`${entry.name}:`, entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['navigation', 'paint'] });

    return () => observer.disconnect();
  }, []);
};
