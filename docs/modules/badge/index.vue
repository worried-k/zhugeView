<template>
  <div>
    <count-badge></count-badge>
    <dot-badge></dot-badge>
    <shine-badge></shine-badge>
  </div>
</template>

<script>
  import CountBadge from './demo/countBadge.vue'
  import DotBadge from './demo/dotBadge.vue'
  import ShineBadge from './demo/shineBadge.vue'

  export default {
    components: {
      ShineBadge,
      DotBadge,
      CountBadge},
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
