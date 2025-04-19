
import  { useRef, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Create a Room",
    description:
      "Start a new project or coding session with a unique, secure room ID that you can share with collaborators.",
    image: "/ss/step-1.png",
  },
  {
    number: "02",
    title: "Invite Team Members",
    description:
      "Share your room link with teammates. They can join instantly without complex setup or registration.",
    image: "/ss/step-2.png",
  },
  {
    number: "03",
    title: "Code in Real-time",
    description:
      "Everyone can edit simultaneously. Changes appear instantly with visual indicators showing who's working where.",
    image: "/ss/step-3.png",
  },
  {
    number: "04",
    title: "Communicate & Collaborate",
    description:
      "Use integrated chat, video calls, and the interactive whiteboard to explain ideas and solve problems together.",
    image: "/ss/step-4.png",
  },
];

const HowItWorksSection = () => {
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
    <section id="how-it-works" className="py-20">
      <div className="container px-4 mx-auto">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="text-center mb-16 animate-on-scroll"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple Steps to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Get Started
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Begin collaborating in minutes with our intuitive platform designed
            for developers of all experience levels.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 hidden md:block"></div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (elementsRef.current[index + 1] = el)}
                className="flex flex-col md:flex-row items-center animate-on-scroll"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-16 lg:pr-24" : "md:order-1 md:pl-16 lg:pl-24"
                  } mb-6 md:mb-0 text-center md:text-left ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block ${
                      index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <span className="inline-block text-5xl font-bold text-primary/10 mb-2">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
<div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>
                <div
                  className={`relative w-full md:w-1/2 ${
                    index % 2 === 1 ? "md:order-0" : ""
                  }`}
                >
                  

                  <div
                    className={`glass-card rounded-xl p-6 ${
                      index % 2 === 0 ? "md:ml-6" : "md:mr-6"
                    }`}
                  >
                    <div className="bg-slate-800 rounded-lg overflow-hidden">
                      <div className="flex items-center px-3 py-2 border-b border-slate-700">
                        <div className="flex space-x-1.5 text-center">

                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="text-sm font-bold font-mono flex justify-center items-center h-3"> {step.title} </div>
                        </div>
                      </div>
                      <div className="p-4  bg-slate-900/90 aspect-video flex items-center justify-center">
                        <div className="text-center text-slate-400">
                          <img src={step.image} alt={step.title} className="max-w-full h-auto" />
                          {/* <div className="text-xs mt-1 italic">Interactive Preview</div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
