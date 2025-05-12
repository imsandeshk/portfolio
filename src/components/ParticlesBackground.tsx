
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
            opacity: 0.25,
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
              min: 0.15,
              max: 0.4,
            },
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 0.1,
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
                opacity: 0.6,
                color: "#ffffff",
              }
            },
            push: {
              quantity: 1, // Reduced from 4 to 1
              limit: 5,    // Reduced from 10 to 5
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
