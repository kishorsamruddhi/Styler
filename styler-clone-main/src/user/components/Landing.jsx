import { useLayoutEffect, useRef, } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CardCarousel from "./CardCarousel";
import ResponsiveGallery from "./ResponsiveGallery";
// import { useQuery } from "@tanstack/react-query";

gsap.registerPlugin(ScrollTrigger);


const Landing = () => {
  // const { isLoading, isError, data } = useQuery({ queryKey: ['getHeroThree'], queryFn: getHeroThree })
  const containerRef = useRef(null);

  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=1500",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // const cardsImages = isLoading || isError || data?.data?.success == false
  //   ? null : data?.data?.cards
  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-screen bg-white overflow-hidden"
    >
      {/* Main Text */}
      <h1
        className="
          font-inter font-semibold text-[#191919] z-10 text-center
          text-[48px] sm:text-[80px] md:text-[200px] lg:text-[280px] xl:text-[360px]
          mb-4 md:mb-0
        "
      >
        Styler
      </h1>

      {/* Card Carousel */}
      <div
        className="
          relative w-full flex justify-center 
          md:absolute md:top-[15%] md:left-1/2 md:-translate-x-1/2
          z-50 
          h-[200px] sm:h-[250px] md:h-[50vh] md:max-h-[400px]
          px-4
        "
      >
        <CardCarousel images={null} timeline={tl} />
      </div>

      {/* Circular/Responsive Gallery */}
      <div className="w-full mt-6 sm:mt-10">
        <ResponsiveGallery timeline={tl} />
      </div>
    </div>
  );
};

export default Landing;
