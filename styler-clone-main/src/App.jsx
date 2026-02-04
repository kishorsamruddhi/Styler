import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from "./user/components/Header";
import Footer from "./user/components/Footer";
import LandingPage from "./user/components/LandingPage";
import About from "./user/components/About";
import Contact from "./user/components/Contact";
import ScrollToTop from "./components/ScrollToTop";

import Privacy from "./user/components/Privacy";
import Terms from "./user/components/Terms";
import BlogPage from "./user/components/BlogPage";
import AllBlogs from "./user/components/AllBlogs";
import Work from "./user/components/Work";
import SmoothScrollWrapper from "./user/components/SmoothScroll";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 2 * 60 * 1000,
//       cacheTime: 2 * 60 * 1000,
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//       refetchOnReconnect: false,
//       retry:2
//     },
//   },
// })


const LandingPageLayout = () => {
  return (
    <SmoothScrollWrapper>
      <Header />
      <div className=" mt-10">
        <Outlet />
      </div>
      <Footer />
    </SmoothScrollWrapper>
  );
};

function App() {
  return (
    // <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Routes>
              {/* User routes with layout */}
              <Route element={<LandingPageLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/blog/:id" element={<BlogPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/allBlogs" element={<AllBlogs />} />
                <Route path="/privacy" element={<Privacy />} />

                <Route path="/work" element={<Work />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
    // </QueryClientProvider>
  );
}

export default App;
