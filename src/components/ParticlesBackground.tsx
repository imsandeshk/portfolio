
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "@/contexts/ThemeContext";

const ParticlesBackground: React.FC = () => {
  const { theme } = useTheme();
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fpsLimit: 60,
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
            value: theme === "dark" ? "#ffffff" : "#6366F1",
          },
          links: {
            color: theme === "dark" ? "#ffffff" : "#6366F1",
            distance: 150,
            enable: true,
            opacity: theme === "dark" ? 0.25 : 0.4,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1600,
            },
            value: 70,
            limit: 90,
          },
          opacity: {
            value: {
              min: theme === "dark" ? 0.15 : 0.3,
              max: theme === "dark" ? 0.4 : 0.6,
            },
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: theme === "dark" ? 0.1 : 0.2,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.8,
              max: 2.2,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.1,
              opacity: 0.8,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", 
              parallax: {
                enable: true,
                force: 20,
                smooth: 10,
              },
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: theme === "dark" ? 0.6 : 0.8,
                color: theme === "dark" ? "#ffffff" : "#6366F1",
              }
            },
            push: {
              quantity: 1, // Only one particle created per click
              limit: 5,    
            },
            repulse: {
              distance: 150,
              duration: 0.5,
            }
          },
          detectRetina: true,
        },
      }}
    />
  );
};

export default ParticlesBackground;
