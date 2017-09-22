<template>
  <div>
    <demo-panel
      title="基本用法"
      subtitle="常规主题的按钮组件"
      jsFiddleUrl='//jsfiddle.net/worriedk/qp731r4o/embedded/js,html/'>
      <form>
        <zg-button
          nativeType="button">normal</zg-button>
        <zg-button
          nativeType="submit">submit</zg-button>
          <zg-button
          nativeType="reset">reset</zg-button>
        <zg-button
          type="primary">primary</zg-button>
        <zg-button
          type="danger">danger</zg-button>
        <zg-button
          type="secondary">secondary</zg-button>
        <zg-button
          type="success">success</zg-button>
        <zg-button
          icon="add"
          @click="onClick"
          type="success">icon</zg-button>
        <zg-button
          icon="add"
          :disabled="true"
          @click="onClick"
          type="success">disabled</zg-button>
      </form>
    </demo-panel>

    <demo-panel
      title="border button"
      subtitle="主题为border的按钮组件"
      jsFiddleUrl='//jsfiddle.net/worriedk/s88yrxx7/embedded/js,html/'>
      <form>
        <zg-button theme="border">normal</zg-button>
        <zg-button
          type="primary"
          theme="border">primary</zg-button>
        <zg-button
          type="danger"
          theme="border">danger</zg-button>
        <zg-button
          theme="border"
          icon="add"
          @click="onClick"
          type="success">icon</zg-button>
        <zg-button
          theme="border"
          icon="add"
          :disabled="true"
          @click="onClick"
          type="success">disabled</zg-button>
      </form>
    </demo-panel>

    <demo-panel
      title="size属性"
      subtitle="通过调整按钮的padding值来定义的按钮大小样式"
      jsFiddleUrl='//jsfiddle.net/worriedk/pn991qk2/embedded/js,html/'>
      <zg-button size="small" nativeType="button">small</zg-button>
      <zg-button nativeType="button">normal</zg-button>
      <zg-button size="large" nativeType="button">large</zg-button>
    </demo-panel>

    <demo-panel
      title="按钮组"
      subtitle="可设定默认选中状态的、等值宽度按钮组集合"
      jsFiddleUrl='//jsfiddle.net/worriedk/6o4247dp/embedded/js,html/'>
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
