"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  FaTelegram, 
  FaWhatsapp, 
  FaXTwitter, 
  FaInstagram, 
  FaGithub, 
  FaDiscord,
  FaCircleArrowRight 
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import styles from "./Footer.module.scss";

const footerLinks = [
  { href: "#process", text: "Process" },
  { href: "#services", text: "Services" },
  { href: "#pricing", text: "Pricing" },
  { href: "#work", text: "Work" },
  { href: "#faq", text: "FAQ" },
];

const legalLinks = [
  { href: "/privacy", text: "Privacy Policy" },
];

const socialLinks = [
  { href: "https://t.me/yourusername", icon: FaTelegram, label: "Telegram" },
  { href: "https://wa.me/yourphone", icon: FaWhatsapp, label: "WhatsApp" },
  { href: "https://x.com/yourusername", icon: FaXTwitter, label: "X" },
  { href: "https://instagram.com/yourusername", icon: FaInstagram, label: "Instagram" },
  { href: "https://github.com/yourusername", icon: FaGithub, label: "GitHub" },
  { href: "https://discord.gg/yourserver", icon: FaDiscord, label: "Discord" },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [300, -100]);

  return (
    <div>
      <motion.div
        className={styles.footerHero}
        ref={containerRef}
        style={{ translateY }}
      >
        <div>
          <h1 className={styles.heroTitle}>
            Ready to build
            <br /> something great?
          </h1>
          <div className={`glow ${styles.glowEffect}`}></div>
          <p className={styles.heroDescription}>
            Let's talk about your project. <br /> Get a quote within 1-2 business days.
          </p>
          <a href="#pricing" className={styles.ctaLink}>
            <Button
              text={
                <span className={styles.ctaContent}>
                  Get a Quote <FaCircleArrowRight className={styles.ctaIcon} />
                </span>
              }
              className={styles.ctaBtn}
            />
          </a>
        </div>
      </motion.div>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerTop}>
            <div className={styles.footerLeft}>
              <Logo />
              <FadeOnScroll delay={0.2}>
                <p className={styles.footerDescription}>
                  AM Digital Studio - building fast, clear, conversion-focused
                  websites from Riga, Latvia. Working worldwide.
                </p>
              </FadeOnScroll>
            </div>
            <div className={styles.contactInfo}>
              <FadeOnScroll delay={0.3}>
                <a
                  href="mailto:hello@amdigitalstudio.com"
                  className={styles.emailLink}
                >
                  <HiOutlineMail size={20} /> hello@amdigitalstudio.com
                </a>
              </FadeOnScroll>
              <FadeOnScroll delay={0.5}>
                <ul className={styles.socialList}>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a 
                        href={social.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <social.icon size={20} className={styles.socialIcon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </FadeOnScroll>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.footerBottom}>
        <div className={styles.footerLinks}>
          {footerLinks.map((link, index) => (
            <FadeOnScroll key={index} delay={index * 0.1}>
              <a href={link.href} className={styles.footerLink}>
                {link.text}
              </a>
            </FadeOnScroll>
          ))}
        </div>
        <div className={styles.footerRight}>
          <div className={styles.legalLinks}>
            {legalLinks.map((link, index) => (
              <FadeOnScroll key={index} delay={0.5}>
                <a href={link.href} className={styles.legalLink}>
                  {link.text}
                </a>
              </FadeOnScroll>
            ))}
          </div>
          <FadeOnScroll delay={0.6}>
            <span className={styles.copyright}>© 2025 AM Digital Studio</span>
          </FadeOnScroll>
        </div>
      </div>
    </div>
  );
}