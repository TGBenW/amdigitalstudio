"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FadeDown from "../components/animations/FadeDown";
import { useI18n } from "../lib/i18n";
import styles from "./Stack.module.scss";

const SPEED_PX_PER_SEC = 90;

export default function Brands() {
  const { t, data } = useI18n();
  const prefersReducedMotion = useReducedMotion();

  const setRef = useRef<HTMLDivElement | null>(null);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // ширина одного набора (включая gap и padding-right в .items)
        const w = el.scrollWidth;
        setSetWidth(w);
      });
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const duration = useMemo(() => {
    if (!setWidth) return 0;
    return setWidth / SPEED_PX_PER_SEC;
  }, [setWidth]);

  const trackVars = useMemo(() => {
    return {
      // CSS vars
      ["--set-width" as any]: `${setWidth}px`,
      ["--duration" as any]: `${duration}s`,
    };
  }, [setWidth, duration]);

  return (
    <div className={styles.brands}>
      <div className={styles.header}>
        <motion.hr
          initial={{ translateX: "-50%", opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "linear", delay: 1 }}
          className={styles.lineLeft}
        />
        <FadeDown delay={0.6}>
          <h2>{t.stack.title}</h2>
        </FadeDown>
        <motion.hr
          initial={{ translateX: "50%", opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "linear", delay: 1 }}
          className={styles.lineRight}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.carousel}
      >
        <div
          className={[
            styles.track,
            setWidth ? styles.trackReady : "",
            prefersReducedMotion ? styles.trackReduced : "",
          ].join(" ")}
          style={setWidth ? trackVars : undefined}
          aria-hidden={false}
        >
          <div className={styles.items} ref={setRef}>
            {data.techStack.map(({ name, src }, index) => (
              <div key={`${name}-${index}`} className={styles.item}>
                <img src={src} alt={`${name} logo`} />
                <span>{name}</span>
              </div>
            ))}
          </div>

          <div className={styles.items} aria-hidden="true">
            {data.techStack.map(({ name, src }, index) => (
              <div key={`${name}-dup-${index}`} className={styles.item}>
                <img src={src} alt="" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className={styles.footer}>
        <p>
          {t.stack.footerLineOne}
          <br className={styles.brDesktop} />
          {t.stack.footerLineTwo}
        </p>
      </div>
    </div>
  );
}
