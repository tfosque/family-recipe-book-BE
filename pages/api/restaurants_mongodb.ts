import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const database = "family-book-db";
  const collection = "restaurants";
  //
  try {
    const client = clientPromise;
    const db = client.db(database);
    const recipes = await db
      .collection(collection)
      .find({})
      .sort({ metacritic: -1 })
      .limit(124)
      .toArray();
    res.json(recipes);
    console.log({ recipes });
  } catch (e) {
    console.error(e);
  }
};
