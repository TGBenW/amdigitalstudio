"use client";

import { useEffect, useRef, useState } from "react";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import { useI18n } from "../lib/i18n";
import Button from "../components/ui/Button";
import FakeButton from "../components/ui/FakeButton";
import TitleDark from "../components/ui/TitleDark";
import styles from "./Pricing.module.scss";

export default function Pricing() {
  const { t, data } = useI18n();
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const totalSlides = data.pricingCards.length;

  const [activeSlide, setActiveSlide] = useState(0);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(totalSlides > 1);

  useEffect(() => {
    const grid = cardsGridRef.current;
    if (!grid) return;

    let raf = 0;

    const updateSliderState = () => {
      const maxScroll = Math.max(0, grid.scrollWidth - grid.clientWidth);
      const scrollLeft = grid.scrollLeft;

      setCanGoPrev(scrollLeft > 8);
      setCanGoNext(scrollLeft < maxScroll - 8);

      if (grid.clientWidth > 0) {
        const nextSlide = Math.round(scrollLeft / grid.clientWidth);
        const boundedSlide = Math.min(totalSlides - 1, Math.max(0, nextSlide));
        setActiveSlide(boundedSlide);
      }
    };

    const requestUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateSliderState);
    };

    requestUpdate();

    grid.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(grid);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      grid.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    const grid = cardsGridRef.current;
    if (!grid) return;

    const boundedIndex = Math.min(totalSlides - 1, Math.max(0, index));
    grid.scrollTo({
      left: boundedIndex * grid.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.pricing} id="pricing">
      <FadeOnScroll>
        <div className={styles.titleWrap}>
          <TitleDark
            category={t.pricing.category}
            title={t.pricing.title}
            description={t.pricing.description}
          />
        </div>
      </FadeOnScroll>

      <div className={styles.cardsWrap}>
        <div className={styles.cardsGrid} ref={cardsGridRef}>
          {data.pricingCards.map((card, index) => {
            const featured = Boolean(card.featured);
            const hasBadge = Boolean(card.badge);

            return (
              <FadeOnScroll key={index} delay={index * 0.15}>
                <article
                  className={`${styles.card} ${hasBadge ? styles.withBadge : ""}`}
                >
                  {hasBadge && (
                    <FakeButton
                      text={card.badge!}
                      className={`${styles.badge} ${
                        featured ? styles.badgeFeatured : styles.badgeNormal
                      }`}
                    />
                  )}

                  <header className={styles.cardHeader}>
                    <div className={styles.titleRow}>
                      <h2>{card.title}</h2>
                    </div>

                    <p className={styles.cardDesc}>{card.description}</p>
                  </header>

                  <div className={styles.priceSection}>
                    <div className={styles.price}>{card.price}</div>
                    <p className={styles.note}>{card.note}</p>
                  </div>

                  <div className={styles.features}>
                    <ul>
                      {card.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex}>
                          <img src={card.star} alt="" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.btnContainer}>
                      <Button
                        text={t.pricing.cardCta}
                        href="#faq"
                        className={`${styles.cardBtn} ${styles.cardBtnGhost}`}
                      />
                    </div>
                  </div>
                </article>
              </FadeOnScroll>
            );
          })}
        </div>

        {totalSlides > 1 && (
          <div className={styles.mobileControls} aria-label="Pricing slider controls">
            <button
              type="button"
              className={`${styles.sliderBtn} ${!canGoPrev ? styles.sliderBtnDisabled : ""}`}
              onClick={() => goToSlide(activeSlide - 1)}
              disabled={!canGoPrev}
              aria-label="Previous pricing card"
            >
              ←
            </button>

            <div className={styles.sliderDots}>
              {data.pricingCards.map((_, index) => (
                <button
                  key={`pricing-dot-${index}`}
                  type="button"
                  className={`${styles.sliderDot} ${activeSlide === index ? styles.sliderDotActive : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to pricing card ${index + 1}`}
                  aria-current={activeSlide === index ? "true" : "false"}
                />
              ))}
            </div>

            <button
              type="button"
              className={`${styles.sliderBtn} ${!canGoNext ? styles.sliderBtnDisabled : ""}`}
              onClick={() => goToSlide(activeSlide + 1)}
              disabled={!canGoNext}
              aria-label="Next pricing card"
            >
              →
            </button>
          </div>
        )}
      </div>

      <FadeOnScroll>
        <div className={styles.custom}>
          <h3>{t.pricing.customTitle}</h3>
          <p>
            {t.pricing.customDescriptionTop}
            <br />
            {t.pricing.customDescriptionBottom}
          </p>
          <Button text={t.pricing.customCta} className={styles.customBtn} href="#faq" />
        </div>
      </FadeOnScroll>
    </section>
  );
}
