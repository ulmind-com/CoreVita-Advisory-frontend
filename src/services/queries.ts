/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './api';
import {
  User, AuthResponse, Company, Job, Candidate, CRMLead, Invoice, AdminStats
} from '../types';

// ============================================================================
// AUTH & USER HOOKS
// ============================================================================
export const useUser = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const { data } = await api.get<User>('/users/me');
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const { data } = await api.get<AdminStats>('/admin/dashboard/kpi');
      return data;
    },
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await api.get<User[]>('/users');
      return data;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: any) => {
      const { data } = await api.post<User>('/users', userData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { data } = await api.put<User>(`/users/${id}`, updateData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/users/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

// ============================================================================
// JOBS HOOKS
// ============================================================================
export const useJobs = (statusFilter?: string) => {
  return useQuery({
    queryKey: ['jobs', { statusFilter }],
    queryFn: async () => {
      const params = statusFilter ? { status_filter: statusFilter } : {};
      const { data } = await api.get<Job[]>('/jobs', { params });
      return data;
    },
    retry: false,
    staleTime: 30 * 1000,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newJob: Partial<Job>) => {
      const { data } = await api.post<Job>('/jobs', newJob);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { data } = await api.put<Job>(`/jobs/${id}`, updateData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/jobs/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jobs'] }),
  });
};

// ============================================================================
// CANDIDATES HOOKS
// ============================================================================
export const useCandidates = (skills?: string) => {
  return useQuery({
    queryKey: ['candidates', { skills }],
    queryFn: async () => {
      const params = skills ? { skills } : {};
      const { data } = await api.get<Candidate[]>('/candidates', { params });
      return data;
    },
  });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (candidateData: any) => {
      const { data } = await api.post<Candidate>('/candidates', candidateData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidates'] }),
  });
};

export const useUpdateCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { data } = await api.put<Candidate>(`/candidates/${id}`, updateData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidates'] }),
  });
};

export const useDeleteCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/candidates/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['candidates'] }),
  });
};

export const useUpdateApplicationStage = () => {
  return useMutation({
    mutationFn: async ({ applicationId, stage, notes }: { applicationId: string; stage: string; notes?: string }) => {
      const { data } = await api.put(`/candidates/applications/${applicationId}/stage`, { stage, notes });
      return data;
    }
  });
};

// ============================================================================
// COMPANIES HOOKS
// ============================================================================
export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data } = await api.get<Company[]>('/companies');
      return data;
    },
    retry: false,
    staleTime: 60 * 1000,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (companyData: any) => {
      const { data } = await api.post<Company>('/companies', companyData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['companies'] }),
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { data } = await api.put<Company>(`/companies/${id}`, updateData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['companies'] }),
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/companies/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['companies'] }),
  });
};

// ============================================================================
// CRM LEADS HOOKS
// ============================================================================
export const useCRMLeads = () => {
  return useQuery({
    queryKey: ['crm'],
    queryFn: async () => {
      const { data } = await api.get<CRMLead[]>('/crm');
      return data;
    },
  });
};

export const useCreateCRMLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (leadData: any) => {
      const { data } = await api.post<CRMLead>('/crm', leadData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['crm'] }),
  });
};

export const useUpdateCRMLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { data } = await api.put<CRMLead>(`/crm/${id}`, updateData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['crm'] }),
  });
};

export const useDeleteCRMLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/crm/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['crm'] }),
  });
};

// ============================================================================
// BILLING HOOKS
// ============================================================================
export const useInvoices = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data } = await api.get<Invoice[]>('/billing/invoices');
      return data;
    },
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invoiceData: any) => {
      const { data } = await api.post<Invoice>('/billing/invoices', invoiceData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['invoices'] }),
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { data } = await api.put<Invoice>(`/billing/invoices/${id}`, updateData);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['invoices'] }),
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/billing/invoices/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['invoices'] }),
  });
};

// ============================================================================
// PUBLIC CMS HOOKS
// ============================================================================
export const useCMSPages = () => {
  return useQuery({
    queryKey: ['cms', 'pages'],
    queryFn: async () => {
      const { data } = await api.get<any[]>('/cms/pages');
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCMSPage = (slug: string) => {
  return useQuery({
    queryKey: ['cms', 'page', slug],
    queryFn: async () => {
      const { data } = await api.get<any>(`/cms/pages/${slug}`);
      return data;
    },
    retry: false,
  });
};

export const useCMSBlogs = () => {
  return useQuery({
    queryKey: ['cms', 'blogs'],
    queryFn: async () => {
      const { data } = await api.get<any[]>('/cms/blogs');
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCMSBlog = (slug: string) => {
  return useQuery({
    queryKey: ['cms', 'blog', slug],
    queryFn: async () => {
      const { data } = await api.get<any>(`/cms/blogs/${slug}`);
      return data;
    },
    retry: false,
  });
};

export const useCMSServices = () => {
  return useQuery({
    queryKey: ['cms', 'services'],
    queryFn: async () => {
      const { data } = await api.get<any[]>('/cms/services');
      return data;
    },
  });
};
