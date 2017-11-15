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
    methods: {
      onHoverTrigger () {
        this.tooltip.$data.show = true
      },
      onMouseLeave () {
        this.tooltip.$data.show = false
      }
    },
    mounted () {
      const triggerRect = this.$refs.trigger.getBoundingClientRect()
      this.tooltip = new Tooltip({
        data: {
          content: this.content,
          placement: this.placement,
          top: triggerRect.top,
          left: triggerRect.left
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
