<template>
  <div :class="handleClass" :style="handleStyle" @click="onClickHandle">
    <slot>
      <span v-show="!chosenList.length" class="zg-select-label zg-placeholder">{{placeholder}}</span>
      <span v-show="chosenList.length" class="zg-select-label">{{resultLabel}}</span>
      <span v-if="theme === 'noborder'" class="zg-count" v-show="chosenList.length > 1">({{chosenList.length}})</span>
    </slot>
    <i :class="arrowIcon"></i>
  </div>
</template>

<script>
  export default {
    name: 'zgSelectorHandle',
    props: {
      /**
       * @description 已选列表
       */
      chosenList: {
        type: Array,
        default () {
          return []
        }
      },
      /**
       * @description 支持normal、noborder、tag
       */
      theme: {
        type: String,
        default: 'normal'
      },
      /**
       * @description placeholder
       */
      placeholder: {
        type: String,
        default: '请选择'
      },
      /**
       * @description 用于展示的字段名称
       */
      labelField: {
        type: String,
        required: true
      },
      /**
       * @description 别名字段，设置别名后，优先展示别名
       */
      aliasField: {
        type: String
      },
      /**
       * @description 下拉框宽度。如果theme为noborder，则该值为最大宽度，组件宽度在范围内自适应
       */
      width: {
        type: Number,
        default: 150
      },
      /**
       * @description 下拉框尺寸
       */
      size: {
        type: String,
        default: 'normal',
        validator (value) {
          return ['small', 'medium', 'big', 'normal'].includes(value)
        }
      },
      /**
       * @description 禁用下拉框
       */
      disable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        msg: 'handle'
      }
    },
    computed: {
      handleClass () {
        let clazz = {
          'zg-select-handle': true,
          // active: this.showOptions,
          disable: this.disable,
          noborder: this.theme === 'noborder'
        }
        clazz['zg-size-' + this.size] = true
        return clazz
      },
      handleStyle () {
        let style = {}
        if (this.theme === 'normal') {
          style.width = this.width + 'px'
        } else {
          style.maxWidth = this.width + 'px'
        }
        return style
      },
      arrowIcon () {
        return {
          'zg-select-arrow': true,
          'zgicon-down': this.theme === 'normal',
          'zgicon-pulldown': this.theme === 'noborder'
        }
      },
      resultLabel () {
        return this.chosenList.map(option => {
          return option[this.aliasField] || option[this.labelField]
        }).join(',')
      }
    },
    methods: {
      onClickHandle () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="sass">
@import "styles/handle"
</style>
