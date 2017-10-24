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
    /**
     * @description 可选值为：normal、submit、reset、primary、danger、secondary、successs或空
     */
    type: {
      type: String,
      default: ''
    },
    /**
     * @description 可选值为：small、noraml、large或空
     */
    size: String,
    /**
     *
     */
    theme: {
      type: String,
      default: ''
    },
    /**
     * @description 内置icon文件的名称
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * 自定义class的字符串
     */
    iconClass: {
      type: String,
      default: ''
    },
    /**
     *
     */
    disabled: Boolean,
    /**
     * 可选值为：button、submit、reset
     */
    nativeType: {
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
      if (!this.$slots.default) {
        result.push(`${mainClass}--icon`)
      }
      return result
    },
    iconClassArr () {
      let result = []
      if (this.icon) {
        result.push('zgicon-' + this.icon)
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
