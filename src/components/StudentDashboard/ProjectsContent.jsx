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
  Upload,
  Search,
  ExternalLink,
  FileCode,
  Linkedin
} from "lucide-react";

function ProjectsContent({ applicant, submitProject, projectUploading }) {
  const [formErrors, setFormErrors] = useState({
    projectName: false,
    projectDescription: false,
    linkedinLink: false,
    consentAccuracy: false,
    consentTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const errors = {
      projectName: !formData.get('projectName')?.trim(),
      projectDescription: !formData.get('projectDescription')?.trim(),
      linkedinLink: !formData.get('linkedinLink')?.trim(),
      consentAccuracy: !formData.get('consentAccuracy'),
      consentTerms: !formData.get('consentTerms')
    };

    setFormErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error);
    
    if (!hasErrors) {
      submitProject(e);
    }
  };

  const handleInputChange = (fieldName) => {
    // Clear error when user starts typing in a field
    if (formErrors[fieldName]) {
      setFormErrors(prev => ({
        ...prev,
        [fieldName]: false
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Project Submission Form */}
      <div className="bg-white rounded-md shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Submit New Project
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              name="projectName"
              placeholder="Enter project name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-2 focus:outline-green-500 ${
                formErrors.projectName ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={() => handleInputChange('projectName')}
            />
            {formErrors.projectName && (
              <p className="text-red-500 text-sm mt-1">Project name is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="projectDescription"
              rows={3}
              placeholder="Describe your project..."
              className={`w-full px-3 py-2 border rounded-md focus:outline-2 focus:outline-green-500 ${
                formErrors.projectDescription ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={() => handleInputChange('projectDescription')}
            />
            {formErrors.projectDescription && (
              <p className="text-red-500 text-sm mt-1">Description is required</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Live Demo URL
              </label>
              <input
                name="liveLink"
                type="url"
                placeholder="https://your-project.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-2 focus:outline-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Github className="w-4 h-4 inline mr-2" />
                GitHub Repository of Project
              </label>
              <input
                name="githubLink"
                type="url"
                placeholder="https://github.com/your-repo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-2 focus:outline-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Linkedin className="w-4 h-4 inline mr-2" />
                LinkedIn link of your project <span className="text-red-500">*</span>
              </label>
              <input
                name="linkedinLink"
                type="url"
                placeholder="https://linkedin.com/your-project"
                className={`w-full px-3 py-2 border rounded-md focus:outline-2 focus:outline-green-500 ${
                  formErrors.linkedinLink ? 'border-red-500' : 'border-gray-300'
                }`}
                onChange={() => handleInputChange('linkedinLink')}
              />
              {formErrors.linkedinLink && (
                <p className="text-red-500 text-sm mt-1">LinkedIn link is required</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Report (PDF)
            </label>
            <input
              type="file"
              name="reportPdf"
              accept=".pdf"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-2 focus:outline-green-500"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="consentAccuracy"
                className="w-4 h-4"
                onChange={() => handleInputChange('consentAccuracy')}
              />
              <span className="text-sm text-gray-700">
                I confirm the information is accurate
              </span>
            </label>
            {formErrors.consentAccuracy && (
              <p className="text-red-500 text-sm ml-7">This confirmation is required</p>
            )}

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="consentTerms"
                className="w-4 h-4"
                onChange={() => handleInputChange('consentTerms')}
              />
              <span className="text-sm text-gray-700">
                I agree to the terms & conditions
              </span>
            </label>
            {formErrors.consentTerms && (
              <p className="text-red-500 text-sm ml-7">You must agree to the terms</p>
            )}
          </div>

          {/* Warning Message */}
          <div className="">
            <p className="text-red-500 text-sm">
              ⚠️ Important: Submitted projects cannot be edited or deleted. Please verify all information before submission.
            </p>
          </div>

          <button
            type="submit"
            disabled={projectUploading}
            className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {projectUploading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Submitting Project...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Submit Project</span>
              </div>
            )}
          </button>
        </form>
      </div>

      {/* Submitted Projects */}
      <div className="bg-white rounded-md shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Your Projects
        </h3>
        <div className="space-y-4">
          {applicant.projects && applicant.projects.length > 0 ? (
            applicant.projects.map((project) => (
              <div
                key={project._id}
                className="border rounded-xl p-4 hover:border-indigo-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {project.projectName}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {project.submissionDate
                      ? new Date(project.submissionDate).toLocaleDateString()
                      : "Submitted"}
                  </span>
                </div>

                {project.projectDescription && (
                  <p className="text-gray-600 text-sm mb-3">
                    {project.projectDescription}
                  </p>
                )}

                <div className="space-y-2">
                  {project.liveLink && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {project.githubLink && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Github className="w-4 h-4 text-gray-400" />
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                      >
                        <span>Source Code</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {project.linkedinLink && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Linkedin className="w-4 h-4 text-gray-400" />
                      <a
                        href={project.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                      >
                        <span>Project in LinkedIn</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileCode className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No projects submitted yet</p>
              <p className="text-sm">Start by submitting your first project!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsContent;