// src/context/AuthContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

// Create Auth Context
export const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3010/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false); // Prevent re-initialization

  // Set auth token in axios headers
  const setAuthToken = useCallback((token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    // Optional: call API logout if needed, but avoid during init
    // api.post("/admin/logout").catch(() => {});
  }, [setAuthToken]);

  // Response interceptor for 401 handling
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [logout]);

  // Initialize auth state ONCE on app start
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setAuthToken(token);
        try {
          const response = await api.get("/admin/profile");
          setUser(response.data.admin);
        } catch (error) {
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            setAuthToken(null);
          }
          console.error("Auth initialization error:", error);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [setAuthToken]);

  // Login function
  const login = useCallback(
    async (credentials) => {
      try {
        const response = await api.post("/admin/login", credentials);
        const { token, admin } = response.data;

        localStorage.setItem("token", token);
        setAuthToken(token);
        setUser(admin);
        return admin;
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
      }
    },
    [setAuthToken]
  );

  // Contact Management
  const createContact = (contactData) => api.post("/contacts", contactData);
  const getAllContacts = (page = 1, limit = 10, status = "", search = "") =>
    api.get("/contacts", {
      params: {
        page,
        limit,
        ...(status && { status }),
        ...(search && { search }),
      },
    });
  const getContactById = (id) => api.get(`/contacts/${id}`);
  const updateContact = (id, updateData) =>
    api.put(`/contacts/${id}`, updateData);
  const deleteContact = (id) => api.delete(`/contacts/${id}`);
  const addNoteToContact = (id, content) =>
    api.post(`/contacts/${id}/notes`, { content });

  // Admin Profile
  const getAdminProfile = () => api.get("/admin/profile");
  const updateAdminProfile = (profileData) =>
    api.put("/admin/profile", profileData);

  // Terms & Conditions
  const getTerms = () => api.get("/terms");
  const updateTerms = (termsData) => api.post("/terms", termsData);

  // Privacy Policy
  const getPrivacy = () => api.get("/privacy");
  const updatePrivacy = (privacyData) => api.post("/privacy", privacyData);

  // Blog Management
  const getBlogs = (page = 1, limit = 10) =>
    api.get(`/blogs?page=${page}&limit=${limit}`);
  const getBlogById = (id) => api.get(`/blogs/${id}`);
  const getBlogBySlug = (slug) => api.get(`/blogs/slug/${slug}`);
  const createBlog = (blogData) =>
    api.post("/blogs", blogData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const updateBlog = (id, blogData) =>
    api.put(`/blogs/${id}`, blogData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const deleteBlog = (id) => api.delete(`/blogs/${id}`);

  // Reviews Management
  const getReviews = (page = 1, limit = 10) =>
    api.get(`/reviews?page=${page}&limit=${limit}`);
  const getReviewStats = () => api.get("/reviews/stats");
  const getReviewById = (id) => api.get(`/reviews/${id}`);
  const createReview = (reviewData) =>
    api.post("/reviews", reviewData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const updateReview = (id, reviewData) =>
    api.put(`/reviews/${id}`, reviewData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const deleteReview = (id) => api.delete(`/reviews/${id}`);

  // Logo Management
  const createLogo = (logoData) =>
    api.post("/logo", logoData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const updateLogo = (id, logoData) =>
    api.put(`/logo/${id}`, logoData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  const getLogoById = (id) => api.get(`/logo/${id}`);
  const getLogos = () => api.get("/logo");
  const deleteLogo = (id) => api.delete(`/logo/${id}`);

  // Project Management
  const getProjects = () => api.get("/project");
  const getProjectById = (id) => api.get(`/project/${id}`);

  // System Health
  const checkHealth = () => api.get("/health");

  // Prices Management
  const getPrices = () => api.get("/prices");
  const getPriceById = (id) => api.get(`/prices/${id}`);
  const createPrice = (priceData) => api.post("/prices", priceData);
  const updatePrice = (id, priceData) => api.put(`/prices/${id}`, priceData);
  const deletePrice = (id) => api.delete(`/prices/${id}`);
  const togglePriceStatus = (id) => api.patch(`/prices/${id}/toggle`);

  // FAQs Management
  const getFaqs = () => api.get("/faqs");
  const getFaqById = (id) => api.get(`/faqs/${id}`);
  const createFaq = (faqData) => api.post("/faqs", faqData);
  const updateFaq = (id, faqData) => api.put(`/faqs/${id}`, faqData);
  const deleteFaq = (id) => api.delete(`/faqs/${id}`);

  // Multi Images Management
  const getMultiImages = () => api.get("/multi-images");
  const getMultiImageById = (id) => api.get(`/multi-images/${id}`);
  const createMultiImage = (imageData) => api.post("/multi-images", imageData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const updateMultiImage = (id, imageData) => api.put(`/multi-images/${id}`, imageData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const deleteMultiImage = (id) => api.delete(`/multi-images/${id}`);

  // Curve Images Management
  const getCurveImages = () => api.get("/curve-images");
  const getCurveImageById = (id) => api.get(`/curve-images/${id}`);
  const createCurveImage = (imageData) => api.post("/curve-images", imageData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const updateCurveImage = (id, imageData) => api.put(`/curve-images/${id}`, imageData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const deleteCurveImage = (id) => api.delete(`/curve-images/${id}`);

  // Hero Three Management
  const getHeroThree = () => api.get("/hero-three");
  const getHeroThreeById = (id) => api.get(`/hero-three/${id}`);
  const createHeroThree = (cardData) => api.post("/hero-three", cardData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const updateHeroThree = (id, cardData) => api.put(`/hero-three/${id}`, cardData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const deleteHeroThree = (id) => api.delete(`/hero-three/${id}`);

  // Memoized context value
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
      isAuthenticated: !!user,
      // Contact API
      createContact,
      getAllContacts,
      getContactById,
      updateContact,
      deleteContact,
      addNoteToContact,
      // Admin Profile
      getAdminProfile,
      updateAdminProfile,
      // Legal
      getTerms,
      updateTerms,
      getPrivacy,
      updatePrivacy,
      // Blogs
      getBlogs,
      getBlogById,
      getBlogBySlug,
      createBlog,
      updateBlog,
      deleteBlog,
      // Reviews
      getReviews,
      getReviewStats,
      getReviewById,
      createReview,
      updateReview,
      deleteReview,
      // Logo
      createLogo,
      updateLogo,
      getLogoById,
      getLogos,
      deleteLogo,
  // Projects
  getProjects,
  getProjectById,
  // Prices
  getPrices,
  getPriceById,
  createPrice,
  updatePrice,
  deletePrice,
  togglePriceStatus,
  // FAQs
  getFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
  // Multi Images
  getMultiImages,
  getMultiImageById,
  createMultiImage,
  updateMultiImage,
  deleteMultiImage,
  // Curve Images
  getCurveImages,
  getCurveImageById,
  createCurveImage,
  updateCurveImage,
  deleteCurveImage,
  // Hero Three
  getHeroThree,
  getHeroThreeById,
  createHeroThree,
  updateHeroThree,
  deleteHeroThree,
  // Health
  checkHealth,
  // Raw API instance
  api,
    }),
    [user, login, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
