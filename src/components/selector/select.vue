<template>
  <div class="zg-select"
       :style="style">
    <div class="zg-select-handle" @click="showOptions = !showOptions">
      <zg-input class="zg-select-chosen"
                v-model="chosenValue"
                width="100%"
                read-only
                :placeholder="placeholder"
      ></zg-input>
      <i class="zg-select-arrow icon-down"></i>
    </div>

    <ul v-if="showOptions" class="zg-drop-panel">
      <zg-input
        icon="icon-search"
        width="100%"
        class="zg-select-search"
        clear-able
        v-model="filter"
        @input="onFilter"
      ></zg-input>
      <!--to options-->
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  import emitter from '../../mixins/emitter'
  import ZgInput from '../input/input.vue'

  export default {
    components: {ZgInput},
    name: 'ZgSelect',
    mixins: [emitter],
    props: {
      width: {
        type: Number,
        default: 150
      },
      placeholder: {
        type: String,
        default: '请选择'
      }
    },
    data () {
      return {
        chosenValue: '',
        filter: '',

        showOptions: false
      }
    },
    computed: {
      style () {
        return {
          width: this.width + 'px'
        }
      }
    },
    methods: {
      onFilter () {
        console.log(this.searchValue)
      }
    }
  }
</script>

<style lang="sass">
@import "styles/select"
</style>
