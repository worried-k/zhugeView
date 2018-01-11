<template>
  <span class="zg-input" :class="clazz" :style="style" @click="onClick">
    <i class="zg-input-icon" :class="icon"></i>
    <input ref="input"
           class="zg-input-input"
           type="text"
           :style="inputStyle"
           :placeholder="placeholder"
           v-model="inputValue"
           :readonly="readOnly"
           @focus="onFocus"
           @blur="onBlur"
           @keyup="onKey"
    />
    <i v-if="clearAble && inputValue"
       class="zg-input-clear zgicon-delete-little1"
       @click="onClear"
    ></i>
  </span>
</template>

<script>
  import {util} from '../../utils/index'
  export default {
    name: 'ZgInput',
    props: {
      /**
       * @description value
       */
      value: {
        type: String
      },
      /**
       * @description 提示文本内容
       */
      placeholder: {
        type: String
      },
      /**
       * @description icon名称
       */
      icon: {
        type: String
      },
      /**
       * @description 输入框宽度
       */
      width: {
        type: [Number, String],
        default: 150,
        validator (value) {
          if (util.isString(value)) {
            return ['auto', '100%'].indexOf(value) > -1
          }
          return value > 0
        }
      },
      /**
       * @description 是否可清空内容
       */
      clearAble: {
        type: Boolean,
        default: false
      },
      /**
       * @description 自动获取焦点
       */
      autoFocus: {
        type: Boolean,
        default: false
      },
      /**
       * @description 作为普通文本展示
       */
      readOnly: {
        type: Boolean,
        default: false
      },
      /**
       * @description todo 输入框类型
       */
      type: {
        type: String,
        default: 'text',
        validator (value) {
          return ['text', 'password'].includes(value)
        }
      }
    },
    data () {
      return {
        inputValue: this.value,
        active: this.autoFocus
      }
    },
    mounted () {
      this.autoFocus && this.focus()
    },
    computed: {
      clazz () {
        let clazz = []
        if (this.active) clazz.push('zg-active')
        return clazz
      },
      style () {
        let style = {
          width: util.isNumber(this.width) ? `${this.width}px` : this.width
        }
        return style
      },
      inputStyle () {
        return {
          'padding-left': this.icon ? '25px' : '10px',
          'padding-right': this.clearAble ? '25px' : '10px'
        }
      }
    },
    watch: {
      value (value) {
        this.inputValue = value
      },
      inputValue () {
        this.$emit('input', this.inputValue)
      }
    },
    methods: {
      onClick () {
        this.$refs.input.focus()
      },
      onClear () {
        this.inputValue = ''
      },
      onKey (event) {
        this.$emit('key', event)
      },
      onFocus () {
        this.active = true
        this.$emit('focus')
      },
      onBlur () {
        this.active = false
        this.$emit('blur')
      },
      focus () {
        this.$refs.input.focus()
      }
    }
  }
</script>

<style lang="sass">
@import "styles/input"
</style>
