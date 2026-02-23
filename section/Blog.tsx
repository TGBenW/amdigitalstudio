"use client";

import FadeOnScroll from "../components/animations/FadeOnScroll";
import { MagicCard } from "../components/animations/magicui/magic-card";
import { useI18n } from "../lib/i18n";
import TitleDark from "../components/ui/TitleDark";
import styles from "./Blog.module.scss";

export default function Blog() {
  const { t, data } = useI18n();

  return (
    <section className={styles.blog} id="blog">
      <FadeOnScroll>
        <TitleDark
          category={t.blog.category}
          title={t.blog.title}
          description={t.blog.description}
          descriptionStyles=""
          className=""
        />
      </FadeOnScroll>

      <div className={styles.bentoGrid}>
        {data.blogPosts.map((card, index) => (
          <MagicCard
            key={`blog-${index}`}
            className={`${styles.card} ${index === 0 ? styles.cardFeatured : styles.cardSmall}`}
          >
            <div className={styles.cardImageWrapper}>
              <img
                src={card.image}
                alt={card.category}
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.category}>{card.category}</h2>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.description}>{card.description}</p>
            </div>
          </MagicCard>
        ))}
      </div>
    </section>
  );
}
