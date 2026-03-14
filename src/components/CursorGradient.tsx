import { useEffect, useRef } from "react";

const CursorGradient: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--cx", `${e.clientX}px`);
      el.style.setProperty("--cy", `${e.clientY}px`);
      el.style.opacity = "1";
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[-5] pointer-events-none transition-opacity duration-700"
      style={{
        opacity: 0,
        background:
          "radial-gradient(600px circle at var(--cx, 50%) var(--cy, 50%), rgba(139, 92, 246, 0.07), rgba(6, 182, 212, 0.04) 40%, transparent 70%)",
      }}
    />
  );
};

export default CursorGradient;
