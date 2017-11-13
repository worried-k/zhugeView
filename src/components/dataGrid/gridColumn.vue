<script type="text/jsx">
  import {emitter} from '../../mixins/main'
  export default {
    name: 'zgGridColumn',
    mixins: [emitter],
    props: {
      field: {
        type: String
      },
      title: {
        type: String,
        required: true
      },
      width: {
        type: Number
      },
      sortAble: {
        type: Boolean,
        default: false
      },
      fix: {
        type: String,
        default: 'center',
        validator (value) {
          return ['left', 'center', 'right'].indexOf(value) > -1
        }
      }
    },
    mounted () {
      let structure = this.parent('zgDataGrid').$data.structure[this.fix]

      if (this.$slots.default) {
        let colspanColumn = {
          field: '',
          title: this.title,
          colspan: 0,
          children: []
        }
        this.$slots.default.forEach(slot => {
          if (!slot.tag || slot.componentOptions.tag !== 'zg-grid-column') return
          const props = slot.componentOptions.propsData
          const listeners = slot.componentOptions.listeners

          colspanColumn.children.push({
            field: props.field,
            title: props.title,
            width: props.width,
            sortAble: props.sortAble,
            clickCell: listeners ? listeners.clickCell : undefined,
            cellFormatter: slot.data.scopedSlots ? slot.data.scopedSlots.default : undefined
          })
          colspanColumn.colspan += 1
        })
        structure.push(colspanColumn)
      } else {
        const listeners = this.$listeners
        let column = {
          field: this.field,
          title: this.title,
          width: this.width,
          sortAble: this.sortAble,
          clickCell: listeners.clickCell,
          cellFormatter: this.$scopedSlots.default
        }
        structure.push(column)
      }
    },
    render (h) {
      return ('')
    }
  }
</script>

<style lang="sass">

</style>
