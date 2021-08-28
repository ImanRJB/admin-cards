<template>
    <card>
        <div class="flex items-center justify-between p-3">
            <h5 class="text-base text-80 font-bold">وضعیت Supervisor ها</h5>
        </div>

        <component-loading v-if="!ready"></component-loading>

        <table v-if="ready" class="table w-full">
            <thead>
            <tr>
                <th scope="col">میکروسرویس</th>
                <th scope="col">وضعیت سرویس</th>
                <th scope="col">وضعیت Supervisor</th>
                <th scope="col">عملیات Supervisor</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="microservice in microservices">
                <td style="text-align: center">{{ capitalizeFirstLetter(microservice.name.replace('ml_', '')) }}</td>
                <td style="text-align: center">
                    <div :class="['service-status', {'blink' : !microservice.status}]">
                        <div style="text-align: center; text-transform:capitalize; font-weight: bold"></div>
                    </div>
                </td>
                <td style="text-align: center">
                    <div :class="['supervisor-status',
                         {'blink' : microservice['supervisor']['statename'] === 'FATAL' || microservice['supervisor']['statename'] === 'BACKOFF' || microservice['supervisor']['statename'] === 'NOT FOUND'},
                         {'starting' : microservice['supervisor']['statename'] === 'STARTING' || microservice['supervisor']['statename'] === 'STOPPED'},
                         {'runnig' : microservice['supervisor']['statename'] === 'RUNNING'}
                         ]">
                        <div v-if="microservice['supervisor'] == []" style="text-align: center;">
                            یافت نشد
                        </div>
                        <div v-else style="text-align: center;">
                            {{ microservice['supervisor']['statename'] }}
                        </div>
                    </div>
                </td>
                <td style="text-align: center">
                    <button :disabled="disableButton" class="btn btn-success"
                            @click="startSupervisor(microservice.name)">Start
                    </button>
                    <button :disabled="disableButton" class="btn btn-success"
                            @click="restartSupervisor(microservice.name)">Restart
                    </button>
                    <button :disabled="disableButton" class="btn btn-danger" @click="stopSupervisor(microservice.name)">
                        Stop
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </card>
</template>

<script>

export default {
    data() {
        return {
            disableButton: false,
            microservices: {},
            ready: false,
        }
    },
    mounted() {
        this.getMicroservices();
        this.interval = setInterval(() => {
            this.getMicroservices();
        }, 15000)
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        startSupervisor(microservice) {
            this.disableButton = true;
            Nova.request().get(`/admin-cards/supervisor/start/${microservice}`)
                .then(response => {
                    this.disableButton = false;
                    if (response.data.status === 200) {
                        this.$toasted.show(response.data.message, {type: "success"});
                    } else {
                        this.$toasted.show(response.data.message, {type: "error"});
                    }
                })
                .catch(error => {
                    this.disableButton = false;
                    this.$toasted.show("خطای ناشناس", {type: "error"});
                })
        },
        restartSupervisor(microservice) {
            this.disableButton = true;
            Nova.request().get(`/admin-cards/supervisor/restart/${microservice}`)
                .then(response => {
                    this.disableButton = false;
                    if (response.data.status === 200) {
                        this.$toasted.show(response.data.message, {type: "success"});
                    } else {
                        this.$toasted.show(response.data.message, {type: "error"});
                    }
                })
                .catch(error => {
                    this.disableButton = false;
                    this.$toasted.show("خطای ناشناس", {type: "error"});
                })
        },
        stopSupervisor(microservice) {
            this.disableButton = true;
            Nova.request().get(`/admin-cards/supervisor/stop/${microservice}`)
                .then(response => {
                    this.disableButton = false;
                    if (response.data.status === 200) {
                        this.$toasted.show(response.data.message, {type: "success"});
                    } else {
                        this.$toasted.show(response.data.message, {type: "error"});
                    }
                })
                .catch(error => {
                    this.disableButton = false;
                    this.$toasted.show("خطای ناشناس", {type: "error"});
                })
        },
        getMicroservices() {
            Nova.request().get('/admin-cards/supervisors')
                .then(response => {
                    this.microservices = response.data.microservices;
                    this.ready = true;
                    // this.models = response.data.models;
                    // this.getErrorsChart();
                });
        },

    }
}
</script>

<style scoped>
.p-8 {
    padding: 2rem;
}

.bg-gray-100 {
    background: #f7fafc;
}

.border-gray-300 {
    border-color: #e2e8f0;
}

.title {
    font-size: 1rem;
}

.blink {
    animation: blink-animation 1s steps(5, start) infinite;
    -webkit-animation: blink-animation 1s steps(5, start) infinite;
    background-color: #dc3545 !important;
    color: white;
}

@keyframes blink-animation {
    to {
        visibility: hidden;
    }
}

@-webkit-keyframes blink-animation {
    to {
        visibility: hidden;
    }
}

.service-status {
    width: 20px;
    background-color: rgb(90, 230, 172);
    display: inline-block;
    border-radius: 1px;
    padding: 10px;
    margin: 5px;
    border-radius: 50%;
}

.supervisor-status {
    width: 100px;
    display: inline-block;
    border-radius: 1px;
    padding: 10px;
    margin: 5px;
    border-radius: 8px;
}

.runnig {
    background-color: rgb(90, 230, 172) !important;
}

.stop {
    background-color: #dc3545 !important;
}

.starting {
    background-color: #f3d618 !important;
}

.btn {
    border-radius: 8px;
    text-align: center;
    font-weight: normal;
    padding: 10px;
    margin: 0 10px;
    outline: none !important;
}

.btn-success {
    background-color: rgb(90, 230, 172);
}

.btn-success:hover:enabled {
    background-color: green;
}

.btn-danger {
    background-color: #dc3545;
}

.btn-danger:hover:enabled {
    background-color: #840000;
}
</style>
