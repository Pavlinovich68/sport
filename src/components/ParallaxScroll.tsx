"use client";

import { useEffect } from "react";

export default function ParallaxScroll() {
  useEffect(() => {
    const screens = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax-screen]"),
    );

    if (!screens.length) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (motionQuery.matches) {
        screens.forEach((screen) => {
          screen.style.setProperty("--parallax-far", "0px");
          screen.style.setProperty("--parallax-mid", "0px");
          screen.style.setProperty("--parallax-near", "0px");
          screen.style.setProperty("--parallax-reverse", "0px");
        });
        return;
      }

      const viewportHeight = window.innerHeight || 1;

      screens.forEach((screen) => {
        const rect = screen.getBoundingClientRect();
        const progress = (viewportHeight / 2 - rect.top) / viewportHeight;
        const clamped = Math.max(-1, Math.min(1, progress));

        screen.style.setProperty("--parallax-far", `${clamped * 120}px`);
        screen.style.setProperty("--parallax-mid", `${clamped * 72}px`);
        screen.style.setProperty("--parallax-near", `${clamped * -52}px`);
        screen.style.setProperty("--parallax-reverse", `${clamped * -96}px`);
      });
    };

    let frame = 0;
    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    motionQuery.addEventListener("change", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      motionQuery.removeEventListener("change", requestUpdate);
    };
  }, []);

  return null;
}
