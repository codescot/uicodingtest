import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.filter('rounded', function (value) {
  return value.toFixed(2);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
