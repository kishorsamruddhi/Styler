"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { forwardRef } from "react";

export const InteractiveTravelCard = forwardRef(function InteractiveTravelCard(
    { children },
    ref
) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // const springConfig = { damping: 15, stiffness: 150 };
    // const springX = useSpring(mouseX, springConfig);
    // const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(mouseX, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseY, [-0.5, 0.5], ["-25deg", "25deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                willChange: "transform",
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "relative h-full w-full rounded-2xl ",
            )}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="h-full w-full shadow-lg"
            >
                {children}
            </div>
        </motion.div>
    );
});
