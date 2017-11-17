<template>
  <div>
    <normal-button></normal-button>
    <border-button></border-button>

    <demo-panel
      title="size属性"
      subtitle="通过调整按钮的padding值来定义的按钮大小样式"
      jsFiddleName='pn991qk2'>
      <zg-button theme="border" size="small" nativeType="button">small</zg-button>
      <zg-button theme="border" nativeType="button">normal</zg-button>
      <zg-button theme="border" size="large" nativeType="button">large</zg-button>
    </demo-panel>

    <demo-panel
      title="diabled属性"
      subtitle="设置button为diabled状态"
      jsFiddleName='7j9pmnqz'>
      <zg-button
        :disabled="true"
        @click="onClick"
        type="success">normal button</zg-button>
      <zg-button
        theme="border"
        :disabled="true"
        @click="onClick"
        type="success">border button</zg-button>
    </demo-panel>

    <demo-panel
      title="icon属性"
      subtitle="为button增加 组件内置 或 自定义 的icon图标"
      jsFiddleName='pa2ckgu3'>
      <zg-button theme="border" icon="add" @click="onClick" size="small"></zg-button>
      <zg-button theme="border" icon="add" @click="onClick"></zg-button>
      <zg-button theme="border" icon="add" @click="onClick">add</zg-button>
      <zg-button icon="add" @click="onClick" type="primary">add</zg-button>
      <zg-button theme="border" icon="add" @click="onClick" :disabled="true">add</zg-button>
      <zg-button iconClass="zgicon-add" @click="onClick" type="primary">icon-add</zg-button>
    </demo-panel>

    <demo-panel
      title="按钮组"
      subtitle="可设定默认选中状态的、等值宽度按钮组集合"
      jsFiddleName='6o4247dp'>
      <zg-button-group
        :data="['1',{value: '2', icon: 'add', activated: true}, '3']">
      </zg-button-group>
      <zg-button-group
        btnWidth="200px"
        :data="['1',{value: '2', icon: 'add'}]">
      </zg-button-group>
    </demo-panel>
    <doc-markdown :api="json.button" title="button"></doc-markdown>
    <doc-markdown :api="json.btnGroup" title="buttonGroup"></doc-markdown>
  </div>
</template>
<script>
import buttonJson from './button.json'
import btnGroupJson from '../buttonGroup/buttonGroup.json'
import NormalButton from './demo/normalButton.vue'
import BorderButton from './demo/borderButton.vue'
export default {
  components: {
    BorderButton,
    NormalButton},
  name: 'buttonDemo',
  data () {
    return {
      json: {
        button: buttonJson,
        btnGroup: btnGroupJson
      }
    }
  },
  methods: {
    onClick (e) {
      console.log(e.target)
    }
  }
}
</script>
