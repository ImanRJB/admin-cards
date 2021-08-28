// import VueJsonPretty from 'vue-json-pretty';

window.adminCards = {
    basePath: '/admin-cards',
}

Nova.booting((Vue, router, store) => {
    Vue.component('component-loading', require('./components/Material/Loading'));

    Vue.component('supervisor-status', require('./components/Cards/SupervisorStatus'));

    // Vue.component('admin-cards-stats', require('./components/Cards/Stats'));
    // Vue.component('admin-cards-workload', require('./components/Cards/Workload'));
    // Vue.component('admin-cards-pending-jobs', require('./components/Cards/PendingJobs'));
    // Vue.component('admin-cards-completed-jobs', require('./components/Cards/CompletedJobs'));
    // Vue.component('admin-cards-failed-jobs', require('./components/Cards/FailedJobs'));
    //
    // Vue.component('admin-cards-jobs-per-minute', require('./components/Cards/JobsPerMinute'));
    // Vue.component('admin-cards-recent-jobs-count', require('./components/Cards/RecentJobsCount'));
    // Vue.component('admin-cards-failed-jobs-count', require('./components/Cards/FailedJobsCount'));
    // Vue.component('admin-cards-status', require('./components/Cards/Status'));
    // Vue.component('admin-cards-total-processes', require('./components/Cards/TotalProcesses'));
    // Vue.component('admin-cards-max-wait-time', require('./components/Cards/MaxWaitTime'));
    // Vue.component('admin-cards-max-runtime', require('./components/Cards/maxRuntime'));
    // Vue.component('admin-cards-max-throughput', require('./components/Cards/MaxThroughput'));
    //
    // Vue.component('admin-cards-stack-trace', require('./components/StackTrace'));
    // Vue.component('admin-cards-json-pretty', VueJsonPretty);
});
