<script type="text/jsx">
  import {emitter} from '../../mixins/main'
  import zgTab from './tab.vue'
  export default {
    name: 'zgTabs',
    mixins: [emitter],
    components: {zgTab},
    data () {
      return {
        tabs: [],
        activeIndex: 0
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
          <div class="zg-tab-bar">
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
