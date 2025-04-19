import { query } from '../../../lib/db';

const searchBooks = async (req, res) => {
  const { query: searchQuery, genre } = req.query;

  if (req.method === 'GET') {
    try {
      let sqlQuery = 'SELECT * FROM books WHERE title ILIKE $1';
      const params = [`%${searchQuery}%`];

      if (genre) {
        sqlQuery += ' AND genre_id = $2';
        params.push(genre);
      }

      const result = await query(sqlQuery, params);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default searchBooks;