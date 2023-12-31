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
import googleTaskRouter from './routes/googleTasks';

dotenv.config();

const app: Express = express();

app.locals.pluralize = (pluralize);

app.use(cors({
  credentials: true
}));
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
app.use(passport.initialize());
app.use(passport.session());

app.use( (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use('/', authRouter);
app.use('/google-tasks', googleTaskRouter);

// Catch 404
app.use( (req, res, next) => {
  next(createHttpError.NotFound(`Route ${req.path} not defined or does not exist`));
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

export default app;