import passport from 'koa-passport';
import db from './models/index.js';
import jwt from 'jwt-then';
import { config } from '../config/config';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(
    async function (username, pass, cb) {
        try {
            const user = await db.User.findOne({ where: { name: username } });
            if (user.password === pass) {
                const token  = await jwt.sign({id: user.id}, config.jwtSecret);
                cb(null, token);
            } else {
                cb(null, false);
            }
        } catch (error) {
            cb(error, false);
        }
    })
);

// 执行passport.authenticate会执行这堆内容
passport.use(new BearerStrategy(
    async function(token, cb) {
        const {id} = await jwt.verify(token, config.jwtSecret);
        cb(null, id);
    }
));

export const passportA = passport;