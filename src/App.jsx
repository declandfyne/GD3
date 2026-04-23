import React, { useEffect, useRef, useState } from 'react';
import { client, urlFor } from './sanityClient';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, MapPin, Phone, CheckCircle2, ChevronRight, Menu, X, Clock, Navigation, Mail } from 'lucide-react';

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
  const [hamiltonStatus, setHamiltonStatus] = useState({ isOpen: false, text: '' });
  const [glasgowStatus, setGlasgowStatus] = useState({ isOpen: false, text: '' });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();

      // Hamilton: Mon-Fri 9-17, Sat-Sun closed
      const hOpen = day >= 1 && day <= 5 && hour >= 9 && hour < 17;
      let hText = '';
      if (hOpen) { hText = 'Closes at 17:00'; }
      else if (day >= 1 && day <= 5 && hour < 9) { hText = 'Opens today at 09:00'; }
      else if (day >= 1 && day <= 4 && hour >= 17) { hText = 'Opens tomorrow at 09:00'; }
      else if ((day === 5 && hour >= 17) || day === 6) { hText = 'Opens Monday at 09:00'; }
      else if (day === 0) { hText = 'Opens tomorrow at 09:00'; }
      setHamiltonStatus({ isOpen: hOpen, text: hText });

      // Glasgow: Mon-Fri 10-17, Sat 10-16, Sun 12-16
      let gOpen = false;
      if (day >= 1 && day <= 5) gOpen = hour >= 10 && hour < 17;
      else if (day === 6) gOpen = hour >= 10 && hour < 16;
      else if (day === 0) gOpen = hour >= 12 && hour < 16;
      let gText = '';
      if (gOpen) { gText = (day === 6 || day === 0) ? 'Closes at 16:00' : 'Closes at 17:00'; }
      else if (day >= 1 && day <= 5 && hour < 10) { gText = 'Opens today at 10:00'; }
      else if (day >= 1 && day <= 4 && hour >= 17) { gText = 'Opens tomorrow at 10:00'; }
      else if (day === 5 && hour >= 17) { gText = 'Opens Saturday at 10:00'; }
      else if (day === 6 && hour < 10) { gText = 'Opens today at 10:00'; }
      else if (day === 6 && hour >= 16) { gText = 'Opens Sunday at 12:00'; }
      else if (day === 0 && hour < 12) { gText = 'Opens today at 12:00'; }
      else if (day === 0 && hour >= 16) { gText = 'Opens Monday at 10:00'; }
      setGlasgowStatus({ isOpen: gOpen, text: gText });
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Top bar - all screens */}
      <div className="flex fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm text-white/70 text-xs font-data px-4 md:px-8 py-2 justify-center gap-4 md:gap-6 items-center">
        <a href="https://www.google.com/maps/dir/?api=1&destination=Burnbank+Rd,+Hamilton+ML3+9AZ" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          <span className="hidden md:inline">Hamilton · Burnbank Rd</span>
          <span className="md:hidden">Hamilton</span>
        </a>
        <a href="tel:01698286866" className="hover:text-white transition-colors">01698 286866</a>
        <div className={`w-1.5 h-1.5 rounded-full ${hamiltonStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-white/30 mx-1 md:mx-2">|</span>
        <a href="https://www.google.com/maps/dir/?api=1&destination=120+Carnegie+Rd,+Hillington,+Glasgow+G52+4JZ" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          <span className="hidden md:inline">Hillington · Carnegie Rd</span>
          <span className="md:hidden">Hillington</span>
        </a>
        <a href="tel:01418828008" className="hover:text-white transition-colors">0141 882 8008</a>
        <div className={`w-1.5 h-1.5 rounded-full ${glasgowStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>

      <nav
        ref={navRef}
        className={`fixed top-12 md:top-12 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-[2rem] transition-all duration-300 w-[90%] max-w-5xl ${
          scrolled || menuOpen
            ? 'bg-bone/80 backdrop-blur-xl border border-concrete text-black shadow-premium'
            : 'bg-black/20 backdrop-blur-md text-bone shadow-lg'
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 font-heading font-bold text-xl tracking-tight">
          <img
            src="/GalleryDesignLogo.svg"
            alt="Gallery Design Logo"
            className={`h-8 w-auto flex-shrink-0 transition-all duration-300 ${scrolled || menuOpen ? 'brightness-0' : 'brightness-0 invert'}`}
          />
          <img
            src="/GalleryDesignMonogram.svg"
            alt="Gallery Design"
            className={`h-[17.6px] md:h-4 w-auto self-center flex-shrink-0 transition-all duration-300 ${scrolled || menuOpen ? 'brightness-0' : 'brightness-0 invert'}`}
          />
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
        <div className="flex gap-8 text-center text-black/50 font-data text-xs">
          <div className="space-y-2">
            <p className="font-medium text-black/70 uppercase tracking-wider">Hamilton</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Burnbank+Rd,+Hamilton+ML3+9AZ" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">Burnbank Rd, ML3 9AZ</a>
            <a href="tel:01698286866" className="block hover:text-primary transition-colors">01698 286866</a>
            <p>Mon–Fri 9am–5pm</p>
            <a href="/#contact" onClick={() => setMenuOpen(false)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-body text-xs border ${hamiltonStatus.isOpen ? 'bg-green-100/50 text-green-700 border-green-200' : 'bg-red-100/50 text-red-700 border-red-200'}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${hamiltonStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium uppercase tracking-wider">{hamiltonStatus.isOpen ? 'Open' : 'Closed'}</span>
            </a>
          </div>
          <div className="w-px bg-black/10" />
          <div className="space-y-2">
            <p className="font-medium text-black/70 uppercase tracking-wider">Hillington</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=120+Carnegie+Rd,+Hillington,+Glasgow+G52+4JZ" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">Carnegie Rd, G52 4JZ</a>
            <a href="tel:01418828008" className="block hover:text-primary transition-colors">0141 882 8008</a>
            <p>Mon–Fri 10am–5pm</p>
            <a href="/#contact" onClick={() => setMenuOpen(false)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-body text-xs border ${glasgowStatus.isOpen ? 'bg-green-100/50 text-green-700 border-green-200' : 'bg-red-100/50 text-red-700 border-red-200'}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${glasgowStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium uppercase tracking-wider">{glasgowStatus.isOpen ? 'Open' : 'Closed'}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const scope = useRef(null);
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "hero"][0]`).then(setHeroData);
  }, []);

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

  const heroVideo = heroData?.video?.asset?.url || null;
  const heroImage = heroData?.image ? urlFor(heroData.image).width(1920).url() : '/hero-image2.webp';
  const heroHeadingIntro = heroData?.headingIntro || 'Beautiful storage for';
  const heroHeading = heroData?.heading || 'Your Home.';
  const heroSubheading = heroData?.subheading || 'Creating organized spaces with custom wardrobes, elegant living room units, and clever storage that makes daily life a joy.';

  return (
    <section ref={scope} className="relative h-[100dvh] w-full flex items-end pb-20 pt-32 px-6 lg:px-12 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroVideo ? (
          <video
            src={heroVideo}
            className="w-full h-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={heroImage}
            alt="Custom built walk in wardrobe"
            className="w-full h-full object-cover opacity-60"
            fetchPriority="high"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="max-w-3xl">
          <h1 className="text-bone mb-6">
            <span className="block font-heading font-medium text-2xl md:text-4xl mb-2 hero-element">{heroHeadingIntro}</span>
            <span className="block font-drama font-bold text-6xl md:text-8xl lg:text-9xl text-concrete leading-none uppercase tracking-tight hero-element">{heroHeading}</span>
          </h1>
          <p className="text-concrete/80 text-lg md:text-xl max-w-xl font-body hero-element mb-10">
            {heroSubheading}
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

const FALLBACK_SERVICES = [
  {
    image: "/walkinwardrobe3.png",
    label: "Most Popular",
    title: "Walk-in Wardrobes",
    hook: "Your own dressing room — in your own home.",
    description: "Imagine starting every morning in a beautifully organised space where everything has its place. We design and build stunning walk-in wardrobes that turn an ordinary room into something you'll genuinely love.",
    benefits: ["Floor-to-ceiling storage", "Custom lighting & mirrors", "Built around your lifestyle"],
  },
  {
    image: "/walkinwardrobe2.png",
    label: "Bedroom Storage",
    title: "Fitted Wardrobes",
    hook: "No more clutter. No more wasted space.",
    description: "A fitted wardrobe goes from wall to wall and floor to ceiling — making the absolute most of your room. We'll design it around exactly what you need to store, so everything has a home.",
    benefits: ["Maximises every inch of space", "Sliding or hinged door options", "Matches your room perfectly"],
  },
  {
    image: "/image2.webp",
    label: "Living Room",
    title: "TV & Media Units",
    hook: "Transform the heart of your home.",
    description: "A beautifully fitted media wall or TV unit can completely change how your living room looks and feels. We hide away all the cables and clutter so you're left with a clean, stylish space your family will enjoy every day.",
    benefits: ["Hides cables & equipment", "Custom shelving & storage", "Designed to fit your wall exactly"],
  },
  {
    image: "/Walkinwardrobe.png",
    label: "Any Space",
    title: "Awkward Spaces",
    hook: "No room is too tricky for us.",
    description: "Sloped ceilings, alcoves, oddly shaped rooms — these are our speciality. We've fitted hundreds of beautiful wardrobes into spaces other companies would turn down. If it's a challenge, we love it.",
    benefits: ["Loft conversions & sloped ceilings", "Alcoves & recesses", "Made-to-measure, always"],
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const [services, setServices] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "service"] | order(order asc)`).then(data => {
      if (data && data.length > 0) setServices(data);
    });
  }, []);

  const displayServices = FALLBACK_SERVICES.map((fallback, i) => {
    const sanityItem = services?.find(s => s.order === i + 1);
    return sanityItem || fallback;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
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
    <section id="services" ref={sectionRef} className="py-20 md:py-28 px-6 lg:px-12 bg-bone">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12 md:mb-16">
          <h2 className="font-heading text-4xl md:text-5xl mb-4 text-black">What We Can Do For You</h2>
          <p className="font-body text-black/60 text-lg md:text-xl max-w-2xl">Every home is different — and so is every customer. Whether you're dreaming of a walk-in wardrobe or just need more space in your bedroom, we'll design something beautiful that fits your home and your life perfectly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayServices.map((service, i) => (
            <div key={i} className="service-card group bg-white rounded-[2rem] overflow-hidden border border-concrete/60 flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Photo */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={service.image?._type === 'image' ? urlFor(service.image).width(800).url() : service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black text-xs font-data uppercase tracking-wider px-3 py-1.5 rounded-full border border-concrete/40">
                  {service.label}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="font-heading text-2xl md:text-3xl text-black mb-2">{service.title}</h3>
                <p className="font-heading text-primary text-base mb-3">{service.hook}</p>
                <p className="font-body text-black/60 text-base leading-relaxed mb-6">{service.description}</p>

                <ul className="mt-auto space-y-2">
                  {(service.benefits || []).map((b, j) => (
                    <li key={j} className="flex items-center gap-3 text-black/70 font-body text-sm">
                      <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#contact">
            <MagneticButton className="px-8 py-4 bg-black text-bone rounded-full font-medium inline-flex items-center gap-2 text-base">
              Arrange a showroom appointment<ArrowRight size={18} />
            </MagneticButton>
          </a>
          <p className="text-black/40 font-body text-sm mt-3">No obligation — just a friendly chat about your home</p>
        </div>

      </div>
    </section>
  );
};

const FALLBACK_WORK = [
  { src: "/Bedroom2.jpg", alt: "Fitted bedroom", subtitle: "Bedroom Storage", title: "Beautiful Fitted Bedroom" },
  { src: "/tvunit3.png", alt: "Living room storage", subtitle: "Living Space", title: "Beautiful TV Media Wall" },
  { src: "/TVUnit4.webp", alt: "TV media unit", subtitle: "Media Wall", title: "Custom Media Unit" },
  { src: "/image4.webp", alt: "Fitted wardrobes with mirror panels", subtitle: "Fitted Wardrobes", title: "Mirror Panel Wardrobes" },
  { src: "/walkinwardrobe2.png", alt: "Walk in wardrobe detail", subtitle: "Smart Storage", title: "Shoe Display Solutions" },
  { src: "/TVUnit5.webp", alt: "TV unit and shelving", subtitle: "Living Room", title: "Bespoke TV & Shelving Unit" }
];

const Work = () => {
  const [workData, setWorkData] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    client.fetch(`*[_type == "workImage"] | order(order asc)`).then(data => {
      if (data && data.length > 0) setWorkData(data);
    });
  }, []);

  const images = FALLBACK_WORK.map((fallback, i) => {
    const sanityItem = workData?.find(s => s.order === i + 1);
    if (!sanityItem) return fallback;
    return {
      src: sanityItem.image?._type === 'image' ? urlFor(sanityItem.image).width(1200).url() : fallback.src,
      alt: sanityItem.alt || fallback.alt,
      subtitle: sanityItem.subtitle || fallback.subtitle,
      title: sanityItem.title || fallback.title,
    };
  });

  return (
    <section id="work" className="py-10 px-6 lg:px-12 bg-black text-bone">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-drama font-bold text-5xl md:text-7xl mb-12">Our Recent Work</h2>

        {/* Mobile carousel */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6"
          style={{ scrollbarWidth: 'none' }}
          onScroll={e => {
            const el = e.currentTarget;
            const index = Math.round(el.scrollLeft / (el.scrollWidth / images.length));
            setActiveSlide(index);
          }}
        >
          {images.map((image, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 relative rounded-[2rem] h-72 overflow-hidden border border-white/10"
              style={{ minWidth: 'calc(100vw - 3rem)', marginLeft: i === 0 ? '1.5rem' : 0 }}
            >
              <img src={image.src} className="w-full h-full object-cover" alt={image.alt} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">{image.subtitle}</span>
                <h3 className="font-heading text-xl">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${i === activeSlide ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`} />
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-12 gap-6">
          <div
            className="md:col-span-8 group relative overflow-hidden rounded-[2rem] h-[600px] border border-white/10"
          >
            <img src={images[0].src} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[0].alt} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <span className="font-data text-white text-xs mb-2 uppercase">{images[0].subtitle}</span>
              <h3 className="font-heading text-2xl md:text-3xl">{images[0].title}</h3>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div
              className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10"
            >
              <img src={images[1].src} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[1].alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">{images[1].subtitle}</span>
                <h3 className="font-heading text-xl">{images[1].title}</h3>
              </div>
            </div>
            <div
              className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10"
            >
              <img src={images[2].src} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[2].alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">{images[2].subtitle}</span>
                <h3 className="font-heading text-xl">{images[2].title}</h3>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div
              className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10"
            >
              <img src={images[3].src} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[3].alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">{images[3].subtitle}</span>
                <h3 className="font-heading text-xl">{images[3].title}</h3>
              </div>
            </div>
            <div
              className="group relative overflow-hidden rounded-[2rem] h-[288px] border border-white/10"
            >
              <img src={images[4].src} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[4].alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <span className="font-data text-white text-xs mb-1 uppercase">{images[4].subtitle}</span>
                <h3 className="font-heading text-xl">{images[4].title}</h3>
              </div>
            </div>
          </div>

          <div
            className="md:col-span-8 group relative overflow-hidden rounded-[2rem] h-[600px] border border-white/10"
          >
            <img src={images[5].src} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={images[5].alt} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <span className="font-data text-white text-xs mb-2 uppercase">{images[5].subtitle}</span>
              <h3 className="font-heading text-2xl md:text-3xl">{images[5].title}</h3>
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
      const steps = gsap.utils.toArray('.process-step');
      
      steps.forEach((step) => {
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
                  <img src="/Step1.webp" alt="Showroom detail" loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
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
                   <img src="/Step2.webp" alt="Design planning" loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
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
                  <img src="/Step3.webp" alt="Installation process" loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
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
                   <img src="/Step4.webp" alt="Finished beautiful room" loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
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
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="font-heading text-4xl mb-4 text-black">Loved by our customers</h2>
          <p className="font-body text-black/60 text-lg">We take deep pride in every piece of storage we build. Our lovely customers continually praise our friendly showroom service and the spotless work of our fitting team.</p>
        </div>
        <div className="elfsight-app-fae0c6a0-e493-45da-89e4-096c846db02a" data-elfsight-app-lazy></div>
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
            <div className="font-drama text-5xl md:text-6xl font-bold text-black mb-2"><span className="counter-val" data-target="2400">0</span>+</div>
            <p className="font-data text-xs uppercase text-black/60">Projects Completed</p>
          </div>
          <div className="text-center px-4">
            <div className="font-drama text-5xl md:text-6xl font-bold text-black mb-2"><span className="counter-val" data-target="100">0</span>%</div>
            <p className="font-data text-xs uppercase text-black/60">Made to Measure</p>
          </div>
          <div className="text-center px-4">
            <div className="font-drama text-5xl md:text-6xl font-bold text-black mb-2"><span className="counter-val" data-target="300">0</span>+</div>
            <p className="font-data text-xs uppercase text-black/60">5-Star Recent Reviews</p>
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
      question: "Can you work with awkward spaces like sloped ceilings?",
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
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white rounded-2xl border border-concrete [&_summary::-webkit-details-marker]:hidden">
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
        <img src="/FAQ HERO.webp" alt="Frequently Asked Questions" loading="lazy" className="w-full h-full object-cover" />
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
  const [hamiltonStatus, setHamiltonStatus] = useState({ isOpen: false, text: '' });
  const [glasgowStatus, setGlasgowStatus] = useState({ isOpen: false, text: '' });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();

      // Hamilton: Mon-Fri 9-17
      const hOpen = day >= 1 && day <= 5 && hour >= 9 && hour < 17;
      let hText = '';
      if (hOpen) { hText = 'Closes at 17:00'; }
      else if (day >= 1 && day <= 5 && hour < 9) { hText = 'Opens today at 09:00'; }
      else if (day >= 1 && day <= 4 && hour >= 17) { hText = 'Opens tomorrow at 09:00'; }
      else if ((day === 5 && hour >= 17) || day === 6) { hText = 'Opens Monday at 09:00'; }
      else if (day === 0) { hText = 'Opens tomorrow at 09:00'; }
      setHamiltonStatus({ isOpen: hOpen, text: hText });

      // Glasgow: Mon-Fri 10-17, Sat 10-16, Sun 12-16
      let gOpen = false;
      if (day >= 1 && day <= 5) gOpen = hour >= 10 && hour < 17;
      else if (day === 6) gOpen = hour >= 10 && hour < 16;
      else if (day === 0) gOpen = hour >= 12 && hour < 16;
      let gText = '';
      if (gOpen) { gText = (day === 6 || day === 0) ? 'Closes at 16:00' : 'Closes at 17:00'; }
      else if (day >= 1 && day <= 5 && hour < 10) { gText = 'Opens today at 10:00'; }
      else if (day >= 1 && day <= 4 && hour >= 17) { gText = 'Opens tomorrow at 10:00'; }
      else if (day === 5 && hour >= 17) { gText = 'Opens Saturday at 10:00'; }
      else if (day === 6 && hour < 10) { gText = 'Opens today at 10:00'; }
      else if (day === 6 && hour >= 16) { gText = 'Opens Sunday at 12:00'; }
      else if (day === 0 && hour < 12) { gText = 'Opens today at 12:00'; }
      else if (day === 0 && hour >= 16) { gText = 'Opens Monday at 10:00'; }
      setGlasgowStatus({ isOpen: gOpen, text: gText });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="py-20 lg:py-32 px-6 lg:px-12 bg-bone border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="font-heading font-medium text-4xl lg:text-5xl tracking-tight mb-6">
              Start your journey
            </h2>
            <p className="font-body text-black/60 text-lg max-w-md mb-12">
              Ready to transform your bedroom? Get in touch with our team to discuss your project or schedule a consultation.
            </p>

            <div className="flex gap-3 mb-12">
              <button onClick={() => setShowHours(true)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-body text-xs border cursor-pointer transition-colors ${hamiltonStatus.isOpen ? 'bg-green-100/50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-red-100/50 text-red-700 border-red-200 hover:bg-red-100'}`} title="View Hamilton opening hours">
                <div className={`w-2 h-2 rounded-full animate-pulse ${hamiltonStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="font-medium uppercase tracking-wider">Hamilton</span>
                <span className="opacity-40">•</span>
                <span>{hamiltonStatus.isOpen ? 'Open' : 'Closed'}</span>
              </button>
              <button onClick={() => setShowHours(true)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-body text-xs border cursor-pointer transition-colors ${glasgowStatus.isOpen ? 'bg-green-100/50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-red-100/50 text-red-700 border-red-200 hover:bg-red-100'}`} title="View Glasgow opening hours">
                <div className={`w-2 h-2 rounded-full animate-pulse ${glasgowStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="font-medium uppercase tracking-wider">Hillington</span>
                <span className="opacity-40">•</span>
                <span>{glasgowStatus.isOpen ? 'Open' : 'Closed'}</span>
              </button>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-concrete/50 rounded-full"><MapPin size={20} className="text-primary" /></div>
                <div>
                  <h4 className="font-heading font-medium text-lg mb-1">Our Showrooms</h4>
                  <a href="https://www.google.com/maps/dir/?api=1&destination=Burnbank+Rd,+Hamilton+ML3+9AZ" target="_blank" rel="noopener noreferrer" className="font-body text-black/60 hover:text-primary transition-colors block">Hamilton — Burnbank Rd, ML3 9AZ</a>
                  <a href="https://www.google.com/maps/dir/?api=1&destination=120+Carnegie+Rd,+Hillington,+Glasgow+G52+4JZ" target="_blank" rel="noopener noreferrer" className="font-body text-black/60 hover:text-primary transition-colors block">Hillington — 120 Carnegie Rd, G52 4JZ</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-concrete/50 rounded-full"><Phone size={20} className="text-primary" /></div>
                <div>
                  <h4 className="font-heading font-medium text-lg mb-1">Call Us</h4>
                  <a href="tel:01698286866" className="font-body text-black/60 hover:text-primary transition-colors block">Hamilton — 01698 286866</a>
                  <a href="tel:01418828008" className="font-body text-black/60 hover:text-primary transition-colors block">Hillington — 0141 882 8008</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-concrete/50 rounded-full"><Mail size={20} className="text-primary" /></div>
                <div>
                  <h4 className="font-heading font-medium text-lg mb-1">Email Us</h4>
                  <p className="font-body text-black/60">gallerydesignbedrooms@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-3 bg-concrete/50 rounded-full"><Clock size={20} className="text-primary" /></div>
                <div>
                  <h4 className="font-heading font-medium text-lg mb-1">Opening Hours</h4>
                  <p className="font-body text-black/60 font-medium">Hamilton</p>
                  <p className="font-body text-black/60">Mon–Fri: 9:00 AM – 5:00 PM &nbsp;·&nbsp; Sat–Sun: Closed</p>
                  <p className="font-body text-black/60 font-medium mt-2">Hillington</p>
                  <p className="font-body text-black/60">Mon–Fri: 10:00 AM – 5:00 PM</p>
                  <p className="font-body text-black/60">Sat: 10:00 AM – 4:00 PM &nbsp;·&nbsp; Sun: 12:00 – 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h2 className="font-heading font-medium text-4xl lg:text-5xl tracking-tight mb-6">
              Contact us
            </h2>
            <p className="font-body text-black/60 text-lg max-w-md mb-12">
              Fill out the form below to schedule a consultation with our team. We'll get back to you as soon as possible.
            </p>

            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
              {/* Replace with your Access Key from Web3Forms */}
              <input type="hidden" name="access_key" value="58c4adf2-31b8-4558-8a22-f143661460d5" />
              <input type="hidden" name="subject" value="New Showroom Visit Request from Website" />
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-data text-xs uppercase" htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" required className="w-full bg-white border border-concrete rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-data text-xs uppercase" htmlFor="phone">Phone</label>
                  <input type="tel" name="phone" id="phone" required className="w-full bg-white border border-concrete rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-data text-xs uppercase" htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" required className="w-full bg-white border border-concrete rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="font-data text-xs uppercase" htmlFor="notes">Tell us a little about what you're looking for</label>
                <textarea name="message" id="notes" rows="3" required className="w-full bg-white border border-concrete rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-black text-white rounded-xl py-4 font-medium flex justify-center items-center gap-2 hover:bg-black/80 transition-colors">
                Request Showroom Visit <ArrowRight size={18} />
              </button>
            </form>
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
            
            <div className="space-y-6 font-body text-black/80 font-medium w-full">
              <div>
                <p className="font-data text-xs uppercase tracking-wider text-primary mb-2">Hamilton</p>
                {[
                  { day: 'Monday', hours: '9:00 AM - 5:00 PM', closed: false },
                  { day: 'Tuesday', hours: '9:00 AM - 5:00 PM', closed: false },
                  { day: 'Wednesday', hours: '9:00 AM - 5:00 PM', closed: false },
                  { day: 'Thursday', hours: '9:00 AM - 5:00 PM', closed: false },
                  { day: 'Friday', hours: '9:00 AM - 5:00 PM', closed: false },
                  { day: 'Saturday', hours: 'Closed', closed: true },
                  { day: 'Sunday', hours: 'Closed', closed: true }
                ].map(({ day, hours, closed }) => (
                  <div key={day} className={`flex justify-between items-center py-2.5 border-b border-concrete/40 last:border-0 ${closed ? 'text-black/40' : ''}`}>
                    <span>{day}</span>
                    <span className={closed ? 'font-normal text-black/40' : 'text-black'}>{hours}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-data text-xs uppercase tracking-wider text-primary mb-2">Hillington</p>
                {[
                  { day: 'Monday', hours: '10:00 AM - 5:00 PM', closed: false },
                  { day: 'Tuesday', hours: '10:00 AM - 5:00 PM', closed: false },
                  { day: 'Wednesday', hours: '10:00 AM - 5:00 PM', closed: false },
                  { day: 'Thursday', hours: '10:00 AM - 5:00 PM', closed: false },
                  { day: 'Friday', hours: '10:00 AM - 5:00 PM', closed: false },
                  { day: 'Saturday', hours: '10:00 AM - 4:00 PM', closed: false },
                  { day: 'Sunday', hours: '12:00 PM - 4:00 PM', closed: false }
                ].map(({ day, hours, closed }) => (
                  <div key={day} className={`flex justify-between items-center py-2.5 border-b border-concrete/40 last:border-0 ${closed ? 'text-black/40' : ''}`}>
                    <span>{day}</span>
                    <span className={closed ? 'font-normal text-black/40' : 'text-black'}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-bone pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-drama font-bold text-5xl md:text-6xl text-black mb-8 border-b border-concrete pb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg text-black/80 font-body space-y-8">
          <div>
            <p className="text-sm text-black/60 font-data mb-6">The Gallery Design Bedrooms Ltd<br/>Last updated: March 2026</p>
          </div>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">1. WHO WE ARE</h2>
            <p>The Gallery Design Bedrooms Ltd ("we", "us", or "our") is a company registered in Scotland. Our principal place of business is at Burnbank Road, Hamilton, ML3 9AZ. We are the data controller responsible for your personal information.</p>
            <p className="mt-4">If you have any questions about this Privacy Policy or how we handle your personal data, please contact us at gallerydesignbedrooms@gmail.com or call 01698 286866.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">2. WHAT INFORMATION WE COLLECT</h2>
            <p className="mb-4">We may collect the following types of personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact details:</strong> name, email address, phone number, and postal address</li>
              <li><strong>Enquiry information:</strong> details about your project, room dimensions, and design preferences you share with us</li>
              <li><strong>Communications:</strong> records of correspondence between you and us, including emails and call notes</li>
              <li><strong>Website usage data:</strong> IP address, browser type, pages visited, and time spent on our website (collected via cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">3. HOW WE COLLECT YOUR INFORMATION</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>When you fill in a contact or booking form on our website</li>
              <li>When you call or email us directly</li>
              <li>When you visit our showroom</li>
              <li>When you interact with our website (via cookies and analytics tools)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">4. HOW WE USE YOUR INFORMATION</h2>
            <p className="mb-4">We use your personal data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your enquiries and provide quotations</li>
              <li>Schedule and manage showroom appointments and home visits</li>
              <li>Carry out the services you have requested, including design, manufacture, and installation</li>
              <li>Process payments and maintain financial records</li>
              <li>Send you service-related communications (e.g. appointment confirmations, installation updates)</li>
              <li>Improve our website and services</li>
              <li>Comply with our legal obligations</li>
            </ul>
            <p className="mt-4">We will only send you marketing communications if you have given us permission to do so, and you can opt out at any time.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">5. LEGAL BASIS FOR PROCESSING</h2>
            <p className="mb-4">We process your personal data on the following legal bases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contract:</strong> where processing is necessary to fulfil a contract with you (e.g. to deliver your order)</li>
              <li><strong>Legitimate interests:</strong> where we have a legitimate business interest, such as responding to enquiries or improving our services</li>
              <li><strong>Legal obligation:</strong> where we are required to process data to comply with the law</li>
              <li><strong>Consent:</strong> where you have given us clear consent, such as for marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">6. WHO WE SHARE YOUR DATA WITH</h2>
            <p>We do not sell your personal data to third parties. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Our installation and delivery teams (where necessary to complete your order)</li>
              <li>IT and website service providers who process data on our behalf</li>
              <li>Our accountant or legal advisers where required</li>
              <li>HMRC or other regulatory authorities where we are legally required to do so</li>
            </ul>
            <p className="mt-4">Any third parties we share data with are required to keep it secure and use it only for the purpose it was shared.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">7. HOW LONG WE KEEP YOUR DATA</h2>
            <p>We retain personal data only for as long as necessary. Typically:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Enquiries that do not result in a sale are kept for up to 12 months</li>
              <li>Customer and order records are kept for 7 years to comply with financial and legal obligations</li>
              <li>Website analytics data is retained as per our analytics provider's standard retention periods</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">8. YOUR RIGHTS</h2>
            <p className="mb-4">Under UK data protection law, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request erasure of your data (in certain circumstances)</li>
              <li>Object to or restrict how we process your data</li>
              <li>Request portability of your data</li>
              <li>Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p className="mt-4">To exercise any of these rights, please contact us at gallerydesignbedrooms@gmail.com. We will respond within one month. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">9. COOKIES</h2>
            <p>Our website uses cookies to improve your browsing experience and to help us understand how visitors use our site. Cookies are small text files stored on your device. You can control or disable cookies through your browser settings, though this may affect how certain parts of our website function.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">10. SECURITY</h2>
            <p>We take appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. However, no internet transmission is completely secure, and we cannot guarantee the absolute security of data sent to us electronically.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">11. CHANGES TO THIS POLICY</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">12. CONTACT US</h2>
            <p className="mb-4">If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>By email: gallerydesignbedrooms@gmail.com</li>
              <li>By phone: 01698 286866</li>
              <li>By post: The Gallery Design Bedrooms Ltd, Burnbank Road, Hamilton, ML3 9AZ</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-bone pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-drama font-bold text-5xl md:text-6xl text-black mb-8 border-b border-concrete pb-8">
          Terms of Service
        </h1>
        <div className="prose prose-lg text-black/80 font-body space-y-8">
          <div>
            <p className="text-sm text-black/60 font-data mb-6">The Gallery Design Bedrooms Ltd<br/>Last updated: March 2026</p>
          </div>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">1. INTRODUCTION</h2>
            <p>These Terms of Service ("Terms") govern your use of the website at gallerydesigns.vercel.app and any services provided by The Gallery Design Bedrooms Ltd ("we", "us", or "our"), a company registered in Scotland with its principal place of business at Burnbank Road, Hamilton, ML3 9AZ.</p>
            <p className="mt-4">By visiting our website, booking an appointment, requesting a quotation, or engaging our services in any way, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">2. OUR SERVICES</h2>
            <p className="mb-4">The Gallery Design Bedrooms Ltd provides bespoke fitted storage and bedroom furniture solutions, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Walk-in wardrobes</li>
              <li>Fitted wardrobes</li>
              <li>Sliding wardrobes</li>
              <li>Elegant closets and dressing rooms</li>
              <li>Home office fitted storage</li>
              <li>Living room and TV units</li>
              <li>Bedroom furniture and storage solutions</li>
              <li>Bespoke solutions for awkward or unusual spaces</li>
            </ul>
            <p className="mt-4">All work is carried out on a bespoke, made-to-measure basis. The exact scope of each project will be agreed in writing prior to commencement.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">3. QUOTATIONS AND ORDERS</h2>
            <div className="space-y-4">
              <p><strong>3.1</strong> All quotations provided by us are free of charge and carry no obligation.</p>
              <p><strong>3.2</strong> A quotation is valid for 30 days from the date of issue unless otherwise stated.</p>
              <p><strong>3.3</strong> An order is only confirmed once you have accepted the quotation in writing and paid any required deposit. At this point a binding contract is formed between you and The Gallery Design Bedrooms Ltd.</p>
              <p><strong>3.4</strong> Any changes to the agreed specification after an order is confirmed may result in revised pricing and/or revised installation dates. All changes must be agreed in writing.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">4. PRICING AND PAYMENT</h2>
            <div className="space-y-4">
              <p><strong>4.1</strong> All prices quoted include VAT unless otherwise stated.</p>
              <p><strong>4.2</strong> A deposit is required upon confirmation of order. The deposit amount will be specified in your quotation.</p>
              <p><strong>4.3</strong> The remaining balance is due upon satisfactory completion of the installation, unless otherwise agreed in writing.</p>
              <p><strong>4.4</strong> We reserve the right to charge interest on overdue balances at a rate of 8% per annum above the Bank of England base rate in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">5. INSTALLATION</h2>
            <div className="space-y-4">
              <p><strong>5.1</strong> Installation dates will be agreed with you in advance. We will make every reasonable effort to meet agreed dates, however dates may be subject to change due to circumstances outside our control.</p>
              <p><strong>5.2</strong> You are responsible for ensuring the installation area is clear and accessible prior to our team's arrival. Any additional costs arising from failure to do so may be charged to you.</p>
              <p><strong>5.3</strong> Our team will take reasonable care to protect your property during installation. Floor and surface protection will be used where appropriate.</p>
              <p><strong>5.4</strong> Upon completion, you will be asked to inspect the work. Any defects or concerns must be raised at this point or within 7 days of completion in writing.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">6. CANCELLATIONS AND CHANGES</h2>
            <div className="space-y-4">
              <p><strong>6.1</strong> You may cancel your order within 14 days of confirmation provided manufacture of your bespoke furniture has not yet commenced. In this case your deposit will be refunded in full.</p>
              <p><strong>6.2</strong> If manufacture has commenced, we reserve the right to retain some or all of the deposit to cover reasonable costs already incurred.</p>
              <p><strong>6.3</strong> We reserve the right to cancel or postpone an order in exceptional circumstances. In such cases we will notify you promptly and arrange a full refund of any monies paid.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">7. WARRANTY AND DEFECTS</h2>
            <div className="space-y-4">
              <p><strong>7.1</strong> All products and installation work carried out by The Gallery Design Bedrooms Ltd are covered by a workmanship guarantee. The duration of this guarantee will be specified in your quotation.</p>
              <p><strong>7.2</strong> This guarantee covers defects in materials and workmanship under normal use and does not extend to damage caused by misuse, accidental damage, neglect, unauthorised modification, or fair wear and tear.</p>
              <p><strong>7.3</strong> To make a warranty claim, please contact us at gallerydesignbedrooms@gmail.com or call 01698 286866. We will arrange an inspection and, where a valid defect is found, carry out repair or replacement at no cost to you.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">8. LIMITATION OF LIABILITY</h2>
            <div className="space-y-4">
              <p><strong>8.1</strong> Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law.</p>
              <p><strong>8.2</strong> Subject to clause 8.1, our total liability to you in connection with any contract shall not exceed the total value of the contract price paid by you.</p>
              <p><strong>8.3</strong> We are not liable for any indirect, consequential, or economic losses arising from delays, defects, or cancellations except where required by law.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">9. USE OF OUR WEBSITE</h2>
            <div className="space-y-4">
              <p><strong>9.1</strong> You may use our website for lawful purposes only. You must not use the website in any way that is unlawful, harmful, or that infringes the rights of others.</p>
              <p><strong>9.2</strong> All content on this website, including text, images, logos, and design, is the property of The Gallery Design Bedrooms Ltd or its licensors and is protected by copyright. You may not reproduce or distribute any content without our prior written permission.</p>
              <p><strong>9.3</strong> We make every effort to ensure the information on our website is accurate and up to date, but we give no warranty as to its completeness or accuracy. We reserve the right to change or remove content at any time without notice.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">10. SHOWROOM APPOINTMENTS</h2>
            <div className="space-y-4">
              <p><strong>10.1</strong> Showroom appointments are offered free of charge and with no obligation to purchase.</p>
              <p><strong>10.2</strong> If you are unable to attend a booked appointment, please notify us as soon as possible by calling 01698 286866 or emailing gallerydesignbedrooms@gmail.com so we can offer the slot to another customer.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">11. PRIVACY</h2>
            <p>Your use of our website and services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our website or services, you confirm that you have read and understood our Privacy Policy. A copy is available on our website at /privacy-policy.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">12. GOVERNING LAW</h2>
            <p>These Terms are governed by the laws of Scotland. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the Scottish courts.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">13. CHANGES TO THESE TERMS</h2>
            <p>We reserve the right to update these Terms at any time. Changes will be posted on this page with a revised "Last updated" date. Continued use of our website or services after changes are posted constitutes your acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-black mb-4">14. CONTACT US</h2>
            <p className="mb-4">If you have any questions about these Terms, please contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>By email: gallerydesignbedrooms@gmail.com</li>
              <li>By phone: 01698 286866</li>
              <li>By post: The Gallery Design Bedrooms Ltd, Burnbank Road, Hamilton, ML3 9AZ</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
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
          <a href="/#contact" className="text-bone/60 hover:text-bone hover:translate-x-2 transition-all w-fit">Book Showroom</a>
          <a href="/#process" className="text-bone/60 hover:text-bone hover:translate-x-2 transition-all w-fit">Our Process</a>
          <a href="/#work" className="text-bone/60 hover:text-bone hover:translate-x-2 transition-all w-fit">Portfolio</a>
          <a href="/#contact" className="text-bone/60 hover:text-bone hover:translate-x-2 transition-all w-fit">Contact</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-data text-concrete/40">
        <p>&copy; {new Date().getFullYear()} Gallery Design. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
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
        <div className="elfsight-app-ce7da6d4-0b5a-4eed-9e88-07a33c89fc75" data-elfsight-app-lazy></div>
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Credentials />
              <Services />
              <Work />
              <Process />
              <Reviews />
              <section className="py-20 bg-bone">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                  <h2 className="font-heading font-medium text-4xl lg:text-5xl tracking-tight mb-12 text-center">
                    Latest on TikTok
                  </h2>
                  <div className="elfsight-app-bbf01bb6-80de-47f4-91e2-3c4738b28400" data-elfsight-app-lazy></div>
                </div>
              </section>
              <Trust />
              <Booking />
            </main>
          } />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
