<template>
  <li v-show="show" class="zg-option" :class="className" @click="onClick">
    <slot>
      <span v-if="icon" class="zg-option-icon" :class="icon"></span>
      <zg-checkbox v-if="checkAble" :label="label" v-model="checked"></zg-checkbox>
      <template v-if="!checkAble">{{label}}</template>
    </slot>
  </li>
</template>

<script>
  import ZgCheckbox from '../checkbox/checkbox.vue'

  export default {
    components: {ZgCheckbox},
    name: 'ZgOption',
    props: {
      /**
       * icon名称
       */
      icon: {
        type: String
      },
      /**
       * 选项展示文本
       */
      label: {
        type: String
      },
      /**
       * 选项值
       */
      value: {},
      /**
       * 是否可以勾选
       */
      checkAble: {
        type: Boolean,
        default: false
      },
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
      return {
        checked: this.defaultChecked,
        show: true
      }
    },
    computed: {
      className: function () {
        if (this.disable) {
          return 'zg-disable'
        } else if (this.checked) {
          return 'zg-checked'
        }
        return ''
      }
    },
    methods: {
      onClick () {
        this.$emit('check', this.value)
      }
    }
  }
</script>

<style lang="sass">
@import "styles/option"
</style>
