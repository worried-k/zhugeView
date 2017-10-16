<template>
  <div class="zg-select"
       v-click-outside="onClickOutside"
       :style="style">
    <div class="zg-select-handle" :class="handleClass" @click="onClickHandle">
      <slot name="handle">
        <zg-input class="zg-select-chosen"
                  v-model="chosenValue"
                  width="100%"
                  read-only
                  :placeholder="placeholder"
        ></zg-input>
      </slot>
      <i class="zg-select-arrow" :class="arrowIcon"></i>
    </div>

    <ul v-show="showOptions" class="zg-drop-panel" ref="dropPanel">
      <div class="zg-fixed">
        <zg-input
          v-if="filterOption"
          icon="zgicon-search"
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
      theme: {
        type: String,
        default: 'normal',
        validator (value) {
          const themes = ['normal', 'noborder']
          return themes.indexOf(value) > -1
        }
      },
      value: {
        type: [Array, String, Object]
      },
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
        if (this.theme !== 'normal') {
          clazz.push(this.theme)
        }
        return clazz.join(' ')
      },
      arrowIcon () {
        if (this.theme === 'noborder') {
          return 'zgicon-pulldown'
        }
        return 'zgicon-down'
      }
    },
    methods: {
      clear () {
        this.chosen.splice(0, this.chosen.length)
        this.chosenValue = ''
        this.children('ZgOption').forEach((child) => {
          child.$data.checked = false
        })
      },
      onFilter () {
        this.$slots.default.forEach((item) => {
          let instance = item.componentInstance
          if (!instance) return
          if (instance.$options.name === 'ZgOptGroup') {
            instance.children('ZgOption').forEach(option => {
              if (option.$props.value[this.labelField].indexOf(this.filter) > -1) {
                option.$data.show = true
              } else {
                option.$data.show = false
              }
            })
          } else {
            if (instance.$props.value[this.labelField].indexOf(this.filter) > -1) {
              instance.$data.show = true
            } else {
              instance.$data.show = false
            }
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
          this.children('ZgOption').forEach((child) => {
            if (child.$props.value !== value) {
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
        this.$emit('input', this.chosen)
      },
      onClickHandle () {
        this.showOptions = !this.showOptions
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
