import Image from "next/image";
import { notFound } from "next/navigation";
import { getSportById, getSports } from "@/lib/homeContent";
import styles from "../../index.module.scss";

type SportPageProps = {
  params: Promise<{
    sportId: string;
  }>;
};

export async function generateStaticParams() {
  const sports = await getSports();

  return sports.map((sport) => ({
    sportId: sport.id,
  }));
}

export default async function SportPage({ params }: SportPageProps) {
  const { sportId } = await params;
  const sport = await getSportById(sportId);

  if (!sport) {
    notFound();
  }

  return (
    <section className={styles.sportDetailSection}>
      <div className={styles.shell}>
        <article className={styles.sportDetailHero}>
          <Image
            src={sport.image}
            alt={sport.title}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 1240px"
            className={styles.sportDetailImage}
          />
          <div className={styles.sportDetailOverlay} />
          <div className={styles.sportDetailContent}>
            <p className={styles.sectionKicker}>Вид спорта</p>
            <h1>{sport.title}</h1>
          </div>
        </article>
      </div>
    </section>
  );
}
