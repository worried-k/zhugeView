<template>
  <div class="doc-panel">
    <vue-markdown :source="doc" :html="false"></vue-markdown>
  </div>
</template>
<script>
export default {
  name: 'docMarkdown',
  props: {
    doc: String
  }
}
</script>
<style lang="sass">
@import "./styles/index.sass"
</style>
