# UniScrape

This repository is for a web scraping application, that usses three main approaches to get information from the web.

* DOM processing with Puppeteer (Headless Chrome)
* Microdata processing with Puppeteer (Headless Chrome)
* Raw API calls

## Running in Developement mode

Install dependecies (this may take a while because a Chormium instance is installed by Puppeteer)

```
    $ npm install
```

Run the dev script:

```
    $ npm run dev
```

## Usage

For now only the API exists for the application, in the future an Angular 6 application will present the scraped data.

### Use with curl

Microdata processing:
```
    $ curl localhost:3000/microdata/whatwg
```
This makes a call to the official whatwg specification and processes the last example given. Returns a JSON of the data.

Java 8 Exception list from official documentation:
```
    $ curl localhost:3000/java/8/exceptions
```
This makes a call to the official Java SE 8 documentation page and gets the list of all exceptions. Returns a JSON of the data.

## Running the app

Coming soon...