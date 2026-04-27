import type { HomeTile as HomeTileContent } from "@/lib/homeContent";
import styles from "@/app/(pages)/index.module.scss";

type HomeTileProps = {
  item: HomeTileContent;
};

export default function HomeTile({ item }: HomeTileProps) {
  return (
    <article className={styles.tile}>
      <span className={styles.tileBadge}>{item.badge}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}
