<template>
  <th :class="clazz" :style="style" @click="onClick">
    {{title}}
    <span class="zg-sort-icon" v-if="sortAble">
      <i class="zgicon-sort-left" :class="{'zg-active': sortStatus === -1}"></i>
      <i class="zgicon-sort-right" :class="{'zg-active': sortStatus === 1}"></i>
    </span>
  </th>
</template>

<script>
  export default {
    name: 'zgGridHeader',
    props: {
      title: {
        type: String,
        required: true
      },
      width: null,
      column: {
        type: Object,
        required: true
      },
      sortAble: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        /**
         * 0：未排序；1：正序；-1：倒序
         */
        sortStatus: 0
      }
    },
    computed: {
      style () {
        let style = {}
        if (this.width) {
          style.width = `${this.width}px`
          style.maxWidth = `${this.width}px`
        }
        return style
      },
      clazz () {
        return {
          'zg-grid-header-cell': true,
          'zg-sort-able': this.sortAble
        }
      }
    },
    methods: {
      onClick () {
        if (this.sortStatus === 0) {
          this.sortStatus = -1
        } else {
          this.sortStatus = this.sortStatus * -1
        }
        if (this.sortAble) {
          this.$emit('sort', this.sortStatus, this.column)
        }
      }
    }
  }
</script>

<style lang="sass">
@import "styles/gridHeader"
</style>
