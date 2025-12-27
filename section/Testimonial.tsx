"use client";

import { useEffect, useMemo, useState } from "react";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import Marquee from "../components/animations/magicui/marquee";
import TitleDark from "../components/ui/TitleDark";
import styles from "./Testimonial.module.scss";

type Review = {
  name: string;
  meta: string; // 1-2 words
  body: string;
  img: string;
};

const reviews: Review[] = [
  {
    name: "TinyTunes Space",
    meta: "Launch",
    body: "Fast, clean, and exactly on point. The site feels premium, loads instantly, and the whole flow is easy to understand.",
    img: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=160&auto=format&fit=crop",
  },
  {
    name: "voyagesetmoi",
    meta: "Website",
    body: "Full rebuild with better structure and visuals. Media is optimized, updates are painless, and everything feels more modern.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
  },
  {
    name: "Georgiy Gudovskiy",
    meta: "Full Site",
    body: "Built from scratch: design, development, photo and video handling, optimization, and a smooth final delivery.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
  },
  {
    name: "NDA Client",
    meta: "Automation",
    body: "Internal reporting automations saved hundreds of hours. Reliable Python scripts, clean outputs, and stable maintenance.",
    img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=160&auto=format&fit=crop",
  },
  {
    name: "NDA Client",
    meta: "Analytics",
    body: "Tracking finally makes sense. Events are structured, dashboards are clear, and decisions are based on real behavior.",
    img: "https://plus.unsplash.com/premium_photo-1661778906556-82ec2021c533?q=80&w=160&auto=format&fit=crop",
  },
  {
    name: "NDA Client",
    meta: "Payments",
    body: "Payments flow is smooth and stable. Stripe integration works reliably, with clean back office logic and clear scope.",
    img: "https://images.unsplash.com/photo-1614890107637-fe96d74acf4b?q=80&w=160&auto=format&fit=crop",
  },
  {
    name: "NDA Client",
    meta: "Performance",
    body: "Noticeably faster site with better Lighthouse results. Practical improvements that actually move the needle.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
  },
  {
    name: "NDA Client",
    meta: "Support",
    body: "Quick fixes, clear communication, and updates that do not break things. Easy to work with long term.",
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=160&auto=format&fit=crop",
  },
];

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
  const [ready, setReady] = useState(false);

  const looped = useMemo(() => [...reviews, ...reviews], []);

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
  }, []);

  return (
    <div className={styles.testimonial}>
      <FadeOnScroll>
        <TitleDark
          category="TESTIMONIALS"
          title="What Clients Say"
          description="A few short notes from recent projects."
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