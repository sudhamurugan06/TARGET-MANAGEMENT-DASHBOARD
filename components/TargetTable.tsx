// components/TargetTable.tsx


type Target = {
  id: number;
  name: string;
  description: string;
  pipelineStatus: string | null;
  markets: string[];
  lastUpdated: string;
};

type TargetTableProps = {
  targets: Target[];
  onUpdateStatus: (id: number, newStatus: string | null) => void;
};

const pipelineStatusOptions = ['Hot', 'Active', 'Cold', 'Closed', 'Passed'];

const TargetTable: React.FC<TargetTableProps> = ({ targets, onUpdateStatus }) => {
  const handleStatusChange = (id: number, newStatus: string | null) => {
      onUpdateStatus(id, newStatus);
  };

  return (
      <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Pipeline Status</th>
                  <th>Markets</th>
                  <th>Last Updated</th>
              </tr>
          </thead>
          <tbody>
              {targets.length > 0 ? (
                  targets.map((target) => (
                      <tr key={target.id}>
                          <td>{target.name}</td>
                          <td>{target.description}</td>
                          <td>
                              <select
                                  value={target.pipelineStatus ?? ''}
                                  onChange={(e) => handleStatusChange(target.id, e.target.value)}
                              >
                                  <option value="">Select Status</option>
                                  {pipelineStatusOptions.map((status) => (
                                      <option key={status} value={status}>
                                          {status}
                                      </option>
                                  ))}
                              </select>
                          </td>
                          <td>{target.markets.join(', ')}</td>
                          <td>{new Date(target.lastUpdated).toLocaleDateString()}</td>
                      </tr>
                  ))
              ) : (
                  <tr>
                      <td colSpan={5}>No data available</td>
                  </tr>
              )}
          </tbody>
      </table>
  );
};

export default TargetTable;