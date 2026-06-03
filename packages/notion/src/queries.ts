import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notionClient } from "./client";
import type { NotionPage } from "./types";

function isFullPage(page: object): page is PageObjectResponse {
  return "created_time" in page;
}

function mapPage(page: object): NotionPage {
  if (!isFullPage(page)) {
    return { id: (page as { id: string }).id, url: "", createdTime: "", lastEditedTime: "", properties: {} };
  }
  return {
    id: page.id,
    url: page.url,
    createdTime: page.created_time,
    lastEditedTime: page.last_edited_time,
    properties: page.properties as NotionPage["properties"],
  };
}

export async function queryDatabase(databaseId: string): Promise<NotionPage[]> {
  const response = await notionClient.databases.query({ database_id: databaseId });
  return response.results.map(mapPage);
}

export async function getPage(pageId: string): Promise<NotionPage> {
  const page = await notionClient.pages.retrieve({ page_id: pageId });
  return mapPage(page);
}

export async function createPage(
  databaseId: string,
  properties: Record<string, unknown>,
): Promise<NotionPage> {
  const page = await notionClient.pages.create({
    parent: { database_id: databaseId },
    properties: properties as Parameters<typeof notionClient.pages.create>[0]["properties"],
  });
  return mapPage(page);
}
