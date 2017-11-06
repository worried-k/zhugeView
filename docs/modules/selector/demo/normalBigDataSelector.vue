<template>
  <div>
    <demo-panel title="大数据量普通下拉">
      <zg-selector keyField="id" v-model="value" :store="store" labelField="label"></zg-selector>
      <span>所选值：</span>{{value}}
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
          for (let i = 0; i < 100; i++) {
            store.push({
              id: i,
              label: 'option_' + i
            })
          }
          return store
        })(),
        value: {id: 50}
      }
    },
    mounted () {
      setTimeout(() => {
        this.value = {id: 4}
      }, 2000)
    }
  }
</script>

<style lang="sass">

</style>
