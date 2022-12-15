import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
  const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.uula0x6.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);
  return await client.connect();
}
