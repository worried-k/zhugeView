<template>
  <th class="zg-grid-header-cell" :style="style">
    {{title}}
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
      width: null
    },
    computed: {
      style () {
        let style = {}
        if (this.width) {
          style.width = `${this.width}px`
        }
        return style
      }
    }
  }
</script>

<style lang="sass">
@import "styles/gridHeader"
</style>
