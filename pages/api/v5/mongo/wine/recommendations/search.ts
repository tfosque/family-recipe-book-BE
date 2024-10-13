import clientPromise from "../../../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "../../../../../../lib/app-middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const database = "family-book-db";
  const collection = "wine_recommendations";
  //

  await cors(req, res);

  try {
    const client = clientPromise;
    const db = client.db(database);
    const wine = await db
      .collection(collection)
      .find({})
      .sort({ metacritic: -1 })
      .limit(124)
      .toArray();
    console.log({ data: wine });
    res.json({ data: wine });
  } catch (e) {
    console.error(e);
  }
};
