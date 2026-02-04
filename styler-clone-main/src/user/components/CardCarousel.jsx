import { useState, useEffect } from "react";
import "./CardCarousel.css";

const placeHolderImages = [
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
].map((i, idx) => ({ imageUrl: i, title: idx }));

export default function CardCarousel({ images = placeHolderImages }) {
  images = images && Array.isArray(images) && images.length > 0 ? images : placeHolderImages;
  const [current, setCurrent] = useState(0);

  // Auto rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [images.length, images?.[0]?.title]);

  return (
    <div className="carousel-container">
      {images.map(({ title, imageUrl }, index) => {
        let position = "card";
        if (index === current) position = "card center";
        else if (index === (current + 1) % images.length)
          position = "card right";
        else if (index === (current + 2) % images.length)
          position = "card left";

        return (
          <div key={index} className={position}>
            <img src={imageUrl} alt={title} />
          </div>
        );
      })}
    </div>
  );
}
