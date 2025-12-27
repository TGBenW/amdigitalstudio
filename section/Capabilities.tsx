"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import FadeLeft from "../components/animations/FadeLeft";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import FadeRight from "../components/animations/FadeRight";
import ElementPullUp from "../components/animations/magicui/element-pull-up";
import TextRevealByWord from "../components/animations/magicui/text-reveal";
import Button from "../components/ui/Button";
import FakeButton from "../components/ui/FakeButton";
import TitleDark from "../components/ui/TitleDark";
import { capabilitiesButtons, capabilitiesCards } from "../data.json";
import styles from "./Capabilities.module.scss";

export default function Capabilities() {
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
      capabilitiesButtons.map((item, index) => (
        <FakeButton key={index} className={styles.capButton} text={item.name} />
      )),
    []
  );

  return (
    <div className={styles.capabilities} id="services">
      <TitleDark category="our services" title="" />

      <div className={styles.textReveal} ref={textRevealRef}>
        <div className={styles.textRevealInner}>
          {revealDisabled ? (
            <span className={styles.textRevealStatic}>What we can build for you...</span>
          ) : (
            <TextRevealByWord text="What we can build for you..." />
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        <ElementPullUp elements={elements} />
      </div>

      <div className={styles.intro}>
        <FadeLeft>
          <div className={styles.left}>
            <span className={styles.category}>8+ YEARS EXPERIENCE</span>
            <h1>Designing and shipping fast marketing websites and web products</h1>
          </div>
        </FadeLeft>

        <FadeRight>
          <div className={styles.right}>
            <p>
              From first draft to launch, we build conversion-focused websites with analytics, integrations, and payments. Clean custom code when performance, speed, and flexibility matter.
            </p>
            <a href="#pricing">
              <Button text="See Pricing" className={styles.btn} />
            </a>
          </div>
        </FadeRight>
      </div>

      <div className={styles.grid}>
        {capabilitiesCards.map((card, index) => (
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