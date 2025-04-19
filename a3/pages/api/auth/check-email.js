import { query } from '../../../lib/db'; 

const checkEmail = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // Use the imported 'query' function to execute the database query
      const result = await query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows.length > 0) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default checkEmail;
