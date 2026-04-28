import Image from "next/image";
import SportsCatalogClient from "@/components/SportsCatalogClient";
import { getSports } from "@/lib/homeContent";
import styles from "../index.module.scss";

export default async function SportsCatalogPage() {
  const sports = await getSports();

  return (
    <>
      <section className={styles.sportDetailSection}>
        <article className={styles.sportDetailHero}>
          <Image
            src="/images/sports-banner.png"
            alt="Спортсмены разных дисциплин на фоне гор и хвойного леса"
            fill
            priority
            sizes="100vw"
            className={styles.sportDetailImage}
          />
          <div className={styles.sportDetailOverlay} />
          <div className={styles.shell}>
            <div className={styles.sportDetailContent}>
              <h1>Все виды спорта</h1>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.catalogSection}>
        <div className={styles.shell}>
          <SportsCatalogClient sports={sports} />
        </div>
      </section>
    </>
  );
}
