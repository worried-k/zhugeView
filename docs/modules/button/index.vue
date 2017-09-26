<template>
  <div>
    <demo-panel
      title="基本用法"
      subtitle="常规主题的按钮组件"
      jsFiddleName='qp731r4o'>
      <form action="#button">
        <zg-button
          @click="onClick"
          nativeType="button">normal</zg-button>
        <zg-button
          nativeType="submit">submit</zg-button>
          <zg-button
          nativeType="reset">reset</zg-button>
        <zg-button
          @click="onClick"
          type="primary">primary</zg-button>
        <zg-button
          @click="onClick"
          type="danger">danger</zg-button>
        <zg-button
          @click="onClick"
          type="secondary">secondary</zg-button>
        <zg-button
          @click="onClick"
          type="success">success</zg-button>
      </form>
    </demo-panel>

    <demo-panel
      title="border button"
      subtitle="主题为border的按钮组件"
      jsFiddleName='s88yrxx7'>
      <form>
        <zg-button
          @click="onClick"
          theme="border">normal</zg-button>
        <zg-button
          type="primary"
          @click="onClick"
          theme="border">primary</zg-button>
        <zg-button
          type="danger"
          @click="onClick"
          theme="border">danger</zg-button>
      </form>
    </demo-panel>

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
      jsFiddleName='pn991qk2'>
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
      jsFiddleName='pn991qk2'>
      <zg-button theme="border" icon="add" @click="onClick" size="small"></zg-button>
      <zg-button theme="border" icon="add" @click="onClick"></zg-button>
      <zg-button theme="border" icon="add" @click="onClick">add</zg-button>
      <zg-button icon="add" @click="onClick" type="primary">add</zg-button>
      <zg-button theme="border" icon="add" @click="onClick" :disabled="true">add</zg-button>
      <zg-button iconClass="icon-add" @click="onClick" type="primary">icon-add</zg-button>
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

  </div>
</template>
<script>

export default {
  name: 'buttonDemo',
  methods: {
    onClick (e) {
      console.log(e.target)
    }
  }
}
</script>
