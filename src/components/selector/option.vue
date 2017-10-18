<template>
  <li v-show="show" class="zg-option" :class="className" @click="onClick" :title="label">
    <slot>
      <span v-if="icon" class="zg-option-icon" :class="icon"></span>
      <zg-checkbox v-if="checkAble"
                   :label="label"
                   :disable="disable"
                   v-model="checked"
                   @change="onClick"
      ></zg-checkbox>
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
       * icon名称
       */
      icon: {
        type: String
      },
      /**
       * 选项值
       */
      value: {},
      /**
       * 是否被选中
       */
      defaultChecked: {
        type: Boolean,
        default: false
      },
      /**
       * 禁用选项
       */
      disable: {
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
      if (this.defaultChecked) {
        this.dispatch('ZgSelect', 'onClickOption', [this.value, this.checked])
      }
    },
    methods: {
      onClick () {
        if (this.disable) return
        if (!this.checkAble) {
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
