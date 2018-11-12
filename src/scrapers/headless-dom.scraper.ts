import { Browser, EvaluateFn } from "puppeteer";

export class HeadlessDomScraper {

    constructor(private browser: Browser, private url: string) {
    }

    public async getInformationFromPage(evaluateFn: EvaluateFn, ...children: Array<string>): Promise<any> {
        const page = await this.browser.newPage();
        const URL = this.url + children.join('/');

        await page.goto(URL, { waitUntil: 'networkidle2' });

        const result = await page.evaluate(evaluateFn);

        page.close();

        console.log('Getting information from page ', URL);
        return result;
    }

}