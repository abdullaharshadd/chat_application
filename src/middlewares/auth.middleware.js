
import jwt from 'jsonwebtoken';
export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = decoded;
      next();
    });
};