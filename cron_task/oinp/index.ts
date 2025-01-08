import axios from 'axios';
// import logger from '../utils/logger';
import puppeteer from 'puppeteer';
import logger from '../libs/logger';
import { Collection } from 'mongodb';

// Change the URL when year changes
const pUpdates2025 = "https://www.ontario.ca/page/2025-ontario-immigrant-nominee-program-updates";
const noi = "https://www.ontario.ca/page/oinp-express-entry-notifications-interest";

export type OINPDraw = { date: Date, details: string }
export type OINPDraws = OINPDraw[];
const printSorted = (sortedDraws: string[]) => {
    let i = 0;
    for (let draw of sortedDraws) {
        logger.info(`i = ${i} ${draw}`);
        i++
    }
}

export const getLatestOINPFromDB = async (mongoCollection: Collection<Document> & {
    close?: ((force?: boolean | undefined) => Promise<void>)
}, latestDrawNumberFromOINP: Date) => {
    logger.info("Finding last OINP invitations from mongo . . .");
    let lastKnownDraw = await mongoCollection.findOne<{ lastDraw: Date, _id: any }>({ program: 'oinp' });
    if (!lastKnownDraw) {
        const done = await mongoCollection.insertOne({ "program": 'oinp', lastDraw: latestDrawNumberFromOINP } as any);
        lastKnownDraw = { lastDraw: new Date(-1), _id: -1 }
    } else {
        logger.info(`Found latest OINP invitation from mongo = ${lastKnownDraw?.lastDraw}!`)
    }

    return lastKnownDraw
}

/**
 * Fetches the latest OINP invitations from ontario.ca website and returns the sorted list of draws.
 */
export const getDrawsFromOINP = async (): Promise<OINPDraws> => {
    logger.info("Fetching latest OINP invitations from ontario.ca website...")
    const draws = new Set();
    const drawsMap: { [key: string]: string } = {};
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser', // NOTE: Comment this out when local debugging
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    try {
        const page = await browser.newPage();
        // Visit the page and wait until network connections are completed
        await page.goto(pUpdates2025, { waitUntil: 'networkidle2' });
        const drawHeaders = await page.$$('h3');

        await Promise.all(drawHeaders?.map(async (drawHeader) => {
            let drawDate = await drawHeader.evaluate(el => el.textContent) as string;
            drawDate = drawDate.trim();
            const drawDetails = await page.evaluateHandle(el => el.nextElementSibling, drawHeader);
            if(drawDetails.asElement() === null) {
                return;
                // An info bulleting like August 19, 2024
                logger.warn(`Skipping ${drawDate} as it is an info bulletin`);
            }
            const drawInnerHTML = await drawDetails.getProperty('innerHTML');
            const drawDetailsText = await (drawInnerHTML).jsonValue() as string;

            if (!draws.has(drawDate)) {
                draws.add(drawDate);
                drawsMap[drawDate] = drawDetailsText
            }
        }))
    } catch (error) {
        logger.error(`Error fetching OINP draws: ${error}`);
    } 
    finally {
        browser.close();
    }

    const sortedDraws: OINPDraws = Array.from(draws).map((draw) => {
        return { date: new Date(draw as string), details: drawsMap[draw as string] }
    }).sort((a: any, b: any) => b.date - a.date);
    // printSorted(sortedDraws);
    return sortedDraws
}

// Uncomment to test, otherwise this file is used as a module
// getDrawsFromOINP()