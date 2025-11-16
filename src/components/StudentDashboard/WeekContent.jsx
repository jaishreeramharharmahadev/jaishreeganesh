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
  Plus,
  AlertCircle,
} from "lucide-react";
import PreLoader from "../common/PreLoader";

function WeekContent({
  activeWeek,
  weekData,
  uploading,
  uploadAssignment,
  markComplete,
}) {
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [hasSubmittedAssignment, setHasSubmittedAssignment] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [fileError, setFileError] = useState("");

  // File size limit (10MB in bytes)
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  // Allowed file types
  const ALLOWED_FILE_TYPES = [
    // PDF
    'application/pdf',
    
    // PowerPoint
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    
    // Word Documents
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    
    // Text files (optional - included since they're small)
    'text/plain',
  ];

  const ALLOWED_EXTENSIONS = [
    'pdf',
    'ppt',
    'pptx',
    'doc',
    'docx',
  ];

  // Reset form state when week changes
  useEffect(() => {
    setShowAssignmentForm(false);
    setFileError("");
    if (weekData?.assignmentSubmissions?.length > 0) {
      setHasSubmittedAssignment(true);
    } else {
      setHasSubmittedAssignment(false);
    }
  }, [activeWeek, weekData]);

  // Update hasSubmittedAssignment when weekData changes
  useEffect(() => {
    if (weekData?.assignmentSubmissions?.length > 0) {
      setHasSubmittedAssignment(true);
    }
  }, [weekData]);

  const validateFile = (file) => {
    setFileError("");

    // Check if file is selected
    if (!file) {
      setFileError("Please select a file to upload.");
      return false;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File size too large. Maximum size is 10MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.`);
      return false;
    }

    // Check file type
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isValidType = ALLOWED_FILE_TYPES.includes(file.type) || 
                       ALLOWED_EXTENSIONS.includes(fileExtension);

    if (!isValidType) {
      setFileError(`File type not allowed. Please upload only PDF, PPT, Word documents, or images (${ALLOWED_EXTENSIONS.join(', ')}).`);
      return false;
    }

    return true;
  };

  const handleAssignmentSubmit = async (e, week) => {
    e.preventDefault();
    const fileInput = e.target.elements.file;
    
    if (!fileInput || fileInput.files.length === 0) {
      setFileError("Please select a file to upload.");
      return;
    }

    const file = fileInput.files[0];
    
    // Validate file before upload
    if (!validateFile(file)) {
      return;
    }

    await uploadAssignment(e, week);
    setHasSubmittedAssignment(true);
    setShowAssignmentForm(false);
    setFileError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateFile(file);
    } else {
      setFileError("");
    }
  };

  const handleMarkComplete = async () => {
    setMarkingComplete(true);
    try {
      await markComplete(activeWeek);
      // Success state will be reflected through the updated weekData prop
    } catch (error) {
      console.error("Failed to mark week as complete:", error);
    } finally {
      setMarkingComplete(false);
    }
  };

  const toggleAssignmentForm = () => {
    setShowAssignmentForm(!showAssignmentForm);
    setFileError("");
  };

  if (!weekData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PreLoader text="Loading week content..."/>
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
            {weekData.completed && (
              <div className="flex items-center space-x-2 mt-3">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-green-200 font-medium">Completed</span>
                {weekData.completedAt && (
                  <span className="text-green-200 text-sm">
                    on {new Date(weekData.completedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </div>
          {!weekData.completed ? (
            <button
              onClick={handleMarkComplete}
              disabled={markingComplete}
              className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {markingComplete ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                  <span>Marking...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          ) : (
            <div className="bg-green-100 text-green-800 px-6 py-2 rounded-lg font-semibold flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
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
                {/* Assignment Status Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-blue-600" />
                    Assignment Status
                  </h4>

                  {/* Submission Status */}
                  {hasSubmittedAssignment ? (
                    <div className="text-center py-4">
                      <div className="flex justify-center mb-3">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                      <h5 className="font-semibold text-green-700 mb-2">
                        Assignment Submitted!
                      </h5>
                      <p className="text-sm text-gray-600 mb-4">
                        Your assignment has been successfully submitted.
                      </p>
                      
                      {/* Submit More Button */}
                      {!showAssignmentForm && (
                        <button
                          onClick={toggleAssignmentForm}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Submit Another Assignment</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="flex justify-center mb-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Clock className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <h5 className="font-semibold text-gray-700 mb-2">
                        Pending Submission
                      </h5>
                      <p className="text-sm text-gray-600 mb-4">
                        No assignment submitted yet.
                      </p>
                    </div>
                  )}

                  {/* Assignment Form - Show based on conditions */}
                  {(showAssignmentForm || !hasSubmittedAssignment) && (
                    <form
                      onSubmit={(e) => handleAssignmentSubmit(e, activeWeek)}
                      className="space-y-4 mt-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload File
                        </label>
                        <input
                          type="file"
                          name="file"
                          accept=".pdf,.ppt,.pptx,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.svg,.txt"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          required
                          onChange={handleFileChange}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Allowed: pdf, ppt</span>
                          <span>Max: 10MB</span>
                        </div>
                        {fileError && (
                          <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{fileError}</span>
                          </div>
                        )}
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
                        disabled={uploading || fileError}
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
                            <span>
                              {hasSubmittedAssignment ? 'Submit Additional Assignment' : 'Submit Assignment'}
                            </span>
                          </>
                        )}
                      </button>

                      {/* Cancel button for additional submissions */}
                      {hasSubmittedAssignment && showAssignmentForm && (
                        <button
                          type="button"
                          onClick={toggleAssignmentForm}
                          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </form>
                  )}
                </div>

                {/* Previous Submissions */}
                {(weekData.assignmentSubmissions || []).length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h5 className="font-semibold text-gray-900 mb-3 text-sm flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-gray-500" />
                      Your Submissions ({weekData.assignmentSubmissions.length})
                    </h5>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {weekData.assignmentSubmissions.map((submission, index) => (
                        <div 
                          key={index} 
                          className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900 text-sm truncate flex items-center">
                              {submission.originalName || submission.filename}
                              {index === 0 && (
                                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  Latest
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded whitespace-nowrap">
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
                          {submission.size && (
                            <p className="text-xs text-gray-500 mb-2">
                              Size: {(submission.size / (1024 * 1024)).toFixed(2)} MB
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