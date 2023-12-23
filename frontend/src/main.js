import './assets/main.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-green/theme.css';

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.use(ToastService);
app.mount('#app');