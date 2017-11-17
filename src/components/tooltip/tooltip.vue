<script type="text/jsx">
  import Tooltip from './_tooltip.vue'
  export default {
    name: 'zgTooltip',
    props: {
      /**
       * @description 提示文本
       * @tip 指定name为tooltip的slot时，tooltip内容为slot
       */
      content: {
        type: String
      },
      /**
       * @description tooltip展示位置top-left, top, top-right, left-top, right-top,left, right,left-bottom, right-bottom,bottom-left, bottom, bottom-right
       */
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
      /**
       * @description tooltip是否自动显示隐藏，默认为hover显示，mouseLeave隐藏
       */
      autoHide: {
        type: Boolean,
        default: true
      },
      /**
       * @description tooltip展示宽度，默认不限制
       */
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
          width: this.width,
          customRender: this.$slots.tooltip,
          onHide: this.$listeners.hide
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
