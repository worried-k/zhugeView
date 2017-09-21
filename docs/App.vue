<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
@import "./assets/styles/reset.sass"
#app
  width: 100%
  height: 100%
  overflow: auto
</style>
