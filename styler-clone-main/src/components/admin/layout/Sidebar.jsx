import React, { useEffect } from "react";
import {
  BookOpen,
  Star,
  File,
  FileText,
  ShieldCheck,
  ProjectorIcon,
  DollarSign,
  ImageIcon,
  Contact,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { FaBezierCurve, FaQuestion } from "react-icons/fa";
import { HeartIcon } from "@heroicons/react/16/solid";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { logout } = useAuth();

  // Inject custom CSS for hiding scrollbar
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none !important;
      }
      .hide-scrollbar {
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const menuItems = [
    { id: "blogs", label: "Blog Management", icon: BookOpen },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "logo", label: "Logo Management", icon: File },
    { id: "terms", label: "Terms & Conditions", icon: FileText },
    { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    { id: "Project", label: "Project Management", icon: ProjectorIcon },
    { id: "Price", label: "Price", icon: DollarSign },
    { id: "MultiImage", label: "MultiImage", icon: ImageIcon },
    { id: "curveImage", label: "curveImage", icon: FaBezierCurve },
    { id: "Faq", label: "FAQ", icon: FaQuestion },
    { id: "HeroThree", label: "Hero Three", icon: HeartIcon },
    { id: "contacts", label: "Contacts", icon: Contact },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#00353E] text-white w-64 min-h-screen flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#9ACD32] to-emerald-400 bg-clip-text text-transparent">
          divas Pvt CMS
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto hide-scrollbar">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-[#9ACD32] to-emerald-400 text-[#00353E] font-medium shadow-lg"
                      : "hover:bg-gray-700 hover:shadow-md"
                  } group`}
                >
                  <div
                    className={`mr-3 transition-transform duration-300 ${
                      activeSection === item.id
                        ? "text-[#00353E]"
                        : "text-white group-hover:scale-110"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="whitespace-nowrap">{item.label}</span>
                </button> 
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-gray-700 transition-all duration-300 group"
        >
          <div className="mr-3 text-white group-hover:scale-110 transition-transform duration-300">
            <LogOut className="h-5 w-5" />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
