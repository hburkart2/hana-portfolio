"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Github, Linkedin, Download, Moon, Sun, Menu, X } from "lucide-react"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState<boolean | null>(null)
  const [typingText, setTypingText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const phrases = ["Machine Learning Engineering", "Computer Vision", "Data Science", "Full Stack Development"]

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")

    if (storedTheme) {
      setDarkMode(storedTheme === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".fade-in")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (darkMode !== null) {
      if (darkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [darkMode])

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    const typingSpeed = 100
    const deletingSpeed = 50
    const pauseTime = 2000

    const timeout = setTimeout(
      () => {
        if (!isDeleting && typingText === currentPhrase) {
          // Pause at end of phrase
          setTimeout(() => setIsDeleting(true), pauseTime)
        } else if (isDeleting && typingText === "") {
          // Move to next phrase
          setIsDeleting(false)
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        } else if (isDeleting) {
          // Delete character
          setTypingText(currentPhrase.substring(0, typingText.length - 1))
        } else {
          // Type character
          setTypingText(currentPhrase.substring(0, typingText.length + 1))
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [typingText, isDeleting, currentPhraseIndex, phrases])

  const toggleTheme = () => {
    const newTheme = !darkMode
    setDarkMode(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  const projects = [
    {
      title: "Rainfall Forecasting",
      description:
        "End-to-end ML pipeline for predicting rainfall patterns using historical weather data and advanced forecasting models.",
      image: "/rainfall-weather-data-visualization.jpg",
      tags: ["Python", "Scikit-learn", "Pandas", "Time Series"],
    },
    {
      title: "VAE Study",
      description:
        "Exploration of Variational Autoencoders for generative modeling, implementing and comparing different architectures.",
      image: "/neural-network-generative-model.jpg",
      tags: ["PyTorch", "Deep Learning", "VAE", "Generative AI"],
    },
    {
      title: "Facial Analysis",
      description:
        "Computer vision system for facial feature detection and analysis using state-of-the-art deep learning techniques.",
      image: "/facial-recognition-computer-vision.jpg",
      tags: ["OpenCV", "TensorFlow", "CNN", "Computer Vision"],
    },
  ]

  const leadership = [
    {
      org: "ACM (Association for Computing Machinery)",
      role: "Secretary & Treasurer",
      description:
        "Coordinated outreach events, managed finances, and organized technical workshops to foster collaboration in the computing community.",
    },
    {
      org: "ASME (American Society of Mechanical Engineers)",
      role: "Robotics & AI Project Lead",
      description:
        "Led cross-functional teams in developing robotics projects integrating AI and mechanical engineering principles.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-50/50 via-background to-pink-50/50 dark:from-orange-950/20 dark:via-background dark:to-purple-950/20" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Hana Burkart
          </h1>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("leadership")}
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Leadership
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 bg-gray-300 dark:bg-orange-600"
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-lg ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              >
                {darkMode ? <Moon className="h-4 w-4 text-orange-600" /> : <Sun className="h-4 w-4 text-orange-500" />}
              </span>
            </button>
          </nav>

          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 bg-gray-300 dark:bg-orange-600"
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-lg ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              >
                {darkMode ? <Moon className="h-4 w-4 text-orange-600" /> : <Sun className="h-4 w-4 text-orange-500" />}
              </span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left py-2 px-3 text-sm font-medium hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-left py-2 px-3 text-sm font-medium hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("leadership")}
                className="text-left py-2 px-3 text-sm font-medium hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg transition-colors"
              >
                Leadership
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left py-2 px-3 text-sm font-medium hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 text-center relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/10 rounded-full blur-3xl" />
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
          Hana Burkart
        </h2>
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 min-h-[3rem] sm:min-h-[3.5rem] text-muted-foreground">
          I'm exploring <span className="text-orange-600 font-semibold">{typingText}</span>
          <span className="animate-pulse">|</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-2xl mx-auto">
          <Button
            onClick={() => scrollToSection("projects")}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all"
          >
            View My Work
          </Button>
          <Button
            onClick={() => scrollToSection("contact")}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 hover:border-orange-600 hover:text-orange-600"
          >
            Get In Touch
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 hover:border-pink-600 hover:text-pink-600 bg-transparent gap-2"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center relative inline-block w-full">
          <span className="relative">
            About Me
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full"></span>
          </span>
        </h2>
        <Card className="max-w-5xl mx-auto border-2 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full blur-xl opacity-30" />
                  <Avatar className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 border-4 border-orange-600 relative shadow-2xl">
                    <AvatarImage src="/professional-portrait.png" alt="Hana Burkart" />
                    <AvatarFallback className="text-3xl sm:text-4xl">HB</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  I'm passionate about Machine Learning, Deep Learning, and Computer Vision. I approach data-driven
                  systems with an engineering mindset, focusing on building robust, scalable solutions that solve
                  real-world problems. My work spans from developing ML pipelines to exploring cutting-edge generative
                  models.
                </p>
                <p>
                  Beyond technical work, I'm deeply involved in leadership through ACM and ASME, where I coordinate
                  outreach initiatives, manage collaborative projects, and foster community engagement. I believe in the
                  power of teamwork and knowledge-sharing to drive innovation forward.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center relative inline-block w-full">
          <span className="relative">
            Projects
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-orange-600/50 bg-card/50 backdrop-blur-sm group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-orange-600 transition-colors">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center relative inline-block w-full">
          <span className="relative">
            Leadership
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {leadership.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transition-all hover:scale-[1.02] border-2 hover:border-orange-600/50 bg-card/50 backdrop-blur-sm group"
            >
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg sm:text-xl bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  {item.org}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base font-semibold text-foreground">
                  {item.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center relative inline-block w-full">
          <span className="relative">
            Contact
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full"></span>
          </span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 max-w-lg mx-auto">
          <a
            href="mailto:hana@example.com"
            className="group flex flex-col items-center gap-2 p-6 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all hover:scale-110 border-2 border-transparent hover:border-orange-600/50"
          >
            <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground group-hover:text-orange-600 transition-colors" />
            <span className="text-sm font-medium">Email</span>
          </a>
          <a
            href="https://github.com/hanaburkart"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 p-6 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all hover:scale-110 border-2 border-transparent hover:border-orange-600/50"
          >
            <Github className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground group-hover:text-orange-600 transition-colors" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/hanaburkart"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 p-6 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all hover:scale-110 border-2 border-transparent hover:border-orange-600/50"
          >
            <Linkedin className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground group-hover:text-orange-600 transition-colors" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </div>
        <div className="flex justify-center mt-8 sm:mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all gap-2"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm sm:text-base text-muted-foreground">
          <p>© 2025 Hana Burkart</p>
        </div>
      </footer>
    </div>
  )
}
