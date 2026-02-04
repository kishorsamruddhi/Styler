// src/components/Work/Testimonial.jsx
import React from "react";

const Testimonial = () => {
  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-2">
            <span>✦</span> TESTIMONIAL
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by forward-thinking teams
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empowering fast-growing companies with design-driven, AI-powered
            solutions built for scale.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src="https://placehold.co/200x200/e5e7eb/1f2937?text=Portrait"
              alt="Maya El-Khoury"
              className="rounded-xl"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg">
              <div className="text-orange-500 font-bold">4x</div>
              <div className="text-xs text-gray-600">
                Higher Investor Engagement
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <blockquote className="text-xl font-medium text-gray-900 mb-4">
              "A complete redesign that made our product investor-ready — sharp,
              intuitive, and conversion-focused."
            </blockquote>
            <div className="text-gray-600">
              <div className="font-semibold">Maya El-Khoury</div>
              <div className="text-sm">CEO, Hexabase</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === 3 ? "bg-gray-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
