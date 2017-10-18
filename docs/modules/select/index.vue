<template>
  <div>
    <demo-panel
      title="普通下拉框"
      subtitle="subtitle">

      <zg-checkbox label="勾选项"></zg-checkbox>

      <zg-select placeholder="多选"
                 multiple
                 :width="100"
                 filter-option
                 v-model="value1"
                 theme="noborder"
                 @bottom="onBottom"
                 label-field="label">
        <!--<zg-option :value="{label: 'disable', value: '2939'}" defaultChecked></zg-option>-->
        <zg-option v-for="(item, i) in select1" :value="item" :key="i"></zg-option>
      </zg-select>

      <zg-select placeholder="单选" label-field="label">
        <zg-option v-for="(item, i) in select1" :value="item" :key="i"></zg-option>
      </zg-select>

      <zg-select placeholder="单选" label-field="label">
        <i slot="handle" class="">dd</i>
        <!--<zg-option v-for="(item, i) in select1" :value="item" :key="i"></zg-option>-->
      </zg-select>

      <zg-select placeholder="多选"
                 filter-option
                 multiple
                 label-field="label">
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
        select1: [],
        value1: [],

        bigSelect: json[1].campaigns[4].adgroups
      }
      return data
    },
    mounted () {
      setTimeout(() => {
        this.select1 = (() => {
          let data = []
          for (let i = 0; i < 10; i++) {
            data.push({
              label: `label2121212121@!@121212${i}`,
              value: i
            })
          }
          return data
        })()
      }, 2000)
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
