<script type="text/jsx">
  import ZgOption from './option.vue'
  import ZgCheckbox from '../checkbox/checkbox.vue'
  import ZgOptGroup from './optGroup.vue'
  import {util} from '../../mixins/main'
  export default {
    components: {
      ZgOptGroup,
      ZgCheckbox,
      ZgOption},
    name: 'zgSelector',
    mixins: [util],
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
       * @tip multiple模式下有效
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
        renderStore: this.store.slice(0, this.pageSize),
        pageNum: 0,
        totalCount: 0,
        filter: '',
        filterTimeout: null,
        noMatch: false,
        logTime: false// 打印时间戳日志
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
        return {
          'zg-select-arrow': true,
          'zgicon-down': this.theme === 'normal',
          'zgicon-pulldown': this.theme === 'noborder'
        }
      },
      handleClass () {
        return {
          'zg-select-handle': true,
          active: this.showOptions,
          noborder: this.theme === 'noborder'
        }
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
      noData () {
        return this.store.length === 0
      },
      resultLabel () {
        return this.chosenList.map(option => {
          return option[this.labelField]
        }).join(',')
      },
      filterClass () {
        let clazz = ['zg-select-search']
        if (this.filter) {
          clazz.push('zg-active')
        }
        return clazz.join(' ')
      },
      /**
       * 用于处理数据分页
       */
      showMap () {
        this.time('showMap')
        let map = {
          count: 0
        }
        let maxCount = (this.pageNum + 1) * this.pageSize
        let totalCount = 0
        let filter = this.filter
        this.renderStore = []
        this.store.forEach(item => {
          if (this.childrenField) {
            let haveChildren = false
            item[this.childrenField].forEach((child, i) => {
              let flag = map.count < maxCount
              if (flag &&
                (!filter || child[this.labelField].indexOf(filter) > -1)
              ) {
                map[child[this.keyField]] = flag
                map.count++
                haveChildren = true
              }
              if (!filter || child[this.labelField].indexOf(filter) > -1) totalCount++
            })
            if (haveChildren) this.renderStore.push(item)
            map[item[this.keyField]] = haveChildren
          } else {
            let flag = map.count < maxCount
            if (flag && ((!filter || item[this.labelField].indexOf(filter) > -1))) {
              map[item[this.keyField]] = flag
              map.count++
              this.renderStore.push(item)
            }
            if (!filter || item[this.labelField].indexOf(filter) > -1) totalCount++
          }
        })
        this.totalCount = totalCount
        this.noMatch = filter && totalCount === 0
        this.timeEnd('showMap')
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
        this.time('同步value')
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
        this.timeEnd('同步value')
      }
    },
    mounted () {
      if (this.multiple) {
        this.$emit('input', this.chosenList)
      } else {
        this.$emit('input', this.chosenList[0])
      }
    },
    updated () {
      const dropPanel = this.$refs.dropPanel
      const panelRect = dropPanel.getBoundingClientRect()
      if ((panelRect.width + panelRect.left) > window.innerWidth) {
        dropPanel.style.right = '0px'
      }
    },
    methods: {
      onClickOutside () {
        this.showOptions = false
      },
      onClickHandle () {
        this.showOptions = !this.showOptions
        this.pageNum = 0
        if (this.showOptions && this.filterOption) {
          setTimeout(() => {
            this.$refs.optionFilter.focus()
          })
        }
      },
      onClickOption (checked, data) {
        this.time('clickOption')
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
        this.timeEnd('clickOption')
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
      onFilter (filterValue) {
        if (this.filterTimeout) clearTimeout(this.filterTimeout)
        this.filterTimeout = setTimeout(() => {
          this.$refs.options.scrollTop = 0
          this.pageNum = 0
          this.filter = filterValue
        }, 100)
      },
      clean () {
        this.chosenList = []
        this.$set(this, 'checkedMap', {})
        this.$emit('input', this.chosenList)
      }
    },
    render (h) {
      return (
        <div class="zg-select" v-click-outside={this.onClickOutside}>
          {(() => {
            if (this.theme === 'normal') {
              return (
                <div ref="handle" class={this.handleClass}
                     style={this.handleStyle}
                     onClick={this.onClickHandle}>
                  <span v-show={this.resultLabel} class="zg-select-label">{this.$slots.default || this.resultLabel}</span>
                  <span v-show={!this.resultLabel} class="zgselect-label zg-placeholder">{this.placeholder}</span>
                  <i class={this.arrowIcon}></i>
                </div>
              )
            } else {
              return (
                <div ref="handle" class={this.handleClass}
                     style={this.handleStyle}
                     onClick={this.onClickHandle}
                     slot="handle">
                  <span class="zg-label">
                    <span v-show={this.resultLabel} class="zg-value">{this.$slots.default || this.resultLabel}</span>
                    <span v-show={!this.resultLabel} class="zgselect-label zg-placeholder">{this.placeholder}</span>
                    <span class="zg-count" v-show={this.chosenList.length > 1}>({this.chosenList.length})</span>
                  </span>
                  <i class={this.arrowIcon}></i>
                </div>
              )
            }
          })()}

          <transition enter-active-class="animated slideInDown">
            <ul v-show={this.showOptions} class="zg-drop-panel" ref="dropPanel">
              <div class="zg-fixed">
                {(() => {
                  if (this.filterOption) {
                    return (
                      <zg-input icon="zgicon-search"
                                width="100%"
                                class={this.filterClass}
                                clear-able
                                ref="optionFilter" onInput={this.onFilter}></zg-input>
                    )
                  }
                })()}
                <li v-show={this.multiple && this.chosenList.length && this.clearAble} class="zg-clear">
                  <a href="javascript:void(0)" onClick={this.clean}>清空</a>
                </li>
              </div>

              <div class="zg-content" ref="options" onScroll={this.onScroll}>
                {this.renderStore.map(option => {
                  if (this.childrenField) {
                    return (
                      <zg-opt-group key={option[this.keyField]}
                                    store={option[this.childrenField]}
                                    showMap={this.showMap}
                                    groupData={option}
                                    checkedMap={this.checkedMap}
                                    disableOptions={this.disableOptions}
                                    keyField={this.keyField}
                                    labelField={this.labelField}
                                    multiple={this.multiple}
                                    onClick={this.onClickOption}
                                    scopedSlots={{
                                      default: this.$scopedSlots.default,
                                      header: this.$scopedSlots.header
                                    }}
                      ></zg-opt-group>
                    )
                  } else {
                    return (
                      <zg-option key={option[this.keyField]}
                                 checked={this.checkedMap[option[this.keyField]]}
                                 disable={this.disableOptions.indexOf(option[this.keyField]) > -1}
                                 data={option}
                                 labelField={this.labelField}
                                 multiple={this.multiple}
                                 onClick={this.onClickOption}
                                 scopedSlots={{default: this.$scopedSlots.default}}></zg-option>
                    )
                  }
                })}
                <li v-show={this.noData} class="zg-option zg-error">
                  {this.noDataText}
                </li>
                <li v-show={this.noMatch} class="zg-option zg-error">
                  {this.noMatchText}
                </li>
              </div>
            </ul>
          </transition>
          <div style="display: none">{this.showMap.count}</div>
        </div>
      )
    }
  }
</script>

<style lang="sass">
  @import "styles/select"
</style>
