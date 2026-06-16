import Image from "next/image";
import styles from "./BroadcastCard.module.scss";

type BroadcastCardProps = {
  image: string;
  title: string;
};

export default function BroadcastCard({ image, title }: BroadcastCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.player}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1240px) 50vw, 280px"
          className={styles.image}
        />
        <div className={styles.shade} />
        <button type="button" className={styles.playButton} aria-label={title}>
          <span />
        </button>
      </div>

      <p className={styles.title}>{title}</p>
    </article>
  );
}
