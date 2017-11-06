<template>
  <ul class="zg-opt-group" v-show="show">
    <li class="zg-header">
      <slot name="header" :groupData="groupData">{{groupData[labelField]}}</slot>
    </li>
    <template v-for="option in store">
      <zg-option v-if="showMap[option[keyField]]"
                 :key="option[keyField]"
                 :checked="checkedMap[option[keyField]]"
                 :disable="disableOptions.indexOf(option[keyField]) > -1"
                 :data="option"
                 :labelField="labelField"
                 :multiple="multiple"
                 @click="onClickOption">
      </zg-option>
    </template>
  </ul>
</template>

<script>
  import emitter from '../../mixins/emitter'
  export default {
    name: 'ZgOptGroup',
    mixins: [emitter],
    props: {
      groupData: {
        type: Object
      },
      store: {
        type: Array
      },
      checkedMap: {
        type: Object
      },
      showMap: {
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
