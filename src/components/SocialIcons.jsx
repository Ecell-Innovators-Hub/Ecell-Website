import React from "react";
import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import './SocialIcons.css';

const Footer = () => {
  const socialLinks = [
    {
      icon: <MessageCircle style={{ width: "20px", height: "20px" }} />,
      href: "https://wa.me/9490538442",
      label: "WhatsApp",
    },
    {
      icon: <Instagram style={{ width: "20px", height: "20px" }} />,
      href: "https://www.instagram.com/ecell_vitb/profilecard/?igsh=eG14ZGFmZmduazBw",
      label: "Instagram",
    },
    {
      icon: <Linkedin style={{ width: "20px", height: "20px" }} />,
      href: "https://www.linkedin.com/company/ecellvitb/",
      label: "LinkedIn",
    },
    {
      icon: <Mail style={{ width: "20px", height: "20px" }} />,
      href: "mailto:e-cell@vishnu.edu.in",
      label: "Email",
    },
  ];

  const quickLinks = [
    { href: "/Home", label: "Home" },
    { href: "/about-team", label: "About Team" },
    { href: "/Events", label: "Events" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo */}
        <div className="footer-logo">
          <img
            src="./logo.png"
            alt="Ecell Logo"
            style={{ width: "80px", height: "80px" }}
          />
          <p className="footer-logo-text">Ecell-VITB</p>
        </div>

        {/* Center Section: Quick Links */}
        <div className="footer-quick-links">
          <ul>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Social Icons */}
        <div className="footer-social-icons">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <div className="footer-icon-wrapper">{link.icon}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="footer-bottom">
        <p>
          For more info, contact{" "}
          <a href="mailto:president.ecell@vishnu.edu.in">president.ecell@vishnu.edu.in</a>{" "}
          or call <a href="tel:+916302692726">+91-9876543210</a>.
        </p>
        <p>© {new Date().getFullYear()} Ecell-VITB. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
