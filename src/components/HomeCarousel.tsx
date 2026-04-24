"use client";

import { Carousel } from "antd";

const slides = [
  {
    title: "Турниры и события",
    description:
      "Следите за ближайшими матчами, стартами и спортивными мероприятиями в одном месте.",
    accent: "from-emerald-500/80 to-teal-700/80",
  },
  {
    title: "Команды и секции",
    description:
      "Быстрый доступ к направлениям подготовки, расписанию секций и клубным новостям.",
    accent: "from-sky-500/80 to-blue-700/80",
  },
  {
    title: "Достижения спортсменов",
    description:
      "Публикуйте результаты, награды и лучшие моменты, чтобы ими гордился весь город.",
    accent: "from-orange-400/80 to-red-600/80",
  },
];

export default function HomeCarousel() {
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
