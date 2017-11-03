<template>
  <div>
    <demo-panel title="selector">
      <zg-selector keyField="id" :store="store" labelField="label" :disableOptions="disableList" v-model="result">
      </zg-selector>
      <span>选中值</span>{{result}}
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
        disableList: [3,5,1]
      }
    },
    mounted () {
      setTimeout(() => {
        this.disableList = [1,2,3]
        this.result = {id: 8}
      }, 2000)
    }
  }
</script>

<style lang="sass">

</style>
