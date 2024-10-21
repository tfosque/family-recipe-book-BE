import clientPromise from "../../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "../../../../../lib/app-middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const database = "family-book-db";
  const collection = "saved-recipes";
  //
  await cors(req, res);

  if (req.method === "POST") {
    try {
      const client = clientPromise;
      const db = client.db(database);

      const data = req.body;
      const result = await db.collection(collection).insertOne(data);

      res
        .status(201)
        .json({ message: "Data saved successfully", id: result.insertedId });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error saving data", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
/*   try {
    const client = clientPromise;
    const db = client.db(database);
    const recipes = await db
      .collection(collection)
      .find({})
      .sort({ metacritic: -1 })
      .limit(100)
      .toArray();
    console.log(recipes);
    // res.json(food);
    res.status(200).json(recipes);
  } catch (e) {
    console.error(e);
    res.status(405).json({ message: "Method Not Allowed" });
  } */

/* Params */
/* export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // Extracting the id from params

    // Here you can perform operations with the id, such as fetching data from a database
    return NextResponse.json({
        success: true,
        id: id,
        message: 'User data fetched successfully'
    }, {
        status: 200,
    });
} */
