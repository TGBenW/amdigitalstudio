"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { 
  VscClose, 
  VscCloudUpload, 
  VscMail 
} from "react-icons/vsc";
import { 
  FaTelegram, 
  FaWhatsapp, 
  FaXTwitter, 
  FaInstagram, 
  FaGithub, 
  FaDiscord 
} from "react-icons/fa6";
import FadeUp from "../components/animations/FadeUp";
import { type Language, useI18n } from "../lib/i18n";
import TitleLight from "../components/ui/TitleLight";
import styles from "./FAQ.module.scss";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
  file?: string;
};

type TouchedFields = {
  name: boolean;
  email: boolean;
  message: boolean;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const CONTACT_FORM_ENABLED = false;

const FORM_DISABLED_MESSAGE: Record<Language, string> = {
  en: "Contact form is temporarily disabled. Please use email above.",
  ru: "Форма временно отключена. Используйте email выше.",
  lv: "Kontaktforma īslaicīgi atspējota. Lūdzu, izmantojiet e-pastu augstāk.",
};

const MESSENGERS = [
  { icon: FaTelegram, href: "https://t.me/am_digital_studio", label: "Telegram", active: true },
  { icon: FaWhatsapp, href: "https://wa.me/37123204492", label: "WhatsApp", active: true },
  { icon: FaDiscord, href: "https://discord.com/users/554564355035889665", label: "Discord", active: true },
];

const SOCIALS = [
  { icon: FaXTwitter, href: "", label: "X", active: false },
  { icon: FaInstagram, href: "", label: "Instagram", active: false },
  { icon: FaGithub, href: "https://github.com/TGBenW", label: "GitHub", active: true },
];

export default function FAQ() {
  const { t, data, language } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const faqColumnRef = useRef<HTMLDivElement | null>(null);
  const contactColumnRef = useRef<HTMLDivElement | null>(null);
  const activeTemplateRef = useRef("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    message: false,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return t.faq.validation.nameRequired;
        if (value.trim().length < 2)
          return t.faq.validation.nameShort;
        return undefined;
      case "email":
        if (!value.trim()) return t.faq.validation.emailRequired;
        if (!validateEmail(value)) return t.faq.validation.emailInvalid;
        return undefined;
      case "message":
        if (!value.trim()) return t.faq.validation.messageRequired;
        if (value.trim().length < 10)
          return t.faq.validation.messageShort;
        return undefined;
      default:
        return undefined;
    }
  };

  const validateFile = (file: File): string | undefined => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return t.faq.validation.fileType;
    }
    if (file.size > MAX_FILE_SIZE) {
      return t.faq.validation.fileSize;
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!CONTACT_FORM_ENABLED) return;

    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError("");

    if (touched[name as keyof TouchedFields]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!CONTACT_FORM_ENABLED) return;

    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!CONTACT_FORM_ENABLED) return;

    setSubmitError("");
    const error = validateFile(selectedFile);
    if (error) {
      setErrors((prev) => ({ ...prev, file: error }));
      return;
    }
    setFile(selectedFile);
    setErrors((prev) => ({ ...prev, file: undefined }));
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!CONTACT_FORM_ENABLED) return;

    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!CONTACT_FORM_ENABLED) return;

    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!CONTACT_FORM_ENABLED) return;

    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!CONTACT_FORM_ENABLED) return;

    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const removeFile = () => {
    if (!CONTACT_FORM_ENABLED) return;

    setSubmitError("");
    setFile(null);
    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!CONTACT_FORM_ENABLED) {
      setSubmitError(FORM_DISABLED_MESSAGE[language]);
      return;
    }

    if (!validateForm()) return;

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("message", formData.message.trim());
      payload.append("lang", language);

      if (file) {
        payload.append("file", file);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const errorMessage =
          body && typeof body.error === "string"
            ? body.error
            : t.faq.validation.submitFallback;
        throw new Error(errorMessage);
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setFile(null);
      setTouched({ name: false, email: false, message: false });
      setErrors({});

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setIsSubmitted(false);
      setSubmitError(
        error instanceof Error
          ? error.message
          : t.faq.validation.submitFallback
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const left = faqColumnRef.current;
    const right = contactColumnRef.current;

    if (!container || !left || !right) return;

    let raf = 0;

    const MIN_RIGHT_WIDTH = 280;
    const MAX_LEFT_FR = 1.9;
    const STEP = 0.05;

    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

    const balanceColumns = () => {
      if (!isDesktop()) {
        if (activeTemplateRef.current) {
          container.style.removeProperty("grid-template-columns");
          activeTemplateRef.current = "";
        }
        return;
      }

      const previousTemplate = container.style.gridTemplateColumns;
      let bestUnderOrEqual: { diff: number; template: string } | null = null;
      let bestOver: { diff: number; template: string } | null = null;

      for (let leftFr = 1.0; leftFr <= MAX_LEFT_FR; leftFr += STEP) {
        const rightFr = Math.max(0.35, 2 - leftFr);
        const template = `minmax(0, ${leftFr.toFixed(2)}fr) minmax(0, ${rightFr.toFixed(2)}fr)`;
        container.style.gridTemplateColumns = template;

        const rightWidth = right.getBoundingClientRect().width;
        if (rightWidth < MIN_RIGHT_WIDTH) {
          continue;
        }

        const leftHeight = left.getBoundingClientRect().height;
        const rightHeight = right.getBoundingClientRect().height;
        const diff = leftHeight - rightHeight;

        // Prefer layouts where left side is not longer (diff <= 0), closest to zero.
        if (diff <= 0) {
          if (!bestUnderOrEqual || diff > bestUnderOrEqual.diff) {
            bestUnderOrEqual = { diff, template };
          }
          continue;
        }

        // Fallback: if perfect/under match is impossible, use the smallest positive overflow.
        if (!bestOver || diff < bestOver.diff) {
          bestOver = { diff, template };
        }
      }

      const bestTemplate =
        bestUnderOrEqual?.template ?? bestOver?.template ?? previousTemplate;

      if (activeTemplateRef.current !== bestTemplate && bestTemplate) {
        container.style.gridTemplateColumns = bestTemplate;
        activeTemplateRef.current = bestTemplate;
      } else {
        if (bestTemplate) {
          container.style.gridTemplateColumns = bestTemplate;
        }
      }
    };

    const scheduleBalance = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(balanceColumns);
    };

    const ro = new ResizeObserver(scheduleBalance);
    ro.observe(container);
    ro.observe(left);
    ro.observe(right);

    window.addEventListener("resize", scheduleBalance, { passive: true });

    scheduleBalance();
    const delayed = window.setTimeout(scheduleBalance, 250);
    const late = window.setTimeout(scheduleBalance, 700);
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
    fontsReady?.then(() => scheduleBalance()).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(delayed);
      window.clearTimeout(late);
      ro.disconnect();
      window.removeEventListener("resize", scheduleBalance);
    };
  }, [
    file,
    isSubmitted,
    submitError,
    errors.name,
    errors.email,
    errors.message,
    errors.file,
    language,
  ]);

  return (
    <section className={styles.faq} id="faq">
      <FadeUp>
        <TitleLight
          title={t.faq.title}
          description={t.faq.description}
        />
      </FadeUp>

      <div className={styles.container} ref={containerRef}>
        <div className={styles.faqColumn} ref={faqColumnRef}>
          <h3 className={styles.columnTitle}>{t.faq.leftTitle}</h3>
          <div className={styles.faqList}>
            {data.faqData.map((faq, index) => (
              <motion.div
                key={index}
                className={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className={styles.question}>{faq.question}</h4>
                <p className={styles.answer}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.contactColumn} ref={contactColumnRef}>
          <h3 className={styles.columnTitle}>{t.faq.rightTitle}</h3>
          
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={`${styles.contactBlock} ${styles.contactBlockPrimary}`}>
              <p className={styles.contactLabel}>{t.faq.inquiriesLabel}</p>
              <a href={`mailto:${t.common.contactEmail}`} className={styles.contactLink}>
                <VscMail className={styles.contactIcon} />
                <span>{t.common.contactEmail}</span>
              </a>
              <p className={styles.responseTime}>{t.faq.replyTime}</p>
            </div>

            <div className={styles.contactGrid}>
              <div className={styles.contactBlock}>
                <p className={styles.contactLabel}>{t.faq.quickChatLabel}</p>
                <div className={styles.socialLinks}>
                  {MESSENGERS.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={item.label}
                    >
                      <item.icon />
                    </a>
                  ))}
                </div>
              </div>

              <div className={styles.contactBlock}>
                <p className={styles.contactLabel}>{t.faq.followLabel}</p>
                <div className={styles.socialLinks}>
                  {SOCIALS.map((item) =>
                    item.active ? (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={item.label}
                      >
                        <item.icon />
                      </a>
                    ) : (
                      <span
                        key={item.label}
                        className={`${styles.socialLink} ${styles.socialLinkDisabled}`}
                        aria-label={`${item.label} (coming soon)`}
                        title={`${item.label} (coming soon)`}
                      >
                        <item.icon />
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className={`${styles.form} ${!CONTACT_FORM_ENABLED ? styles.formDisabled : ""}`}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.inputRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  {t.faq.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  disabled={!CONTACT_FORM_ENABLED}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t.faq.form.namePlaceholder}
                  className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ""}`}
                />
                <span className={styles.errorText}>
                  {touched.name && errors.name ? errors.name : ""}
                </span>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  {t.faq.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled={!CONTACT_FORM_ENABLED}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t.faq.form.emailPlaceholder}
                  className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ""}`}
                />
                <span className={styles.errorText}>
                  {touched.email && errors.email ? errors.email : ""}
                </span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                {t.faq.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                disabled={!CONTACT_FORM_ENABLED}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t.faq.form.messagePlaceholder}
                rows={4}
                className={`${styles.textarea} ${touched.message && errors.message ? styles.inputError : ""}`}
              />
              <span className={styles.errorText}>
                {touched.message && errors.message ? errors.message : ""}
              </span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t.faq.form.attachment} <span className={styles.optional}>{t.faq.form.optional}</span>
              </label>
              {!file ? (
                <div
                  className={`${styles.dropzone} ${isDragging ? styles.dropzoneDragging : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => {
                    if (!CONTACT_FORM_ENABLED) return;
                    document.getElementById("fileInput")?.click();
                  }}
                >
                  <input
                    type="file"
                    id="fileInput"
                    disabled={!CONTACT_FORM_ENABLED}
                    onChange={handleFileInputChange}
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx"
                    className={styles.fileInput}
                  />
                  <VscCloudUpload className={styles.uploadIcon} />
                  <p className={styles.dropzoneText}>
                    {t.faq.form.dropzonePrefix} <span>{t.faq.form.dropzoneAction}</span>
                  </p>
                  <p className={styles.dropzoneHint}>
                    {t.faq.form.dropzoneHint}
                  </p>
                </div>
              ) : (
                <div className={styles.filePreview}>
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileSize}>
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={!CONTACT_FORM_ENABLED}
                    onClick={removeFile}
                    className={styles.removeFile}
                    aria-label={t.faq.form.removeFile}
                  >
                    <VscClose />
                  </button>
                </div>
              )}
              <span className={styles.errorText}>
                {errors.file ? errors.file : ""}
              </span>
            </div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              disabled={!CONTACT_FORM_ENABLED || isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className={styles.spinner} />
              ) : isSubmitted ? (
                t.faq.form.sent
              ) : (
                t.faq.form.send
              )}
            </motion.button>

            {!CONTACT_FORM_ENABLED && (
              <p className={styles.formUnavailableText}>{FORM_DISABLED_MESSAGE[language]}</p>
            )}

            {isSubmitted && (
              <motion.p
                className={styles.successText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t.faq.form.success}
              </motion.p>
            )}

            {submitError && (
              <motion.p
                role="alert"
                className={styles.submitErrorText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitError}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
