
import  { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <header
          className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
              isScrolled
                  ? "bg-gray/80 py-3 shadow-sm backdrop-blur-lg"
                  : "bg-transparent py-5"
          }`}
      >
          <div className="container mx-auto flex items-center justify-between px-4">
              <a href="/" className="flex items-center">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-semibold text-transparent">
                      Code Collab
                  </span>
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden items-center space-x-8 text-white md:flex">
                  <a
                      href="#features"
                      className="text-sm text-white transition-colors hover:text-primary"
                  >
                      Features
                  </a>
                  <a
                      href="#how-it-works"
                      className="text-sm text-white transition-colors hover:text-primary"
                  >
                      How It Works
                  </a>
                  {/* <a
            href="#pricing"
            className="text-sm text-white hover:text-primary transition-colors"
          >
            Pricing
          </a> */}
                  {/* <a
            href="#testimonials"
            className="text-sm text-white hover:text-primary transition-colors"
          >
            Testimonials
          </a> */}

                  {/* contact us */}
                  <a
                      href="#contact"
                      className="text-sm text-white transition-colors hover:text-primary"
                  >
                      Contact Us
                  </a>

                  {/* <a href="/login"> <Button
            variant="ghost"
            className="text-sm hover:bg-primary/10 hover:text-primary"
          >
            Log In
          </Button></a>
          <a href="/signup">
          <Button className="bg-primary hover:bg-primary/90 transition-colors">
            Sign Up
          </Button>
          </a> */}
                  <SignedOut>
                      <SignInButton />
                  </SignedOut>
                  <SignedIn>
                      <UserButton />
                  </SignedIn>
              </nav>

              {/* Mobile Menu Button */}
              <button
                  className="flex items-center md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                  {mobileMenuOpen ? (
                      <X className="h-6 w-6 " />
                  ) : (
                      <Menu className="h-6 w-6  " />
                  )}
              </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
              <div className="animate-fade-in absolute left-0 right-0 top-full border-b border-border bg-white/95 backdrop-blur-lg md:hidden">
                  <div className="container mx-auto flex flex-col space-y-4 px-4 py-4">
                      <a
                          href="#features"
                          className="py-2 text-foreground/80 transition-colors hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                      >
                          Features
                      </a>
                      <a
                          href="#how-it-works"
                          className="py-2 text-foreground/80 transition-colors hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                      >
                          How It Works
                      </a>
                      {/* <a
              href="#pricing"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a> */}
                      {/* <a
              href="#testimonials"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a> */}
                      <div className="flex flex-col space-y-3 pt-2">
                          {/* <a href="/login">
               <Button
                variant="ghost"
                className="w-full text-black justify-start hover:bg-primary hover:text-white"
              >
                Log In
              </Button></a>
              <a href="/signup">
              <Button className="w-full bg-primary hover:bg-primary/90 transition-colors">
                Sign Up
              </Button></a> */}
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                      </div>
                  </div>
              </div>
          )}
      </header>
  )
};

export default Navigation;
