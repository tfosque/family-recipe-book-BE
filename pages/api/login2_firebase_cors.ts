import cors from "../..//lib/app-middleware";

export default async function handler(req: any, res: any) {
  await cors(req, res);
  const myData = await fetch(
    "https://nextjs-be-app-373956278301.us-central1.run.app/api/food_mongodb"
  );

  res.status(200).json({ message: "CORS enabled!", myData });
}
