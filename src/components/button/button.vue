<template>
  <button
    @click="onClick"
    :type="nativeType"
    :disabled="disabled"
    :class="buttonClass">
      <svg-icon :name="icon" v-if="icon"></svg-icon>
      <slot></slot>
    </button>
</template>
<script>
import svgIcon from '../svgIcon/svgIcon.vue'
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
      let result = []
      if (this.theme && this.theme !== 'normal') {
        result.push(`zg-${this.theme}-button`)
      } else {
        result.push(`zg-button`)
      }
      if (this.type) {
        result.push(`zg-button--${this.type}`)
      }
      if (this.size) {
        result.push(`zg-button--${this.size}`)
      }
      if (this.disabled) {
        result.push(`is-disabled`)
      }
      return result
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  },
  components: {
    svgIcon
  }
}
</script>
<style lang="sass">
@import "../../assets/styles/constants"
.zg-button,.zg-border-button
  display: inline-block
  cursor: pointer
  height: 34px
  width: 80px
  padding: 10px 15px
  line-height: 1
  white-space: nowrap
  cursor: pointer
  -webkit-appearance: none
  text-align: center
  box-sizing: border-box
  outline: none
  margin: 0
  -moz-user-select: none
  -webkit-user-select: none
  -ms-user-select: none
  padding: 10px 15px
  font-size: 14px
  border-radius: 4px
  overflow: hidden

.zg-button
  border: 1px solid #bfc9d9
  color: #354052
.zg-button.zg-button--primary
  border: 0
  color: $color-white
  background: $color-action-primary-default
.zg-button.zg-button--danger
  border: 0
  color: $color-white
  background: $color-action-danger-default
.zg-button.zg-button--secondary
  border: 0
  color: $color-white
  background: $color-action-secondary-default
.zg-button.zg-button--success
  border: 0
  color: $color-white
  background: $color-action-success-default


.zg-border-button
  border: 1px solid #bfc9d9
  color: #354052
.zg-border-button.zg-button--primary
  color: $color-action-primary-default
.zg-border-button.zg-button--danger
  color: $color-action-danger-default
.zg-border-button.zg-button--secondary
  color: $color-action-secondary-default
.zg-border-button.zg-button--success
  color: $color-action-success-default

.zg-button--disabled
.zg-button--small
  width: 60px
.zg-button--large
  width: 100px

</style>
