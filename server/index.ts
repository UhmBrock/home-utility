import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createHttpError, { CreateHttpError } from 'http-errors';
import cookieParser from 'cookie-parser';
import path from 'path';
import csrf from 'csurf';
import passport from 'passport';
import session from 'express-session';
import pluralize from 'pluralize';
import authRouter from './routes/auth';

dotenv.config();

const app: Express = express();

app.locals.pluralize = (pluralize);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'temporaryDevelopmentSecret',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));
app.use(csrf());
app.use(passport.authenticate('session'));

app.use( (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use('/', authRouter);

// Catch 404
app.use( (req, res, next) => {
  next(createHttpError(404));
})

export default app;