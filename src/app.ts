import express from 'express';
import bodyParser from 'body-parser';

import { JavaController } from './controllers/java.controller';
import { MicroDataController } from './controllers/microdata.controller';

const app: express.Application = express();
const port: number = +process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/microdata', MicroDataController);
app.use('/java', JavaController);

app.listen(port, () => console.log(`Szakdoga app IS listening on port ${port}!`));

export default app;