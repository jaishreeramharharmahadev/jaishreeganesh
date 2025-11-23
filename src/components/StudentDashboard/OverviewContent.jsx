import React from "react";
import {
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function OverviewContent({
  applicant,
  progressPercent = 0,
  submittedAssignmentsCount = 0,
  weeksWithSubmissions = 0,
  onWeekNavigate,
}) {
  const { learningPath = [] } = applicant;
  const completedWeeks = learningPath.filter((w) => w.completed).length;
  const totalWeeks = learningPath.length || 1;

  const timeRemaining = applicant.endDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(applicant.endDate) - new Date()) / (1000 * 60 * 60 * 24)
        )
      )
    : "N/A";

  const formattedStartDate = applicant.startDate
    ? new Date(applicant.startDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold">Welcome, {applicant.fullName}!</h2>
        <p className="text-gray-700 mt-1 mb-4 text-sm sm:text-base">
          {applicant?.internshipRef?.description ||
            "Continue your learning journey and build amazing projects!"}
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
          <span className="bg-teal-500 text-white px-3 py-1 rounded-full">
            ID: {applicant.uniqueId}
          </span>
          <span className="bg-teal-500 text-white px-3 py-1 rounded-full">
            {applicant.duration}
          </span>
          <span className="bg-teal-500 text-white px-3 py-1 rounded-full">
            {applicant.domain}
          </span>

          {/* New Start Date Badge */}
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full">
            Internship Start Date: {formattedStartDate}
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Progress"
          value={`${progressPercent}%`}
          icon={<BarChart3 className="w-6 h-6 text-[#0A444D]" />}
          progress={progressPercent}
          subtitle={`${completedWeeks} of ${totalWeeks} weeks`}
        />

        <StatCard
          title="Weeks Completed"
          value={completedWeeks}
          icon={<CheckCircle className="w-6 h-6 text-[#0A444D]" />}
        />

        <StatCard
          title="Assignments Submitted"
          value={submittedAssignmentsCount}
          icon={<FileText className="w-6 h-6 text-[#0A444D]" />}
          subtitle={`${weeksWithSubmissions} weeks`}
        />

        <StatCard
          title="Time Remaining"
          value={`${timeRemaining} days`}
          icon={<Clock className="w-6 h-6 text-[#0A444D]" />}
          subtitle={
            applicant.endDate &&
            new Date(applicant.endDate).toLocaleDateString()
          }
        />
      </section>

      {/* Learning Content */}
      <section className="bg-white border rounded-xl p-3 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0A444D] mb-4 ml-2">
          Learning Contents
        </h3>

        <div className="space-y-4">
          {learningPath.slice(0, 4).map((week) => (
            <WeekItem
              key={week.weekNumber}
              week={week}
              onWeekNavigate={onWeekNavigate}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/** --- Reusable UI Components --- **/
const StatCard = ({ title, value, subtitle, icon, progress }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-xs font-medium">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-[#0A444D]">{value}</p>
      </div>
      <div className="bg-gray-100 p-2 rounded-lg">{icon}</div>
    </div>

    {progress !== undefined && (
      <div className="mt-3 bg-gray-200 h-2 rounded-full">
        <div
          className="bg-[#0A444D] h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )}

    {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
  </div>
);

const WeekItem = ({ week, onWeekNavigate }) => {
  const isCompleted = week.completed;
  const isLocked = week.locked;

  return (
    <div
      className={`p-3 rounded-xl border shadow-sm transition hover:shadow-md ${
        isCompleted
          ? "bg-green-50 border-green-200"
          : isLocked
          ? "bg-gray-50 border-gray-200"
          : "bg-[#0A444D]/5 border-[#0A444D]/20"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-start">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              isCompleted
                ? "bg-green-100 text-green-600"
                : isLocked
                ? "bg-gray-200 text-gray-500"
                : "bg-[#0A444D]/10 text-[#0A444D]"
            }`}
          >
            {isCompleted ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              week.weekNumber
            )}
          </div>

          <div>
            <p className="font-semibold text-[#0A444D]">
              Week {week.weekNumber}: {week.title}
            </p>
            <p className="text-xs text-gray-600">{week.content}</p>

            {!!week.assignmentSubmissions?.length && (
              <p className="text-xs text-green-500 mt-1">
                {week.assignmentSubmissions.length} assignment(s) submitted
              </p>
            )}
          </div>
        </div>

        {/* Action State */}
        {isCompleted ? (
          <span className="text-xs text-green-700 bg-green-100 rounded-full px-2 py-1">
            Done
          </span>
        ) : isLocked ? (
          <Lock className="w-4 h-4 text-gray-500" />
        ) : (
          <button
            onClick={() => onWeekNavigate(week.weekNumber)}
            className="px-3 py-1 bg-teal-600 text-white text-xs rounded-full hover:bg-teal-700 flex items-center gap-1"
          >
            Go <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};