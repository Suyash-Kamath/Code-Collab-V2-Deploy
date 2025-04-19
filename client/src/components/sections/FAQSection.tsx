
import { useRef, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How many people can collaborate simultaneously?",
    answer:
      "Our platform is designed to handle multiple users collaborating in real-time. The Basic plan allows up to 3 collaborators, while Pro and Enterprise plans support unlimited team members working together simultaneously with no performance degradation.",
  },
  {
    question: "Is my code secure on your platform?",
    answer:
      "Yes, security is our top priority. All data is encrypted both in transit and at rest. Your code is only accessible to those you explicitly invite to your project. We also offer additional security features like 2FA and private rooms for sensitive projects.",
  },
  {
    question: "Do I need to download any software?",
    answer:
      "No, Code Collab is fully web-based and works in any modern browser. There's nothing to download or install, making it accessible from any device with an internet connection. This ensures a consistent experience across all platforms.",
  },
  {
    question: "What programming languages are supported?",
    answer:
      "We support syntax highlighting and auto-completion for over 40 programming languages, including JavaScript, Python, Ruby, Java, C++, Go, PHP, HTML/CSS, TypeScript, and many more. New languages are regularly added based on user requests.",
  },
  {
    question: "Can I use Code Collab offline?",
    answer:
      "Yes, Code Collab has an offline mode that allows you to continue working even without an internet connection. Your changes will automatically sync when you reconnect. This feature is available on all paid plans.",
  },
  {
    question: "How does the video conferencing feature work?",
    answer:
      "Our integrated video conferencing allows team members to communicate face-to-face without leaving the platform. It supports screen sharing, which is perfect for code reviews and pair programming. This feature is included in the Pro and Enterprise plans.",
  },
];

const FAQSection = () => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="py-20 ">
      <div className="container px-4 mx-auto">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="text-center mb-16 animate-on-scroll"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our platform, features, and
            subscription plans.
          </p>
        </div>

        <div
          ref={(el) => (elementsRef.current[1] = el)}
          className="max-w-3xl mx-auto animate-on-scroll"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl border border-border overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
