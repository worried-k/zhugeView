<template>
  <div>
    <demo-panel title="分组下拉框" jsFiddleName="Ljq8s0e9">
      <zg-select multiple filterOption labelField="label">
        <zg-opt-group v-for="(group, i) in store" :label="group.label" :key="i">
          <zg-option v-for="(option, j) in group.children" :key="j" :value="option"></zg-option>
        </zg-opt-group>
      </zg-select>
    </demo-panel>
  </div>
</template>

<script>
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgSelect from '../../../../src/components/selector/select.vue'
  import ZgOptGroup from '../../../../src/components/selector/optGroup.vue'
  import ZgOption from '../../../../src/components/selector/option.vue'

  export default {
    components: {
      ZgOption,
      ZgOptGroup,
      ZgSelect,
      DemoPanel},
    name: 'groupSelect',
    data () {
      return {
        store: (() => {
          let result = []

          for (let i = 0; i < 5; i++) {
            let item = {
              label: 'group' + i,
              children: []
            }

            for (let j = 0; j < 10; j++) {
              item.children.push({
                label: `option${i}-${j}`
              })
            }

            result.push(item)
          }

          return result
        })()
      }
    }
  }
</script>

<style lang="sass">

</style>
