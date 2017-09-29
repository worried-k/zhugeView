/**
 * Created by yqdong on 2017/9/28.
 * qq: 1013501639
 * @author yqdong
 *
 */
import ZgOptGroup from './optGroup.vue'
import ZgOption from './option.vue'
import ZgSelect from './select.vue'

let components = {
  ZgOptGroup,
  ZgOption,
  ZgSelect
}

for (const key in components) {
  components[key].install = function (Vue) {
    Vue.component(key, components[key])
  }
}
export {
  ZgOption,
  ZgSelect,
  ZgOptGroup
}