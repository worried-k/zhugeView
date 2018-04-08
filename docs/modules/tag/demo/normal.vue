<template>
  <div>
    <demo-panel title="tag" subtitle="普通tag标签">
      <zg-tag>tag</zg-tag>
      <zg-tag color="#09aef5">tag</zg-tag>
      <zg-tag color="#e07800">tag</zg-tag>
      <zg-tag color="#f55858">tag</zg-tag>
      <zg-tag color="#0EA1EB">tag</zg-tag>
      <zg-tag color="#29bd76">tag</zg-tag>
    </demo-panel>
  </div>
</template>

<script>
  import ZgTag from '../../../../src/components/tag/tag'

  export default {
    components: {ZgTag},
    name: 'normalTag',
    data () {
      return {
        msg: 'normal'
      }
    }
  }
</script>

<style lang="sass">

</style>
