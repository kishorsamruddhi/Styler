// src/components/Work/ProjectCard.jsx
import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[#252525] rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            project.color
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={project.iconPath}
            />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">{project.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{project.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className={`${project.bgColor} rounded-xl overflow-hidden`}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {!project.image && (
          <div className="w-full h-48 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;