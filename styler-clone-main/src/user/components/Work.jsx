// src/pages/Work.jsx
import React, { useState, useEffect } from "react";
import WorkTabs from "./WorkTabs";
import ProjectCard from "./ProjectCard";
import Testimonial from "./Testimonial";
import PricingPlan from "./PricingPlan";
import FAQ from "./FAQ";
import { useAuth } from "../../context/AuthContext";
const Work = () => {
  const { getProjects } = useAuth();
  const [activeTab, setActiveTab] = useState("ALL");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response.data.success) {
          setProjects(response.data.projects || []);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [getProjects]);

  // Map backend "type" to frontend tab logic
  const getProjectTags = (project) => {
    const tags = [project.category];
    if (project.type) tags.push(project.type);
    return tags;
  };

  // Filter projects based on active tab
  const filteredProjects =
    activeTab === "ALL"
      ? projects
      : projects.filter((project) =>
          getProjectTags(project).some((tag) =>
            tag?.toUpperCase().includes(activeTab)
          )
        );

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <WorkTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No projects available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={{
                id: project._id,
                title: project.title,
                description: project.description,
                tags: getProjectTags(project),
                image: project.images?.[0]?.url || "",
                // Optional: map type to color if needed
                color: "bg-blue-500",
                bgColor: "bg-blue-500",
                iconPath:
                  "M9.663 17h4.673M12 3v1m6.364 1.664-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.707-.707M15 10a4 4 0 00-8 0v6a4 4 0 008 0v-6z",
              }}
            />
          ))}
        </div>
      )}

      <Testimonial />
      <PricingPlan />
      <FAQ />
    </div>
  );
};

export default Work;
