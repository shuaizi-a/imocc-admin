<template>
  <div class="navbar">
    <!-- 切换侧边栏状态 -->
    <hamburger class="hamburger-container" />
    <!-- 动态面包屑 -->
    <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    <!-- 头像操作 -->
    <div class="right-menu">
      <!-- 功能引导 -->
      <guide class="right-menu-item hover-effect" />
      <!-- 数据检索 -->
      <header-search class="right-menu-item hover-effect"></header-search>
      <!-- 全屏切换 -->
      <screenfull class="right-menu-item hover-effect" />
      <!--  主题切换 -->
      <theme-picker class="right-menu-item hover-effect" />
      <!-- 多语言切换 -->
      <lang-select class="right-menu-item hover-effect" />
      <!-- 功能 -->
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('msg.navBar.home', '首页') }} </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item> {{ $t('msg.navBar.course', '课程主页') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout()"> {{ $t('msg.navBar.logout', '退出登录') }} </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue';
import { useStore } from 'vuex';
import Hamburger from '@/components/Hamburger';
import Breadcrumb from '@/components/Breadcrumb';
import LangSelect from '@/components/LangSelect';
import ThemePicker from '@/components/ThemePicker/index';
import Screenfull from '@/components/Screenfull';
import HeaderSearch from '@/components/HeaderSearch';
import Guide from '@/components/Guide'

const store = useStore();

// 退出登陆
const logout = () => {
  store.dispatch('user/logout');
};
</script>

<style lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    height: 100%;

    .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
