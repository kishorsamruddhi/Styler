import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Calendar,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { getProjects } = useAuth();
  const [projects, setProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        const mappedProjects = response?.data?.projects?.map((project) => ({
          id: project.id,
          title: project.title,
          location: project.location,
          year: project.year,
          category: project.category,
          image: project.images?.[0]?.url || "",
          description: project.description,
          highlights: project.highlights || [],
          scope: project.scope,
          value: project.value,
          isFeatured: project.featured,
        }));

        // Filter featured projects
        const featured = mappedProjects.filter((project) => project.isFeatured);

        setProjects(mappedProjects);
        setFeaturedProjects(featured);
        setCurrentSlide(0); // Reset to first slide
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        console.error("Project fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [getProjects]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
    );
  };

  const currentProject = featuredProjects[currentSlide];

  if (loading) {
    return (
      <section
        id="projects"
        className="max-w-7xl mx-auto px-4 py-16 text-center"
      >
        <p>Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="max-w-7xl mx-auto px-4 py-16 text-center"
      >
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  // Don't render featured projects section if there are no featured projects
  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    ></section>
  );
};

export default Projects;
