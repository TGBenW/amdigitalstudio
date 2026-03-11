"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import { useI18n } from "../lib/i18n";
import TitleLight from "../components/ui/TitleLight";
import styles from "./BeautifulWorks.module.scss";

function buildImageCandidates(src: string) {
  const matched = src.match(/\.(png|jpe?g|svg)$/i);
  const base = matched ? src.slice(0, -matched[0].length) : src;
  const currentExtension = matched ? matched[1].toLowerCase() : "png";
  const extensions = [currentExtension, "png", "jpg", "jpeg", "svg"];
  const uniqueExtensions = Array.from(new Set(extensions));

  return uniqueExtensions.map((extension) => `${base}.${extension}`);
}

function shuffleImages<T>(items: T[]) {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }

  return next;
}

export default function BeautifulWorks() {
  const { t, data } = useI18n();
  const [orderedImages, setOrderedImages] = useState(data.worksImages);

  useEffect(() => {
    setOrderedImages(shuffleImages(data.worksImages));
  }, [data.worksImages]);

  const carouselImages = useMemo(() => orderedImages.concat(orderedImages), [orderedImages]);

  return (
    <div id="selected-work">
      <FadeOnScroll>
        <TitleLight
          title={t.beautifulWorks.title}
          description={t.beautifulWorks.description}
          descriptionStyles={styles.descriptionSpacing}
        />
      </FadeOnScroll>
      <div className={styles.grid}>
        {carouselImages.map((image, index) => {
          const imageCandidates = buildImageCandidates(image.src);

          return (
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
              <div className={`${styles.imageFrame} ${index % 2 === 0 ? styles.columnOffset : ""}`}>
                <img
                  src={imageCandidates[0]}
                  alt={image.alt}
                  className={styles.image}
                  onError={(event) => {
                    const target = event.currentTarget;
                    const nextIndex = Number(target.dataset.fallbackIndex ?? "1");

                    if (nextIndex >= imageCandidates.length) {
                      return;
                    }

                    target.dataset.fallbackIndex = String(nextIndex + 1);
                    target.src = imageCandidates[nextIndex];
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
