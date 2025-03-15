"use client"

import { useState } from "react"

import { useRef } from "react"
import { Link } from "react-router-dom"
import "../styles/About.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { RiRecycleFill } from "react-icons/ri"
import { LuPackageOpen } from "react-icons/lu"
import { FaShippingFast } from "react-icons/fa"
import { FaTree } from "react-icons/fa6"

const About = () => {
  const storyRef = useRef(null)
  const missionRef = useRef(null)
  const teamRef = useRef(null)
  const valuesRef = useRef(null)
  const [activeTeamMember, setActiveTeamMember] = useState(0)

  const teamMembers = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "With over 15 years in retail and e-commerce, Alex founded ShopHub with a vision to create a seamless shopping experience for customers worldwide.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=60",
      social: {
        instagram: "#",
        linkedin: "#",
        twitter: "#",
      },
      quote: "Our mission is to revolutionize online shopping by putting customers first in everything we do.",
    },
    {
      id: 2,
      name: "David Chen",
      role: "CTO",
      bio: "David leads our technology team, ensuring that ShopHub's platform is fast, secure, and user-friendly. His background in software engineering drives our innovation.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60",
      social: {
        instagram: "#",
        linkedin: "#",
        twitter: "#",
      },
      quote: "Technology should enhance the shopping experience, not complicate it.",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Head of Customer Experience",
      bio: "Sarah ensures that every customer interaction with ShopHub exceeds expectations. Her team handles customer service, returns, and feedback implementation.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=60",
      social: {
        instagram: "#",
        linkedin: "#",
        twitter: "#",
      },
      quote: "The customer's voice drives every improvement we make to our service.",
    },
    {
      id: 4,
      name: "Michael Torres",
      role: "Operations Director",
      bio: "Michael oversees our global supply chain, ensuring that products are sourced ethically and delivered efficiently to customers around the world.",
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=500&q=60",
      social: {
        instagram: "#",
        linkedin: "#",
        twitter: "#",
      },
      quote: "Efficiency in operations translates to better prices and faster delivery for our customers.",
    },
  ]

  const handleTeamMemberClick = (index) => {
    setActiveTeamMember(index)
  }

  return (
    <>
      <Navbar />
      <div className="about-page">
        <div className="page-header">
          <div className="container">
            <h1>About ShopHub</h1>
            <p>Learn about our story, mission, and the team behind ShopHub.</p>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="section" id="story" ref={storyRef}>
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <h2 className="section-title">Our Story</h2>
                <p>
                  ShopHub was founded in 2018 with a simple mission: to create an online marketplace where customers
                  could find everything they need in one place, at competitive prices, with exceptional service.
                </p>
                <p>
                  What started as a small operation with just a few product categories has grown into a comprehensive
                  e-commerce platform offering thousands of products across electronics, fashion, home goods, beauty,
                  and more.
                </p>
                <p>
                  Our journey has been driven by listening to our customers and continuously improving our selection,
                  platform, and service to meet their evolving needs.
                </p>
                <p>
                  Today, ShopHub serves millions of customers worldwide, partnering with trusted brands and sellers to
                  bring quality products to your doorstep.
                </p>
              </div>
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=500&q=60"
                  alt="ShopHub headquarters"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="section mission-section" id="mission" ref={missionRef}>
          <div className="container">
            <div className="about-grid reverse">
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=60"
                  alt="Our mission in action"
                />
              </div>
              <div className="about-content">
                <h2 className="section-title">Our Mission</h2>
                <p>
                  At ShopHub, our mission is to revolutionize online shopping by creating a platform that puts customers
                  first in everything we do.
                </p>
                <p>
                  We believe that shopping online should be easy, enjoyable, and trustworthy. Every feature we develop
                  and every product we add to our catalog is guided by this principle.
                </p>
                <p>Through our platform, we aim to:</p>
                <ul className="mission-list">
                  <li>Provide a vast selection of quality products at competitive prices</li>
                  <li>Deliver exceptional customer service at every touchpoint</li>
                  <li>Create a seamless, user-friendly shopping experience</li>
                  <li>Support ethical business practices and sustainability</li>
                  <li>Build lasting relationships with our customers and partners</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section team-section" id="team" ref={teamRef}>
          <div className="container">
            <h2 className="section-title text-center">Meet Our Team</h2>

            <div className="team-container">
              <div className="team-members-list">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className={`team-member ${activeTeamMember === index ? "active" : ""}`}
                    onClick={() => handleTeamMemberClick(index)}
                  >
                    <div className="team-member-image">
                      <img src={member.image || "/placeholder.svg"} alt={member.name} />
                      <div className="team-member-overlay">
                        <span>View Profile</span>
                      </div>
                    </div>
                    <h3>{member.name}</h3>
                    <p className="team-member-role">{member.role}</p>
                  </div>
                ))}
              </div>

              <div className="team-member-details">
                {teamMembers[activeTeamMember] && (
                  <>
                    <div className="team-member-header">
                      <div className="team-member-avatar">
                        <img
                          src={teamMembers[activeTeamMember].image || "/placeholder.svg"}
                          alt={teamMembers[activeTeamMember].name}
                        />
                      </div>
                      <div className="team-member-info">
                        <h3>{teamMembers[activeTeamMember].name}</h3>
                        <p className="team-member-role">{teamMembers[activeTeamMember].role}</p>
                        <div className="team-member-social">
                          <a href={teamMembers[activeTeamMember].social.instagram} aria-label="Instagram">
                            <i className="social-icon">📷</i>
                          </a>
                          <a href={teamMembers[activeTeamMember].social.linkedin} aria-label="LinkedIn">
                            <i className="social-icon">💼</i>
                          </a>
                          <a href={teamMembers[activeTeamMember].social.twitter} aria-label="Twitter">
                            <i className="social-icon">🐦</i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="team-member-quote">
                      <blockquote>"{teamMembers[activeTeamMember].quote}"</blockquote>
                    </div>

                    <div className="team-member-bio">
                      <p>{teamMembers[activeTeamMember].bio}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section values-section" id="values" ref={valuesRef}>
          <div className="container">
            <h2 className="section-title text-center">Our Core Values</h2>
            <p className="text-center values-intro">
              These principles guide everything we do at ShopHub, from product selection to customer service.
            </p>

            <div className="values-grid">
              <div className="values-item">
                <div className="values-icon">
                  <RiRecycleFill />
                </div>
                <h3>Customer First</h3>
                <p>
                  We prioritize customer satisfaction in every decision we make, striving to exceed expectations at
                  every touchpoint.
                </p>
              </div>

              <div className="values-item">
                <div className="values-icon">
                  <LuPackageOpen />
                </div>
                <h3>Quality & Trust</h3>
                <p>
                  We carefully curate our product selection and vet our sellers to ensure customers receive quality
                  items they can trust.
                </p>
              </div>

              <div className="values-item">
                <div className="values-icon">
                  <FaShippingFast />
                </div>
                <h3>Innovation</h3>
                <p>
                  We continuously improve our platform and services, embracing new technologies to enhance the shopping
                  experience.
                </p>
              </div>

              <div className="values-item">
                <div className="values-icon">
                  <FaTree />
                </div>
                <h3>Sustainability</h3>
                <p>
                  We're committed to reducing our environmental impact through eco-friendly packaging and responsible
                  business practices.
                </p>
              </div>
            </div>

            <div className="values-cta">
              <Link to="/contact" className="btn btn-primary">
                Contact Us to Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default About

