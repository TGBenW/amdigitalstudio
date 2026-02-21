"use client";

import FadeUp from "../components/animations/FadeUp";
import { useI18n } from "../lib/i18n";
import StarBackground from "../components/animations/StarBackground";
import Button from "../components/ui/Button";
import styles from "./Hero.module.scss";

export default function Hero() {
  const { t } = useI18n();

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <FadeUp delay={0}>
          <h1 className={styles.title}>
            {t.hero.lineTop} <br />
            <span className={styles.highlight}>{t.hero.highlightOne}</span>{" "}
            {t.hero.connector}{" "}
            <span className={styles.highlight}>{t.hero.highlightTwo}</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className={styles.subtitle}>{t.hero.subtitle}</p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className={styles.location}>{t.hero.location}</p>
        </FadeUp>
        <FadeUp delay={0.4}>
          <Button text={t.header.cta} className={styles.cta} href="#faq" />
        </FadeUp>

        {/* Glow effect background */}
        <div className={`glow ${styles.glow}`}></div>

        {/* Stars background */}
        <StarBackground />
      </div>
    </div>
  );
}
