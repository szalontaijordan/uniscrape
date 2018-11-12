import path from 'path';
import axios from 'axios';
import { Router, Request, Response } from 'express';

import puppeteer from 'puppeteer';

import { MicroDataScraper } from '../scrapers/microdata.scraper';

const router: Router = Router();

router.get('/whatwg', async (req: Request, res: Response) => {
    const browser = await puppeteer.launch();
    const microdataScraper = new MicroDataScraper(browser, 'https://html.spec.whatwg.org/multipage/microdata.html');
    const json = await microdataScraper.getJson();
    
    browser.close();

    res.json(json);
});

export const MicroDataController: Router = router;
