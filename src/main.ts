import { createApp } from 'vue'
import Home from './modules/home/home.page.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(Home).component('FontAwesomeIcon', FontAwesomeIcon).mount('#app')
