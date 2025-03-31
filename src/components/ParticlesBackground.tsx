
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
        background: {
          color: {
            value: "#07071C", // Deeper, richer background color
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 100, // Reduced particle count for cleaner look
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: ["#9b87f5", "#7E69AB", "#ffffff"], // Premium color palette
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.3,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 1.8,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 180,
            color: "#9b87f5", // Premium purple color
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6, // Smoother, slightly slower movement
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              line_linked: {
                opacity: 0.4,
              },
            },
            push: {
              particles_nb: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

export default ParticlesBackground;
