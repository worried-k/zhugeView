<script type="text/jsx">
  import {dom, util} from '../../utils/index'

  import ZgGridHeader from './gridHeader.vue'
  import ZgGridCell from './gridCell.vue'

  export default {
    name: 'zgGrid',
    components: {
      ZgGridCell,
      ZgGridHeader
    },
    props: {
      /**
       * @description 表格的id
       */
      gridId: {
        type: [String, Number],
        required: true
      },
      /**
       * @description 显示索引列
       */
      showIndex: {
        type: Boolean,
        default: false
      },
      /**
       * @description 索引列名称
       */
      indexTitle: {
        type: String,
        default: 'index'
      },
      /**
       * @description 表结构
       */
      structure: {
        type: Array,
        required: true
      },
      /**
       * @description 数据集
       */
      store: {
        type: Array,
        required: true
      },
      /**
       * @description 是否可分页
       */
      pagination: {
        type: Boolean,
        default: false
      },
      /**
       * @description 每页数据量
       */
      pageSize: {
        type: Number,
        default: 10
      },
      /**
       * @description 当前页码，从1开始
       */
      pageNum: {
        type: Number,
        default: 1
      },
      headerRowspan: {
        type: Number,
        default: 1
      }
    },
    computed: {
      structureParser () {
        let headStructure = [[], []]
        let bodyStructure = []

        this.structure.forEach(item => {
          if (item.children) {
            headStructure[0].push(item)
            item.children.forEach(column => {
              headStructure[1].push(column)
              bodyStructure.push(column)
            })
          } else {
            headStructure[0].push(item)
            bodyStructure.push(item)
          }
        })
        return {
          headStructure,
          bodyStructure
        }
      }
    },
    methods: {
      onHoverRow (rowIndex) {
        let hoverColor = document.querySelector('.zg-grid-hover-color')
        if (hoverColor) {
          hoverColor = window.getComputedStyle(hoverColor)['background-color']
        }
        dom.addStyleSheet(`zgDataGridHover${this.gridId}`, [
          [`.zg-row-${this.gridId}-${rowIndex}`, [
            'background', hoverColor || '#F0FAFF', true
          ]]
        ])
      },
      onMouseLeave () {
        dom.removeStyleSheet(`zgDataGridHover${this.gridId}`)
      }
    },
    render (h) {
      const listeners = this.$listeners
      return (
        <table class="zg-grid">
          <thead class="zg-grid-header">
          {this.structureParser.headStructure.map((row, rowIndex) => {
            if (!row.length) return
            return (
              <tr class="zg-grid-header-row">
                {(() => {
                  if (this.showIndex && rowIndex === 0) {
                    return (
                      <zg-grid-header
                        title={this.indexTitle}
                        column={{}}
                        rowspan={this.headerRowspan}>
                      </zg-grid-header>
                    )
                  }
                })()}
                {row.map(column => {
                  const rowspan = (rowIndex === 0 && !column.children) ? this.headerRowspan : 1
                  return (
                    <zg-grid-header title={column.title}
                                    sortAble={column.sortAble}
                                    column={column}
                                    width={column.width}
                                    rowspan={rowspan}
                                    colspan={column.colspan}
                                    scopedSlots={{default: column.headFormatter}}
                                    onSort={listeners.sort}></zg-grid-header>
                  )
                })}
              </tr>
            )
          })}
          </thead>
          <tbody class="zg-grid-body">
          {
            this.store.map((item, i) => {
              if (this.pagination) {
                const startIndex = (this.pageNum - 1) * this.pageSize
                const endIndex = this.pageNum * this.pageSize

                if (i < startIndex || i >= endIndex) return
              }
              let rowClass = {
                'zg-grid-row': true
              }
              rowClass[`zg-row-${this.gridId}-${i}`] = true
              return (
                <tr class={rowClass} onMouseover={() => {this.onHoverRow(i)}}
                    onMouseleave={() => {this.onMouseLeave(i)}}>
                  {(() => {
                    if (this.showIndex) {
                      return (
                        <zg-grid-cell store={{index: i}}
                                      labelField="index"
                                      index={i}
                        ></zg-grid-cell>
                      )
                    }
                  })()}
                  {this.structureParser.bodyStructure.map(column => {
                    return (
                      <zg-grid-cell store={item}
                                    labelField={column.field}
                                    width={column.width}
                                    index={i}
                                    scopedSlots={{default: column.cellFormatter}}
                                    ableClick={column.clickCell ? true : false}
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
