<template>
  <div>
    <normal-tooltip></normal-tooltip>
    <click-tooltip></click-tooltip>
  </div>
</template>

<script>
  import NormalTooltip from './demo/normalTooltip.vue'
  import ClickTooltip from './demo/clickTooltip.vue'

  export default {
    components: {
      ClickTooltip,
      NormalTooltip},
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
