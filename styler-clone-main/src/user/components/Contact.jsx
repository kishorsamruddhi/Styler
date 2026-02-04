import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import FAQ from "./FAQ";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [contacts, setContacts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { createContact, getAllContacts } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await createContact(formData);
      if (response?.data?.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        setSubmitError(response?.data?.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Contact submission error:", error);
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit contact form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center gap-2 mb-4">
          <span className="text-blue-600">•</span>
          <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
            Get In Touch
          </h2>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Talk</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have a project in mind or just want to connect? We’re here to listen,
          collaborate, and bring your ideas to life.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-6">
                Send us a message. Get our bi-weekly content updates.
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail
                    className="text-blue-600 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      EMAIL
                    </h3>
                    <p className="font-medium">info@website.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone
                    className="text-blue-600 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      PHONE
                    </h3>
                    <p className="font-medium">+1 800 - 1236 789</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin
                    className="text-blue-600 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      OFFICE
                    </h3>
                    <p className="font-medium">
                      123 Design Street, Creative City
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock
                    className="text-blue-600 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      HOURS
                    </h3>
                    <p className="font-medium">Mon-Fri: 9AM - 6PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium mb-4">
                Stay connected, follow us.
              </h3>
              <div className="flex space-x-4">
                {["X", "IG", "F", "O"].map((social, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    aria-label={social}
                  >
                    <span className="text-gray-600 font-bold">{social}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="space-y-6">
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                Thank you! Your message has been sent successfully.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-500 mb-1"
                    >
                      NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-500 mb-1"
                    >
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="contact@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-500 mb-1"
                    >
                      PHONE
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 345-678"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-500 mb-1"
                    >
                      COMPANY
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add Company"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-500 mb-1"
                  >
                    SERVICE / PROJECT
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Service</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="AI Solutions">AI Solutions</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Full Project">Full Project</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-500 mb-1"
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us more about your project..."
                  />
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      GET IN TOUCH
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Embedded FAQ */}
      <div className="mt-20">
        <FAQ />
      </div>
    </div>
  );
};

export default Contact;
