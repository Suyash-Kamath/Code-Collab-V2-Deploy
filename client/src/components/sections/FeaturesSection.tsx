
import   { useRef, useEffect } from "react";
import { Code, Users, MessageSquare, FileText, Lock, Zap } from "lucide-react";

const features = [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: "Advanced Code Editor",
    description:
      "Syntax highlighting, auto-completion, and error detection across all major programming languages.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Real-time Collaboration",
    description:
      "Multiple users can edit simultaneously with cursor tracking and conflict resolution.",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "Integrated Communication",
    description:
      "Chat, video conferencing, and an interactive whiteboard for seamless team coordination.",
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Smart File Management",
    description:
      "Project directories, version control, and templates to organize your work efficiently.",
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Secure Environment",
    description:
      "End-to-end encryption, secure authentication, and private collaborative sessions.",
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Low Latency Updates",
    description:
      "Experience changes in real-time with our high-performance synchronization engine.",
  },
];

const FeaturesSection = () => {
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
    <section id="features" className="py-20 bg-secondary/5">
      <div className="container px-4 mx-auto">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="text-center mb-16 animate-on-scroll"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
            KEY FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Code Together
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines powerful development tools with seamless
            collaboration features to enhance your team's productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (elementsRef.current[index + 1] = el)}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
