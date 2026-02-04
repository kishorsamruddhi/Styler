import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Define categories (must match backend values)
const CATEGORIES = [
  "All",
  "Design",
  "SaaS product",
  "Web design & Dev",
  "Product design",
  "AI & LLMs",
  "Branding & Strategy",
];

const AllBlogs = () => {
  const { getBlogs } = useAuth();
  const [allBlogs, setAllBlogs] = useState([]); // Store all blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs(1, 100);
        if (response.data?.success) {
          const formatted = response.data.blogs.map((blog) => ({
            id: blog._id,
            title: blog.title,
            excerpt: blog.excerpt,
            image: blog.image,
            category: blog.category || "Uncategorized",
            publishedAt: blog.publishedAt
              ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A",
          }));
          setAllBlogs(formatted);
          setFilteredBlogs(formatted); // Initially show all
        } else {
          setError("Failed to load blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Error loading blog content");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [getBlogs]);

  // Filter blogs when activeCategory changes
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredBlogs(allBlogs);
    } else {
      const filtered = allBlogs.filter(
        (blog) => blog.category?.toLowerCase() === activeCategory.toLowerCase()
      );
      setFilteredBlogs(filtered);
    }
  }, [activeCategory, allBlogs]);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ECC97] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-500 mb-4">⚠️ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#2ECC97] text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">All</h1>
          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-[#2ECC97] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No blogs found in{" "}
              <span className="font-semibold">{activeCategory}</span> category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="block bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 p-6">
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                    {blog.category}
                  </span>
                </div>

                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-2">
                    {blog.publishedAt}
                  </div>
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {blog.excerpt || "No excerpt available."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
