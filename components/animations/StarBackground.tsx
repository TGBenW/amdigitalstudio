"use client";

import { Variants, motion } from "framer-motion";
import styles from "./StarBackground.module.scss";

const starVariants: Variants = {
  floating1: {
    x: [0, 50],
    y: [0, -100],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
  floating2: {
    x: [-100, 0],
    y: [0, -150],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
  floating3: {
    x: [100, 0],
    y: [-10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
  flicker: {
    opacity: [0.1, 1, 0.1],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export default function StarBackground() {
  return (
    <div>
      {/* Right Star */}
      <motion.div
        className={styles.starRight}
        variants={starVariants}
        animate={{ ...starVariants.floating1, ...starVariants.flicker }}
      >
        <img src="/assets/Star.svg" alt="Star" className={styles.starLarge} />
      </motion.div>
      {/* Left Star */}
      <motion.div
        className={styles.starLeft}
        variants={starVariants}
        animate={{ ...starVariants.floating2, ...starVariants.flicker }}
      >
        <img src="/assets/Star.svg" alt="Star" className={styles.starSmall} />
      </motion.div>
      {/* Bottom Star */}
      <motion.div
        className={styles.starBottom}
        variants={starVariants}
        animate={{ ...starVariants.floating3, ...starVariants.flicker }}
      >
        <img src="/assets/Star.svg" alt="Star" className={styles.starMedium} />
      </motion.div>
    </div>
  );
}
