<template>
  <div>
    <demo-panel subtitle="表头合并单元格">
      <zg-data-grid :store="store" showIndex>
        <zg-grid-column field="label0"
                        title="首列"
                        :width="130"
                        sortAble>
          <template scope="scope">
            自定义展示：{{scope.data[scope.field]}}
          </template>
        </zg-grid-column>

        <zg-grid-column field="numbers" title="数据展示">
          <zg-grid-column field="label0"
                          title="column1"
                          sortAble>
            <template scope="scope">
              column1：{{scope.data[scope.field]}}
            </template>
          </zg-grid-column>
          <zg-grid-column field="label0"
                          title="column2"
                          sortAble>
            <template scope="scope">
              column2：{{scope.data[scope.field]}}
            </template>
          </zg-grid-column>
          <zg-grid-column field="label0"
                          title="column3"
                          sortAble>
            <template scope="scope">
              column3：{{scope.data[scope.field]}}
            </template>
          </zg-grid-column>
        </zg-grid-column>

        <zg-grid-column field="label0"
                        title="column4"
                        sortAble>
          <template scope="scope">
            column4：{{scope.data[scope.field]}}
          </template>
        </zg-grid-column>
      </zg-data-grid>
    </demo-panel>
  </div>
</template>

<script>
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgDataGrid from '../../../../src/components/dataGrid/dataGrid.vue'
  import ZgGridColumn from '../../../../src/components/dataGrid/gridColumn.vue'

  export default {
    components: {DemoPanel,
      ZgGridColumn,
      ZgDataGrid},
    name: 'colsHeader',
    data () {
      return {
        columns: (() => {
          let columns = []
          for (let i = 1; i < 5; i++) {
            columns.push({
              field: `label${i}`,
              title: `column${i + 1}`
            })
          }
          return columns
        })(),
        store: (() => {
          let store = []
          for (let i = 0; i < 3; i++) {
            let item = {}
            for (let j = 0; j < 5; j++) {
              item[`label${j}`] = `${i}-${j}`
            }
            store.push(item)
          }
          return store
        })()
      }
    }
  }
</script>

<style lang="sass">

</style>
