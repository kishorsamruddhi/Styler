import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useAuth } from "../../../context/AuthContext";

// Placeholder images for missing ones
const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/280x280?text=Image+Not+Found";

const MultiImgManagement = () => {
  const {
    isAuthenticated,
    getMultiImages,
    createMultiImage,
    updateMultiImage,
    deleteMultiImage,
  } = useAuth();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState({ title: "" });
  const [newForm, setNewForm] = useState({ title: "" });
  const [editFile, setEditFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMultiImages();
      console.log("Fetched images:", response?.data.images);
      setImages(response.data.images || []);
    } catch (err) {
      setError("Failed to fetch images: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => fetchImages();

  useEffect(() => {
    if (isAuthenticated) {
      fetchImages();
    }
  }, [isAuthenticated]);

  // Split into two rows (5 each), fill with null if not enough
  const row1Images = [...Array(5)].map((_, i) => images[i] || null);
  const row2Images = [...Array(5)].map((_, i) => images[i + 5] || null);

  // Render image row with optional placeholder
  const renderImageRow = (imagesList, direction) => {
    return (
      <React.Fragment>
        {imagesList.map((img, index) => {
          const keyId = img ? img._id : `placeholder-${direction}-${index}`;
          return (
            <div
              key={`${direction}-${keyId}`}
              className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0 cursor-pointer ${
                selectedImage?._id === img?._id ? "ring-4 ring-blue-500" : ""
              }`}
              style={{ width: "280px", height: "280px" }}
              onClick={() => img && handleSelectImage(img)}
            >
              <img
                src={img?.imageUrl || PLACEHOLDER_IMAGE}
                alt={img?.title || "Missing Image"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = PLACEHOLDER_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  // Initialize GSAP infinite scroll animations
  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    // Clean up any existing timelines
    if (window.row1Timeline) window.row1Timeline.kill();
    if (window.row2Timeline) window.row2Timeline.kill();

    // Calculate half-width for smooth looping
    const row1Width = row1Ref.current.scrollWidth / 2;
    const row2Width = row2Ref.current.scrollWidth / 2;

    // Row 1: Scroll Left (infinite)
    const t1 = gsap.timeline({ repeat: -1 });
    t1.to(row1Ref.current, {
      x: -row1Width,
      duration: 35,
      ease: "none",
    });

    // Row 2: Start off-screen right, move to center (scrolls right → left visually)
    const t2 = gsap.timeline({ repeat: -1 });
    t2.fromTo(
      row2Ref.current,
      { x: -row2Width },
      { x: 0, duration: 40, ease: "none" }
    );

    // Save references to kill on unmount or update
    window.row1Timeline = t1;
    window.row2Timeline = t2;

    return () => {
      t1.kill();
      t2.kill();
    };
  }, [images]); // Re-run whenever images change

  const handleSelectImage = (img) => {
    setSelectedImage(img);
    setEditForm({ title: img.title });
    setImagePreview(img.imageUrl);
    setIsEditing(false);
    setEditFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setEditFile(file);
    }
  };

  const handleNewImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setNewImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setNewFile(file);
    }
  };

  const handleSave = async () => {
    if (!selectedImage || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", editForm.title || selectedImage.title);
      if (editFile instanceof File) {
        formData.append("file", editFile);
      }

      await updateMultiImage(selectedImage._id, formData);
      await fetchImages(); // Refresh list
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update image: " + err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedImage || submitting) return;

    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setSubmitting(true);
    setError(null);

    try {
      await deleteMultiImage(selectedImage._id);
      await fetchImages();
      setSelectedImage(null);
      setImagePreview(null);
      setEditFile(null);
    } catch (err) {
      setError("Failed to delete image: " + err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdd = async () => {
    if (!newForm.title?.trim() || !newFile || submitting) {
      setError("Please provide both title and image for the new image");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", newForm.title.trim());
      formData.append("file", newFile);

      await createMultiImage(formData);
      await fetchImages();

      setIsAdding(false);
      setNewForm({ title: "" });
      setNewFile(null);
      setNewImagePreview(null);
    } catch (err) {
      setError("Failed to create image: " + err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (selectedImage) {
      setEditForm({ title: selectedImage.title });
      setImagePreview(selectedImage.imageUrl);
    }
    setIsEditing(false);
    setEditFile(null);
  };

  const handleNewCancel = () => {
    setIsAdding(false);
    setNewForm({ title: "" });
    setNewFile(null);
    setNewImagePreview(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Authentication Required
          </h2>
          <p className="mb-4">Please log in to manage multi images.</p>
          <button
            onClick={() => (window.location.href = "/admin/login")}
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
        <span className="ml-2">Loading images...</span>
      </div>
    );
  }

  return (
    <div className="pb-10 bg-background overflow-hidden flex flex-col justify-center">
      <div className="space-y-6">
        {/* Management Section */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Image Management</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Grid */}
            <div>
              <h3 className="font-semibold mb-2">All Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.length > 0 ? (
                  images.map((img) => (
                    <div
                      key={img._id}
                      className={`p-2 rounded-lg cursor-pointer border-2 ${
                        selectedImage?._id === img._id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => handleSelectImage(img)}
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-24 object-cover rounded-md"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/100x100?text=Err")
                        }
                      />
                      <p className="text-xs mt-1 truncate">{img.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">
                    No images found.
                  </p>
                )}
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                onClick={() => setIsAdding(true)}
                disabled={submitting}
              >
                Add New Image
              </button>
            </div>

            {/* Create New Modal */}
            {isAdding && (
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-4">Create New Image</h3>

                <div className="form-group mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newForm.title}
                    onChange={handleNewInputChange}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter title"
                    disabled={submitting}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Image:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewImageUpload}
                    className="w-full p-2 border rounded-md"
                    disabled={submitting}
                  />
                  {newImagePreview && (
                    <div className="mt-2">
                      <h5 className="font-medium mb-1">Preview:</h5>
                      <img
                        src={newImagePreview}
                        alt="Preview"
                        className="max-w-xs h-auto rounded border"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleNewCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                    disabled={submitting}
                  >
                    {submitting ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>
            )}

            {/* Edit Form */}
            {selectedImage && (
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-3">Edit Image</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="form-group mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Title:
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleInputChange}
                        disabled={!isEditing || submitting}
                        className="w-full p-2 border rounded-md"
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
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                          disabled={submitting}
                        >
                          {submitting ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                          disabled={submitting}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    {imagePreview && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Preview:</h4>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full h-auto rounded border"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300?text=Preview+Error";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {!isEditing && (
                  <div className="mt-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                      disabled={submitting}
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                      disabled={submitting}
                    >
                      {submitting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Infinite Scrolling Rows */}
        {/* Row 1: Scrolls Left */}
        <div className="overflow-hidden py-2">
          <div ref={row1Ref} className="flex gap-6">
            {renderImageRow(row1Images, "row1")}
            {renderImageRow(row1Images, "row1-dup")} {/* Duplicate for loop */}
          </div>
        </div>

        {/* Row 2: Scrolls Right (moves from right to left) */}
        <div className="overflow-hidden py-2">
          <div ref={row2Ref} className="flex gap-6">
            {renderImageRow(row2Images, "row2-dup")} {/* Duplicate first */}
            {renderImageRow(row2Images, "row2")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiImgManagement;
