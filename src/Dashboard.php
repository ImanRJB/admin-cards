<?php

namespace Milyoona\NovaHorizon;

use Milyoona\NovaHorizon\Cards\CompletedJobs;
use Milyoona\NovaHorizon\Cards\FailedJobs;
use Milyoona\NovaHorizon\Cards\PendingJobs;
use Milyoona\NovaHorizon\Cards\Stats;
use Milyoona\NovaHorizon\Cards\Workload;
use Laravel\Nova\Dashboard as NovaDashboard;

class Dashboard extends NovaDashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new Stats,
            new Workload,
            new PendingJobs,
            new FailedJobs,
            new CompletedJobs,
        ];
    }

    public static function label()
    {
        return 'Horizon';
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public static function uriKey()
    {
        return 'horizon';
    }
}
