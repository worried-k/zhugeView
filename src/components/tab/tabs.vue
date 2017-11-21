<script type="text/jsx">
  import {emitter} from '../../mixins/main'
  import zgTab from './tab.vue'
  export default {
    name: 'zgTabs',
    mixins: [emitter],
    components: {zgTab},
    props: {
      /**
       * @description tab标签的位置，当标签组纵向排列时，left等同于top，center等同middle, right等同于bottom
       */
      placement: {
        type: String,
        default: 'center',
        validator (value) {
          return ['left', 'center', 'right'].includes(value)
        }
      }
    },
    data () {
      return {
        tabs: [],
        activeIndex: 0
      }
    },
    computed: {
      tabBarClass () {
        return {
          'zg-tab-bar': true,
          'zg-right': this.placement === 'right',
          'zg-center': this.placement === 'center'
        }
      }
    },
    mounted () {
      const tabs = this.children('zgTabPanel')
      if (tabs.length) {
        tabs[this.activeIndex].$data.show = true
      }
    },
    methods: {
      onClickTab (tab) {
        this.activeIndex = tab.index
        this.$emit('change', tab)
      },
      addTab (tab) {
        tab.index = this.tabs.length
        this.tabs.push(tab)
      }
    },
    render (h) {
      return (
        <div class="zg-tabs">
          <div style="display: none">{this.$slots.default}</div>
          <div class={this.tabBarClass}>
            {this.tabs.map((tab, index) => {
              return (
                <zg-tab activeIndex={this.activeIndex}
                        index={index}
                        tab={tab}
                        onClick={this.onClickTab}
                ></zg-tab>
              )
            })}
          </div>
          {this.tabs.map((tab, index) => {
            return (
              <div v-show={index === this.activeIndex} class="zg-tab-panel">{tab.slot}</div>
            )
          })}
        </div>
      )
    }
  }
</script>

<style lang="sass">
@import "styles/tab"
</style>
