<template>
  <div>
    <normal-radio></normal-radio>
    <doc-markdown :api="api"></doc-markdown>
  </div>
</template>

<script>
  import NormalRadio from './demo/normalRadio'
  import api from './radio'
  import DocMarkdown from '../../components/docMarkdown/index'
  export default {
    components: {
      DocMarkdown,
      NormalRadio},
    name: 'index',
    data () {
      return {
        api
      }
    }
  }
</script>

<style lang="sass">

</style>
