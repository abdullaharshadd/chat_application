import jwt from 'jsonwebtoken';

export const getUserIdFromToken = async (token) => {
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    return decoded.userId;
  } catch (error) {
    // Handle the error, for example, log it or return a default value
    console.error('Error decoding token:', error);
    return null;
  }
};
