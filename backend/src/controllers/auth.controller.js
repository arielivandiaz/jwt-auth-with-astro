
import { createError } from '../helpers/errors.js';
import { findOneByUsername, findUserExists, createNew } from '../repositories/user.repository.js';
import { generateAccessToken } from '../services/jwt.service.js';

import bcrypt from 'bcrypt';

export const home = (req, res) => {
    try {
        return res.send('Hello World!');
    } catch (error) {
        createError(req, res, 505, error);
    }
};

export const signIn = (req, res) => {
    try {
        const user = findOneByUsername(req.body.username);
        if (!user) {
            return res.status(401).send('Oops! User not found');
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send('Oops! Wrong Password');
        } else {
            const token = generateAccessToken({
                id: user.id,
                username: user.username
            });
            console.log(token);
            return res.status(200).send({ success: true, token: 'bearer ' + token });
        }
        // return res.status(404).send('Ups!');
    } catch (error) {
        createError(req, res, 505, error);
    }
};

export const signUp = (req, res) => {
    try {
        console.log(req.body);
        console.log(findUserExists(req.body.username));
        if (findUserExists(req.body.username)) {
            return res.send('Oops!  User already exists');
        }
        const newUser = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10) // use the generateHash function in our user modele
        };

        if (!newUser) {
            return res.send('Oops! Something was wrong');
        }
        console.log('newUser', newUser);
        const user = createNew(newUser);
        res.send(`New user created : ${user.username}`);
    } catch (error) {
        createError(req, res, 505, error);
    }
};
