'use client';

import { FilterOptions, Status, Priority } from '@/types';

interface FiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

// @req SDD-UI-003
// @req SDD-UI-004
export default function Filters({ filters, onFilterChange }: FiltersProps) {
  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* @req SDD-UI-004 */}
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="search">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="ID or name..."
            className="w-full pl-1 py-3 border rounded-lg focus:border-blue-500 tracking-tight text-sm"
          />
        </div>

        {/* @req SDD-UI-003 */}
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">
            Status
          </label>
          <select
            value={filters.status}
            id="status"
            onChange={(e) => updateFilter('status', e.target.value as Status | 'all')}
            className="w-full py-3 border rounded-lg tracking-tight text-sm"
          >
            <option value="all">All</option>
            <option value="covered">Covered (≥80%)</option>
            <option value="partial">Partial (21-79%)</option>
            <option value="missing">Missing (≤20%)</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="priority">
            Priority
          </label>
          <select
            value={filters.priority}
            id="priority"
            onChange={(e) => updateFilter('priority', e.target.value as Priority | 'all')}
            className="w-full py-3 border rounded-lg tracking-tight text-sm"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Minimal coverage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coverage: {filters.minCoverage}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minCoverage}
            onChange={(e) => updateFilter('minCoverage', Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Reset filter */}
      {(filters.status !== 'all' || filters.priority !== 'all' || filters.search || filters.minCoverage > 0) && (
        <div className="mt-3 text-right">
          <button
            onClick={() => onFilterChange({
              status: 'all',
              priority: 'all',
              search: '',
              minCoverage: 0
            })}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reset filter ✖
          </button>
        </div>
      )}
    </div>
  );
}