<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue';

import { useStore } from 'vuex';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
const store = useStore();
const locale = computed(() => (store.getters.language === 'en' ? en : zhCn));
</script>

<style></style>
