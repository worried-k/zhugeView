<template>
  <div>
    <demo-panel subtitle="tag模式">
      <zg-selector keyField="id"
                   :store="store"
                   placeholder="单选"
                   labelField="label"
                   filterOption
                   icon-field="icon"
                   theme="tag"
                   multiple
                   :maxWidth="450"
                   v-model="result">
      </zg-selector>
    </demo-panel>
  </div>
</template>

<script>
  export default {
    name: 'tagSelector',
    data () {
      return {
        store: (() => {
          let store = []
          for (let i = 0; i < 20; i++) {
            store.push({
              id: i,
              label: 'option_' + i,
              icon: 'zgicon-edit'
            })
          }
          return store
        })(),
        result: []
      }
    }
  }
</script>

<style lang="sass">

</style>
