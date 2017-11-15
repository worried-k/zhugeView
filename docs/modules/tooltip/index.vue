<template>
  <div>
    <demo-panel title="tooltip">
      <div class="top row">
        <zg-tooltip content="上左" placement="top-left">
          <span class="span">上左</span>
        </zg-tooltip>

        <zg-tooltip content="上" placement="top">
          <span class="span">上</span>
        </zg-tooltip>

        <zg-tooltip content="上右" placement="top-right">
          <span class="span">上右</span>
        </zg-tooltip>
      </div>
      <div class="center-top row">
        <zg-tooltip content="左上" placement="left-top">
          <span class="span">左上</span>
        </zg-tooltip>

        <zg-tooltip content="右上" placement="right-top">
          <span class="span">右上</span>
        </zg-tooltip>
      </div>
      <div class="center row">
        <zg-tooltip content="左" placement="left">
          <span class="span">左</span>
        </zg-tooltip>

        <zg-tooltip content="右" placement="right">
          <span class="span">右</span>
        </zg-tooltip>
      </div>
      <div class="center-bottom row">
        <zg-tooltip content="左下" placement="left-bottom">
          <span class="span">左下</span>
        </zg-tooltip>

        <zg-tooltip content="右下" placement="right-bottom">
          <span class="span">右下</span>
        </zg-tooltip>
      </div>
      <div class="bottom row">
        <zg-tooltip content="下左" placement="bottom-left">
          <span class="span">下左</span>
        </zg-tooltip>

        <zg-tooltip content="下" placement="bottom">
          <span class="span">下</span>
        </zg-tooltip>

        <zg-tooltip content="下右" placement="bottom-right">
          <span class="span">下右</span>
        </zg-tooltip>
      </div>
      <zg-tooltip :content="content">
        aa
      </zg-tooltip>
    </demo-panel>
  </div>
</template>

<script>
  import ZgTooltip from '../../../src/components/tooltip/tooltip.vue'
  import DemoPanel from '../../components/demoPanel/index.vue'

  export default {
    components: {
      DemoPanel,
      ZgTooltip},
    name: 'index',
    data () {
      return {
        content: 'this is aa'
      }
    }
  }
</script>

<style lang="sass">
.span
  display: inline-block
  border: 1px solid darkgray
  border-radius: 3px
  width: 50px
  height: 50px
  line-height: 50px
  text-align: center
  margin: 0 5px
.row
  width: 350px
  margin: 0 auto
.center, .center-top, .center-bottom
  margin: 5px auto
  & span:last-child
    float: right
.top, .bottom
  width: 200px
</style>
