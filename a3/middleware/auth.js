import jwt from 'jsonwebtoken';

const authMiddleware = (handler) => {
  return async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      console.log('Authentication token missing');
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
      console.log('Token received:', token);
      const decoded = jwt.verify(token, 's3cr3t');
      req.user = decoded;
      console.log('Token verified successfully:', decoded);
      return handler(req, res);
    } catch (error) {
      console.log('Invalid authentication token:', error);
      return res.status(401).json({ message: 'Invalid authentication token' });
    }
  };
};

export default authMiddleware;