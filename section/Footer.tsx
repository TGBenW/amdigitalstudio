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
import { useI18n } from "../lib/i18n";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import styles from "./Footer.module.scss";

const socialLinks = [
  { href: "https://t.me/am_digital_studio", icon: FaTelegram, label: "Telegram", active: true },
  { href: "https://wa.me/37123204492", icon: FaWhatsapp, label: "WhatsApp", active: true },
  { href: "", icon: FaXTwitter, label: "X", active: false },
  { href: "", icon: FaInstagram, label: "Instagram", active: false },
  { href: "https://github.com/TGBenW", icon: FaGithub, label: "GitHub", active: true },
  { href: "https://discord.com/users/554564355035889665", icon: FaDiscord, label: "Discord", active: true },
];

export default function Footer() {
  const { t } = useI18n();
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
            {t.footer.heroTop}
            <br /> {t.footer.heroBottom}
          </h1>
          <div className={`glow ${styles.glowEffect}`}></div>
          <p className={styles.heroDescription}>
            {t.footer.heroDescription} <br /> {t.footer.heroDescriptionSecondLine}
          </p>
          <Button
            text={
              <span className={styles.ctaContent}>
                {t.footer.cta} <FaCircleArrowRight className={styles.ctaIcon} />
              </span>
            }
            className={styles.ctaBtn}
            href="#pricing"
          />
        </div>
      </motion.div>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerTop}>
            <div className={styles.footerLeft}>
              <Logo />
              <FadeOnScroll delay={0.2}>
                <p className={styles.footerDescription}>
                  {t.footer.description}
                </p>
              </FadeOnScroll>
            </div>
            <div className={styles.contactInfo}>
              <FadeOnScroll delay={0.3}>
                <a
                  href={`mailto:${t.common.contactEmail}`}
                  className={styles.emailLink}
                >
                  <HiOutlineMail size={20} /> {t.common.contactEmail}
                </a>
              </FadeOnScroll>
              <FadeOnScroll delay={0.5}>
                <ul className={styles.socialList}>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      {social.active ? (
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className={styles.socialLink}
                        >
                          <social.icon size={20} className={styles.socialIcon} />
                        </a>
                      ) : (
                        <span
                          aria-label={`${social.label} (coming soon)`}
                          title={`${social.label} (coming soon)`}
                          className={`${styles.socialLink} ${styles.socialLinkDisabled}`}
                        >
                          <social.icon size={20} className={styles.socialIcon} />
                        </span>
                      )}
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
          {t.footer.nav.map((link, index) => (
            <FadeOnScroll key={index} delay={index * 0.1}>
              <a href={link.href} className={styles.footerLink}>
                {link.text}
              </a>
            </FadeOnScroll>
          ))}
        </div>
        <div className={styles.footerRight}>
          <div className={styles.legalLinks}>
            <FadeOnScroll delay={0.5}>
              <a href="/privacy" className={styles.legalLink}>
                {t.footer.privacy}
              </a>
            </FadeOnScroll>
          </div>
          <FadeOnScroll delay={0.6}>
            <span className={styles.copyright}>{t.footer.copyright}</span>
          </FadeOnScroll>
        </div>
      </div>
    </div>
  );
}
