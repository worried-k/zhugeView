<script type="text/jsx">
  import ZgGridHeader from './gridHeader.vue'
  import ZgGridCell from './gridCell.vue'

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
    render (h) {
      return (
        <div class="zg-data-grid" style={this.gridStyle}>
          <div class="zg-hidden-structure">{this.$slots.default}</div>
          <table class="zg-grid">
            <thead class="zg-grid-header">
            <tr class="zg-grid-header-row">
              {this.structure.map(column => {
                return (
                  <zg-grid-header title={column.title} width={column.width}></zg-grid-header>
                )
              })}
            </tr>
            </thead>
            <tbody class="zg-grid-body">
              {
                this.store.map(item => {
                  return (
                    <tr class="zg-grid-row">{
                      this.structure.map(column => {
                        return (
                          <zg-grid-cell data={item}
                                        labelField={column.field}
                                        width={column.width}
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
