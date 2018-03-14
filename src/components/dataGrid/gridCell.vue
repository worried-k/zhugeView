<template>
  <td :class="clazz" :style="style" @click="onClick" v-if="ableClick">
    <slot :data="store" :field="labelField">{{store[labelField]}}</slot>
  </td>
  <td v-else :class="clazz" :style="style">
    <slot :data="store" :field="labelField">{{store[labelField]}}</slot>
  </td>
</template>

<script>
  export default {
    name: 'zgGridCell',
    props: {
      store: {
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
      ableClick: {
        type: Boolean,
        default: false
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
          'zg-grid-cell': true,
          'zg-click-able': this.ableClick
        }
      }
    },
    methods: {
      onClick () {
        this.$emit('click', this.store, this.labelField)
      }
    }
  }
</script>

<style lang="sass">
@import "styles/gridCell"
</style>
