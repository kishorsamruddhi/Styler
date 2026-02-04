"use client"
// ParallaxServicesSection.jsx
import { useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import threeBags from "../../assets/6899f66ced2610f6911fafcf_Glossy_20Tote_20Bags_20on_20Vibrant_20Background.jpg"
import toyCar from "../../assets/6899f669754b169a3dbd5c7f_Mini_20Car_20Flower_20Vase.jpg"
import controller from "../../assets/6899f66a260387e191729798_Modern_20Gaming_20Controller.jpg"
import controlPanel from "../../assets/6899f66ba0856be611f01282_Modern_20Control_20Panel_20(1).jpg"
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

let services = [
  {
    title: "Design",
    category: "Website",
    description:
      "Driven by a deep passion for design, we craft meaningful visuals that spark emotion and leave a powerful, lasting impression on your audience.",
    image: threeBags,
  },
  {
    title: "Marketing",
    category: "SEO",
    description:
      "We utilize a diverse blend of strategic channels and tailored tactics, each carefully selected and refined to effectively reach your goals.",
    image: toyCar
  },
  {
    title: "Prototype",
    category: "Front-end",
    description:
      "Highlighting the essential features, interactive elements, and practical functionalities that bring your idea to life.",
    image: controller
  },
  {
    title: "Branding",
    category: "Business",
    description:
      "A thoughtful craft rooted in storytelling and design—shaping perceptions, stirring emotions, and curating meaningful experiences.",
    image: controlPanel
  },
];


function getData({ isLoading, isError, data }) {
  try {
    const verifyResp = isLoading || isError || data?.data?.success == false
      ? null : data?.data
    const cards = verifyResp === null ? [] : data?.data?.projects
    const featured = cards?.length > 0 && cards?.filter(c => c?.featured)
    return featured
  } catch (error) {
    return []
  }
}

export default function Index() {
  // const resp = useQuery({ queryKey: ['getProjects'], queryFn: getProjects, })
  // services = featured.length > 0 ? featured : services
  const screenXl = useIsMobile(1220)

  if (screenXl || screenXl == undefined) {
    return <div className="mx-auto mt-[50px] my-[50px] px-4">
      <h2
        style={{ lineHeight: "1.2" }}
        className="text-3xl xs:text-4xl font-bold sm:text-5xl md:font-semibold max-w-screen-sm"
      >
        Services We're Passionate About.
      </h2>
      <div className="mt-5  flex flex-col gap-8 sm:grid sm:grid-cols-2">
        {services.map((card, idx) => (
          <SimpleCard key={idx} card={card} />
        ))}
      </div>
    </div>
  }

  return (<div className="max-w-screen-lg mx-auto">
    <h2 style={{ lineHeight: "1" }} className="text-[84px] font-semibold mb-[4rem] max-w-screen-md">
      Services We're Passionate About.
    </h2>

    <PinScroller
      leftSectionContent={services}
      rigthSectionContent={services}
      mainContent={services}
      leftCardTemplate={leftCardTemplate}
      rightCardTemplate={rightCardTemplate}
    />
  </div>)
}



function SimpleCard({ card }) {
  return (
    <div className="relative h-full ">
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-auto max-h-[350px] object-cover rounded-2xl" />
      <div className="flex-grow-1 flex flex-col justify-between gap-4 py-1 px-1 sm:mb-16">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs ">{card.title} •  2024</h3>
          <p className="text-2xl md:mt-1 font-semibold ">{card.category}</p>
          <p className="text-sm md:text-base text-gray-700"> {card.description}</p>
        </div>
      </div>
      <button className="text-xs md:text-base fly-animation-container mt-3 sm:absolute bottom-0 left-0 flex w-fit items-center gap-2 p-[.125rem_2rem_.125rem_.25rem] bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
        <span className="h-8 w-8 md:h-[48px] md:w-[48px] flex justify-center items-center rounded-full overflow-hidden bg-white">
          <svg className="fly-animation" width="16" height="16" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 19.5L0 18.5L8 0.5L16 18.5L15 19.5L8 16.5L1 19.5Z" fill="#1D2025" />
          </svg>
        </span>
        <span>
          LEARN MORE
        </span>
      </button>
    </div>
  );
}
function leftCardTemplate(data, index) {
  return <img
    src={services[index].image}
    alt={services[index].title}
    className="w-full h-full object-cover"
  />
}


function rightCardTemplate(data, index) {
  return (
    <div
      className="flex flex-col"
      style={{ gridColumnGap: "1.11vw", gridRowGap: "1.11vw" }}
    >
      <div
        className="flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
        <span className="text-sm text-gray-600">
          {services[index].category}
        </span>
      </div>
      <h3 className="text-5xl font-bold">
        {services[index].title}
      </h3>
      <p className="text-gray-700">
        {services[index].description}
      </p>
      <button className="fly-animation-container flex w-fit items-center gap-2 p-[.125rem_2rem_.125rem_.25rem] bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
        <span className="h-[48px] w-[48px] flex justify-center items-center rounded-full overflow-hidden bg-white">
          <svg className="fly-animation" width="16" height="16" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 19.5L0 18.5L8 0.5L16 18.5L15 19.5L8 16.5L1 19.5Z" fill="#1D2025" />
          </svg>
        </span>
        <span>
          LEARN MORE
        </span>
      </button>
    </div >
  )
}


const PinScroller = memo(({ leftSectionContent = pexels, rigthSectionContent = titles, mainContent, leftCardTemplate, rightCardTemplate, }) => {
  mainContent = mainContent || leftSectionContent

  const containerRef = useRef(null);
  const textSectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    if (!containerRef?.current) return null
    const Slides = gsap.utils.toArray(".pin-scroller-media-card")
    // const Overlays = gsap.utils.toArray(".pin-scroller-media-card .backdrop")
    const CardText = gsap.utils.toArray(".pin-scroller-text-card")
    const maxBlur = 32;

    Slides.filter((_, i) => i !== 0).forEach((val) => gsap.set(val, { yPercent: 0, filter: `blur(${maxBlur}px)` }))
    // Overlays.filter((_, i) => i !== 0).forEach((val) => gsap.set(val, { backdropFilter: `blur(${maxBlur}px)` }))
    CardText.filter((_, i) => i !== 0).forEach((val) => gsap.set(val, { opacity: 0 }))

    const totalSlides = Slides.length;
    const portion = 100 / (mainContent.length - 1)
    if (Array.isArray(cardsRef?.current)) {
      cardsRef.current = cardsRef.current.map((ele) => {
        return getComputedStyle(ele)?.height || (innerHeight - 100) + "px"
      })
    }
    const endOfTheContainer = cardsRef.current.reduce((pr, cr) => pr + Number(cr.replace("px", "")), 0);
    const end = Math.max(endOfTheContainer, (innerHeight - 100) * totalSlides);
    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "center +=45%",
      end: end +"px",
      // markers: true,
      scrub: true,
      pinSpacer: false,
      pinReparent: true,
      pinType: "fixed",
      onUpdate: (self) => {
        const scrollProgress = self.progress; // value between 0 and 1
        const scrollPercentage = scrollProgress * 100;
        const activeIndex = Math.floor(scrollProgress * totalSlides);

        CardText.forEach((item, index) => {
          if (activeIndex == index) {
            gsap.set(item, { opacity: 1, zIndex: 9 })
          }
          else {
            gsap.set(item, { opacity: 0, zIndex: 8 })
          }
          if (activeIndex >= CardText.length && activeIndex - 1 == index) {
            gsap.set(item, { opacity: 1, })
          }
        })

        Slides.forEach((val, index) => {
          const start = portion * index;
          const end = portion * (index + 1);
          const yPercent = progressInRange(scrollPercentage, start, end);

          const clampedY = Math.min(Math.max(yPercent, 0), 100);
          const progress = clampedY / 100;

          let vars = { yPercent: clampedY * -1 };
          gsap.set(val, vars);

          const nextCard = Slides[index + 1];
          const prevCard = Slides[index - 1];
          if (nextCard) {
            const blur = maxBlur * (1 - progress); // progress 0 → maxBlur, progress 1 → 0
            gsap.set(nextCard, { filter: `blur(${blur.toFixed(2)}px)` });
          }

        });
      }
    })
  }, { scope: containerRef })

  function progressInRange(current, start, end) {
    if (end === start) throw new Error('Start and end cannot be equal');
    return ((current - start) / (end - start)) * 100;
  }

  return (
    <div ref={containerRef} className="relative grid grid-cols-2">
      <div className=" "
      >
        <div className="relative py-4 h-[calc(100vh_-_100px)]">
          {leftSectionContent.map((item, index) => (
            <div
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ zIndex: leftSectionContent.length - index, willChange: "filter", transition: "filter .1s ease-in-out" }}
              className={"pin-scroller-media-card top-0 left-0 absolute w-full h-[calc(100vh_-_100px)] rounded-[24px] overflow-hidden"}
              key={index + 1}
            >
              {leftCardTemplate(item, index)}
            </div>
          ))}
        </div>
      </div>
      <div ref={textSectionRef} className="relative mt-[100px] ">
        {rigthSectionContent.map((item, index) => <div
          key={index + 1}
          className={"pin-scroller-text-card top-0 left-0 absolute w-full  p-10 rounded-lg transition-opacity"}>
          {rightCardTemplate(item, index)}
        </div>)}
      </div>
    </div>
  );
}, () => false)