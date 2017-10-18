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
    <zg-option v-for="(item, i) in showList"
               :key="item[keyField]"
               :value="item"
               :defaultChecked="item.checked"
               @check="onClickOption">
    </zg-option>
  </zg-select>
</template>

<script>
  import ZgSelect from './select.vue'
  import ZgOption from './option.vue'

  export default {
    components: {
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
        let i = 0
        let count = (this.pageNum + 1) * this.pageSize
        for (i = 0; i < this.store.length && list.length < count; i++) {
          let item = this.store[i]
          if (!this.filterValue ||
            (this.filterValue && item[this.labelField].indexOf(this.filterValue) > -1)) {
            list.push(item)
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
      }
    }
  }
</script>

<style lang="sass">

</style>
