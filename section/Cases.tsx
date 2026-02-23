"use client";

import FadeOnScroll from "../components/animations/FadeOnScroll";
import { MagicCard } from "../components/animations/magicui/magic-card";
import { useI18n } from "../lib/i18n";
import TitleDark from "../components/ui/TitleDark";
import styles from "./Cases.module.scss";

export default function Cases() {
  const { t, data } = useI18n();

  return (
    <section className={styles.cases} id="work">
      <FadeOnScroll>
        <TitleDark
          category={t.cases.category}
          title={t.cases.title}
          description={t.cases.description}
          descriptionStyles=""
          className=""
        />
      </FadeOnScroll>

      <div className={styles.cardsGrid}>
        {data.caseStudies.map((card, index) => (
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
