import type { NextApiRequest, NextApiResponse } from "next";
import cors from "../../../../lib/app-middleware";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await cors(req, res);

  if (req.method === "GET") {
    res.status(200).json({ message: "Hello from the GET favorites!" });
  } else if (req.method === "POST") {
    const { name } = req.body;
    res.status(200).json({ message: `Hello ${name} from the POST method!` });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
