import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./SecondSection.css";

const lines = [
  [
    { word: "We", img: false },
    { word: "blend", img: false },
    {
      word: "",
      img: "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
    },
    { word: "creativity", img: false },
    { word: "with", img: false },
  ],
  [
    { word: "technology", img: false },
    { word: "to", img: false },
    {
      word: "",
      img: "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
    },
  ],
  [
    { word: "revolutionize", img: false },
    { word: "how", img: false },
    { word: "design", img: false },
    {
      word: "",
      img: "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
    },
  ],
  [
    { word: "meets", img: false },
    { word: "reality.", img: false },
  ],
];

const SecondSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const words = containerRef.current.querySelectorAll(".word");
    words.forEach((word, i) => {
      const letters = word.querySelectorAll(".letter");
      gsap.fromTo(
        letters,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          delay: i * 0.2,
        }
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="second-section w-full min-h-[100vh] flex flex-col items-center justify-center bg-gray-100 text-center"
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className="line mb-8 flex flex-wrap justify-center items-center"
        >
          {line.map((item, idx) =>
            item.img ? (
              <img
                key={idx}
                src={item.img}
                alt="icon"
                className="letter mx-4 inline-block"
                style={{ height: "4rem", width: "4rem" }}
              />
            ) : (
              <div key={idx} className="word mx-6 flex">
                {item.word.split("").map((char, cIdx) => (
                  <h2
                    key={`${idx}-${cIdx}`}
                    className="letter text-[4rem] font-inter font-bold inline-block"
                  >
                    {char}
                  </h2>
                ))}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default SecondSection;
