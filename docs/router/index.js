import Vue from 'vue'
import Router from 'vue-router'
import Index from '@docs/modules/index.vue'
import Button from '@docs/modules/button/index.vue'
import Select from '../modules/selector/index.vue'
import Input from '@docs/modules/input/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: 'button',
      children: [
        {
          path: '/button',
          name: 'button',
          component: Button
        },
        {
          path: '/input',
          name: 'input',
          component: Input
        },
        {
          path: '/select',
          name: 'select',
          component: Select
        }
      ]
    }
  ]
})
