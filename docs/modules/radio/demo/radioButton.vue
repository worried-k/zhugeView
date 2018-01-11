<template>
  <div>
    <demo-panel subtitle="radioButton">
      <zg-radio-button :store="store" v-model="value" type="normal" theme="border"></zg-radio-button>
      <br>
      {{value}}
    </demo-panel>
  </div>
</template>

<script>
  import ZgRadio from '../../../../src/components/radio/radio'
  import ZgRadioButton from '../../../../src/components/radio/radioButton'

  export default {
    components: {
      ZgRadioButton,
      ZgRadio},
    name: 'radioButton',
    data () {
      return {
        value: null,
        store: [
          {
            value: 1,
            label: 'item a'
          },
          {
            value: 2,
            label: 'item b'
          },
          {
            value: 3,
            label: 'item c'
          },
          {
            value: 4,
            label: 'item d'
          }
        ]
      }
    }
  }
</script>

<style lang="sass">

</style>
