import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

const FaqManagement = () => {
  const { getFaqs, createFaq, updateFaq, deleteFaq } = useAuth();

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch FAQs on mount
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getFaqs();
        setFaqs(response.data.data || []);
      } catch (err) {
        setError("Failed to fetch FAQs");
        showNotification("Failed to fetch FAQs", "error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [getFaqs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const submitData = {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
      };

      if (editingId) {
        await updateFaq(editingId, submitData);
        showNotification("FAQ updated successfully!");
      } else {
        await createFaq(submitData);
        showNotification("New FAQ added successfully!");
      }

      // Refetch FAQs
      const response = await getFaqs();
      setFaqs(response.data.data || []);

      setFormData({ question: "", answer: "" });
      setIsFormOpen(false);
    } catch (err) {
      showNotification("Failed to save FAQ", "error");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (faq) => {
    setFormData({ question: faq.question, answer: faq.answer });
    setEditingId(faq._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      await deleteFaq(id);
      showNotification("FAQ deleted successfully!");

      // Refetch FAQs
      const response = await getFaqs();
      setFaqs(response.data.data || []);
    } catch (err) {
      showNotification("Failed to delete FAQ", "error");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setFormData({ question: "", answer: "" });
    setEditingId(null);
    setIsFormOpen(false);
  };

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-6">Loading FAQs...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            notification.type === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
        <p className="text-gray-600 mt-2">
          Manage your frequently asked questions
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          onClick={() => {
            setFormData({ question: "", answer: "" });
            setEditingId(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New FAQ
        </button>
      </div>

      {/* Form for Add/Edit */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200 animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editingId ? "Edit FAQ" : "Add New FAQ"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question *
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Enter your question..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer *
              </label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                placeholder="Provide a detailed answer..."
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {submitting ? "Saving..." : (editingId ? "Update FAQ" : "Add FAQ")}
            </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-7">{faq.answer}</p>
                </div>
                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors flex items-center gap-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors flex items-center gap-1"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No FAQs found" : "No FAQs yet"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding your first FAQ"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Your First FAQ
              </button>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      {faqs.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-sm">
            Showing {filteredFaqs.length} of {faqs.length} FAQs
          </p>
        </div>
      )}
    </div>
  );
};

export default FaqManagement;
