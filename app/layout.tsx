import type { Metadata } from "next";
import "../styles/styles.scss";

export const metadata: Metadata = {
  title: "AM Digital Studio | Web Design & Development",
  description:
    "AM Digital Studio - We design and build fast marketing websites, add analytics, payments, CMS, and automations. Based in Riga, Latvia. Working worldwide.",
  icons: {
    icon: "/assets/Star.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
