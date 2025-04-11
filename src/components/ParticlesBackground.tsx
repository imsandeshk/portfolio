
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
        background: {
          color: {
            value: "#000000",
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.15,
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
            speed: 0.8,
            straight: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 150, // Increased particle count
          },
          opacity: {
            value: {
              min: 0.05,
              max: 0.2,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.05,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.5,
              max: 1.5,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false
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
              mode: "repulse",
              parallax: {
                enable: true,
                force: 40,
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
            push: {
              quantity: 8, // More particles on click
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            grab: {
              distance: 100,
              links: {
                opacity: 0.5,
              },
            },
            trail: {
              delay: 0.5,
              quantity: 3,
            },
          },
          detectRetina: true,
        },
      }}
    />
  );
};

export default ParticlesBackground;
