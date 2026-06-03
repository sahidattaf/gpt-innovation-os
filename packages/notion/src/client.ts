import { Client } from "@notionhq/client";

function getNotionClient(): Client {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) throw new Error("Missing NOTION_API_KEY");
  return new Client({ auth: apiKey });
}

export const notionClient = getNotionClient();
