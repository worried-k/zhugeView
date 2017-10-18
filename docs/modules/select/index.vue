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
    </demo-panel>
  </div>
</template>

<script>

  import ZgOption from "../../../src/components/selector/option.vue";
  import ZgCheckbox from "../../../src/components/checkbox/checkbox.vue";
  import json from './test.json'
  import ZgBigSelect from '../../../src/components/selector/bigSelect.vue'
  console.log(json.datas)
  export default {
    components: {
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
        value1: []
      }
      return data
    },
    methods: {
      onFilter (value) {
        console.log(value)
      },
      onBottom () {
        console.log('到底了')
      }
    }
  }
</script>

<style lang="sass">

</style>
