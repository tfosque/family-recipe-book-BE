import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const database = "family-book-db";
  const collection = "spoonacular";
  //
  try {
    const client = clientPromise;
    const db = client.db(database);
    const food = await db
      .collection(collection)
      .find({})
      .sort({ metacritic: -1 })
      .limit(40)
      .toArray();
    res.json(food);
    console.log({ food });
  } catch (e) {
    console.error(e);
  }
};
