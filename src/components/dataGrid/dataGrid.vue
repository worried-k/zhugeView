<script type="text/jsx">
  import ZgGridHeader from './gridHeader.vue'
  import ZgGridCell from './gridCell.vue'

  /**
   * clickCell，以列上注册的事件优先
   */
  export default {
    components: {
      ZgGridCell,
      ZgGridHeader},
    name: 'zgDataGrid',
    props: {
      store: {
        type: Array,
        required: true
      },
      width: {
        type: Number
      },
      showIndex: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        structure: []
      }
    },
    computed: {
      gridStyle () {
        let style = {}
        if (this.width) {
          style.width = `${this.width}px`
        }
        return style
      }
    },
    methods: {
      /**
       * 1：正序；-1：倒序
       * @param status
       * @param column
       */
      onSort (status, column) {
        const field = column.field
        this.store.sort((a, b) => {
          if (a[field] > b[field]) {
            return 1 * status
          } else if (a[field] < b[field]) {
            return -1 * status
          }
          return 0
        })
      }
    },
    render (h) {
      const listeners = this.$listeners
      return (
        <div class="zg-data-grid" style={this.gridStyle}>
          <div class="zg-hidden-structure">{this.$slots.default}</div>
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
                                  onSort={this.onSort}></zg-grid-header>
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
        </div>
      )
    }
  }
</script>

<style lang="sass">
@import "styles/grid"
</style>
