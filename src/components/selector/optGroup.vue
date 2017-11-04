<template>
  <ul class="zg-opt-group" v-show="show">
    <li class="zg-header">
      <slot name="header">{{label}}</slot>
    </li>
    <zg-option v-for="option in store"
               :key="option[keyField]"
               :checked="checkedMap[option[keyField]]"
               :disable="disableOptions.indexOf(option[keyField]) > -1"
               :data="option"
               :labelField="labelField"
               :multiple="multiple"
               @click="onClickOption">
    </zg-option>
  </ul>
</template>

<script>
  import emitter from '../../mixins/emitter'
  export default {
    name: 'ZgOptGroup',
    mixins: [emitter],
    props: {
      /**
       * group名称
       */
      label: {
        type: String
      },
      store: {
        type: Array
      },
      checkedMap: {
        type: Object
      },
      disableOptions: {
        type: Array
      },
      keyField: {
        type: String,
        required: true
      },
      labelField: {
        type: String,
        required: true
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: true
      }
    },
    methods: {
      onClickOption (checked, data) {
        this.$emit('click', checked, data)
      }
    }
  }
</script>

<style lang="sass">
@import "styles/optGroup"
</style>
