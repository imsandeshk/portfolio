
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
              "#ffffff", // White - most common
              "#ffffff", 
              "#ffffff",
              "#4A90E2", // Blue
              "#E24A4A", // Red
              "#7E69AB", // Purple - rare
            ],
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: theme === "dark" ? 0.3 : 0.4,
            width: 1.5,
            triangles: {
              enable: true,
              opacity: 0.05,
            },
            shadow: {
              enable: true,
              color: "#ffffff",
              blur: 20,
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
            speed: theme === "dark" ? 0.8 : 0.6,
            straight: false,
            attract: {
              enable: true,
              distance: 200,
              rotate: {
                x: 600,
                y: 600
              }
            }
          },
          number: {
            density: {
              enable: true,
              area: 1600,
            },
            value: theme === "dark" ? 70 : 50,
            limit: theme === "dark" ? 90 : 60,
          },
          opacity: {
            value: {
              min: theme === "dark" ? 0.2 : 0.25,
              max: theme === "dark" ? 0.6 : 0.7,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: theme === "dark" ? 0.1 : 0.15,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 1,
              max: theme === "dark" ? 2.5 : 2,
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.8,
              sync: false,
            }
          },
          shadow: {
            enable: true,
            color: {
              value: [
                "#ffffff",
                "#4A90E2",
                "#E24A4A",
              ]
            },
            blur: 15,
            offset: {
              x: 0,
              y: 0
            }
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.08,
              opacity: theme === "dark" ? 0.9 : 0.8,
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
                opacity: theme === "dark" ? 0.6 : 0.7,
                color: theme === "dark" ? "#ffffff" : "#7E69AB", // Secondary Purple for light theme
              }
            },
            push: {
              quantity: 1,
              limit: 5,    
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
