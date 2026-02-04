import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import lifestyle1 from "@/assets/6899f66a0d1bd4d5f7d23f0f_Dynamic_20Basketball_20Action.jpg";
import lifestyle2 from "@/assets/6899f66a24a7a04635323b86_Cheerful_20Young_20Woman_20with_20Colorful_20Attire.jpg";
import lifestyle3 from "@/assets/6899f66a70c7da6d8e84b00d_Modern_20Pastel_20Chair.jpg";
import lifestyle4 from "@/assets/6899f66a260387e191729798_Modern_20Gaming_20Controller.jpg";
import lifestyle6 from "@/assets/6899f66b1580d9ca27b80500_Dapper_20Young_20Man_20with_20Stylish_20Attire_20and_20Joyful_20Smile.jpg";
import lifestyle7 from "@/assets/6899f66b1594a697a2ef4c3e_Modern_20Digital_20Alarm_20Clock.jpg";
import lifestyle8 from "@/assets/6899f66b1594a697a2ef4c3e_Modern_20Digital_20Alarm_20Clock.jpg";
import lifestyle9 from "@/assets/6899f66ba0856be611f01282_Modern_20Control_20Panel_20(1).jpg";
import lifestyle10 from "@/assets/6899f66d6417165e842c0883_Portrait_20of_20a_20Young_20Woman.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function GridZoom() {
    const container = useRef(null);
    const gridRef = useRef(null);

    useGSAP(() => {
        const imgs = gsap.utils.toArray("#container img")

        const tl = gsap.timeline({
            scrollTrigger:{
            trigger: gridRef.current,
            start: "top top",
            end: "+=3500px",
            markers: true,
            pin: true,
            scrub: 1,
        }
        });

        tl.to(gridRef.current, { scale: 5 });

    }, { "scope": container })

    return (
        <div ref={container} id="container" className="min-h-screen overflow-hidden relative">

            <div ref={gridRef} id="grid" className="h-sc grid grid-cols-3 gap-8  [align-content:_center]">

                <img className="h-[200px] w-full object-cover rounded-2xl" src={lifestyle1} alt="image" />
                <img className="h-[200px] w-full object-cover rounded-2xl" src={lifestyle2} alt="image" />
                <img className="h-[200px] w-full object-cover rounded-2xl" src={lifestyle3} alt="image" />

                <img className="h-[200px] w-full object-cover rounded-2xl" src={lifestyle4} alt="image" />
                <img className="h-[200px] w-full object-cover rounded-2xl" src={lifestyle10} alt="image" />
                <img className="h-[200px] w-full object-cover rounded-2xl" src={lifestyle6} alt="image" />

                <img className="h-[200px] w-full object-cover rounded-2xl" src={lifestyle7} alt="image" />
                <img className="h-[200px] w-full object-cover rounded-2xl" src={lifestyle8} alt="image" />
                <img className="h-[200px] w-full object-cover rounded-2xl" src={lifestyle9} alt="image" />
            </div>

        </div>
    )
}
