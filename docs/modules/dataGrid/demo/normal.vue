<template>
  <div>
    <demo-panel title="dataGrid" subtitle="普通表格">
      <zg-data-grid :store="store">
        <zg-grid-column v-for="column in columns"
                        :field="column.field"
                        :key="column.title"
                        :title="column.title"></zg-grid-column>
      </zg-data-grid>
    </demo-panel>
  </div>
</template>

<script>
  import ZgDataGrid from '../../../../src/components/dataGrid/dataGrid.vue'
  import ZgGridColumn from '../../../../src/components/dataGrid/gridColumn.vue'
  import DemoPanel from '../../../components/demoPanel/index.vue'

  export default {
    components: {
      DemoPanel,
      ZgGridColumn,
      ZgDataGrid},
    name: 'normalGrid',
    data () {
      return {
        columns: (() => {
          let columns = []
          for (let i = 0; i < 5; i++) {
            columns.push({
              field: 'label',
              title: `column${i + 1}`
            })
          }
          return columns
        })(),
        store: (() => {
          let store = []
          for (let i = 0; i < 20; i++) {
            store.push({
              label: `label${i}`
            })
          }
          return store
        })()
      }
    },
    methods: {
      onClickCell () {
        console.log('on click cell')
      }
    }
  }
</script>

<style lang="sass">

</style>
