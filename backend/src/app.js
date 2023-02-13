
import createHttpError from 'http-errors';
import express from 'express';

import logger from 'morgan';
import passport from 'passport';
import './services/passport.service.js';
import cors from 'cors';
import indexRouter from './routes/index.route.js';

const app = express();

app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next(createHttpError(404));
});

// default error handler
app.use((err, req, res, _next) => {
    res
        .status(err.status || 500)
        .send({
            message: err.message,
            status: err.status || 500,
            error: req.app.get('env') === 'development' ? err : {}
        });
});

export default app;
