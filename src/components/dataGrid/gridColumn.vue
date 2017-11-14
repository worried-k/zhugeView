<script type="text/jsx">
  import {emitter} from '../../mixins/main'
  export default {
    name: 'zgGridColumn',
    mixins: [emitter],
    props: {
      /**
       * @description 用于显示字段名
       */
      field: {
        type: String
      },
      /**
       * @description 列头标题
       */
      title: {
        type: String,
        required: true
      },
      /**
       * @description 列宽
       */
      width: {
        type: Number
      },
      /**
       * @description 是否可排序
       */
      sortAble: {
        type: Boolean,
        default: false
      },
      /**
       * @description 固定列位置
       * @tip 可选值范围：left\center\right
       */
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
