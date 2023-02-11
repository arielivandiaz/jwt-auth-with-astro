import express from 'express';
import passport from 'passport';
import * as api from '../controllers/api.controller.js';
import * as auth from '../controllers/auth.controller.js';
const router = express.Router();

router.get('/', api.home);

router.post('/signin', auth.signIn);
router.post('/signup', auth.signUp);

router.get('/users', passport.authenticate('jwt', { session: false }), api.users);

export default router;
