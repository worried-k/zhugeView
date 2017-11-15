<template>
  <div>
    <normal-tooltip></normal-tooltip>
    <click-tooltip></click-tooltip>
    <slot-tooltip></slot-tooltip>
  </div>
</template>

<script>
  import NormalTooltip from './demo/normalTooltip.vue'
  import ClickTooltip from './demo/clickTooltip.vue'
  import SlotTooltip from './demo/slotTooltip.vue'

  export default {
    components: {
      SlotTooltip,
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
