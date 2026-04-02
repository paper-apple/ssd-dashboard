'use client';

import { useEffect, useState } from 'react';
import type { DashboardData, Spec } from '@/types';

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'covered' | 'partial' | 'missing'>('all');

  useEffect(() => {
    fetch('/api/specs')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-gray-500">Загрузка метрик покрытия...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-red-500">Ошибка загрузки данных</div>
      </div>
    );
  }

  const filteredSpecs = data.specifications.filter(spec => 
    filter === 'all' ? true : spec.status === filter
  );

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">SDD Navigator Dashboard</h1>
      <p className="text-gray-600 mb-6">Метрики покрытия спецификаций</p>

      {/* Общая метрика */}
      <div className="mb-6 p-4 rounded-lg border">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium text-gray-600">Общее покрытие</span>
            <div className="text-3xl font-bold text-blue-600">{data.totalCoverage}%</div>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600">Всего спецификаций</span>
            <div className="text-2xl font-semibold">{data.specifications.length}</div>
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${data.totalCoverage}%` }}
          />
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex gap-2 mb-6">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          Все ({data.specifications.length})
        </FilterButton>
        <FilterButton active={filter === 'covered'} onClick={() => setFilter('covered')}>
          Покрытые
        </FilterButton>
        <FilterButton active={filter === 'partial'} onClick={() => setFilter('partial')}>
          Частичные
        </FilterButton>
        <FilterButton active={filter === 'missing'} onClick={() => setFilter('missing')}>
          Отсутствуют
        </FilterButton>
      </div>

      {/* Список спецификаций */}
      <div className="grid gap-4">
        {filteredSpecs.map((spec) => (
          <SpecCard key={spec.id} spec={spec} />
        ))}
        {filteredSpecs.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Нет спецификаций с таким статусом
          </div>
        )}
      </div>
    </main>
  );
}

// Компонент кнопки фильтра
function FilterButton({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

// Компонент карточки спецификации
function SpecCard({ spec }: { spec: Spec }) {
  const statusConfig = {
    covered: { text: 'Покрыта', bg: 'bg-green-100 text-green-800' },
    partial: { text: 'Частично', bg: 'bg-yellow-100 text-yellow-800' },
    missing: { text: 'Отсутствует', bg: 'bg-red-100 text-red-800' },
  }[spec.status];

  const coverageColor = 
    spec.coverage >= 80 ? 'bg-green-500' :
    spec.coverage >= 40 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-sm font-semibold text-gray-500">{spec.id}</h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig.bg}`}>
              {statusConfig.text}
            </span>
          </div>
          <h2 className="text-lg font-semibold mt-1">{spec.title}</h2>
        </div>
        <div className="text-2xl font-bold">
          {spec.coverage}%
        </div>
      </div>
      
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${coverageColor} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${spec.coverage}%` }}
          />
        </div>
      </div>

      {spec.components.length > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          <span className="font-medium">Компоненты:</span>{' '}
          {spec.components.join(', ')}
        </div>
      )}
    </div>
  );
}