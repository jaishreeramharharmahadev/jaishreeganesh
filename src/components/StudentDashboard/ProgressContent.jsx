import React from "react";
import {
  CheckCircle,
  Clock,
  FileText,
  Lock,
  ArrowRight,
  FolderOpen,
  FileCode,
  BarChart3,
} from "lucide-react";

function ProgressContent({
  applicant,
  progressPercent,
  submittedAssignmentsCount,
  weeksWithSubmissions,
  onWeekNavigate,
}) {
  const { learningPath = [], startDate, endDate, projects = [] } = applicant;

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24))
  );

  const completedWeeks = learningPath.filter((w) => w.completed).length;

  const totalDays = Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );
  const daysPassed = Math.ceil(
    (new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );
  const timelineProgress = Math.min(
    100,
    Math.max(0, (daysPassed / totalDays) * 100)
  );

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-md shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-[#0A444D] mb-6">
          Internship Progress
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Overall Progress" value={`${progressPercent}%`} icon={<BarChart3 />} />
          <StatCard title="Projects Submitted" value={projects.length} icon={<FolderOpen />} />
          <StatCard title="Assignments Submitted" value={submittedAssignmentsCount} icon={<FileText />} />
          <StatCard title="Days Left" value={daysLeft} icon={<Clock />} />
        </div>

        <div className="bg-gray-50 rounded-md p-5">
          <div className="flex justify-between text-sm font-medium text-[#0A444D] mb-2">
            <span>Start: {new Date(startDate).toLocaleDateString()}</span>
            <span>{Math.round(timelineProgress)}% Time Passed</span>
            <span>End: {new Date(endDate).toLocaleDateString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#0A444D] h-3 rounded-full"
              style={{ width: `${timelineProgress}%` }}
            ></div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <section className="bg-white rounded-md shadow-sm border p-6">
          <SectionHeader title="Projects Summary" icon={<FolderOpen />} />
          <SummaryTag label="Total Projects" value={projects.length} />

          {projects.length ? (
            projects.slice(0, 3).map((p, i) => (
              <ItemCard
                key={i}
                title={p.projectName}
                subtitle={p.submissionDate && new Date(p.submissionDate).toLocaleDateString()}
                icon={<FileCode className="w-5 h-5 text-[#0A444D]" />}
              />
            ))
          ) : (
            <EmptyState message="No projects submitted yet" icon={<FileCode />} />
          )}
        </section>

        <section className="bg-white rounded-md shadow-sm border p-6">
          <SectionHeader title="Assignments Summary" icon={<FileText />} />

          <SummaryTag label="Submitted Assignments" value={submittedAssignmentsCount} />

          <div className="mt-4">
            <p className="text-sm font-semibold text-[#0A444D] mb-1">
              Weekly Completion
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#0A444D] h-2 rounded-full"
                style={{
                  width: `${(completedWeeks / learningPath.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-[#0A444D] mt-1">
              {completedWeeks}/{learningPath.length} weeks completed
            </p>
          </div>
        </section>
      </div>

      <section className="bg-white rounded-md shadow-sm border p-6">
        <h3 className="text-xl font-semibold text-[#0A444D] mb-4">
          Weekly Progress
        </h3>

        <div className="space-y-4">
          {learningPath.map((week) => (
            <WeekRow key={week.weekNumber} week={week} onWeekNavigate={onWeekNavigate} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProgressContent;

const StatCard = ({ title, value, icon }) => (
  <div className="text-center p-4 bg-gray-100 rounded-md border border-[#0A444D]/20">
    <div className="text-2xl font-bold text-[#0A444D]">{value}</div>
    <p className="text-sm text-[#0A444D] font-medium">{title}</p>
  </div>
);

const SectionHeader = ({ title, icon }) => (
  <div className="flex items-center gap-3 mb-4 text-[#0A444D]">
    {icon}
    <h3 className="text-lg text-[#0A444D] font-semibold">{title}</h3>
  </div>
);

const SummaryTag = ({ label, value }) => (
  <div className="px-4 py-3 bg-gray-100 rounded-lg flex justify-between mb-2">
    <span className="font-medium text-[#0A444D]">{label}</span>
    <span className="font-semibold text-[#0A444D]">{value}</span>
  </div>
);

const ItemCard = ({ icon, title, subtitle }) => (
  <div className="flex gap-3 items-center px-3 py-2 border rounded-lg hover:shadow-md transition">
    {icon}
    <div className="flex-1 min-w-0">
      <p className="font-medium text-[#0A444D] truncate">{title}</p>
      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  </div>
);

const EmptyState = ({ message, icon }) => (
  <div className="text-center py-6 text-gray-500">
    <div className="mb-2 flex justify-center">{icon}</div>
    <p className="text-sm">{message}</p>
  </div>
);

const WeekRow = ({ week, onWeekNavigate }) => {
  const { weekNumber, title, completed, locked, completedAt, unlockDate } = week;

  return (
    <div className="flex justify-between items-center p-4 bg-[#0A444D]/5 rounded-md border hover:border-[#0A444D] transition">
      <div className="text-[#0A444D]">
        <p className="font-semibold">
          Week {weekNumber}: {title}
        </p>

        {completed && completedAt && (
          <p className="text-xs text-green-700 mt-1">
            Completed on {new Date(completedAt).toLocaleDateString()}
          </p>
        )}

        {locked && unlockDate && !completed && (
          <p className="text-xs text-gray-500 mt-1">
            Unlocks on {new Date(unlockDate).toLocaleDateString()}
          </p>
        )}

        {!!week.assignmentSubmissions?.length && (
          <p className="text-xs text-teal-700 mt-1">
            {week.assignmentSubmissions.length} assignment(s) submitted
          </p>
        )}
      </div>

      {completed ? (
        <span className="px-3 py-1 text-xs bg-green-200 text-green-900 rounded-full">
          Completed
        </span>
      ) : locked ? (
        <span className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full flex items-center gap-1">
          <Lock className="w-4 h-4" /> Locked
        </span>
      ) : (
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-full">
            Pending
          </span>
          <button
            onClick={() => onWeekNavigate(weekNumber)}
            className="px-4 py-1 text-xs text-white bg-[#0A444D] rounded-full hover:bg-[#08353c] flex items-center gap-1"
          >
            Go <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};