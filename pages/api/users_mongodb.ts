import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const database = "family-book-db";
  const collection = "users";
  //
  try {
    const client = clientPromise;
    const db = client.db(database);
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
