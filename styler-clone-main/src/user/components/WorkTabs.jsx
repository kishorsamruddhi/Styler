// src/components/Work/WorkTabs.jsx
import React from "react";

const WorkTabs = ({ activeTab, onTabChange }) => {
  const tabs = ["ALL", "AI", "FINTECH", "SAAS", "HEALTHCARE", "ECOMMERCE"];

  return (
    <div className="flex flex-wrap gap-2 p-6 justify-start mt-12">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === tab
              ? "bg-orange-500 text-white"
              : "bg-[#5f635d] text-white hover:bg-[#000]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default WorkTabs;
