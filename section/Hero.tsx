"use client";

import FadeUp from "../components/animations/FadeUp";
import StarBackground from "../components/animations/StarBackground";
import Button from "../components/ui/Button";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <FadeUp delay={0}>
            Get a website that is <br />
            <span className={styles.highlight}>clear, fast,</span> and{" "}
            <span className={styles.highlight}>brings you leads</span>
          </FadeUp>
        </h1>
        <p className={styles.subtitle}>
          <FadeUp delay={0.2}>
            We design and build fast marketing websites, add analytics,
            payments, CMS, and automations.
          </FadeUp>
        </p>
        <p className={styles.location}>
          <FadeUp delay={0.3}>
            Based in Riga, Latvia. Working worldwide.
          </FadeUp>
        </p>
        <FadeUp delay={0.4}>
          <Button text="Get a Quote" className={styles.cta} />
        </FadeUp>

        {/* Glow effect background */}
        <div className={`glow ${styles.glow}`}></div>

        {/* Stars background */}
        <StarBackground />
      </div>
    </div>
  );
}
