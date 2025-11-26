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
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

import PreLoader from "../common/PreLoader";

export default function FeedbackSection({
  applicant,
  token,
  apiBase = "http://localhost:5000",
  onSubmitted = () => {},
}) {
  const [checking, setChecking] = useState(true);
  const [available, setAvailable] = useState(false);
  const [windowInfo, setWindowInfo] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

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

  function formatDateOnly(dateLike) {
    if (!dateLike) return "-";
    const d = new Date(dateLike);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  async function checkAvailability() {
    setChecking(true);
    setError("");
    setAvailable(false);
    setSuccessMsg("");
    setWindowInfo(null);

    try {
      const idForApi = applicant._id || applicant.uniqueId;
      const res = await axios.get(
        `${apiBase}/api/feedback/available/${idForApi}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const data = res.data || {};
      const opensAt =
        data.startFeedbackIST || data.tenDaysBefore || data.opensAt;
      const endsAt = data.endDateIST || data.endDate;

      setAvailable(Boolean(data.available));
      setWindowInfo({
        opensAt,
        endsAt,
        feedbackSubmitted: data.feedbackSubmitted,
      });
    } catch (err) {
      setError("Unable to check feedback availability right now.");
    } finally {
      setChecking(false);
    }
  }

  const StarRating = ({ rating, onRatingChange }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className={`w-6 h-6 transition transform hover:scale-110 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          <Star />
        </button>
      ))}
    </div>
  );

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

  function onResumeChange(e) {
    const f = e.target.files?.[0];
    if (!f) return setResumeFile(null);
    if (f.type !== "application/pdf") {
      alert("Resume must be a PDF");
      return (e.target.value = "");
    }
    if (f.size > 2 * 1024 * 1024) {
      alert("Resume must be <= 2 MB");
      return (e.target.value = "");
    }
    setResumeFile(f);
  }

  function onVideoChange(e) {
    const f = e.target.files?.[0];
    if (!f) return setVideoFile(null);
    if (!f.type.startsWith("video/")) {
      alert("Video must be a valid video file");
      return (e.target.value = "");
    }
    if (f.size > 10 * 1024 * 1024) {
      alert("Video must be <= 10 MB");
      return (e.target.value = "");
    }
    setVideoFile(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!available) {
      setError("Feedback is not available yet.");
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
      const res = await axios.post(
        `${apiBase}/api/feedback/${idForApi}`,
        form,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "multipart/form-data",
          },
          maxBodyLength: Infinity,
        }
      );

      setSuccessMsg(res.data.message || "Feedback submitted successfully");
      setAvailable(false);
      setResumeFile(null);
      setVideoFile(null);
      onSubmitted();
    } catch (err) {
      setError("Unable to submit now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (checking) {
    return (
      <div className="p-8 rounded-2xl bg-white shadow">
        <PreLoader />
        <p className="text-sm text-gray-500 mt-3">Checking availability...</p>
      </div>
    );
  }

  if (!available && !successMsg) {
    const { opensAt, endsAt, feedbackSubmitted } = windowInfo || {};

    return (
      <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200 shadow">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="text-orange-600" />
          <h3 className="font-semibold text-orange-800 text-lg">
            {feedbackSubmitted
              ? "Feedback Already Submitted"
              : "Feedback Not Yet Open"}
          </h3>
        </div>

        {!feedbackSubmitted && (
          <p className="text-sm text-gray-700 mb-4">
            You can start filling feedback from:
          </p>
        )}

        {windowInfo && (
          <div className="bg-white rounded-xl p-4 space-y-3 text-sm shadow">
            <div className="flex justify-between">
              <span>Feedback Opens On:</span>
              <span className="font-semibold text-green-700">
                {formatDateOnly(opensAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Internship Ended On:</span>
              <span className="font-semibold text-blue-700">
                {formatDateOnly(endsAt)}
              </span>
            </div>
          </div>
        )}

        {!feedbackSubmitted && (
          <button
            onClick={checkAvailability}
            className="mt-4 px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
          >
            Refresh Status
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="border border-blue-100 bg-white rounded-2xl p-6 shadow-lg">
      {submitting && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
          <PreLoader />
        </div>
      )}

      <div className="bg-indigo-600 text-white p-5 rounded-xl mb-6 shadow">
        <div className="flex items-center gap-2">
          <Sparkles />
          <h2 className="text-lg font-semibold">Share Your Feedback</h2>
        </div>
        <p className="text-xs opacity-80 mt-1">
          Your experience helps us improve our internship program!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <label className="block text-sm font-semibold mb-2">
            Overall Internship Rating
          </label>
          <StarRating rating={internshipRating} onRatingChange={setInternshipRating} />
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <label className="block text-sm font-semibold mb-3">
            Field Specific Feedback
          </label>

          {fieldReviews.map((fr, i) => (
            <div key={i} className="bg-white border p-3 rounded-xl mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">({i + 1})</span>
                {fieldReviews.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFieldReview(i)}
                    className="text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder="Field Name"
                value={fr.fieldName}
                onChange={(e) =>
                  updateFieldReview(i, "fieldName", e.target.value)
                }
                required
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <StarRating
                rating={fr.rating}
                onRatingChange={(rating) =>
                  updateFieldReview(i, "rating", rating)
                }
              />
              <input
                type="text"
                placeholder="Remarks (optional)"
                value={fr.remark}
                onChange={(e) =>
                  updateFieldReview(i, "remark", e.target.value)
                }
                className="w-full border rounded px-3 py-2 mt-2"
              />
            </div>
          ))}

          {fieldReviews.length < 3 && (
            <button
              type="button"
              onClick={addFieldReview}
              className="mt-2 text-indigo-600 font-semibold"
            >
              <Plus size={16} className="inline-block mr-1" /> Add More
            </button>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <label className="block text-sm font-semibold mb-2">
            General Remarks
          </label>
          <textarea
            rows="3"
            value={generalRemarks}
            onChange={(e) => setGeneralRemarks(e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Share anything about your learning experience..."
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <label className="block text-sm font-semibold mb-2">
            Upload Resume (Optional)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={onResumeChange}
            className="w-full"
          />
          <small className="block text-gray-500">Max size: 2MB (PDF only)</small>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <label className="block text-sm font-semibold mb-2">
            Upload Video Feedback (Optional)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={onVideoChange}
            className="w-full"
          />
          <small className="block text-gray-500">Max size: 10MB</small>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg disabled:bg-gray-400"
        >
          <ThumbsUp className="inline-block w-4 h-4 mr-2" />
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>

        {error && (
          <p className="text-red-600 text-sm font-semibold">{error}</p>
        )}

        {successMsg && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-xl text-green-700 font-semibold text-center">
            <CheckCircle2 className="inline-block mr-2" />
            {successMsg}
          </div>
        )}
      </form>
    </div>
  );
}