import express from 'express';
import bodyParser from 'body-parser';

import { IndexController } from './controllers/index.controller';

const app: express.Application = express();
const port: number = +process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', IndexController);

app.listen(port, () => console.log(`Szakdoga app listening on port ${port}!`));

export default app;