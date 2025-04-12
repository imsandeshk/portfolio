
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
            distance: 120,
            enable: true,
            opacity: 0.25,
            width: 0.6,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.8, // Reduced speed for calmer motion
            straight: false,
            attract: {
              enable: true, // Enable attraction
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 1000, // Increased area to reduce particle density
            },
            value: 100, // Reduced from 160 to 100 particles
          },
          opacity: {
            value: {
              min: 0.1,
              max: 0.4, // Reduced maximum opacity for subtler effect
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.5,
              max: 1.5, // Reduced max size for subtlety
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Changed from "repulse" to "grab" to attract to cursor
              parallax: {
                enable: true,
                force: 30, // Reduced force for more subtle interaction
                smooth: 20,
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
              distance: 150, // Cursor grab distance
              links: {
                opacity: 0.7, // Link opacity increases when grabbing
                blink: false,
              },
            },
            push: {
              quantity: 4, // Reduced from 8 to 4 for subtler effect
            },
            repulse: {
              distance: 100,
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
