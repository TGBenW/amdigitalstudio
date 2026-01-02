"use client";

import { motion, useInView, Variants } from "framer-motion";
import React, { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import styles from "./element-pull-up.module.scss";

interface ElementPullUpProps {
  elements: ReactNode[];
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
}

export default function ElementPullUp({
  elements,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
}: ElementPullUpProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={wrapperFramerProps}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={cn(styles.container, className)}
    >
      {elements.map((element, i) => (
        <motion.div
          key={i}
          variants={framerProps}
          className={styles.item}
        >
          {element}
        </motion.div>
      ))}
    </motion.div>
  );
}
