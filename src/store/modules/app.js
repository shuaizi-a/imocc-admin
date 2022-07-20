export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true
  }),
  mutations: {
    // 切换侧边栏
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    }
  },
  actions: {}
};
