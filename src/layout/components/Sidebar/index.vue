<template>
  <div>
    <div class="logo-container">
      <el-avatar shape="square" :size="44" src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">shuaizi-admin</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu';
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
