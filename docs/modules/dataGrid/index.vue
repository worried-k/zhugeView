<template>
  <div>
    <normal-grid></normal-grid>
  </div>
</template>

<script>
  import NormalGrid from './demo/normal.vue'

  export default {
    components: {NormalGrid},
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
