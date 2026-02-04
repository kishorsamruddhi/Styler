// ServicesSection.jsx
import React from "react";

const ServicesSection = () => {
  return (
    <section className="px-6 py-12 max-w-4xl mx-auto">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
        Services We're Passionate About.
      </h2>

      {/* Service Card 1 - Design */}
      <div className="mb-16">
        <div className="mb-6 rounded-2xl overflow-hidden">
          <div className="w-full h-[300px] bg-gradient-to-r from-yellow-400 to-pink-300 flex items-center justify-center">
            {/* Placeholder for image - you can replace with actual image */}
            <div className="w-full h-full bg-gray-200"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
          <span className="text-sm text-gray-600">Website</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Design</h3>
        <p className="text-gray-700 mb-6">
          Driven by a deep passion for design, we craft meaningful visuals that
          spark emotion and leave a powerful, lasting impression on your
          audience.
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L19 9H5L12 2Z" fill="white" />
          </svg>
          LEARN MORE
        </button>
      </div>

      {/* Service Card 2 - Marketing */}
      <div className="mb-16">
        <div className="mb-6 rounded-2xl overflow-hidden">
          <div className="w-full h-[300px] bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center">
            {/* Placeholder for image */}
            <div className="w-full h-full bg-gray-200"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
          <span className="text-sm text-gray-600">SEO</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Marketing</h3>
        <p className="text-gray-700 mb-6">
          We utilize a diverse blend of strategic channels and tailored tactics,
          each carefully selected and refined to effectively reach your goals.
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L19 9H5L12 2Z" fill="white" />
          </svg>
          LEARN MORE
        </button>
      </div>

      {/* Service Card 3 - Prototype */}
      <div className="mb-16">
        <div className="mb-6 rounded-2xl overflow-hidden">
          <div className="w-full h-[300px] bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
            {/* Placeholder for image */}
            <div className="w-full h-full bg-gray-200"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
          <span className="text-sm text-gray-600">Front-end</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Prototype</h3>
        <p className="text-gray-700 mb-6">
          Highlighting the essential features, interactive elements, and
          practical functionalities that bring your idea to life.
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L19 9H5L12 2Z" fill="white" />
          </svg>
          LEARN MORE
        </button>
      </div>

      {/* Service Card 4 - Branding */}
      <div className="mb-16">
        <div className="mb-6 rounded-2xl overflow-hidden">
          <div className="w-full h-[300px] bg-gradient-to-r from-orange-300 to-blue-400 flex items-center justify-center">
            {/* Placeholder for image */}
            <div className="w-full h-full bg-gray-200"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
          <span className="text-sm text-gray-600">Business</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Branding</h3>
        <p className="text-gray-700 mb-6">
          A thoughtful craft rooted in storytelling and design—shaping
          perceptions, stirring emotions, and curating meaningful experiences.
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L19 9H5L12 2Z" fill="white" />
          </svg>
          LEARN MORE
        </button>
      </div>
    </section>
  );
};

export default ServicesSection;
