import { query } from '../../../../lib/db';

const handler = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM books WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;