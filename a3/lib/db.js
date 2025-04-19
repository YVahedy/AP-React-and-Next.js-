import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This allows self-signed certificates (if you're using one)
  },
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

export const query = (text, params) => pool.query(text, params);
