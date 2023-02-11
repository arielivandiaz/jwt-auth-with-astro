
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../config/secrets.js';

export const generateAccessToken = (userInfo) => {
    return jsonwebtoken.sign(userInfo, JWT_SECRET, { expiresIn: 20 });
};
