---
title: Configuration
description: Every option in config/postman-sync.php and the environment variables that control pushing to Postman.
---

The defaults work for a standard Laravel API. When you need to adjust behavior, everything lives in `config/postman-sync.php` and a handful of `.env` values.

## Environment variables

These control the connection to Postman. Only the API key is required to push.

```bash
POSTMAN_API_KEY=PMAK-xxxxxxxxxxxxxxxx
POSTMAN_WORKSPACE_ID=          # optional — target a workspace when creating
POSTMAN_COLLECTION_ID=         # optional — set to update an existing collection
```

See [Push & Incremental Merge](/docs/push-and-merge) for how to find each value.

## Config options

| Option | Default | What it does |
| --- | --- | --- |
| `api_prefix` | `api` | Only routes under this prefix are scanned. |
| `base_url` | `APP_URL/api` | Seeds the `{{base_url}}` Postman variable used in every request. |
| `auth_token_variable` | `token` | The single bearer-token variable authenticated requests reference. |
| `environments` | `['local', 'staging', 'production']` | Generates one Postman environment file per stage. |
| `inspect_form_requests` | `true` | Read form requests and controller input to build bodies and query params. |
| `generate_tests` | `true` | Attach baseline test scripts to every request. |
| `postman.sync_mode` | `merge` | `merge` preserves manual edits; `replace` overwrites the collection. |
| `postman.prune_orphans` | `false` | When merging, remove requests that no longer have a matching route. |

## Multiple guards

If your API uses several guards — say `crm`, `candidate` and `agency` — the package detects each one and still uses a single `{{token}}` variable so the collection stays simple. Set `auth_token_variable` if you'd prefer a different name.

## Output location

By default everything is written to `storage/app/postman/`. Override it per run with `--output`:

```bash
php artisan postman:sync --output=build/postman
```
