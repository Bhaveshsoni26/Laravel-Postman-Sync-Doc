---
title: Commands
description: The postman:sync command and every flag it accepts, with the output you can expect.
---

Everything runs through a single Artisan command: `postman:sync`. Flags decide what it generates and whether it pushes.

## Generate locally (dry run)

```bash
php artisan postman:sync
```

Scans your routes and writes the collection, environments and OpenAPI document to `storage/app/postman/`. Nothing is sent to Postman — this is the safe way to preview output.

```text
Routes Found        164
Requests Generated  164
Files Written       5
Synced Successfully
```

## Push to Postman

```bash
php artisan postman:sync --push
```

Generates, then uploads to Postman. With a collection id configured it performs an incremental merge; without one it creates a new collection and prints the id.

```text
Pushed to Postman (merge): added 10, updated 2, unchanged 152, orphaned 0
```

## Force a full replace

```bash
php artisan postman:sync --push --fresh
```

Replaces the remote collection entirely instead of merging. `--mode=replace` does the same thing.

## Selective output

Generate only what you need with `--only`:

```bash
php artisan postman:sync --only=collection
php artisan postman:sync --only=environment
php artisan postman:sync --only=openapi
```

## Standalone documentation files

```bash
php artisan postman:sync --docs-files
```

Writes per-endpoint Markdown docs to disk in addition to the in-collection documentation.

## Flag reference

| Flag | Effect |
| --- | --- |
| `--push` | Upload to the Postman API after generating. |
| `--fresh` | Replace the remote collection instead of merging. |
| `--mode=replace` | Same as `--fresh`. |
| `--only=` | Limit output to `collection`, `environment` or `openapi`. |
| `--docs-files` | Also write Markdown docs to disk. |
| `--output=` | Change the output directory. |
