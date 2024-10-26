import React, { useState } from 'react';

interface Target {
  id: number;
  name: string;
  description: string;
  pipelineStatus: string | null;
  markets: string[];
  lastUpdated: string;
}

interface TargetTableProps {
  targets: Target[];
  onUpdateStatus: (id: number, newStatus: string | null) => Promise<void>;
}

const PAGE_SIZE = 10; // Number of targets per page

const TargetTable: React.FC<TargetTableProps> = ({ targets, onUpdateStatus }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortKey, setSortKey] = useState<keyof Target>('name');

  // Sort targets based on the selected key and order
  const sortedTargets = [...targets].sort((a, b) => {
    const aValue = sortKey === 'lastUpdated' ? new Date(a[sortKey]).getTime() : a[sortKey] ?? ''; // Handle null
    const bValue = sortKey === 'lastUpdated' ? new Date(b[sortKey]).getTime() : b[sortKey] ?? ''; // Handle null
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Calculate total pages
  const totalPages = Math.ceil(sortedTargets.length / PAGE_SIZE);

  // Get current targets to display
  const displayedTargets = sortedTargets.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Sorting handler
  const handleSort = (key: keyof Target) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortKey === 'name' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Pipeline Status</th>
            <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('lastUpdated')}>
              Last Updated {sortKey === 'lastUpdated' && (sortOrder === 'asc' ? '🔼' : '🔽')}
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedTargets.map((target) => (
            <tr key={target.id}>
              <td className="border border-gray-300 p-2">{target.id}</td>
              <td className="border border-gray-300 p-2">{target.name}</td>
              <td className="border border-gray-300 p-2">{target.description}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={target.pipelineStatus || ''}
                  onChange={(e) => onUpdateStatus(target.id, e.target.value)}
                  className="p-1 border border-gray-300 rounded"
                >
                  <option value="">Select Status</option>
                  <option value="Hot">Hot</option>
                  <option value="Active">Active</option>
                  <option value="Cold">Cold</option>
                  <option value="Closed">Closed</option>
                  <option value="Passed">Passed</option>
                </select>
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(target.lastUpdated).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TargetTable;
