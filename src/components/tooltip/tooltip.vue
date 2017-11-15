<script type="text/jsx">
  import Tooltip from './_tooltip.vue'
  export default {
    name: 'zgTooltip',
    props: {
      content: {
        type: String,
        required: true
      },
      placement: {
        type: String,
        default: 'top',
        validator (value) {
          let rules = [
            'top-left', 'top', 'top-right',
            'left-top', 'right-top',
            'left', 'right',
            'left-bottom', 'right-bottom',
            'bottom-left', 'bottom', 'bottom-right'
          ]
          return rules.indexOf(value) > -1
        }
      }
    },
    data () {
      return {
        showTip: false
      }
    },
    watch: {
      placement (value) {
        if (this.tooltip) {
          this.tooltip.$data.placement = value
        }
      }
    },
    methods: {
      onHoverTrigger () {
        this.tooltip.$data.show = true
      },
      onMouseLeave () {
        this.tooltip.$data.show = false
      },
      /**
       * 供外部主动调用，一段时间后自动消失
       */
      show () {
        console.log('显示tooltip')
        this.onHoverTrigger()
        setTimeout(() => {
          this.onMouseLeave()
        }, 2000)
      }
    },
    mounted () {
      this.tooltip = new Tooltip({
        data: {
          content: this.content,
          placement: this.placement,
          trigger: this.$refs.trigger
        }
      }).$mount()
      document.body.appendChild(this.tooltip.$el)
    },
    beforeDestroy () {
      this.tooltip.$destroy()
    },
    render (h) {
      return (
        <span class="zg-tooltip-trigger" ref="trigger"
              onMouseover={this.onHoverTrigger}
              onMouseleave={this.onMouseLeave}
        >{this.$slots.default}</span>
      )
    }
  }
</script>

<style lang="sass">
@import "style/tooltip"
</style>
