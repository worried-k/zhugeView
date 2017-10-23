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
           @focus="active = true"
           @blur="active = false"
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
      value: {
        type: String
      },
      placeholder: {
        type: String
      },
      icon: {
        type: String
      },
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
      clearAble: {
        type: Boolean,
        default: false
      },
      autoFocus: {
        type: Boolean,
        default: false
      },
      /**
       * 作为普通文本展示
       */
      readOnly: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        inputValue: this.value,
        active: this.autoFocus
      }
    },
    mounted () {
      this.autoFocus && this.$refs.input.focus()
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
      }
    }
  }
</script>

<style lang="sass">
@import "styles/input"
</style>
