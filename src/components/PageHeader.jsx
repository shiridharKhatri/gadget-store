"use client"

import { useEffect, useRef } from "react"
import "../styles/PageHeader.css"
import gsap from "gsap"

const PageHeader = ({ title, subtitle, size = "medium", align = "center", theme = "gradient", className = "" }) => {
  const headerRef = useRef(null)
  const particlesRef = useRef([])
  const requestRef = useRef()
  const previousTimeRef = useRef()

  useEffect(() => {
    if (!headerRef.current) return

    // Mouse move effect
    const handleMouseMove = (e) => {
      const header = headerRef.current
      if (!header) return

      const { clientX, clientY } = e
      const { left, top, width, height } = header.getBoundingClientRect()

      const x = ((clientX - left) / width) * 100
      const y = ((clientY - top) / height) * 100

      header.style.setProperty("--mouse-x", `${x}%`)
      header.style.setProperty("--mouse-y", `${y}%`)
    }

    // Create particles
    const particles = []
    const colors = ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]
    const particleCount = 15

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 4 + 1
      const x = Math.random() * 100
      const y = Math.random() * 100
      const color = colors[Math.floor(Math.random() * colors.length)]
      const speedX = (Math.random() - 0.5) * 0.1
      const speedY = (Math.random() - 0.5) * 0.1

      particles.push({ x, y, size, color, speedX, speedY })
    }

    particlesRef.current = particles

    // Animation loop for particles
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        particlesRef.current = particlesRef.current.map((particle) => {
          // Update position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Wrap around edges
          if (particle.x < 0) particle.x = 100
          if (particle.x > 100) particle.x = 0
          if (particle.y < 0) particle.y = 100
          if (particle.y > 100) particle.y = 0

          return particle
        })

        // Render particles
        renderParticles()
      }

      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    const renderParticles = () => {
      const headerElement = headerRef.current
      if (!headerElement) return

      // Clear existing particles
      const particlesContainer = headerElement.querySelector(".page-header-particles")
      if (particlesContainer) {
        particlesContainer.innerHTML = ""

        // Create new particles
        particlesRef.current.forEach((particle) => {
          const particleElement = document.createElement("div")
          particleElement.className = "page-header-particle"
          particleElement.style.width = `${particle.size}px`
          particleElement.style.height = `${particle.size}px`
          particleElement.style.backgroundColor = particle.color
          particleElement.style.left = `${particle.x}%`
          particleElement.style.top = `${particle.y}%`

          particlesContainer.appendChild(particleElement)
        })
      }
    }

    // Animate header content
    gsap.fromTo(
      headerRef.current.querySelector("h1"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    )

    gsap.fromTo(
      headerRef.current.querySelector("p"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" },
    )

    gsap.fromTo(
      headerRef.current.querySelector(".header-accent"),
      { width: 0, opacity: 0 },
      { width: 60, opacity: 1, duration: 0.8, delay: 0.4, ease: "power3.out" },
    )

    headerRef.current.addEventListener("mousemove", handleMouseMove)
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      headerRef.current?.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <div ref={headerRef} className={`page-header ${size} ${align} ${theme} ${className}`}>
      <div className="page-header-particles"></div>
      <div className="page-header-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        <div className="header-accent"></div>
      </div>
    </div>
  )
}

export default PageHeader

