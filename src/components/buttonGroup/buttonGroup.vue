<template>
  <div class="zg-button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ZgButtonGroup'
}
</script>
<style lang="sass">
.zg-button-group
  display: inline-block
  border-radius: 4px
  overflow: hidden
  &:before
    display: table
    content: ""
  &:after
    clear: both
  button
    border-radius: 0
    float: left
    position: relative
</style>
