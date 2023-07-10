import { Collection, MongoClient, ServerApiVersion } from "mongodb";
var { password, database: dbName, collection: collectionName } = require("../configs.json");

const uri = `mongodb+srv://nodeuser:${password}@ircc.3wwmdgf.mongodb.net/?retryWrites=true&w=majority`;

export async function initMongo() {
    const client = new MongoClient(uri, {
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

    database = await client.db(dbName);
    database.command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const col: Collection<Document> & { close?: (force?: boolean) => Promise<void> } = await database.collection(collectionName);
    col.close = client.close.bind(client);
    return col;
}

