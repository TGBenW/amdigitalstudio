"use client";

import FadeOnScroll from "../components/animations/FadeOnScroll";
import { MagicCard } from "../components/animations/magicui/magic-card";
import TitleDark from "../components/ui/TitleDark";
import { blogPosts } from "../data.json";
import styles from "./Blog.module.scss";

export default function Blog() {
  return (
    <section className={styles.blog} id="blog">
      <FadeOnScroll>
        <TitleDark
          category="insights"
          title="Blog"
          description="Tips, guides, and thoughts on web development"
          descriptionStyles=""
          className=""
        />
      </FadeOnScroll>

      <div className={styles.bentoGrid}>
        {blogPosts.map((card, index) => (
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