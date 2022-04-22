import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id: string): string => {
  return jwt.sign(
    {
      user_id: id,
    },
    '' + process.env.TOKEN_KEY
  );
};

const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, '' + process.env.TOKEN_KEY);
    return true;
  } catch (err) {
    return false;
  }
};

export { generateToken, verifyToken };
