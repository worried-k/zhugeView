import './assets/styles/reset.sass'
import './assets/icons/iconfont.css'
import Button from './components/button/index.js'
import ButtonGroup from './components/buttonGroup/index.js'
import {ZgSelect, ZgOption, ZgOptGroup} from './components/selector/index'

const components = [
  Button,
  ButtonGroup,
  ZgOption,
  ZgOptGroup,
  ZgSelect
]

const install = function (Vue) {
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
