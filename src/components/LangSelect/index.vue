<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <el-tooltip :content="$t('msg.navBar.lang', '国际化')" :effect="effect">
        <svg-icon id="guide-lang" icon="language" />
      </el-tooltip>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"> 中文 </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n/index';
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1;
    }
  }
});

const store = useStore();
const language = computed(() => store.getters.language);

// 切换语言的方法
const i18n = useI18n();
const handleSetLanguage = (lang) => {
  // 切换vue-i18n 的 locale
  i18n.locale.value = lang;
  // 修改 vuex 中保存的 language
  store.commit('app/setLanguage', lang);

  // 提示
  ElMessage({
    message: i18n.t('msg.toast.switchLangSuccess', '更新成功'),
    type: 'success'
  });
};
</script>

<style></style>
