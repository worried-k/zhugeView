<template>
  <td class="zg-grid-cell" :class="clazz" :style="style" @click="onClick">
    <slot :data="data" :field="labelField">{{data[labelField]}}</slot>
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
      index: {
        type: Number,
        required: true
      },
      width: null
    },
    computed: {
      style () {
        let style = {}
        if (this.width) {
          style.width = `${this.width}px`
          style.maxWidth = `${this.width}px`
          style.minWidth = `${this.width}px`
        }
        return style
      },
      clazz () {
        return {
          'zg-click-able': this.$listeners.click
        }
      }
    },
    methods: {
      onClick () {
        this.$emit('click', this.data, this.labelField)
      }
    }
  }
</script>

<style lang="sass">
@import "styles/gridCell"
</style>
