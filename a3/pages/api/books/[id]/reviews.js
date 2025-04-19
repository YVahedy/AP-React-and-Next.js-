import { query } from '../../../../lib/db';
import authMiddleware from '../../../../middleware/auth';

const handler = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM reviews WHERE book_id = $1', [id]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { comment, rating } = req.body;
    const userId = req.user.userId; // Use req.user.userId to get the user ID

    try {
      const result = await query(
        'INSERT INTO reviews (book_id, user_id, comment, rating) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, userId, comment, rating]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

const authHandler = authMiddleware(handler);

const handleRequest = async (req, res) => {
  if (req.method === 'POST') {
    return authHandler(req, res);
  } else {
    return handler(req, res);
  }
};

export default handleRequest;