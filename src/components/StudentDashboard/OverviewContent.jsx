import React from 'react'
import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Github,
  Globe,
  Home,
  Laptop,
  Lock,
  LogOut,
  Menu,
  Target,
  User,
  Award,
  BarChart3,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Upload,
  Search,
  ExternalLink,
  FileCode,
  ArrowRight,
} from "lucide-react";

function OverviewContent({ applicant, progressPercent, submittedAssignmentsCount, weeksWithSubmissions, onWeekNavigate }) {
  const { learningPath = [] } = applicant;
  const completedWeeks = learningPath.filter((w) => w.completed).length;
  const totalWeeks = learningPath.length || 1;

  // Calculate assignment statistics
  const totalAssignmentsSubmitted = submittedAssignmentsCount || 0;
  const weeksWithAssignments = weeksWithSubmissions || 0;

  return (
    <div className="space-y-5">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md p-5 text-white">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              Welcome to Your Internship, {applicant.fullName}! 🎉
            </h2>
            <p className="text-indigo-100 mb-4 text-md">
              {applicant.internshipRef?.description ||
                "Continue your learning journey and build amazing projects!"}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
                ID: {applicant.uniqueId}
              </span>
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
                {applicant.duration}
              </span>
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
                {applicant.domain}
              </span>
            </div>
          </div>
          <div className="hidden lg:block ml-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-10 w-10 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-white/90"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-md p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {progressPercent}%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {completedWeeks} of {totalWeeks} weeks completed
            </p>
          </div>
        </div>

        <div className="bg-white rounded-md p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Weeks Completed
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {completedWeeks}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Great progress! Keep going
          </p>
        </div>

        <div className="bg-white rounded-md p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Assignments Submitted
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {totalAssignmentsSubmitted}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {weeksWithAssignments} weeks with submissions
          </p>
        </div>

        <div className="bg-white rounded-md p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Time Remaining
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {applicant.endDate
                  ? Math.ceil(
                      (new Date(applicant.endDate) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    )
                  : 0}{" "}
                days
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ends on{" "}
            {applicant.endDate
              ? new Date(applicant.endDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Recent Weeks */}
      <div className="bg-white rounded-md shadow-sm border p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contents</h3>
        <div className="space-y-4">
          {learningPath.slice(0, 4).map((week) => (
            <div
              key={week.weekNumber}
              className={`p-4 border rounded-md ${
                week.completed
                  ? "border-green-200 bg-green-50"
                  : week.locked
                  ? "border-gray-200 bg-gray-50"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      week.completed
                        ? "bg-green-100 text-green-600"
                        : week.locked
                        ? "bg-gray-200 text-gray-500"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {week.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{week.weekNumber}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Week {week.weekNumber}: {week.title}
                    </h4>
                    <p className="text-sm text-gray-600">{week.content}</p>
                    {week.assignmentSubmissions && week.assignmentSubmissions.length > 0 && (
                      <p className="text-xs text-purple-600 mt-1">
                        {week.assignmentSubmissions.length} assignment(s) submitted
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {week.completed && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      Completed
                    </span>
                  )}
                  {week.locked && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                      <Lock className="w-4 h-4 text-gray-400" />
                    </span>
                  )}
                  {!week.completed && !week.locked && (
                    <button
                      onClick={() => onWeekNavigate && onWeekNavigate(week.weekNumber)}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      <span>Go</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverviewContent;