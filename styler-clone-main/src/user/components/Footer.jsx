import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const headingEl = headingRef.current;
    if (!container || !headingEl) return;

    // Split heading into characters
    const raw = headingEl.textContent || "";
    if (!headingEl.dataset.split) {
      headingEl.dataset.split = "true";
      headingEl.innerHTML = "";
      Array.from(raw).forEach((ch) => {
        const span = document.createElement("span");
        span.className = "char inline-block opacity-0";
        span.innerHTML = ch === " " ? "&nbsp;" : ch;
        headingEl.appendChild(span);
      });
    }

    const chars = headingEl.querySelectorAll("span.char");
    const columns = container.querySelectorAll(".footer-col");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      chars,
      { x: -30, y: 20, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
      },
      0
    );

    tl.fromTo(
      columns,
      { y: 150, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 4,
        ease: "back.out(1.7)",
      },
      0
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div
        ref={containerRef}
        className="bg-[#191919] min-h-[90vh] text-white rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 mt-10 md:mt-20"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1 */}
          <div className="footer-col col-span-1 md:col-span-2 md:pr-10">
            <h2 className="text-xl sm:text-2xl font-inter mb-2">Styler.</h2>
            <p className="text-[#AAAAAA] text-sm sm:text-base leading-relaxed">
              A dynamic agency dedicated to bringing your ideas to life. Where
              creativity meets purpose.
            </p>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h2 className="text-xs sm:text-sm font-semibold text-[#AAAAAA] mb-1">
              Explore
            </h2>
            <ul className="space-y-1 text-sm sm:text-base">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Works</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h2 className="text-xs sm:text-sm font-semibold text-[#AAAAAA] mb-1">
              More
            </h2>
            <ul className="space-y-1 text-sm sm:text-base">
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Style Guide</a>
              </li>
              <li>
                <a href="#">Changelog</a>
              </li>
              <li>
                <a href="#">Licenses</a>
              </li>
              <li>
                <a href="#">Instructions</a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h2 className="text-xs sm:text-sm font-semibold text-[#AAAAAA] mb-1">
              Contacts
            </h2>
            <p className="text-sm sm:text-base md:text-[1rem] text-white pr-2">
              XYZ Times Sq, New York, United States
            </p>
            <p className="text-sm sm:text-base md:text-md text-white mt-2">
              hello@styler.com
            </p>
            <p className="text-sm sm:text-base md:text-md text-white">
              +1 023-456-789
            </p>
          </div>
        </div>

        {/* Big Heading */}
        <div
          ref={headingRef}
          className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold font-inter mt-10 md:mt-20"
        >
          Design is Our Passion.
        </div>

        {/* Footer Bottom */}
        <div className="footer-col mt-6 md:mt-10 flex flex-col md:flex-row justify-between items-center text-sm sm:text-base text-[#AAAAAA]">
          <p className="text-center md:text-left">
            Built by <span className="text-white">Yves Adrales</span> Powered by{" "}
            <span className="text-white">Webflow</span>
          </p>
          <p className="mt-4 md:mt-0 text-center md:text-right">
            © 2025 Styler. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
