<template>
  <div id="app">
    <el-menu
      mode="horizontal"
      background-color="#011627"
      text-color="#D6DEEB"
      active-text-color="#ADDB67"
    >
      <el-menu-item index="1">
        <strong>VUE CRUD</strong>
      </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>
