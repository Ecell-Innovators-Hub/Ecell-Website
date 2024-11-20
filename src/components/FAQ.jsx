import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is ECell?",
      answer: "ECell is a platform to foster innovation and entrepreneurship among students.",
    },
    {
      question: "Who can join ECell?",
      answer: "Any student with a passion for innovation and entrepreneurship can join.",
    },
    {
      question: "What activities does ECell organize?",
      answer: "ECell organizes workshops, hackathons, pitch competitions, and mentoring sessions.",
    },
      {
        question: "What types of workshops are organized by E-Cell?",
        answer: "E-Cell organizes a variety of workshops such as startup bootcamps, pitching competitions, mentorship programs, and technical workshops on business development, marketing, and more."
      },
      {
        question: "How can I pitch my startup idea to E-Cell?",
        answer: "You can pitch your idea by participating in our pitching competitions or through one-on-one mentorship sessions. Keep an eye on our events page for upcoming pitching opportunities."
      },
      {
        question: "What are the benefits of joining E-Cell?",
        answer: "Joining E-Cell provides you with access to mentorship, funding opportunities, networking with successful entrepreneurs, and a platform to showcase and develop your ideas."
      },
      {
        question: "Can I attend workshops even if I'm not an entrepreneur?",
        answer: "Absolutely! Our workshops are open to anyone interested in learning about entrepreneurship, innovation, and business development, regardless of whether you have a startup."
      },
      {
        question: "How do I stay updated with upcoming events and programs?",
        answer: "You can stay updated by following us on our social media channels, subscribing to our newsletter, or checking our website regularly for event announcements."
      },
  ];

  return (
    <section id="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
          >
            <h3 onClick={() => toggleFAQ(index)}>{item.question}</h3>
            {activeIndex === index && <p>{item.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
