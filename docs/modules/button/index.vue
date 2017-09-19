<template>
  <div>
    <form v-for="theme in themes" :key="theme">
      <p>{{theme}} button</p>
      <zg-button
        nativeType="button"
        :theme="theme">normal</zg-button>
      <zg-button
        nativeType="submit"
        :theme="theme">submit</zg-button>
        <zg-button
        nativeType="reset"
        :theme="theme">reset</zg-button>
      <zg-button
        type="primary"
        :theme="theme">primary</zg-button>
      <zg-button
        type="danger"
        :theme="theme">danger</zg-button>
      <zg-button
        type="secondary"
        :theme="theme">secondary</zg-button>
      <zg-button
        type="success"
        :theme="theme">success</zg-button>
      <zg-button
        type="disabled"
        :theme="theme">disabled</zg-button>
      <zg-button
        :theme="theme"
        icon="add"
        @click="onClick"
        type="success">icon</zg-button>
      <zg-button
        :theme="theme"
        icon="adds"
        :disabled="true"
        @click="onClick"
        type="success">disabled</zg-button>
    </form>
    <p>size button</p>
    <zg-button
      size="small"
      nativeType="button">small</zg-button>
      <zg-button
      nativeType="button">normal</zg-button>
      <zg-button
      size="large"
      nativeType="button">large</zg-button>
    <p>button group</p>
    <zg-button-group>
      <zg-button
        type="danger">danger</zg-button>
      <zg-button
        type="secondary">secondary</zg-button>
      <zg-button
        type="success">success</zg-button>
    </zg-button-group>
  </div>
</template>
<script>

export default {
  name: 'buttonDemo',
  data () {
    return {
      themes: ['normal', 'border']
    }
  },
  methods: {
    onClick (e) {
      console.log(e.target)
    }
  }
}
</script>
<style lang="sass">

</style>
