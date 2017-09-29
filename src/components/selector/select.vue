<template>
  <div>
    <ul>
      <li>
        <input/>
      </li>
      <li class="zg-clear"></li>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  import emitter from '../../mixins/emitter'
  export default {
    name: 'ZgSelect',
    mixins: [emitter],
    data () {
      return {
        msg: 'select'
      }
    }
  }
</script>

<style lang="sass">

</style>
