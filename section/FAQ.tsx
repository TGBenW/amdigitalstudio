"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
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
import TitleLight from "../components/ui/TitleLight";
import { faqData } from "../data.json";
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

const MESSENGERS = [
  { icon: FaTelegram, href: "https://t.me/yourusername", label: "Telegram" },
  { icon: FaWhatsapp, href: "https://wa.me/yourphone", label: "WhatsApp" },
  { icon: FaDiscord, href: "https://discord.gg/yourserver", label: "Discord" },
];

const SOCIALS = [
  { icon: FaXTwitter, href: "https://x.com/yourusername", label: "X" },
  { icon: FaInstagram, href: "https://instagram.com/yourusername", label: "Instagram" },
  { icon: FaGithub, href: "https://github.com/yourusername", label: "GitHub" },
];

export default function FAQ() {
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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email";
        return undefined;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateFile = (file: File): string | undefined => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "File type not supported. Use JPG, PNG, GIF, WebP, PDF, or DOC";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File is too large. Maximum size is 10MB";
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof TouchedFields]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    const error = validateFile(selectedFile);
    if (error) {
      setErrors((prev) => ({ ...prev, file: error }));
      return;
    }
    setFile(selectedFile);
    setErrors((prev) => ({ ...prev, file: undefined }));
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const removeFile = () => {
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

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setFile(null);
    setTouched({ name: false, email: false, message: false });
    setErrors({});

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className={styles.faq} id="faq">
      <FadeUp>
        <TitleLight
          title="FAQ & Contact"
          description="Common questions and a direct line to us"
        />
      </FadeUp>

      <div className={styles.container}>
        <div className={styles.faqColumn}>
          <h3 className={styles.columnTitle}>Frequently Asked</h3>
          <div className={styles.faqList}>
            {faqData.map((faq, index) => (
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

        <div className={styles.contactColumn}>
          <h3 className={styles.columnTitle}>Get in Touch</h3>
          
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.contactBlock}>
              <p className={styles.contactLabel}>For project inquiries</p>
              <a href="mailto:hello@amdigital.studio" className={styles.contactLink}>
                <VscMail className={styles.contactIcon} />
                <span>hello@amdigital.studio</span>
              </a>
              <p className={styles.responseTime}>Usually reply within 24 hours</p>
            </div>

            <div className={styles.contactBlock}>
              <p className={styles.contactLabel}>Quick chat? Message us directly</p>
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
              <p className={styles.contactLabel}>Follow our work</p>
              <div className={styles.socialLinks}>
                {SOCIALS.map((item) => (
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
          </motion.div>

          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
                className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ""}`}
              />
              <span className={styles.errorText}>
                {touched.name && errors.name ? errors.name : ""}
              </span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="your@email.com"
                className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ""}`}
              />
              <span className={styles.errorText}>
                {touched.email && errors.email ? errors.email : ""}
              </span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell us about your project..."
                rows={5}
                className={`${styles.textarea} ${touched.message && errors.message ? styles.inputError : ""}`}
              />
              <span className={styles.errorText}>
                {touched.message && errors.message ? errors.message : ""}
              </span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Attachment <span className={styles.optional}>(optional)</span>
              </label>
              {!file ? (
                <div
                  className={`${styles.dropzone} ${isDragging ? styles.dropzoneDragging : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileInputChange}
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx"
                    className={styles.fileInput}
                  />
                  <VscCloudUpload className={styles.uploadIcon} />
                  <p className={styles.dropzoneText}>
                    Drag & drop or <span>browse</span>
                  </p>
                  <p className={styles.dropzoneHint}>
                    JPG, PNG, GIF, WebP, PDF, DOC up to 10MB
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
                    onClick={removeFile}
                    className={styles.removeFile}
                    aria-label="Remove file"
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
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className={styles.spinner} />
              ) : isSubmitted ? (
                "Message Sent!"
              ) : (
                "Send Message"
              )}
            </motion.button>

            {isSubmitted && (
              <motion.p
                className={styles.successText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thanks! We'll get back to you within 1-2 business days.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}