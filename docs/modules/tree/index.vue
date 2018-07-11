<template>
  <div>
    <zg-tree :dataList="list"></zg-tree>
  </div>
</template>

<script>
import json from './tree.json'
export default {
  name: 'zgTreeDemo',
  data () {
    return {
      list: json.behavior_datas
    }
  }
}
</script>

<style lang="sass">

</style>
