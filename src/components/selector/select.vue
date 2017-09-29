<template>
  <div class="zg-select">
    <div class="zg-select-handle">
      <span class="zg-select-chosen"></span>
      <i class="icon-down"></i>
    </div>
    <ul class="zg-drop-panel">
      <li class="zg-select-search">
        <i class="icon-search"></i>
        <input/>
        <i class="icon-remove"></i>
      </li>
      <li class="zg-select-clear">清空</li>
      <!--to options-->
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  import emitter from '../../mixins/emitter'
  export default {
    name: 'ZgSelect',
    mixins: [emitter],
    data () {
      return {
        msg: 'select'
      }
    }
  }
</script>

<style lang="sass">
@import "styles/select"
</style>
