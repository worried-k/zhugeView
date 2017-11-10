<script type="text/jsx">
  import ZgGridHeader from './gridHeader.vue'
  import ZgGridCell from './gridCell.vue'
  import ZgGrid from './grid.vue'

  /**
   * clickCell，以列上注册的事件优先
   */
  export default {
    components: {
      ZgGrid,
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
          <zg-grid structure={this.structure}
                   store={this.store}
                   showIndex={this.showIndex}
                   onSort={this.onSort}
                   onClickCell={listeners.clickCell}
          ></zg-grid>
        </div>
      )
    }
  }
</script>

<style lang="sass">
@import "styles/grid"
</style>
