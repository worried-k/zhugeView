<template>
  <div>
    <demo-panel title="分组下拉框">
      <zg-selector keyField="id"
                   v-model="groupValue"
                   :store="store"
                   labelField="label"
                   childrenField="children"></zg-selector>
      <span>选中值：</span>{{groupValue}}
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
    name: 'groupSelector',
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

            for (let j = 0; j < 5; j++) {
              item.children.push({
                label: `option${i}-${j}`,
                id: `${i}-${j}`
              })
            }

            result.push(item)
          }

          return result
        })(),
        groupValue: {id: '2-4'}
      }
    },
    mounted () {
      setTimeout(() => {
        this.groupValue = {id: '1-3'}
      }, 2000)
    }
  }
</script>

<style lang="sass">

</style>
