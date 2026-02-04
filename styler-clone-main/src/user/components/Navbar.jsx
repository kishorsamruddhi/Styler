import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="text-[#191919] fixed top-4 left-0 w-full z-50 px-4">
        {/* Desktop pill */}
        {/* Desktop pill */}
        <div className="hidden md:flex items-center justify-center">
          <div className="bg-navbar rounded-full px-8 py-2 shadow-lg backdrop-blur-sm bg-[#E9E9E9E9] w-fit mx-auto">
            <div className="font-inter flex items-center justify-between text-sm space-x-6">
              {/* Left Links */}
              <div className="flex items-center space-x-6">
                <Link
                  to="/about"
                  className="navbar-link text-navbar-text hover:text-navbar-text transition-transform duration-300 hover:-translate-y-1"
                >
                  About
                </Link>
                <button className="navbar-link text-navbar-text flex items-center gap-1 transition-transform duration-300 hover:-translate-y-1">
                  Services
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Logo */}
              <div className="text-logo text-2xl font-bold mx-8">
                <Link to="/">
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
                </Link>
              </div>

              {/* Right Links */}
              <div className="flex items-center space-x-6">
                <button className="navbar-link text-navbar-text flex items-center gap-1 transition-transform duration-300 hover:-translate-y-1">
                  Works
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="navbar-link text-navbar-text transition-transform duration-300 hover:-translate-y-1">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navbar (logo left, menu right) */}
        <div className="flex items-center justify-between md:hidden px-2">
          {/* Logo on left */}
          <div className="text-logo text-2xl font-bold">
            <Link to="/">
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
            </Link>
          </div>

          {/* Hamburger on right */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-navbar-text"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown (full-width below navbar) */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-[#E9E9E9] rounded-2xl shadow-lg backdrop-blur-sm px-6 py-4">
            <div className="flex flex-col space-y-4 text-center">
              <Link
                to="/about"
                className="navbar-link text-navbar-text hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <button className="navbar-link text-navbar-text flex justify-center items-center gap-1">
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="navbar-link text-navbar-text flex justify-center items-center gap-1">
                Works
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                className="navbar-link text-navbar-text"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
