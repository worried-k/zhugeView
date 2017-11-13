<template>
  <div>
    <normal-grid></normal-grid>
    <fix-left></fix-left>
    <cols-header></cols-header>
  </div>
</template>

<script>
  import NormalGrid from './demo/normal.vue'
  import FixLeft from './demo/fixLeft.vue'
  import ColsHeader from './demo/colsHeader.vue'

  export default {
    components: {
      ColsHeader,
      FixLeft,
      NormalGrid},
    name: 'index',
    data () {
      return {
        msg: 'index'
      }
    }
  }
</script>

<style lang="sass">

</style>
