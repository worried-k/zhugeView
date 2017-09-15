import Panel from './components/panel/index.js'

const components = [
  Panel
]

const install = function (Vue) {
  components.map((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  Panel
}
