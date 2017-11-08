/**
 * Created by yqdong on 2017/11/7.
 * qq: 1013501639
 * @author yqdong
 *
 */
import dataGrid from './dataGrid.vue'
import gridColumn from './gridColumn.vue'

let components = {
  dataGrid,
  gridColumn
}

for (const key in components) {
  components[key].install = function (Vue) {
    Vue.component(key, components[key])
  }
}

export {
  dataGrid,
  gridColumn
}
