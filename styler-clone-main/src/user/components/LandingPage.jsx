import Landing from "./Landing";
import AnimatedText from "./AnimatedText";
import InfiniteImageGrid from "./InfiniteImageGrid";
import Footer from "./Footer";
import ImagesSection from "./ImagesSection";

import ContactUs from "./ContactUs";
import PartnersComponent from "./PartnersComponent";
import ParallaxServicesSection from "./ParallaxServicesSection";
import FeaturerdWork from "./Featurerd-Work";
import { Fragment } from "react";
// import { animate, motion } from "framer-motion"


const LandingPage = () => {
  // return <div className="h-screen flex items-center justify-center">
  //   <MotionStaggerSwipeUpText label={"Home"} />
  // </div>
  return (
    <Fragment>
      <Landing />
      <AnimatedText />
      <InfiniteImageGrid />
      <FeaturerdWork />
      <ParallaxServicesSection />
      <PartnersComponent />
      <ImagesSection />
    </Fragment>
  );
};

export default LandingPage;



const vars = {
  initial: {},
  animate: { backgroundColor: "#00ffeb" }
}

const topLabelVars = {
  initial: { y: "0%", },
  animate: { y: "-120%" }
}

const bottomLabelVars = {
  initial: { y: "100%", },
  animate: { y: "0%", }
}

function MotionStaggerSwipeUpText({ label }) {

  return <motion.div
    whileHover={"animate"}
    initial="initial"
    variants={vars}
    transition={{ duration: .8 }}
    className="rounded-lg relative overflow px-8 py-2 bg-neutral-200">
    <motion.span className="pointer-events-none block h-full w-full" variants={topLabelVars} >{label}</motion.span>
    <motion.span className="pointer-events-none flex justify-center items-center h-full w-full absolute top-0 left-0" variants={bottomLabelVars}>{label}</motion.span>
  </motion.div>
}