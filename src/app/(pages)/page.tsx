import Image from "next/image";
import HomeCarousel from "@/components/HomeCarousel";
import styles from "./index.module.scss";

const menuItems = ["Главная", "События", "Секции", "Спортсмены", "Контакты"];

const tiles = [
  "Платформа турниров",
  "Каталог секций",
  "Календарь стартов",
  "Новости спорта",
  "Достижения",
  "Медиаархив",
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <div className={styles.headerInner}>
            <div className={styles.brand}>
              <span className={styles.brandMark}>S</span>
              <div>
                <p className={styles.brandTitle}>Sport</p>
                <p className={styles.brandSubtitle}>Спортивная платформа</p>
              </div>
            </div>

            <nav className={styles.nav} aria-label="Главное меню">
              {menuItems.map((item) => (
                <a key={item} href="#" className={styles.navLink}>
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <section className={styles.heroSection}>
        <Image
          src="/images/sports-banner.png"
          alt="Спортсмены разных дисциплин на фоне гор и хвойного леса"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
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

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Карусель</p>
            <h2>Главные акценты платформы</h2>
          </div>
          <div className={styles.carouselFrame}>
            <HomeCarousel />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Разделы</p>
            <h2>Плитки для будущих сервисов</h2>
          </div>

          <div className={styles.tiles}>
            {tiles.map((tile) => (
              <article key={tile} className={styles.tile}>
                <span className={styles.tileBadge}>Скоро</span>
                <h3>{tile}</h3>
                <p>Место зарезервировано под будущий функциональный модуль.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
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
