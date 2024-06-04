import { createApp } from 'vue'
import { getI18n } from '../lib/i18n'
import App from './Calendar.vue'

const app = createApp(App)
app.use(getI18n())
app.mount('#calendar-app')
