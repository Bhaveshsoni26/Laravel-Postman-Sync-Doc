---
title: Folder Structure
description: How generated folders mirror your URL paths so the collection stays organised as your API grows.
---

The collection isn't a flat list of requests. Folders mirror your URL paths, so the structure in Postman matches the structure of your API.

## Path-based nesting

A route like `api/client/v7/login` becomes a request named `login`, nested under a `client` folder and a `v7` sub-folder:

```text
CRM API
├── client
│   └── v7
│       ├── login        POST
│       ├── register     POST
│       └── candidates   GET
└── billing
    └── invoices         GET
```

Each path segment becomes a folder; the final segment names the request. The result reads like a table of contents for your API.

## Why it matters

As an API grows, a flat collection becomes unusable. Mirroring the URL path keeps related endpoints together and makes a large collection navigable — you find a request the same way you'd find its route.

## Stable, deterministic output

Folders and requests are generated in a consistent order, and each request carries a stable id derived from its method and path. Re-running the sync produces the same structure every time, so diffs stay small and merges stay predictable.
