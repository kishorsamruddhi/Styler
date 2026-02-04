import React, { useEffect, useRef } from "react";
import RotatingText from "./RotatingText";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SimpleContactUs from "./ContactUs";

gsap.registerPlugin(ScrollTrigger);

const ExpandingImageSection = () => {
  const containerRef = useRef(null);
  const zoomTargetRef = useRef(null); // This is the MASK
  const contentRef = useRef(null);    // This is the CONTENT inside
  const rotatingRef = useRef(null);

  // --- Framer Motion Parallax ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const pinDurationVh = 150;
  const totalContainerVh = 350;
  const animationEndProgress = pinDurationVh / (totalContainerVh - 100);

  const imageY = useTransform(
    scrollYProgress,
    [animationEndProgress, 1],
    ["0%", "30%"]
  );

  const textY = useTransform(
    scrollYProgress,
    [animationEndProgress, 1],
    ["0%", "-100%"]
  );
  
  const textOpacity = useTransform(
    scrollYProgress,
    [animationEndProgress, animationEndProgress + 0.2],
    [1, 0]
  );

  // --- GSAP Pin & Zoom Animation ---
  useEffect(() => {
    const zoomTarget = zoomTargetRef.current;
    const content = contentRef.current;
    if (!zoomTarget || !content) return;

    // Set the initial state for the MASK
    gsap.set(zoomTarget, {
      scaleX: 0.9,
      scaleY: 1,
    });

    // Set the initial state for the CONTENT, including the border radius
    gsap.set(content, {
      scale: 0.85,
      borderRadius: "25px",
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${pinDurationVh}vh`,
        scrub: 1,
        pin: zoomTarget,
        pinSpacing: true,
      },
    });

    // Animate the MASK to full screen
    timeline.to(zoomTarget, {
      scaleX: 1,
      scaleY: 1,
      ease: "none",
    }, 0);

    // Animate the CONTENT's uniform scale and border radius
    timeline.to(content, {
      scale: 1,
      borderRadius: "0px",
      ease: "none",
    }, 0);

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, []);

  // GSAP animation for the next section
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    // ... (This GSAP animation logic remains unchanged)
    const headingEl = headingRef.current;
    const paraEl = paraRef.current;
    if (!headingEl || !paraEl) return;
    if (!headingEl.dataset.split) {
      headingEl.dataset.split = "true";
      const text = headingEl.textContent || "";
      headingEl.innerHTML = "";
      text.split(" ").forEach((word) => {
        const span = document.createElement("span");
        span.className = "inline-block opacity-0 mr-2";
        span.textContent = word;
        headingEl.appendChild(span);
      });
    }
    const words = headingEl.querySelectorAll("span");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
    tl.fromTo(words,{ y: 40, opacity: 0 },{ y: 0, opacity: 1, duration: 0.6, stagger: 0.09, ease: "power3.out" },0);
    tl.fromTo(paraEl,{ y: 100, opacity: 0 },{ y: 0, opacity: 1, duration: 1, ease: "power3.out" },0);
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-x-hidden overflow-y-hidden w-full h-[${totalContainerVh}vh] bg-white font-inter`}
    >
      {/* The MASK: This div gets pinned and its aspect ratio changes. */}
      <div ref={zoomTargetRef} className="h-screen w-screen overflow-hidden">
        {/* The CONTENT: This div scales uniformly and has the border radius applied to it. */}
        <div ref={contentRef} className="w-full h-full overflow-hidden">
          <motion.div
            className="relative w-full h-full"
            style={{ y: imageY }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('https://cdn.prod.website-files.com/689989c2270f878736e77521/68a05f24dfe3241d0a83bab0_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp')",
              }}
            />

            {/* Foreground Text */}
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="relative z-10 h-full flex flex-col justify-center px-10 md:px-20 text-white max-w-xl"
            >
              <h1 className="text-3xl sm:text-6xl mb-6">
                We're focused on{" "}
                <span
                  className="inline-flex relative overflow-hidden align-bottom"
                  style={{ width: "9ch", height: "1.05em" }}
                >
                  <RotatingText
                    ref={rotatingRef}
                    texts={["Developer", "Designer", "Creator", "Dreamer"]}
                    rotationInterval={2500}
                  />
                </span>{" "}
                <br />
                your brand.
              </h1>
              <p className="mb-6 text-lg">
                Let's create something extraordinary together. Your vision, our
                commitment to excellence.
              </p>
              <div className="">
              <SimpleContactUs label="LEARN MORE" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* The next section */}
      <section
        ref={sectionRef}
        className="relative z-10 font-inter bg-white px-6 py-20 md:px-12 lg:px-24"
      >
        <div className="flex flex-col md:flex-row">
          <div className="space-y-6 md:w-[60%]">
            <h1 className="text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl">
              <span className="text-[15px] pr-10 leading-relaxed">
                • Next Level
              </span>
              <span ref={headingRef}>
                Transform Your Brand With Our Innovative Strategies & Discover
                New Opportunities.
              </span>
            </h1>
          </div>
          <div ref={paraRef} className="pt-10 md:pt-0 md:pl-10 md:w-[40%] font-light">
            <p className="md:text-md lg:text-md">
              Our team combines strategic thinking with creative execution to
              build brands that stand out.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpandingImageSection;