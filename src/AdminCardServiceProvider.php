<?php

namespace Milyoona\AdminCards;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class AdminCardServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'admin-cards-tool');

        $this->app->booted(function () {
            $this->routes();
        });

        Nova::serving(function (ServingNova $event) {
            Nova::provideToScript([
                'novaHorizon' => [
                    'basePath' => Str::start(config('horizon.path'), '/'),
                ],
            ]);

            Nova::script('admin-cards', __DIR__.'/../dist/js/cards.js');
            Nova::style('admin-cards', __DIR__.'/../dist/css/cards.css');
        });
    }

    /**
     * Register the card's routes.
     *
     * @return void
     */
    protected function routes()
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        // Cards
        Route::middleware(['nova'])
            ->prefix('nova-vendor/admin-cards')
            ->group(__DIR__.'/../routes/api.php');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
