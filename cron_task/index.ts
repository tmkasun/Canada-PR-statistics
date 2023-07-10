import { Resend } from 'resend';
import { initMongo } from './libs/mongo';
import { Draw } from './libs/types';
const { resendAPIKey } = require("./configs.json");

(async () => {
    const db = await initMongo();
    try {
        console.log("Fetching IRCC data!")
        const res = await fetch(
            "https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json"
        );
        const data = await res.json();
        console.log("IRCC data fetched!")
        const latestRound: Draw = data.rounds[0];
        console.log("Finding last draw from mongo . . .")
        const lastKnownDraw = await db.findOne<{ lastDraw: number, _id: any }>();
        if (!lastKnownDraw) {
            return
        }
        console.log(`Found last draw from mongo = ${lastKnownDraw?.lastDraw}!`)
        const latestDrawNumber = parseInt(latestRound.drawNumber);
        console.log(`Latest Draw number ${latestDrawNumber}`);
        debugger;
        if (latestDrawNumber > lastKnownDraw?.lastDraw) {
            console.log(`Found a new draw ${latestDrawNumber}`)

            const aa = await db.updateOne({ _id: { $eq: lastKnownDraw?._id } }, { $set: { lastDraw: latestDrawNumber } })
            const resend = new Resend(resendAPIKey);
            console.log(`Sending email!`)
            const a = await resend.emails.send({
                from: 'noreply@send.knnect.com',
                to: 'tmkasun@gmail.com',
                subject: 'New PR draws detected!',
                html: `${Object.entries(latestRound).map(([k, v]) => `${k} => ${v}`).join('</br>')}`
            });
        } else {
            console.log("No new draws!")
        }
        debugger;
    } catch (error) {
        debugger;
        console.error(error)

    } finally {
        console.warn("Closing mongo connection!")
        db.close && db.close();
    }
})()

