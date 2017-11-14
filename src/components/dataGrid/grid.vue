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
      gridId: {
        type: [String, Number],
        required: true
      },
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
    computed: {
      structureParser () {
        let headStructure = [[], []]
        let bodyStructure = []
        let childExist = false
        this.structure.forEach(item => {
          if (item.children) {
            childExist = true
            item.rowspan = 1
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

        if (childExist) {
          headStructure[0].forEach(column => {
            if (!column.rowspan) column.rowspan = 2
          })
        }

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
            return (
              <tr class="zg-grid-header-row">
                {(() => {
                  if (this.showIndex && rowIndex === 0) {
                    return (
                      <zg-grid-header title={'index'} column={{}} rowspan={this.structureParser.headStructure[1].length ? 2 : 1}></zg-grid-header>
                    )
                  }
                })()}
                {row.map(column => {
                  return (
                    <zg-grid-header title={column.title}
                                    sortAble={column.sortAble}
                                    column={column}
                                    width={column.width}
                                    rowspan={column.rowspan}
                                    colspan={column.colspan}
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
                                      labelField={'index'}
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
