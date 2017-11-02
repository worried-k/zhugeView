<template>
  <li v-show="show" class="zg-option" :class="className" @click="click" :title="label">
    <slot>
      <span v-if="icon" class="zg-option-icon" :class="icon"></span>
      <zg-checkbox v-if="checkAble"
                   :label="label"
                   :disable="disable"
                   v-model="checked"
                   @change="click"></zg-checkbox>
      <template v-if="!checkAble">{{label}}</template>
    </slot>
  </li>
</template>

<script>
  import ZgCheckbox from '../checkbox/checkbox.vue'
  import emitter from '../../mixins/emitter'
  import {util} from '../../utils/index'
  export default {
    components: {ZgCheckbox},
    name: 'ZgOption',
    mixins: [emitter],
    props: {
      /**
       * @description icon名称
       */
      icon: {
        type: String
      },
      /**
       * @description 选项值
       */
      value: null,
      /**
       * @description 是否被选中
       */
      defaultChecked: {
        type: Boolean,
        default: false
      },
      /**
       * @description 禁用选项
       */
      disable: {
        type: Boolean,
        default: false
      },
      /**
       * @description 静默模式，该模式下，选项的点击事件将不进行默认处理
       * @tip 如想让选项被选中，修改silence为false，外部调用该option的引用：ref，再调用click方法
       */
      silence: {
        type: Boolean,
        default: false
      }
    },
    data () {
      let data = {
        checked: this.defaultChecked,
        show: true,
        checkAble: this.parent('ZgSelect').$props.multiple,
        labelField: this.parent('ZgSelect').$props.labelField
      }
      return data
    },
    computed: {
      className () {
        let clazz = []
        if (this.disable) {
          clazz.push('disable')
        } else if (this.checked && !this.checkAble) {
          clazz.push('active')
        }
        return clazz.join(' ')
      },
      label () {
        if (util.isObject(this.value)) {
          return this.value[this.labelField]
        }
        return this.value
      }
    },
    mounted () {
      if (this.checked) this.click()
    },
    methods: {
      click () {
        if (this.disable || this.silence) return
        if (!this.checkAble) {
          // 如果当前是单选模式，且该选项已被选中
          if (this.checked) return
          this.checked = true
        }
        this.dispatch('ZgSelect', 'onClickOption', [this.value, this.checked])
        this.$emit('check', this.value, this.checked)
      }
    }
  }
</script>

<style lang="sass">
@import "styles/option"
</style>
