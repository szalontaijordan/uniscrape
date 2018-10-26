import { Router, Request, Response } from 'express';
import { Java8DocScraper } from '../scrapers/java8-doc.scraper';

import puppeteer from 'puppeteer';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const browser = await puppeteer.launch();
    const scraper = new Java8DocScraper(browser);
    
    const title = await scraper.getTitle();
    const exceptionList = await scraper.getExceptionList();

    await browser.close();
    
    res.json({ title, exceptionList });
});

export const IndexController: Router = router;
