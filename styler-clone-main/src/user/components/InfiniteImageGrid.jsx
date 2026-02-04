import { useEffect, useRef } from "react";
import gsap from "gsap";

// Import lifestyle images
import lifestyle1 from "../../assets/6899f66a0d1bd4d5f7d23f0f_Dynamic_20Basketball_20Action.jpg";
import lifestyle2 from "../../assets/6899f66a24a7a04635323b86_Cheerful_20Young_20Woman_20with_20Colorful_20Attire.jpg";
import lifestyle3 from "../../assets/6899f66a70c7da6d8e84b00d_Modern_20Pastel_20Chair.jpg";
import lifestyle4 from "../../assets/6899f66a260387e191729798_Modern_20Gaming_20Controller.jpg";
import lifestyle5 from "../../assets/6899f66ab75d6d51921c4cd4_Blue_20Stadium_20Seats.jpg";
import lifestyle6 from "../../assets/6899f66b1580d9ca27b80500_Dapper_20Young_20Man_20with_20Stylish_20Attire_20and_20Joyful_20Smile.jpg";
import lifestyle7 from "../../assets/6899f66b1594a697a2ef4c3e_Modern_20Digital_20Alarm_20Clock.jpg";
import lifestyle8 from "../../assets/6899f66b1594a697a2ef4c3e_Modern_20Digital_20Alarm_20Clock.jpg";
import lifestyle9 from "../../assets/6899f66ba0856be611f01282_Modern_20Control_20Panel_20(1).jpg";
import lifestyle10 from "../../assets/6899f66d6417165e842c0883_Portrait_20of_20a_20Young_20Woman.jpg";

const InfiniteImageGrid = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const row1Images = [
    lifestyle1,
    lifestyle2,
    lifestyle3,
    lifestyle4,
    lifestyle5,
  ];
  const row2Images = [
    lifestyle6,
    lifestyle7,
    lifestyle8,
    lifestyle9,
    lifestyle10,
  ];

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    const row1Timeline = gsap.timeline({ repeat: -1 });
    row1Timeline.to(row1Ref.current, {
      x: "-50%",
      duration: 35,
      ease: "none",
    });

    const row2Timeline = gsap.timeline({ repeat: -1 });
    row2Timeline.fromTo(
      row2Ref.current,
      { x: "-50%" },
      {
        x: "0%",
        duration: 40,
        ease: "none",
      }
    );

    return () => {
      row1Timeline.kill();
      row2Timeline.kill();
    };
  }, []);

  const renderImageRow = (images, direction) => {
    const duplicatedImages = [...images, ...images];

    return (
      <div className="flex gap-3 sm:gap-4 md:gap-6 w-fit">
        {duplicatedImages.map((img, index) => (
          <div
            key={`${direction}-${index}`}
            className="
              relative overflow-hidden 
              rounded-lg sm:rounded-xl md:rounded-2xl 
              shadow-md md:shadow-lg hover:shadow-xl 
              transition-shadow duration-300 flex-shrink-0
              w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72
            "
          >
            <img
              src={img}
              alt={`Lifestyle image ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pb-6 sm:pb-8 md:pb-10 bg-background overflow-hidden flex flex-col justify-center">
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {/* Row 1 - Scrolls Left */}
        <div className="overflow-hidden">
          <div ref={row1Ref} className="flex gap-4 sm:gap-6 w-fit">
            {renderImageRow(row1Images, "left")}
          </div>
        </div>

        {/* Row 2 - Scrolls Right */}
        <div className="overflow-hidden">
          <div ref={row2Ref} className="flex gap-4 sm:gap-6 w-fit">
            {renderImageRow(row2Images, "right")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteImageGrid;
