import { z } from "zod";



export const getLatestNewsParameters = z.object({
  q: z
    .string()
    .optional()

      .describe("Search news articles for specific keywords or phrases present in the news title, content, URL, meta keywords and meta description. The value must be URL-encoded and the maximum character limit permitted is 100 characters."),
  language: z
    .string()
    .optional()

      .describe("Search the news articles for a specific language. You can add up to 5 languages in a single query. For example: zh,en."),
  country: z
    .string()
    .optional()

      .describe("Search the news articles from a specific country. You can add up to 5 countries in a single query."),
});