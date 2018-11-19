import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import session from 'express-session';

import { config } from '../config/vars';

import { DatabaseController } from './controllers/database.controller';
import { GoogleAuthController } from './controllers/googleAuth.controller';

const app: express.Application = express();
const port: number = +process.env.PORT || 3000;

// setting up session usage
app.use(cookieParser());
app.use(session({ secret: config.google.web.client_secret }));

// setting up bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting up routes
app.use('/api/db', DatabaseController);
app.use('/api/google', GoogleAuthController);

// setting up index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
});

// starting server
app.listen(port, () => console.log(`Szakdoga app IS listening on port ${port}!`));

export default app;