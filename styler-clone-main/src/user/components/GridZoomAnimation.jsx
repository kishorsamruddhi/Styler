import React, { useState, useEffect, useRef } from "react";

const GridZoomAnimation = ({ imageUrls, borderRadius = "30px" }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  // Scroll handler (uses requestAnimationFrame to avoid layout thrash)
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!sectionRef.current) return;
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();

        // sectionTop in document coords
        const sectionTop = window.scrollY + rect.top;
        const sectionHeight = section.offsetHeight;

        // Duration that the sticky content will remain pinned = sectionHeight - viewportHeight
        const pinDuration = Math.max(1, sectionHeight - window.innerHeight);

        // Current scroll position
        const scrollY = window.scrollY;

        // progress: 0 when top of section reached, 1 when we've scrolled through the pinDuration
        const raw = (scrollY - sectionTop) / pinDuration;
        const clamped = Math.min(1, Math.max(0, raw));

        setScrollProgress(clamped);
        ticking = false;
      });
    };

    // Listen to scroll + resize (resize can change viewport height & pinDuration)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll(); // initialize

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scale animation
  const initialScale = 3.1;
  const finalScale = 1;
  const scale = initialScale - (initialScale - finalScale) * scrollProgress;

  // Opacity animation per item
  const getItemOpacity = (index, progress) => {
    const isCenter = index === 4;
    const isNeighbor = [1, 3, 5, 7].includes(index);
    let startProgress = 0;
    const animationDuration = 0.4;

    if (isCenter) startProgress = 0;
    else if (isNeighbor) startProgress = 0.1;
    else startProgress = 0.2;

    const itemProgress =
      Math.max(0, progress - startProgress) / animationDuration;
    return Math.min(itemProgress, 1);
  };

  if (!imageUrls || imageUrls.length !== 9) {
    return <div className="text-red-500">Error: Provide exactly 9 images</div>;
  }

  return (
    // Outer section is tall so there's room to scroll while the inner sticky area stays pinned.
    // Adjust h-[200vh] to control how long (in total page scroll) the animation area is.

    <section ref={sectionRef} className="relative h-[200vh] w-full">
      {/* Sticky container stays pinned while you scroll through the outer section */}
      <div className="h-screen w-full sticky top-0 flex items-center justify-center overflow-hidden p-4">
        <div
          className="grid grid-cols-3 gap-4 w-full h-full"
          style={{
            transform: `scale(${scale}) translateZ(0)`,
            willChange: "transform, opacity",
            gridTemplateRows: "1.4fr 1.4fr 1.4fr", // taller rows so images are closer vertically
          }}
        >
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="w-full h-full overflow-hidden bg-gray-800 shadow-lg"
              style={{
                opacity: getItemOpacity(index, scrollProgress),
                borderRadius: borderRadius,
              }}
            >
              <img
                src={url}
                alt={`Grid item ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/cccccc/FFFFFF?text=Error";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridZoomAnimation;
