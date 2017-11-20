import './assets/styles/reset.sass'
import './assets/icons/iconfont.css'
import Button from './components/button/index.js'
import ZgInput from './components/input/index'
import ZgCheckbox from './components/checkbox/index'
import {zgSelector, ZgOption, ZgOptGroup} from './components/selector/index'
import {dataGrid, gridColumn} from './components/dataGrid/index'
import tooltip from './components/tooltip/index'
import badge from './components/badge/index'
import loading from './components/loading/index'

import directives from './directives/main'

const components = [
  Button,
  ZgInput,
  zgSelector,
  ZgOption,
  ZgOptGroup,
  ZgCheckbox,
  dataGrid,
  gridColumn,
  tooltip,
  badge,
  loading
]

const install = function (Vue) {
  for (let key in directives) {
    let directive = directives[key]
    Vue.directive(key, directive)
  }
  components.forEach((component) => {
    component.install(Vue)
  })
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
