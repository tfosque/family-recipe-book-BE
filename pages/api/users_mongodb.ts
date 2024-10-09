import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import cors from "../../lib/app-middleware";

const database = "family-book-db";
const collection = "users";
//
const JWT_SECRET = "your-secret-key";

const client = clientPromise;
const db = client.db(database);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // generateAndStoreToken("tfosque");
  //
  await cors(req, res);

  try {
    const users = await db
      .collection(collection)
      .find({})
      .sort({ metacritic: -1 })
      .limit(40)
      .toArray();
    res.json(users);
    console.log({ users });
  } catch (e) {
    console.error(e);
  }
};

export async function generateAndStoreToken(userId: any) {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db("family-book-db");
    const users = database.collection("users");

    // Generate JWT token
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    // Store token in database
    await users.updateOne({ _id: userId }, { $set: { token: token } });

    console.log("Token generated and stored successfully");
    return token;
  } catch (error) {
    console.error("Error generating or storing token:", error);
  } finally {
    await client.close();
  }
}
