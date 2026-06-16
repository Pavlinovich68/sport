import Image from "next/image";
import styles from "./CoachCard.module.scss";

type CoachCardProps = {
  address: string;
  availability: string;
  fullName: string;
  image: string;
  rank: string;
};

export default function CoachCard({
  address,
  availability,
  fullName,
  image,
  rank,
}: CoachCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.photoWrap}>
        <Image
          src={image}
          alt={fullName}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1240px) 50vw, 280px"
          className={styles.photo}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{fullName}</h3>
        <p className={styles.rank}>{rank}</p>
        <p className={styles.location}>
          {address}
          <span>{availability}</span>
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.moreButton}>
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
}
