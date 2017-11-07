<template>
  <div>
    <demo-panel title="分组下拉框" subtitle="单选">
      <zg-selector keyField="id"
                   v-model="groupValue"
                   :store="store"
                   labelField="label"
                   childrenField="children">
        <template scope="scope">
          <span>自定义展示{{scope.data.label}}</span>
        </template>
        <template slot="header" scope="scope">
          自定义header: {{scope.data.label}}
        </template>
      </zg-selector>
      <span>选中值：</span>{{groupValue}}
    </demo-panel>
    <demo-panel subtitle="多选">
      <zg-selector keyField="id"
                   :store="multipleStore"
                   childrenField="children"
                   v-model="multipleValue"
                   multiple
                   labelField="label"></zg-selector>
      <span>选中值：</span>{{multipleValue.map(item => item.label)}}
    </demo-panel>
  </div>
</template>

<script>
  import ZgSelector from '../../../../src/components/selector/selector.vue'
  import DemoPanel from '../../../components/demoPanel/index.vue'

  export default {
    components: {
      DemoPanel,
      ZgSelector},
    name: 'groupSelector',
    data () {
      return {
        store: (() => {
          let result = []

          for (let i = 0; i < 50; i++) {
            let item = {
              label: 'group' + i,
              id: i,
              children: []
            }

            for (let j = 0; j < 5; j++) {
              item.children.push({
                label: `option${i}-${j}`,
                id: `${i}-${j}`
              })
            }

            result.push(item)
          }

          return result
        })(),
        groupValue: {id: '2-4'},
        multipleStore: (() => {
          let result = []

          for (let i = 0; i < 50; i++) {
            let item = {
              label: 'group' + i,
              id: i,
              children: []
            }

            for (let j = 0; j < 5; j++) {
              item.children.push({
                label: `option${i}-${j}`,
                id: `${i}-${j}`
              })
            }

            result.push(item)
          }

          return result
        })(),
        multipleValue: [{id: '2-4'}]
      }
    },
    mounted () {
      setTimeout(() => {
        this.groupValue = {id: '1-3'}
        this.multipleValue = [{id: '1-3'}]
      }, 2000)
    }
  }
</script>

<style lang="sass">

</style>
