<template>
  <td class="zg-grid-cell" :style="style">
    {{data[labelField]}}
  </td>
</template>

<script>
  export default {
    name: 'zgGridCell',
    props: {
      data: {
        type: Object,
        required: true
      },
      labelField: {
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
@import "styles/gridCell"
</style>
