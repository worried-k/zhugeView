<script type="text/jsx">
  import Vue from 'vue'
  let Tooltip = Vue.extend({
    data () {
      return {
        content: '',
        show: false,
        placement: '',
        trigger: null,
        top: 0,
        left: 0,
        autoHide: true,
        width: 0
      }
    },
    computed: {
      style () {
        let style = {
          top: `${this.top}px`,
          left: `${this.left}px`
        }
        if (this.width) {
          style.width = `${this.width}px`
        }
        return style
      },
      clazz () {
        let rules = [
          'top-left', 'top', 'top-right',
          'left-top', 'right-top',
          'left', 'right',
          'left-bottom', 'right-bottom',
          'bottom-left', 'bottom', 'bottom-right'
        ]
        let clazz = {
          'zg-tooltip': true
        }
        rules.forEach(placement => {
          clazz[`zg-${placement}`] = this.placement === placement
        })
        return clazz
      }
    },
    updated () {
      const triggerRect = this.trigger.getBoundingClientRect()
      const tipRect = this.$refs.tooltip.getBoundingClientRect()

      const placement = this.placement.split('-')
      placement.forEach((position, i) => {
        if (i > 0)return

        if (['top', 'bottom'].indexOf(position) > -1) {
          if (position === 'top') {
            this.top = triggerRect.top - tipRect.height - 10
          } else {
            this.top = triggerRect.top + triggerRect.height + 10
          }
          if (placement[1] === 'left') {
            this.left = triggerRect.left
          } else if (placement[1] === 'right') {
            this.left = triggerRect.left + triggerRect.width - tipRect.width
          } else {
            this.left = triggerRect.left + (triggerRect.width - tipRect.width) / 2
          }
        } else {
          if (position === 'left') {
            this.left = triggerRect.left - tipRect.width - 10
          } else {
            this.left = triggerRect.left + triggerRect.width + 10
          }
          if (this.placement === 'left-top') {
            this.top = triggerRect.top
          } else if (this.placement === 'left') {
            this.top = triggerRect.top + (triggerRect.height - tipRect.height) / 2
          } else {
            this.top = triggerRect.top + triggerRect.height - tipRect.height
          }
        }
      })
    },
    destroyed () {
      this.$el.remove()
    },
    render (h) {
      return (
        <transition enter-active-class="animated fadeIn">
          <span ref="tooltip" class={this.clazz} style={this.style} v-show={this.show}>
            {this.content}
            {(() => {
              if (!this.autoHide) {
                return (
                  <a href="javascript:void(0);" class="zg-tooltip-close" onClick={() => {this.show = false}}>知道了</a>
                )
              }
            })()}
          </span>
        </transition>
      )
    }
  })
  export default Tooltip
</script>

<style lang="sass">
</style>
