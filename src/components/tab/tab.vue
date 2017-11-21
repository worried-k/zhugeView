<template>
  <span :class="clazz" @click="onClick">
    {{tab.title}}
  </span>
</template>

<script>
  export default {
    name: 'tab',
    props: {
      tab: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      activeIndex: {
        type: Number,
        required: true
      }
    },
    computed: {
      clazz () {
        return {
          'zg-tab': true,
          'zg-checked': this.activeIndex === this.index
        }
      }
    },
    methods: {
      onClick () {
        if (this.activeIndex === this.index) return
        this.$emit('click', this.tab)
      }
    }
  }
</script>

<style lang="sass">

</style>
