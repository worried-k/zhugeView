<script type="text/jsx">
  import ZgGridHeader from './gridHeader.vue'
  import ZgGridCell from './gridCell.vue'

  export default {
    name: 'zgGrid',
    components: {
      ZgGridCell,
      ZgGridHeader},
    props: {
      showIndex: {
        type: Boolean,
        default: false
      },
      structure: {
        type: Array,
        required: true
      },
      store: {
        type: Array,
        required: true
      }
    },
    render (h) {
      const listeners = this.$listeners
      return (
        <table class="zg-grid">
          <thead class="zg-grid-header">
          <tr class="zg-grid-header-row">
            {(() => {
              if (this.showIndex) {
                return (
                  <zg-grid-header title={'index'} column={{}}></zg-grid-header>
                )
              }
            })()}
            {this.structure.map(column => {
              return (
                <zg-grid-header title={column.title}
                                sortAble={column.sortAble}
                                column={column}
                                width={column.width}
                                onSort={listeners.sort}></zg-grid-header>
              )
            })}
          </tr>
          </thead>
          <tbody class="zg-grid-body">
          {
            this.store.map((item, i) => {
              let rowClass = {
                'zg-grid-row': true
              }
              rowClass[`zg-row-${i}`] = true
              return (
                <tr class={rowClass}>
                  {(() => {
                    if (this.showIndex) {
                      return (
                        <zg-grid-cell data={{index: i}}
                                      labelField={'index'}
                                      index={i}
                        ></zg-grid-cell>
                      )
                    }
                  })()}
                  {this.structure.map(column => {
                    return (
                      <zg-grid-cell data={item}
                                    labelField={column.field}
                                    width={column.width}
                                    index={i}
                                    scopedSlots={{default: column.cellFormatter}}
                                    onClick={column.clickCell || listeners.clickCell}
                      ></zg-grid-cell>
                    )
                  })
                  }</tr>
              )
            })
          }
          </tbody>
        </table>
      )
    }
  }
</script>

<style lang="sass">

</style>
