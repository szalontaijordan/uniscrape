import express from 'express';
import bodyParser from 'body-parser';

import { JavaController } from './controllers/java.controller';
import { MicroDataController } from './controllers/microdata.controller';
import { loadNotesCollection } from './models/collections/notes';

const app: express.Application = express();
const port: number = +process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/microdata', MicroDataController);
app.use('/java', JavaController);

app.get('/api/db/test', async (req, res) => {
    const notes = await loadNotesCollection();
    const allNotes = await notes.find({}).toArray();

    res.send(allNotes);
});

app.listen(port, () => console.log(`Szakdoga app IS listening on port ${port}!`));

export default app;