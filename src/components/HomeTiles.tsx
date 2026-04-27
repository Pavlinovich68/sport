import type { HomeTile } from "@/lib/homeContent";
import styles from "@/app/(pages)/index.module.scss";

type HomeTilesProps = {
  items: HomeTile[];
};

export default function HomeTiles({ items }: HomeTilesProps) {
  return (
    <div className={styles.tiles}>
      {items.map((item) => (
        <article key={item.title} className={styles.tile}>
          <span className={styles.tileBadge}>{item.badge}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}
