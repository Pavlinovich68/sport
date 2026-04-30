import Image from "next/image";
import Link from "next/link";
import type { SportObjectContent } from "@/lib/homeContent";
import styles from "./SportObjectCard.module.scss";

type SportObjectCardProps = {
  sportObject: SportObjectContent;
  sportTitle: string;
};

function getDescriptionExcerpt(text: string) {
  const [firstParagraph] = text.split("\n\n");

  return firstParagraph ?? text;
}

function getObjectFeatureLabels(features: string) {
  const labels = [
    "Учебно-тренировочный",
    "Физкультурно-оздоровительный",
    "Соревновательный",
    "Частный",
    "Открытый",
    "Крытый",
  ];

  return labels.filter((label) => features.includes(label)).slice(0, 3);
}

function getPriceLines(sportObject: SportObjectContent) {
  return sportObject.paidServices.slice(0, 2).map((service) => {
    const amount = Number(service.price);
    const safeAmount = Number.isFinite(amount) ? amount : 0;

    return `${safeAmount.toLocaleString("ru-RU")} рублей`;
  });
}

export default function SportObjectCard({
  sportObject,
  sportTitle,
}: SportObjectCardProps) {
  const featureLabels = getObjectFeatureLabels(sportObject.features);
  const priceLines = getPriceLines(sportObject);

  return (
    <article className={styles.card} id={`sport-object-${sportObject.slug}`}>
      <div className={styles.media}>
        <Image
          src={sportObject.image}
          alt={sportObject.name}
          fill
          sizes="(max-width: 760px) 100vw, (max-width: 1240px) 50vw, 340px"
          className={styles.image}
        />
        <div className={styles.overlay} />
        <div className={styles.mediaBadges}>
          <span className={styles.primaryBadge}>{sportTitle}</span>
          <span className={styles.secondaryBadge}>
            {sportObject.paidServices.length} услуги
          </span>
        </div>
        <div className={styles.ratingBadge}>
          <span className={styles.stars}>★★★★★</span>
          <span>спортивный объект</span>
        </div>
      </div>

      <div className={styles.body}>
        <h2 className={styles.title}>{sportObject.name}</h2>
        <p className={styles.subtitle}>Спортивный объект для регулярных занятий</p>

        <div className={styles.infoList}>
          <p className={styles.infoItem}>
            <span className={styles.infoIcon}>•</span>
            <span>{sportObject.address}</span>
          </p>
          <p className={styles.infoItem}>
            <span className={styles.infoIcon}>•</span>
            <span>{sportObject.workingHours}</span>
          </p>
        </div>

        <div className={styles.divider} />

        <div className={styles.tags}>
          {featureLabels.map((label) => (
            <span key={label} className={styles.tag}>
              {label}
            </span>
          ))}
        </div>

        <p className={styles.description}>
          {getDescriptionExcerpt(sportObject.description)}
        </p>

        <div className={styles.priceBlock}>
          {priceLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.actions}>
          <button type="button" className={styles.enrollButton}>
            Записаться
          </button>
          <Link href={`#sport-object-${sportObject.slug}`} className={styles.moreLink}>
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}
