<template>
  <div>
    <demo-panel title="selector">
      <zg-selector keyField="id" :store="store" placeholder="单选" labelField="label" :disableOptions="disableList" v-model="result">
      </zg-selector>
      <span>选中值</span>{{result}}<br>

      <zg-selector v-model="multipleResult" keyField="id" :store="multipleStore" labelField="label" multiple style="margin-top: 10px"></zg-selector>
      <span>选中值</span>{{multipleResult.map(item => item.label)}}<br>
    </demo-panel>
  </div>
</template>

<script>
  import ZgSelector from '../../../../src/components/selector/selector.vue'
  import DemoPanel from '../../../components/demoPanel/index.vue'

  export default {
    components: {
      DemoPanel,
      ZgSelector},
    name: 'normalSelector',
    data () {
      return {
        store: (() => {
          let store = []
          for (let i = 0; i < 20; i++) {
            store.push({
              id: i,
              label: 'option_' + i
            })
          }
          return store
        })(),
        result: {id: 4},
        disableList: [3,5,1],
        multipleStore: (() => {
          let store = []
          for (let i = 0; i < 20; i++) {
            store.push({
              id: i,
              label: 'option_' + i
            })
          }
          return store
        })(),
        multipleResult: [{id: 1}, {id: 4}]
      }
    },
    mounted () {
      setTimeout(() => {
        this.disableList = [1,2,3]
        this.result = {id: 8}
        this.multipleResult = [{id: 2}, {id: 3}]
      }, 2000)
    }
  }
</script>

<style lang="sass">

</style>
