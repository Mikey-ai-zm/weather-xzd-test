

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueEcharts from 'vue-echarts'
import 'echarts'
import 'reset-css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('v-chart',VueEcharts)

app.mount('#app')
