"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import FadeDown from "../components/animations/FadeDown";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import styles from "./Header.module.scss";

interface HeaderItem {
  name: string;
  id: string;
}

const headerList: HeaderItem[] = [
  { name: "Process", id: "process" },
  { name: "Services", id: "services" },
  { name: "Pricing", id: "pricing" },
  { name: "Work", id: "work" },
  { name: "FAQ", id: "faq" },
];

const DIRECTION_DEADZONE = 6;

// sticky должен начать исчезать раньше у верха
const FADE_OUT_END_PX = 80;
// за сколько пикселей добираем opacity до 1.0
const FADE_RANGE_PX = 160;

// зона у верхнего края окна, при наведении в которую мы показываем меню
const HOVER_REVEAL_PX = 26;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // причина показа от скролла
  const [showByScroll, setShowByScroll] = useState(false);
  // причина показа от мышки (верх экрана или наведение на сам sticky)
  const [showByHover, setShowByHover] = useState(false);

  const [stickyOpacity, setStickyOpacity] = useState(0);

  const lastYRef = useRef(0);
  const lastMouseYRef = useRef<number>(9999);
  const isPointerOverStickyRef = useRef(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const calcOpacity = (y: number) => {
    return y <= FADE_OUT_END_PX ? 0 : clamp((y - FADE_OUT_END_PX) / FADE_RANGE_PX, 0, 1);
  };

  useEffect(() => {
    const initialY = typeof window !== "undefined" ? window.scrollY : 0;
    lastYRef.current = initialY;

    const initialOpacity = calcOpacity(initialY);
    setStickyOpacity(initialOpacity);
    setShowByScroll(initialY > FADE_OUT_END_PX);

    const onScroll = () => {
      const y = window.scrollY;
      const lastY = lastYRef.current;
      const delta = y - lastY;

      const goingUp = delta < -DIRECTION_DEADZONE;
      const goingDown = delta > DIRECTION_DEADZONE;

      const opacity = calcOpacity(y);
      setStickyOpacity(opacity);

      // логика для showByScroll
      if (y <= FADE_OUT_END_PX) {
        setShowByScroll(false);
      } else if (goingUp) {
        setShowByScroll(true);
      } else if (goingDown) {
        setShowByScroll(false);
      }

      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Показ sticky по наведению мышкой к верхнему краю экрана (desktop only)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      lastMouseYRef.current = e.clientY;

      // если курсор у верхней границы, показываем
      if (e.clientY <= HOVER_REVEAL_PX) {
        setShowByHover(true);
        return;
      }

      // если курсор НЕ у верхней границы и НЕ находится над sticky, тогда скрываем (если это была единственная причина)
      if (!isPointerOverStickyRef.current) {
        setShowByHover(false);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Запрещаем скролл body при открытом мобильном меню
  useEffect(() => {
    if (!isMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMenuOpen]);

  const DesktopInner = () => (
    <>
      <Logo />
      <div className={styles.nav}>
        <div className={styles.links}>
          {headerList.map((item) => (
            <a className={styles.link} href={`#${item.id}`} key={item.id}>
              {item.name}
            </a>
          ))}
        </div>
        <Button text="Get a Quote" className={styles.navBtn} />
      </div>
    </>
  );

  // Итог: показываем sticky, если есть хотя бы одна причина, но только когда он не должен быть полностью исчезнувшим у верха
  const shouldShowSticky = stickyOpacity > 0 && (showByScroll || showByHover);

  const stickyWrapperStyle: React.CSSProperties = {
    opacity: stickyOpacity,
    pointerEvents: shouldShowSticky && stickyOpacity >= 0.06 ? "auto" : "none",
  };

  const stickyContentStyle: React.CSSProperties = {
    transform: `translateY(${(1 - stickyOpacity) * -10}px)`,
  };

  return (
    <div className={styles.header} id="header">
      <FadeDown>
        <div className={styles.staticHeader}>
          <div className={styles.content}>
            <DesktopInner />
          </div>
        </div>
      </FadeDown>

      <div
        className={`${styles.stickyHeader} ${shouldShowSticky ? styles.show : ""}`}
        style={stickyWrapperStyle}
        aria-hidden={!shouldShowSticky}
        onMouseEnter={() => {
          isPointerOverStickyRef.current = true;
          setShowByHover(true);
        }}
        onMouseLeave={() => {
          isPointerOverStickyRef.current = false;

          // если курсор уже не в верхней зоне, выключаем hover-причину
          if (lastMouseYRef.current > HOVER_REVEAL_PX) {
            setShowByHover(false);
          }
        }}
      >
        <div className={`${styles.content} ${styles.glass}`} style={stickyContentStyle}>
          <DesktopInner />
        </div>
      </div>

      <div className={styles.mobileToggle}>
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <div className={styles.burger}>
            <div className={`${styles.burgerLine} ${styles.top} ${isMenuOpen ? styles.active : ""}`} />
            <div className={`${styles.burgerLine} ${styles.bottom} ${isMenuOpen ? styles.active : ""}`} />
          </div>
        </button>
      </div>

      <div id="mobile-menu" className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        <ul>
          {headerList.map((item) => (
            <li key={item.id}>
              <a className={styles.mobileLink} href={`#${item.id}`} onClick={closeMenu}>
                {item.name}
              </a>
            </li>
          ))}
          <li className={styles.mobileBtnContainer}>
            <Button text="Get a Quote" className={styles.mobileBtn} />
          </li>
        </ul>
      </div>
    </div>
  );
}