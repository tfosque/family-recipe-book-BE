import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cors from "../../../../lib/app-middleware";
import * as cheerio from "cheerio";

export default async function handler(req: any, res: any) {
  await cors(req, res);

  if (req.method === "GET") {
    try {
      // delish
      const url = "https://www.allrecipes.com/gallery/easy-mexican-dishes/";

      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      // Perform your scraping logic here
      const scrapedData: any = [];

      $(".some-class").each((index, element) => {
        const title = $(element).find(".title").text().trim();
        const author = $(element).find(".author").text().trim();
        const cookTime = $(element).find(".cookTime").text().trim();
        const datePublished = $(element).find(".datePublished").text().trim();
        const description = $(element).find(".description").text().trim();
        const hasPart = $(element).find(".hasPart").text().trim();
        const headline = $(element).find(".headline").text().trim();
        const image = $(element).find(".image").text().trim();
        const isAccessibleForFree = $(element)
          .find(".isAccessibleForFree")
          .text()
          .trim();
        const isBasedOn = $(element).find(".isBasedOn").text().trim();
        const keywords = $(element).find(".keywords").text().trim();
        const mainEntityOfPage = $(element)
          .find(".mainEntityOfPage")
          .text()
          .trim();
        const name = $(element).find(".name").text().trim();
        const prepTime = $(element).find(".prepTime").text().trim();
        const publisher = $(element).find(".publisher").text().trim();
        const recipeCategory = $(element).find(".recipeCategory").text().trim();
        const recipeCuisine = $(element).find(".recipeCuisine").text().trim();
        const recipeIngredient = $(element)
          .find(".recipeIngredient")
          .text()
          .trim();
        const recipeInstructions = $(element)
          .find(".recipeInstructions")
          .text()
          .trim();
        const recipeYield = $(element).find(".recipeYield").text().trim();
        const thumbnailUrl = $(element).find(".thumbnailUrl").text().trim();
        const totalTime = $(element).find(".totalTime").text().trim();
        const url = $(element).find(".url").text().trim();
        const video = $(element).find(".video").text().trim();

        scrapedData.push({
          title,
          author,
          cookTime,
          datePublished,
          description,
          hasPart,
          headline,
          image,
          isAccessibleForFree,
          isBasedOn,
          keywords,
          mainEntityOfPage,
          name,
          prepTime,
          publisher,
          recipeCategory,
          recipeCuisine,
          recipeIngredient,
          recipeInstructions,
          recipeYield,
          thumbnailUrl,
          totalTime,
          url,
        });
      });

      console.log("xxxscrapedData", scrapedData);
      res.status(200).json({ success: true, data: scrapedData, html });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function extractRecipe() {
  // Extract recipe data
  // const title = $('h1').first().text().trim();
  // const ingredients = $('ul.ingredients li').map((_, el) => $(el).text().trim()).get();
  // const instructions = $('ol.instructions li').map((_, el) => $(el).text().trim()).get();
  /*  const recipeData = {
      title,
      ingredients,
      instructions
    }; */
}
