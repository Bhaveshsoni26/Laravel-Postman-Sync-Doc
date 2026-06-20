---
title: Push & Incremental Merge
description: Push to the Postman API, how incremental merge preserves your manual edits, and where to find your API key, collection id and workspace id.
---

`--push` sends the generated collection to the Postman API. The first push creates a collection; later pushes merge into it without discarding your work.

## Your first push

Leave `POSTMAN_COLLECTION_ID` empty and run:

```bash
php artisan postman:sync --push
```

The package creates a new collection and prints its id:

```text
Pushed to Postman (create): added 164, ... [12345678-aaaa-bbbb-cccc-1234567890ab]
```

Copy that id into your `.env` so future pushes update the same collection:

```bash
POSTMAN_COLLECTION_ID=12345678-aaaa-bbbb-cccc-1234567890ab
```

## Incremental merge

With a collection id set, `--push` merges instead of overwriting:

- **New routes** are added.
- **Changed routes** — different method, path, body or auth — are regenerated.
- **Unchanged requests** are left exactly as they are, including any docs, tests or examples you edited by hand in Postman.

Every run prints an audit line:

```text
Pushed to Postman (merge): added 10, updated 2, unchanged 152, orphaned 0
```

Routes that no longer exist are reported as `orphaned` and kept by default. Set `postman.prune_orphans` to `true` to remove them.

## Force a full replace

When you want generated output to win outright:

```bash
php artisan postman:sync --push --fresh
```

## Getting your Postman credentials

### API key

In Postman, open **[go.postman.co/settings/me/api-keys](https://go.postman.co/settings/me/api-keys)** (or your avatar → **Settings → API keys**), click **Generate API Key**, and copy the value — it starts with `PMAK-`.

### Collection id

The easiest way is the create flow above — push once with an empty id and copy what's printed. To target an existing collection, list them with your key and copy the `uid`:

```bash
curl -s -H "X-Api-Key: $POSTMAN_API_KEY" https://api.getpostman.com/collections
```

### Workspace id

Only needed when creating a collection in a specific workspace. Open the workspace and read the id from the URL after the `~`, or list them via the API:

```bash
curl -s -H "X-Api-Key: $POSTMAN_API_KEY" https://api.getpostman.com/workspaces
```
