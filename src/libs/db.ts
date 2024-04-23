import Locomotive from "@/models/locomotive";
import { Collection, MongoClient, Db, MongoServerError } from "mongodb";
import dotenv from "dotenv";
import Logger from "@/libs/logger";

dotenv.config();

const collections: { locomotive?: Collection<Locomotive> } = {};

const connectToDatabase = async () => {
  // Create a new MongoDB client with the connection string from .env
  const client = new MongoClient(process.env.DB_CONN_STRING || "");

  // Connect to the cluster
  await client.connect();

  // Connect to the database with the name specified in .env
  const db = client.db(process.env.DB_NAME);

  // Connect to the collection with the specific name from .env, found in the database previously specified
  const locoCollection = db.collection<Locomotive>(process.env.DB_COLLECTION_NAME || "");

  // Persist the connection to the Games collection
  collections.locomotive = locoCollection;

  Logger.info(
    `Successfully connected to database: ${db.databaseName} and collection: ${locoCollection.collectionName}`
  );
};

export { collections, connectToDatabase };
