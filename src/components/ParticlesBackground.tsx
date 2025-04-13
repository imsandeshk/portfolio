
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
            opacity: 0.1,
            width: 0.5,
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
            speed: 0.4, // Further reduced speed for calmer motion
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 2000, // Increased area to further reduce particle density
            },
            value: 50, // Reduced number of particles
            limit: 60, // Add a limit to prevent too many particles
          },
          opacity: {
            value: {
              min: 0.05,
              max: 0.2, // Reduced maximum opacity for even subtler effect
            },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.05,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.5,
              max: 1, // Reduced max size for subtlety
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.03,
              opacity: 0.5,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Changed to "grab" for a more subtle interaction
              parallax: {
                enable: true,
                force: 10, // Reduced force for more subtle interaction
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
              distance: 120,
              links: {
                opacity: 0.3,
                color: "#ffffff",
              }
            },
            push: {
              quantity: 2, // Reduced from 3 to 2 for subtler effect
              limit: 5, // Limit the number of particles that can be added on click
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
