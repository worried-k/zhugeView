<script type="text/jsx">
  import Vue from 'vue'
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
    data () {
      return {
        templateData: {
          title: this.title,
          slot: this.$slots.default
        }
      }
    },
    created () {
      const parent = this.parent('zgTabs')
      parent.addTab(this.templateData)
    },
    render (h) {
      Vue.set(this.templateData, 'slot', this.$slots.default)
      return ''
    }
  }
</script>

<style lang="sass">
@import "styles/tabPanel"
</style>
