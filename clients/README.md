# Clients

This directory stores per-client configuration files for white-label or custom deployments.

## Structure

```
clients/
  <client-slug>/
    config.json     ← client-specific settings
    prompts/        ← custom prompts for this client
    branding/       ← logo, colors, etc.
```

## Example config.json

```json
{
  "id": "client-slug",
  "name": "Client Name",
  "domain": "client.example.com",
  "plan": "pro",
  "features": ["storefront", "chatbot", "analytics"],
  "branding": {
    "primaryColor": "#2563eb",
    "logoUrl": "/logo.png"
  }
}
```
