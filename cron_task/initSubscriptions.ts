import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import logger from "./libs/logger";
import { randomUUID } from "crypto";

var { subscribers, subscriptionDB } = require("./configs.json");
const { collection: collectionName, connectionURI, database } = subscriptionDB;
const docs = [{
    email: "foo@bar.com",
    canpr: {
        uuid: "$UUID()",
        isVerified: true,
        oinp: true,
        bcpnp: true,
        ee: true,
    }
},
]
const initSubscriptions = async () => {
    const client = new MongoClient(connectionURI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    let database;
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    database = await client.db(database);
    database.command({ ping: 1 });

    logger.info("Pinged your deployment. You successfully connected to MongoDB!");

    const collection = await database.collection(collectionName);
    const mappedDocs = docs.map(doc => {
        return {
            ...doc,
            canpr: {
                ...doc.canpr,
                uuid: randomUUID(),
                createdAt: new Date()
            }
        }
    })
    const ok = await collection.insertMany(mappedDocs);
};


initSubscriptions()