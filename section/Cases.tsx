"use client";

import FadeOnScroll from "../components/animations/FadeOnScroll";
import { MagicCard } from "../components/animations/magicui/magic-card";
import TitleDark from "../components/ui/TitleDark";
import { caseStudies } from "../data.json";
import styles from "./Cases.module.scss";

export default function Cases() {
  return (
    <section className={styles.cases} id="work">
      <FadeOnScroll>
        <TitleDark
          category="our work"
          title="Case Studies"
          description="Real projects, real results"
          descriptionStyles=""
          className=""
        />
      </FadeOnScroll>

      <div className={styles.cardsGrid}>
        {caseStudies.map((card, index) => (
          <MagicCard key={`case-${index}`} className={styles.card}>
            <img
              src={card.image}
              alt={card.category}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h2 className={styles.category}>{card.category}</h2>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.description}>{card.description}</p>
              <div className={styles.tags}>
                {card.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </MagicCard>
        ))}
      </div>
    </section>
  );
}