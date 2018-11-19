import mongodb from 'mongodb';
import { config } from '../../../config/vars';

export async function loadNotesCollection() {
    const client = await mongodb.MongoClient.connect(config.db.testURI, { useNewUrlParser: true });
    return client.db('uniscrape_test').collection('notes');
}
