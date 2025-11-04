// src/api/endpoints.js
export const AUTH = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
};

export const INTERNSHIPS = {
  LIST: "/internships",
  GET_BY_ID: (id) => `/internships/${id}`,
  CREATE: "/internships",
  APPLY: "/internships/apply",
};

export const APPLICANTS = {
  ME: "/applicants/me",
  WEEK: (weekNumber) => `/applicants/week/${weekNumber}`,
  COMPLETE_WEEK: "/applicants/complete-week",
  ASSIGNMENT: (weekNumber) => `/applicants/assignment/${weekNumber}`,
  PROJECT: "/applicants/project",
};

export const CERTIFICATES = {
  DOWNLOAD: (uniqueId) => `/certificates/download/${encodeURIComponent(uniqueId)}`,
  GENERATE: (uniqueId) => `/certificates/generate/${uniqueId}`,
  VERIFY: (certNumber) => `/certificates/verify/${encodeURIComponent(certNumber)}`,
};

export const FEEDBACK = {
  AVAILABLE: (uniqueId) => `/feedback/available/${uniqueId}`,
};