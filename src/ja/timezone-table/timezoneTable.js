import { createApp } from 'vue'
import { getI18n } from '../../lib/i18n'
import App from '../../timezone-table/TimezoneTable.vue'

const app = createApp(App)
app.use(getI18n('ja'))
app.mount('#timezone-table-app')
