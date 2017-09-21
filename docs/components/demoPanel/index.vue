<template>
  <div class="demo-panel">
    <h3 class="title">{{title}}</h3>
    <p class="subtitle">{{subtitle}}</p>
    <div class="wrap-box">
      <div class="demo-box">
        <slot></slot>
      </div>
      <div :class="['js-fiddle']" :style="jsFiddleStyle">
        <iframe width="100%" :src="showJsFiddleUrl" frameborder="0" :style="jsFiddleIframeStyle"></iframe>
      </div>
      <div class="demo-block-control" @click="onClickControl">
        <span v-show="!this.showJsFiddle">显示代码</span>
        <span v-show="this.showJsFiddle">隐藏代码</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'demoPanel',
  props: {
    title: String,
    subtitle: {
      type: String,
      default: ''
    },
    jsFiddleUrl: String
  },
  data () {
    return {
      showJsFiddle: false,
      showJsFiddleUrl: '',
      iframeHeight: 0,
      jsFiddleStyle: {
        height: 0
      },
      jsFiddleIframeStyle: {
        height: 0
      }
    }
  },
  created () {
    window.addEventListener("message", this.onMessage, false)
  },
  beforeDestroy () {
    window.removeEventListener("message", this.onMessage)
  },
  methods: {
    onMessage (event) {
      let eventName = event.data[0]
      let data = event.data[1] || {}
      if (eventName === 'embed' || eventName === 'resultsFrame') {
        let height = data.height || 310
        let slug = data.slug
        if (slug && this.jsFiddleUrl.indexOf(slug) >= 0) {
          this.iframeHeight = height + 40
          this.showCodeView()
        }
      }
    },
    showCodeView () {
      this.jsFiddleStyle.height = this.iframeHeight + 3 + 'px'
      this.jsFiddleIframeStyle.height = this.iframeHeight + 'px'
    },
    hideCodeView () {
      this.jsFiddleStyle.height = 0
      this.jsFiddleIframeStyle.height = 0
    },
    onClickControl () {
      this.showJsFiddle = !this.showJsFiddle
      if (this.showJsFiddle) {
        if (!this.showJsFiddleUrl) {
          this.showJsFiddleUrl = this.jsFiddleUrl
        }
        if (this.iframeHeight) {
          this.showCodeView()
        }
      } else {
        this.hideCodeView()
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import "./styles/index.sass"
</style>
