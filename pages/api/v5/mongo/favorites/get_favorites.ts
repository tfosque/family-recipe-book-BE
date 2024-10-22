import clientPromise from "../../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "../../../../../lib/app-middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const database = "family-book-db";
  const collection = "saved-recipes"; // rename to favorites
  //
  await cors(req, res);

  try {
    const client = clientPromise;
    const db = client.db(database);
    const favorites = await db
      .collection(collection)
      .find({})
      .sort({ metacritic: -1 })
      .limit(300)
      .toArray();
    // res.json(food);
    res.status(200).json(favorites);
  } catch (e) {
    console.error(e);
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
