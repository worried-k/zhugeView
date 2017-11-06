<template>
  <div>
    <demo-panel title="大数据量普通下拉" subtitle="单选">
      <zg-selector keyField="id" v-model="value" :store="store" labelField="label"></zg-selector>
      <span>所选值：</span>{{value}}
    </demo-panel>
    <demo-panel subtitle="多选">
      <zg-selector keyField="id" v-model="multipleValue" :store="multipleStore" labelField="label" multiple></zg-selector>
      <span>所选值：</span>{{multipleValue}}
    </demo-panel>
  </div>
</template>

<script>
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgSelector from '../../../../src/components/selector/selector.vue'

  export default {
    components: {
      ZgSelector,
      DemoPanel},
    name: 'normalBigDataSelector',
    data () {
      return {
        store: (() => {
          let store = []
          for (let i = 0; i < 20000; i++) {
            store.push({
              id: i,
              label: 'option_' + i
            })
          }
          return store
        })(),
        value: {id: 50},
        multipleStore: (() => {
          let store = []
          for (let i = 0; i < 100; i++) {
            store.push({
              id: i,
              label: 'option_' + i
            })
          }
          return store
        })(),
        multipleValue: [{id: 1}, {id: 90}]
      }
    },
    mounted () {
      setTimeout(() => {
        this.value = {id: 4}
        this.multipleValue = [{id: 3}, {id: 50}]
      }, 2000)
    }
  }
</script>

<style lang="sass">

</style>
