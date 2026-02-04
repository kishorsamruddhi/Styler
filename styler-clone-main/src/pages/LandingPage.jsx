import CircularGallery from "../user/components/CircularGallery";
import CardCarousel from "../user/components/CardCarousel";

const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[100vh] bg-white">
      {/* Card Carousel overlayed on text */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[600px] h-[400px]">
        <CardCarousel />
      </div>

      {/* Main Text */}
      <h1 className="font-inter text-[380px] font-semibold text-[#191919] z-10">
        Styler
      </h1>

      {/* Circular Gallery */}
      <div className="relative w-full z-0">
        <CircularGallery
          bend={50}
          textColor="#ffffff"
          borderRadius={0.25}
          scrollEase={0.02}
        />
      </div>
    </div>
  );
};

export default LandingPage;
