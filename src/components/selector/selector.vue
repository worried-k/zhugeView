<template>
  <div class="zg-select" v-click-outside="onClickOutside">
    <div class="zg-select-handle" ref="handle" :class="handleClass" :style="handleStyle" @click="onClickHandle">
      <slot name="handle">
        <span v-show="resultLabel" class="zg-select-label">{{resultLabel}}</span>
        <span v-show="!resultLabel" class="zg-select-label zg-placeholder">{{placeholder}}</span>
      </slot>
      <i class="zg-select-arrow" :class="arrowIcon"></i>
    </div>

    <transition enter-active-class="animated slideInDown">
      <ul v-show="showOptions" class="zg-drop-panel" ref="dropPanel">

        <div class="zg-fixed">
          <li v-show="multiple && chosenList.length && clearAble" class="zg-clear">
            <a href="javascript:void(0)" @click="clean">清空</a>
          </li>
        </div>

        <div class="zg-content" ref="options" @scroll.prevent.stop="onScroll">
          <template v-for="option in store">
            <template v-if="childrenField">
              <zg-opt-group v-if="showMap[option[keyField]]"
                            :key="option[keyField]"
                            :store="option[childrenField]"
                            :showMap="showMap"
                            :label="option[labelField]"
                            :checkedMap="checkedMap"
                            :disableOptions="disableOptions"
                            :keyField="keyField"
                            :labelField="labelField"
                            :multiple="multiple"
                            @click="onClickOption">

              </zg-opt-group>
            </template>
            <template v-else>
              <zg-option v-if="showMap[option[keyField]]" :key="option[keyField]"
                         :checked="checkedMap[option[keyField]]"
                         :disable="disableOptions.indexOf(option[keyField]) > -1"
                         :data="option"
                         :labelField="labelField"
                         :multiple="multiple"
                         @click="onClickOption">
              </zg-option>
            </template>
          </template>
          <li v-show="noData" class="zg-option zg-error">
            {{noDataText}}
          </li>
        </div>
      </ul>
    </transition>
  </div>
</template>

<script>
  import ZgOption from './option.vue'
  import ZgCheckbox from '../checkbox/checkbox.vue'
  import ZgOptGroup from './optGroup.vue'

  export default {
    components: {
      ZgOptGroup,
      ZgCheckbox,
      ZgOption},
    name: 'zgSelector',
    props: {
      /**
       * @description 选项唯一标识字段
       */
      keyField: {
        type: String,
        required: true
      },
      /**
       * @description 用于展示的子集字段名称
       * @tip 用于分组展示
       */
      childrenField: {
        type: String
      },
      /**
       * @description 数据源
       */
      store: {
        type: Array,
        required: true
      },
      /**
       * @description 禁用的选项列表：key值列表
       * @default []
       */
      disableOptions: {
        type: Array,
        default () {
          return []
        }
      },
      /**
       * @description （默认）单页展示条数
       */
      pageSize: {
        type: Number,
        default: 20
      },
      /**
       * @description 自定义展示分组头部
       * @tip childrenField被指定时启用，自定义头部可返回html片段，因此需调用时注意xss漏洞处理
       */
      customHeader: {
        type: Function
      },
      /**
       * @description 远程搜索函数, 接收参数为匹配文本
       * @tip 外部使用时候，建议做数据查询缓存，以提高性能
       */
      remote: {
        type: Function
      },
      /**
       * @description 同select
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
       * @tip 如果multiple为true，则value需要为对象数组，否则为Object，Object需是Store的子项，或者至少拥有有效的keyField字段
       */
      value: {
        type: [Array, Object]
      },
      /**
       * @description 下拉框宽度
       */
      width: {
        type: Number,
        default: 150
      },
      /**
       * @description 用于展示的字段名称
       */
      labelField: {
        type: String,
        required: true
      },
      /**
       * @description 默认提示文本
       */
      placeholder: {
        type: String,
        default: '请选择'
      },
      /**
       * @description 筛选无匹配数据的提示文本
       * @tip filterOption开启后生效
       */
      noMatchText: {
        type: String,
        default: '无匹配数据'
      },
      /**
       * @description 无数据的提示文本
       */
      noDataText: {
        type: String,
        default: '暂无数据'
      },
      /**
       * @description 可清空选中结果
       */
      clearAble: {
        type: Boolean,
        default: true
      },
      /**
       * @description 开启选项筛选过滤
       */
      filterOption: {
        type: Boolean,
        default: false
      },
      /**
       * @description 多选模式
       */
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data () {
      let data = {
        showOptions: false,
        checkedMap: {},
        chosenList: [],
        pageNum: 0,
        totalCount: 0
      }
      // 绑定默认值
      if (this.value) {
        if (!this.multiple) {
          this.store.forEach(option => {
            if (this.childrenField) {
              option[this.childrenField].forEach(child => {
                if (child[this.keyField] === this.value[this.keyField]) {
                  data.checkedMap[this.value[this.keyField]] = true
                  data.chosenList.push(child)
                }
              })
            } else {
              if (option[this.keyField] === this.value[this.keyField]) {
                data.checkedMap[this.value[this.keyField]] = true
                data.chosenList.push(option)
              }
            }
          })
        } else {
          this.store.forEach(option => {
            if (this.childrenField) {
              option[this.childrenField].forEach(child => {
                this.value.forEach(defaultOption => {
                  if (child[this.keyField] === defaultOption[this.keyField]) {
                    data.checkedMap[child[this.keyField]] = true
                    data.chosenList.push(child)
                  }
                })
              })
            } else {
              this.value.forEach(defaultOption => {
                if (option[this.keyField] === defaultOption[this.keyField]) {
                  data.checkedMap[option[this.keyField]] = true
                  data.chosenList.push(option)
                }
              })
            }
          })
        }
      }
      return data
    },
    computed: {
      arrowIcon () {
        if (this.theme === 'noborder') {
          return 'zgicon-pulldown'
        }
        return 'zgicon-down'
      },
      handleClass () {
        return {
          active: this.showOptions
        }
      },
      handleStyle () {
        return {
          width: this.width + 'px'
        }
      },
      noData () {
        return this.store.length === 0
      },
      resultLabel () {
        return this.chosenList.map(option => {
          return option[this.labelField]
        }).join(',')
      },
      /**
       * 用于处理数据分页
       */
      showMap () {
        console.time('showMap')
        let map = {
          count: 0
        }
        let maxCount = (this.pageNum + 1) * this.pageSize
        let totalCount = 0
        this.store.forEach(item => {
          if (this.childrenField) {
            let flag = map.count < maxCount
            let haveChildren = false
            item[this.childrenField].forEach(child => {
              if (flag) {
                map[child[this.keyField]] = flag
                map.count++
                haveChildren = true
              }
              totalCount++
            })
            map[item[this.keyField]] = haveChildren
          } else {
            let flag = map.count < maxCount
            if (flag) {
              map[item[this.keyField]] = flag
              map.count++
            }
            totalCount++
          }
        })
        this.totalCount = totalCount
        console.timeEnd('showMap')
        return map
      }
    },
    watch: {
      /**
       * 保持对v-model的双向数据绑定
       * @param value
       */
      value (value) {
        if (value === this.chosenList) return
        this.chosenList = []
        this.$set(this, 'checkedMap', {})
        if (!value) return
        console.time('同步value')
        if (!this.multiple) {
          this.store.forEach(option => {
            if (this.childrenField) {
              option[this.childrenField].forEach(child => {
                if (child[this.keyField] === value[this.keyField]) {
                  this.checkedMap[value[this.keyField]] = true
                  this.chosenList.push(child)
                  this.$emit('input', this.chosenList[0])
                }
              })
            } else {
              if (option[this.keyField] === value[this.keyField]) {
                this.checkedMap[value[this.keyField]] = true
                this.chosenList.push(option)
                this.$emit('input', this.chosenList[0])
              }
            }
          })
          if (this.noData) this.$emit('input', this.chosenList[0])
        } else {
          this.store.forEach(option => {
            if (this.childrenField) {
              option[this.childrenField].forEach(child => {
                value.forEach(defaultOption => {
                  if (child[this.keyField] === defaultOption[this.keyField]) {
                    this.checkedMap[child[this.keyField]] = true
                    this.chosenList.push(child)
                  }
                })
              })
            } else {
              value.forEach(defaultOption => {
                if (option[this.keyField] === defaultOption[this.keyField]) {
                  this.checkedMap[option[this.keyField]] = true
                  this.chosenList.push(option)
                }
              })
            }
          })
          this.$emit('input', this.chosenList)
        }
        console.timeEnd('同步value')
      }
    },
    mounted () {
      if (this.multiple) {
        this.$emit('input', this.chosenList)
      } else {
        this.$emit('input', this.chosenList[0])
      }
    },
    methods: {
      onClickOutside () {
        this.showOptions = false
      },
      onClickHandle () {
        this.showOptions = !this.showOptions
      },
      onClickOption (checked, data) {
        console.time('clickOption')
        if (!this.multiple) {
          this.chosenList = []
          this.store.forEach(option => {
            if (this.childrenField) {
              option[this.childrenField].forEach(children => {
                this.$set(this.checkedMap, children[this.keyField], children[this.keyField] === data[this.keyField])
                if (children[this.keyField] === data[this.keyField]) this.chosenList.push(children)
              })
            } else {
              this.$set(this.checkedMap, option[this.keyField], option[this.keyField] === data[this.keyField])
              if (option[this.keyField] === data[this.keyField]) this.chosenList.push(option)
            }
          })

          this.showOptions = false
          this.$emit('input', this.chosenList[0])
        } else {
          this.$set(this.checkedMap, data[this.keyField], checked)
          if (checked) {
            this.chosenList.push(data)
          } else {
            this.chosenList.forEach((option, i) => {
              if (option === data) {
                this.chosenList.splice(i, 1)
              }
            })
          }
          this.$emit('input', this.chosenList)
        }
        console.timeEnd('clickOption')
        this.$emit('change')
      },
      onScroll () {
        const panel = this.$refs.options
        const height = panel.getBoundingClientRect().height
        const scrollBottom = panel.scrollHeight - height - panel.scrollTop
        if (scrollBottom === this.scrollBottom || (scrollBottom <= 20 && this.scrollBottom <= 20)) return
        this.scrollBottom = scrollBottom
        if (scrollBottom <= (panel.scrollHeight - height) * 0.05) {
          let count = (this.pageNum + 1) * this.pageSize
          if (this.totalCount > count) {
            this.pageNum++
          }
        }
      },
      clean () {
        this.chosenList = []
        this.$set(this, 'checkedMap', {})
        this.$emit('input', this.chosenList)
      }
    }
  }
</script>

<style lang="sass">
  @import "styles/select"
</style>
