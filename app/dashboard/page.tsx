// app/dashboard/page.tsx

'use client'; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import BarChart from '@/components/BarChart';
import TargetTable from '@/components/TargetTable';
import Link from 'next/link'; // Import Link for navigation// Import useRouter for navigation

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
  const [search, setSearch] = useState<string>(''); // State for search input
 

  useEffect(() => {
      const fetchTargets = async () => {
          const response = await fetch('/api/targets');
          const data = await response.json();
          setTargets(data);
      };
      fetchTargets();
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string | null) => {
      const currentTimestamp = new Date().toISOString(); // Get the current timestamp

      // Update the targets state with the new status and current timestamp
      setTargets((prevTargets) =>
          prevTargets.map((target) =>
              target.id === id
                  ? { ...target, pipelineStatus: newStatus, lastUpdated: currentTimestamp }
                  : target
          )
      );

      // Make a PATCH API request to update the backend data
      await fetch(`/api/targets/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
              pipelineStatus: newStatus,
              lastUpdated: currentTimestamp, // Include the updated timestamp
          }),
          headers: {
              'Content-Type': 'application/json',
          },
      });
  };

  const filteredTargets = targets
  .filter((target) => 
    (filter === 'All' || target.pipelineStatus === filter) &&
    target.name.toLowerCase().includes(search.toLowerCase()) // Filter by search input
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
      <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Target Management Dashboard</h1>
          
          <div className="flex justify-center space-x-4 mb-4">
        {/* Home Button */}
        <Link href="/" className="inline-block bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-lg shadow-md transition duration-300">
            Go to Home
        </Link>
        
        {/* Manage Targets Button */}
        <Link href="/dashboard/manage">
            <button className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300 shadow-md">
                Manage Targets
            </button>
        </Link>
    </div>

           {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name..."
          className="p-2 border border-gray-300 rounded-lg w-1/3 text-lg mr-2"
        />
        {/* Pipeline Status Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-1/3 text-lg"
        >
          <option value="All">All Statuses</option>
          <option value="Hot">Hot</option>
          <option value="Active">Active</option>
          <option value="Cold">Cold</option>
          <option value="Closed">Closed</option>
          <option value="Passed">Passed</option>
        </select>
      </div>


          <BarChart data={chartData} />

          <TargetTable targets={filteredTargets} onUpdateStatus={handleUpdateStatus} />
      </div>
  );
};


export default DashboardPage;