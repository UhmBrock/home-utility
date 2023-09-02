import {google} from 'googleapis';
import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  `776263818498-dbn3f6f90i043ceuv7a7ag98qesb10ni.apps.googleusercontent.com`,
  `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`,
  `http://localhost:4000/googleauth/sign-in-redirect`
);

const scopes = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/tasks",
];

google.options({ auth: oauth2Client });

// oauth2Client.on("tokens", (tokens) => {
//     if (tokens.refresh_token) {
//       console.log(tokens.refresh_token);
//     }
//     console.log(tokens.access_token);
// });

// const url = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: "offline",
//   scope: scopes,
// });

// router.get('/sign-in', (req: Request, res: Response) => {
//   console.info("Redirected to google auth");
//   res.redirect(url);
// });

// router.get('/sign-in-redirect', async (req: Request, res: Response) => {
//   console.info("In auth landing page");

//   const { tokens } = await oauth2Client.getToken(req.query.code as string);

//   if(!tokens) return res.status(401).json({message: "No tokens"});

//   if(!tokens.access_token) return res.status(401).json({message: "No access token"});

//   if(!tokens.expiry_date) return res.status(401).json({message: "No expiry date"});

//   res.cookie("gauth-token", tokens.access_token, { expires: new Date(tokens.expiry_date) });
//   res.redirect("http://localhost:5173/"); 
// });



export default router;