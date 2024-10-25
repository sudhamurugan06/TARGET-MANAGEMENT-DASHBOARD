// app/dashboard/page.tsx

'use client'; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import BarChart from '@/components/BarChart';
import TargetTable from '@/components/TargetTable';

interface Target {
  id: number;
  name: string;
  description: string;
  pipelineStatus: string | null;
  markets: string[];
  lastUpdated: string;
}

const DashboardPage: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
      const fetchTargets = async () => {
          const response = await fetch('/api/targets');
          const data = await response.json();
          setTargets(data);
      };
      fetchTargets();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string | null) => {
      // Update the targets state
      setTargets((prevTargets) =>
          prevTargets.map((target) =>
              target.id === id ? { ...target, pipelineStatus: newStatus } : target
          )
      );

      // Make a PATCH API request to update the backend data
      await fetch(`/api/targets/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ pipelineStatus: newStatus }),
          headers: {
              'Content-Type': 'application/json',
          },
      });
  };

  const filteredTargets = targets.filter((target) =>
      filter === 'All' || target.pipelineStatus === filter
  );

  const groupedData = filteredTargets.reduce((acc, target) => {
      const status = target.pipelineStatus || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
  }, {} as { [key: string]: number });

  const chartData = {
      labels: Object.keys(groupedData),
      values: Object.values(groupedData),
  };

  return (
      <div>
          <h1>Target Management Dashboard</h1>
          <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded"
          >
              <option value="All">All</option>
              <option value="Hot">Hot</option>
              <option value="Active">Active</option>
              <option value="Cold">Cold</option>
              <option value="Closed">Closed</option>
              <option value="Passed">Passed</option>
          </select>
          <BarChart data={chartData} />
          <TargetTable targets={filteredTargets} onUpdateStatus={handleUpdateStatus} />
      </div>
  );
};

export default DashboardPage;