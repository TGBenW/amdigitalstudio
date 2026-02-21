"use client";

import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import FadeLeft from "../components/animations/FadeLeft";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import FadeRight from "../components/animations/FadeRight";
import { useI18n } from "../lib/i18n";
import Button from "../components/ui/Button";
import styles from "./HowItWork.module.scss";

export default function HowItWorks() {
  const { t, data } = useI18n();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
    };

    update();
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  const AnimationComponentLeft = isMobile ? FadeOnScroll : FadeLeft;
  const AnimationComponentRight = isMobile ? FadeOnScroll : FadeRight;
  
  return (
    <div className={styles.howItWorks} id="process">
      <div className={styles.intro}>
        <AnimationComponentLeft>
          <div className={styles.left}>
            <span className={styles.category}>{t.howItWorks.category}</span>
            <h1>{t.howItWorks.title}</h1>
          </div>
        </AnimationComponentLeft>
        <AnimationComponentRight>
          <div className={styles.right}>
            <p>{t.howItWorks.description}</p>
            <Button text={t.howItWorks.cta} className={styles.btn} href="#pricing" />
          </div>
        </AnimationComponentRight>
      </div>
      <div className={styles.steps}>
        {data.designData.map((item, index) => (
          <div key={index} className={styles.stepWrap}>
            <FadeOnScroll delay={index * 0.2}>
              <div className={styles.step}>
                <div className={styles.stepHeader}>
                  <div className={styles.stepIcon}>
                    <img src={item.src} alt={item.name} />
                  </div>

                  {index < 2 && (
                    <div className={styles.stepArrow}>
                      <hr />
                      <FaArrowRight className={styles.arrowIcon} />
                    </div>
                  )}
                </div>

                <h2>{item.title}</h2>
                <p>{item.caption}</p>
              </div>
            </FadeOnScroll>
          </div>
        ))}
      </div>


      {/* Turnaround Times & Tools */}
      <div className={styles.cards}>
        <FadeOnScroll delay={0.2}>
          <div className={styles.card}>
            <h3>{t.howItWorks.turnaroundTitle}</h3>
            <ul>
              {t.howItWorks.turnaroundRows.map((row, index) => (
                <li key={row.label} className={index === t.howItWorks.turnaroundRows.length - 1 ? styles.noBorder : ""}>
                  <span className={styles.label}>{row.label}</span>
                  <span>{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeOnScroll>
        <FadeOnScroll delay={0.4}>
          <div className={styles.card}>
            <h3>{t.howItWorks.toolsTitle}</h3>
            <ul>
              {t.howItWorks.toolsRows.map((row, index) => (
                <li key={row.label} className={index === t.howItWorks.toolsRows.length - 1 ? styles.noBorder : ""}>
                  <span className={styles.label}>{row.label}</span>
                  <span>{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeOnScroll>
      </div>
    </div>
  );
}
