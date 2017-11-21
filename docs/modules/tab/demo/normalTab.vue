<template>
  <div>
    <demo-panel title="tab">
      <zg-tabs>
        <zg-tab-panel title="tab1">
          <div style="height: 400px;background: lightskyblue">this is tab1</div>
        </zg-tab-panel>
        <zg-tab-panel title="tab2">
          <div style="height: 400px; background: lightpink">
            this is tab2
          </div>
        </zg-tab-panel>
        <zg-tab-panel title="tab3">
          <div style="height: 400px; background: lightcoral">
            this is tab3
          </div>
        </zg-tab-panel>
      </zg-tabs>
    </demo-panel>
  </div>
</template>

<script>
  import ZgTabs from '../../../../src/components/tab/tabs.vue'
  import ZgTabPanel from '../../../../src/components/tab/tabPanel.vue'
  import DemoPanel from '../../../components/demoPanel/index.vue'

  export default {
    components: {
      DemoPanel,
      ZgTabPanel,
      ZgTabs},
    name: 'normalTab',
    data () {
      return {
        msg: 'normalTab'
      }
    }
  }
</script>

<style lang="sass">
</style>
