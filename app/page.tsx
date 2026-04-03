'use client';

import { useState, useEffect, useMemo } from 'react';
import type { DashboardData, FilterOptions } from '@/types';
import StatsCards from '@/app/components/StatsCards';
import CoverageChart from '@/app/components/CoverageChart';
import Filters from '@/app/components/Filters';
import SpecCard from '@/app/components/SpecCard';

// @req SDD-UI-001
// @req SDD-UI-002
export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    search: '',
    minCoverage: 0
  });

  // Uploading test data
  useEffect(() => {
    fetch('/api/specs')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error loading data:', err))
      .finally(() => setLoading(false));
  }, []);

  // Data filtering
  const filteredSpecs = useMemo(() => {
    if (!data) return [];
    
    return data.specifications.filter(spec => {
      if (filters.status !== 'all' && spec.status !== filters.status) return false;
      if (filters.priority !== 'all' && spec.priority !== filters.priority) return false;
      if (spec.coverage < filters.minCoverage) return false;
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return spec.id.toLowerCase().includes(searchLower) || 
               spec.title.toLowerCase().includes(searchLower);
      }
      
      return true;
    });
  }, [data, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Uploading data</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Data upload error</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* @req SDD-UI-001 */}
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
            SDD Dashboard
          </h1>
          <p className="text-gray-600 text-center">
            Monitoring the coverage of specifications and components
          </p>
        </div>

        {/* @req SDD-UI-002 */}
        {/* Statistics */}
        <StatsCards specifications={filteredSpecs} />
       
        {/* @req SDD-UI-006 */}
        {/* Histogram */}
        <CoverageChart specifications={filteredSpecs} />

        {/* @req SDD-UI-003, @req SDD-UI-004 */}
        {/* Adding filters */}
        <Filters filters={filters} onFilterChange={setFilters} />

        {/* Number of specifications found */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            specifications
          </h2>
          <span className="text-sm text-gray-500">
            Found: {filteredSpecs.length} of {data.specifications.length}
          </span>
        </div>

        {/* @req SDD-UI-05 */}
        {/* Specification cards */}
        {filteredSpecs.length === 0 ? (
          <div 
            className="bg-white rounded-lg shadow p-8 text-center"
          >
            <p className="text-gray-500 text-lg">Nothing was found</p>
            <p className="text-gray-400 text-sm mt-2">Try changing the filtering settings</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSpecs.map((spec) => (
              <SpecCard key={spec.id} spec={spec} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}