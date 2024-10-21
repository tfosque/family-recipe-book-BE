import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cors from "../../../../lib/app-middleware";
import * as cheerio from "cheerio";

export default async function handler(req: any, res: any) {
  await cors(req, res);

  if (req.method === "GET") {
    try {
      // ACCEPTED URLS
      /* 
            - Half Baked Harvest (some work)
        */
      const url =
        "https://www.heb.com/recipe/recipe-detail/hearty-red-and-green-chili";

      // Replace with the URL you want to scrape

      let recipeResult: any = {};

      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      // Find the script tag containing the Yoast schema
      const schemaScript = $('script[type="application/ld+json"]').html();

      console.log("xxxSchemaScript:", schemaScript);

      if (schemaScript) {
        const schema = JSON.parse(schemaScript);

        console.log("xxxSchema:", schema);

        // Find the Recipe object in the schema
        const recipe = schema["@graph"]?.find(
          (item: any) => item["@type"] === "Recipe"
        );

        // TODO: !important if not recipe try @graph

        console.log("xxxRecipe", recipe);

        if (recipe) {
          const res = {
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.recipeIngredient,
            instructions: recipe.recipeInstructions.map(
              (step: any) => step.text
            ),
            image: recipe.image["@id"],
            cookTime: recipe.cookTime,
            prepTime: recipe.prepTime,
            recipeYield: recipe.recipeYield,
          };

          recipeResult = recipe;

          // return res;
        }
        res
          .status(200)
          .json({ success: true, data: { ...recipe }, recipeResult });
      } else {
        res.status(200).json({ success: true, data: html, recipeResult });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
