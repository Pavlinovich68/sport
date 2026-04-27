import styles from "@/app/(pages)/index.module.scss";

export default function SiteFooter() {
  return (
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
          <p className={styles.footerCopy}>© 2026 Sport. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
