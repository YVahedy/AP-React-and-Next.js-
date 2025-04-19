// test-db-connection.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected:', res.rows[0]);
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    pool.end();
  }
};

testConnection();