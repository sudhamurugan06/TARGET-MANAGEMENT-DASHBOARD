// components/BarChart.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// Define the props type for BarChart
interface BarChartProps {
  data: {
      labels: string[]; // Array of string labels for the x-axis
      values: number[]; // Array of corresponding values for the y-axis
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
      labels: data.labels, // Use the labels from the data prop
      datasets: [
          {
              label: 'Acquisition Targets',
              data: data.values, // Use the values from the data prop
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
      ],
  };

  return <Bar data={chartData} />;
};
export default BarChart;
