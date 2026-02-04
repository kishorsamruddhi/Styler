import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaDribbble } from 'react-icons/fa';
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const OurTeam = () => {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const items = gsap.utils.toArray(".fromTop");
    const itemsCards = gsap.utils.toArray(".rotate-card");


    items.forEach((item) => {
      gsap.set(item, { yPercent: -100, },)
    })

    items.forEach((item) => {
      gsap.to(
        item,
        {
          yPercent: 0,
          duration: .5,
          ease: "power2.in",
          scrollTrigger: {
            trigger: item,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    itemsCards.forEach((item) => {
      gsap.fromTo(
        item,
        { rotateX: 90, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: .7,
          ease: "circ.out",
          scrollTrigger: {
            trigger: item,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );
    });

  }, { scope: sectionRef });

  const teamMembers = [
    {
      name: "Jake Davis",
      role: "CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      name: "Chlo Parker",
      role: "Researcher",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
    },
    {
      name: "James Carter",
      role: "Manager",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-12 lg:px-24 bg-white">
      {/* Header Section */}
      <div className=" overflow-hidden text-center mb-12">
        <div className="fromTop">
          <p className="text-sm font-medium uppercase tracking-wide mb-2">
            •  Who We Are
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className=" text-gray-600 max-w-3xl mx-auto">
            Behind every successful project is a dedicated team of experts.
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="flex flex-wrap justify-center "
        style={{
          gridColumnGap: "4.44vw",
          gridRowGap: "60px",
        }}
      >
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="rotate-card group relative rounded-xl h-[250px] md:h-[340px] w-[300px]"
          >
            <div className={cn("absolute bottom-0 left-1/2  w-[calc(100%_-_72px)] flex justify-between gap-2",
              "bg-white/50 -translate-x-1/2  translate-y-1/2 group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100",
              "text-center text-white p-4 rounded-sm")}
              style={{ transition: "all .5s ease-in-out" }}          >
              <FaFacebook size={"32px"} color="#1877F2" />
              <FaLinkedin size={"32px"} color="#0A66C2" />
              <FaInstagram size={"32px"} color="#E4405F" />
              <FaDribbble size={"32px"} color="#EA4C89" />
            </div>
            {/* Profile Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover rounded-3xl"
            />


            {/* Info Overlay */}
            <div className=" mx-9 bg-black -translate-y-1/2 text-center text-white p-2 md:p-4 rounded-3xl">
              <p className="">{member.name}</p>
              <p className="text-sm">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
