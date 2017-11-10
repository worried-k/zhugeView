<template>
  <div>
    <!--<normal-grid></normal-grid>-->
    <fix-left></fix-left>
  </div>
</template>

<script>
  import NormalGrid from './demo/normal.vue'
  import FixLeft from './demo/fixLeft.vue'

  export default {
    components: {
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
