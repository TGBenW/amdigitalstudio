"use client";

import { motion } from "framer-motion";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import { useI18n } from "../lib/i18n";
import TitleLight from "../components/ui/TitleLight";
import styles from "./BeautifulWorks.module.scss";

export default function BeautifulWorks() {
  const { t, data } = useI18n();

  return (
    <div id="work">
      <FadeOnScroll>
        <TitleLight
          title={t.beautifulWorks.title}
          description={t.beautifulWorks.description}
          descriptionStyles={styles.descriptionSpacing}
        />
      </FadeOnScroll>
      <div className={styles.grid}>
        {data.worksImages.concat(data.worksImages).map((image, index) => (
          <motion.div
            key={index}
            initial={{ translateY: index % 2 === 0 ? "0%" : "-200%" }}
            animate={{ translateY: index % 2 === 0 ? "-200%" : "0%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className={index % 2 === 0 ? styles.columnOffset : ""}>
              <img
                src={image.src}
                alt={image.alt}
                className={styles.image}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
