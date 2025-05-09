
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground: React.FC = () => {
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
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.2, // Increased from 0.1 for better visibility
            width: 0.8,  // Increased from 0.5 for better visibility
          },
          collisions: {
            enable: true, // Changed to true for more dynamic movement
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.6, // Slightly increased speed
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1800, // Adjusted for slightly more particles
            },
            value: 60, // Increased from 50
            limit: 80, // Increased limit
          },
          opacity: {
            value: {
              min: 0.1, // Increased from 0.05 for better visibility
              max: 0.3, // Increased from 0.2 for better visibility
            },
            animation: {
              enable: true,
              speed: 0.7, // Increased for more dynamic appearance
              minimumValue: 0.08,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.5,
              max: 1.5, // Increased max size for better visibility
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.08, // Increased frequency
              opacity: 0.7, // Increased opacity for more noticeable twinkle
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
                force: 15, // Increased force
                smooth: 15, // Decreased for more responsive movement
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
              distance: 150, // Increased from 120
              links: {
                opacity: 0.5, // Increased from 0.3
                color: "#ffffff",
              }
            },
            push: {
              quantity: 3, // Increased from 2
              limit: 8, // Increased limit
            },
            repulse: {
              distance: 120, // Increased from 100
              duration: 0.4,
            }
          },
          detectRetina: true,
        },
      }}
    />
  );
};

export default ParticlesBackground;
