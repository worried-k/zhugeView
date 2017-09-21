<template>
  <div>
    <demo-panel
      title="基本用法"
      subtitle="form表单中的按钮组件"
      jsFiddleUrl='//jsfiddle.net/worriedk/uf10feqk/1/embedded/js,html/'>
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
      title="基本用法"
      subtitle="form表单中的按钮组件"
      jsFiddleUrl='//jsfiddle.net/worriedk/1ggct2gq/embedded/js,html/'>
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
      title="基本用法"
      subtitle="form表单中的按钮组件"
      jsFiddleUrl='//jsfiddle.net/worriedk/1ggct2gq/embedded/js,html/'>
      <zg-button size="small" nativeType="button">small</zg-button>
      <zg-button nativeType="button">normal</zg-button>
      <zg-button size="large" nativeType="button">large</zg-button>
    </demo-panel>

    <demo-panel
      title="基本用法"
      subtitle="form表单中的按钮组件"
      jsFiddleUrl='//jsfiddle.net/worriedk/1ggct2gq/embedded/js,html/'>
      <zg-button-group
        btnWidth="200px"
        :data="['1',{value: '2', icon: 'add'}]">
      </zg-button-group>
    </demo-panel>

    <demo-panel
      title="基本用法"
      subtitle="form表单中的按钮组件"
      jsFiddleUrl='//jsfiddle.net/worriedk/1ggct2gq/embedded/js,html/'>
      <zg-button-group
        :data="['1',{value: '2', icon: 'add', activated: true}, '3']">
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
