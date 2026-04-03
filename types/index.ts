export type Status = 'covered' | 'partial' | 'missing';
export type Priority = 'high' | 'medium' | 'low';

// @req SDD-DATA-001
export interface Spec {
  id: string;
  title: string;
  description: string;
  coverage: number;
  status: Status;
  components: string[];
  priority: Priority;
  lastUpdated: string;
}

export interface DashboardData {
  specifications: Spec[];
  totalCoverage: number;
}

export interface FilterOptions {
  status: Status | 'all';
  priority: Priority | 'all';
  search: string;
  minCoverage: number;
}