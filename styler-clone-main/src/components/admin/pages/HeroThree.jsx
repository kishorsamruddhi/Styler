import React, { useState, useEffect } from "react";
import "./CardCarousel.css";
import { useAuth } from "../../../context/AuthContext";

export default function HeroThree() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [newCardForm, setNewCardForm] = useState({ title: "", image: null });
  const [showNewCardForm, setShowNewCardForm] = useState(false);

const { isAuthenticated, getHeroThree, createHeroThree, updateHeroThree, deleteHeroThree } =
    useAuth();

  // Fetch cards on mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getHeroThree();
        setCards(response.data.cards || []);
      } catch (err) {
        setError("Failed to fetch cards: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [getHeroThree]);

  // Auto rotate every 3 seconds (only if there are cards)
  useEffect(() => {
    if (cards.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

  // Handle card selection
  const handleSelectCard = (card) => {
    setSelectedCard(card);
    setEditForm({ title: card.title, image: null });
    setImagePreview(card.imageUrl);
    setIsEditing(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value?.trim(),
    }));
  };

  // Handle new card form input changes
  const handleNewCardInputChange = (e) => {
    const { name, value } = e.target;
    setNewCardForm((prev) => ({
      ...prev,
      [name]: value?.trim(),
    }));
  };

  // Handle image upload for editing
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setEditForm((prev) => ({ ...prev, image: file }));
    }
  };

  // Handle new card image upload
  const handleNewCardImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setNewCardForm((prev) => ({ ...prev, image: file }));
    }
  };

  // Save edited card
  const handleSave = async () => {
    if (!selectedCard || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", editForm.title?.trim() || selectedCard.title);

      if (editForm.image instanceof File) {
        formData.append("file", editForm.image);
      }

      await updateHeroThree(selectedCard._id, formData);

      // Refetch cards
      const response = await getHeroThree();
      setCards(response.data.cards || []);

      setIsEditing(false);
    } catch (err) {
      setError("Failed to update card: " + err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete selected card
  const handleDelete = async () => {
    if (!selectedCard || submitting) return;

    if (!window.confirm("Are you sure you want to delete this card?")) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await deleteHeroThree(selectedCard._id);

      // Refetch cards
      const response = await getHeroThree();
      setCards(response.data.cards || []);

      setSelectedCard(null);
      setIsEditing(false);
      setImagePreview(null);
    } catch (err) {
      setError("Failed to delete card: " + err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Create new card
  const handleCreateNewCard = async () => {
    if (!newCardForm.title?.trim() || !newCardForm.image || submitting) {
      setError("Please provide both title and image for the new card");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", newCardForm.title.trim());
      formData.append("file", newCardForm.image);

      await createHeroThree(formData);

      // Refetch cards
      const response = await getHeroThree();
      setCards(response.data.cards || []);

      // Reset form
      setShowNewCardForm(false);
      setNewCardForm({ title: "", image: null });
      setImagePreview(null);
    } catch (err) {
      setError("Failed to create card: " + err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel new card creation
  const handleCancelNewCard = () => {
    setShowNewCardForm(false);
    setNewCardForm({ title: "", image: null });
    setImagePreview(null);
  };

  // Reset form to original values
  const handleCancel = () => {
    if (selectedCard) {
      setEditForm({ title: selectedCard.title, image: null });
      setImagePreview(selectedCard.imageUrl);
    }
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p className="mb-4">Please log in to manage Hero Three cards.</p>
          <button
            onClick={() => window.location.href = "/admin/login"}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading cards...</span>
      </div>
    );
  }

  return (
    <div className="card-management-container p-6">
      <h2 className="text-2xl font-bold mb-6">Card Management System</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Card Management Section */}
      <div className="management-section mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Manage Cards</h3>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowNewCardForm(true)}
          >
            Add New Card
          </button>
        </div>

        {showNewCardForm && (
          <div className="mb-6 p-4 border rounded bg-gray-50">
            <h4 className="font-semibold mb-3">Create New Card</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newCardForm.title}
                  onChange={handleNewCardInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter card title"
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewCardImageUpload}
                  className="w-full p-2 border rounded"
                  disabled={submitting}
                />
              </div>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <h5 className="font-medium mb-2">Preview:</h5>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-xs h-auto rounded border"
                />
              </div>
            )}

            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleCreateNewCard}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create"}
              </button>
              <button
                onClick={handleCancelNewCard}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                disabled={submitting}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="card-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card._id}
              className={`card-item border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedCard?._id === card._id
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "hover:shadow-md"
              }`}
              onClick={() => handleSelectCard(card)}
            >
              <div className="aspect-square mb-3">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300/cccccc/666666?text=Image+Error";
                  }}
                />
              </div>
              <h3 className="font-semibold text-center mb-2">{card.title}</h3>
              <div className="card-actions text-center">
                <button
                  className="edit-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editing Form */}
      {selectedCard && (
        <div className="edit-section mb-8 p-6 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Edit Card</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium mb-1">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleInputChange}
                  disabled={!isEditing || submitting}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium mb-1">
                  Upload Image:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={!isEditing || submitting}
                  className="w-full p-2 border rounded"
                />
              </div>

              {isEditing && (
                <div className="form-actions flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="save-btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    disabled={submitting}
                  >
                    {submitting ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="cancel-btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div>
              {imagePreview && (
                <div className="image-preview">
                  <h4 className="font-medium mb-2">Preview:</h4>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto rounded border"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300/cccccc/666666?text=Preview+Error";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {!isEditing && (
            <div className="mt-4">
              <button
                onClick={handleDelete}
                className="delete-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                disabled={submitting}
              >
                {submitting ? "Deleting..." : "Delete Card"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Preview Section */}
      <div className="preview-section">
        <h3 className="text-xl font-semibold mb-4">Preview Animation</h3>
        <div className="carousel-container relative h-64">
          {cards.length > 0 ? (
            cards.map((card, index) => {
              let position =
                "absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500";

              if (index === current) {
                position += " opacity-100";
              }

              return (
                <div key={card._id} className={position}>
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300/cccccc/666666?text=Image+Error";
                    }}
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                    {card.title}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No cards to display
            </div>
          )}
        </div>

        {/* Navigation dots */}
        {cards.length > 0 && (
          <div className="flex justify-center mt-4 space-x-2">
            {cards.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === current ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
