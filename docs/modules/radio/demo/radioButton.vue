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
  import ZgRadioButton from '../../../../src/components/button/radioButton'

  export default {
    components: {
      ZgRadioButton,
      ZgRadio},
    name: 'radioButton',
    data () {
      return {
        value: 2,
        store: [
          {
            value: 1,
            label: 'item a'
          },
          {
            value: 2,
            label: 'item b',
            disable: false,
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
    },
    mounted () {
      setTimeout(() => {
        this.value = 4
        this.store[1].disable = true
      }, 2000)
    }
  }
</script>

<style lang="sass">

</style>
