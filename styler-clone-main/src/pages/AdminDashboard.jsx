import React, { useState } from "react";
import Sidebar from "../components/admin/layout/Sidebar";
import Topbar from "../components/admin/layout/Topbar";
import Dashboard from "../components/admin/pages/Dashboard";
import ReviewManagement from "../components/admin/pages/ReviewManagement";
import PrivacyManagement from "../components/admin/pages/PrivacyManagement";
import TermsManagement from "../components/admin/pages/TermsManagement";
import LogoManagement from "../components/admin/pages/LogoManagement";
import BlogManagement from "../components/admin/pages/BlogManagement";
import ProjectManagement from "../components/admin/pages/ProjectManagement";
import CurveImageManagement from "../components/admin/pages/CurveImageManagement";
import Contacts from "../components/admin/pages/Contacts";
import PriceManagement from "../components/admin/pages/priceManagement";
import MultiImgManagement from "../components/admin/pages/MultiImgManagement";
import FaqManagement from "../components/admin/pages/faqManagement";
import HeroThree from "../components/admin/pages/HeroThree";
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <BlogManagement />;

      case "logo":
        return <LogoManagement />;
      case "reviews":
        return <ReviewManagement />;
      case "terms":
        return <TermsManagement />;
      case "privacy":
        return <PrivacyManagement />;
      case "blogs":
        return <BlogManagement />;

      case "Project":
        return <ProjectManagement />;
      case "contacts":
        return <Contacts />;
      case "Price":
        return <PriceManagement />;
      case "MultiImage":
        return (
          <div>
            {" "}
            <MultiImgManagement />
          </div>
        );
      case "HeroThree":
        return (
          <div>
            <HeroThree />
          </div>
        );

      case " curveImage":
        return (
          <div>
            <CurveImageManagement />
          </div>
        );
      case "Faq":
        return <FaqManagement />;
      default:
        return <BlogManagement />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
