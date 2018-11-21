import { loadNotesCollection } from '../models/collections/notes';
import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/test', async (req: Request, res: Response) => {
    if (req.session.user) {
        const notes = await loadNotesCollection();
        const userId = req.session.user.id;
        const allNotes = await notes.find({ userId }).toArray();

        res.send(allNotes);
    } else {
        res.status(401).send('You are not logged in');
    }
});

export const DatabaseController: Router = router;
