
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticlesBackground: React.FC = React.memo(() => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    fpsLimit: isMobile ? 24 : 45,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    background: {
      color: {
        value: "transparent", 
      },
    },
    particles: {
      color: {
        value: theme === "dark" 
          ? ["#ffffff", "#ff4444", "#4488ff"]
          : ["#7E69AB", "#ff4444", "#4488ff"],
      },
      links: {
        color: "#ffffff",
        distance: isMobile ? 100 : 130,
        enable: !isMobile,
        opacity: theme === "dark" ? 0.2 : 0.25,
        width: isMobile ? 0.5 : 1,
      },
      collisions: {
        enable: !isMobile,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: true,
        speed: isMobile ? 0.3 : (theme === "dark" ? 0.8 : 0.6),
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: isMobile ? 2200 : 1800,
        },
        value: isMobile ? 16 : (theme === "dark" ? 36 : 30),
        limit: isMobile ? 20 : (theme === "dark" ? 42 : 34),
      },
      opacity: {
        value: {
          min: theme === "dark" ? 0.15 : 0.2,
          max: theme === "dark" ? 0.4 : 0.5,
        },
        animation: {
          enable: !isMobile,
          speed: 0.8,
          minimumValue: theme === "dark" ? 0.1 : 0.1,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: 0.8,
          max: isMobile ? 1.5 : (theme === "dark" ? 2.2 : 1.8),
        },
      },
      twinkle: {
        particles: {
          enable: !isMobile,
          frequency: 0.05,
          opacity: theme === "dark" ? 0.5 : 0.45,
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: false,
          mode: "grab", 
          parallax: {
            enable: !isMobile,
            force: 20,
            smooth: 10,
          },
        },
        onClick: {
          enable: false,
          mode: "push",
        },
        onTouch: {
          enable: false,
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: isMobile ? 120 : 180,
          links: {
            opacity: isMobile ? 0.3 : (theme === "dark" ? 0.6 : 0.7),
            color: theme === "dark" ? "#ffffff" : "#7E69AB",
          }
        },
        push: {
          quantity: 1,
          limit: 5,    
        },
        repulse: {
          distance: isMobile ? 100 : 150,
          duration: 0.5,
        }
      },
      detectRetina: false,
    },
  }), [theme, isMobile]);

  if (!isVisible) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
    />
  );
});

ParticlesBackground.displayName = 'ParticlesBackground';

export default ParticlesBackground;
