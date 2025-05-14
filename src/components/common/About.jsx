// About.js
import React from 'react';
import '../../styles/About.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import manojImg from '../../../public/images/Manoj.jpeg';
import sujayImg from '../../../public/images/sujay.jpg';
import darshImg from '../../../public/images/darsh.jpg';

const team = [
  {
    name: 'Manoj D Maiya',
    github: 'https://github.com/manojdmaiya',
    linkedin: 'https://linkedin.com/in/manoj-d-maiya-907879220/',
    image: manojImg,
  },
  {
    name: 'Sujay T S',
    github: 'https://github.com/Sujayts21',
    linkedin: 'https://linkedin.com/in/sujayts21',
    image: sujayImg,
  },
  {
    name: 'Darsh Khetan',
    github: 'https://github.com/darsh0p',
    linkedin: 'https://linkedin.com/in/darsh-khetan-4223a128a/',
    image: darshImg,
  },
];

const About = () => {
  return (
    <div className="about-container">
      <section className="intro-section">
        <h1>About Nyaya Mitra</h1>
        <p>
          <strong>Nyaya Mitra</strong> is an AI-driven Legal Decision Support System that predicts judicial outcomes based on past case records. Our goal is to enhance legal efficiency using modern machine learning and generative AI techniques.
        </p>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-cards">
          {team.map((member, index) => (
            <div className="member-card" key={index}>
              <img src={member.image} alt={member.name} className="profile-image" />
              <h3>{member.name}</h3>
              <div className="social-links">
                <a href={member.github} target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tech-section">
        <h2>Technologies Used</h2>
        <ul className="tech-list">
          <li>React & JSX</li>
          <li>Python Flask</li>
          <li>MySQL</li>
          <li>CatBoost & ML</li>
          <li>EmailJS</li>
          <li>Spring Boot</li>
          <li>SMOTE Balancing</li>
        </ul>
      </section>

      <section className="goal-section">
        <h2>Our Vision</h2>
        <p>
          We aim to make legal prediction more reliable, transparent, and scalable by integrating AI into case analysis — ultimately reducing delays and ensuring fairness in judicial processes.
        </p>
      </section>

      {/* <section className="research-section">
        <h2>Our Research Paper</h2>
        <div className="pdf-container">
          <iframe
            src="../../../public/nyayamitra_final.pptx"
            style={{ marginLeft: '200px', width: '80%', height: '800px', border: 'none' }}
            title="Research Paper"
          />
        </div>
      </section> */}

    </div>
  );
};

export default About;