import React, { useState } from "react";
import './FAQ.css';
const faqs = [
  {
    question: "What is PMP Certification?",
    answer:
      "PMP (Project Management Professional) Certification is a globally recognized certification for project managers, demonstrating their competence in leading and directing projects.",
  },
  {
    question: "Who can apply for PMP Certification?",
    answer:
      "Anyone with a high school diploma, 35 contact hours of project management education, and a minimum of 3 years of project management experience can apply for PMP Certification.",
  },
  {
    question: "How long is the PMP Certification valid?",
    answer:
      "PMP Certification is valid for 3 years. After 3 years, you must earn 60 PDUs (Professional Development Units) to maintain your certification.",
  },
  {
    question: "What are the prerequisites for PMP Certification?",
    answer:
      "You need a high school diploma or equivalent, 35 contact hours of project management education, and at least 3 years of project management experience.",
  },
  {
    question: "How do I maintain my PMP Certification?",
    answer:
      "To maintain your PMP Certification, you need to earn 60 PDUs every 3 years through professional development activities like attending training, conferences, or working on relevant projects.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
              <span
                className={`transform ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
                } transition-transform`}
              >
                ▼
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;