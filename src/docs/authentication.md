---
title: Authentication & Tokens
description: How auth middleware is detected and how the single bearer-token variable keeps every request ready to send.
---

The package figures out which routes are protected by reading their middleware, and wires up a bearer token so requests work the moment you paste one in.

## Guard detection

Any route with `auth:<guard>` middleware is treated as authenticated. Sanctum, Passport, JWT and custom guards are all detected the same way — by their middleware, not by guessing.

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('projects', ProjectController::class);
});
```

Every request inside that group is marked as protected.

## A single token variable

Rather than juggle a different token per guard, the package uses one Postman variable — `{{token}}` by default. Protected requests send it as a bearer header:

```text
Authorization: Bearer {{token}}
```

Set the `token` variable once in your environment and every authenticated request is ready. Rename it with `auth_token_variable` in the config if you prefer something else.

## Login token capture

For routes that look like a login endpoint, the generated test script captures the returned token straight into the environment:

```javascript
pm.environment.set("token", pm.response.json().token);
```

Run the login request once and the rest of the collection is authenticated automatically.

## Public routes

Routes without auth middleware are left open — no Authorization header is added — so your public endpoints stay public.
