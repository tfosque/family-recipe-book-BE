import { log } from "console";
import cors from "../../lib/app-middleware";
import axios from "axios";

export default async function handler(req: any, res: any) {
  const url =
    "https://nextjs-app-373956278301.us-central1.run.app/api/food_mongodb";
  const { query } = req;

  await cors(req, res);
  //
  // const response = await axios.get(url);

  //
  // const myData = response;
  // console.log({ myData });

  res.status(200).json({ message: "CORS enabled!", myData: { data: {} } });
}
