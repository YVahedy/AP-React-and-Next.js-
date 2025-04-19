import { query } from '../../../lib/db'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signupHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password, username } = req.body;

    try {
      // Check if the email already exists
      const emailCheckResult = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (emailCheckResult.rows.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const result = await query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id', [email, hashedPassword, username]);
      const userId = result.rows[0].id;

      // Generate a JWT token
      const token = jwt.sign({ userId, email }, 's3cr3t', { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default signupHandler;
