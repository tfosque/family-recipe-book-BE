import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cors from "../../../../lib/app-middleware";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);
  const URL: any = req.query.url;

  // /api/v6/recipes/search-recipe?url=https://gfs.com/en-us/ideas/recipe/parm-chicken-melt/

  // TODO: !important identify @graph or @context
  // TODO: send error if news article

  if (req.method === "GET") {
    try {
      const response = await axios.get(URL);
      const html = response.data;
      const $ = cheerio.load(html);
      /*  */

      $("#recipe-card").each((index, element) => {
        const title = $(element).find(".title").text().trim();
        const description = $(element).find(".description").text().trim();
        const name = $(element).find(".name").text().trim();

        console.log("xxxTitle", { title, description, name });
      });

      /*  */

      // Perform your scraping logic here
      let extractedRecipe: any = null;

      const dom = new JSDOM(html);

      // Find the JSON-LD script tag
      const jsonLdScript: any = dom.window.document.querySelector(
        'script[type="application/ld+json"]'
      );

      console.log(
        "xxxDom",
        dom,
        "xxxJsonLdScript...",
        jsonLdScript,
        "xxxHTML",
        html
      );

      if (jsonLdScript === null) {
        console.log("Encounter issues when copying recipe");
        // return; TODO:
      } else {
        // Extract the content
        const jsonLdContent = jsonLdScript.textContent;

        // Parse the JSON
        const jsonLdObject = JSON.parse(jsonLdContent);

        // Access the data
        const context = jsonLdObject["@context"] || jsonLdObject[0]["@context"];

        // TODO find ["@graph"] and ["@type"] = "Recipe"
        const type =
          (jsonLdObject && jsonLdObject["@type"]) || jsonLdObject[0]["@type"];
        //
        console.log("xxxType", {
          type: type || type[0],
          context,
          jsonLdContent,
          jsonLdObject,
        });
        //
        /*  if (!type.includes("Recipe") || !type[0].includes("Recipe")) {
          // return;
          //
          res.status(400).json({
            success: false,
            type: type || type[0],
            message: "Application only parses recipes",
            error: "Bad Request",
            html,
          });
          // return;
        } */
        extractedRecipe = jsonLdObject[0] || jsonLdObject;
      }
      res.status(200).json({ success: true, extractedRecipe, html });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getGraphRecipe(schemaScript: any): Promise<any> {
  // Extract recipe data
  console.log("xxxgetGraphRecipe...");

  try {
    // ACCEPTED URLS
    /* 
      - Half Baked Harvest (some work)
    */

    let recipeResult: any = {};

    // const response = await axios.get(url);
    // const html = response.data;
    // const $ = cheerio.load(html);

    // Find the script tag containing the Yoast schema
    // const schemaScript = $('script[type="application/ld+json"]').html();

    console.log("xxxSchemaScript:", schemaScript);

    if (schemaScript) {
      const schema = JSON.parse(schemaScript);
      console.log("xxxSchema:", schema);

      // Find the Recipe object in the schema
      const recipe = schema["@graph"]?.find(
        (item: any) => item && item["@type"] === "Recipe"
      );

      // TODO: !important if not recipe try @graph

      console.log("xxxRecipe", recipe);

      if (recipe) {
        const res = {
          name: recipe.name,
          description: recipe.description,
          ingredients: recipe.recipeIngredient,
          instructions: recipe.recipeInstructions.map((step: any) => step.text),
          image: recipe.image["@id"],
          cookTime: recipe.cookTime,
          prepTime: recipe.prepTime,
          recipeYield: recipe.recipeYield,
        };
        recipeResult = recipe;
        return res;
      }
      return recipe;
      /*  res
          .status(200)
          .json({ success: true, data: { ...recipe }, recipeResult }); */
    } else {
      return { error: "Bad Request" };
      // res.status(200).json({ success: true, data: html, recipeResult });
    }
  } catch (error: any) {
    return { error: "XHR Issue" };
    // res.status(500).json({ success: false, error: error.message });
  }
}
