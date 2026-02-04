import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronUp } from "lucide-react"; // or any arrow icon you prefer

const LearnMoreButton = ({label="LEARN MORE", link=""}) => {
  const [hovered, setHovered] = useState(false);

  const variants = {
    initial: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
    enter: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 w-60 bg-black text-white p-1 rounded-full font-medium"
    >
      {/* Circle with arrow */}
      <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center ">
        <AnimatePresence mode="wait">
          <motion.div
            key={hovered ? "hover" : "normal"}
            variants={variants}
            initial="enter"
            animate="animate"
            exit="exit"
            className="absolute text-black"
          >
            <ChevronUp size={30} strokeWidth={4.5} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text */}
      <span className="text-lg tracking-wide">LEARN MORE</span>
    </button>
  );
};

export default LearnMoreButton;
