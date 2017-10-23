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
             v-model="chosen"
             @clear="onClear"
             @bottom="onBottom">
    <template v-for="item in showList">
      <zg-opt-group v-if="childrenField && showMap[item[keyField]]" :label="item[labelField]">
        <span v-html="customHeader(item)" v-if="customHeader" slot="header"></span>
        <zg-option v-for="child in item[childrenField]"
                   v-if="showMap[child[keyField]]"
                   :key="child[keyField]"
                   :value="child"
                   :defaultChecked="child.checked"
                   @check="onClickOption">
        </zg-option>
      </zg-opt-group>
      <zg-option v-else-if="!childrenField"
                 :key="item[keyField]"
                 :value="item"
                 :defaultChecked="item.checked"
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
      /**
       * @tip 组件使用过程中，会在原始数据上增加_show属性
       */
      store: {
        type: Array,
        default () {
          return []
        }
      },
      width: {
        type: Number,
        default: 150
      },
      labelField: {
        type: String,
        required: true
      },
      keyField: {
        type: String,
        required: true
      },
      childrenField: {
        type: String
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      noMatchText: {
        type: String,
        default: '无匹配数据'
      },
      noDataText: {
        type: String,
        default: '暂无数据'
      },
      clearAble: {
        type: Boolean,
        default: true
      },
      filterOption: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      pageSize: {
        type: Number,
        default: 20
      },
      customHeader: {
        type: Function
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
        showMap: {}
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
        } else {
          this.store.forEach((item, i) => {
            if (list.length >= count) return
            if (!this.filterValue ||
              (this.filterValue && item[this.labelField].indexOf(this.filterValue) > -1)) {
              list.push(item)
            }
          })
        }
        return list
      }
    },
    methods: {
      onFilter (value) {
        this.pageNum = 0
        this.filterValue = value
      },
      onClear () {
        if (!this.childrenField) {
          this.store.forEach(item => {
            if (item.checked) item.checked = false
          })
        } else {
          this.store.forEach(item => {
            item[this.childrenField].forEach(child => {
              if (child.checked) child.checked = false
            })
          })
        }
      },
      onBottom () {
        let count = (this.pageNum + 1) * this.pageSize
        if (this.totalCount > count) {
          this.pageNum++
        }
      },
      onClickOption (option, checked) {
        this.$set(option, 'checked', checked)
        this.$emit('input', this.chosen)
      }
    }
  }
</script>

<style lang="sass">

</style>
