"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setWidth(Math.min(100, Math.max(0, scrolled)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="progress"
      id="progress"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: `${width}%`,
        backgroundColor: "#1c3b2b",
        zIndex: 40,
        transition: "width 0.1s ease",
      }}
    />
  );
}
