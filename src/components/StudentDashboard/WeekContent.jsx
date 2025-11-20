import React, { useEffect, useState } from "react";
import {
  Lock,
  CheckCircle,
  Upload,
  Clock,
  Target,
  BookOpen,
  ExternalLink,
  Plus,
  AlertCircle,
  FileText
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
  const [fileError, setFileError] = useState("");
  const [markingComplete, setMarkingComplete] = useState(false);
  const [justCompletedNow, setJustCompletedNow] = useState(false);

  const MAX_SIZE = 10 * 1024 * 1024;
  const EXTENSIONS = ["pdf", "ppt", "pptx", "doc", "docx"];

  useEffect(() => {
    setShowAssignmentForm(false);
    setFileError("");
    setHasSubmittedAssignment(weekData?.assignmentSubmissions?.length > 0);
    setJustCompletedNow(false);
  }, [activeWeek, weekData]);

  const validateFile = (file) => {
    setFileError("");
    if (!file) return setFileError("No file selected"), false;
    if (file.size > MAX_SIZE)
      return setFileError("Max allowed file size is 10MB."), false;

    const ext = file.name.split(".").pop().toLowerCase();
    if (!EXTENSIONS.includes(ext))
      return setFileError(`Allowed types: ${EXTENSIONS.join(", ")}`), false;

    return true;
  };

  const handleMarkComplete = async () => {
    if (markingComplete) return;
    setMarkingComplete(true);

    try {
      await markComplete(activeWeek);
      setJustCompletedNow(true);
    } finally {
      setMarkingComplete(false);
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];
    if (!validateFile(file)) return;

    await uploadAssignment(e, activeWeek);
    setHasSubmittedAssignment(true);
    setShowAssignmentForm(false);
  };

  if (!weekData) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <PreLoader text="Loading Week Data..." />
      </div>
    );
  }

  if (weekData.locked) {
    return (
      <div className="bg-white rounded-xl shadow border p-8 text-center">
        <Lock className="w-14 h-14 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-[#0A444D]">
          Week {activeWeek} Locked
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Unlocks on {new Date(weekData.unlockDate).toLocaleDateString()}
        </p>
      </div>
    );
  }

  const isCompleted = weekData.completed || justCompletedNow;

  return (
    <div className="bg-white rounded-xl shadow border">
      <div className="bg-[#0A444D] text-white p-3 md:p-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Week {activeWeek}</h2>
          <p className="opacity-90">{weekData.title}</p>

          {isCompleted && (
            <p className="text-sm mt-2 text-green-300 flex gap-2 items-center">
              <CheckCircle className="w-4 h-4" />
              Completed on: {new Date().toLocaleDateString()}
            </p>
          )}
        </div>

        {!isCompleted && (
          <button
            onClick={handleMarkComplete}
            disabled={markingComplete}
            className="bg-white text-[#0A444D] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-40"
          >
            {markingComplete ? <PreLoader size="small" /> : "Mark Complete"}
          </button>
        )}
      </div>

      <div className="p-3 mg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          {weekData.tasks?.length > 0 && (
            <section>
              <h4 className="flex items-center gap-2 font-semibold text-[#0A444D] text-lg">
                <Target className="w-5 h-5" /> Assignment Tasks
              </h4>
              <ul className="bg-[#0A444D]/5 border border-[#0A444D]/20 rounded-lg p-4 space-y-2 mt-3">
                {weekData.tasks.map((t, i) => (
                  <li key={i} className="text-[#0A444D] text-sm">• {t}</li>
                ))}
              </ul>
            </section>
          )}

          {weekData.resources?.length > 0 && (
            <section>
              <h4 className="flex items-center gap-2 font-semibold text-[#0A444D] text-lg">
                <BookOpen className="w-5 h-5" /> Resources
              </h4>
              <ul className="space-y-2 mt-2">
                {weekData.resources.map((r, i) => (
                  <li key={i}>
                    <a href={r} target="_blank" className="text-blue-700 text-sm hover:underline flex gap-2 items-center">
                      <ExternalLink className="w-4 h-4" /> {r}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="space-y-4 bg-gray-50 p-5 rounded-xl border">
          <h4 className="font-semibold text-[#0A444D] flex gap-2 items-center">
            <Upload className="w-4 h-4" /> Assignment Submission
          </h4>

          {hasSubmittedAssignment ? (
            <div className="bg-green-100 text-green-700 text-center p-3 rounded-lg text-sm">
              Assignment Submitted ✔
            </div>
          ) : (
            <div className="text-gray-600 text-sm text-center">
              No submissions yet
            </div>
          )}

          {hasSubmittedAssignment && (
            <button
              onClick={() => setShowAssignmentForm(!showAssignmentForm)}
              className="bg-[#0A444D] w-full text-white py-2 rounded-md text-sm flex items-center justify-center gap-1 hover:bg-[#08353c]"
            >
              <Plus className="w-4 h-4" /> Submit Another Assignment
            </button>
          )}

          {(!hasSubmittedAssignment || showAssignmentForm) && (
            <form onSubmit={handleAssignmentSubmit} className="space-y-3">
              <input
                type="file"
                name="file"
                onChange={(e) => validateFile(e.target.files[0])}
                required={!hasSubmittedAssignment}
                className="w-full text-sm border rounded-lg px-3 py-2"
              />

              {fileError && (
                <p className="text-xs text-red-600 flex gap-1 items-center">
                  <AlertCircle className="w-3 h-3" /> {fileError}
                </p>
              )}

              <textarea
                name="remarks"
                rows={2}
                placeholder="Remarks (optional)"
                className="w-full text-sm border rounded-lg px-3 py-2"
              />

              <button
                type="submit"
                disabled={uploading || fileError}
                className="bg-[#0A444D] w-full text-white py-2 rounded-md text-sm disabled:opacity-40"
              >
                {uploading ? <PreLoader size="small" /> : "Submit Assignment"}
              </button>
            </form>
          )}

          {weekData.assignmentSubmissions?.length > 0 && (
            <div className="border rounded-lg p-3 bg-white max-h-52 overflow-y-auto">
              <p className="font-semibold text-sm text-[#0A444D] mb-3 flex items-center gap-1">
                <FileText className="w-4 h-4" /> Your Submissions ({weekData.assignmentSubmissions.length})
              </p>

              <div className="space-y-3">
                {weekData.assignmentSubmissions.map((s, i) => (
                  <div key={i} className="p-3 border rounded-lg bg-gray-50 text-sm">
                    <p className="font-medium text-[#0A444D] line-clamp-1 flex gap-2 items-center">
                      {s.originalName}
                    </p>

                    {s.remarks && (
                      <p className="text-gray-600 text-xs">
                        Remarks: {s.remarks}
                      </p>
                    )}

                    {s.size && (
                      <p className="text-gray-500 text-xs">
                        Size: {(s.size / (1024 * 1024)).toFixed(2)}MB
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default WeekContent;