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
    res.status(200).json({ message: "Hello from the GET method!" });
  } else if (req.method === "POST") {
    const { name } = req.body;
    res.status(200).json({ message: `Hello ${name} from the POST method!` });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

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
