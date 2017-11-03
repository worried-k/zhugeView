<template>
  <li class="zg-option" :class="className" @click="onClick">
    <slot v-if="!multiple" :data="data" :active="active">
      <span>{{data[labelField]}}</span>
    </slot>

    <zg-checkbox v-else @change="onClick" v-model="active" :disable="disable">
      <slot :data="data" :active="active">
        <span>{{data[labelField]}}</span>
      </slot>
    </zg-checkbox>
  </li>
</template>

<script>
  import ZgCheckbox from '../checkbox/checkbox.vue'
  import emitter from '../../mixins/emitter'
//  import {util} from '../../utils/index'
  export default {
    components: {ZgCheckbox},
    name: 'ZgOption',
    mixins: [emitter],
    props: {
      /**
       * @description 选中状态
       */
      checked: {
        type: Boolean,
        default: false
      },
      /**
       * @description 选项值
       */
      data: {
        type: Object,
        required: true
      },
      /**
       * @description data中用于展示的字段名称
       */
      labelField: {
        type: String,
        required: true
      },
      /**
       * @description 禁用选项
       */
      disable: {
        type: Boolean,
        default: false
      },
      /**
       * @description 多选模式
       */
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        active: this.checked
      }
    },
    computed: {
      className () {
        return {
          disable: this.disable,
          active: this.active && !this.multiple
        }
      }
    },
    watch: {
      checked (checked) {
        this.active = checked
      }
    },
    methods: {
      onClick () {
        if (this.disable) return
        if (this.multiple) {
          this.$emit('click', this.active, this.data)
        } else {
          this.active = !this.active
          this.$emit('click', this.active, this.data)
        }
      }
    }
  }
</script>

<style lang="sass">
@import "styles/option"
</style>
