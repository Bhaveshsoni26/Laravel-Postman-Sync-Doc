---
title: Examples
description: Real before-and-after examples — a login route, a resource route, and a GET with query parameters.
---

The clearest way to understand the package is to see your code turn into Postman requests. Here are three common cases.

## A login route with validation

```php
// routes/api.php
Route::post('/login', [AuthController::class, 'login']);

// app/Http/Requests/LoginRequest.php
public function rules(): array
{
    return [
        'email'    => 'required|email',
        'password' => 'required|min:8',
    ];
}
```

The validation rules become a typed body with example values:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

## A resource route

```php
Route::apiResource('projects', ProjectController::class)
    ->middleware('auth:sanctum');
```

You get a `projects` folder with `index`, `store`, `show`, `update` and `destroy` requests — each with the right HTTP method, an `Authorization: Bearer {{token}}` header, and the path variable `{{base_url}}/projects/:id` where relevant.

## A GET with query parameters

```php
Route::get('/users', [UserController::class, 'index']);

// UserController@index
public function index(Request $request)
{
    $status = $request->query('status');
    $perPage = $request->query('per_page', 15);
    // ...
}
```

The package reads the controller and adds `status` and `per_page` as Postman query parameters, so the request is ready to filter:

```text
GET {{base_url}}/users?status=active&per_page=15
```
