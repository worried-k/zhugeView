<template>
  <div>
    <normal-tooltip></normal-tooltip>
  </div>
</template>

<script>
  import NormalTooltip from './demo/normalTooltip.vue'

  export default {
    components: {NormalTooltip},
    name: 'index',
    data () {
      return {
        placement: 'bottom'
      }
    }
  }
</script>

<style lang="sass">

</style>
