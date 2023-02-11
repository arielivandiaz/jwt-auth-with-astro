
import { createError } from '../helpers/errors.js';
import { getAllUsers } from '../repositories/user.repository.js';

export const home = (req, res) => {
    try {
        return res.send('Hello World!');
    } catch (error) {
        createError(req, res, 505, error);
    }
};

export const users = (req, res) => {
    try {
        console.log('req.user', req.user);
        return res.send(getAllUsers());
    } catch (error) {
        createError(req, res, 505, error);
    }
};
