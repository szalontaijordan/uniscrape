import { EvaluateFn, Browser } from 'puppeteer';
import { HeadlessDomScraper } from './headless-dom.scraper';

export class Java8DocScraper extends HeadlessDomScraper {

    constructor(browser: Browser, url: string) {
        super(browser, url);
    }

    public async getTitle(): Promise<any> {
        return super.getInformationFromPage(this.pageTitleExtractor());
    }

    public async getExceptionList(): Promise<any> {
        return super.getInformationFromPage(this.exceptionListExtractor(), 'allclasses-frame.html');
    }

    private pageTitleExtractor(): EvaluateFn {
        return () => document.querySelector('head title').innerHTML;
    }

    private exceptionListExtractor(): EvaluateFn {
        return () => {
            const nodeList: NodeList = document.querySelectorAll('.indexContainer ul li');

            return Array.from(nodeList)
                .map(li => (li as HTMLElement).innerText)
                .filter(li => li.endsWith('Exception'));
        }
    }
}