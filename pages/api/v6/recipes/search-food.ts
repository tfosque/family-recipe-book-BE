import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cors from "../../../../lib/app-middleware";
import * as cheerio from "cheerio";

export default async function handler(req: any, res: any) {
  await cors(req, res);

  if (req.method === "GET") {
    try {
      const url =
        "https://www.foodnetwork.com/recipes/food-network-kitchen/quinoa-bowl-with-chicken-and-avocado-cream-3363556";
      // Replace with the URL you want to scrape

      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      console.log("xxxResponse.data", response.data);

      res.status(200).json({ name: "Tim" });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
