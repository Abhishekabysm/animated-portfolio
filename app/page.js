'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FaHome, FaLaptopCode, FaPaintBrush, FaMobileAlt, FaEnvelope, FaHandSparkles } from 'react-icons/fa'
import { useSpring as useReactSpring, animated } from 'react-spring'

const images = ['/image11.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image5.jpg']
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FF6B6B']

const sectionContent = [
  {
    title: "Welcome to My Portfolio",
    description: "I'm a passionate web developer with a keen eye for design and a love for creating seamless user experiences. Explore my projects and see how I bring ideas to life through code.",
    buttonText: "Explore Projects"
  },
  {
    title: "Web Development",
    description: "Specializing in modern web technologies like React, Next.js, and Node.js. I build responsive, scalable, and performant web applications that deliver exceptional user experiences.",
    buttonText: "View Projects"
  },
  {
    title: "UI/UX Design",
    description: "Crafting intuitive and visually appealing interfaces is my passion. I focus on user-centered design principles to create designs that are both beautiful and functional.",
    buttonText: "See Designs"
  },
  {
    title: "Mobile Development",
    description: "Extending web expertise to mobile platforms, I develop cross-platform applications using React Native and Flutter. Creating native-like experiences for iOS and Android.",
    buttonText: "Mobile Apps"
  },
  {
    title: "Let's Connect",
    description: "Interested in working together or have a project in mind? I'm always open to new opportunities and collaborations. Let's create something amazing together!",
    buttonText: "Contact Me"
  }
];

const menuItems = [
  { icon: FaHome, title: "Welcome" },
  { icon: FaLaptopCode, title: "Web Dev" },
  { icon: FaPaintBrush, title: "UI/UX" },
  { icon: FaMobileAlt, title: "Mobile" },
  { icon: FaEnvelope, title: "Connect" }
];

// Helper functions for image placeholder
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[index])
        setIndex(index + 1)
      }, 100) // Adjust this value to change typing speed
      return () => clearTimeout(timer)
    }
  }, [text, index])

  return (
    <div className="typewriter">
      <h1>{displayText}</h1>
    </div>
  )
}

const LoadingScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onLoadingComplete, 3500) // Adjust time as needed
    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        animate={{ 
          rotate: [0, 20, 0, 20, 0],
        }}
        transition={{ 
          duration: 2.5,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
        style={{ originX: 0.7, originY: 0.7 }}
      >
        <FaHandSparkles className="text-6xl mb-8" />
      </motion.div>
      <motion.div
        className="h-20 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <TypewriterText text="Hello There!" />
      </motion.div>
      <motion.div
        className="w-64 h-2 bg-gray-700 rounded-full mt-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  )
}

// Add these new components

const AnimatedText = ({ text }) => {
  const words = text.split(' ')
  return (
    <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-20 sm:mt-20 md:mt-20 mb-4 leading-tight">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.h2>
  )
}

const Counter = ({ end, duration = 2000 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { number } = useReactSpring({
    from: { number: 0 },
    number: inView ? end : 0,
    delay: 200,
    config: { duration: duration },
  })

  return (
    <animated.span ref={ref}>
      {number.to((n) => n.toFixed(0))}
    </animated.span>
  )
}

const SkillBar = ({ skill, level }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{skill}</span>
        <span>{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <motion.div
          className="h-full bg-black rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

const Header = ({ activeSection, handleNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const menuItems = [
    { icon: FaHome, label: 'Home', color: '#FF6B6B' },
    { icon: FaLaptopCode, label: 'Web Dev', color: '#4ECDC4' },
    { icon: FaPaintBrush, label: 'UI/UX', color: '#45B7D1' },
    { icon: FaMobileAlt, label: 'Mobile', color: '#FFA07A' },
    { icon: FaEnvelope, label: 'Contact', color: '#98D8C8' }
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold">Abhishek</div>
        {isMobile ? (
          <button
            className="p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <motion.div
              className="w-6 h-5 flex flex-col justify-between"
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-full h-0.5 bg-black block"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: i === 1 
                      ? { opacity: 0 } 
                      : { rotate: i === 0 ? 45 : -45, y: i === 0 ? 8 : -8 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.div>
          </button>
        ) : (
          <nav className="space-x-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  activeSection === index ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleNavClick(index)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.nav
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="p-6 bg-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
                </div>
                <div className="flex-grow overflow-y-auto">
                  <div className="flex flex-col p-4 space-y-2">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={index}
                        className={`flex items-center w-full py-4 px-6 rounded-xl text-left transition-all duration-200 ${
                          activeSection === index 
                            ? 'bg-gray-800 text-white shadow-md' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          handleNavClick(index)
                          setIsMenuOpen(false)
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className={`mr-4 text-2xl ${activeSection === index ? 'text-white' : ''}`}
                          style={{ color: activeSection === index ? 'white' : item.color }}
                        >
                          <item.icon />
                        </div>
                        <span className="text-lg font-medium">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-gray-100">
                  <button 
                    className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Close Menu
                  </button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default function Page() {
  const containerRef = useRef(null)
  const sectionsRef = useRef([])
  const imagesRef = useRef([])
  const cursorRef = useRef(null)
  const cursorTextRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const [cursorText, setCursorText] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [gsapInstance, setGsapInstance] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [loadedImages, setLoadedImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const handleNavClick = useCallback((index) => {
    setActiveIndex(index)
    setIsMenuOpen(false)
    if (gsapInstance && sectionsRef.current[index]) {
      gsapInstance.to(window, {
        duration: 1,
        scrollTo: { y: sectionsRef.current[index], offsetY: 80 },
        ease: 'power3.inOut'
      })
    }
  }, [gsapInstance])

  const handleScroll = useCallback(() => {
    if (isMobile) return // Skip scroll calculations on mobile
    const scrollPx = window.scrollY
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = scrollPx / winHeightPx
    setScrollProgress(scrolled)
  }, [isMobile])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image()
          img.src = src
          img.onload = () => resolve(src)
          img.onerror = reject
        })
      })
      await Promise.all(imagePromises)
    }

    preloadImages()
  }, [])

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import('gsap')).default
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
      const ScrollToPlugin = (await import('gsap/ScrollToPlugin')).default

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
      setGsapInstance(gsap)

      const sections = sectionsRef.current
      const imageElements = imagesRef.current

      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out'
            })
            gsap.to(imageElements[index], {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out'
            })
            setActiveSection(index)
            setActiveIndex(index)
          },
          onLeaveBack: () => {
            gsap.to(section, {
              opacity: 0,
              y: 50,
              duration: 0.5,
              ease: 'power2.in'
            })
            gsap.to(imageElements[index], {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.in'
            })
            setActiveSection(index - 1)
            setActiveIndex(index - 1)
          }
        })
      })
    }

    if (!isLoading) {
      loadGSAP()
    }
  }, [isLoading])

  // Add this new useEffect to handle background color changes
  useEffect(() => {
    if (gsapInstance) {
      gsapInstance.to('.background-transition', {
        backgroundColor: colors[activeSection],
        duration: 0.5,
        ease: 'power2.inOut'
      })
    }
  }, [activeSection, gsapInstance])

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = window.scrollY
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx

      document.body.style.setProperty('--scroll', scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress() // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  useEffect(() => {
    const color = colors[activeSection]
    document.documentElement.style.setProperty('--scrollbar-color', color)
    document.documentElement.style.setProperty('--scrollbar-hover-color', adjustColor(color, 20))
  }, [activeSection])

  // Helper function to lighten/darken a color
  function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  useEffect(() => {
    // Preload the first image
    const preloadImage = new window.Image()
    preloadImage.src = images[0]
    preloadImage.onload = () => setIsFirstImageLoaded(true)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      {!isLoading && isFirstImageLoaded && (
        <div ref={containerRef} className="text-black min-h-screen relative">
          <div className="background-transition fixed inset-0 transition-colors duration-500" style={{ backgroundColor: colors[activeSection] }} />
          <div className="relative z-10">
            <Header activeSection={activeSection} handleNavClick={handleNavClick} />
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-50"
                  onClick={toggleMenu}
                >
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg z-60 p-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.button
                      className="absolute top-4 right-4 text-2xl"
                      onClick={toggleMenu}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>
                    <nav className="flex flex-col space-y-2 mt-16">
                      {menuItems.map((item, index) => (
                        <motion.div
                          key={index}
                          className="relative overflow-hidden"
                          initial={false}
                          animate={{ 
                            color: activeIndex === index ? colors[index] : '#000',
                            backgroundColor: activeIndex === index ? `${colors[index]}22` : 'transparent'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.button
                            className="nav-button flex items-center w-full text-left py-3 px-4 rounded-lg"
                            onClick={() => handleNavClick(index)}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              className="mr-3 text-xl"
                              initial={{ rotate: 0 }}
                              animate={{ rotate: activeIndex === index ? 360 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <item.icon />
                            </motion.div>
                            <span className="text-lg font-semibold">{item.title}</span>
                          </motion.button>
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: activeIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      ))}
                    </nav>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            {!isMobile && (
              <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-black z-50"
                style={{ 
                  scaleX: scrollProgress, 
                  transformOrigin: "0%",
                }}
              />
            )}
            {images.map((src, index) => (
              <Section
                key={src}
                index={index}
                src={src}
                color={colors[index]}
                setActiveSection={setActiveSection}
                setCursorText={setCursorText}
                sectionsRef={sectionsRef}
                imagesRef={imagesRef}
                shouldReduceMotion={shouldReduceMotion}
                content={sectionContent[index]}
                isFirstLoad={index === 0}
                isMobile={isMobile}
              />
            ))}
            <motion.div 
              ref={cursorRef}
              className="fixed w-8 h-8 bg-black rounded-full mix-blend-difference pointer-events-none z-50 hidden md:block"
              style={{ left: -20, top: -20 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              ref={cursorTextRef}
              className="fixed text-white text-sm font-bold pointer-events-none z-50 hidden md:block"
              style={{ left: -20, top: -20 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: cursorText ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {cursorText}
            </motion.div>
          </div>
        </div>
      )}
    </>
  )
}
const Section = React.memo(({ index, src, color, setActiveSection, setCursorText, sectionsRef, imagesRef, shouldReduceMotion, content, isFirstLoad }) => {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Simplified animations for mobile
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Spring configuration
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const animatedContentY = useSpring(contentY, springConfig)

  return (
    <motion.section 
      ref={(el) => {
        sectionRef.current = el
        sectionsRef.current[index] = el
      }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: color }}
    >
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
        }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center relative z-20" ref={ref}>
        <motion.div 
          className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 text-white"
          style={{
            y: isMobile || shouldReduceMotion ? 0 : animatedContentY,
            opacity: isMobile || shouldReduceMotion ? 1 : contentOpacity,
          }}
        >
          <AnimatePresence>
            {inView && (
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-20 sm:mt-20 md:mt-20 mb-4 leading-tight"
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 50 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={isMobile ? { opacity: 0 } : { opacity: 0, y: -50 }}
                transition={{ duration: isMobile ? 0.3 : 0.5 }}
              >
                {content.title}
              </motion.h2>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {inView && (
              <motion.p 
                className="text-lg md:text-xl mb-8"
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 50 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={isMobile ? { opacity: 0 } : { opacity: 0, y: -50 }}
                transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.1 : 0.2 }}
              >
                {content.description}
              </motion.p>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {inView && (
              <motion.button 
                className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
                onMouseEnter={() => setCursorText('Click')}
                onMouseLeave={() => setCursorText('')}
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={isMobile ? {} : { scale: 0.95 }}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 50 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={isMobile ? { opacity: 0 } : { opacity: 0, y: -50 }}
                transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.2 : 0.4 }}
              >
                {content.buttonText}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        <div 
          ref={el => imagesRef.current[index] = el}
          className="w-full md:w-1/2 h-64 md:h-96 relative rounded-lg overflow-hidden shadow-2xl"
        >
          <Image
            src={src}
            alt={`Image for ${content.title}`}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          />
        </div>
      </div>
    </motion.section>
  )
})

Section.displayName = 'Section'