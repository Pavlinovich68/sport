"use client";

import type { HomeCarouselSlide } from "@/lib/homeContent";
import type { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import Image from "next/image";
import { useRef, useState } from "react";

type HomeCarouselProps = {
  slides: HomeCarouselSlide[];
};

type SlideDirection = "forward" | "backward";

export default function HomeCarousel({ slides }: HomeCarouselProps) {
  const carouselRef = useRef<CarouselRef>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] =
    useState<SlideDirection>("forward");

  const handleBeforeChange = (current: number, next: number) => {
    const lastSlide = slides.length - 1;
    const isForward = next === current + 1 || (current === lastSlide && next === 0);

    setSlideDirection(isForward ? "forward" : "backward");
    setActiveSlide(next);
  };

  return (
    <div className="home-carousel">
      <Carousel
        ref={carouselRef}
        autoplay
        beforeChange={handleBeforeChange}
        dots={{ className: "home-carousel-dots" }}
      >
        {slides.map((slide, index) => (
          <div key={slide.title}>
            <div
              className={`home-carousel-slide ${
                activeSlide === index ? "home-carousel-slide-active" : ""
              } home-carousel-slide-${slideDirection}`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 760px) 100vw, 1440px"
                className="home-carousel-image"
              />
              <div className="home-carousel-overlay">
                <div className="home-carousel-copy">
                  <p className="home-carousel-kicker">Наши виды спорта</p>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <button
        type="button"
        className="home-carousel-arrow home-carousel-arrow-prev"
        aria-label="Предыдущий слайд"
        onClick={() => carouselRef.current?.prev()}
      >
        <LeftOutlined aria-hidden />
      </button>
      <button
        type="button"
        className="home-carousel-arrow home-carousel-arrow-next"
        aria-label="Следующий слайд"
        onClick={() => carouselRef.current?.next()}
      >
        <RightOutlined aria-hidden />
      </button>
    </div>
  );
}
