"use client";

import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import BeautifulWorks from "../section/BeautifulWorks";
import BlogAndCases from "../section/BlogAndCases";
import Stack from "../section/Stack";
import Capabilities from "../section/Capabilities";
import FAQ from "../section/FAQ";
import Footer from "../section/Footer";
import Header from "../section/Header";
import Hero from "../section/Hero";
import HowItWorks from "../section/HowItWork";
import Pricing from "../section/Pricing";
import Testimonial from "../section/Testimonial";

export default function HomePage() {
  return (
    <div className="bg-background">
      <div className="container">
        <Header />
        <div>
          <Hero />
          <Stack />
          <HowItWorks />
        </div>
      </div>
      <div className="bg-white">
        <div className="container">
          <BeautifulWorks />
        </div>
      </div>
      <div className="container">
        <Capabilities />
      </div>
      <div>
        <div>
          <Testimonial />
        </div>
      </div>
      <div className="container">
        <Pricing />
        <BlogAndCases />
      </div>
      <div className="bg-white">
        <div className="container">
          <FAQ />
        </div>
      </div>
      <div className="container">
        <Footer />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
