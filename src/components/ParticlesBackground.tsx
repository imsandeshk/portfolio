
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
            opacity: 0.25,
            width: 0.8,
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
            speed: 1.2,
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
            value: 140,
          },
          opacity: {
            value: {
              min: 0.1,
              max: 0.4,
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
              min: 0.8,
              max: 2.5,
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
              mode: "repulse",
              parallax: {
                enable: true,
                force: 60,
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
              quantity: 8,
            },
            repulse: {
              distance: 120,
              duration: 0.4,
            },
            grab: {
              distance: 100,
              links: {
                opacity: 0.7,
              },
            },
          },
          detectRetina: true,
        },
      }}
    />
  );
};

export default ParticlesBackground;
