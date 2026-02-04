import { useScroll, useTransform, motion } from "framer-motion";
import { memo, useRef } from "react";

import threeBags from "../../assets/6899f66ced2610f6911fafcf_Glossy_20Tote_20Bags_20on_20Vibrant_20Background.jpg";
import toyCar from "../../assets/6899f669754b169a3dbd5c7f_Mini_20Car_20Flower_20Vase.jpg";
import controller from "../../assets/6899f66a260387e191729798_Modern_20Gaming_20Controller.jpg";
import controlPanel from "../../assets/6899f66ba0856be611f01282_Modern_20Control_20Panel_20(1).jpg";
import { InteractiveTravelCard } from "./3D-Card";
import { useIsMobile } from "@/hooks/use-mobile";

const cards = [
    {
        title: "Design",
        category: "Website",
        image: threeBags,
    },
    {
        title: "Marketing",
        category: "SEO",
        image: toyCar,
    },
    {
        title: "Prototype",
        category: "Front-end",
        image: controller,
    },
    {
        title: "Branding",
        category: "Business",
        image: controlPanel,
    },
];

export default function Index() {

    const screenXl = useIsMobile(1220)

    if (screenXl || screenXl == undefined) {
        return <div className="mx-auto my-[50px] px-4">
            <h2
                style={{ lineHeight: "1.2" }}
                className="text-3xl xs:text-4xl sm:text-5xl font-semibold max-w-screen-sm"
            >
                Featured Works for Our Incredible Clients.
            </h2>
            <div className="mt-5 flex flex-col gap-8 sm:grid sm:grid-cols-2">
                {cards.map((card, idx) => (
                    <SimpleCard key={idx} card={card} />
                ))}
            </div>
        </div>
    }

    return <AnimatedFeaturedWork />
}

function SimpleCard({ card }) {
    return (
        <div className="">
            <img
                src={card.image}
                alt={card.title}
                className="w-full h-auto max-h-[350px] object-cover rounded-2xl" />
            <div className="py-1 px-1">
                <h3 className="text-xs text-gray-500">{card.title} •  2024</h3>
                <p className="text-2xl mt-1 font-semibold ">{card.category}</p>
            </div>
        </div>
    );
}



const AnimatedFeaturedWork = memo(() => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // useMotionValueEvent(scrollYProgress, "change", e => {
    //     console.log(e)
    // })
    // console.log(scrollYProgress)
    const leftY = useTransform(scrollYProgress, [0, .85], ["12%", "0%"]);
    const rightY = useTransform(scrollYProgress, [0, .85], ["55%", "0%"]);

    return (
        <div
            ref={containerRef}
            className="
          pl-[4.5rem]
          pr-[4.5rem]
      mx-auto mb-[200px] mt-[100px] px-4"
        >
            <h2
                style={{ lineHeight: "1" }}
                className="text-[84px] font-semibold mb-[4rem] max-w-screen-md"
            >
                Featured Works for Our Incredible Clients.
            </h2>

            <div className="grid grid-cols-2 gap-8">
                <motion.div style={{ y: leftY }} className="space-y-8">
                    {cards.slice(0, 2).map((card, idx) => (
                        <Card key={idx} card={card} />
                    ))}
                </motion.div>

                <motion.div style={{ y: rightY }} className="space-y-8">
                    {cards.slice(2).map((card, idx) => (
                        <Card key={idx} card={card} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}, () => false)

const blurStraps = Array.from({ length: 10 }).fill(1)

const blurStrapVars = {
    init: { opacity: 0 },
    animate: { opacity: 1 },
    end: { opacity: 0 },
}

const cardVars = {
    init: { opacity: 0, pointerEvents: "none" },
    animate: { opacity: 1, pointerEvents: "auto" },
    end: { opacity: 0, pointerEvents: "none" },
}


const imageVars = {
    init: { scale: 1, },
    animate: { scale: 1.1, },
    end: { scale: 1, },
}


function Card({ card }) {
    const cardRef = useRef()

    return (
        <div className="overflow-hidden ">
            <motion.div initial="init"
                whileHover="animate"
                exit="end"
                className="relative overflow-hidden rounded-[32px] h-[440px] flex justify-center items-center">
                <motion.img
                    variants={imageVars}
                    src={card.image}
                    alt={card.title}
                    transition={{ duration: .5, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="grid grid-cols-10 absolute h-full w-full">
                    {blurStraps.map((_, idx) =>
                        <motion.div variants={blurStrapVars}
                            transition={{ duration: .3, delay: .2, ease: "easeInOut" }}
                            key={idx} style={{
                                willChange: "backdrop-filter",
                                backdropFilter: "blur(16px)",
                            }} className="h-full w-full
                        bg-black/5
                        " />
                    )}
                </div>
                <motion.div variants={cardVars}
                    transition={{ duration: .6, delay: .1, ease: "easeInOut" }}
                    className="w-1/2 h-1/2 relative"
                >
                    <InteractiveTravelCard ref={cardRef}>
                        <img
                            src={card.image}
                            alt={card.title}
                            className=" h-full w-full object-cover rounded-xl"
                        />
                    </InteractiveTravelCard>
                </motion.div>
            </motion.div>

            <div className="p-4">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.category}</p>
            </div>
        </div>
    );
}
