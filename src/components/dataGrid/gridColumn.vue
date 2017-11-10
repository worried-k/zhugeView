<script type="text/jsx">
  import {emitter} from '../../mixins/main'
  export default {
    name: 'zgGridColumn',
    mixins: [emitter],
    props: {
      field: {
        type: String,
        required: true
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
      }
    },
    mounted () {
      let structure = this.parent('zgDataGrid').$data.structure
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
    },
    render (h) {
      return ('')
    }
  }
</script>

<style lang="sass">

</style>
