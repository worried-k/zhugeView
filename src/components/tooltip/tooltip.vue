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
      },
      autoHide: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number
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
        if (this.autoHide) this.tooltip.$data.show = true
      },
      onMouseLeave () {
        if (this.autoHide) this.tooltip.$data.show = false
      },
      /**
       * @method show
       * @description 供外部主动调用
       */
      show () {
        this.tooltip.$data.show = true
      },
      /**
       * @method hide
       * @description 供外部主动调用
       */
      hide () {
        this.tooltip.$data.show = false
      }
    },
    mounted () {
      this.tooltip = new Tooltip({
        data: {
          content: this.content,
          placement: this.placement,
          trigger: this.$refs.trigger,
          autoHide: this.autoHide,
          width: this.width
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
