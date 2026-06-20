/**
 * Centralized Admin API Client
 * Handles all API calls to the backend for the admin panel.
 * Uses the NEXT_PUBLIC_API_URL environment variable.
 */

const isProd = process.env.NODE_ENV === "production";
const BASE_URL = isProd ? "https://project-for-prem-backend.onrender.com/api/v1" : "http://localhost:8000/api/v1";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || "API request failed");
  }

  if (res.status === 204) return null as T;
  return res.json();
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
export const getDashboardKPIs = () => apiFetch<any>("/admin/dashboard/kpi");

// ─── NEWS ─────────────────────────────────────────────────────────────────────
export const getAllNews = () => apiFetch<any[]>("/content/news/all");
export const createNews = (data: any) => apiFetch<any>("/content/news", { method: "POST", body: JSON.stringify(data) });
export const updateNews = (id: string, data: any) => apiFetch<any>(`/content/news/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteNews = (id: string) => apiFetch<null>(`/content/news/${id}`, { method: "DELETE" });

// ─── TEAM MEMBERS ─────────────────────────────────────────────────────────────
export const getTeamMembers = () => apiFetch<any[]>("/content/team?active_only=false");
export const createTeamMember = (data: any) => apiFetch<any>("/content/team", { method: "POST", body: JSON.stringify(data) });
export const updateTeamMember = (id: string, data: any) => apiFetch<any>(`/content/team/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteTeamMember = (id: string) => apiFetch<null>(`/content/team/${id}`, { method: "DELETE" });

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const getAllTestimonials = () => apiFetch<any[]>("/content/testimonials/all");
export const createTestimonial = (data: any) => apiFetch<any>("/content/testimonials", { method: "POST", body: JSON.stringify(data) });
export const updateTestimonial = (id: string, data: any) => apiFetch<any>(`/content/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteTestimonial = (id: string) => apiFetch<null>(`/content/testimonials/${id}`, { method: "DELETE" });

// ─── CLIENT LOGOS ─────────────────────────────────────────────────────────────
export const getAllLogos = () => apiFetch<any[]>("/content/logos?active_only=false");
export const createLogo = (data: any) => apiFetch<any>("/content/logos", { method: "POST", body: JSON.stringify(data) });
export const updateLogo = (id: string, data: any) => apiFetch<any>(`/content/logos/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteLogo = (id: string) => apiFetch<null>(`/content/logos/${id}`, { method: "DELETE" });

// ─── ENQUIRIES ────────────────────────────────────────────────────────────────
export const getEnquiries = (params?: string) => apiFetch<any[]>(`/content/enquiries${params ? `?${params}` : ""}`);
export const updateEnquiry = (id: string, data: any) => apiFetch<any>(`/content/enquiries/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteEnquiry = (id: string) => apiFetch<null>(`/content/enquiries/${id}`, { method: "DELETE" });
export const exportEnquiriesCSV = () => `${BASE_URL}/content/enquiries/export-csv`;

// ─── CAREGIVER ENQUIRIES ──────────────────────────────────────────────────────
export const getCaregiverEnquiries = (params?: string) => apiFetch<any[]>(`/content/caregiver-enquiries${params ? `?${params}` : ""}`);
export const updateCaregiverEnquiry = (id: string, data: any) => apiFetch<any>(`/content/caregiver-enquiries/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteCaregiverEnquiry = (id: string) => apiFetch<null>(`/content/caregiver-enquiries/${id}`, { method: "DELETE" });
export const exportCaregiverCSV = () => `${BASE_URL}/content/caregiver-enquiries/export-csv`;

// ─── JOBS ─────────────────────────────────────────────────────────────────────
export const getJobs = () => apiFetch<any[]>("/jobs/");
export const createJob = (data: any) => apiFetch<any>("/jobs/", { method: "POST", body: JSON.stringify(data) });
export const updateJob = (id: string, data: any) => apiFetch<any>(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteJob = (id: string) => apiFetch<null>(`/jobs/${id}`, { method: "DELETE" });

// ─── APPLICATIONS & CANDIDATES ───────────────────────────────────────────────
export const getCandidates = () => apiFetch<any[]>("/candidates/");
export const getCandidate = (id: string) => apiFetch<any>(`/candidates/${id}`);
export const getApplications = () => apiFetch<any[]>("/candidates/applications");
export const getApplication = (id: string) => apiFetch<any>(`/candidates/applications/${id}`);
export const updateApplication = (id: string, data: any) => apiFetch<any>(`/candidates/applications/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const getCandidateTimeline = (candidateId: string) => apiFetch<any[]>(`/candidates/${candidateId}/timeline`);

// ─── USERS / ADMINS ───────────────────────────────────────────────────────────
export const getAdminUsers = () => apiFetch<any[]>("/users/?role=SUPER_ADMIN&limit=200");
export const getAllUsers = (params?: string) => apiFetch<any[]>(`/users/${params ? `?${params}` : ""}`);
export const createUser = (data: any) => apiFetch<any>("/users/", { method: "POST", body: JSON.stringify(data) });
export const updateUser = (id: string, data: any) => apiFetch<any>(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteUser = (id: string) => apiFetch<any>(`/users/${id}`, { method: "DELETE" });

// ─── ACTIVITY LOG ─────────────────────────────────────────────────────────────
export const getActivityFeed = (limit = 20) => apiFetch<any[]>(`/admin/activity-feed?limit=${limit}`);
