import Image from "next/image";
import styles from "@/app/(pages)/index.module.scss";

const menuItems = [
  { label: "Главная", href: "/#hero" },
  { label: "События", href: "/#events" },
  { label: "Секции", href: "/#services" },
  { label: "Спортсмены", href: "/#services" },
  { label: "Контакты", href: "/#contacts" },
];

export default function SiteHeader() {
  return (
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
  );
}
