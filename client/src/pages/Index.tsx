
import  { useEffect } from "react";
import Navigation from "@/components/navigation/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
// import TestimonialsSection from "@/components/sections/TestimonialsSection";
// import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Footer from "@/components/navigation/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

const Index = () => {
  // Initialize scroll animation
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId || "");
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      {/* <TestimonialsSection /> */}
      {/* <PricingSection /> */}
      <FAQSection />
      <CTASection />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
