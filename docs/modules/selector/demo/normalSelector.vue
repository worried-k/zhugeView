<template>
  <div>
    <demo-panel title="普通下拉框" subtitle="单选" jsFiddleName="s5rjhjwj">

      <zg-selector keyField="id"
                   :store="store"
                   placeholder="单选"
                   labelField="label"
                   :disableOptions="disableList"
                   filterOption
                   icon-field="icon"
                   v-model="result">
      </zg-selector>

      <span>选中值</span>{{result}}<br>
    </demo-panel>
    <demo-panel subtitle="多选" jsFiddleName="s5rjhjwj">
      <zg-selector v-model="multipleResult"
                   theme="noborder"
                   keyField="id"
                   :store="multipleStore"
                   labelField="label"
                   placeholder="多选" multiple></zg-selector>
      <span>选中值</span>{{multipleResult}}<br>
    </demo-panel>
  </div>
</template>

<script>
  import ZgSelector from '../../../../src/components/selector/selector.vue'
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgButton from '../../../../src/components/button/button.vue'

  export default {
    components: {
      ZgButton,
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
              label: 'option_' + i,
              icon: 'zgicon-edit'
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
