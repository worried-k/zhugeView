<template>
  <li v-show="show" class="zg-option" :class="className" @click="onClick">
    <slot>
      <span v-if="icon" class="zg-option-icon" :class="icon"></span>
      <zg-checkbox v-if="checkAble"
                   :label="getLabel(value)"
                   :disable="disable"
                   v-model="checked"
                   @change="onClick"
      ></zg-checkbox>
      <template v-if="!checkAble">{{getLabel(value)}}</template>
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
        label: this.parent('ZgSelect').$props.labelField
      }
      return data
    },
    computed: {
      className: function () {
        let clazz = []
        if (this.disable) {
          clazz.push('disable')
        } else if (this.checked && !this.checkAble) {
          clazz.push('active')
        }
        return clazz.join(' ')
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
        this.$emit('check', this.value)
      },
      getLabel (value) {
        if (util.isString(value)) {
          return value
        }
        return value[this.label]
      }
    }
  }
</script>

<style lang="sass">
@import "styles/option"
</style>
