import Button from './components/button/index.js'
import ButtonGroup from './components/buttonGroup/index.js'
import './assets/styles/reset.sass'
import './assets/icons/iconfont.css'

const components = [
  Button,
  ButtonGroup
]

const install = function (Vue) {
  components.map((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  Button,
  ButtonGroup
}
