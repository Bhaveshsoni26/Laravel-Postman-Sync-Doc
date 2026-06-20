---
title: FAQ
description: Common questions about synchronization, auth support, CI/CD, Laravel 12 and production readiness.
---

## How does synchronization actually work?

The package scans your API routes, reflects the controllers and form requests behind them, and builds a Postman Collection v2.1 in memory. With `--push` it fetches the existing collection, merges in new and changed requests by a stable id, and uploads the result.

## Does it support Sanctum, Passport and JWT?

Yes. It detects auth middleware for Sanctum, Passport, JWT and custom guards, marks protected routes, and adds an `Authorization: Bearer {{token}}` header so requests are ready to send once you set the token.

## Can I run it in CI/CD?

Absolutely — it's a core use case. Add one `postman:sync --push` step to your pipeline with the API key and collection id as secrets, and Postman stays current on every deploy. See [CI / CD](/docs/ci-cd).

## Does it work with Laravel 12?

Yes. The package supports Laravel 10, 11 and 12 on PHP 8.2 and above.

## Will it overwrite edits I made in Postman?

No. The default merge mode preserves requests you haven't changed in code — including manual docs, tests and examples. Use `--fresh` only when you explicitly want a full replace.

## What if a route has no form request?

The package reads the controller body for input keys (`$request->input('...')`, query parameters and so on) and builds the body or query string from those. Routes without any detectable input simply get an empty body.

## Is it production ready?

Yes. It's covered by an extensive test suite, passes static analysis at a strict level, and produces deterministic output so re-runs create minimal diffs.
