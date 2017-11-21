<template>
  <div>
    <normal-tab></normal-tab>
  </div>
</template>

<script>
  import NormalTab from './demo/normalTab.vue'

  export default {
    components: {NormalTab},
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
