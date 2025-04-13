
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
            opacity: 0.2,
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
            speed: 0.6, // Reduced speed for calmer motion
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
              area: 1500, // Increased area to further reduce particle density
            },
            value: 70, // Reduced from 100 to 70 particles
          },
          opacity: {
            value: {
              min: 0.1,
              max: 0.3, // Reduced maximum opacity for even subtler effect
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
              min: 0.5,
              max: 1.2, // Reduced max size for subtlety
            },
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: 0.1,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 0.8,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "attract", // Changed to "attract" to pull particles toward cursor
              parallax: {
                enable: true,
                force: 20, // Reduced force for more subtle interaction
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
            attract: {
              distance: 200,
              duration: 0.4,
              easing: "ease-out-quad",
              factor: 3,
              maxSpeed: 50,
              speed: 1
            },
            push: {
              quantity: 3, // Reduced from 4 to 3 for subtler effect
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
