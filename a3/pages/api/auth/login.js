import { query } from '../../../lib/db'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Use the 'query' function to fetch user data
      const result = await query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const token = jwt.sign({ userId: user.id, email: user.email }, 's3cr3t', { expiresIn: '1h' });
          console.log('Token generated:', token); // Log the token
          res.status(200).json({ token });
        } else {
          console.log('Invalid credentials: password mismatch');
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        console.log('Invalid credentials: user not found');
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default loginHandler;
