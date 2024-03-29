import { getItem, setItem } from '@/utils/storage.js';
import { LANG, TAGS_VIEW } from '@/constant';

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true, //  切换侧边栏状态 true 展开 false 收缩
    language: getItem(LANG) || 'zh', // 当前多语言版本
    tagsViewList: getItem(TAGS_VIEW) || []
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
    },
    // 添加 tags
    addTagsViewList(state, tag) {
      // 通过find去循环已经存储过的数据，判断是否有重复的数据
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path;
      });

      // 处理重复
      if (!isFind) {
        // 存储到vuex
        state.tagsViewList.push(tag);
        // 存储到本地
        setItem(TAGS_VIEW, state.tagsViewList);
      }
    },
    /**
     * 为指定的 tag 修改 title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag;
      setItem(TAGS_VIEW, state.tagsViewList);
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1);
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1);
        state.tagsViewList.splice(0, payload.index);
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1);
      } else if (payload.type === 'all') {
        state.tagsViewList = [];
      }

      setItem(TAGS_VIEW, state.tagsViewList);
    }
  },
  actions: {}
};
