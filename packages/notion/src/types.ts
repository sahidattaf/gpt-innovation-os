export interface NotionProperty {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface NotionPage {
  id: string;
  url: string;
  createdTime: string;
  lastEditedTime: string;
  properties: Record<string, NotionProperty>;
}
