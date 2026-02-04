import React from "react";
import { motion } from "framer-motion";
import "./PartnersComponent.css";

const PartnersComponent = () => {
  const partners = [
    { name: "oline", type: "text" },
    { name: "Penta", type: "logo", alt: "Penta" },
    { name: "PinPoint", type: "logo", alt: "PinPoint" },
    { name: "Invert", type: "logo", alt: "Invert" },
    { name: "Hitech", type: "logo", alt: "Hitech" },
    { name: "ICEBERG", type: "logo", alt: "ICEBERG" },
    { name: "Dune", type: "logo", alt: "Dune" },
     { name: "oline", type: "text" },
    { name: "Penta", type: "logo", alt: "Penta" },
    { name: "PinPoint", type: "logo", alt: "PinPoint" },
    { name: "Invert", type: "logo", alt: "Invert" },
    { name: "Hitech", type: "logo", alt: "Hitech" },
    { name: "ICEBERG", type: "logo", alt: "ICEBERG" },
    { name: "Dune", type: "logo", alt: "Dune" },
  ];

  const renderPartnerCard = (partner, index) => (
    <div key={index} className="partner-card">
      {partner.type === "text" ? (
        <span className="partner-text">oline</span>
      ) : (
        <>
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMTBjLTQuNDIgMC04IDMuNTgtOCA4czMuNTggOCA4IDhzMCAuMDAgMCAwIi8+PGxpbmUgeDE9IjEwIiB5MT0iMTQiIHgyPSIxNCIgeTI9IjE0Ii8+PGxpbmUgeDE9IjEyIiB5MT0iMTAiIHgyPSIxMiIgeTI9IjE0Ii8+PC9zdmc+"
            alt={partner.alt}
            className="partner-logo"
          />
          <span className="partner-name">{partner.name}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="flex justify-center  p-4">

      <div className="min-h-[600px]  w-full mx-auto max-w-screen-xl ">
        <div className="bg-black h-full text-white rounded-[2rem] py-[60px] px-4 sm:px-8 md:px-[4.5rem] md:py-[120px]">
          <h3 className="text-3xl text-center text-white font-medium uppercase">We worked with brands across the globe</h3>

          <ul className="grid grid-cols-3 gap-2 mt-10">
            {partners.map((e, idx) => {
              return <p className="text-xl h-[100px] bg-white/5 uppercase hover:bg-white/15 transition-colors cursor-pointer rounded-xl  text-center place-content-center" key={idx}>{e.name}</p>
            })}
          </ul>
          {/* <div className="partners-wrapper">
            <motion.div
              className="partners-track"
              animate={{
                x: ["0%", "80%"],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              <div className="partners-row">
                {partners.map((partner, index) =>
                  renderPartnerCard(partner, `first-${index}`)
                )}
              </div>
              <div className="partners-row">
                {partners.map((partner, index) =>
                  renderPartnerCard(partner, `duplicate-${index}`)
                )}
              </div>
            </motion.div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PartnersComponent;
