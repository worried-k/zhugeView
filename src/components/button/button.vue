<template>
  <button
    @click="onClick"
    :type="nativeType"
    :disabled="disabled"
    :class="buttonClass">
      <span><i :class="['icon-' + icon]" v-if="icon"></i><slot></slot></span>
    </button>
</template>
<script>
export default {
  name: 'ZgButton',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: String,
    theme: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: Boolean,
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
