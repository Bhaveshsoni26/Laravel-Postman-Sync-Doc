---
title: Introduction
description: What Laravel Postman Sync does, who it's for, and how it keeps your Postman collection in step with your API.
---

Laravel Postman Sync turns your Laravel application into the single source of truth for your Postman collection. Instead of maintaining requests by hand, you run one Artisan command and the package generates a complete collection from your routes — bodies, validation, auth, documentation and tests included.

## The idea

A Postman collection drifts the moment your API changes. Someone adds a route, tweaks a validation rule, or renames a field, and the shared collection quietly falls out of date. Keeping it current by hand is tedious, so it rarely happens.

This package treats the collection as a **build artifact**. Your routes already describe your API precisely — the methods, the paths, the validation, the auth. Laravel Postman Sync reads that description and produces the collection from it, so re-running the command always gives you an accurate result.

## What it generates

From a standard Laravel API, a single sync produces:

- A **Postman Collection v2.1** with folders that mirror your URL paths.
- **Request bodies** built from form requests and controller input, with example values.
- **Query parameters** for `GET` routes, pulled from the controller.
- **Authentication** — a `Bearer {{token}}` header on protected routes, with the guard detected automatically.
- **Documentation** embedded in each request's Docs tab, plus an OpenAPI 3 export.
- **Test scripts** that assert status, response time and JSON shape.
- A reusable **environment** with `{{base_url}}` and a `{{token}}` variable per stage.

## Who it's for

If your team shares a Postman collection and you're tired of it going stale, this is for you. It fits solo projects and large APIs alike, and it's designed to run unattended in CI so the collection updates on every deploy.

## Next steps

Head to [Installation](/docs/installation) to add the package, then [Configuration](/docs/configuration) to point it at your Postman workspace. If you just want to see it work, the [Commands](/docs/commands) page walks through your first sync.
