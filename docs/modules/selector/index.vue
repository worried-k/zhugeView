<template>
  <div>
    <demo-panel
      title="普通下拉框"
      subtitle="subtitle">
      <zg-select placeholder="多选"
                 multiple
                 :width="100"
                 filter-option
                 v-model="value1"
                 theme="noborder"
                 @bottom="onBottom"
                 label-field="text">
        <zg-option v-for="(item, i) in select1" :value="item" :key="i"></zg-option>
      </zg-select>

      <zg-select placeholder="单选" label-field="text">
        <zg-option v-for="(item, i) in select1" :value="item" :key="i"></zg-option>
      </zg-select>

      <zg-select placeholder="多选"
                 filter-option
                 multiple
                 label-field="text">
        <zg-opt-group label="城市">
          <zg-option v-for="(item, i) in select1" :value="item" :key="i"></zg-option>
        </zg-opt-group>
      </zg-select>
    </demo-panel>
    <demo-panel
      title="大数据下拉框"
      subtitle="联动下拉框示例">

      <zg-big-select
        placeholder="无分组"
        multiple
        :store="big"
        filterOption
        labelField="text"
        theme="noborder"
        keyField="text"></zg-big-select>

      <zg-big-select
        placeholder="关键词"
        multiple
        :store="adgroups"
        :customHeader="customHeader"
        childrenField="keywords"
        filterOption
        labelField="text"
        theme="noborder"
        keyField="id"></zg-big-select>

      <zg-big-select
        placeholder="公司"
        multiple
        :store="campaigns"
        childrenField="campaigns"
        filterOption
        labelField="text"
        theme="noborder"
        keyField="id"></zg-big-select>

      <zg-big-select keyField="id"
                     labelField="text"
                     placeholder="es搜索"
                     filterOption
                     :remote="onRemote"
                     :store="esStore"></zg-big-select>
    </demo-panel>

    <doc-markdown :api="api.select" title="select"></doc-markdown>
    <doc-markdown :api="api.bigSelect" title="bigSelect"></doc-markdown>
    <doc-markdown :api="api.option" title="option"></doc-markdown>
    <doc-markdown :api="api.optGroup" title="optionGroup"></doc-markdown>
  </div>
</template>

<script>

  import ZgOption from "../../../src/components/selector/option.vue";
  import ZgCheckbox from "../../../src/components/checkbox/checkbox.vue";
  import json from './test.json'
  import ZgBigSelect from '../../../src/components/selector/bigSelect.vue'
  import selectApi from './select.json'
  import DocMarkdown from '../../components/docMarkdown/index.vue'
  import optionJson from './option.json'
  import bigSelectJson from './bigSelect.json'
  import optGroupJson from './optGroup.json'

  export default {
    components: {
      DocMarkdown,
      ZgBigSelect,
      ZgCheckbox,
      ZgOption},
    name: 'index',
    data() {
      let adgroups = []
      json.datas.forEach(account => {
        account.campaigns.forEach(campaign => {
          adgroups = adgroups.concat(campaign.adgroups)
        })
      })
      let campaigns = [json.datas[1]]
      campaigns[0].text = campaigns[0].account

      let big = []
      for (let i = 0; i < 10000; i++) {
        big.push({
          text: i + 'opt'
        })
      }
      let data = {
        select1: json.datas[0].campaigns,
        campaigns,
        adgroups,
        big,
        value1: [],
        esStore: [],
        api: {
          select: selectApi,
          option: optionJson,
          bigSelect: bigSelectJson,
          optGroup: optGroupJson
        }
      }
      return data
    },
    methods: {
      onRemote (value) {
        this.esStore = []
        this.adgroups.forEach(item => {
          if (item.text.indexOf(value) > -1 && this.esStore.length < 20) {
            this.esStore.push(item)
          }
        })
      },
      onFilter (value) {
        console.log(value)
      },
      onBottom () {
        console.log('到底了')
      },
      customHeader (data) {
        console.log(data)
        return '<a href="javascript:void(0)">title</a>'
      }
    }
  }
</script>

<style lang="sass">

</style>
