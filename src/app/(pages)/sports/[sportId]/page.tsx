import Image from "next/image";
import { notFound } from "next/navigation";
import SportObjectCard from "@/components/SportObjectCard";
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
      <article className={styles.sportDetailHero}>
        <Image
          src={sport.image}
          alt={sport.title}
          fill
          priority
          sizes="100vw"
          className={styles.sportDetailImage}
        />
        <div className={styles.sportDetailOverlay} />
        <div className={styles.shell}>
          <div className={styles.sportDetailContent}>
            <h1>{sport.title}</h1>
          </div>
        </div>
      </article>

      <div className={styles.shell}>
        <div className={styles.sportDetailBody}>
          <aside className={styles.sportDetailSidebar}>
            <div className={styles.sportDetailPanel}>
              <p className={styles.sectionKicker}>Ключевые направления</p>
              <div className={styles.sportDetailTags}>
                {sport.tags.map((tag) => (
                  <span key={tag} className={styles.sportDetailTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className={styles.sportDetailMain}>
            <div className={styles.sportDetailPanel}>
              <p className={styles.sectionKicker}>Описание</p>
              <div className={styles.sportDetailDescription}>
                {sport.fullDescription.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {sport.sportObjects.length > 0 ? (
          <section className={styles.sportObjectsSection}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionKicker}>Где заниматься</p>
              <h2>Спортивные объекты</h2>
            </div>

            <div className={styles.sportObjectsGrid}>
              {sport.sportObjects.map((sportObject) => (
                <SportObjectCard
                  key={sportObject.id}
                  sportObject={sportObject}
                  sportTitle={sport.title}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
