import Container from '@/components/Container'
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';
import { FaDribbble, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger);

export default function OurPartners() {

    const sectionRef = useRef(null)
    const awards = [
        { name: "Artisan", organization: "Awwwards", award: "Site of the Month", year: 2021 },
        { name: "Connect", organization: "Webby ards", award: "Webby Winner", year: 2022 },
        { name: "Nova", organization: "Awwwards", award: "Developer Award", year: 2023 },
        { name: "Scape", organization: "CSS  Awards", award: "Best UI Design", year: 2024 },
        { name: "Cube", organization: "FWA", award: "Site of the Day", year: 2024 }
    ];

    useGSAP(() => {
        const items = gsap.utils.toArray(".scrollAnimation");

        items.forEach((item) => {
            gsap.set(item, { yPercent: 100, opacity: 0 },)
        })

        items.forEach((item) => {
            gsap.to(
                item,
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power2.in",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <Container>
            <section ref={sectionRef} className='bg-black text-white rounded-[2rem] py-[60px] px-4 sm:px-8 md:px-[4.5rem] md:py-[120px]'>
                <div className="grid  md:grid-cols-[25%_1fr]">
                    <div className="  flex flex-col gap-3 bg-inherit">
                        <h5 className='scrollAnimation text-sm md:text-xl font-normal'>Global Brands</h5>
                        <h4 className='scrollAnimation text-3xl md:text-5xl font-medium'>Our <br /> Partners</h4>
                        <p className='scrollAnimation text-xs md:text-base'>We collaborate with bold thinkers, ambitious startups, and industry leaders who value design that delivers. Together, we build what’s next.</p>
                    </div>
                    <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-4 gap-3 mt-10 grid-rows-[auto] md:grid-rows-[repeat(3,_150px)]">
                        {/* 1nd Row */}
                        <scrollAnimation div className="scrollAnimation min-h-16 border border-neutral-800 flex justify-center items-center rounded-3xl">
                            <FaFacebook size={"32px"} color="#fff" />
                            <span className='ml-2'>Facebook</span>
                        </scrollAnimation>
                        <div className="hidden md:block"></div>
                        <div className="scrollAnimation min-h-16 border border-neutral-800 flex justify-center items-center rounded-3xl">
                            <FaLinkedin size={"32px"} color="#fff" />
                            <span className='ml-2'>LinkedIn</span>
                        </div>
                        <div className="scrollAnimation min-h-16 border border-neutral-800 flex justify-center items-center rounded-3xl">
                            <FaInstagram size={"32px"} color="#E4405F" />
                            <span className='ml-2'>Instagram </span>
                        </div>


                        {/* 2nd Row */}

                        <div className="hidden md:block"></div>
                        <div className="scrollAnimation min-h-16 border border-neutral-800 flex justify-center items-center rounded-3xl">
                            <FaLinkedin size={"32px"} color="#fff" />
                            <span className='ml-2'>LinkedIn</span>
                        </div>
                        <div className="hidden md:block"></div>
                        <div className="scrollAnimation min-h-16 border border-neutral-800 flex justify-center items-center rounded-3xl">
                            <FaDribbble size={"32px"} color="#EA4C89" />
                            <span className='ml-2'>Dribbble </span>
                        </div>


                        {/* 3nd Row */}

                        <div className="scrollAnimation min-h-16 border border-neutral-800 flex justify-center items-center rounded-3xl">
                            <FaLinkedin size={"32px"} color="#fff" />
                            <span className='ml-2'>LinkedIn</span>
                        </div>
                        <div className="hidden md:block"></div>
                        <div className="scrollAnimation min-h-16 border border-neutral-800 flex justify-center items-center rounded-3xl">
                            <FaDribbble size={"32px"} color="#EA4C89" />
                            <span className='ml-2'>Dribbble </span>
                        </div>
                        <div className="hidden md:block"></div>

                    </div>
                </div>
                <div className="mt-[50px] md:mt-[150px] grid md:grid-cols-[25%_1fr]">
                    <h5 className='scrollAnimation text-sm md:text-xl'>Our Awards</h5>
                    <h4 className='scrollAnimation text-2xl mt-4 md:mt-0 md:[text-indent:8rem] [lineHeight1.3] md:[line-height:1.1] md:text-5xl max-w-screen-md capitalize font-medium'
                        style={{ }}>We shape powerful brand narratives that connect meaningfully with audiences in every environment.
                    </h4>
                </div>
                <div className="mt-8 md:mt-12">
                    {awards.map((item, index) => {
                        const { name, organization, award, year } = item
                        return <div key={index} className={cn("scrollAnimation relative px-0 py-5 md:py-8 text-[18px] border-b border-white",
                            "transition-all duration-[500ms] ease-in-out ",
                            "hover:text-black md:hover:pl-8",
                            "before:content-[''] before:z-[1] before:absolute before:bg-white before:left-0 before:top-1/2 before:h-full before:w-full before:-translate-y-1/2",
                            "before:scale-y-[0] hover:before:scale-y-[1] ",
                            " before:transition-transform before:duration-[500ms] before:ease-in-out  "
                        )}>
                            <div className="relative z-[5] text-sm sm:text-base gap-y-2 font-normal grid grid-cols-2 sm:grid-cols-4 max-md:justify-items-center ">
                                <h4>{name}</h4>
                                <h4>{organization}</h4>
                                <h4>{award}</h4>
                                <h4>{year}</h4>
                            </div>
                        </div>
                    })}
                </div>
            </section>
        </Container>
    )
}