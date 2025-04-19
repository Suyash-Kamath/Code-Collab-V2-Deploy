
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    description: "Perfect for individuals and small projects",
    price: "Free",
    period: "Forever",
    features: [
      "Up to 3 collaborators",
      "5 projects",
      "Real-time code editing",
      "Basic syntax highlighting",
      "7-day version history",
      "Text chat",
    ],
    popular: false,
    buttonText: "Start Free",
    buttonVariant: "outline",
  },
  {
    name: "Pro",
    description: "Ideal for teams and professional projects",
    price: "$12",
    period: "per user / month",
    features: [
      "Unlimited collaborators",
      "Unlimited projects",
      "Advanced code editor",
      "Video conferencing",
      "Interactive whiteboard",
      "30-day version history",
      "Custom templates",
      "Priority support",
    ],
    popular: true,
    buttonText: "Get Started",
    buttonVariant: "default",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    period: "Contact for pricing",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom integration",
      "Advanced security features",
      "Admin controls",
      "Unlimited version history",
      "On-prem deployment option",
      "SLA guarantees",
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline",
  },
];

const PricingSection = () => {
  const [yearlyBilling, setYearlyBilling] = useState(true);
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
    <section id="pricing" className="py-20 bg-secondary/5">
      <div className="container px-4 mx-auto">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="text-center mb-16 animate-on-scroll"
        >
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
            PRICING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Pricing
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include core
            collaboration features to get you started.
          </p>

          <div className="flex items-center justify-center mb-8">
            <span
              className={`mr-3 text-sm ${
                !yearlyBilling ? "font-medium text-foreground" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <button
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                yearlyBilling ? "bg-primary" : "bg-muted"
              }`}
              onClick={() => setYearlyBilling(!yearlyBilling)}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  yearlyBilling ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`ml-3 text-sm ${
                yearlyBilling ? "font-medium text-foreground" : "text-muted-foreground"
              }`}
            >
              Yearly <span className="text-green-500 font-medium">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (elementsRef.current[index + 1] = el)}
              className={`glass-card rounded-xl p-6 border ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/10 relative"
                  : "border-border"
              } animate-on-scroll transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                  MOST POPULAR
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-4xl font-bold">
                    {plan.price === "Custom"
                      ? "Custom"
                      : yearlyBilling && plan.price !== "Free"
                      ? plan.price.replace("$", "$") + "0"
                      : plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-2 mb-1">
                      {plan.period !== "Forever" && yearlyBilling
                        ? plan.period.replace("month", "year")
                        : plan.period}
                    </span>
                  )}
                </div>
                {yearlyBilling && plan.price !== "Free" && plan.price !== "Custom" && (
                  <p className="text-green-500 text-sm mt-1">
                    Save 20% with annual billing
                  </p>
                )}
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  variant={plan.buttonVariant as "default" | "outline"}
                  className={`w-full ${
                    plan.buttonVariant === "default"
                      ? "bg-primary hover:bg-primary/90"
                      : "border-primary text-primary hover:bg-primary/10"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
