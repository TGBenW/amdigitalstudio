"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import FadeLeft from "../components/animations/FadeLeft";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import FadeRight from "../components/animations/FadeRight";
import ElementPullUp from "../components/animations/magicui/element-pull-up";
import TextRevealByWord from "../components/animations/magicui/text-reveal";
import { useI18n } from "../lib/i18n";
import Button from "../components/ui/Button";
import FakeButton from "../components/ui/FakeButton";
import TitleDark from "../components/ui/TitleDark";
import styles from "./Capabilities.module.scss";

export default function Capabilities() {
  const { t, data } = useI18n();
  const [revealDisabled, setRevealDisabled] = useState(false);

  const textRevealRef = useRef<HTMLDivElement | null>(null);
  const wasSeenRef = useRef(false);

  useEffect(() => {
    const el = textRevealRef.current;
    if (!el) return;

    let scrollListening = false;

    const stopScrollListening = () => {
      if (!scrollListening) return;
      window.removeEventListener("scroll", onScroll);
      scrollListening = false;
    };

    const onScroll = () => {
      if (!wasSeenRef.current) return;

      const rect = el.getBoundingClientRect();

      // "полный скролл" считаем так: блок уже был виден и теперь ушел вверх за экран
      if (rect.bottom < 0) {
        setRevealDisabled(true);
        stopScrollListening();
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        wasSeenRef.current = true;

        if (!scrollListening) {
          window.addEventListener("scroll", onScroll, { passive: true });
          scrollListening = true;
        }

        // дальше наблюдать не нужно
        io.disconnect();
      },
      { threshold: 0.4 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      stopScrollListening();
    };
  }, []);

  const elements = useMemo(
    () =>
      data.capabilitiesButtons.map((item, index) => (
        <FakeButton key={index} className={styles.capButton} text={item.name} />
      )),
    [data.capabilitiesButtons]
  );

  return (
    <div className={styles.capabilities} id="services">
      <TitleDark category={t.capabilities.category} title="" />

      <div className={styles.textReveal} ref={textRevealRef}>
        <div className={styles.textRevealInner}>
          {revealDisabled ? (
            <span className={styles.textRevealStatic}>{t.capabilities.revealText}</span>
          ) : (
            <TextRevealByWord text={t.capabilities.revealText} />
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        <ElementPullUp elements={elements} />
      </div>

      <div className={styles.intro}>
        <FadeLeft>
          <div className={styles.left}>
            <span className={styles.category}>{t.capabilities.experienceLabel}</span>
            <h1>{t.capabilities.experienceTitle}</h1>
          </div>
        </FadeLeft>

        <FadeRight>
          <div className={styles.right}>
            <p>{t.capabilities.description}</p>
            <Button text={t.capabilities.cta} className={styles.btn} href="#pricing" />
          </div>
        </FadeRight>
      </div>

      <div className={styles.grid}>
        {data.capabilitiesCards.map((card, index) => (
          <div className={styles.card} key={index}>
            <FadeOnScroll delay={index * 0.1}>
              <img src={card.image} alt={card.title} />
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </FadeOnScroll>
          </div>
        ))}
      </div>
    </div>
  );
}
