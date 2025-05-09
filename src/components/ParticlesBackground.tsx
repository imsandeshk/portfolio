
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
            opacity: 0.25, // Increased for better visibility
            width: 1,  // Increased for better visibility
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
            speed: 0.8, // Increased speed for smoother animation
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1600, // Adjusted for slightly more particles
            },
            value: 70, // Increased from 50
            limit: 90, // Increased limit
          },
          opacity: {
            value: {
              min: 0.15, // Increased for better visibility 
              max: 0.4, // Increased for better visibility
            },
            animation: {
              enable: true,
              speed: 0.8, // Increased for more dynamic appearance
              minimumValue: 0.1,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.8,
              max: 2.2, // Increased max size for better visibility
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.1, // Increased frequency
              opacity: 0.8, // Increased opacity for more noticeable twinkle
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
                force: 20, // Increased force
                smooth: 10, // Decreased for more responsive movement
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
              distance: 180, // Increased from 120
              links: {
                opacity: 0.6, // Increased from 0.3
                color: "#ffffff",
              }
            },
            push: {
              quantity: 4, // Increased from 2
              limit: 10, // Increased limit
            },
            repulse: {
              distance: 150, // Increased from 100
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
