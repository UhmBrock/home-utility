import express from 'express';
import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: `776263818498-dbn3f6f90i043ceuv7a7ag98qesb10ni.apps.googleusercontent.com`,
  clientSecret: `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`,
  callbackURL: `/oauth2/redirect/google`,
  scope: [ 
    'profile', 
    'https://www.googleapis.com/auth/calendar', 
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/tasks'
  ],
  state: true
},
(accessToken, refreshToken, profile, cb) => {
  console.log("Access token: ", accessToken);
  console.log("Refresh token: ", refreshToken);
  console.log("Passport Profile: ", profile);
  return cb(null, profile);
}))

passport.serializeUser((user: Express.User, cb) => {
  process.nextTick(() => {
    cb(null, user);
  })
});

passport.deserializeUser((user: Express.User, cb) => {
  process.nextTick(() => {
    cb(null, user);
  })
});

const router = express.Router();

router.get('/login', (req, res) => {
  console.log("LOGIN: ", req);
});

router.get('/login/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successReturnToOrRedirect: '/login/google/signin-success',
  failureRedirect: 'http://localhost:5173/signin-redirect'
}));

router.get('/login/google/signin-success', (req, res) => {
  console.log("SUCCESSFUL SIGN IN: ", req);
  res.redirect('http://localhost:5173/');
});

router.post('/logout', (req, res) => {
  req.logOut((err) => {
    console.log("Error Logging Out: ", err);
  });
  res.redirect('http://localhost:5173/');
});

export default router;