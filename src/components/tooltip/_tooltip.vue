<script type="text/jsx">
  import Vue from 'vue'
  let Tooltip = Vue.extend({
    data () {
      return {
        content: '',
        show: true,
        placement: '',
        top: 0,
        left: 0
      }
    },
    computed: {
      style () {
        return {
          top: `${this.top}px`,
          left: `${this.left}px`
        }
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
    destroyed () {
      this.$el.remove()
    },
    methods: {
      onClick () {
        console.log('click')
      }
    },
    render (h) {
      return (
        <span class={this.clazz} style={this.style} v-show={this.show}>{this.content}</span>
      )
    }
  })
  export default Tooltip
</script>

<style lang="sass">
</style>
