<script type="text/jsx">
  import {dom} from '../../utils/index'

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
        structure: {
          left: [],
          right: [],
          center: []
        }
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
    /**
     * 计算行高
     */
    updated () {
      // todo 分页时需要修改循环数
      let styleSheet = []
      this.store.forEach((item, i) => {
        const className = `.zg-row-${this._uid}-${i}`
        const rows = document.querySelectorAll(className)
        let heights = []
        rows.forEach(row => {
          heights.push(row.offsetHeight)
        })
        styleSheet.push([className, [
          'height', `${Math.max.apply(Math, heights)}px`
        ]])
      })
      dom.addStyleSheet(`zgDataGrid_${this._uid}`, styleSheet)
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
          <div class="zg-grid-container">
            <div class="zg-grid-left">
              {(() => {
                if (this.structure.left.length) {
                  return (
                    <zg-grid gridId={this._uid}
                             structure={this.structure.left}
                             store={this.store}
                             showIndex={this.showIndex}
                             onSort={this.onSort}
                             onClickCell={listeners.clickCell || (() => {})}
                    ></zg-grid>
                  )
                }
              })()}
            </div>
            <div class="zg-grid-center">
              {(() => {
                if (this.structure.center.length) {
                  return (
                    <zg-grid gridId={this._uid}
                             structure={this.structure.center}
                             store={this.store}
                             showIndex={this.showIndex && !this.structure.left.length}
                             onSort={this.onSort}
                             onClickCell={listeners.clickCell || (() => {})}
                    ></zg-grid>
                  )
                }
              })()}
            </div>
            <div class="zg-grid-right">
              {(() => {
                if (this.structure.right.length) {
                  return (
                    <zg-grid gridId={this._uid}
                             structure={this.structure.right}
                             store={this.store}
                             showIndex={this.showIndex && !this.structure.left.length && !this.structure.center.length}
                             onSort={this.onSort}
                             onClickCell={listeners.clickCell || (() => {})}
                    ></zg-grid>
                  )
                }
              })()}
            </div>
          </div>
        </div>
      )
    }
  }
</script>

<style lang="sass">
@import "styles/grid"
</style>
