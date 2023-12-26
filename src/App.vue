<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { watchSwitchLang } from '@/utils/i18n';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import { generateNewStyle, writeNewStyle } from '@/utils/theme';
const store = useStore();

// 切换语言
const locale = computed(() => (store.getters.language === 'en' ? en : zhCn));

// 切换主题色
generateNewStyle(store.getters.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText);
});

/**
 * 监听 语言变化，重新获取个人信息
 */
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
});

// 解决sortable.js拖拽打开新页面
document.body.ondrop = function (event) {
  event.preventDefault();
  event.stopPropagation();
};
</script>

<style></style>
