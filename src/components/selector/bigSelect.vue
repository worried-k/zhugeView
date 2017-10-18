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
             @bottom="onBottom">
    <template v-for="item in showList">
      <zg-opt-group v-if="childrenField && item._show" :label="item[labelField]">
        <zg-option v-for="option in item[childrenField]"
                   v-if="option._show"
                   :key="option[keyField]"
                   :value="option"
                   :defaultChecked="option.checked"
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
        default: 10
      }
    },
    data () {
      let data = {
        pageNum: 0,
        filterValue: '',
        chosen: []
      }
      return data
    },
    computed: {
      showList () {
        let list = []
        let count = (this.pageNum + 1) * this.pageSize
        let resultCount = 0
        if (this.childrenField) {
          for (let i = 0; i < this.store.length; i++) {
            let item = this.store[i]
//            分组默认不显示
            this.$set(item, '_show', false)
            for (let j = 0; j < item[this.childrenField].length; j++) {
              let child = item[this.childrenField][j]
//              控制子选项的显示隐藏
              let flag = false
              if (!this.filterValue) {
                flag = resultCount <= count
                this.$set(child, '_show', flag)
              } else {
                flag = child[this.labelField].indexOf(this.filterValue) > -1 && resultCount <= count
                this.$set(child, '_show', flag)
              }
              if (flag) {
                this.$set(item, '_show', true)
              }
              resultCount++
            }
            list.push(item)
          }
        } else {
          let i = 0
          for (i; i < this.store.length && list.length < count; i++) {
            let item = this.store[i]
            if (!this.filterValue ||
              (this.filterValue && item[this.labelField].indexOf(this.filterValue) > -1)) {
              list.push(item)
            }
          }
        }
        return list
      }
    },
    methods: {
      onFilter (value) {
        this.pageNum = 0
        this.filterValue = value
      },
      onBottom () {
        let count = (this.pageNum + 1) * this.pageSize
        if (this.store.length > count) this.pageNum++
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
