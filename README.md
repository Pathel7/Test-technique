# Laravel  

Back-end 
- [x] Laravel 12 + PHP 8

---

### Set Up 

Create `.env` file from the example
```
cp .env.example .env
```

Generate an application key
```
php artisan key:generate
```

Install dependencies 
```
composer install
``` 

### Routes 


##### `routes/api.php` 

```php
Route::post('auth/register', [AuthenticationController::class, 'register']);
Route::post('auth/login', [AuthenticationController::class, 'login']);

``` 


### Laravel Docs 

https://laravel.com/docs/10.x
