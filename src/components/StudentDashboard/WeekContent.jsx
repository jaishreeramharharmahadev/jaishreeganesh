import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "lucide-react";

function WeekContent({
  activeWeek,
  weekData,
  uploading,
  uploadAssignment,
  markComplete,
}) {
  if (!weekData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading week content...</p>
        </div>
      </div>
    );
  }

  if (weekData.locked) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
        <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Week {activeWeek} is Locked
        </h3>
        <p className="text-gray-600 mb-4">
          This week will be available on{" "}
          {weekData.unlockDate
            ? new Date(weekData.unlockDate).toLocaleDateString()
            : "the scheduled date"}
          .
        </p>
        <p className="text-sm text-gray-500">
          Complete previous weeks to unlock this content.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      {/* Week Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Week {activeWeek}</h2>
            <h3 className="text-xl font-semibold opacity-90">
              {weekData.title}
            </h3>
            <p className="opacity-80 mt-2">{weekData.content}</p>
          </div>
          <button
            onClick={() => markComplete(activeWeek)}
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Mark Complete</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Assignment & Resources */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tasks */}
            {Array.isArray(weekData.tasks) && weekData.tasks.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-indigo-600" />
                  Assignment Tasks
                </h4>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <ul className="space-y-4">
                    {weekData.tasks.map((task, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Resources */}
            {Array.isArray(weekData.resources) && weekData.resources.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                  Learning Resources
                </h4>
                <div className="grid gap-4">
                  {weekData.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 flex-shrink-0" />
                      <span className="text-indigo-600 group-hover:text-indigo-800 text-sm break-all">
                        {resource}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Assignment Submission (Only if required) */}
          {weekData.assignmentRequired ? (
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-blue-600" />
                    Submit Assignment
                  </h4>

                  <form
                    onSubmit={(e) => uploadAssignment(e, activeWeek)}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload File
                      </label>
                      <input
                        type="file"
                        name="file"
                        accept=".pdf,.ppt,.pptx,.docx,.zip,.jpg,.jpeg,.png,.mp4,.mov,.avi,.py,.js,.jsx,.ts,.tsx,.html,.css,.java,.cpp,.c,.ipynb"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Supported formats: PDF, PPT, DOC, Images, Videos, Code files
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Remarks (Optional)
                      </label>
                      <textarea
                        name="remarks"
                        placeholder="Any additional comments about your submission..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="consent"
                        id="consent"
                        required
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1 flex-shrink-0"
                      />
                      <label htmlFor="consent" className="text-sm text-gray-700">
                        I confirm information is accurate and I agree to the terms and
                        conditions.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={uploading}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Submit Assignment</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Previous Submissions */}
                  {(weekData.assignmentSubmissions || []).length > 0 && (
                    <div className="mt-6 pt-6 border-t border-blue-200">
                      <h5 className="font-semibold text-gray-900 mb-3 text-sm">
                        Your Submissions
                      </h5>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {weekData.assignmentSubmissions.map((submission, index) => (
                          <div 
                            key={index} 
                            className="border border-gray-200 rounded-lg p-3 bg-white"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-gray-900 text-sm truncate">
                                {submission.originalName || submission.filename}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                                {submission.submittedAt
                                  ? new Date(
                                      submission.submittedAt
                                    ).toLocaleDateString()
                                  : "Submitted"}
                              </span>
                            </div>
                            {submission.remarks && (
                              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                {submission.remarks}
                              </p>
                            )}
                            {submission.filename && (
                              <a
                                href={`/api/uploads/assignment/${submission.filename}`}
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                              >
                                <Download className="w-3 h-3" />
                                <span>Download</span>
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  No Assignment Required
                </h4>
                <p className="text-gray-600 text-sm">
                  Focus on learning and complete the tasks listed.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeekContent;