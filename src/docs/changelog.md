---
title: Changelog
description: Release history for Laravel Postman Sync.
---

All notable changes to the package, newest first.

## v1.2.0 — Push & incremental merge

- One-command push to the Postman API.
- Incremental merge that adds new routes and updates changed ones while preserving manual edits.
- `--fresh` flag for a full replace.
- Orphaned-request reporting with optional pruning.

## v1.1.0 — In-Postman docs & OpenAPI

- Documentation written into each request's Docs tab.
- OpenAPI 3 export (`openapi.json`).
- Auto-generated test scripts with login-token capture.
- Standalone Markdown docs via `--docs-files`.

## v1.0.0 — Initial release

- Automatic route discovery across `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `apiResource` and `resource`.
- Postman Collection v2.1 generation with path-mirrored folders.
- Request bodies from form requests and controller input.
- Validation rules exported into documentation.
- Authentication detection for Sanctum, Passport, JWT and custom guards.
- Reusable Postman environments with `{{base_url}}` and `{{token}}`.
