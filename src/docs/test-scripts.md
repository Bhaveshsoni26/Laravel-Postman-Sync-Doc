---
title: Test Scripts
description: The baseline test scripts attached to every request, login-token capture, and how to turn generation off.
---

Each generated request comes with a small test script, so the collection is useful for smoke-testing the API, not just sending requests.

## Baseline assertions

Every request gets a script that checks the essentials:

```javascript
pm.test("Status code is 2xx", function () {
    pm.response.to.be.success;
});

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});
```

Run the folder in the Postman Collection Runner and you get an instant health check across your API.

## Login-token capture

Login endpoints get an extra line that stores the returned token in the environment, so the rest of the collection authenticates itself after one request:

```javascript
pm.environment.set("token", pm.response.json().token);
```

## Turning it off

If you don't want test scripts, set `generate_tests` to `false` in `config/postman-sync.php`. Existing scripts you've written in Postman are preserved on merge either way.
