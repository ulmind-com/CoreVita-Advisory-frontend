export type Role = "SUPER_ADMIN" | "ADMIN" | "RECRUITER" | "CLIENT";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  is_active: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  user?: User;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  description: string;
  managers: string[];
}

export type JobStatus = "OPEN" | "CLOSED" | "DRAFT";

export interface Job {
  id: string;
  title: string;
  description: string;
  company_id: string;
  recruiter_id: string;
  status: JobStatus;
  pipeline_stages: string[];
  salary_range: string;
  location?: string;
  industry?: string;
  job_type?: string;
  experience_level?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  cv_url: string;
  status: string;
}

export interface CandidateApplication {
  id: string;
  job_id: string;
  candidate_id: string;
  current_stage: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CLIENT" | "LOST";

export interface CRMLead {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: LeadStatus;
  assigned_to: string;
}

export type InvoiceStatus = "UNPAID" | "PAID" | "OVERDUE";

export interface Invoice {
  id: string;
  invoice_number: string;
  company_id: string;
  amount: number;
  due_date: string;
  status: InvoiceStatus;
}

export interface AdminStats {
  total_users: number;
  total_jobs: number;
  total_leads: number;
  total_revenue: number;
  open_jobs_count: number;
  new_leads_count: number;
}

export interface CMSPage {
  id?: string;
  slug: string;
  title: string;
  content: string;
  created_at?: string;
}

export interface CMSBlog {
  id?: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  created_at?: string;
}

export interface CMSService {
  id?: string;
  name: string;
  description: string;
  price?: number;
  created_at?: string;
}
