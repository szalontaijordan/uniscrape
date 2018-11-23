import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';

import { config } from './config/vars';

import { DatabaseController } from './src/controllers/database.controller';
import { GoogleAuthController } from './src/controllers/googleAuth.controller';

const app: Application = express();
const port: number = +process.env.PORT || 3000;

// allow any method from any host and log requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

app.use(express.static(path.join(__dirname, '/public')));

// setting up session usage
app.use(cookieParser());
app.use(session({ secret: config.google.web.client_secret }));

const checkSession = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        next();
    } else {
        next(new Error('You are not authorized to view this resource.'));
    }
};

// setting up bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting up routes
app.use('/api/db', checkSession, DatabaseController);
app.use('/api/google', GoogleAuthController);
app.get('/api/isValid', (req, res) => res.send(!!req.session.user));

// setting up index.html
app.get('*', (req, res) => res.sendfile(__dirname + '/public/index.html'));

// starting server
app.listen(port, () => {
    console.log(`Szakdoga app IS listening on port ${port}!`);
    console.log(`Using static path: ${path.join(__dirname, '/public')}`);
});

export default app;
