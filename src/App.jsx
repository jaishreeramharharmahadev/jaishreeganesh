// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

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

/** ScrollToTop component */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/internships"
        element={
          <MainLayout>
            <InternshipPage />
          </MainLayout>
        }
      />
      <Route
        path="/about-us"
        element={
          <MainLayout>
            <AboutUs />
          </MainLayout>
        }
      />
      <Route
        path="/courses"
        element={
          <MainLayout>
            <Courses />
          </MainLayout>
        }
      />
      <Route
        path="/jobs"
        element={
          <MainLayout>
            <Jobs />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        }
      />
      <Route
        path="/internship/:subDomain"
        element={
          <MainLayout>
            <InternshipDetail />
          </MainLayout>
        }
      />
      <Route
        path="/apply"
        element={
          <MainLayout>
            <InternshipApplicationFormPage />
          </MainLayout>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <MainLayout>
            <PrivacyPolicy />
          </MainLayout>
        }
      />
      <Route
        path="/shipping-delivery"
        element={
          <MainLayout>
            <ShippingAndDelivery />
          </MainLayout>
        }
      />
      <Route
        path="/terms-and-conditions"
        element={
          <MainLayout>
            <TermsAndConditions />
          </MainLayout>
        }
      />
      <Route
        path="/refund-policy"
        element={
          <MainLayout>
            <CancellationAndRefund />
          </MainLayout>
        }
      />
      <Route
        path="/contact-us"
        element={
          <MainLayout>
            <ContactUs />
          </MainLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <StudentDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {

  // while hydrating show PreLoader to avoid route flicker / ProtectedRoute races
  // if (!hydrated) {
  //   return <PreLoader fullScreen />; // ensure PreLoader supports fullScreen prop, otherwise render a simple loader
  // }

  return (
    <AppProvider>
      {/* Scroll to top on route change */}
      <ScrollToTop />
      <NotificationHandler />

      {/* App routes */}
      <AppRoutes />
    </AppProvider>
  );
}