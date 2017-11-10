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
      },
      onScroll (event) {
        const container = this.$refs.center
        const right = this.$refs.right
        const left = this.$refs.left
        if (left) left.style['box-shadow'] = container.scrollLeft === 0 ? 'none' : '6px 0 6px -4px rgba(0,0,0,.2)'
        if (right) right.style['box-shadow'] = container.scrollLeft === (container.scrollWidth - container.offsetWidth) ? 'none' : '-6px 0 6px -4px rgba(0,0,0,.2)'
      }
    },
    render (h) {
      const listeners = this.$listeners
      return (
        <div class="zg-data-grid" style={this.gridStyle}>
          <div class="zg-hidden-structure">
            {this.$slots.default}
            <span class="zg-grid-hover-color"></span>
          </div>
          <div class="zg-grid-container">
            {(() => {
              if (this.structure.left.length) {
                return (
                  <div class="zg-grid-left" ref="left">
                    <zg-grid gridId={this._uid}
                             structure={this.structure.left}
                             store={this.store}
                             showIndex={this.showIndex}
                             onSort={this.onSort}
                             onClickCell={listeners.clickCell || (() => {})}
                    ></zg-grid>
                  </div>
                )
              }
            })()}
            {(() => {
              if (this.structure.center.length) {
                return (
                  <div class="zg-grid-center" onScroll={this.onScroll} ref="center">
                    <zg-grid gridId={this._uid}
                             structure={this.structure.center}
                             store={this.store}
                             showIndex={this.showIndex && !this.structure.left.length}
                             onSort={this.onSort}
                             onClickCell={listeners.clickCell || (() => {})}
                    ></zg-grid>
                  </div>
                )
              }
            })()}
            {(() => {
              if (this.structure.right.length) {
                return (
                  <div class="zg-grid-right" ref="right">
                    <zg-grid gridId={this._uid}
                             structure={this.structure.right}
                             store={this.store}
                             showIndex={this.showIndex && !this.structure.left.length && !this.structure.center.length}
                             onSort={this.onSort}
                             onClickCell={listeners.clickCell || (() => {})}
                    ></zg-grid>
                  </div>
                )
              }
            })()}
          </div>
        </div>
      )
    }
  }
</script>

<style lang="sass">
@import "styles/grid"
</style>
