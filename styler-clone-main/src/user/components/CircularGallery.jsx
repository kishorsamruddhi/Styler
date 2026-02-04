import { Fragment, useCallback, useRef, useState } from "react"; // 1. Import useState
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CircularGallery.css";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const placeHolderImages = [
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
].map((src) => ({ imageUrl: src, title: "placeholder" }));

const CircularGallery =({ images =placeHolderImages }) => {
  images = images && Array.isArray(images) && images.length>0 ? images : placeHolderImages;

  const containerRef = useRef(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const setHandleFile = useCallback((val) => () => { return setFullscreenImage(val) }, [])

  useGSAP(() => {
    if(!containerRef.current) return
    const items = gsap.utils.toArray(".img");

    const total = items.length;
    items.forEach((item, idx) => {
      gsap.set(item, {
        offsetPath: `circle( 50% at 50% 50%)`,
        offsetDistance: `${(idx / total) * 100}%`,
      })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#slider",
        start: "-=400 =300px",
        end: "+=1500",
        // markers: true,
        scrub: true,
      }
    })
    tl.to("#slider", {
      rotateZ: 360 * -3,
    });

  }, { scope: containerRef })

  
  return (
    <Fragment>
      <div style={{transformOrigin:"center center"}} className="overflow-hidden mx-auto h-[200px] " ref={containerRef}>
        <div id="slider" 
        
        className={cn("absolute z-10 min-w-[1500px] w-full  max-w-[2000px] pt-[100px] md:pt-[75px] xl:pt-0 ",
          "top-[135%] left-1/2 -translate-x-1/2 translate-y-full ",
        )}
        style={{transformOrigin:"center center"}} >
          {images.map(({title, imageUrl}, i) => (
            <div
              className="img"
              key={i}
              onMouseEnter={setHandleFile(imageUrl)}
              onMouseLeave={setHandleFile(null)}
            >
              <img src={imageUrl} alt={title} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="hover-background-viewer"
        style={{ opacity: fullscreenImage ? 1 : 0, }}>
        {fullscreenImage && (
          <img src={fullscreenImage} alt="Fullscreen background" />
        )}
      </div>
    </Fragment>
  );
};


export default CircularGallery;

