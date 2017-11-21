<script type="text/jsx">
  import {emitter} from '../../mixins/main'
  export default {
    name: 'zgTabPanel',
    mixins: [emitter],
    props: {
      /**
       * @description tab标签显示文本
       */
      title: {
        type: String,
        required: true
      }
    },
    created () {
      const parent = this.parent('zgTabs')
      parent.addTab({
        title: this.title,
        slot: this.$slots.default
      })
    },
    render (h) {
      return ''
    }
  }
</script>

<style lang="sass">
@import "styles/tabPanel"
</style>
