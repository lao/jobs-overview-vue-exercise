import Vue from 'vue'
import Router from 'vue-router'
import JobsList from './views/JobsList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JobsList',
      component: JobsList
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})
