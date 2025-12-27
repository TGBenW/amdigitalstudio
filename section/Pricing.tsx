"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import Button from "../components/ui/Button";
import FakeButton from "../components/ui/FakeButton";
import TitleDark from "../components/ui/TitleDark";
import { pricingCards } from "../data.json";
import styles from "./Pricing.module.scss";

export default function Pricing() {
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.pricing} id="pricing" ref={sectionRef}>
      <FadeOnScroll>
        <div className={styles.titleWrap}>
          <TitleDark
            category="Transparent Pricing"
            title="Project based pricing, scoped upfront."
            description={`No surprises. Final quote depends on scope, content readiness, integrations, and timeline.`}
          />
        </div>
      </FadeOnScroll>

      <div className={styles.cardsWrap}>
        <div className={styles.cardsGrid}>
          {pricingCards.map((card, index) => {
            const featured = index === 1;

            return (
              <FadeOnScroll key={index} delay={index * 0.15}>
                <motion.article
                  className={`${styles.card} ${featured ? styles.featured : ""}`}
                  style={{ transformOrigin: "center" }}
                  animate={
                    isInView && !isMobile
                      ? { scale: featured ? 1.05 : 0.95 }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                >
                  <header className={styles.cardHeader}>
                    <div className={styles.titleRow}>
                      <h2>{card.title}</h2>

                      {card.badge && (
                        <FakeButton
                          text={card.badge}
                          className={`${styles.badge} ${
                            featured ? styles.badgeFeatured : styles.badgeNormal
                          }`}
                        />
                      )}
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
                        text="Get a Quote"
                        className={`${styles.cardBtn} ${
                          featured ? styles.cardBtnPrimary : styles.cardBtnGhost
                        }`}
                      />
                    </div>
                  </div>
                </motion.article>
              </FadeOnScroll>
            );
          })}
        </div>
      </div>

      <FadeOnScroll>
        <div className={styles.custom}>
          <h3>Need something custom?</h3>
          <p>
            Complex product sites and internal tools: 6+ weeks, custom quote.
            <br />
            Automation and reporting workflows with Python are available when it fits the scope.
          </p>
          <Button text="Talk About Your Project" className={styles.customBtn} />
        </div>
      </FadeOnScroll>
    </section>
  );
}