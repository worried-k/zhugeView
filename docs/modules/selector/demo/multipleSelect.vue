<template>
  <div>
    <demo-panel title="多选下拉" :subtitle="description" jsFiddleName="23pzdwsk">
      <zg-select placeholder="noborder" labelField="label" theme="noborder" multiple>
        <zg-option v-for="(item, i) in store.noborder" :value="item" :key="i"></zg-option>
      </zg-select>

      <zg-select placeholder="normal" labelField="label" multiple filterOption>
        <zg-option v-for="(item, i) in store.normal" :value="item" :key="i"></zg-option>
      </zg-select>
    </demo-panel>
  </div>
</template>

<script>
  import DemoPanel from '../../../components/demoPanel/index.vue'
  import ZgSelect from '../../../../src/components/selector/select.vue'
  import ZgOption from '../../../../src/components/selector/option.vue'

  export default {
    components: {
      ZgOption,
      ZgSelect,
      DemoPanel},
    name: 'multipleSelect',
    data () {
      return {
        description: '多选下拉框',
        store: {
          noborder: (() => {
            let result = []
            for (let i = 0; i < 40; i++) {
              result.push({
                label: 'option' + i
              })
            }
            return result
          })(),
          normal: (() => {
            let result = []
            for (let i = 0; i < 40; i++) {
              result.push({
                label: 'option' + i
              })
            }
            return result
          })(),
          clearAble: (() => {
            let result = []
            for (let i = 0; i < 40; i++) {
              result.push({
                label: 'option' + i
              })
            }
            return result
          })()
        }
      }
    }
  }
</script>

<style lang="sass">

</style>
