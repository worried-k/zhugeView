<template>
  <div>
    <demo-panel title="bigSelect 大数据下拉框" :subtitle="subTitle" jsFiddleName="26xt4dLg">
      <zg-big-select keyField="id" v-model="value" :store="store" labelField="label" filterOption multiple></zg-big-select>
      {{value}}
    </demo-panel>
  </div>
</template>

<script>
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgBigSelect from '../../../../src/components/selector/bigSelect.vue'

  export default {
    components: {
      ZgBigSelect,
      DemoPanel},
    name: 'normalBigSelect',
    data () {
      return {
        subTitle: '适用于大数据场景，并继承select组件所有的特性。不过不支持选项自定义展示',
        store: (() => {
          let result = []
          for (let i = 0; i < 10000; i++) {
            result.push({
              label: 'option' + i,
              id: i
            })
          }
          return result
        })(),
        value: [{id: 2}, {id: 5}]
      }
    }
  }
</script>

<style lang="sass">

</style>
