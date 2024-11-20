import React from 'react';
import { Users, Briefcase, Award, ChevronRight, Mail, Linkedin, Twitter } from 'lucide-react';
import './Team.css';
import './TeamSection.css';
import './TeamMember.css';

// Data for team members (replace with your actual data import or objects)
const faculty = [
  { id: 1, name: "Narasimha Raju", role: "Professor", image: "/nsr sir.jpg", email: "john@example.com", linkedin: "", twitter: ""},
  { id: 2, name: "Dr. John Doe", role: "Professor", image: "/profile.jpg", email: "john@example.com", linkedin: "", twitter: ""},
  { id: 3, name: "Preethi", role: "Professor", image: "/preethi madam.jpg", email: "preethi.b@vishnu.edu.in", linkedin: "", twitter: ""},
  // Add more faculty members here
];

const heads = [
  { id: 4, name: "Surya Teja", role: "President", image: "/surya.jpg", email: "president.ecell@vishnu.ed.in", linkedin: "https://www.linkedin.com/in/surya-teja-191a81294/"},
  { id: 5, name: "Jane Smith", role: "Vice President", image: "/profile.jpg", email: "vicepresident.ecell@vishnu.edu.in", linkedin: "https://linkedin.com/in/jane"},// Add more heads here
  { id: 6, name: "Naga Mallika", role: "Secretary", image: "/mallika.jpg", email: "secretary.ecell@vishnu.edu.in", linkedin: "https://www.linkedin.com/in/naga-mallika-balla-13003b27b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
];
const teamLeads = [
    { id: 7, name: "Phanindra", role: "Technical Lead", image: "/phani.jpg", email: "alice@example.com", linkedin: "https://www.linkedin.com/in/nelavalli-phanindra-b074a8255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    { id: 8, name: "Sri Dhruthi", role: "PR/Marketing Lead", image: "/dhruthi.jpg", email: "alice@example.com", linkedin: "https://www.linkedin.com/in/sri-dhruthi-mallela-9455ab2a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    { id: 9, name: "Vamsi Krishna", role: "Content & Media Lead", image: "/profile.jpg", email: "alice@example.com", linkedin: ""},
    { id: 10, name: "Raghuram Manikanta", role: "Research & Development Lead", image: "/raghuram.jpg", email: "alice@example.com", linkedin: "https://www.linkedin.com/in/raghuram-manikanta-ba0518280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    { id: 11, name: "Deexitha", role: "Event Managing Lead", image: "/Deexitha.png", email: "alice@example.com", linkedin: "https://www.linkedin.com/in/deexitha-medisetty?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    { id: 12, name: "Vishnu Vardhan", role: "Startup Liason Lead", image: "/Vishnu.jpg", email: "alice@example.com", linkedin: "https://www.linkedin.com/in/aganti-vishnu-vardhan-297369246?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"},
    { id: 13, name: "Sai Nikhil", role: "Logistics & Operations Lead", image: "/nikhil.jpg", email: "alice@example.com", linkedin: "https://www.linkedin.com/in/sainikhil-edupuganti-61281b2a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
  ];
  const teamColeads = [
    { id: 14, name: "Prasanth", role: "Technical Co-lead", image: "/prasanth.jpg", email: "alice@example.com", linkedin: "https://www.linkedin.com/in/prasanth-pulidhindi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    { id: 15, name: "Yagnasri", role: "PR/Marketing Co-lead", image: "/yagna.jpg", email: "alice@example.com", linkedin: ""},
    { id: 16, name: "Rajkumar", role: "Content & Media Co-lead", image: "/rajkumar.png", email: "alice@example.com", linkedin: "https://www.linkedin.com/in/rajkumar-sirra-941585320"},
    { id: 17, name: "Faiza", role: "Research & Development Co-lead", image: "/faiza.png", email: "alice@example.com", linkedin: "https://www.linkedin.com/in/faiza-mohammed-72697b2b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    { id: 18, name: "Alice Brown", role: "Event Managing Co-lead", image: "profile.jpg", email: "alice@example.com", linkedin: ""},
    { id: 19, name: "Alice Brown", role: "Startup Liason Co-lead", image: "/profile.jpg", email: "alice@example.com", linkedin: ""},
    { id: 20, name: "Alice Brown", role: "Logistics & Operations Co-lead", image: "profile.jpg", email: "alice@example.com", linkedin: ""},
  ];
const teamMembers = [
  { id: 21, name: "Abdul Laikha", role: "Technical Associate", image: "/laikha.png", email: "alice@example.com", linkedin: ""},
  { id: 22, name: "Sohan", role: "PR/Marketing Associate", image: "/sohan.JPG", email: "alice@example.com", linkedin: ""},
  { id: 23, name: "Alice Brown", role: "Content & Media Associate", image: "profile.jpg", email: "alice@example.com", linkedin: ""},
  { id: 24, name: "Alice Brown", role: "Research & Development Associate", image: "profile.jpg", email: "alice@example.com", linkedin: ""},
  { id: 25, name: "Alice Brown", role: "Event Managing Associate", image: "profile.jpg", email: "alice@example.com", linkedin: ""},
  { id: 26, name: "Alice Brown", role: "Startup Liason Associate", image: "profile.jpg", email: "alice@example.com", linkedin: ""},
  { id: 27, name: "Alice Brown", role: "Logistics & Operations Associate", image: "profile.jpg", email: "alice@example.com", linkedin: ""},
  // Add more team members here
];
// TeamLead Component
const TeamLead = ({ name, role, image, email, linkedin, twitter, description }) => {
    return (
      <div className="member-card">
        <div className="image-container">
          <img src={image} alt={name} />
        </div>
        <div className="member-info">
          <h3>{name}</h3>
          <p className="role">{role}</p>
          <p className="description">{description}</p>
          <div className="social-links">
            {email && (
              <a href={`mailto:${email}`} className="social-link">
                <Mail />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin />
              </a>
            )}
            {twitter && (
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                <Twitter />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

// TeamColead Component
const TeamColead = ({ name, role, image, email, linkedin, twitter, description }) => {
    return (
      <div className="member-card">
        <div className="image-container">
          <img src={image} alt={name} />
        </div>
        <div className="member-info">
          <h3>{name}</h3>
          <p className="role">{role}</p>
          <p className="description">{description}</p>
          <div className="social-links">
            {email && (
              <a href={`mailto:${email}`} className="social-link">
                <Mail />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin />
              </a>
            )}
            {twitter && (
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                <Twitter />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

// TeamMember Component
const TeamMember = ({ name, role, image, email, linkedin, twitter, description }) => {
  return (
    <div className="member-card">
      <div className="image-container">
        <img src={image} alt={name} />
      </div>
      <div className="member-info">
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <p className="description">{description}</p>
        <div className="social-links">
          {email && (
            <a href={`mailto:${email}`} className="social-link">
              <Mail />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin />
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-link">
              <Twitter />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const TeamSection = ({ title, description, icon, members }) => {
    return (
      <section className="team-section">
        <div className="section-header">
          <div className="icon-container">{icon}</div>
          <div className="section-info">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className="members-grid">
          {members.map((member) => {
            if (member.role === "Team Leader") {
              return <TeamLead key={`lead-${member.id}`} {...member} />;
            }
            if (member.role === "Team Co-lead") {
              return <TeamColead key={`colead-${member.id}`} {...member} />;
            }
            return <TeamMember key={`member-${member.id}`} {...member} />;
          })}
        </div>
      </section>
    );
  };
  
  // Team Component
  const Team = () => {
    return (
      <div className="team-container">
        <header className="team-header">
          <div className="header-content">
            <div className="header-title">
              <Users className="header-icon" />
              <h1>Our Team</h1>
            </div>
          </div>
        </header>
  
        <main className="team-main">
          <div className="sections-container">
            <TeamSection
              title="Faculty Coordinators"
              description="Faculty coordinators guide, mentor, and support E-Cell activities while bridging students with resources, industry, and institutional support."
              icon={<Award className="section-icon" />}
              members={faculty}
            />
            <TeamSection
              title="Department Heads"
              description="Lead, manage, and organize the E-Cell's activities, ensuring its smooth operation, strategic growth, and effective communication."
              icon={<Briefcase className="section-icon" />}
              members={heads}
            />
            <TeamSection
              title="Team Leads"
              description="Team leads manage specific projects, guide their teams, ensure timely task completion, and collaborate to achieve E-Cell goals."
              icon={<ChevronRight className="section-icon" />}
              members={teamLeads}
            />
            <TeamSection
              title="Team Co-leads"
              description="Driving innovation and excellence across our organization"
              icon={<ChevronRight className="section-icon" />}
              members={teamColeads}
            />
            <TeamSection
              title="Team Associates"
              description="The backbone of our team, contributing valuable skills"
              icon={<ChevronRight className="section-icon" />}
              members={teamMembers}
            />
          </div>
        </main>
      </div>
    );
  };
  

export default Team;
