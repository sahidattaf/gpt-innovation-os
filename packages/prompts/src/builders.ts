import type { PromptContext } from "./types";

export function buildUserMessage(template: string, context: PromptContext): string {
  return template
    .replace("{{userName}}", context.userName ?? "there")
    .replace("{{productName}}", context.productName ?? "this product")
    .replace("{{productDescription}}", context.productDescription ?? "")
    .replace("{{userGoal}}", context.userGoal ?? "grow your business");
}

export function buildProductContext(context: PromptContext): string {
  const parts: string[] = [];

  if (context.productName) parts.push(`Product: ${context.productName}`);
  if (context.productDescription) parts.push(`Description: ${context.productDescription}`);
  if (context.userGoal) parts.push(`User Goal: ${context.userGoal}`);

  return parts.join("\n");
}
