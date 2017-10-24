<template>
  <div class="zg-select"
       v-click-outside="onClickOutside"
       :style="style">
    <div class="zg-select-handle" :class="handleClass" @click="onClickHandle" ref="handle" :title="chosenValue">
      <slot name="handle">
        <zg-input v-if="theme === 'normal'" class="zg-select-chosen"
                  width="100%"
                  read-only
                  :value="chosenValue"
                  :placeholder="placeholder"
        ></zg-input>

        <span class="zg-label"
              v-else-if="theme === 'noborder' && chosenValue"
              :style="{'max-width': (width - 25) + 'px'}">
          <span class="zg-value">{{chosenValue}}</span>
          <span class="zg-count" v-if="chosen.length > 1">({{chosen.length}})</span>
        </span>

        <span v-else class="zg-label zg-placeholder">
          {{placeholder}}
        </span>
      </slot>
      <i class="zg-select-arrow" :class="arrowIcon"></i>
    </div>

    <transition enter-active-class="animated slideInDown">
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
          <li v-show="multiple && chosen.length && clearAble && !filter" class="zg-clear">
            <a href="javascript:void(0)" @click="clear">清空</a>
          </li>
        </div>
        <!--to options-->
        <div class="zg-content" @mousewheel="onScroll" @scroll="onScroll" ref="options">
          <slot></slot>
          <li v-show="noMatch" class="zg-option zg-error">
            {{noMatchText}}
          </li>
          <li v-show="noData" class="zg-option zg-error">
            {{noDataText}}
          </li>
        </div>
      </ul>
    </transition>

  </div>
</template>

<script>
  import emitter from '../../mixins/emitter'
  import ZgInput from '../input/input.vue'
  import {util} from '../../utils/index'
  import ZgOption from './option.vue'

  export default {
    components: {
      ZgOption,
      ZgInput},
    name: 'ZgSelect',
    mixins: [emitter],
    props: {
      /**
       * @description 主题类型
       */
      theme: {
        type: String,
        default: 'normal',
        validator (value) {
          const themes = ['normal', 'noborder']
          return themes.indexOf(value) > -1
        }
      },
      /**
       * @description value
       */
      value: {
        type: [Array, String, Object]
      },
      /**
       * @description 宽度
       */
      width: {
        type: Number,
        default: 150
      },
      /**
       * @description placeholder
       */
      placeholder: {
        type: String,
        default: '请选择'
      },
      /**
       * @description 搜索无匹配数据时的提示文本
       */
      noMatchText: {
        type: String,
        default: '无匹配数据'
      },
      /**
       * @description 下拉列表空数据提示
       */
      noDataText: {
        type: String,
        default: '暂无数据'
      },
      /**
       * @description 多选
       */
      multiple: {
        type: Boolean,
        default: false
      },
      /**
       * @description 可清空
       * @tip multiple启用时有效
       */
      clearAble: {
        type: Boolean,
        default: true
      },
      /**
       * @description 过滤选项
       */
      filterOption: {
        type: Boolean,
        default: false
      },
      /**
       * @description 用于展示的字段名称
       */
      labelField: {
        type: String,
        default: 'label'
      },
      /**
       * @description 过滤选项的回调函数
       * @tip 用于自定义过滤规则
       */
      filterCallback: {
        type: Function
      }
    },
    data () {
      let data = {
        chosen: [],
        filter: '',
        scrollBottom: 0,
        showOptions: false,
        noMatch: false,
        noData: false,
        filterTimeout: null
      }
      return data
    },
    watch: {
      value (value) {
        this.chosen = value
      }
    },
    computed: {
      chosenValue () {
        return this.chosen.map(item => {
          if (util.isObject(item)) {
            return item[this.labelField]
          }
          return item
        }).join(',')
      },
      style () {
        let style = {}
        if (this.theme === 'normal') {
          style.width = this.width + 'px'
        } else {
          style['max-width'] = this.width + 'px'
        }
        return style
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
    updated () {
      const dropPanel = this.$refs.dropPanel
      const panelRect = dropPanel.getBoundingClientRect()
      if ((panelRect.width + panelRect.left) > window.innerWidth) {
        dropPanel.style.right = '0px'
      }
      if (this.filter) {
        this.noMatch = this.children('ZgOption').length === 0
      } else {
        this.noMatch = false
        this.noData = this.children('ZgOption').length === 0
      }
    },
    mounted () {
      if (this.filter) {
        this.noMatch = this.children('ZgOption').length === 0
      } else {
        this.noMatch = false
        this.noData = this.children('ZgOption').length === 0
      }
    },
    methods: {
      clear () {
        this.$refs.options.scrollTop = 0
        this.chosen.splice(0, this.chosen.length)
        this.children('ZgOption').forEach((child) => {
          child.$data.checked = false
        })
        this.$emit('clear')
      },
      onFilter () {
        if (this.filterTimeout) clearTimeout(this.filterTimeout)
        this.filterTimeout = setTimeout(() => {
          this.$refs.options.scrollTop = 0
          if (util.isFunction(this.filterCallback)) {
            this.filterCallback(this.filter)
            return
          }
          let noMatch = true
          this.$slots.default.forEach((item) => {
            let instance = item.componentInstance
            if (!instance) return
            if (instance.$options.name === 'ZgOptGroup') {
              let hideCount = 0
              instance.children('ZgOption').forEach(option => {
                option.$data.show = option.$props.value[this.labelField].indexOf(this.filter) > -1
                if (!option.$data.show) {
                  hideCount++
                  option.$data.show = false
                }
              })
              instance.$data.show = hideCount !== instance.children('ZgOption').length
            } else {
              instance.$data.show = instance.$props.value[this.labelField].indexOf(this.filter) > -1
            }
            if (instance.$data.show) {
              noMatch = false
            }
          })
          this.noMatch = noMatch
        }, 100)
      },
      onClickOption (value, checked) {
        if (this.multiple) {
          if (checked) {
            if (this.chosen.indexOf(value) === -1) this.chosen.push(value)
          } else {
            for (let i = 0; i < this.chosen.length; i++) {
              if (util.equal(this.chosen[i], value)) {
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
        this.$emit('input', this.chosen)
      },
      onClickHandle () {
        this.showOptions = !this.showOptions
      },
      onClickOutside () {
        this.showOptions = false
      },
      onScroll () {
        const panel = this.$refs.options
        const height = panel.getBoundingClientRect().height
        const scrollBottom = panel.scrollHeight - height - panel.scrollTop
        if (scrollBottom === this.scrollBottom || (scrollBottom <= 20 && this.scrollBottom <= 20)) return
        this.scrollBottom = scrollBottom
        if (scrollBottom <= (panel.scrollHeight - height) * 0.05) {
          this.$emit('bottom')
        }
      }
    }
  }
</script>

<style lang="sass">
@import "styles/select"
</style>
