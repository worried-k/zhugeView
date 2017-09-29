<template>
  <li class="zg-option" :class="className">
    <slot>
      <span v-if="icon" class="icon" :class="icon"></span>
      <span>{{label}}</span>
    </slot>
  </li>
</template>

<script>
  export default {
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
       * 是否被选中
       */
      checked: {
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
        msg: 'option'
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

</style>
