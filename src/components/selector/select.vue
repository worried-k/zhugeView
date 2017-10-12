<template>
  <div class="zg-select"
       v-click-outside="onClickOutside"
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
          v-if="filterOption"
          icon="icon-search"
          width="100%"
          class="zg-select-search"
          clear-able
          v-model="filter"
          @input="onFilter"
        ></zg-input>
        <li v-show="multiple && chosen.length" class="zg-clear">
          <a href="javascript:void(0)" @click="clear">清空</a>
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
  import {util} from '../../utils/index'

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
      },
      multiple: {
        type: Boolean,
        default: false
      },
      filterOption: {
        type: Boolean,
        default: false
      },
      labelField: {
        type: String
      }
    },
    data () {
      return {
        chosen: [],
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
      clear () {
        this.chosen.splice(0, this.chosen.length)
        this.chosenValue = ''
        this.$children.forEach((child) => {
          if (child.$options.name === 'ZgOption') {
            child.$data.checked = false
          }
        })
      },
      onFilter () {
        this.$slots.default.forEach((item) => {
          let instance = item.componentInstance
          if (instance.$props.label.indexOf(this.filter) > -1) {
            instance.$data.show = true
          } else {
            instance.$data.show = false
          }
        })
      },
      onClickOption (value, checked) {
        if (this.multiple) {
          if (checked) {
            this.chosen.push(value)
          } else {
            for (let i = 0; i < this.chosen.length; i++) {
              if (this.chosen[i] === value) {
                this.chosen.splice(i, 1)
                break
              }
            }
          }
        } else {
          this.$children.forEach((child) => {
            if (child.$options.name === 'ZgOption' && child.$props.value !== value) {
              child.$data.checked = false
            }
          })
          this.chosen.splice(0, this.chosen.length)
          this.chosen.push(value)
          this.showOptions = false
        }
        this.chosenValue = this.chosen.map(item => {
          if (util.isString(item)) {
            return item
          }
          return item[this.labelField]
        }).join(',')
      },
      onClickOutside () {
        this.showOptions = false
      }
    }
  }
</script>

<style lang="sass">
@import "styles/select"
</style>
