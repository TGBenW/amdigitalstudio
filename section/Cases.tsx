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
              alt={card.title}
              className={styles.cardImage}
              onError={(event) => {
                if (!card.fallbackImage) return;
                const target = event.currentTarget;
                if (target.dataset.fallbackApplied === "true") return;
                target.dataset.fallbackApplied = "true";
                target.src = card.fallbackImage;
              }}
            />
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <h2 className={styles.category}>{card.category}</h2>
                {card.actionUrl && (
                  <a
                    className={styles.liveButton}
                    href={card.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card.actionLabel ?? "Live"}
                  </a>
                )}
              </div>
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

      <FadeOnScroll>
        <div className={styles.custom}>
          <h3>{t.cases.customTitle}</h3>
          <p>{t.cases.customDescription}</p>
          <div className={styles.statuses}>
            <span className={styles.status}>{t.cases.statusMoreToCome}</span>
            <span className={styles.status}>{t.cases.statusInProgress}</span>
            <span className={styles.status}>{t.cases.statusComingSoon}</span>
          </div>
        </div>
      </FadeOnScroll>
    </section>
  );
}
