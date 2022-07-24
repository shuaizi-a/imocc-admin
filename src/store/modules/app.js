import { getItem, setItem } from '@/utils/storage.js';
import { LANG } from '@/constant';

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true, //  切换侧边栏状态 true 展开 false 收缩
    language: getItem(LANG) || 'zh' // 当前多语言版本
  }),
  mutations: {
    // 切换侧边栏
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    // 设置国际化
    setLanguage(state, lang) {
      setItem(LANG, lang);
      state.language = lang;
    }
  },
  actions: {}
};
