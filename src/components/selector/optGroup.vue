<template>
  <ul>
    <li>{{label}}</li>
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'ZgOptGroup',
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
