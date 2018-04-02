<template>
  <div class="zg-scroll-container" @scroll="onScroll" v-resize="onScroll" ref="panel">
    <slot></slot>
  </div>
</template>
<script>
import {util} from '../../utils'
import {emitter} from '../../mixins/main'
let timer = null
export default {
  name: 'zgScrollContainer',
  mixins: [emitter],
  data () {
    return {
      scrollBottom: 0
    }
  },
  methods: {
    onScroll () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        let lazyPanels = this.children('zgScrollLazyPanel')
        lazyPanels.forEach && lazyPanels.forEach(item => {
          if (item && item.$el && util.isFunction(item.updateStatus)) {
            item.updateStatus()
          }
        })
      }, 100)

      this.checkInBottom()
    },
    /**
     * @description 检测是否滚动到了容器底部
     */
    checkInBottom () {
      const panel = this.$refs.panel
      const height = panel.getBoundingClientRect().height
      const scrollBottom = panel.scrollHeight - height - panel.scrollTop
      if (scrollBottom === this.scrollBottom || (scrollBottom <= 20 && this.scrollBottom <= 20)) return
      this.scrollBottom = scrollBottom
      if (scrollBottom <= (panel.scrollHeight - height) * 0.5) {
        this.$emit('bottom')
      }
    }
  }
}
</script>
<style lang="sass">
.zg-scroll-container
  position: relative
  height: 100%
  overflow: auto
</style>
