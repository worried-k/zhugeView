import './assets/styles/reset.sass'
import './assets/icons/iconfont.css'
import Button from './components/button/index.js'
import ButtonGroup from './components/buttonGroup/index.js'

const components = [
  Button,
  ButtonGroup
]

const install = function (Vue) {
  components.map((component) => {
    Vue.component(component.name, component)
  })
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Button,
  ButtonGroup
}
