"use client";

import { FaArrowRight } from "react-icons/fa";
import FadeLeft from "../components/animations/FadeLeft";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import FadeRight from "../components/animations/FadeRight";
import Button from "../components/ui/Button";
import { designData } from "../data.json";
import styles from "./HowItWork.module.scss";

export default function HowItWorks() {
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024;

  const AnimationComponentLeft = screenWidth < 768 ? FadeOnScroll : FadeLeft;
  const AnimationComponentRight = screenWidth < 768 ? FadeOnScroll : FadeRight;
  
  return (
    <div className={styles.howItWorks} id="process">
      <div className={styles.intro}>
        <AnimationComponentLeft>
          <div className={styles.left}>
            <span className={styles.category}>HOW WE WORK</span>
            <h1>
              Transparent project pricing, scoped upfront.
            </h1>
          </div>
        </AnimationComponentLeft>
        <AnimationComponentRight>
          <div className={styles.right}>
            <p>
              Brand, website, CMS, analytics, payments, integrations, automations.
              One team, one pipeline, ready to launch. Monthly support is optional.
            </p>
            <a href="#pricing">
              <Button text="See Pricing" className={styles.btn} />
            </a>
          </div>
        </AnimationComponentRight>
      </div>
      <div className={styles.steps}>
        {designData.map((item, index) => (
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
            <h3>Turnaround Time</h3>
            <ul>
              <li>
                <span className={styles.label}>Response time</span>
                <span>1-2 business days</span>
              </li>
              <li>
                <span className={styles.label}>Landing page</span>
                <span>1-3 weeks</span>
              </li>
              <li>
                <span className={styles.label}>Marketing site</span>
                <span>3-6 weeks</span>
              </li>
              <li className={styles.noBorder}>
                <span className={styles.label}>Web app / complex product</span>
                <span>6-10+ weeks</span>
              </li>
            </ul>
          </div>
        </FadeOnScroll>
        <FadeOnScroll delay={0.4}>
          <div className={styles.card}>
            <h3>Tools & Communication</h3>
            <ul>
              <li>
                <span className={styles.label}>Communication</span>
                <span>Your preferred messenger</span>
              </li>
              <li>
                <span className={styles.label}>Calls</span>
                <span>Google Meet / FaceTime</span>
              </li>
              <li>
                <span className={styles.label}>Project tracking</span>
                <span>Notion / Trello</span>
              </li>
              <li className={styles.noBorder}>
                <span className={styles.label}>Design & files</span>
                <span>Figma</span>
              </li>
            </ul>
          </div>
        </FadeOnScroll>
      </div>
    </div>
  );
}
