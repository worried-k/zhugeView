<template>
  <div class="zg-scroll-container" @scroll="onScroll" v-resize="onScroll">
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
