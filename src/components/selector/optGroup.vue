<template>
  <ul>
    <li>{{label}}</li>
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

</style>
