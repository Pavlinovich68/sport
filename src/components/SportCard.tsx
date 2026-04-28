import Image from "next/image";
import Link from "next/link";
import type { HomeCarouselSlide } from "@/lib/homeContent";
import styles from "./SportCard.module.scss";

type SportCardProps = {
  sport: HomeCarouselSlide;
};

export default function SportCard({ sport }: SportCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={sport.image}
          alt={sport.title}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1240px) 50vw, 340px"
          className={styles.image}
        />
        <div className={styles.mediaShade} />
        <div className={styles.tagsPanel}>
          {sport.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <h2 className={styles.title}>{sport.title}</h2>
        <p className={styles.description}>{sport.summary}</p>
        <Link href={`/sports/${sport.id}`} className={styles.link}>
          Подробнее
        </Link>
      </div>
    </article>
  );
}
