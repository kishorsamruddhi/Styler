import { Fragment, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import threeBags from "../../assets/6899f66ced2610f6911fafcf_Glossy_20Tote_20Bags_20on_20Vibrant_20Background.jpg"
import toyCar from "../../assets/6899f669754b169a3dbd5c7f_Mini_20Car_20Flower_20Vase.jpg"
import controller from "../../assets/6899f66a260387e191729798_Modern_20Gaming_20Controller.jpg"
import { cn } from "@/lib/utils";

const servicesData = [
  {
    title: "Web Development",
    description: "Custom websites & apps",
    image: threeBags
  },
  {
    title: "Mobile Apps",
    description: "iOS & Android solutions",
    image: toyCar
  },
  {
    title: "UI/UX Design",
    description: "Modern & user-friendly designs",
    image: controller
  },
];

export default function Header() {
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timerRef = useRef(null)
  const dropDownRef = useRef(null)

  const handleMouseEnter = (dropdown) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setHoveredDropdown(dropdown);
    requestAnimationFrame(() =>
      dropDownRef.current.style.transform = "translateY(0%)"
    )
  };

  const handleMouseLeave = (e) => {
    if (dropDownRef.current) {
      requestAnimationFrame(() =>
        dropDownRef.current.style.transform = "translateY(-100%)"
      )
    }
    timerRef.current = setTimeout(() =>
      setHoveredDropdown(null), 900)
  };

  function toggleMenu() {
    setMobileMenuOpen(prev => !prev)
  }

  return (
    <Fragment>
      <div className="hidden sm:block">
        <nav className="text-[#191919] fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-navbar rounded-full px-6 py-2 shadow-lg backdrop-blur-sm bg-[#E9E9E9E9] ">
            {/* Updated flex container with gap for even spacing */}
            <div className="font-inter flex items-center justify-center min-w-[350px] text-sm gap-8 whitespace-nowrap">
              {/* Left Section */}
              <div className="flex items-center space-x-6">
                <LinkItem label={"About"} link={"/about"} />
                <LinkItem label={"Home"} link={"/home"} />
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("services")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="navbar-link text-navbar-text flex items-center gap-1 transition-transform duration-300 hover:-translate-y-1">
                    Services
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  </button>
                </div>
              </div>

              {/* Centered Logo */}
              <Logo />

              {/* Right Section */}
              <div className="flex items-center space-x-6">
                <LinkItem label={"Works"} link={"/Work"} />
                <LinkItem label={"All Blogs"} link={"/allBlogs"} />
                <LinkItem label={"Contact"} link={"/contact"} />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden px-2 py-2 fixed top-0 left-0 w-full z-10  shadow-lg backdrop-blur-md bg-[#e9e9e98c]">
        <div className="flex items-center justify-between sm:hidden px-2">
          {/* Logo on left */}
          <Logo />
          {/* Hamburger on right */}
          <button
            onClick={toggleMenu}
            className="text-navbar-text"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Dropdown (full-width below navbar) */}
      {mobileMenuOpen && (
        <div className=" fixed w-full top-[46px] bg-[#e9e9e964] z-10 shadow-lg backdrop-blur-md px-6 py-4">
          <div className="flex flex-col gap-y-4 text-center justify-center items-center">
            <Link
              to="/about"
              className=" hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >  About</Link>
            <button className="hover:underline flex justify-center items-center gap-1">
              Services
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="hover:underline flex justify-center items-center gap-1">
              Works
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="hover:underline">Contact</button>
          </div>
        </div>
      )}

      {/* Full-width Dropdown */}
      <div id="serviceMenu"
        ref={dropDownRef}
        className={cn("fixed inset-x-0 top-0 z-40 bg-white shadow-xl  -translate-y-full transition-all duration-300 ease-in-out",
          hoveredDropdown
            ? " opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onMouseEnter={() =>
          hoveredDropdown && handleMouseEnter(hoveredDropdown)
        }
        onMouseLeave={handleMouseLeave}
      >
        {hoveredDropdown && (
          <div className="pt-24 pb-12 px-4 sm:px-8 ">
            <div className="max-w-6xl mx-auto">
              <div
                className={`grid gap-6 ${hoveredDropdown === "services"
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
                  }`}
              >
                {(hoveredDropdown === "services"
                  ? servicesData
                  : worksData
                ).map((item, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-card-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

function Logo() {
  return (<Link to="/" className="text-logo text-2xl font-bold flex-shrink-0">
    <svg
      width="25"
      height="30"
      viewBox="0 0 77 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56.3965 10H24.3965V0H56.3965C67.4422 0 76.3965 8.9543 76.3965 20V52H66.3965V20C66.3965 14.4772 61.9193 10 56.3965 10Z"
        fill="#FD291C"
      />
      <path
        d="M20.3965 66H52.3965V76H20.3965C9.35079 76 0.396483 67.0457 0.396484 56L0.396486 24H10.3965L10.3965 56C10.3965 61.5228 14.8736 66 20.3965 66Z"
        fill="#FD291C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.3965 38C58.3965 49.0457 49.4422 58 38.3965 58C27.3508 58 18.3965 49.0457 18.3965 38C18.3965 26.9543 27.3508 18 38.3965 18C49.4422 18 58.3965 26.9543 58.3965 38ZM48.3965 38C48.3965 43.5229 43.9193 48 38.3965 48C32.8736 48 28.3965 43.5229 28.3965 38C28.3965 32.4772 32.8736 28 38.3965 28C43.9193 28 48.3965 32.4772 48.3965 38Z"
        fill="#FD291C"
      />
    </svg>
  </Link>)
}

function LinkItem({ link, label }) {
  return <Link
    to={link}
    className="group relative overflow-hidden transition-transform duration-200"
  >
    <span className="block transition-transform duration-200 group-hover:-translate-y-full">{label}</span>
    <span className="abs-center w-full h-full block transition-transform duration-150 -translate-x-1/2 translate-y-full group-hover:-translate-y-1/2">{label}</span>
  </Link>
}