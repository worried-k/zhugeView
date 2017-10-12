<template>
  <span class="zg-checkbox" :class="clazz" @click.stop="onChange">
    <span class="zg-box">
      <i v-if="checked" class="icon-check_small"></i>
    </span>
    <span>{{label}}</span>
  </span>
</template>

<script>
  export default {
    name: 'zgCheckbox',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      label: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        checked: this.value
      }
    },
    watch: {
      value: function (value) {
        this.checked = value
      }
    },
    computed: {
      clazz () {
        let clazz = []
        if (this.checked) clazz.push('checked')
        return clazz.join(' ')
      }
    },
    methods: {
      onChange () {
        this.checked = !this.checked
        this.$emit('input', this.checked)
        this.$emit('change', this.checked)
      }
    }
  }
</script>

<style lang="sass">
@import "styles/checkbox"
</style>
