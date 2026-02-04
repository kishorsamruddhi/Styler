import React, { useState, useEffect } from "react";

const FeaturedWorks = () => {
  const [leftOffset, setLeftOffset] = useState(0);
  const [rightOffset, setRightOffset] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scroll direction check (up or down)
      const isScrollingDown = currentScrollY > lastScrollY;

      // Base offset amount
      const speed = 0.08;
      const delta = Math.abs(currentScrollY - lastScrollY) * speed;

      // Update offsets based on direction
      if (isScrollingDown) {
        setLeftOffset((prev) => prev - delta); // Left moves up
        setRightOffset((prev) => prev + delta); // Right moves down
      } else {
        setLeftOffset((prev) => prev + delta); // Left moves down
        setRightOffset((prev) => prev - delta); // Right moves up
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
        Featured Works for
        <br />
        Our Incredible Clients.
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 - Left */}
        <div
          style={{
            transform: `translateY(${leftOffset}px)`,
            transition: "transform 0.1s ease-out",
          }}
          className="flex flex-col space-y-3"
        >
          <div className="w-full h-[300px] bg-red-500 rounded-xl overflow-hidden">
            <img
              src="https://placehold.co/600x300/FF0000/FFFFFF?text=Image+1"
              alt="Elegant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-xs text-gray-600">Design • 2024</div>
          <div className="text-xl font-bold">Elegant</div>
        </div>

        {/* Card 2 - Right */}
        <div
          style={{
            transform: `translateY(${rightOffset}px)`,
            transition: "transform 0.1s ease-out",
          }}
          className="flex flex-col space-y-3"
        >
          <div className="w-full h-[300px] bg-yellow-400 rounded-xl overflow-hidden">
            <img
              src="https://placehold.co/600x300/FFD700/000000?text=Image+2"
              alt="Vibrant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-xs text-gray-600">Branding • 2024</div>
          <div className="text-xl font-bold">Vibrant</div>
        </div>

        {/* Card 3 - Left */}
        <div
          style={{
            transform: `translateY(${leftOffset}px)`,
            transition: "transform 0.1s ease-out",
          }}
          className="flex flex-col space-y-3"
        >
          <div className="w-full h-[300px] bg-gray-100 rounded-xl overflow-hidden">
            <img
              src="https://placehold.co/600x300/F5F5F5/000000?text=Image+3"
              alt="Digital"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-xs text-gray-600">Marketing • 2024</div>
          <div className="text-xl font-bold">Digital</div>
        </div>

        {/* Card 4 - Right */}
        <div
          style={{
            transform: `translateY(${rightOffset}px)`,
            transition: "transform 0.1s ease-out",
          }}
          className="flex flex-col space-y-3"
        >
          <div className="w-full h-[300px] bg-orange-100 rounded-xl overflow-hidden">
            <img
              src="https://placehold.co/600x300/FF6F61/FFFFFF?text=Image+4"
              alt="Texture"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-xs text-gray-600">Design • 2024</div>
          <div className="text-xl font-bold">Texture</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedWorks;
