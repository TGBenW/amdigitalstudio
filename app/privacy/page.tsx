import type { Metadata } from "next";
import styles from "./privacy.module.scss";

export const metadata: Metadata = {
  title: "Privacy Policy | AM Digital Studio",
  description: "Privacy policy for AM Digital Studio.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a className={styles.backLink} href="/">
          Back to home
        </a>

        <h1>Privacy Policy</h1>
        <p className={styles.meta}>Effective date: February 13, 2026</p>

        <section>
          <h2>1. Who We Are</h2>
          <p>
            AM Digital Studio is a single-person business operated by its owner.
            The business is not yet registered as a legal company.
          </p>
        </section>

        <section>
          <h2>2. Data We Collect</h2>
          <p>
            We aim to collect as little data as possible. Our website is designed
            to operate with minimal processing.
          </p>
          <p>
            We only use analytics data that is necessary for Google Analytics 4
            (GA4) to measure website performance and usage trends.
          </p>
        </section>

        <section>
          <h2>3. Contact Form Data</h2>
          <p>
            If you use the contact form, the information you submit (name, email,
            message, and optional attachment) is processed only to handle your
            request.
          </p>
          <p>
            We do not intentionally store contact form submissions in a local
            database on this website.
          </p>
        </section>

        <section>
          <h2>4. Cookies and Analytics</h2>
          <p>
            We use GA4 to understand traffic and improve the website. GA4 may set
            analytics cookies and process technical usage data such as page views,
            device/browser details, and approximate location.
          </p>
          <p>
            We do not use analytics data to identify you personally.
          </p>
        </section>

        <section>
          <h2>5. Sharing of Data</h2>
          <p>
            We do not sell personal data. Data may be processed by service
            providers that are required for website hosting and analytics (for
            example, Vercel and Google Analytics).
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, or
            request deletion of personal data related to you. You may also object
            to or restrict certain processing.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            For privacy-related questions, contact:
            {" "}
            <a href="mailto:andreymanuilovweb@gmail.com">andreymanuilovweb@gmail.com</a>
          </p>
        </section>

        <section>
          <h2>8. Policy Updates</h2>
          <p>
            We may update this policy from time to time. Updates will be published
            on this page with a new effective date.
          </p>
        </section>
      </div>
    </main>
  );
}
