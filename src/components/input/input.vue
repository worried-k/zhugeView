<template>
  <span class="zg-input" :style="style" @click="onClick">
    <i class="zg-input-icon" :class="icon"></i>
    <input ref="input"
           type=":type"
           class="zg-input-input"
           :style="inputStyle"
           :placeholder="placeholder"
           v-model="inputValue"
    />
    <i v-if="clearAble && inputValue"
       class="zg-input-clear icon-delete-little1"
       @click="onClear"
    ></i>
  </span>
</template>

<script>
  export default {
    name: 'ZgInput',
    props: {
      value: {
        type: String
      },
      placeholder: {
        type: String
      },
      icon: {
        type: String
      },
      type: {
        type: String,
        default: 'text',
        validator (value) {
          return ['text', 'password'].indexOf(value) > -1
        }
      },
      width: {
        type: Number,
        default: 150
      },
      clearAble: {
        type: Boolean,
        default: false
      },
      autoFocus: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        inputValue: this.value
      }
    },
    mounted () {
      this.autoFocus && this.$refs.input.focus()
    },
    computed: {
      style () {
        return {
          width: this.width + 'px'
        }
      },
      inputStyle () {
        return {
          'padding-left': this.icon ? '25px' : '10px',
          'padding-right': this.clearAble ? '25px' : '10px'
        }
      }
    },
    watch: {
      inputValue () {
        this.$emit('input', this.inputValue)
      }
    },
    methods: {
      onClick () {
        this.$refs.input.focus()
      },
      onClear () {
        this.inputValue = ''
      }
    }
  }
</script>

<style lang="sass">
@import "styles/input"
</style>
