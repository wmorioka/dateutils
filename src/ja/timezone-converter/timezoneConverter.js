import { createApp } from 'vue'
import { getI18n } from '../../lib/i18n'
import App from '../../timezone-converter/TimezoneConverter.vue'

const app = createApp(App)
app.use(getI18n('ja'))
app.mount('#timezone-converter-app')
