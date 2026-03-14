import { useEffect, useRef } from "react";

/**
 * Cursor-reactive gradient orbs that follow the mouse with parallax depth.
 * On mobile, orbs stay static as ambient decoration.
 */
const CursorGlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // static orbs on mobile, no tracking

    const orbs = containerRef.current?.querySelectorAll<HTMLElement>(".cursor-orb");
    if (!orbs || orbs.length === 0) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const positions = Array.from(orbs).map(() => ({ x: mouseX, y: mouseY }));
    const speeds = [0.03, 0.02, 0.015]; // different lerp speeds for parallax
    const settleThreshold = 0.5;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (raf === null) {
        raf = requestAnimationFrame(animate);
      }
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let raf: number | null = null;
    const animate = () => {
      let needsAnotherFrame = false;

      orbs.forEach((orb, i) => {
        const speed = speeds[i] || 0.02;
        const dx = mouseX - positions[i].x;
        const dy = mouseY - positions[i].y;

        if (Math.abs(dx) > settleThreshold || Math.abs(dy) > settleThreshold) {
          needsAnotherFrame = true;
        }

        positions[i].x += dx * speed;
        positions[i].y += dy * speed;
        orb.style.transform = `translate(${positions[i].x - window.innerWidth / 2}px, ${positions[i].y - window.innerHeight / 2}px) translate(-50%, -50%)`;
      });

      if (needsAnotherFrame) {
        raf = requestAnimationFrame(animate);
      } else {
        raf = null;
      }
    };
    raf = requestAnimationFrame(animate);

    return () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
      }
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
      aria-hidden="true"
    >
      {/* Orb 1 — large violet/purple, slowest */}
      <div
        className="cursor-orb"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          filter: "blur(140px)",
          opacity: 0.14,
          background: "radial-gradient(circle, #7c6aff, #c084fc)",
          transition: "opacity 0.3s",
        }}
      />
      {/* Orb 2 — rose/purple, medium speed */}
      <div
        className="cursor-orb"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.10,
          background: "radial-gradient(circle, #fb7185, #c084fc)",
          transition: "opacity 0.3s",
        }}
      />
      {/* Orb 3 — teal/violet, fastest */}
      <div
        className="cursor-orb"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          filter: "blur(110px)",
          opacity: 0.09,
          background: "radial-gradient(circle, #2dd4bf, #7c6aff)",
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
};

export default CursorGlow;
