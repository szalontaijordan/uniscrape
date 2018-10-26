import puppeteer, { EvaluateFn, Browser } from 'puppeteer';

export class Java8DocScraper {

    private scrapeURL: string = 'https://docs.oracle.com/javase/8/docs/api/';

    constructor(private browser: Browser) {
    }

    public async getInformationFromPage(evaluateFn: EvaluateFn, ...children: Array<string>): Promise<any> {
        const page = await this.browser.newPage();
        const URL = this.scrapeURL + children.join('/');

        await page.goto(URL, { waitUntil: 'networkidle2' });

        const result = await page.evaluate(evaluateFn);

        page.close();

        console.log('Getting information from page ', URL);
        return result;
    }

    public async getTitle(): Promise<any> {
        return this.getInformationFromPage(this.pageTitleExtractor());
    }

    public async getExceptionList(): Promise<any> {
        return this.getInformationFromPage(this.exceptionListExtractor(), 'allclasses-frame.html');
    }

    private pageTitleExtractor() {
        return () => document.querySelector('head title').innerHTML;
    }

    private exceptionListExtractor() {
        return () => {
            const nodeList: NodeList = document.querySelectorAll('.indexContainer ul li');

            return Array.from(nodeList)
                .map(li => (li as HTMLElement).innerText)
                .filter(li => li.endsWith('Exception'));
        }
    }
}