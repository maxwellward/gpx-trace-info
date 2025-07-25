import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

// Components
import Button from "primevue/button"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
	theme: {
		preset: Aura
	}
});

app.component('p-button', Button);

app.mount('#app')
