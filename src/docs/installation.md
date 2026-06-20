---
title: Installation
description: Add Laravel Postman Sync to your project with Composer, publish the config, and run your first sync.
---

Laravel Postman Sync installs like any other Composer package and registers itself automatically.

## Requirements

- PHP **8.2** or higher
- Laravel **10**, **11** or **12**

## Install with Composer

```bash
composer require bhaveshsoni26/laravel-postman-sync
```

The service provider is discovered automatically — there's nothing to register by hand.

## Publish the configuration

```bash
php artisan vendor:publish --tag=postman-sync-config
```

This copies `config/postman-sync.php` into your app so you can adjust defaults. See [Configuration](/docs/configuration) for every option.

## Verify the install

Run the command with no flags to generate the collection locally without touching the network:

```bash
php artisan postman:sync
```

You should see a summary like:

```text
Routes Found        42
Requests Generated  42
Files Written       5
Synced Successfully
```

The generated files land in `storage/app/postman/` by default — a `collection.json`, an `openapi.json`, and one environment file per stage.

## Next

- [Configuration](/docs/configuration) — point it at your Postman workspace.
- [Commands](/docs/commands) — the full command reference.
- [Push & Incremental Merge](/docs/push-and-merge) — get the collection into Postman.
