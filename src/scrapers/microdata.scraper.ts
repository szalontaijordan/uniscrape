// @ts-ignore
import * as microdata from 'microdata-node';

// @ts-check
import { Browser, EvaluateFn } from 'puppeteer';
import { HeadlessDomScraper } from './headless-dom.scraper';

export class MicroDataScraper extends HeadlessDomScraper {

    constructor(browser: Browser, url: string) {
        super(browser, url);
    }

    public async getJson(): Promise<any> {
        const scopes = await super.getInformationFromPage(this.getScopes());
        const scopeItems = (scopes as Array<any>).map(scope => microdata.toJson(scope));
        
        return ({ scopeItems });
    }

    private getScopes(): EvaluateFn {
        return () => {
            const fullExample = (document.querySelector('.example:last-of-type pre') as HTMLElement).innerText;
            let dom = document.createElement('div');
            dom.innerHTML = fullExample;

            return Array.from(dom.querySelectorAll('[itemscope]')).map(scope => scope.outerHTML);         
        };
    }
}