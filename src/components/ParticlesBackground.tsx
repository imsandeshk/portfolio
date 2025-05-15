
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
            value: theme === "dark" ? "#ffffff" : "#ffffff", // White particles in both modes
          },
          links: {
            color: theme === "dark" ? "#ffffff" : "#ffffff", // White links for better visibility
            distance: 150,
            enable: true,
            opacity: theme === "dark" ? 0.25 : 0.15, // Lower opacity in light mode
            width: theme === "dark" ? 1 : 1,
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
            speed: theme === "dark" ? 0.8 : 0.5, // Slightly slower in light theme
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1600,
            },
            value: theme === "dark" ? 70 : 30, // Fewer particles in light mode
            limit: theme === "dark" ? 90 : 50,
          },
          opacity: {
            value: {
              min: theme === "dark" ? 0.15 : 0.1,
              max: theme === "dark" ? 0.4 : 0.2, // Lower max opacity in light mode
            },
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: theme === "dark" ? 0.1 : 0.05,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.8,
              max: theme === "dark" ? 2.2 : 1.5, // Smaller particles in light mode
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.1,
              opacity: theme === "dark" ? 0.8 : 0.4, // Lower twinkle opacity
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
                opacity: theme === "dark" ? 0.6 : 0.3, // Lower opacity in light mode
                color: theme === "dark" ? "#ffffff" : "#ffffff",
              }
            },
            push: {
              quantity: 1,
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
