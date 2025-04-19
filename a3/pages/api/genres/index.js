// pages/api/genres/index.js
import { query } from '../../../lib/db';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM genres');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;