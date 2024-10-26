import { Pool } from 'pg';

// Create a new pool instance to connect to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,       // Your PostgreSQL username
  host: process.env.DB_HOST,       // Your PostgreSQL host
  database: process.env.DB_NAME,   // Your PostgreSQL database name
  password: process.env.DB_PASSWORD, // Your PostgreSQL password
  port: Number(process.env.DB_PORT), // Your PostgreSQL port
});

// Function to fetch targets from the PostgreSQL database
export const fetchTargets = async () => {
  try {
    const res = await pool.query('SELECT * FROM targets ORDER BY last_updated DESC');
    return res.rows; // Return the fetched rows
  } catch (error) {
    console.error('Error fetching targets:', error);
    throw error; // Throw the error for further handling
  }
};

// Function to update a target's pipeline status
export const updateTargetStatus = async (id: number, newStatus: string) => {
  const currentTimestamp = new Date().toISOString();
  try {
    await pool.query(
      'UPDATE targets SET pipeline_status = $1, last_updated = $2 WHERE id = $3',
      [newStatus, currentTimestamp, id]
    );
  } catch (error) {
    console.error('Error updating target status:', error);
    throw error; // Throw the error for further handling
  }
};

// Function to close the pool when shutting down the application
export const closePool = async () => {
  await pool.end();
};
