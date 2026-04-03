'use client';

import { Spec } from '@/types';

interface StatsCardsProps {
  specifications: Spec[];
}

// @req SDD-UI-002
export default function StatsCards({ specifications }: StatsCardsProps) {
  const total = specifications.length;
  const covered = specifications.filter(s => s.coverage >= 80).length;
  const partial = specifications.filter(s => s.coverage >= 20 && s.coverage < 80).length;
  const missing = specifications.filter(s => s.coverage < 20).length;
  
  const avgCoverage = specifications.reduce((sum, s) => sum + s.coverage, 0) / total;
  
  // @req SDD-UI-002
  const stats = [
    {
      title: 'Average coverage',
      value: `${avgCoverage.toFixed(1)}%`,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      icon: '📊'
    },
    {
      title: 'Fully covered',
      value: covered,
      color: 'text-green-600',
      bg: 'bg-green-100',
      icon: '✅',
      total: total
    },
    {
      title: 'Partly covered',
      value: partial,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      icon: '⚠️',
      total: total
    },
    {
      title: 'Not covered',
      value: missing,
      color: 'text-red-600',
      bg: 'bg-red-100',
      icon: '❌',
      total: total
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* @req SDD-UI-002 */}
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{stat.icon}</span>
            <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
          {stat.total && (
            <p className="text-xs text-gray-400 mt-1">
              out of {stat.total} specifications
            </p>
          )}
        </div>
      ))}
    </div>
  );
}