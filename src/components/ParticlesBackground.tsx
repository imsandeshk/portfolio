
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
        fpsLimit: 120,
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
            width: 1.2,
            triangles: {
              enable: true,
              opacity: 0.05
            }
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
            speed: 1.2,
            straight: false,
            path: {
              enable: true,
              delay: {
                value: 0.1
              }
            },
            trail: {
              enable: true,
              fillColor: "#000000",
              length: 3
            }
          },
          number: {
            density: {
              enable: true,
              area: 1500,
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
              sync: false
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
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.5,
              sync: false
            }
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.08,
              opacity: 0.8,
              color: {
                value: ["#ffffff", "#add8e6"]
              }
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
                blink: true
              }
            },
            push: {
              quantity: 4,
              limit: 10,
            },
            repulse: {
              distance: 150,
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
