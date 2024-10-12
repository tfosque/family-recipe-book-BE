import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cors from "../../../../lib/app-middleware";

// TODO: KEY = "AIzaSyB6Rq7D5FRSso4WaD9vVqOBYpgr7WPEMuY"; // process.env.KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  // const str = query.address;

  const params = {
    address: query.address,
    key: "AIzaSyB6Rq7D5FRSso4WaD9vVqOBYpgr7WPEMuY",
  };

  // Construct the API URL with query parameters
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=${KEY}`;
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;

  await cors(req, res);

  if (req.method === "GET") {
    // Handle GET request

    try {
      // Make the API call
      const response = await axios.get(url, { params });

      // Send the response back to the client
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Geo Information" });
    }

    res.status(200).json({ message: "Hello from GET request!" });
  } else if (req.method === "POST") {
    // Handle POST request
    const { name } = req.body;
    res.status(200).json({ message: `Hello ${name} from POST request!` });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
