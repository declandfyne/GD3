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
    <section id="services" ref={sectionRef} className="pt-10 pb-20 md:pb-24 px-6 lg:px-12 bg-bone">
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
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: "/walkinwardrobe3.png", alt: "Walk in wardrobe", subtitle: "Beautiful Transformation", title: "Elegant Walk-in Wardrobe, Edinburgh" },
    { src: "/tvunit3.png", alt: "Living room storage", subtitle: "Living Space", title: "Beautiful TV Media Wall" },
    { src: "/warm room.png", alt: "Home office", subtitle: "Bedroom Storage", title: "Cozy Fitted Wardrobes" },
    { src: "/backboard.png", alt: "Bedroom features", subtitle: "Beautiful Finishes", title: "Custom Headboards" },
    { src: "/walkinwardrobe2.png", alt: "Walk in wardrobe detail", subtitle: "Smart Storage", title: "Shoe Display Solutions" },
    { src: "/Walkinwardrobe.png", alt: "Walk in wardrobe", subtitle: "Complete Room Fit-Out", title: "Bespoke Dressing Room" }
  ];

  return (
    <section id="work" className="py-10 px-6 lg:px-12 bg-black text-bone">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-drama font-bold text-5xl md:text-7xl mb-12">Our Recent Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div 
            className="md:col-span-8 group relative overflow-hidden rounded-[2rem] h-[600px] border border-white/10 cursor-pointer"
            onClick={() => setSelectedImage(images[0])}
          >
            <img src={images[0].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[0].alt} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <span className="font-data text-white text-xs mb-2 uppercase">{images[0].subtitle}</span>
              <h3 className="font-heading text-2xl md:text-3xl">{images[0].title}</h3>
            </div>
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-6">
            <div 
              className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10 cursor-pointer"
              onClick={() => setSelectedImage(images[1])}
            >
              <img src={images[1].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[1].alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">{images[1].subtitle}</span>
                <h3 className="font-heading text-xl">{images[1].title}</h3>
              </div>
            </div>
            <div 
              className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10 cursor-pointer"
              onClick={() => setSelectedImage(images[2])}
            >
              <img src={images[2].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[2].alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">{images[2].subtitle}</span>
                <h3 className="font-heading text-xl">{images[2].title}</h3>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4 flex flex-col gap-6">
            <div 
              className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10 cursor-pointer"
              onClick={() => setSelectedImage(images[3])}
            >
              <img src={images[3].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[3].alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">{images[3].subtitle}</span>
                <h3 className="font-heading text-xl">{images[3].title}</h3>
              </div>
            </div>
            <div 
              className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10 cursor-pointer"
              onClick={() => setSelectedImage(images[4])}
            >
              <img src={images[4].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[4].alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">{images[4].subtitle}</span>
                <h3 className="font-heading text-xl">{images[4].title}</h3>
              </div>
            </div>
          </div>
          
          <div 
            className="md:col-span-8 group relative overflow-hidden rounded-[2rem] h-[600px] border border-white/10 cursor-pointer"
            onClick={() => setSelectedImage(images[5])}
          >
            <img src={images[5].src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[5].alt} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <span className="font-data text-white text-xs mb-2 uppercase">{images[5].subtitle}</span>
              <h3 className="font-heading text-2xl md:text-3xl">{images[5].title}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md px-6 animate-in fade-in duration-300 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/50 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative max-w-5xl w-full max-h-[80vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center">
              <span className="font-data text-white/60 text-xs uppercase tracking-widest block mb-2">{selectedImage.subtitle}</span>
              <h3 className="font-heading text-white text-2xl md:text-3xl">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Process = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.process-step');
      
      steps.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="py-20 md:py-32 px-6 lg:px-12 bg-bone overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-4xl mb-16 text-center text-black">How It Works</h2>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-[2px] bg-concrete/50 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-8 top-4 bottom-4 w-[2px] bg-concrete/50 -translate-x-1/2 md:hidden" />

          <div className="flex flex-col gap-12 md:gap-24">
            {/* Step 1 */}
            <div className="process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
              <div className="w-full md:w-1/2 pl-16 md:pl-0 flex justify-end md:pr-8 md:text-right">
                <div className="bg-white p-8 rounded-[2rem] border border-concrete shadow-sm w-full relative z-10 hover:-translate-y-1 transition-transform">
                  <span className="font-data text-xs text-primary mb-2 block uppercase tracking-wider">Step 01</span>
                  <h3 className="font-heading text-2xl mb-4 text-black">Visit Our Showroom</h3>
                  <p className="text-black/70 font-body text-sm md:text-base">The journey begins with a friendly visit to our showroom. Come and run your hands over our beautiful materials, see our craftsmanship up close, and chat with us about your ideas.</p>
                </div>
              </div>
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full z-20 border-4 border-bone -translate-x-1/2 mt-8 md:mt-0" />
              <div className="md:w-1/2 w-full pl-16 md:pl-8">
                <div className="w-full h-48 md:h-64 bg-concrete/30 rounded-[2rem] border border-concrete/50 overflow-hidden flex items-center justify-center group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <img src="/Step1.png" alt="Showroom detail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="process-step relative flex flex-col md:flex-row-reverse items-start md:items-center gap-8 md:gap-16">
              <div className="w-full md:w-1/2 pl-16 md:pl-8 flex justify-start">
                <div className="bg-white p-8 rounded-[2rem] border border-concrete shadow-sm w-full relative z-10 hover:-translate-y-1 transition-transform">
                  <span className="font-data text-xs text-primary mb-2 block uppercase tracking-wider">Step 02</span>
                  <h3 className="font-heading text-2xl mb-4 text-black">Home Measure & Design</h3>
                  <p className="text-black/70 font-body text-sm md:text-base">Next, one of our lovely designers will visit your home to take careful measurements. We'll then create a beautiful drawing of your new storage solution so you can see exactly how it will look.</p>
                </div>
              </div>
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full z-20 border-4 border-bone -translate-x-1/2 mt-8 md:mt-0" />
              <div className="md:w-1/2 w-full pl-16 md:pr-8">
                <div className="w-full h-48 md:h-64 bg-concrete/30 rounded-[2rem] border border-concrete/50 overflow-hidden flex items-center justify-center group cursor-pointer hover:shadow-lg transition-all duration-300">
                   <img src="/Step2.png" alt="Design planning" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
              <div className="w-full md:w-1/2 pl-16 md:pl-0 flex justify-end md:pr-8 md:text-right">
                <div className="bg-black text-bone p-8 rounded-[2rem] border border-black shadow-premium w-full relative z-10 hover:-translate-y-1 transition-transform">
                  <span className="font-data text-xs text-primary mb-2 block uppercase tracking-wider">Step 03</span>
                  <h3 className="font-heading text-2xl mb-4">Fitting Day</h3>
                  <p className="text-white/70 font-body text-sm md:text-base">The exciting part! Our skilled fitters will arrive on time, lay down strict dust sheets to protect your home, and get straight to work building your gorgeous new wardrobes or units.</p>
                </div>
              </div>
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full z-20 border-4 border-bone -translate-x-1/2 mt-8 md:mt-0" />
              <div className="md:w-1/2 w-full pl-16 md:pl-8">
                <div className="w-full h-48 md:h-64 bg-concrete/30 rounded-[2rem] border border-concrete/50 overflow-hidden flex items-center justify-center group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <img src="/Step3.png" alt="Installation process" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="process-step relative flex flex-col md:flex-row-reverse items-start md:items-center gap-8 md:gap-16">
              <div className="w-full md:w-1/2 pl-16 md:pl-8 flex justify-start">
                <div className="bg-white p-8 rounded-[2rem] border border-concrete shadow-sm w-full relative z-10 hover:-translate-y-1 transition-transform">
                  <span className="font-data text-xs text-primary mb-2 block uppercase tracking-wider">Step 04</span>
                  <h3 className="font-heading text-2xl mb-4 text-black">Clean Up and Enjoy</h3>
                  <p className="text-black/70 font-body text-sm md:text-base">We never leave a mess behind! We always have our Henry hoover with us to give the floors a good vacuum so you can start enjoying your amazing new storage space straight away.</p>
                </div>
              </div>
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full z-20 border-4 border-bone -translate-x-1/2 mt-8 md:mt-0" />
              <div className="md:w-1/2 w-full pl-16 md:pr-8">
                <div className="w-full h-48 md:h-64 bg-concrete/30 rounded-[2rem] border border-concrete/50 overflow-hidden flex items-center justify-center group cursor-pointer hover:shadow-lg transition-all duration-300">
                   <img src="/Step4.png" alt="Finished beautiful room" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const scrollContainerRef = useRef(null);
  
  const reviews = [
    {
      name: "George Eadie",
      date: "",
      text: "From John in the showroom to Margaret and Tracy in the office you will find friendly, efficient and knowledgeable service and assistance. Nothing was too much trouble. The whole process from start to finish delivered on every level exactly as was promised. Liam and his colleagues Brandon and Darren were simply superb in their craftsmanship and installation skills. From carpet protection to hoovering on completion every care was taken. Excellent all round family firm.",
      rating: 5
    },
    {
      name: "Lynsaye Adams",
      date: "",
      text: "The whole experience from John coming out and helping design and Liams craftsmanship. I now have my dressing room of dreams!",
      rating: 5
    },
    {
      name: "Alistair Mack",
      date: "",
      text: "Contacted John at gallery design Hamilton to have my full bedroom turned into a walk in wardrobe. There was a few awkward spaces and this was not a problem he came up with good suggestions. He even managed to fit a dressing table — me and my wife are totally delighted with the finished result. They kept us up to speed every step of the way. I totally recommend this company. There a great bunch of guys who work together and keep your area spotless.",
      rating: 5
    },
    {
      name: "Peter Miller",
      date: "",
      text: "Fantastic service from start to finish. Visited Gallery design looking for a complete refit and remodel of our master bedroom. From the initial visit at the showroom all the way through to completion the quality of service we received was exemplary. Liam and the team completed the install and we are absolutely delighted. There is nothing that is too much trouble for these guys. Impeccable workmanship, cleaned up after and left us with our perfect bedroom. Can't recommend this company highly enough.",
      rating: 5
    },
    {
      name: "James Doolan",
      date: "",
      text: "I had looked at various companies and eventually stumbled across Gallery Design. I visited their showroom and was immediately impressed with the quality finish on all their bespoke displays. John visited my home, was very helpful and honest — no sales gimmicks and no pressure sales tactics. Now that the bedroom is finished it is beyond my wildest dream. The attention to detail shown by Liam and Darren is exceptional. I would highly recommend this company in a heartbeat.",
      rating: 5
    },
    {
      name: "Anonymous (Ff)",
      date: "",
      text: "We first used Gallery Design about 2 years ago for a bespoke fitted bedroom. The excellent job, fair price and quality product still looking good as-new immediately took us back when we decided to have a media unit built. Liam really took on board the look we were after and delivered on our requirements for both storage and technology. The quality and finish is just excellent. Highly recommended!",
      rating: 5
    },
    {
      name: "Marie Miller",
      date: "",
      text: "We can't recommend Gallery Design highly enough. All the showroom staff were helpful, friendly and assisted us in making the right decision. Margaret's knowledge and experience was invaluable. John, Liam and the installation team were amazing. Fantastic, personal service from a family business.",
      rating: 5
    },
    {
      name: "William Alexander Walker",
      date: "",
      text: "Liz and I would not hesitate to recommend Gallery Designs. We are delighted with the good quality of our bespoke fitted wardrobe.",
      rating: 5
    },
    {
      name: "Natasha Alonzi",
      date: "",
      text: "I absolutely recommend The Gallery Design Bedrooms. John designed clever, attractive furniture solutions for a smaller space. Liam and his team built fitted wardrobes, dressing table, bedside tables and desk with shelves and drawers. The workmanship and professionalism is exceptional. Nothing was too much trouble. We are delighted and will certainly use them again.",
      rating: 5
    },
    {
      name: "B MCF",
      date: "",
      text: "Our experience with Gallery Design was fantastic. From design by John to fitting by Liam, the team were very professional, friendly and hard-working. The standard of the fitted wardrobe is very high, finish complete with integrated lighting. Totally transformed our room, highly recommend to anyone. Can’t thank you enough.",
      rating: 5
    },
    {
      name: "Marcus Lavety",
      date: "",
      text: "What a wonderful service from start to finish. John and his team designed and installed the most wonderful bespoke dressing system in my daughter's bedroom. I would recommend them to anyone.",
      rating: 5
    },
    {
      name: "Andrea Fletcher",
      date: "",
      text: "Would totally recommend Gallery Design. We have a small bedroom which is now a perfect dressing room. 5 star service from the first phone call to the installation. John, Liam and Brandon are all fantastic and left the room spotless.",
      rating: 5
    },
    {
      name: "Robert McCaffrey",
      date: "",
      text: "Our entire experience with Gallery Design was excellent. Margaret, John, Liam and the team were so professional and helpful throughout the process. My wife's bespoke dressing room is fantastic quality and exactly what she wanted.",
      rating: 5
    },
    {
      name: "Paul Reynolds",
      date: "",
      text: "After recently moving house, we turned to Gallery Design for the second time. From our initial contact to the final sign-off, John, Liam and the entire team demonstrated outstanding professionalism and expertise at every stage. The installation process was seamless and efficient. We couldn't be happier with the results.",
      rating: 5
    },
    {
      name: "David Miller",
      date: "",
      text: "Top class, staff are most helpful.",
      rating: 5
    },
    {
      name: "Janet Hamilton",
      date: "",
      text: "Great experience from Margaret at the showroom to John coming to our home to plan our new bedroom furniture. Liam and the boys who installed were excellent, completed on time and were neat and very tidy. We are very pleased with our new bedroom.",
      rating: 5
    },
    {
      name: "Sadia Khan",
      date: "",
      text: "It was an absolute great experience working with John and Liam. Words can't describe how beautiful my fitted cupboards are looking. Highly recommend — not only are they a great team and very friendly, but they also give you the right advice on selecting what will look good in your home.",
      rating: 5
    },
    {
      name: "David Howat",
      date: "",
      text: "Gallery Design were FAB! They designed us a new wardrobe suite for our granddaughter's room and it hits the mark on all levels. Staff are amazing and very knowledgeable, fitters worked very hard, were very tidy and great to have in the house.",
      rating: 5
    },
    {
      name: "Pamela Dodds",
      date: "",
      text: "Absolutely delighted with my wardrobes. The boys were amazing — all fitted in one day, no mess, no hassle, lovely guys. Excellent quality, so glad I decided to go with them.",
      rating: 5
    },
    {
      name: "Property Rentals",
      date: "",
      text: "Without doubt a 5-star service from start to finish. Had 3 bedrooms and a media wall fitted and we are so pleased with every room. Everything was fitted to perfection, excellent quality and amazing workmanship. Not a bit of mess was left.",
      rating: 5
    },
    {
      name: "Liz McMorris",
      date: "",
      text: "Excellent sales, design and installation team all in a friendly family manner. Highly recommended for that personal feel.",
      rating: 5
    },
    {
      name: "Iain Black",
      date: "",
      text: "My wife and I are delighted with our new look bedroom. From seeing the great choice in their showroom to Liam and the team building the quality wardrobes in our home, the experience has been 1st class. Would not hesitate to recommend to family and friends.",
      rating: 5
    },
    {
      name: "Audrey Richard",
      date: "",
      text: "Absolutely delighted with all aspects of work done, bedroom furniture and care taken. Friendly, respectful workers who never stopped. Would highly recommend this local company.",
      rating: 5
    },
    {
      name: "Kathy Harding",
      date: "",
      text: "This family run bespoke furniture business made every stage of the process easy, from design and product selection to installation. The end product was perfect, exactly what we were looking for. No mess. No fuss. We can't praise this company highly enough.",
      rating: 5
    },
    {
      name: "Carol Gilhooley",
      date: "",
      text: "A huge thank you to John, Liam, Darren and Brandon. We have been a repeat customer over the past 15 years and can honestly say we wouldn't go anywhere else. The quality and attention to detail is exceptional and we couldn't be happier with the finished result. Nothing was too much trouble.",
      rating: 5
    },
    {
      name: "James Rough",
      date: "",
      text: "Absolutely delighted with our fitted bedrooms. Friendly and helpful advice in the showroom, then John came out and helped with ideas. Liam and his team were fantastic. The finished product was amazing — first class workmanship.",
      rating: 5
    },
    {
      name: "Sharon Macdonald",
      date: "",
      text: "Gallery Design have now completed every bedroom in my home. The materials used are of a very high standard and the workmanship was outstanding. Absolutely love my new bedroom — it's definitely the best room in the house.",
      rating: 5
    }
  ];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust for card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="font-heading text-4xl mb-4 text-black">Loved by our customers</h2>
            <p className="font-body text-black/60 text-lg">We take deep pride in every piece of storage we build. Our lovely customers continually praise our friendly showroom service and the spotless work of our fitting team.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => handleScroll('left')}
              className="p-4 rounded-full border border-concrete hover:bg-concrete/20 transition-colors hidden md:block"
              aria-label="Previous reviews"
            >
              <ArrowRight size={24} className="rotate-180 text-black" />
            </button>
            <button 
              onClick={() => handleScroll('right')}
              className="p-4 rounded-full bg-black text-white hover:bg-black/80 transition-colors hidden md:block"
              aria-label="Next reviews"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
        
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 cursor-grab active:cursor-grabbing w-full px-6 lg:px-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((review, i) => (
          <div 
            key={i} 
            className="min-w-[300px] md:min-w-[400px] max-w-[400px] snap-start bg-bone p-8 rounded-[2rem] border border-concrete/50 flex flex-col h-auto"
          >
            <div className="flex text-yellow-500 mb-6">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <div className="relative mb-6 flex-grow">
              <Quote className="absolute -top-2 -left-2 text-concrete opacity-50 w-8 h-8" />
              <p className="font-body text-black/80 text-sm md:text-base italic relative z-10 pt-2 lg:line-clamp-6">"{review.text}"</p>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-heading font-medium text-black">{review.name}</h4>
                <p className="font-data text-xs text-black/50">Verified Customer</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <a href="https://www.google.com/search?q=gallery+design+bedrooms&rlz=1C5GCEM_enGB1159GB1159&oq=gallery+desig&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxiABDIJCAAQRRg7GIAEMgcIARAAGIAEMhAIAhAuGK8BGMcBGIAEGI4FMgYIAxBFGDkyBwgEEAAYgAQyBggFEEUYPTIGCAYQRRg8MgYIBxBFGDzSAQgyOTE2ajBqNKgCALACAQ&sourceid=chrome&ie=UTF-8#lrd=0x488848b388c0101b:0xfb3a777b6e9bf194,1,,,," target="_blank" rel="noopener noreferrer">
          <MagneticButton className="px-6 py-3 border border-concrete rounded-full text-black hover:bg-concrete/10 transition-colors w-full md:w-auto font-medium">
            Read all Google reviews
          </MagneticButton>
        </a>
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
              <input type="hidden" name="access_key" value="3b2f54d2-0f00-4cfa-b3cd-98b1924b93e0" />
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
            
            <div className="space-y-1 font-body text-black/80 font-medium w-full">
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
                  <span className={closed ? 'font-normal text-black/40' : 'text-black'}>{hours}</span>
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
          <span>Sliding Doors</span>
          <span>Walk-in Wardrobes</span>
          <span>Awkward Spaces</span>
          <span>TV Media Units</span>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-data text-xs text-concrete/40 mb-2 uppercase">Company</h4>
          <span>Book Showroom</span>
          <span>Our Process</span>
          <span>Portfolio</span>
          <span>Contact</span>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-data text-concrete/40">
        <p>&copy; {new Date().getFullYear()} Gallery Design. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
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
              <Credentials />
              <Services />
              <Work />
              <Process />
              <Reviews />
              <Trust />
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