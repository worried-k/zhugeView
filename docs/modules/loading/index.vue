<template>
  <div>
    <normal-loading></normal-loading>
  </div>
</template>

<script>
  import NormalLoading from './demo/normalLoading.vue'

  export default {
    components: {NormalLoading},
    name: 'index',
    data () {
      return {
        msg: 'index'
      }
    }
  }
</script>

<style lang="sass">
.loading-container
  display: inline-block
  width: 150px
  height: 150px
  border: 1px solid darkcyan
  padding: 20px
  box-sizing: border-box
</style>
