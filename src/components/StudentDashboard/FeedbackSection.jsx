import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Star,
  Upload,
  Video,
  FileText,
  Plus,
  Trash2,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { apiUrl } from "../../utils/api";

export default function FeedbackSection({
  applicant,
  token,
  apiBase = "http://localhost:5000",
  onSubmitted = () => {},
}) {
  const [checking, setChecking] = useState(true);
  const [available, setAvailable] = useState(false);
  const [nowInfo, setNowInfo] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // form state
  const [internshipRating, setInternshipRating] = useState(5);
  const [generalRemarks, setGeneralRemarks] = useState("");
  const [fieldReviews, setFieldReviews] = useState([
    { fieldName: "", rating: 5, remark: "" },
  ]);
  const [resumeFile, setResumeFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (!applicant) return;
    checkAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicant]);

  async function checkAvailability() {
    setChecking(true);
    setError("");
    setAvailable(false);
    setSuccessMsg("");
    try {
      const idForApi = applicant._id || applicant.uniqueId;
      const res = await axios.get(apiUrl(`/feedback/available/${idForApi}`), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setAvailable(Boolean(res.data.available));
      setNowInfo({
        now: res.data.now,
        tenDaysBefore: res.data.tenDaysBefore,
        endDate: res.data.endDate,
        feedbackSubmitted: res.data.feedbackSubmitted,
      });
    } catch (err) {
      console.error("checkAvailability error", err);
      setError(err?.response?.data?.message || "Failed to check feedback availability");
    } finally {
      setChecking(false);
    }
  }

  // Star rating component
  const StarRating = ({ rating, onRatingChange, size = "md" }) => {
    const sizes = {
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-8 h-8"
    };

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`${sizes[size]} transition-transform hover:scale-110 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
    );
  };

  // field reviews helpers
  function addFieldReview() {
    if (fieldReviews.length >= 3) return;
    setFieldReviews([...fieldReviews, { fieldName: "", rating: 5, remark: "" }]);
  }
  function removeFieldReview(idx) {
    const arr = [...fieldReviews];
    arr.splice(idx, 1);
    setFieldReviews(arr);
  }
  function updateFieldReview(idx, key, value) {
    const arr = [...fieldReviews];
    arr[idx] = { ...arr[idx], [key]: value };
    setFieldReviews(arr);
  }

  // client-side file checks
  function onResumeChange(e) {
    const f = e.target.files?.[0];
    if (!f) {
      setResumeFile(null);
      return;
    }
    if (f.type !== "application/pdf") {
      alert("Resume must be a PDF");
      e.target.value = "";
      return;
    }
    const maxResume = 2 * 1024 * 1024; // 2MB
    if (f.size > maxResume) {
      alert("Resume must be <= 2 MB");
      e.target.value = "";
      return;
    }
    setResumeFile(f);
  }

  function onVideoChange(e) {
    const f = e.target.files?.[0];
    if (!f) {
      setVideoFile(null);
      return;
    }
    if (!f.type.startsWith("video/")) {
      alert("Video must be a video file");
      e.target.value = "";
      return;
    }
    const maxVideo = 10 * 1024 * 1024; // 10MB
    if (f.size > maxVideo) {
      alert("Video must be <= 10 MB");
      e.target.value = "";
      return;
    }
    setVideoFile(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // basic validation
    if (!internshipRating || internshipRating < 1 || internshipRating > 5) {
      alert("Please provide an overall rating (1-5)");
      return;
    }
    if (!Array.isArray(fieldReviews)) { setError("Invalid field reviews"); return; }
    if (fieldReviews.length > 3) { setError("Max 3 field reviews allowed"); return; }

    for (const fr of fieldReviews) {
      if (!fr.fieldName || !fr.rating) { setError("Each field review needs a name and rating"); return; }
      if (fr.rating < 1 || fr.rating > 5) { setError("Field review ratings must be 1-5"); return; }
    }

    // prevent submission if not available (server also checks)
    if (!available) {
      setError("Feedback is not available at this time.");
      return;
    }

    const form = new FormData();
    form.append("internshipRating", internshipRating);
    form.append("generalRemarks", generalRemarks || "");
    form.append("fieldReviews", JSON.stringify(fieldReviews));
    if (resumeFile) form.append("resume", resumeFile);
    if (videoFile) form.append("videoFeedback", videoFile);

    setSubmitting(true);
    try {
      const idForApi = applicant._id || applicant.uniqueId;
      const res = await axios.post(apiUrl(`/feedback/${idForApi}`), form, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
      });
      setSuccessMsg(res.data.message || "Feedback submitted successfully");
      setAvailable(false); // hide form after submission
      setResumeFile(null);
      setVideoFile(null);
      // notify parent to refresh applicant (so feedbackSubmitted becomes true)
      try { await onSubmitted(); } catch (e) { /* ignore */ }
    } catch (err) {
      console.error("submit feedback error", err);
      setError(err?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  // Loading state
  if (checking) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Checking feedback availability…</p>
        <p className="text-sm text-gray-500 mt-1">Getting everything ready for you</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-100 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-red-800">Oops! Something went wrong</h3>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
        <button
          onClick={checkAvailability}
          className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Not available state
  if (!available) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-800">Feedback Coming Soon!</h3>
            <p className="text-sm text-amber-700 mt-1">
              Feedback form will appear 10 days before your internship end date.
            </p>
          </div>
        </div>
        
        {nowInfo && (
          <div className="bg-white/50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Time:</span>
              <span className="font-medium">{new Date(nowInfo.now).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Feedback Opens:</span>
              <span className="font-medium text-green-600">{new Date(nowInfo.tenDaysBefore).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Internship Ends:</span>
              <span className="font-medium text-blue-600">{new Date(nowInfo.endDate).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main form
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Sparkles className="w-6 h-6" />
          <h3 className="text-xl font-bold">Share Your Journey</h3>
        </div>
        <p className="text-indigo-100">Help us improve by sharing your internship experience</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 px-6 pt-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-white border-t border-l border-r border-gray-200 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === "details"
                ? "bg-white border-t border-l border-r border-gray-200 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Detailed Feedback
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {successMsg && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Thank you! 🎉</p>
                <p className="text-sm text-green-700 mt-1">{successMsg}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Overall Internship Rating
            </label>
            <div className="flex items-center justify-between">
              <StarRating rating={internshipRating} onRatingChange={setInternshipRating} size="lg" />
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{internshipRating}.0</div>
                <div className="text-sm text-gray-500">
                  {internshipRating === 5 ? "Excellent" : 
                   internshipRating === 4 ? "Very Good" :
                   internshipRating === 3 ? "Good" :
                   internshipRating === 2 ? "Fair" : "Poor"}
                </div>
              </div>
            </div>
          </div>

          {/* Field Reviews */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-lg font-semibold text-gray-900">
                Field-Specific Reviews
              </label>
              <span className="text-sm text-gray-500">{fieldReviews.length}/3</span>
            </div>
            
            <div className="space-y-4">
              {fieldReviews.map((fr, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-600">{idx + 1}</span>
                      </div>
                      <span className="font-medium text-gray-700">Field Review</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {fieldReviews.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFieldReview(idx)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Web Development, Data Analysis..."
                        value={fr.fieldName}
                        onChange={(e) => updateFieldReview(idx, "fieldName", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <StarRating rating={fr.rating} onRatingChange={(rating) => updateFieldReview(idx, "rating", rating)} />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Remarks (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Short feedback..."
                        value={fr.remark}
                        onChange={(e) => updateFieldReview(idx, "remark", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {fieldReviews.length < 3 && (
              <button
                type="button"
                onClick={addFieldReview}
                className="mt-4 flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Add Another Field</span>
              </button>
            )}
          </div>

          {/* General Remarks */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              <MessageSquare className="w-5 h-5 inline mr-2" />
              General Remarks
            </label>
            <textarea
              value={generalRemarks}
              onChange={(e) => setGeneralRemarks(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder="Share your overall experience, suggestions for improvement, mentor feedback, or anything else you'd like us to know..."
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resume Upload */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                <FileText className="w-5 h-5 inline mr-2" />
                Updated Resume
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={onResumeChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <span className="text-indigo-600 font-medium hover:text-indigo-700">
                    Choose PDF file
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2">Max 2MB • PDF only</p>
                {resumeFile && (
                  <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 justify-center">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">{resumeFile.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                <Video className="w-5 h-5 inline mr-2" />
                Video Feedback
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors">
                <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={onVideoChange}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <span className="text-indigo-600 font-medium hover:text-indigo-700">
                    Choose video file
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2">Max 10MB • Video files</p>
                {videoFile && (
                  <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 justify-center">
                      <Video className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">{videoFile.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Ready to submit your feedback?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Your feedback helps us improve the internship program for future students
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={checkAvailability}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                    submitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Submit Feedback</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}