import Vue from 'vue'
import Router from 'vue-router'
import Index from '@docs/modules/index.vue'
import Button from '@docs/modules/button/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/button',
          name: 'button',
          component: Button
        }
      ]
    }
  ]
})
