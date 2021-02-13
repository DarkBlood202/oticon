import Vue from 'vue';
import App from './components/App.vue';

new Vue({
    render: f => f(App)
}).$mount('#app');