"use client"

import { useState } from "react"
import { useRef } from "react"
import { Link } from "react-router-dom"
import "../styles/About.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PageHeader from "../components/PageHeader"
import { RiRecycleFill } from "react-icons/ri"
import { Zap } from "lucide-react"
import { Shield } from "lucide-react"
import { Leaf } from "lucide-react"
import { companyInfo } from "../data/data"

const About = () => {
  const storyRef = useRef(null)
  const missionRef = useRef(null)
  const teamRef = useRef(null)
  const valuesRef = useRef(null)
  const [activeTeamMember, setActiveTeamMember] = useState(0)

  const handleTeamMemberClick = (index) => {
    setActiveTeamMember(index)
  }

  return (
    <>
      <Navbar />
      <div className="about-page">
        <PageHeader
          title="About TechWave"
          subtitle="Learn about our story, mission, and the team behind our innovative tech products."
          theme="gradient"
          size="medium"
        />

        {/* Our Story Section */}
        <section className="section" id="story" ref={storyRef}>
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <h2 className="section-title">Our Story</h2>
                <p>
                  TechWave was founded in {companyInfo.founded} with a simple mission: to create premium tech
                  accessories that seamlessly integrate into modern lifestyles, enhancing both productivity and
                  entertainment experiences.
                </p>
                <p>
                  What started as a small operation with just a few earbuds and chargers has grown into a comprehensive
                  tech brand offering a wide range of products across audio, wearables, and smart accessories.
                </p>
                <p>
                  Our journey has been driven by listening to our customers and continuously improving our products to
                  meet their evolving needs, always focusing on quality, innovation, and user experience.
                </p>
                <p>
                  Today, TechWave serves tech enthusiasts worldwide, creating products that combine cutting-edge
                  technology with sleek, minimalist design to enhance your digital lifestyle.
                </p>
              </div>
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=500&q=60"
                  alt="TechWave headquarters"
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
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=500&q=60"
                  alt="Our mission in action"
                />
              </div>
              <div className="about-content">
                <h2 className="section-title">Our Mission</h2>
                <p>{companyInfo.mission}</p>
                <p>
                  We believe that technology should be both beautiful and functional, enhancing your life without
                  complicating it. Every product we develop is guided by this principle.
                </p>
                <p>Through our products, we aim to:</p>
                <ul className="mission-list">
                  <li>Create tech accessories that seamlessly integrate into modern lifestyles</li>
                  <li>Combine premium materials with cutting-edge technology</li>
                  <li>Deliver exceptional audio and wearable experiences</li>
                  <li>Support sustainable practices in tech manufacturing</li>
                  <li>Build lasting relationships with our customers through quality and service</li>
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
                {companyInfo.team.map((member, index) => (
                  <div
                    key={index}
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
                {companyInfo.team[activeTeamMember] && (
                  <>
                    <div className="team-member-header">
                      <div className="team-member-avatar">
                        <img
                          src={companyInfo.team[activeTeamMember].image || "/placeholder.svg"}
                          alt={companyInfo.team[activeTeamMember].name}
                        />
                      </div>
                      <div className="team-member-info">
                        <h3>{companyInfo.team[activeTeamMember].name}</h3>
                        <p className="team-member-role">{companyInfo.team[activeTeamMember].role}</p>
                        <div className="team-member-social">
                          <a href="#" aria-label="LinkedIn">
                            <i className="social-icon">💼</i>
                          </a>
                          <a href="#" aria-label="Twitter">
                            <i className="social-icon">🐦</i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="team-member-bio">
                      <p>{companyInfo.team[activeTeamMember].bio}</p>
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
              These principles guide everything we do at TechWave, from product design to customer service.
            </p>

            <div className="values-grid">
              <div className="values-item">
                <div className="values-icon">
                  <Zap />
                </div>
                <h3>Innovation</h3>
                <p>
                  We constantly push the boundaries of what's possible in technology and design, creating products that
                  anticipate and exceed customer expectations.
                </p>
              </div>

              <div className="values-item">
                <div className="values-icon">
                  <Shield />
                </div>
                <h3>Quality & Reliability</h3>
                <p>
                  We meticulously craft our products using premium materials and rigorous testing to ensure they deliver
                  exceptional performance and durability.
                </p>
              </div>

              <div className="values-item">
                <div className="values-icon">
                  <RiRecycleFill />
                </div>
                <h3>Customer-Centric</h3>
                <p>
                  We put our customers at the center of everything we do, from product development to support,
                  constantly seeking feedback to improve our offerings.
                </p>
              </div>

              <div className="values-item">
                <div className="values-icon">
                  <Leaf />
                </div>
                <h3>Sustainability</h3>
                <p>
                  We're committed to reducing our environmental impact through eco-friendly packaging, responsible
                  sourcing, and energy-efficient manufacturing.
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

        {/* Timeline Section */}
        <section className="section timeline-section">
          <div className="container">
            <h2 className="section-title text-center">Our Journey</h2>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">{companyInfo.founded}</div>
                  <h3>The Beginning</h3>
                  <p>
                    TechWave was founded with a vision to create premium tech accessories that enhance digital
                    lifestyles.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">{companyInfo.founded + 2}</div>
                  <h3>First Product Launch</h3>
                  <p>
                    We launched our first line of wireless earbuds, setting the standard for our future audio products.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">{companyInfo.founded + 4}</div>
                  <h3>Expansion into Wearables</h3>
                  <p>
                    We expanded our product line to include smartwatches and fitness trackers, bringing our tech
                    expertise to wearable technology.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">{companyInfo.founded + 6}</div>
                  <h3>Global Reach</h3>
                  <p>
                    TechWave products became available in over 30 countries, with flagship stores in major cities
                    worldwide.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">Today</div>
                  <h3>Innovation Continues</h3>
                  <p>
                    We continue to innovate and expand our product ecosystem, with a focus on seamless integration and
                    exceptional user experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default About

