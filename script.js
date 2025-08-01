```jsx
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown, ChevronRight, Phone, Mail, MapPin, Send, ArrowRight, Sparkles, Star, Gem } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Refs for scroll sections
  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  
  // Scroll animations
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 500], [0, -30]);
  
  // Animation controls
  const heroControls = useAnimation();
  const solutionsControls = useAnimation();
  const aboutControls = useAnimation();
  const contactControls = useAnimation();
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'solutions', ref: solutionsRef },
        { id: 'about', ref: aboutRef },
        { id: 'contact', ref: contactRef }
      ];
      
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && scrollPosition >= section.ref.current.offsetTop) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animate sections on scroll
  useEffect(() => {
    const animateOnScroll = async () => {
      if (heroRef.current) {
        await heroControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" }
        });
      }
    };
    
    animateOnScroll();
  }, [heroControls]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            switch(entry.target.id) {
              case 'solutions':
                solutionsControls.start({
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                });
                break;
              case 'about':
                aboutControls.start({
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                });
                break;
              case 'contact':
                contactControls.start({
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                });
                break;
              default:
                break;
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (solutionsRef.current) observer.observe(solutionsRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (contactRef.current) observer.observe(contactRef.current);
    
    return () => {
      if (solutionsRef.current) observer.unobserve(solutionsRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, [solutionsControls, aboutControls, contactControls]);
  
  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'solutions', label: 'Solutions', href: '#solutions' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];
  
  // Solution cards data
  const solutions = [
    {
      id: 1,
      icon: <Gem className="w-10 h-10" />,
      title: "Premium Consulting",
      description: "Expert guidance tailored to your unique business needs with a focus on sustainable growth and innovation.",
      gradient: "from-indigo-500/10 to-purple-500/10"
    },
    {
      id: 2,
      icon: <Sparkles className="w-10 h-10" />,
      title: "Strategic Planning",
      description: "Comprehensive roadmap development to navigate complex market landscapes and seize emerging opportunities.",
      gradient: "from-rose-500/10 to-orange-500/10"
    },
    {
      id: 3,
      icon: <Star className="w-10 h-10" />,
      title: "Executive Leadership",
      description: "Elite leadership development programs designed to cultivate visionary leaders who drive organizational excellence.",
      gradient: "from-emerald-500/10 to-teal-500/10"
    }
  ];
  
  // Submit handler for contact form
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };
  
  // Initialize dark mode from system preference or localStorage
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('luxuryDarkMode') === 'true';
    
    const initialDarkMode = savedDarkMode !== null ? savedDarkMode : prefersDark;
    setDarkMode(initialDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);
  }, []);
  
  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('luxuryDarkMode', darkMode.toString());
  }, [darkMode]);
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      {/* Luxury Animated Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        animate={{
          background: darkMode 
            ? [
                'linear-gradient(120deg, #1a1c23 0%, #2a2c38 50%, #1a1c23 100%)',
                'linear-gradient(120deg, #2a2c38 0%, #1a1c23 50%, #2a2c38 100%)',
                'linear-gradient(120deg, #1a1c23 0%, #2a2c38 50%, #1a1c23 100%)'
              ]
            : [
                'linear-gradient(120deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)',
                'linear-gradient(120deg, #f1f5f9 0%, #f8fafc 50%, #f1f5f9 100%)',
                'linear-gradient(120deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)'
              ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Header with glassmorphism effect */}
      <motion.header 
        ref={heroRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full z-50 backdrop-blur-md transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-900/80 border-gray-800' 
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className={`flex items-center space-x-2 p-2 rounded-xl ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/50'
              }`}>
                <Gem className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`font-bold text-xl bg-clip-text text-transparent ${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-400 to-indigo-400' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                }`}>
                  Luxora
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative px-1 py-2 font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? darkMode
                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-indigo-400'
                        : 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-600 after:to-indigo-600'
                      : darkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'text-yellow-300 hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'text-yellow-300 hover:bg-gray-800' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-white focus:ring-white' 
                    : 'text-gray-600 hover:text-gray-900 focus:ring-gray-900'
                }`}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden absolute w-full top-16 left-0 z-50 shadow-xl ${
              darkMode ? 'bg-gray-800/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? darkMode
                        ? 'text-white bg-gray-700/50'
                        : 'text-gray-900 bg-gray-100'
                      : darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>
      
      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{ 
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY
            }}
            className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 dark:from-purple-900/10 dark:to-indigo-900/10"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,90,213,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(128,90,213,0.15),transparent_50%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroControls}
              className="inline-block mb-6"
            >
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                darkMode 
                  ? 'bg-gray-800/70 text-purple-300 border border-purple-900/30' 
                  : 'bg-white/70 text-purple-700 border border-purple-100'
              } backdrop-blur-sm`}>
                Premium Business Solutions
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={heroControls}
              transition={{ delay: 0.2 }}
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-400 dark:to-indigo-400">
                Elevate Your Business
              </span>
              <br />
              <span className="block mt-2">With Timeless Excellence</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroControls}
              transition={{ delay: 0.4 }}
              className={`max-w-3xl mx-auto mb-10 text-xl ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Discover bespoke solutions designed to transform your vision into reality. 
              We blend innovative strategy with refined execution to deliver exceptional results.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroControls}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a 
                href="#contact" 
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#solutions"
                className={`group inline-flex items-center px-8 py-4 font-medium rounded-xl transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-800/70 hover:bg-gray-700/70 text-white border border-gray-700/50'
                    : 'bg-white/70 hover:bg-gray-50/70 text-gray-800 border border-gray-200/50'
                } backdrop-blur-sm`}
              >
                Our Solutions
                <ChevronDown className="ml-2 w-5 h-5 transform group-hover:translate-y-1 transition-transform" />
              </a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-20 flex justify-center"
            >
              <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                <ChevronDown className="w-6 h-6 animate-bounce" />
                <span className="mt-2 text-sm">Discover more</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Solutions Section */}
      <section id="solutions" ref={solutionsRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={solutionsControls}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              darkMode 
                ? 'bg-gray-800/70 text-purple-300 border border-purple-900/30' 
                : 'bg-white/70 text-purple-700 border border-purple-100'
            } backdrop-blur-sm`}>
              Our Expertise
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Premium Solutions for <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-400 dark:to-indigo-400">Exceptional Results</span>
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We deliver tailored strategies that address your unique challenges and opportunities, 
              ensuring sustainable growth and competitive advantage.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                animate={solutionsControls}
                transition={{ delay: index * 0.1 }}
              >
                <SolutionCard 
                  solution={solution} 
                  index={index}
                  darkMode={darkMode}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={aboutControls}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className={`rounded-2xl overflow-hidden ${
                darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
              } backdrop-blur-sm border ${
                darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
              }`}>
                <div className="aspect-w-16 aspect-h-9">
                  <div className={`w-full h-64 md:h-80 lg:h-96 rounded-2xl ${
                    darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                  } flex items-center justify-center`}>
                    <div className="text-center p-8">
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
                          <Gem className={`w-16 h-16 p-3 rounded-2xl ${
                            darkMode 
                              ? 'bg-gray-800 text-purple-400' 
                              : 'bg-white text-purple-600'
                          }`} />
                        </div>
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Our Legacy of Excellence
                      </h3>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Since 2005, we've been delivering premium business solutions with unwavering commitment to quality and client satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-purple-500/10 dark:bg-purple-500/5 backdrop-blur-sm border border-purple-500/20 dark:border-purple-500/10" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/5 backdrop-blur-sm border border-indigo-500/20 dark:border-indigo-500/10" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={aboutControls}
              transition={{ duration: 0.6 }}
            >
              <div className={`rounded-2xl p-8 ${
                darkMode 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
                  : 'bg-white/50 backdrop-blur-sm border border-gray-200/50'
              }`}>
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
                  darkMode 
                    ? 'bg-gray-700/50 text-purple-300' 
                    : 'bg-gray-100/50 text-purple-700'
                }`}>
                  About Us
                </span>
                
                <h2 className={`text-3xl font-bold mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Crafted for <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-400 dark:to-indigo-400">Perfection</span>
                </h2>
                
                <div className="space-y-6 mb-8">
                  <p className={`text-lg ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    At Luxora, we believe that true luxury lies in the details. Our team of seasoned professionals combines decades of industry experience with innovative thinking to deliver solutions that exceed expectations.
                  </p>
                  
                  <p className={`text-lg ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    We've cultivated long-term partnerships with clients across diverse industries, helping them navigate complex challenges and seize new opportunities with confidence and clarity.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className={`p-4 rounded-xl ${
                      darkMode ? 'bg-gray-800/70' : 'bg-gray-50/70'
                    } backdrop-blur-sm`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        15+
                      </div>
                      <div className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Years of Experience
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${
                      darkMode ? 'bg-gray-800/70' : 'bg-gray-50/70'
                    } backdrop-blur-sm`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        250+
                      </div>
                      <div className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Global Clients
                      </div>
                    </div>
                  </div>
                </div>
                
                <a 
                  href="#contact"
                  className="group inline-flex items-center text-lg font-medium transition-all duration-300"
                >
                  <span className={`mr-2 ${
                  darkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                    Learn more about our approach
                  </span>
                  <ChevronRight className={`w-5 h-5 transform group-hover:translate-x-1 transition-transform ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 relative">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 right-1/4 w-52 h-52 bg-indigo-500/5 rounded-full blur-2xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contactControls}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              darkMode 
                ? 'bg-gray-800/70 text-purple-300 border border-purple-900/30' 
                : 'bg-white/70 text-purple-700 border border-purple-100'
            } backdrop-blur-sm`}>
              Get in Touch
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-400 dark:to-indigo-400">Create Something</span> Extraordinary
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Ready to elevate your business? Contact us today for a personalized consultation 
              and discover how our premium solutions can transform your vision into reality.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contactControls}
              transition={{ duration: 0.5 }}
            >
              <div className={`rounded-2xl p-8 ${
                darkMode 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
                  : 'bg-white/50 backdrop-blur-sm border border-gray-200/50'
              }`}>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                    }`}>
                      <MapPin className={`w-6 h-6 ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Our Office
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-300`}>
                        123 Luxury Avenue<br />
                        Suite 1000<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                    }`}>
                      <Phone className={`w-6 h-6 ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Phone
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-300`}>
                        +1 (212) 555-7890
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                    }`}>
                      <Mail className={`w-6 h-6 ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Email
                      </h3>
                      <p className={`text-gray-600 dark:text-gray-300`}>
                        info@luxora.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={contactControls}
              transition={{ duration: 0.5 }}
            >
              <form 
                onSubmit={handleSubmit}
                className={`rounded-2xl p-8 ${
                  darkMode 
                    ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
                    : 'bg-white/50 backdrop-blur-sm border border-gray-200/50'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/50 ${
                        darkMode 
                          ? 'bg-gray-800/50 border border-gray-700/50 text-white' 
                          : 'bg-white border border-gray-200/50 text-gray-900'
                      }`}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/50 ${
                        darkMode 
                          ? 'bg-gray-800/50 border border-gray-700/50 text-white' 
                          : 'bg-white border border-gray-200/50 text-gray-900'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/50 ${
                      darkMode 
                        ? 'bg-gray-800/50 border border-gray-700/50 text-white' 
                        : 'bg-white border border-gray-200/50 text-gray-900'
                    }`}
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    required
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/50 ${
                      darkMode 
                        ? 'bg-gray-800/50 border border-gray-700/50 text-white' 
                        : 'bg-white border border-gray-200/50 text-gray-900'
                    }`}
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={`py-12 border-t ${
        darkMode 
          ? 'border-gray-800 bg-gray-900/50' 
          : 'border-gray-100 bg-white/50'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className={`flex items-center space-x-2 p-2 rounded-xl ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/50'
              }`}>
                <Gem className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`font-bold text-xl bg-clip-text text-transparent ${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-400 to-indigo-400' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                }`}>
                  Luxora
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`text-sm transition-all duration-300 ${
                    activeSection === item.id
                      ? darkMode
                        ? 'text-white font-medium' 
                        : 'text-gray-900 font-medium'
                      : darkMode
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="text-sm">
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                © {new Date().getFullYear()} Luxora. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Solution Card Component
const SolutionCard = ({ solution, index, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`rounded-2xl p-8 relative overflow-hidden ${
        darkMode 
          ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
          : 'bg-white/50 backdrop-blur-sm border border-gray-200/50'
      } transition-all duration-300 cursor-pointer`}
    >
      {/* Decorative gradient background */}
      <div 
        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom right, rgba(128, 90, 213, 0.08), transparent)'
        }}
      />
      
      {/* Animated border on hover */}
      <div 
        className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 ${
          isHovered 
            ? darkMode
              ? 'border-gradient-to-r from-purple-500/50 to-indigo-500/50' 
              : 'border-gradient-to-r from-purple-500 to-indigo-500'
            : ''
        }`}
      />
      
      {/* Icon container with subtle animation */}
      <motion.div
        animate={{
          y: isHovered ? -5 : 0,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className={`p-4 rounded-xl w-fit mb-6 ${
          darkMode 
            ? 'bg-gray-700/50' 
            : 'bg-gray-100/50'
        }`}
      >
        {solution.icon}
      </motion.div>
      
      <h3 className={`text-xl font-bold mb-4 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {solution.title}
      </h3>
      
      <p className={`text-base mb-6 ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {solution.description}
      </p>
      
      <div className="flex items-center">
        <span className={`font-medium ${
          darkMode ? 'text-purple-400' : 'text-purple-600'
        }`}>
          Learn more
        </span>
        <ChevronRight className={`ml-2 w-4 h-4 transition-transform duration-300 ${
          isHovered 
            ? darkMode
              ? 'text-purple-300' 
              : 'text-purple-500'
            : darkMode
            ? 'text-purple-400' 
            : 'text-purple-600'
        }`} />
      </div>
      
      {/* Floating decorative element */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.5
        }}
        className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${
          darkMode ? 'bg-purple-500/10' : 'bg-purple-100'
        }`}
      />
    </motion.div>
  );
};

export default App;
```
