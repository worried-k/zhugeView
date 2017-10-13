<template>
  <ul class="zg-opt-group">
    <li class="zg-header">
      <slot name="header">{{label}}</slot>
    </li>
    <slot></slot>
  </ul>
</template>

<script>
  import emitter from '../../mixins/emitter'
  export default {
    name: 'ZgOptGroup',
    mixins: [emitter],
    props: {
      icon: {
        type: String
      },
      label: {
        type: String
      }
    },
    data () {
      return {
        msg: 'optionGroup'
      }
    }
  }
</script>

<style lang="sass">
@import "styles/optGroup"
</style>
