// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import MainLayout from "./components/MainLayout";
import DashboardLayout from "./components/DashboardLayout";
import HomePage from "./pages/HomePage";
import InternshipDetail from "./pages/InternshipDetail";
import InternshipPage from "./pages/InternshipPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import InternshipApplicationFormPage from "./pages/InternshipApplicationFormPage";
import ProtectedRoute from "./components/ProtectedRoute";

import { AppProvider } from "./context/AppContext";
import PreLoader from "./components/common/PreLoader";
import NotificationHandler from "./components/common/NotificationHandler";

import PrivacyPolicy from "./components/policy/PrivacyPolicy";
import ShippingAndDelivery from "./components/policy/ShippingAndDelivery";
import TermsAndConditions from "./components/policy/TermsAndConditions";
import CancellationAndRefund from "./components/policy/CancellationAndRefund";
import ContactUs from "./components/policy/ContactUs";
import Courses from "./pages/Courses";
import Jobs from "./pages/Jobs";
import AboutUs from "./pages/AboutUs";
import VerificationPage from "./pages/VerificationPage";
import VerifyResultPage from "./pages/VerifyResultPage";

/** ScrollToTop component */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

/** Routes configuration */
function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Helmet>
              <title>GT Technovation | Empowering Future Tech Leaders</title>
              <meta
                name="description"
                content="GT Technovation offers curated internships, real-world experience, and innovative technology solutions."
              />
            </Helmet>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path="/internships"
        element={
          <MainLayout>
            <Helmet>
              <title>Internships | GT Technovation</title>
              <meta
                name="description"
                content="Explore curated internships at GT Technovation and gain valuable real-world experience."
              />
            </Helmet>
            <InternshipPage />
          </MainLayout>
        }
      />

      <Route
        path="/internship/:subDomain"
        element={
          <MainLayout>
            <Helmet>
              <title>Internship Details | GT Technovation</title>
              <meta
                name="description"
                content="Detailed information about available internships at GT Technovation."
              />
            </Helmet>
            <InternshipDetail />
          </MainLayout>
        }
      />

      <Route
        path="/apply"
        element={
          <MainLayout>
            <Helmet>
              <title>Apply for Internship | GT Technovation</title>
            </Helmet>
            <InternshipApplicationFormPage />
          </MainLayout>
        }
      />

      <Route
        path="/about-us"
        element={
          <MainLayout>
            <Helmet>
              <title>About Us | GT Technovation</title>
              <meta
                name="description"
                content="Learn more about GT Technovation — our mission, vision, and the people behind our innovation."
              />
            </Helmet>
            <AboutUs />
          </MainLayout>
        }
      />

      <Route
        path="/courses"
        element={
          <MainLayout>
            <Helmet>
              <title>Courses | GT Technovation</title>
              <meta
                name="description"
                content="Discover professional courses designed to boost your skills and tech career."
              />
            </Helmet>
            <Courses />
          </MainLayout>
        }
      />

      <Route
        path="/jobs"
        element={
          <MainLayout>
            <Helmet>
              <title>Jobs | GT Technovation</title>
              <meta
                name="description"
                content="Explore job opportunities with GT Technovation and partner companies."
              />
            </Helmet>
            <Jobs />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <MainLayout>
            <Helmet>
              <title>Login | GT Technovation</title>
              <meta name="robots" content="noindex, noarchive, nosnippet" />
            </Helmet>
            <LoginPage />
          </MainLayout>
        }
      />

      <Route
        path="/privacy-policy"
        element={
          <MainLayout>
            <Helmet>
              <title>Privacy Policy | GT Technovation</title>
            </Helmet>
            <PrivacyPolicy />
          </MainLayout>
        }
      />

      <Route
        path="/shipping-delivery"
        element={
          <MainLayout>
            <Helmet>
              <title>Shipping & Delivery | GT Technovation</title>
            </Helmet>
            <ShippingAndDelivery />
          </MainLayout>
        }
      />

      <Route
        path="/terms-and-conditions"
        element={
          <MainLayout>
            <Helmet>
              <title>Terms & Conditions | GT Technovation</title>
            </Helmet>
            <TermsAndConditions />
          </MainLayout>
        }
      />

      <Route
        path="/refund-policy"
        element={
          <MainLayout>
            <Helmet>
              <title>Cancellation & Refund Policy | GT Technovation</title>
            </Helmet>
            <CancellationAndRefund />
          </MainLayout>
        }
      />

      <Route
        path="/contact-us"
        element={
          <MainLayout>
            <Helmet>
              <title>Contact Us | GT Technovation</title>
            </Helmet>
            <ContactUs />
          </MainLayout>
        }
      />

      <Route
        path="/verify"
        element={
          <MainLayout>
            <Helmet>
              <title>Certificate Verification | GT Technovation</title>
            </Helmet>
            <VerificationPage />
          </MainLayout>
        }
      />

      <Route
        path="/verify/:certificateNumber"
        element={
          <MainLayout>
            <Helmet>
              <title>Verification Result | GT Technovation</title>
            </Helmet>
            <VerifyResultPage />
          </MainLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Helmet>
                <title>Dashboard | GT Technovation</title>
              </Helmet>
              <StudentDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Redirect invalid routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      {/* Scroll to top on route change */}
      <ScrollToTop />
      <NotificationHandler />

      {/* Optional PreLoader (uncomment if you use it) */}
      {/* <PreLoader fullScreen /> */}

      {/* App Routes */}
      <AppRoutes />
    </AppProvider>
  );
}