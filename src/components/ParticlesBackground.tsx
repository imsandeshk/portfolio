
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "@/contexts/ThemeContext";

const ParticlesBackground: React.FC = () => {
  const { theme } = useTheme();
  
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
            value: [
              "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
              "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
              "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
              "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
              "#4A90E2", "#4A90E2", "#4A90E2", "#4A90E2", "#4A90E2", // Blue - 5 particles
              "#E24A4A", "#E24A4A", "#E24A4A", "#E24A4A", "#E24A4A", // Red - 5 particles
            ],
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: theme === "dark" ? 0.2 : 0.3,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.02,
            },
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
            speed: theme === "dark" ? 0.6 : 0.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1600,
            },
            value: theme === "dark" ? 60 : 45,
            limit: theme === "dark" ? 70 : 50,
          },
          opacity: {
            value: {
              min: theme === "dark" ? 0.15 : 0.2,
              max: theme === "dark" ? 0.5 : 0.6,
            },
            animation: {
              enable: true,
              speed: 0.8,
              minimumValue: theme === "dark" ? 0.1 : 0.15,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 0.8,
              max: theme === "dark" ? 2 : 1.8,
            },
            animation: {
              enable: true,
              speed: 1.5,
              minimumValue: 0.5,
              sync: false,
            }
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: theme === "dark" ? 0.7 : 0.6,
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
                opacity: theme === "dark" ? 0.5 : 0.6,
                color: "#ffffff",
              }
            },
            push: {
              quantity: 2,
              particles: {
                color: {
                  value: "#ffffff", // Only white particles on click
                }
              }
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
