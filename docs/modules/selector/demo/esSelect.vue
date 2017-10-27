<template>
  <div>
    <demo-panel title="bigSelect 远程搜索" jsFiddleName="hmuhkjag">
      <zg-big-select keyField="id"
                     labelField="text"
                     placeholder="es搜索"
                     filterOption
                     multiple
                     :remote="onRemote"
                     :store="esStore"></zg-big-select>
    </demo-panel>
  </div>
</template>

<script>
  import DemoPanel from '../../../components/demoPanel/index.vue'

  export default {
    components: {DemoPanel},
    name: 'esSelect',
    data () {
      return {
        originStore: (() => {
          let result = []
          for (let i = 0; i < 10000; i++) {
            result.push({
              text: 'option' + i,
              id: i
            })
          }
          return result
        })(),
        esStore: []
      }
    },
    methods: {
      onRemote (value) {
        this.esStore = []
        this.originStore.forEach(item => {
          if (item.text.indexOf(value) > -1 && this.esStore.length < 20) {
            this.esStore.push(item)
          }
        })
      }
    }
  }
</script>

<style lang="sass">

</style>
