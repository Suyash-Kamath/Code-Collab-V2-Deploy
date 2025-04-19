import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null); // Success state
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the email and name inputs
    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate a successful subscription (e.g., API call)
    console.log(`Newsletter subscription submitted with name: ${name}, email: ${email}`);

    // Show success message
    setSuccess('Thank you for subscribing!');

    // Clear the form
    setName('');
    setEmail('');
    setError('');

    // Optionally, hide the success message after a few seconds
    setTimeout(() => setSuccess(null), 5000);
  };

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
    <section id="contact" className="py-20">
      <div className="container px-4 mx-auto">
        <div
          ref={(el) => (elementsRef.current[0] = el)}
          className="max-w-3xl mx-auto animate-on-scroll"
        >
          <div className="glass-card rounded-2xl border border-white/20 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gradient-to-br from-primary to-accent p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="mb-4 text-white/90">
                  Subscribe to our newsletter to receive product updates, coding
                  tips, and exclusive offers.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    New feature announcements
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Coding tips and best practices
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Exclusive subscriber discounts
                  </li>
                </ul>
              </div>
              <div className="p-8 flex items-center">
                <form onSubmit={formHandler} className="w-full">
                  <h3 className="text-xl font-medium mb-4">
                    Join our newsletter
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-red-500 text-center mt-2">{error}</p>
                    )}
                    {success && (
                      <p className="text-xs text-green-500 text-center mt-2">{success}</p>
                    )}
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Subscribe
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
