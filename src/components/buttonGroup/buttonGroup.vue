<template>
  <div class="zg-button-group">
    <zg-button v-for="item in groupData" :key="item.value"
      :style="btnStyle"
      :class="[{activated: item.activated}]"
      :icon="item.icon"
      @click="onClick(item)">
      {{item.value}}
    </zg-button>
  </div>
</template>
<script>
import {util} from '@/utils'
import button from '../button/button.vue'
export default {
  name: 'ZgButtonGroup',
  props: {
    data: Array,
    btnWidth: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      groupData: []
    }
  },
  mounted () {
    this.initGroupData()
  },
  computed: {
    btnStyle () {
      let result = {}
      if (this.btnWidth) {
        result.width = this.btnWidth
      }
      return result
    }
  },
  methods: {
    initGroupData () {
      this.groupData = []
      let obj = null
      if (this.data && this.data.length) {
        this.data.map((item) => {
          if (util.isObject(item)) {
            obj = {
              value: item.value,
              icon: item.icon,
              activated: !!item.activated
            }
          } else {
            obj = {
              value: item,
              activated: false
            }
          }
          this.groupData.push(obj)
        })
      }
    },
    onClick (item) {
      this.groupData.map((obj) => {
        obj.activated = false
      })
      item.activated = true
    }
  },
  components: {
    zgButton: button
  }
}
</script>
<style lang="sass">
@import "./styles/buttonGroup.sass"
</style>
