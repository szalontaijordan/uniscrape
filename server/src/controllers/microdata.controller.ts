import { Router, Request, Response } from 'express';

import puppeteer from 'puppeteer';

import { MicroDataScraper } from '../scrapers/microdata.scraper';

const router: Router = Router();

/**
 * Webpages:
 *
 * Book Depository (árfigyelés!, email küldés vagy valami)
 * Aukciós oldalak (licitálás?)
 *
 * UI-n mircrodata adás összehasonlítgatások megintcsak árfigyelők
 *
 * koncert időpontok
 * mozi?
 *
 * még még még amit gyakran használok
 *
 */

router.get('/whatwg', async (req: Request, res: Response) => {
    const browser = await puppeteer.launch();
    const microdataScraper = new MicroDataScraper(browser, 'https://html.spec.whatwg.org/multipage/microdata.html');
    const json = await microdataScraper.getJson();

    browser.close();

    res.json(json);
});

export const MicroDataController: Router = router;
