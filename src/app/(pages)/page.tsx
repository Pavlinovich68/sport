import Image from "next/image";
import HomeCarousel from "@/components/HomeCarousel";
import HomeTile from "@/components/HomeTile";
import ParallaxScroll from "@/components/ParallaxScroll";
import { getHomeContent } from "@/lib/homeContent";
import styles from "./index.module.scss";

const menuItems = [
  { label: "Главная", href: "#hero" },
  { label: "События", href: "#events" },
  { label: "Секции", href: "#services" },
  { label: "Спортсмены", href: "#services" },
  { label: "Контакты", href: "#contacts" },
];

export default async function Home() {
  const homeContent = await getHomeContent();

  return (
    <main className={styles.page}>
      <ParallaxScroll />
      <header className={styles.header}>
        <div className={styles.shell}>
          <div className={styles.headerInner}>
            <div className={styles.brand}>
              <Image
                src="/sport-logo.svg"
                alt="Sport"
                width={48}
                height={48}
                priority
                className={styles.brandLogo}
              />
              <div>
                <p className={styles.brandTitle}>Sport</p>
                <p className={styles.brandSubtitle}>Спортивная платформа</p>
              </div>
            </div>

            <nav className={styles.nav} aria-label="Главное меню">
              {menuItems.map((item) => (
                <a key={item.label} href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <section
        id="hero"
        className={`${styles.screen} ${styles.heroSection}`}
        data-parallax-screen
      >
        <Image
          src="/images/sports-banner.png"
          alt="Спортсмены разных дисциплин на фоне гор и хвойного леса"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroDepth} />
        <div className={styles.heroOverlay} />
        <div className={styles.shell}>
          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <p className={styles.heroKicker}>Единая экосистема спорта</p>
              <h1>
                События, секции и достижения южного урала на единой современной
                платформе
              </h1>
              <p>
                Главная страница для спортивной жизни города: от расписания и
                новостей до команд, турниров и медиа.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="events"
        className={`${styles.screen} ${styles.section} ${styles.eventsScreen}`}
        data-parallax-screen
      >
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>
              {homeContent.carousel.kicker}
            </p>
            <h2>{homeContent.carousel.title}</h2>
          </div>
          <div className={styles.carouselFrame}>
            <HomeCarousel slides={homeContent.carousel.slides} />
          </div>
        </div>
      </section>

      <section
        id="services"
        className={`${styles.screen} ${styles.section} ${styles.sectionSoft} ${styles.servicesScreen}`}
        data-parallax-screen
      >
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>{homeContent.tiles.kicker}</p>
            <h2>{homeContent.tiles.title}</h2>
          </div>

          <div className={styles.tiles}>
            {homeContent.tiles.items.map((item) => (
              <HomeTile key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <footer id="contacts" className={styles.footer}>
        <div className={styles.shell}>
          <div className={styles.footerInner}>
            <div>
              <p className={styles.footerTitle}>Sport Platform</p>
              <p className={styles.footerText}>
                Цифровая среда для спорта, мероприятий и городских спортивных
                сообществ.
              </p>
            </div>
            <p className={styles.footerCopy}>
              © 2026 Sport. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
