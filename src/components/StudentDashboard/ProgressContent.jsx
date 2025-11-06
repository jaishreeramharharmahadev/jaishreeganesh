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
  FolderOpen,
  ArrowRight,
} from "lucide-react";

function ProgressContent({ applicant, progressPercent, submittedAssignmentsCount, weeksWithSubmissions, onWeekNavigate }) {
  const { learningPath = [], startDate, endDate, projects = [] } = applicant;
  
  // Calculate days left (don't show negative days)
  const daysLeft = Math.max(0, Math.ceil(
    (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
  ));
  
  // Calculate completed assignments (weeks completed)
  const completedWeeks = learningPath.filter((w) => w.completed).length;
  
  // Calculate total days and timeline progress
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

  // Calculate assignment statistics
  const totalAssignmentsSubmitted = submittedAssignmentsCount || 0;
  const weeksWithAssignments = weeksWithSubmissions || 0;

  return (
    <div className="space-y-5">
      {/* Progress Overview */}
      <div className="bg-white rounded-md shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Internship Progress
        </h3>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-md border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">
              {progressPercent}%
            </div>
            <div className="text-sm font-medium text-blue-800 mt-1">
              Overall Progress
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-md border border-green-100">
            <div className="text-2xl font-bold text-green-600">
              {projects.length}
            </div>
            <div className="text-sm font-medium text-green-800 mt-1">
              Projects Submitted
            </div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-md border border-purple-100">
            <div className="text-2xl font-bold text-purple-600">
              {totalAssignmentsSubmitted}
            </div>
            <div className="text-sm font-medium text-purple-800 mt-1">
              Assignments Submitted
            </div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-md border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">
              {daysLeft}
            </div>
            <div className="text-sm font-medium text-orange-800 mt-1">
              Days Left
            </div>
          </div>
        </div>

        {/* Timeline Progress */}
        <div className="bg-gray-50 rounded-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-900">Internship Timeline</h4>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(timelineProgress)}% of time elapsed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${timelineProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Start: {new Date(startDate).toLocaleDateString()}</span>
            <span>End: {new Date(endDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Detailed Progress Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Summary */}
        <div className="bg-white rounded-md shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <FolderOpen className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Projects Summary
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-800">Total Projects</span>
              <span className="text-lg font-bold text-green-600">{projects.length}</span>
            </div>
            {projects.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 font-medium">Recent Projects:</p>
                {projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <FileCode className="w-4 h-4 text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {project.projectName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {project.submissionDate ? 
                          new Date(project.submissionDate).toLocaleDateString() : 
                          'Submitted'
                        }
                      </p>
                    </div>
                  </div>
                ))}
                {projects.length > 3 && (
                  <p className="text-xs text-gray-500 text-center">
                    +{projects.length - 3} more projects
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <FileCode className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No projects submitted yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Assignments Summary */}
        <div className="bg-white rounded-md shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Assignments Summary
            </h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">{totalAssignmentsSubmitted}</div>
                <div className="text-xs font-medium text-purple-800">Total Submissions</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{weeksWithAssignments}</div>
                <div className="text-xs font-medium text-blue-800">Weeks with Submissions</div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Weekly Completion Rate:</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completedWeeks / learningPath.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>{completedWeeks}/{learningPath.length} weeks completed</span>
                <span>{Math.round((completedWeeks / learningPath.length) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-md shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Weekly Progress
        </h3>
        <div className="space-y-4">
          {learningPath.map((week) => (
            <div
              key={week.weekNumber}
              className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-md flex items-center justify-center ${
                    week.completed
                      ? "bg-green-100 text-green-600"
                      : week.locked
                      ? "bg-gray-100 text-gray-400"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {week.completed ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : week.locked ? (
                    <Lock className="w-6 h-6" />
                  ) : (
                    <FileText className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Week {week.weekNumber}
                  </h4>
                  <p className="text-sm text-gray-600">{week.title}</p>
                  {week.assignmentSubmissions && week.assignmentSubmissions.length > 0 && (
                    <p className="text-xs text-purple-600 mt-1">
                      {week.assignmentSubmissions.length} assignment(s) submitted
                    </p>
                  )}
                  {week.completed && week.completedAt && (
                    <p className="text-xs text-green-600">
                      Completed on {new Date(week.completedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      week.completed
                        ? "bg-green-100 text-green-800"
                        : week.locked
                        ? "bg-gray-100 text-gray-600"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {week.completed
                      ? "Completed"
                      : week.locked
                      ? "Locked"
                      : "Available"}
                  </div>
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
                {week.unlockDate && !week.completed && (
                  <p className="text-xs text-gray-500 mt-1">
                    Unlocks: {new Date(week.unlockDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressContent;