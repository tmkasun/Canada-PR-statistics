import { initMongo } from './libs/mongo';
import { Draw } from './libs/types';
import { Collection } from 'mongodb';
import { getDrawsFromOINP, getLatestOINPFromDB } from './oinp';
import logger from './libs/logger';
import { sendEEEmail, sendOINPEmail } from './libs/email';

const IRCC_DATA_JSON = "https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json"

const getLatestDrawFromIRCC = async () => {
    logger.info("Fetching IRCC data!")
    const res = await fetch(
        IRCC_DATA_JSON
    );
    const data = await res.json();
    logger.info("IRCC data fetched!")
    const latestRound: Draw = data.rounds[0];
    return latestRound;
}

const getLatestDrawFromDB = async (db: Collection<Document> & {
    close?: ((force?: boolean | undefined) => Promise<void>)
}, latestDrawNumber: number) => {
    logger.info("Finding last draw from mongo . . .");
    let lastKnownDraw = await db.findOne<{ lastDraw: number, _id: any }>({ program: 'ee' });
    if (!lastKnownDraw) {
        const done = await db.insertOne({ "program": 'ee', lastDraw: latestDrawNumber } as any);
        lastKnownDraw = { lastDraw: -1, _id: -1 }
    } else {
        logger.info(`Found last draw from mongo = ${lastKnownDraw?.lastDraw}!`)
    }

    return lastKnownDraw
}


(async () => {
    const mongoCollection = await initMongo();
    try {
        const latestDrawFromIRCC = await getLatestDrawFromIRCC();
        const latestDrawNumberFromIRCC = parseInt(latestDrawFromIRCC.drawNumber);
        const latestDrawFromDB = await getLatestDrawFromDB(mongoCollection, latestDrawNumberFromIRCC);

        logger.info(`Latest IRCC Draw number ${latestDrawNumberFromIRCC}`);
        if (latestDrawNumberFromIRCC > latestDrawFromDB.lastDraw) {
            logger.info(`Found a new draw ${latestDrawNumberFromIRCC}`)
            const done = await mongoCollection.updateOne({ _id: { $eq: latestDrawFromDB?._id } }, { $set: { lastDraw: latestDrawNumberFromIRCC } })
            await sendEEEmail(latestDrawFromIRCC, latestDrawNumberFromIRCC)
        } else {
            logger.info("No new draws!")
        }
        logger.info(`Checking OINP invitations!`)
        const latestsOINPsfromOntarioCa = await getDrawsFromOINP();
        const [latestOINPFromWeb] = latestsOINPsfromOntarioCa;
        const latestOINPFromDB = await getLatestOINPFromDB(mongoCollection, latestOINPFromWeb.date);
        debugger

        if (latestOINPFromWeb.date > latestOINPFromDB.lastDraw) {
            logger.info(`Found a new OINP invitation round from web: ${latestOINPFromWeb}`);
            const done = await mongoCollection.updateOne({ _id: { $eq: latestOINPFromDB._id } }, { $set: { lastDraw: latestOINPFromWeb.date } })
            sendOINPEmail(latestOINPFromWeb)
        } else {
            logger.info(`No new OINP invitations found!`)
        }
    } catch (error) {
        debugger;
        logger.error(error)

    } finally {
        logger.warn("Closing mongo connection!")
        mongoCollection.close && mongoCollection.close();
    }
})()

