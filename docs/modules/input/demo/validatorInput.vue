<template>
  <div>
    <demo-panel subtitle="带有校验功能">
      <zg-input :validator="validator"
                v-model="val">
        <template slot="tooltip">{{message}}</template>
      </zg-input>
      <span style="margin-left: 15px">: {{val}}</span>
      <br>
      {{message}}
    </demo-panel>
  </div>
</template>

<script>
  import ZgInput from '../../../../src/components/input/input'

  export default {
    components: {ZgInput},
    name: 'validatorInput',
    data () {
      return {
        val: '',
        message: '默认提示信息'
      }
    },
    methods: {
      validator () {
        if (!this.val) {
          this.message = '输入框内容不能为空'
        } else if (/\d/.test(this.val)) {
          this.message = '输入内容不能有数字'
        }
        return this.val && !/\d/.test(this.val)
      }
    }
  }
</script>

<style lang="sass">

</style>
