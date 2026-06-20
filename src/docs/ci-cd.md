---
title: CI / CD
description: Keep Postman in sync on every deploy with a single pipeline step. GitHub Actions, GitLab, Bitbucket and Jenkins.
---

Running the sync by hand works, but the real win is letting your pipeline keep Postman current automatically. It's one step.

## GitHub Actions

```yaml
name: Sync Postman
on:
  push:
    branches: [main]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
      - run: composer install --no-interaction --prefer-dist
      - run: php artisan postman:sync --push
        env:
          POSTMAN_API_KEY: ${{ secrets.POSTMAN_API_KEY }}
          POSTMAN_COLLECTION_ID: ${{ secrets.POSTMAN_COLLECTION_ID }}
```

Store the API key and collection id as repository secrets, and Postman updates on every push to `main`.

## Other platforms

The command is the same everywhere — only the secrets syntax differs.

**GitLab CI**

```yaml
sync-postman:
  script:
    - composer install --no-interaction
    - php artisan postman:sync --push
```

**Bitbucket Pipelines**

```yaml
- step:
    script:
      - composer install --no-interaction
      - php artisan postman:sync --push
```

**Jenkins**

```groovy
sh 'composer install --no-interaction'
sh 'php artisan postman:sync --push'
```

## A note on safety

In CI, the default merge mode is the right choice — it adds and updates without wiping manual edits. Reserve `--fresh` for the rare times you intentionally want to rebuild the collection from scratch.
