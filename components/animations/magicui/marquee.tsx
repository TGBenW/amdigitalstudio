"use client";

import { cn } from "../../../lib/utils";
import styles from "./marquee.module.scss";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        styles.marquee,
        vertical ? styles.vertical : styles.horizontal,
        pauseOnHover && styles.pauseOnHover,
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              styles.content,
              vertical ? styles.contentVertical : styles.contentHorizontal,
              !vertical && styles.animateMarquee,
              vertical && styles.animateMarqueeVertical,
              reverse && styles.reverse
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
