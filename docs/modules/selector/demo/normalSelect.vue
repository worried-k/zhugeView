<template>
  <div>
    <demo-panel title="普通下拉框" :subtitle="description" jsFiddleName="e92d1w67">
      <zg-select v-model="area" placeholder="地域" theme="noborder">
        <zg-option v-for="(item, i) in areaList" :value="item" :key="i"></zg-option>
      </zg-select>
      <span style="margin-right: 20px">{{area && area[0]}}</span>

      <zg-select v-model="sex" placeholder="性别" labelField="label">
        <zg-option v-for="(item, i) in sexList" :value="item" :key="i"></zg-option>
      </zg-select>
      <span>{{sex && sex[0].label}}</span>
    </demo-panel>
  </div>
</template>

<script>
  import ZgSelect from '../../../../src/components/selector/select.vue'
  import ZgOption from '../../../../src/components/selector/option.vue'
  import DemoPanel from '../../../components/demoPanel/index.vue'

  export default {
    components: {
      DemoPanel,
      ZgOption,
      ZgSelect},
    name: 'normalSelect',
    data () {
      return {
        description: '数据源可以是对象或字符串数组,下拉组件支持无边框的主题样式',
        sexList: [
          {
            label: '女',
            value: 0
          },
          {
            label: '男',
            value: 1
          }
        ],
        areaList: [
          '北京',
          '河南',
          '河北'
        ],
        sex: null,
        area: null
      }
    }
  }
</script>

<style lang="sass">

</style>
