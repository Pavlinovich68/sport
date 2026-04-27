"use client";

import type { HomeCarouselSlide } from "@/lib/homeContent";
import { Carousel } from "antd";

type HomeCarouselProps = {
  slides: HomeCarouselSlide[];
};

export default function HomeCarousel({ slides }: HomeCarouselProps) {
  return (
    <Carousel autoplay adaptiveHeight dots={{ className: "home-carousel-dots" }}>
      {slides.map((slide) => (
        <div key={slide.title}>
          <div
            className={`home-carousel-slide bg-gradient-to-br ${slide.accent}`}
          >
            <div className="home-carousel-overlay">
              <p className="home-carousel-kicker">SPORT PLATFORM</p>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
