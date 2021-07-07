import Vue from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-sugar.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

Vue.config.productionTip = false
Vue.use(VueToast);
Vue.mixin({
    methods: {
        toastError(message) {
            return this.$toast.error(message, {
                position: 'top-left'
            })
        },
        toastSuccess(message) {
            return this.$toast.success(message, {
                position: 'top-left'
            })
        }
    },
})
new Vue({
    render: h => h(App),
}).$mount('#app')
