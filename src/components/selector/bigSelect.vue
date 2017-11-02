<template>
  <zg-select :multiple="multiple"
             :filterCallback="onFilter"
             :labelField="labelField"
             :filterOption="filterOption"
             :clearAble="clearAble"
             :placeholder="placeholder"
             :noMatchText="noMatchText"
             :noDataText="noDataText"
             :width="width"
             :theme="theme"
             ref="select"
             v-model="chosen"
             @clear="onClear"
             @bottom="onBottom"
             @clickHandle="onClickHandle">
    <template v-for="item in showList">
      <zg-opt-group v-if="childrenField && showMap[item[keyField]]" :label="item[labelField]">
        <span v-html="customHeader(item)" v-if="customHeader" slot="header"></span>
        <zg-option v-for="child in item[childrenField]"
                   v-if="showMap[child[keyField]]"
                   :value="child"
                   :key="child[keyField] + randomId"
                   :defaultChecked="checkedMap[child[keyField]]"
                   @check="onClickOption">
        </zg-option>
      </zg-opt-group>
      <zg-option v-else-if="!childrenField"
                 :key="item[keyField] + randomId"
                 :value="item"
                 :defaultChecked="checkedMap[item[keyField]]"
                 @check="onClickOption">
      </zg-option>
    </template>
  </zg-select>
</template>

<script>
  import ZgSelect from './select.vue'
  import ZgOption from './option.vue'
  import ZgOptGroup from './optGroup.vue'
//  import {util} from '../../utils/index'
  export default {
    components: {
      ZgOptGroup,
      ZgOption,
      ZgSelect},
    name: 'ZgBigSelect',
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
       * @default []
       */
      store: {
        type: Array,
        required: true,
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
       */
      value: {
        type: [Array, String, Object]
      },
      /**
       * @description 同select
       */
      width: {
        type: Number,
        default: 150
      },
      /**
       * @description 同select
       */
      labelField: {
        type: String,
        required: true
      },
      /**
       * @description 同select
       */
      placeholder: {
        type: String,
        default: '请选择'
      },
      /**
       * @description 同select
       */
      noMatchText: {
        type: String,
        default: '无匹配数据'
      },
      /**
       * @description 同select
       */
      noDataText: {
        type: String,
        default: '暂无数据'
      },
      /**
       * @description 同select
       */
      clearAble: {
        type: Boolean,
        default: true
      },
      /**
       * @description 同select
       */
      filterOption: {
        type: Boolean,
        default: false
      },
      /**
       * @description 同select
       */
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data () {
      let data = {
        pageNum: 0,
        filterValue: '',
        chosen: [],
        /**
         * {
         *  [key]: boolean
         * }
         */
        showMap: {},
        checkedMap: {},
        randomId: Math.random().toString().split('.')[1]
      }
      return data
    },
    computed: {
      currentCount () {
        return (this.pageNum + 1) * this.pageSize
      },
      totalCount () {
        const filterValue = this.filterValue
        if (this.childrenField) {
          let count = 0
          if (filterValue) {
            this.store.forEach(item => {
              item[this.childrenField].forEach(child => {
                if (child[this.labelField].indexOf(filterValue) > -1) count++
              })
            })
          } else {
            this.store.forEach(item => {
              count += item[this.childrenField].length
            })
          }
          return count
        } else {
          if (filterValue) {
            let count = 0
            this.store.forEach(item => {
              if (item[this.labelField].indexOf(filterValue) > -1) count++
            })
            return count
          }
          return this.store.length
        }
      },
      showList () {
        let list = []
        let count = this.currentCount
        let resultCount = 0
        this.showMap = {}
        if (this.childrenField) {
          let isBreak = false
          this.store.forEach(item => {
            if (isBreak) return
//            分组默认不显示
            this.$set(this.showMap, item[this.keyField], false)

            item[this.childrenField].forEach(child => {
              if (resultCount >= count) {
                isBreak = true
                return
              }
//              控制子选项的显示隐藏
              let flag = false
              if (this.filterValue) {
                let label = child[this.labelField]
                flag = label.indexOf(this.filterValue) > -1
                if (flag) {
                  this.$set(this.showMap, child[this.keyField], true)
                } else {
                  resultCount--
                }
              } else {
                flag = resultCount <= count
                this.$set(this.showMap, child[this.keyField], flag)
              }

              // 如果分组内，有选项显示，则显示该分组
              if (flag) {
                this.$set(this.showMap, item[this.keyField], true)
              }
              resultCount++
            })

            list.push(item)
          })

          if (this.filterValue) this.$refs.select.noMatch = resultCount === 0
        } else {
          this.store.forEach((item, i) => {
            if (list.length >= count) return
            if (!this.filterValue ||
              (this.filterValue && item[this.labelField].indexOf(this.filterValue) > -1)) {
              list.push(item)
            }
          })
          if (this.filterValue) {
            this.$refs.select.noMatch = list.length === 0
          }
        }
        return list
      }
    },
    watch: {
      store () {
        if (!this.remote) {
          this.chosen = []
          this.randomId = Math.random().toString().split('.')[1]
          this.$emit('input', this.chosen)
          this.$set(this, 'checkedMap', {})
        } else {
          this.$refs.select.noData = this.store.length === 0
          this.$refs.select.noMatch = false
        }
      }
    },
    methods: {
      onClickHandle () {
        this.onFilter('')
      },
      onFilter (value) {
        if (this.remote) {
          this.remote(value)
        }
        this.pageNum = 0
        this.filterValue = value
      },
      onClear () {
        this.$set(this, 'checkedMap', {})
      },
      onBottom () {
        let count = (this.pageNum + 1) * this.pageSize
        if (this.totalCount > count) {
          this.pageNum++
        }
      },
      onClickOption (option, checked) {
        if (!this.multiple) {
          this.$set(this, 'checkedMap', {})
        }
        this.$set(this.checkedMap, option[this.keyField], checked)
        this.$emit('input', this.chosen)
        this.$emit('change', this.chosen)
      }
    }
  }
</script>

<style lang="sass">

</style>
