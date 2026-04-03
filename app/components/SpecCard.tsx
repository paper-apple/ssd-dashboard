'use client';

import { Spec } from '@/types';
import { useState } from 'react';

interface SpecCardProps {
  spec: Spec;
}

// @req SDD-UI-005
export default function SpecCard({ spec }: SpecCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const statusConfig = {
    covered: { 
      color: 'green', 
      text: 'completely covered', 
      bg: 'bg-green-100 text-green-800',
      border: 'border-green-200'
    },
    partial: { 
      color: 'yellow', 
      text: 'Partially covered', 
      bg: 'bg-yellow-100 text-yellow-800',
      border: 'border-yellow-200'
    },
    missing: { 
      color: 'red', 
      text: 'Not covered', 
      bg: 'bg-red-100 text-red-800',
      border: 'border-red-200'
    },
  }[spec.status];

  const priorityConfig = {
    high: { text: 'High', color: 'text-red-600', bg: 'bg-red-50' },
    medium: { text: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    low: { text: 'Low', color: 'text-blue-600', bg: 'bg-blue-50' },
  }[spec.priority];

  const coverageColor = 
    spec.coverage >= 80 ? 'bg-green-500' :
    spec.coverage >= 20 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className={`border-2 rounded-lg p-5 shadow-sm ${statusConfig.border}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-mono text-sm font-bold text-gray-500">{spec.id}</h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig.bg}`}>
              {statusConfig.text}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color}`}>
              {priorityConfig.text} priority
            </span>
          </div>
          <h2 className="text-lg font-semibold mb-2">{spec.title}</h2>
          <p className="text-gray-600 text-sm">{spec.description}</p>
        </div>
        <div className="text-right ml-4">
          <div className="text-3xl font-bold">
            {spec.coverage}%
          </div>
        </div>
      </div>
      
      {/* @req SDD-UI-005 */}
      <div className="mt-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Coverage progress</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            data-testid="coverage-bar"
            className={`${coverageColor} h-3 rounded-full transition-all duration-700`}
            style={{ width: `${spec.coverage}%` }}
          />
        </div>
      </div>

      {spec.components.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Components ({spec.components.length})
            </span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              {expanded ? 'Hide ▲' : 'Show ▼'}
            </button>
          </div>
          {expanded && (
            <div className="mt-2 flex flex-wrap gap-2">
              {spec.components.map(comp => (
                <span key={comp} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                  {comp}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}