
import  { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
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
    <section className="py-20 bg-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl"></div>

      <div className="container px-4 mx-auto relative">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-white/20 shadow-xl animate-on-scroll"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Development Workflow?
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of developers who are already experiencing the future
            of collaborative coding. Start for free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/join"><Button size="lg" className="group">
              Start Coding Now{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button></a>
            <a href="/join"><Button
              size="lg"
              variant="secondary"
              className="border-primary/0"
            >
              Schedule a Demo
            </Button></a>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No downloads required. Works in your browser on any device.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
