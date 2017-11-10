<template>
  <div>
    <zg-data-grid :store="store">
      <zg-grid-column v-for="column in columns"
                      :field="column.field"
                      :key="column.title"
                      :fix="column.fix"
                      :title="column.title"
                      :width="column.width"
      ></zg-grid-column>
    </zg-data-grid>
  </div>
</template>

<script>
  import ZgDataGrid from '../../../../src/components/dataGrid/dataGrid.vue'
  import ZgGridColumn from '../../../../src/components/dataGrid/gridColumn.vue'

  export default {
    components: {
      ZgGridColumn,
      ZgDataGrid},
    name: 'fixLeft',
    data () {
      return {
        columns: (() => {
          let columns = []
          for (let i = 0; i < 2; i++) {
            columns.push({
              field: `label${i}`,
              title: `left${i + 1}`,
              fix: 'left',
              width: 100
            })
          }
          for (let i = 3; i < 28; i++) {
            columns.push({
              field: `label${i}`,
              title: i > 25 ? `right${i + 1}` : `center${i + 1}`,
              fix: i > 25 ? 'right' :'center'
            })
          }
          return columns
        })(),
        store: (() => {
          let store = []
          for (let i = 0; i < 20; i++) {
            let item = {}
            for (let j = 0; j < 28; j++) {
              if (j < 2) {
                item[`label${j}`] = `fixed${i}-${j}~~~~~~~~~`
              } else {
                item[`label${j}`] = `${i}-${j}`
              }
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
