<template>
  <div>
    <demo-panel title="button" subtitle="普通按钮，theme为normal（默认值）" jsFiddleName="fe9L2wkn">
      <zg-button>normal</zg-button>
      <zg-button type="primary">primary</zg-button>
      <zg-button type="danger">danger</zg-button>
      <zg-button type="secondary">secondary</zg-button>
      <zg-button type="success">success</zg-button>
    </demo-panel>
  </div>
</template>

<script>
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgButton from '../../../../src/components/button/button.vue'

  export default {
    components: {
      ZgButton,
      DemoPanel},
    name: 'normalButton',
    data () {
      return {
        msg: 'normalButton'
      }
    }
  }
</script>

<style lang="sass">

</style>
