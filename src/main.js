// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.config.productionTip = false
Vue.use(VueMaterial)

const datetimeFormat = 'YYYY-MM-DD'
Vue.filter('datetime', (date) => {
	return moment(date).format(datetimeFormat)
})

Vue.filter('fromnow', (date) => {
	return moment(date).fromNow()
})
Vue.filter('truncate', (str, length) => {
	return (str.length > length ? str.slice(0, length - 1) + '…' : str)
})
/* eslint-disable  */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
