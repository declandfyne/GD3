import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, MapPin, Phone, CheckCircle2, ChevronRight, Menu, X, Clock, Navigation, Mail, Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AppSkeleton = () => (
  <div className="min-h-screen bg-bone pt-32 px-6 lg:px-12 animate-pulse">
    {/* Navbar Skeleton */}
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-[2rem] w-[90%] max-w-5xl bg-concrete/20 border border-concrete/30">
      <div className="w-32 h-8 bg-concrete/30 rounded-full" />
      <div className="hidden md:flex gap-8">
        <div className="w-16 h-4 bg-concrete/30 rounded-full" />
        <div className="w-20 h-4 bg-concrete/30 rounded-full" />
        <div className="w-16 h-4 bg-concrete/30 rounded-full" />
      </div>
      <div className="w-32 h-10 bg-concrete/30 rounded-full" />
    </div>

    {/* Hero Skeleton */}
    <div className="max-w-7xl mx-auto h-[70vh] bg-concrete/20 rounded-[2rem] mb-24 flex flex-col justify-end p-12">
      <div className="w-1/2 h-8 bg-concrete/30 rounded-full mb-4" />
      <div className="w-3/4 h-16 bg-concrete/30 rounded-full mb-8" />
      <div className="w-1/3 h-4 bg-concrete/30 rounded-full mb-2" />
      <div className="w-1/4 h-4 bg-concrete/30 rounded-full mb-8" />
      <div className="flex gap-4">
        <div className="w-48 h-12 bg-concrete/30 rounded-full" />
        <div className="w-36 h-12 bg-concrete/30 rounded-full" />
      </div>
    </div>

    {/* Section Skeleton */}
    <div className="max-w-7xl mx-auto">
      <div className="w-1/3 h-10 bg-concrete/30 rounded-full mb-4" />
      <div className="w-2/3 h-4 bg-concrete/30 rounded-full mb-12" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-96 bg-concrete/20 rounded-[2rem] p-8 flex flex-col justify-between border border-concrete/10">
            <div>
              <div className="w-20 h-4 bg-concrete/30 rounded-full mb-6" />
              <div className="w-3/4 h-8 bg-concrete/30 rounded-full mb-4" />
              <div className="w-full h-4 bg-concrete/30 rounded-full mb-2" />
              <div className="w-5/6 h-4 bg-concrete/30 rounded-full" />
            </div>
            <div className="flex gap-2 mt-6">
              <div className="w-20 h-6 bg-concrete/30 rounded-full" />
              <div className="w-16 h-6 bg-concrete/30 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MagneticButton = ({ children, className = '', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden magnetic-btn group ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};

const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-[2rem] transition-all duration-300 w-[90%] max-w-5xl ${
          scrolled || menuOpen
            ? 'bg-bone/80 backdrop-blur-xl border border-concrete text-black shadow-premium'
            : 'bg-black/20 backdrop-blur-md text-bone shadow-lg'
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 font-heading font-bold text-xl tracking-tight">
          <img 
            src="/GalleryDesignLogo.svg" 
            alt="Gallery Design Logo" 
            className={`h-8 w-auto transition-all duration-300 ${scrolled || menuOpen ? 'brightness-0' : 'brightness-0 invert'}`} 
          />
          <span className="inline">Gallery Design</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="/#services" className="hover:-translate-y-[1px] transition-transform">Services</a>
          <a href="/#work" className="hover:-translate-y-[1px] transition-transform">Our Work</a>
          <a href="/#process" className="hover:-translate-y-[1px] transition-transform">Process</a>
          <Link to="/faq" className="hover:-translate-y-[1px] transition-transform">FAQ</Link>
        </div>

        <a href="/#contact" className="hidden md:block">
          <MagneticButton className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${scrolled || menuOpen ? 'bg-primary text-bone' : 'bg-bone text-black'}`}>
            Contact Us
          </MagneticButton>
        </a>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} className="text-black" /> : <Menu size={24} className={scrolled ? "text-black" : "text-white"} />}
        </button>
      </nav>

      <div 
        className={`fixed inset-0 z-40 bg-bone transition-transform duration-500 ease-in-out flex flex-col items-center justify-center gap-8 md:hidden ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <a href="/#services" onClick={() => setMenuOpen(false)} className="text-3xl font-heading text-black hover:text-primary transition-colors">Services</a>
        <a href="/#work" onClick={() => setMenuOpen(false)} className="text-3xl font-heading text-black hover:text-primary transition-colors">Our Work</a>
        <a href="/#process" onClick={() => setMenuOpen(false)} className="text-3xl font-heading text-black hover:text-primary transition-colors">Process</a>
        <Link to="/faq" onClick={() => setMenuOpen(false)} className="text-3xl font-heading text-black hover:text-primary transition-colors">FAQ</Link>
        <a href="/#contact" onClick={() => setMenuOpen(false)} className="mt-8">
          <MagneticButton className="px-8 py-4 bg-primary text-bone rounded-full text-lg font-medium">
            Contact Us
          </MagneticButton>
        </a>
      </div>
    </>
  );
};

const Hero = () => {
  const scope = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="relative h-[100dvh] w-full flex items-end pb-20 pt-32 px-6 lg:px-12 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero image2.jpg" 
          alt="Custom built walk in wardrobe" 
          className="w-full h-full object-cover opacity-60"
          fetchpriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="max-w-3xl">
          <h1 className="text-bone mb-6">
            <span className="block font-heading font-medium text-2xl md:text-4xl mb-2 hero-element">Beautiful storage for</span>
            <span className="block font-drama font-bold text-6xl md:text-8xl lg:text-9xl text-concrete leading-none uppercase tracking-tight hero-element">Your Home.</span>
          </h1>
          <p className="text-concrete/80 text-lg md:text-xl max-w-xl font-body hero-element mb-10">
            Creating gracefully organized spaces with custom wardrobes, elegant living room units, and clever storage that makes daily life a joy.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 hero-element">
            <a href="#contact">
              <MagneticButton className="px-8 py-4 bg-primary text-bone rounded-full font-medium inline-flex items-center gap-2">
                Contact Us <ArrowRight size={18} />
              </MagneticButton>
            </a>
            <a href="#services">
              <MagneticButton className="px-8 py-4 bg-white/10 backdrop-blur-md text-bone rounded-full font-medium hover:bg-white/20 transition-colors">
                View Services
              </MagneticButton>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-concrete/70 font-data text-xs uppercase tracking-wider hero-element">
          <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> 1. Visit Showroom</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> 2. Home Measure & Design</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> 3. Quote & Installation</div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [feedLogs, setFeedLogs] = useState(["Taking careful measurements...", "Looking at the space...", "Ready to begin."]);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const logs = ["Measuring your room", "Choosing the perfect finish", "Planning the new layout", "Drawing up the design", "Preparing for installation"];
      setFeedLogs(prev => {
        const next = [...prev, logs[Math.floor(Math.random() * logs.length)]];
        if (next.length > 4) next.shift();
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="pt-10 pb-12 md:pb-4 px-6 lg:px-12 bg-bone">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 max-w-3xl">
          <h2 className="font-heading text-4xl mb-4 text-black">Beautiful Solutions</h2>
          <p className="font-body text-black/60 text-lg mb-6">Every home is different. We design and build lovely storage that perfectly fits your space and makes everyday living feel effortless. From grand walk-in wardrobes to the smallest alcove shelving, we can solve any storage challenge.</p>
          <div className="flex flex-wrap gap-2">
            {["Walk-in Wardrobes", "Fitted Wardrobes", "TV Units", "Sliding Doors", "Shelving", "Home Office Storage", "Bedroom Storage", "Living Room Storage"].map((service) => (
              <span key={service} className="px-4 py-2 bg-concrete/20 rounded-full text-sm font-heading font-medium text-black border border-concrete/50">
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Static layout of offerings */}
          <div className="service-card bg-concrete/30 p-8 rounded-[2rem] border border-concrete flex flex-col justify-between min-h-[400px] hover:-translate-y-1 transition-transform">
            <div>
              <div className="font-data text-xs text-primary mb-4">[01] BEDROOM STORAGE</div>
              <h3 className="font-heading text-2xl mb-2 text-black">Fitted & Walk-In</h3>
              <p className="text-black/60 font-body">Crafted to fit your room perfectly, giving you the elegant and organized space you've always wanted.</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 bg-white rounded-full text-xs font-data border border-concrete">Sliding Doors</span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-data border border-concrete">Walk-in</span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-data border border-concrete">Fitted</span>
            </div>
          </div>

          {/* Card 2: Live Feed */}
          <div className="service-card bg-black text-bone p-8 rounded-[2rem] min-h-[400px] flex flex-col justify-between hover:-translate-y-1 transition-transform relative overflow-hidden">
            <div className="relative z-10">
              <div className="font-data text-xs text-primary mb-4">[02] LIVING & OFFICE</div>
              <h3 className="font-heading text-2xl mb-2">Custom TV Units & Desks</h3>
              <p className="text-bone/60 font-body">TV units, shelving, and comfortable home office spaces designed to blend seamlessly with your home's unique style.</p>
            </div>

            <div className="font-data text-sm flex flex-col gap-2 relative z-10">
              {feedLogs.map((log, i) => (
                <div key={i} className={`flex items-center gap-2 ${i === feedLogs.length - 1 ? 'text-concrete' : 'text-concrete/40'}`}>
                  <span>&gt;</span> {log}
                  {i === feedLogs.length - 1 && <span className="w-2 h-4 bg-primary inline-block animate-pulse" />}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Booking Route */}
          <div className="service-card bg-concrete/30 p-8 rounded-[2rem] border border-concrete flex flex-col justify-between min-h-[400px] hover:-translate-y-1 transition-transform">
            <div>
              <div className="font-data text-xs text-primary mb-4">[03] THE OUTCOME</div>
              <h3 className="font-heading text-2xl mb-2 text-black">A Simple Process</h3>
              <p className="text-black/60 font-body">We take care of everything, starting with a friendly chat at our showroom through to the beautiful final installation.</p>
            </div>
            <div className="bg-white rounded-2xl p-4 flex flex-col font-data text-xs text-black border border-concrete">
              <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary"/><span className="opacity-60">Showroom Visit</span></div>
              <div className="ml-1 w-0.5 h-3 bg-concrete" />
              <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary"/><span className="opacity-60">Home Measure & Design</span></div>
              <div className="ml-1 w-0.5 h-3 bg-concrete" />
              <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary"/><span className="opacity-60">Design Sign Off</span></div>
              <div className="ml-1 w-0.5 h-3 bg-concrete" />
              <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary"/><span className="opacity-60">Installation</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Work = () => {
  return (
    <section id="work" className="py-10 px-6 lg:px-12 bg-black text-bone">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-drama font-bold text-5xl md:text-7xl mb-12">Our Recent Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2rem] h-[600px] border border-white/10">
            <img src="/walkinwardrobe3.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Walk in wardrobe" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <span className="font-data text-white text-xs mb-2 uppercase">Beautiful Transformation</span>
              <h3 className="font-heading text-2xl md:text-3xl">Elegant Walk-in Wardrobe, Edinburgh</h3>
            </div>
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10">
              <img src="/tvunit3.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Living room storage" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">Living Space</span>
                <h3 className="font-heading text-xl">Beautiful TV Media Wall</h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10">
              <img src="/warm room.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Home office" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">Bedroom Storage</span>
                <h3 className="font-heading text-xl">Cozy Fitted Wardrobes</h3>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10">
              <img src="/backboard.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Bedroom features" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">Beautiful Finishes</span>
                <h3 className="font-heading text-xl">Custom Headboards</h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10">
              <img src="/walkinwardrobe2.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Walk in wardrobe detail" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">Smart Storage</span>
                <h3 className="font-heading text-xl">Shoe Display Solutions</h3>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-8 group relative overflow-hidden rounded-[2rem] h-[600px] border border-white/10">
            <img src="/Walkinwardrobe.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Walk in wardrobe" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <span className="font-data text-white text-xs mb-2 uppercase">Complete Room Fit-Out</span>
              <h3 className="font-heading text-2xl md:text-3xl">Bespoke Dressing Room</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card');
      
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 20%",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });

        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.3,
            filter: "blur(4px)",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="pt-4 pb-10 px-6 lg:px-12 bg-bone">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl mb-10 text-center">How It Works</h2>
        
        <div className="relative">
          {/* Card 1 */}
          <div className="process-card bg-white p-8 md:p-12 rounded-[2rem] border border-concrete shadow-premium mb-[5vh] flex flex-col md:flex-row gap-8 items-start relative z-10 w-full">
            <div className="font-data text-4xl text-concrete font-bold leading-none">01</div>
            <div>
              <h3 className="font-heading text-2xl mb-3">Visit Our Showroom</h3>
              <p className="text-black/70 font-body mb-6">The journey begins with a friendly visit to our showroom. Come and run your hands over our beautiful materials, see our craftsmanship up close, and chat with us about your ideas.</p>
              <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center animate-spin-slow">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="process-card bg-concrete/40 p-8 md:p-12 rounded-[2rem] border border-concrete shadow-premium mb-[5vh] flex flex-col md:flex-row gap-8 items-start relative z-20 w-full backdrop-blur-sm">
            <div className="font-data text-4xl text-white font-bold leading-none mix-blend-difference">02</div>
            <div>
              <h3 className="font-heading text-2xl mb-3">Home Measure & Design</h3>
              <p className="text-black/70 font-body mb-6">Next, one of our lovely designers will visit your home to take careful measurements. We'll then create a beautiful drawing of your new storage solution so you can see exactly how it will look.</p>
              <div className="w-full h-8 bg-white rounded flex items-center px-2 relative overflow-hidden">
                <div className="w-full h-[1px] bg-primary/20" />
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-primary/20 animate-[pulse_2s_infinite]" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="process-card bg-black text-bone p-8 md:p-12 rounded-[2rem] border border-black shadow-premium flex flex-col md:flex-row items-start relative z-30 w-full">
            <div className="font-data text-4xl text-concrete/20 font-bold leading-none">03</div>
            <div>
              <h3 className="font-heading text-2xl mb-3 text-bone">Clear Quote & Installation</h3>
              <p className="text-bone/70 font-body mb-6">We'll provide a clear, easy-to-understand price for your design. Once you're happy, our skilled and polite team will install your new furniture with care, leaving your home perfectly tidy.</p>
              <div className="flex items-center gap-2 text-green-400 font-data text-sm">
                <CheckCircle2 size={16} /> All Beautifully Done
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      date: "2 months ago",
      text: "Absolutely thrilled with our new walk-in wardrobe. The team was incredibly professional, polite, and the craftsmanship is outstanding. Highly recommend Gallery Design.",
      rating: 5
    },
    {
      name: "David Mitchell",
      date: "3 months ago",
      text: "From the initial showroom visit to the final installation, everything was seamless. The designer really understood what we needed, and the fitters were very tidy.",
      rating: 5
    },
    {
      name: "Emma Robertson",
      date: "5 months ago",
      text: "Beautiful fitted living room units! They transformed an awkward alcove into a stunning feature wall with loads of storage. Great communication throughout the process.",
      rating: 5
    }
  ];

  return (
    <section className="py-10 px-6 lg:px-12 bg-bone border-t border-concrete/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="font-heading text-4xl mb-4 text-black">Loved by our Customers</h2>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <span className="font-bold text-lg">5.0</span>
            </div>
            <p className="font-body text-black/80 font-medium mb-2">We focus on crafting beautiful storage with care and respect for your home.</p>
            <p className="font-body text-black/60 text-sm">Based on over 300+ reviews from happy homeowners.</p>
          </div>
          <MagneticButton className="px-6 py-3 border border-concrete rounded-full font-medium inline-flex items-center gap-2 hover:bg-black hover:text-white transition-colors">
            Read all Google Reviews <ArrowRight size={16} />
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-concrete shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-6">
                  {[...Array(review.rating)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="font-body text-black/80 mb-8 italic">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-concrete/50 flex items-center justify-center font-heading font-bold text-primary">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold font-heading text-sm">{review.name}</h4>
                  <p className="text-xs text-black/50 font-data">{review.date}</p>
                </div>
                <div className="ml-auto">
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Trust = () => {
  return (
    <section className="bg-black text-white py-16 px-6 relative overflow-hidden flex items-center justify-center min-h-[40vh]">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity grayscale" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="font-heading text-lg md:text-xl text-concrete/70 mb-6">Many companies just want to get the job done quickly.</p>
        <h2 className="font-drama font-bold text-5xl md:text-7xl leading-tight">
          We focus on crafting beautiful storage with <span className="text-primary font-heading">care</span> and respect for your home.
        </h2>
      </div>
    </section>
  );
};

const Credentials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray('.counter-val');
      
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 px-6 lg:px-12 bg-concrete/20 border-y border-concrete">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-concrete/50">
          <div className="text-center px-4">
            <div className="font-drama text-5xl md:text-6xl font-bold text-black mb-2"><span className="counter-val" data-target="15">0</span>+</div>
            <p className="font-data text-xs uppercase text-black/60">Years Experience</p>
          </div>
          <div className="text-center px-4">
            <div className="font-drama text-5xl md:text-6xl font-bold text-black mb-2"><span className="counter-val" data-target="850">0</span>+</div>
            <p className="font-data text-xs uppercase text-black/60">Projects Completed</p>
          </div>
          <div className="text-center px-4">
            <div className="font-drama text-5xl md:text-6xl font-bold text-black mb-2"><span className="counter-val" data-target="100">0</span>%</div>
            <p className="font-data text-xs uppercase text-black/60">Made to Measure</p>
          </div>
          <div className="text-center px-4">
            <div className="font-drama text-5xl md:text-6xl font-bold text-black mb-2"><span className="counter-val" data-target="300">0</span>+</div>
            <p className="font-data text-xs uppercase text-black/60">5-Star Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Is the showroom visit really a no obligation?",
      answer: "Yes. It's a chance to see our work and chat through your ideas — no pressure, no follow-up calls you didn't ask for."
    },
    {
      question: "Do I need to know exactly what I want before visiting?",
      answer: "Not at all — that's what we're here for. Our designer will walk you through ideas and options during your free home visit, so you can figure out what works best for your space."
    },
    {
      question: "Can you work with awkward spaces like slopped ceilings?",
      answer: "Absolutely — tricky spaces are our specialty. Sloped ceilings, alcoves, odd corners — we design furniture that fits your exact space perfectly, wall-to-wall and floor-to-ceiling."
    },
    {
      question: "What if I don't like the initial design?",
      answer: "We'll work with you to get it right. Your designer will refine the layout, finishes, and details until you're completely happy — there's no charge for design revisions."
    },
    {
      question: "How long does the whole process take?",
      answer: "From your initial visit to installation, it typically takes 6-8 weeks. We'll keep you updated throughout, and installation itself usually takes just 1-2 days depending on the project size."
    },
    {
      question: "Will there be much mess or disruption?",
      answer: "Very little — our fitters are tidy and respectful of your home. We'll protect your floors and furniture, clean up thoroughly after installation, and leave you with nothing but beautiful fitted furniture."
    },
    {
      question: "How much does it cost?",
      answer: "Every project is unique, so pricing depends on size, style, and finishes. As a guide, fitted bedrooms typically range from £3,000-£8,000+, and we'll give you a transparent quote with no hidden costs after your design visit."
    }
  ];

  return (
    <section className="py-10 px-6 lg:px-12 bg-bone">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl mb-4 text-black">Common Questions</h2>
          <p className="font-body text-black/60 text-lg">Everything you need to know about our process and services.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-concrete [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer list-none font-heading text-lg font-medium text-black">
                {faq.question}
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-black/70 font-body px-6 md:px-8 pb-6 md:pb-8 border-t border-concrete pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQPage = () => {
  return (
    <div className="pt-24 bg-bone min-h-screen">
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden mb-16">
        <img src="/FAQ HERO.png" alt="Frequently Asked Questions" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end pb-10 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-bone font-drama text-5xl md:text-7xl font-bold">Frequently Asked Questions</h1>
          </div>
        </div>
      </div>
      <FAQ />
    </div>
  );
};

const Booking = () => {
  const [showHours, setShowHours] = useState(false);

  return (
    <section id="contact" className="py-10 px-6 lg:px-12 bg-bone relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-concrete shadow-premium">
            <h2 className="font-heading text-3xl mb-2">Book a Showroom Visit</h2>
            <p className="text-black/60 font-body mb-8">We'd love to hear your ideas. Book a friendly, no-obligation showroom visit today to start the journey.</p>
            
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
              {/* Replace with your Access Key from Web3Forms */}
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              <input type="hidden" name="subject" value="New Showroom Visit Request from Website" />
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-data text-xs uppercase" htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" required className="w-full bg-bone border border-concrete rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-data text-xs uppercase" htmlFor="phone">Phone</label>
                  <input type="tel" name="phone" id="phone" required className="w-full bg-bone border border-concrete rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-data text-xs uppercase" htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" required className="w-full bg-bone border border-concrete rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="font-data text-xs uppercase" htmlFor="notes">Tell us a little about what you're looking for</label>
                <textarea name="message" id="notes" rows="3" required className="w-full bg-bone border border-concrete rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-black text-white rounded-xl py-4 font-medium flex justify-center items-center gap-2 hover:bg-black/80 transition-colors">
                Request Showroom Visit <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center gap-8 lg:pl-12">
            <div>
              <h2 className="font-drama font-bold text-5xl mb-4">Come Say Hello</h2>
              <p className="text-black/70 max-w-md mb-8">If you are still unsure, we can give you more information before you schedule an appointment, speak with our team today.</p>
              
              <div 
                onClick={() => setShowHours(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-700 font-data text-xs border border-red-200 mb-6 w-fit cursor-pointer hover:bg-red-200 transition-colors"
                title="View full opening hours"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold">Closed</span> 
                <span className="opacity-70 mx-1">•</span> 
                <span>Opens tomorrow at 09:00</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 font-body">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-concrete/50 rounded-full"><MapPin size={20} className="text-primary" /></div>
                <div>
                  <h4 className="font-bold mb-1">Our Showroom</h4>
                  <p className="text-black/70">Burnbank Rd, Hamilton ML3 9AZ</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-concrete/50 rounded-full"><Phone size={20} className="text-primary" /></div>
                <div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="text-black/70">01698 286866</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-concrete/50 rounded-full"><Mail size={20} className="text-primary" /></div>
                <div>
                  <h4 className="font-bold mb-1">Email Us</h4>
                  <p className="text-black/70">gallerydesignbedrooms@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-concrete/50 rounded-full"><Clock size={20} className="text-primary" /></div>
                <div>
                  <h4 className="font-bold mb-1">Opening Hours</h4>
                  <p className="text-black/70">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-black/70">Saturday - Sunday: Closed</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Opening Hours Modal */}
      {showHours && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-6" 
          onClick={() => setShowHours(false)}
        >
          <div 
            className="bg-white p-8 rounded-[2rem] max-w-md w-full border border-concrete shadow-premium relative animate-in fade-in zoom-in duration-200" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowHours(false)} 
              className="absolute top-6 right-6 text-black/50 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-concrete/50 rounded-full"><Clock size={24} className="text-primary" /></div>
              <h3 className="font-heading text-2xl font-bold">Opening Hours</h3>
            </div>
            
            <div className="space-y-1 font-body text-black/80 font-medium">
              {[
                { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
                { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
                { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
                { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
                { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
                { day: 'Saturday', hours: 'Closed', closed: true },
                { day: 'Sunday', hours: 'Closed', closed: true }
              ].map(({ day, hours, closed }) => (
                <div key={day} className={`flex justify-between items-center py-3 border-b border-concrete/40 last:border-0 ${closed ? 'text-black/40' : ''}`}>
                  <span>{day}</span>
                  <span className={closed ? 'font-normal' : 'text-black'}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-bone rounded-t-[4rem] pt-20 pb-10 px-6 lg:px-12 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
        <div className="md:col-span-2">
          <h2 className="font-heading font-bold text-2xl mb-4">Gallery Design</h2>
          <p className="text-concrete/60 max-w-sm mb-6">Creating beautifully organized spaces with lovely custom wardrobes and fitted living room furniture.</p>
          <div className="inline-flex items-center gap-2 text-xs font-data bg-white/5 rounded-full px-3 py-1 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-primary" /> We'd love to hear from you
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-data text-xs text-concrete/40 mb-2 uppercase">Services</h4>
          <a href="#" className="hover:text-primary transition-colors">Sliding Doors</a>
          <a href="#" className="hover:text-primary transition-colors">Walk-in Wardrobes</a>
          <a href="#" className="hover:text-primary transition-colors">Awkward Spaces</a>
          <a href="#" className="hover:text-primary transition-colors">TV Media Units</a>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-data text-xs text-concrete/40 mb-2 uppercase">Company</h4>
          <a href="#" className="hover:text-primary transition-colors">Book Showroom</a>
          <a href="#" className="hover:text-primary transition-colors">Our Process</a>
          <a href="#" className="hover:text-primary transition-colors">Portfolio</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-data text-concrete/40">
        <p>&copy; {new Date().getFullYear()} Gallery Design. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-bone">Privacy Policy</a>
          <a href="#" className="hover:text-bone">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence for all assets and components
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <Router>
      <div className="relative min-h-screen bg-bone scroll-smooth">
        <ScrollToTop />
        <div className="noise-overlay" />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Services />
              <Work />
              <Process />
              <Reviews />
              <Trust />
              <Credentials />
              <Booking />
            </main>
          } />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}