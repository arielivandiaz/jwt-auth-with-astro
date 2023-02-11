/* eslint-disable camelcase */
import passport from 'passport';
import * as passportJWT from 'passport-jwt';
import { JWT_SECRET } from '../config/secrets.js';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('bearer');
opts.secretOrKey = JWT_SECRET;
passport.use('jwt', new JwtStrategy(opts, function (jwt_payload, done) {
    try {
        console.log(jwt_payload);
        if (jwt_payload.username !== undefined && jwt_payload.id !== undefined) {
            console.log('authorized');
            done(null, {
                id: jwt_payload.id,
                username: jwt_payload.username
            });
        } else {
            done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));
