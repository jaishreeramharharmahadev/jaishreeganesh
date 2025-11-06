import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle,
  FileText,
  Home,
  Laptop,
  Lock,
  LogOut,
  Menu,
  User,
  Award,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  FileCode,
} from "lucide-react";
import logo from "../assets/GTTechno.png";
import OverviewContent from "../components/StudentDashboard/OverviewContent";
import ProgressContent from "../components/StudentDashboard/ProgressContent";
import ProjectsContent from "../components/StudentDashboard/ProjectsContent";
import CertificateContent from "../components/StudentDashboard/CertificateContent";
import ProfileContent from "../components/StudentDashboard/ProfileContent";
import WeekContent from "../components/StudentDashboard/WeekContent";
import { apiUrl } from "../utils/api";

export default function StudentDashboard() {
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeWeek, setActiveWeek] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [projectUploading, setProjectUploading] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [certificateLoading, setCertificateLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const API = "http://localhost:5000";

  useEffect(() => {
    fetchMe();
  }, []);

  async function fetchMe() {
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.get(apiUrl(`/applicants/me`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplicant(res.data);
    } catch (err) {
      console.error("fetchMe error", err);
      setError(err?.response?.data?.message || "Failed to fetch dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function openWeek(weekNumber) {
    setWeekData(null);
    setActiveWeek(weekNumber);
    setActiveNav("week-content");
    setError("");
    try {
      const res = await axios.get(apiUrl(`/applicants/week/${weekNumber}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWeekData(res.data.week);
      await fetchMe();
    } catch (err) {
      console.error("openWeek error", err);
      setError(err?.response?.data?.message || "Failed to open week");
      if (err?.response?.status === 403 && err.response.data.unlockAt) {
        setWeekData({ locked: true, unlockDate: err.response.data.unlockAt });
      }
    }
  }

  async function markComplete(weekNumber) {
    try {
      await axios.post(
        apiUrl(`/applicants/complete-week`),
        { weekNumber },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchMe();
    } catch (err) {
      console.error("markComplete error", err);
      alert(err?.response?.data?.message || "Failed to mark complete");
    }
  }

  async function uploadAssignment(e, weekNumber) {
    e.preventDefault();
    const fileInput = e.target.elements.file;
    const remarks = e.target.elements.remarks?.value || "";
    const consent = e.target.elements.consent?.checked || false;

    if (!fileInput || fileInput.files.length === 0) {
      alert("Please choose a file to upload.");
      return;
    }

    const file = fileInput.files[0];
    const form = new FormData();
    form.append("file", file);
    form.append("remarks", remarks);
    form.append("consent", consent ? "true" : "false");

    setUploading(true);
    try {
      await axios.post(apiUrl(`/applicants/assignment/${weekNumber}`), form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      await openWeek(weekNumber);
      await fetchMe();
    } catch (err) {
      console.error("uploadAssignment error", err);
      alert(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.reset();
    }
  }

  async function submitProject(e) {
    e.preventDefault();
    const projectName = e.target.elements.projectName?.value;
    if (!projectName) {
      alert("Project name required");
      return;
    }

    const form = new FormData();
    form.append("projectName", projectName);
    form.append(
      "projectDescription",
      e.target.elements.projectDescription?.value || ""
    );
    form.append("liveLink", e.target.elements.liveLink?.value || "");
    form.append("githubLink", e.target.elements.githubLink?.value || "");
    form.append("linkedinLink", e.target.elements.linkedinLink?.value || "");
    form.append(
      "consentAccuracy",
      e.target.elements.consentAccuracy?.checked ? "true" : "false"
    );
    form.append(
      "consentTerms",
      e.target.elements.consentTerms?.checked ? "true" : "false"
    );

    const pdf = e.target.elements.reportPdf?.files?.[0];
    if (pdf) form.append("reportPdf", pdf);

    setProjectUploading(true);
    try {
      await axios.post(apiUrl(`/applicants/project`), form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchMe();
      e.target.reset();
    } catch (err) {
      console.error("submitProject error", err);
      alert(err?.response?.data?.message || "Project submission failed");
    } finally {
      setProjectUploading(false);
    }
  }

  async function downloadCertificate(uniqueId) {
    if (!isCertificateAvailable()) {
      alert("Certificate will be available after your internship end date.");
      return;
    }

    setCertificateLoading(true);
    try {
      const res = await axios.get(
        apiUrl(`/certificates/download/${encodeURIComponent(uniqueId)}`),
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificate_${uniqueId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("downloadCertificate error", err);
      alert(err?.response?.data?.message || "Download failed");
    } finally {
      setCertificateLoading(false);
    }
  }

  async function manualGenerateCertificate(uniqueId) {
    if (!applicant || !applicant.uniqueId) return;
    try {
      const res = await axios.post(
        apiUrl(`/certificates/generate/${uniqueId}`),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message || "Certificate generated");
      await fetchMe();
    } catch (err) {
      console.error("manualGenerateCertificate error", err);
      alert(err?.response?.data?.message || "Failed to generate certificate");
    }
  }

  async function fetchMe() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(apiUrl(`/applicants/me`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplicant(res.data);
    } catch (err) {
      console.error("fetchMe error", err);
      setError(err?.response?.data?.message || "Failed to fetch dashboard");
    } finally {
      setLoading(false);
    }
  }

  // Make fetchMe available globally for the FeedbackSection callback
  useEffect(() => {
    window.fetchMe = fetchMe;
    return () => {
      delete window.fetchMe;
    };
  }, []);

  async function verifyCertificate(certNumber) {
    setVerifyResult(null);
    try {
      const res = await axios.get(
        apiUrl(`/certificates/verify/${encodeURIComponent(certNumber)}`)
      );
      setVerifyResult({ ok: true, data: res.data });
    } catch (err) {
      setVerifyResult({
        ok: false,
        message: err?.response?.data?.message || "Certificate not found",
      });
    }
  }

  // Add this function inside your StudentDashboard component, after the state declarations
const getSubmittedAssignmentsCount = () => {
  if (!applicant?.learningPath) return 0;
  
  let totalSubmissions = 0;
  applicant.learningPath.forEach(week => {
    if (week.assignmentSubmissions && week.assignmentSubmissions.length > 0) {
      totalSubmissions += week.assignmentSubmissions.length;
    }
  });
  return totalSubmissions;
};

const getWeeksWithSubmissions = () => {
  if (!applicant?.learningPath) return 0;
  
  return applicant.learningPath.filter(week => 
    week.assignmentSubmissions && week.assignmentSubmissions.length > 0
  ).length;
};

  const isCertificateAvailable = () => {
    if (!applicant?.endDate) return false;
    const endDate = new Date(applicant.endDate);
    const today = new Date();
    return today >= endDate;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !applicant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              {error ? "Error Loading Dashboard" : "No Data Available"}
            </h3>
            <p className="text-red-600 mb-4">
              {error || "Unable to load applicant data"}
            </p>
            <button
              onClick={fetchMe}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { learningPath = [] } = applicant;
  const totalWeeks = learningPath.length || 1;
  const completedWeeks = learningPath.filter((w) => w.completed).length;
  const progressPercent = Math.round((completedWeeks / totalWeeks) * 100);

  const mainNavigation = [
    { id: "overview", name: "Overview", icon: Home },
    { id: "progress", name: "Progress", icon: BarChart3 },
    { id: "projects", name: "Projects", icon: FileCode },
    { id: "certificate", name: "Certificate", icon: Award },
    { id: "profile", name: "Profile", icon: User },
  ];

  const renderContent = () => {
    switch (activeNav) {
      case "overview":
  return (
    <OverviewContent
      applicant={applicant}
      progressPercent={progressPercent}
      submittedAssignmentsCount={getSubmittedAssignmentsCount()}
      weeksWithSubmissions={getWeeksWithSubmissions()}
      onWeekNavigate={openWeek} // Add this line
    />
  );
      case "progress":
  return (
    <ProgressContent
      applicant={applicant}
      progressPercent={progressPercent}
      submittedAssignmentsCount={getSubmittedAssignmentsCount()}
      weeksWithSubmissions={getWeeksWithSubmissions()}
      onWeekNavigate={openWeek} // Add this line
    />
  );
      case "projects":
        return (
          <ProjectsContent
            applicant={applicant}
            submitProject={submitProject}
            projectUploading={projectUploading}
          />
        );
      case "certificate":
        return (
          <CertificateContent
            applicant={applicant}
            verifyCertificate={verifyCertificate}
            verifyResult={verifyResult}
            downloadCertificate={downloadCertificate}
            manualGenerateCertificate={manualGenerateCertificate}
            certificateLoading={certificateLoading}
            isCertificateAvailable={isCertificateAvailable}
          />
        );
      case "profile":
        return <ProfileContent applicant={applicant} />;
      case "week-content":
        return (
          <WeekContent
            activeWeek={activeWeek}
            weekData={weekData}
            uploading={uploading}
            uploadAssignment={uploadAssignment}
            markComplete={markComplete}
          />
        );
      default:
        return (
          <OverviewContent
            applicant={applicant}
            progressPercent={progressPercent}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-52 bg-slate-800 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0 transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-5 border-b">
            <img src={logo} alt="" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-4">
            {mainNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 roundes text-left transition-colors ${
                    activeNav === item.id
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      : "text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Weeks Navigation */}
          <div className="border-t px-4 py-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 px-4">
              Learning Path
            </h3>
            <div className="space-y-3">
              {learningPath.map((week) => (
                <button
                  key={week.weekNumber}
                  onClick={() => openWeek(week.weekNumber)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-sm text-left transition-colors ${
                    activeWeek === week.weekNumber &&
                    activeNav === "week-content"
                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                      : "text-white hover:bg-slate-900"
                  } ${week.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={week.locked}
                >
                  {week.completed ? (
                    <CheckCircle className="w-4 h-6 text-green-500" />
                  ) : week.locked ? (
                    <Lock className="w-4 h-4 text-gray-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-blue-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      Week {week.weekNumber}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {week.title}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-slate-800 shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-white capitalize">
                  {activeNav.replace("-", " ")}
                </h1>
                <p className="text-sm text-white/90">
                  Welcome back, {applicant.fullName}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">
                  {applicant.fullName}
                </p>
                <p className="text-xs text-white/90">{applicant.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

<div>
  {/* Overview Component */}
  <OverviewContent />
  {/* Progress Component */}
  <ProgressContent />
  {/* Projects Component */}

  <ProjectsContent />
  {/* Certificate Component */}
  <CertificateContent />

  {/* Profile Component */}
  <ProfileContent />

  {/* Week Content Component */}
  <WeekContent />
</div>;
