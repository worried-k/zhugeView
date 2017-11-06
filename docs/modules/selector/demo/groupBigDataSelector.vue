<template>
  <div>
    <demo-panel title="分组大数据下拉框">
      <zg-selector keyField="id" v-model="value" :store="store" labelField="label" childrenField="children"></zg-selector>
      <span>选中值：{{value}}</span>
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
    name: 'groupBigDataSelector',
    data () {
      return {
        store: (() => {
          let result = []

          for (let i = 0; i < 50; i++) {
            let item = {
              label: 'group' + i,
              id: i,
              children: []
            }

            for (let j = 0; j < 10; j++) {
              item.children.push({
                label: `option${i}-${j}`,
                id: `${i}-${j}`
              })
            }

            result.push(item)
          }

          return result
        })(),
        value: {id: '11-5'}
      }
    },
    mounted () {
      setTimeout(() => {
        this.value = {id: '0-4'}
      }, 2000)
    }
  }
</script>

<style lang="sass">

</style>
