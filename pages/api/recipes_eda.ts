import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const filterQuery = req.query.filter;
  console.log("ZZZ:filterQuery", filterQuery);

  // Edamam API credentials
  const APP_ID = "d9b1cf2a&app"; //process.env.EDAMAM_APP_ID;
  const APP_KEY = "c5766ec9ad2e1b022e60988c157c48f5"; // process.env.EDAMAM_APP_KEY;

  // Construct the API URL with query parameters
  const url = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&q="${filterQuery}"&app_id=${APP_ID}&app_key=${APP_KEY}`;

  if (req.method === "GET") {
    // Handle GET request

    try {
      // Make the API call
      const response = await axios.get(url, { params: query });
      console.log(res.json(response.data));
      // Send the response back to the client
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recipes" });
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
