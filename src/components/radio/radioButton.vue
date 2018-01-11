<template>
  <div class="zg-radio-button">
    <zg-button v-for="item in store"
               :class="{'zg-checked': checked === item}"
               :key="item.value"
               :theme="theme"
               :size="size"
               :type="type"
               @click="onClickItem(item)"
               :icon="item.icon">
      <slot :data="item">
        {{item.label}}
      </slot>
    </zg-button>
  </div>
</template>

<script>
  import ZgButton from '../button/button'

  export default {
    components: {ZgButton},
    name: 'zgRadioButton',
    props: {
      /**
       * @description value
       */
      value: null,
      /**
       * @description radio组数据源
       * @tip 组内数据项需要为对象
       * @default []
       */
      store: {
        type: Array,
        default () {
          // 结构为：{value: '', label: '', disable: false, icon: ''}
          return []
        }
      },
      /**
       * @description 可选值为：normal、primary、danger、secondary、success
       */
      type: {
        type: String,
        default: 'normal',
        validator (value) {
          let rules = ['normal', 'primary', 'danger', 'secondary', 'warning', 'success']
          return rules.includes(value)
        }
      },
      /**
       * @description 可选值为：small、normal、large
       */
      size: {
        type: String,
        default: 'normal',
        validator (value) {
          return ['small', 'normal', 'large'].includes(value)
        }
      },
      /**
       * @description 主题样式：normal、border
       */
      theme: {
        type: String,
        default: 'normal',
        validator (value) {
          return ['normal', 'border'].includes(value)
        }
      }
    },
    data () {
      return {
        checked: null
      }
    },
    methods: {
      onClickItem (item) {
        this.checked = item
      }
    }
  }
</script>

<style lang="sass">
@import "styles/radioButton"
</style>
