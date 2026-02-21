"use client";

import { useEffect, useMemo, useState } from "react";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import { useI18n } from "../lib/i18n";
import Marquee from "../components/animations/magicui/marquee";
import TitleDark from "../components/ui/TitleDark";
import styles from "./Testimonial.module.scss";

type Review = {
  name: string;
  meta: string; // 1-2 words
  body: string;
  img: string;
};

function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
}

const ReviewCard = ({ img, name, meta, body }: Review) => {
  return (
    <figure className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <img
          className={styles.avatar}
          src={img}
          alt=""
          width={40}
          height={40}
          decoding="async"
          loading="eager"
        />
        <div className={styles.reviewInfo}>
          <figcaption className={styles.name}>{name}</figcaption>
          <p className={styles.meta}>{meta}</p>
        </div>
      </div>
      <blockquote className={styles.body}>{body}</blockquote>
    </figure>
  );
};

export default function Testimonial() {
  const { t } = useI18n();
  const [ready, setReady] = useState(false);

  const reviews = t.testimonial.reviews;
  const looped = useMemo(() => [...reviews, ...reviews], [reviews]);

  useEffect(() => {
    let alive = true;

    const urls = Array.from(new Set(reviews.map((r) => r.img)));

    preloadImages(urls).then(() => {
      if (!alive) return;
      setReady(true);
    });

    return () => {
      alive = false;
    };
  }, [reviews]);

  return (
    <div className={styles.testimonial}>
      <FadeOnScroll>
        <TitleDark
          category={t.testimonial.category}
          title={t.testimonial.title}
          description={t.testimonial.description}
          descriptionStyles={styles.descOpacity}
        />
      </FadeOnScroll>

      <div className={styles.inner}>
        <div
          className={styles.marqueeContainer}
          style={{ opacity: ready ? 1 : 0 }}
          aria-hidden={!ready}
        >
          <Marquee pauseOnHover className={styles.marquee}>
            {looped.map((review, index) => (
              <ReviewCard key={`${review.name}-${review.meta}-${index}`} {...review} />
            ))}
          </Marquee>

          <div className={styles.fadeLeft} />
          <div className={styles.fadeRight} />
        </div>

        {!ready && <div className={styles.loadingSpacer} aria-hidden="true" />}
      </div>
    </div>
  );
}
