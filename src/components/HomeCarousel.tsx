"use client";

import type { HomeCarouselSlide } from "@/lib/homeContent";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type HomeCarouselProps = {
  slides: HomeCarouselSlide[];
};

export default function HomeCarousel({ slides }: HomeCarouselProps) {
  const radioId = (index: number) => `home-carousel-radio-${index}`;

  useEffect(() => {
    if (slides.length < 2) return;

    const timer = window.setInterval(() => {
      const checked = document.querySelector<HTMLInputElement>(
        'input[name="home-carousel"]:checked',
      );
      const current = checked ? Number(checked.dataset.index) : 0;
      const next = (current + 1) % slides.length;
      document.getElementById(radioId(next))?.click();
    }, 5600);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="home-carousel">
      {slides.map((_, index) => (
        <input
          key={radioId(index)}
          id={radioId(index)}
          name="home-carousel"
          type="radio"
          className="home-carousel-radio"
          data-index={index}
          defaultChecked={index === 0}
          aria-hidden="true"
          tabIndex={-1}
        />
      ))}

      <style>{`
        ${slides
          .map((_, index) => {
            const prev = (index - 1 + slides.length) % slides.length;
            const next = (index + 1) % slides.length;

            return `
              #${radioId(index)}:checked ~ .home-carousel-viewport .home-carousel-slide[data-slide="${index}"] {
                opacity: 1;
                pointer-events: auto;
                z-index: 3;
                animation: home-carousel-card-in-forward 760ms cubic-bezier(0.18, 0.72, 0.16, 1) both;
              }

              #${radioId(index)}:checked ~ .home-carousel-viewport .home-carousel-slide[data-slide="${prev}"] {
                opacity: 1;
                transform: translate3d(0, 0, 0) scale(1);
                z-index: 2;
              }

              #${radioId(index)}:checked ~ .home-carousel-viewport .home-carousel-slide[data-slide="${index}"] .home-carousel-copy {
                opacity: 1;
                transform: translate3d(0, 0, 0);
              }

              #${radioId(index)}:checked ~ .home-carousel-viewport .home-carousel-slide[data-slide="${index}"] .home-carousel-image {
                filter: saturate(1.04) contrast(1.02);
                transform: scale(1);
              }

              #${radioId(index)}:checked ~ .home-carousel-viewport .home-carousel-slide[data-slide="${index}"] .home-carousel-slide-nav {
                opacity: 1;
                pointer-events: auto;
              }

              #${radioId(index)}:checked ~ .home-carousel-dots [data-dot="${index}"],
              #${radioId(index)}:checked ~ .home-carousel-dots [data-dot="${index}"] label {
                width: 30px !important;
              }

              #${radioId(index)}:checked ~ .home-carousel-dots [data-dot="${index}"] label {
                background: white !important;
              }
            `;
          })
          .join("\n")}
      `}</style>

      <div className="home-carousel-viewport">
        {slides.map((slide, index) => {
          const prev = (index - 1 + slides.length) % slides.length;
          const next = (index + 1) % slides.length;

          return (
            <article
              key={slide.id}
              className="home-carousel-slide"
              data-slide={index}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="(max-width: 760px) 100vw, 1120px"
                className="home-carousel-image"
              />
              <div className="home-carousel-overlay">
                <div className="home-carousel-copy">
                  <p className="home-carousel-kicker">Наши виды спорта</p>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </div>
              <Link
                href={`/sports/${slide.id}`}
                className="home-carousel-link"
                aria-label={`Открыть страницу вида спорта: ${slide.title}`}
              >
                <span className="home-carousel-link-text">
                  Открыть страницу вида спорта: {slide.title}
                </span>
              </Link>
              <div className="home-carousel-slide-nav" aria-hidden="true">
                <label
                  htmlFor={radioId(prev)}
                  className="home-carousel-arrow home-carousel-arrow-prev"
                  aria-label="Предыдущий слайд"
                >
                  <LeftOutlined aria-hidden />
                </label>
                <label
                  htmlFor={radioId(next)}
                  className="home-carousel-arrow home-carousel-arrow-next"
                  aria-label="Следующий слайд"
                >
                  <RightOutlined aria-hidden />
                </label>
              </div>
            </article>
          );
        })}
      </div>

      <ol className="home-carousel-dots" aria-label="Слайды карусели">
        {slides.map((slide, index) => (
          <li
            key={slide.id}
            data-dot={index}
          >
            <label
              htmlFor={radioId(index)}
              aria-label={`Показать слайд: ${slide.title}`}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
