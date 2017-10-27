<template>
  <div>
    <demo-panel title="bigSelect 大数据下拉框分组选项" jsFiddleName="doszcb77">
      <zg-big-select keyField="id"
                     labelField="label"
                     childrenField="children"
                     multiple
                     filterOption
                     :store="store"></zg-big-select>
    </demo-panel>
  </div>
</template>

<script>
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgBigSelect from '../../../../src/components/selector/bigSelect.vue'

  export default {
    components: {
      ZgBigSelect,
      DemoPanel},
    name: 'groupBigSelect',
    data () {
      return {
        store: (() => {
          let result = []

          for (let i = 0; i < 5000; i++) {
            let item = {
              label: 'group' + i,
              id: i,
              children: []
            }

            for (let j = 0; j < 100; j++) {
              item.children.push({
                label: `option${i}-${j}`,
                id: `${i}-${j}`
              })
            }

            result.push(item)
          }

          return result
        })()
      }
    }
  }
</script>

<style lang="sass">

</style>
