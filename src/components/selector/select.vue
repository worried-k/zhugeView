<template>
  <div class="zg-select"
       :style="style">
    <div class="zg-select-handle" :class="handleClass" @click="showOptions = !showOptions">
      <zg-input class="zg-select-chosen"
                v-model="chosenValue"
                width="100%"
                read-only
                :placeholder="placeholder"
      ></zg-input>
      <i class="zg-select-arrow icon-down"></i>
    </div>

    <ul v-show="showOptions" class="zg-drop-panel">
      <div class="zg-fixed">
        <zg-input
          icon="icon-search"
          width="100%"
          class="zg-select-search"
          clear-able
          v-model="filter"
          @input="onFilter"
        ></zg-input>
        <li class="zg-clear">
          <a href="javascript:void(0)">清空</a>
        </li>
      </div>
      <!--to options-->
      <div class="zg-content">
        <slot></slot>
      </div>
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
      },
      handleClass () {
        let clazz = []
        if (this.showOptions) clazz.push('active')
        return clazz.join(' ')
      }
    },
    methods: {
      onFilter () {
        this.$slots.default.forEach((item) => {
          let instance = item.componentInstance
          if (instance.$props.label.indexOf(this.filter) > -1) {
            instance.$data.show = true
          } else {
            instance.$data.show = false
          }
        })
      }
    }
  }
</script>

<style lang="sass">
@import "styles/select"
</style>
