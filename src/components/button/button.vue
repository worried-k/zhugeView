<template>
  <button
    @click="onClick"
    :type="nativeType"
    :disabled="disabled"
    :class="buttonClass">
      <i :class="iconClassArr" v-if="iconClassArr.length"></i><span><slot></slot></span>
    </button>
</template>
<script>
export default {
  name: 'ZgButton',
  props: {
    type: { // 可选值为：normal、submit、reset、primary、danger、secondary、successs或空
      type: String,
      default: ''
    },
    size: String, // 可选值为：small、noraml、large或空
    theme: {
      type: String,
      default: ''
    },
    icon: { // 内置icon文件的名称
      type: String,
      default: ''
    },
    iconClass: { // 自定义class的字符串
      type: String,
      default: ''
    },
    disabled: Boolean,
    nativeType: { // 可选值为：button、submit、reset
      type: String,
      default: 'button'
    }
  },
  computed: {
    buttonClass () {
      let mainClass = 'zg-button'
      let result = [mainClass]
      if (this.disabled) {
        result.push(`is-disabled`)
        return result
      }
      if (this.theme && this.theme !== 'normal') {
        result.push(`${mainClass}--${this.theme}`)
      }
      if (this.type && this.type !== 'normal') {
        result.push(`${mainClass}--${this.type}`)
      }
      if (this.size && this.size !== 'normal') {
        result.push(`${mainClass}--${this.size}`)
      }
      return result
    },
    iconClassArr () {
      let result = []
      if (this.icon) {
        result.push('icon-' + this.icon)
      }
      if (this.iconClass) {
        result.push(this.iconClass)
      }
      if ((this.icon || this.iconClass) && this.$slots.default) {
        result.push('zg-icon-padding')
      }
      return result
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="sass">
@import "./styles/button.sass"
</style>
