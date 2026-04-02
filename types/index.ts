export interface Spec {
  id: string;
  title: string;
  coverage: number;
  status: 'covered' | 'partial' | 'missing';
  components: string[];
}

export interface DashboardData {
  specifications: Spec[];
  totalCoverage: number;
}