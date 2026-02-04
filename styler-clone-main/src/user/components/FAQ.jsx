import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getFaqs } = useAuth();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await getFaqs();
        setFaqs(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch FAQs");
        console.error(err);
        // Fallback static data
        setFaqs([
          {
            question: "What types of clients do you work with?",
            answer:
              "We work with startups, small businesses, and large enterprises of all kinds.",
          },
          {
            question: "Can we start with a single page or smaller scope?",
            answer:
              "Absolutely! We can start as small as a single landing page or feature.",
          },
          {
            question: "How fast can you deliver?",
            answer:
              "Delivery time depends on scope, but we pride on quick iterations and timely delivery.",
          },
          {
            question: "Do you handle development too?",
            answer:
              "Yes, we handle both design and development, providing dev-ready code.",
          },
          {
            question: "Are your designs dev-ready?",
            answer:
              "All designs are produced with development in mind, using modern components.",
          },
          {
            question: "Do you design for AI-specific products?",
            answer:
              "We specialize in designing for AI products, interfaces, and experiences.",
          },
          {
            question: "What if I need help after launch?",
            answer:
              "We provide ongoing support, maintenance, and feature additions post-launch.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [getFaqs]);

  if (loading) {
    return (
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          Loading FAQs...
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            We've heard it all. Here's everything you need to know before
            working with us.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mt-1 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-900 font-medium mb-1">
                    {faq.question}
                  </p>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
