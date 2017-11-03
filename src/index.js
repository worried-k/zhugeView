import './assets/styles/reset.sass'
import './assets/icons/iconfont.css'
import Button from './components/button/index.js'
import ButtonGroup from './components/buttonGroup/index.js'
import ZgInput from './components/input/index'
import ZgCheckbox from './components/checkbox/index'
import {zgSelector, ZgSelect, ZgOption, ZgOptGroup, ZgBigSelect} from './components/selector/index'

import directives from './directives/main'

const components = [
  Button,
  ButtonGroup,
  ZgInput,
  zgSelector,
  ZgOption,
  ZgOptGroup,
  ZgSelect,
  ZgBigSelect,
  ZgCheckbox
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
