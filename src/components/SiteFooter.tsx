import styles from "@/app/(pages)/index.module.scss";

export default function SiteFooter() {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerTitle}>
              Спортивный портал Челябинской области
            </p>
            <p className={styles.footerText}>
              Цифровая среда для спорта, мероприятий и городских спортивных
              сообществ.
            </p>
          </div>
          <p className={styles.footerCopy}>
            © 2026 Спорт 74. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
