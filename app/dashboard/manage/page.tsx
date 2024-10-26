
'use client'; // Mark this component as a Client Component

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Target {
  id: number;
  name: string;
  description: string;
  pipelineStatus: string | null;
  markets: string[];
  lastUpdated: string;
  history?: { status: string | null; updatedAt: string }[]; // Marking as optional
}

const ManageTargets: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchTargets = async () => {
      const response = await fetch('/api/targets');
      const data = await response.json();
      setTargets(data);
    };
    fetchTargets();
  }, []);

  // Sort targets by the most recent history update
  const sortedTargets = [...targets].sort((a, b) => {
    const latestUpdateA = (a.history && a.history.length > 0)
      ? new Date(a.history[0].updatedAt)
      : new Date(0);

    const latestUpdateB = (b.history && b.history.length > 0)
      ? new Date(b.history[0].updatedAt)
      : new Date(0);

    return sortOrder === 'asc'
      ? latestUpdateA.getTime() - latestUpdateB.getTime()
      : latestUpdateB.getTime() - latestUpdateA.getTime();
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Targets</h1>
      
      {/* Navigation Buttons */}
      <div className="flex justify-end space-x-4 mb-4">
        <Link href="/" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">
          Return to Home
        </Link>
        <Link href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          Go to Dashboard
        </Link>
      </div>

      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Current Status</th>
            <th className="border border-gray-300 p-2">Last Updated</th>
            <th className="border border-gray-300 p-2 flex items-center">
              Status History 
              <button 
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="ml-2 text-sm text-blue-300 hover:text-blue-500 transition duration-200"
              >
                {sortOrder === 'asc' ? '🔼' : '🔽'}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTargets.map((target) => (
            <tr key={target.id} className="hover:bg-gray-100 transition duration-200">
              <td className="border border-gray-300 p-2 text-center">{target.id}</td>
              <td className="border border-gray-300 p-2">{target.name}</td>
              <td className="border border-gray-300 p-2 text-center">{target.pipelineStatus}</td>
              <td className="border border-gray-300 p-2 text-center">
                {new Date(target.lastUpdated).toLocaleString()}
              </td>
              <td className="border border-gray-300 p-2">
                <ul className="list-disc pl-5">
                  {Array.isArray(target.history) && target.history.length > 0 ? (
                    target.history.sort((a, b) => 
                      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() // Sort history in descending order
                    ).map((entry, index) => (
                      <li key={index} className="text-sm">
                        {entry.status} at {new Date(entry.updatedAt).toLocaleString()}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm">No history available</li>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ManageTargets;