---
title: Docs & OpenAPI
description: Documentation embedded in each request's Docs tab, plus an OpenAPI 3 export and optional standalone Markdown files.
---

Every request carries its own documentation, and the package also exports an OpenAPI 3 document — so your API is described in the format each tool expects.

## In-collection documentation

Open any generated request in Postman and check the **Docs** tab. You'll find:

- A short description of the endpoint.
- The expected request body, with each field's type and validation rules.
- Example responses.

This documentation is written into the collection itself, so it travels with the request wherever the collection goes.

## OpenAPI export

Every sync writes an `openapi.json` alongside the collection:

```bash
php artisan postman:sync --only=openapi
```

Use it to feed Swagger UI, generate client SDKs, or import into any tool that speaks OpenAPI 3.

## Standalone Markdown

If you'd like documentation as files on disk — for a docs site or a repo — add `--docs-files`:

```bash
php artisan postman:sync --docs-files
```

This writes one Markdown file per endpoint in addition to the in-collection docs.
