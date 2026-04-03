'use client';

import { Spec } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CoverageChartProps {
  specifications: Spec[];
}

// @req SDD-UI-006
export default function CoverageChart({ specifications }: CoverageChartProps) {
  const getBarColor = (coverage: number) => {
    if (coverage >= 80) return '#10b981';
    if (coverage >= 30) return '#f59e0b';
    return '#ef4444';
  };
 
  const data = specifications.map(spec => ({
    name: spec.id,
    coverage: spec.coverage,
    status: spec.status,
    fill: getBarColor(spec.coverage)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded border">
          <p className="font-semibold text-sm">{label}</p>
          <p className="text-blue-600 text-lg font-bold">{payload[0].value}%</p>
          <p className="text-xs text-gray-500 mt-1">covering</p>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props: any) => {
    const { x, y, width, height, payload } = props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.fill}
        rx={4}
        ry={4}
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl text-center font-semibold mb-4">Specification Coverage</h2>
      <div className="h-80">

        {/* Adaptive container */}
        <ResponsiveContainer width="100%" height="100%"> 

          {/* Histogram */}
          <BarChart data={data} layout="vertical" margin={{ left: 60, right: 30 }}> 
            {/* @req SDD-UI-006*/}
            <CartesianGrid strokeDasharray="3 3" /> 
            <XAxis type="number" domain={[0, 100]} unit="%" />
            <YAxis type="category" dataKey="name" width={80} /> 
            <Tooltip content={<CustomTooltip />} /> 
            
            {/* Histogram columns */}
            <Bar 
              dataKey="coverage" 
              shape={<CustomBar />}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}