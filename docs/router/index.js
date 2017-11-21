import Vue from 'vue'
import Router from 'vue-router'
import Index from '@docs/modules/index.vue'
import Button from '@docs/modules/button/index.vue'
import Checkbox from '../modules/checkbox/index.vue'
import Select from '../modules/selector/index.vue'
import Input from '@docs/modules/input/index.vue'
import grid from '../modules/dataGrid/index.vue'
import tooltip from '../modules/tooltip/index.vue'
import badge from '../modules/badge/index.vue'
import loading from '../modules/loading/index.vue'
import tab from '../modules/tab/index.vue'

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
          path: '/checkbox',
          name: 'checkbox',
          component: Checkbox
        },
        {
          path: '/select',
          name: 'select',
          component: Select
        },
        {
          path: '/grid',
          name: 'grid',
          component: grid
        },
        {
          path: '/tooltip',
          name: 'tooltip',
          component: tooltip
        },
        {
          path: '/badge',
          name: 'badge',
          component: badge
        },
        {
          path: '/loading',
          name: 'loading',
          component: loading
        },
        {
          path: '/tab',
          name: 'tab',
          component: tab
        }
      ]
    }
  ]
})
