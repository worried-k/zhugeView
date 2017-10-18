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
        multiple
        :store="bigSelect"
        childrenField="keywords"
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

  export default {
    components: {
      ZgBigSelect,
      ZgCheckbox,
      ZgOption},
    name: 'index',
    data() {
      let data = {
        select1: json[0].campaigns,
        value1: [],

        bigSelect: json[1].campaigns[4].adgroups
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
