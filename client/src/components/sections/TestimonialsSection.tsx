
import  { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Code Collab has transformed how our remote development team works together. The real-time collaboration features and integrated communication tools have eliminated the need to switch between multiple apps.",
    author: "Sarah Johnson",
    title: "Lead Developer at TechCorp",
    rating: 5,
  },
  {
    quote:
      "The code editor is incredibly powerful, with perfect syntax highlighting and intelligent suggestions. Combined with the seamless collaboration, it's become an essential tool for our team.",
    author: "Michael Chen",
    title: "Software Engineer at StartupX",
    rating: 5,
  },
  {
    quote:
      "Teaching programming remotely was challenging until we discovered Code Collab. Now I can code alongside my students in real-time, making it much easier to demonstrate concepts and provide assistance.",
    author: "Dr. Emily Rodriguez",
    title: "Computer Science Professor",
    rating: 5,
  },
  {
    quote:
      "The whiteboard feature is a game-changer for explaining complex algorithms. Being able to draw, code, and communicate all in one platform has greatly improved our development workflow.",
    author: "David Kim",
    title: "CTO at InnovateTech",
    rating: 4,
  },
  {
    quote:
      "We've tried several collaborative coding tools, but Code Collab stands out with its low latency and reliable performance. Even with team members across different continents, coding together feels seamless.",
    author: "Priya Patel",
    title: "Technical Lead at GlobalDev",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const maxVisibleItems = 3;

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

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - maxVisibleItems : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - maxVisibleItems ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const visibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < maxVisibleItems; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  return (
    <section id="testimonials" className="py-20 bg-secondary/50">
      <div className="container px-4 mx-auto">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="text-center mb-16 animate-on-scroll"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Developers{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Say About Us
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how teams of all sizes are enhancing their development
            workflow with our collaborative platform.
          </p>
        </div>

        <div
          ref={(el) => (elementsRef.current[1] = el)}
          className="animate-on-scroll relative"
        >
          <div className="flex flex-col md:flex-row gap-6 overflow-hidden">
            {visibleTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className={`glass-card rounded-xl p-6 flex-1 transition-all duration-500 ${
                  isAnimating ? "opacity-50" : "opacity-100"
                }`}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="italic text-foreground/90 mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
