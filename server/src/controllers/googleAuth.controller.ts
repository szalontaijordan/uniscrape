import { config } from '../../config/vars';
import { OAuth2Client } from 'google-auth-library';
import { Router, Request, Response, NextFunction } from 'express';

const router: Router = Router();

router.get('/auth', async (req: Request, res: Response) => {
    try {
        const { token, name, email, imgUrl } = req.query;
        const CLIENT_ID = config.google.web.client_id;
        const client = new OAuth2Client(token);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        req.session.user = {
            id: userid,
            name,
            email,
            imgUrl
        };

        res.send('Session created');
    } catch (err) {
        res.send(err);
    }
});

router.get('/logout', async (req, res) => {
    if (!req.session.user) {
        res.status(500).send('You can\'t log out if you are not logged in!');
    } else {
        req.session.user = null;
        res.send('Session ended');
    }
});

export const GoogleAuthController: Router = router;
