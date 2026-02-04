import React, { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactUs from "./ContactUs";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

// A simple placeholder component for the button

const images = [
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66baf162b757a39b091_Tennis%20Net%20Close-Up.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66b1594a697a2ef4c3e_Modern%20Digital%20Alarm%20Clock.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bd60d48c5c5315745_Matte%20Black%20Circular%20Object%20on%20Red.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/68a061f4c6476b52f101c546_Tennis%20Court%20Smiley-p-800.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66d6417165e842c0883_Portrait%20of%20a%20Young%20Woman.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66ced2610f6911fafcf_Glossy%20Tote%20Bags%20on%20Vibrant%20Background.webp",
];


export default function Index() {
  const isMdScreen = useIsMobile(968)
  if (isMdScreen) {
    return <Fragment>
      <div className="p-4">
      <div
        className="relative w-full h-full overflow-hidden rounded-3xl"
      >
        <img
          src={images[3]}
          alt="Big center"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Text container with a semi-transparent overlay */}
        <div
          className="relative min-h-[300px] grid place-content-center text-center text-white bg-black/40"
        >
          <h2 className="text-4xl md:text-6xl font-bold">Let's Work</h2>
          <h2 className="text-4xl mb-4 md:text-6xl font-bold mb-10px">
            Together !
          </h2>
          <div className="flex justify-center">
          <ContactUs />
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  }
  return <ImagesSection />
}

const ImagesSection = () => {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(textRef.current, { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

      tl.fromTo(
        centerRef.current,
        { width: "44%" },
        { width: "100%", ease: "none" }
      ).to(
        textRef.current,
        { autoAlpha: 1, y: 0, ease: "power2.inOut" },
        "<70%" // Start fading in when the width animation is 70% complete
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-hidden bg-gray-100 grid place-items-center relative "
    >
      <div
        className="flex items-center justify-center gap-4 
                   sm:translate-x-4 md:translate-x-6 lg:translate-x-16"
      >
        {/* Left items... */}
        <img
          src={images[0]}
          alt="Left wide"
          className="object-cover rounded-3xl flex-shrink-0
            w-32 h-40 sm:w-40 sm:h-48 md:w-52 md:h-64 lg:w-60 lg:h-68"
        />
        <div className="flex flex-col gap-4 flex-shrink-0 -translate-y-4 sm:-translate-y-6">
          <img
            src={images[1]}
            alt="Small top"
            className="object-cover rounded-3xl
              w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-50 lg:h-50"
          />
          <img
            src={images[2]}
            alt="Small bottom"
            className="object-cover rounded-3xl
              w-28 h-36 sm:w-36 sm:h-44 md:w-44 md:h-52 lg:w-50 lg:h-64"
          />
        </div>

        {/* Big center card */}
        <div
          ref={centerRef}
          className="relative h-[18rem] sm:h-[24rem] md:h-[32rem] lg:h-[36rem] 
                     flex-shrink-0 overflow-hidden rounded-3xl"
        >
          <img
            src={images[3]}
            alt="Big center"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Text container with a semi-transparent overlay */}
          <div
            ref={textRef}
            className="absolute inset-0 grid place-content-center text-center text-white bg-black/40"
          >
            <h2 className="text-4xl md:text-6xl font-bold">Let's Work</h2>
            <h2 className="text-4xl md:text-6xl font-bold mb-10px">
              Together !
            </h2>
            <div className="mt-8 flex justify-center">
            <ContactUs />
            </div>
          </div>
        </div>

        {/* Right items... */}
        <img
          src={images[4]}
          alt="Right tall"
          className="object-cover rounded-3xl flex-shrink-0 translate-y-2 sm:translate-y-4
            w-32 h-44 sm:w-44 sm:h-64 md:w-52 md:h-80 lg:w-64 lg:h-118"
        />
        <img
          src={images[5]}
          alt="Right small"
          className="object-cover rounded-3xl flex-shrink-0 -translate-y-10 sm:-translate-y-16 md:-translate-y-20 lg:-translate-y-24
            w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-78 lg:h-68"
        />
      </div>
    </div>
  );
};

