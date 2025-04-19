import { query } from '../../../lib/db';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM authors');
      if (result.rows.length > 0) {
        res.status(200).json(result.rows); // Return all authors
      } else {
        res.status(404).json({ message: 'Authors not found' });
      }
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;