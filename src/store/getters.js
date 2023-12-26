import { getItem } from '@/utils/storage';
import { generateColors } from '@/utils/theme';
import { MAIN_COLOR } from '@/constant';

const getters = {
  token: (state) => state.user.token,
  /**
   * @hasUserInfo 读取用户信息
   * @returns true 表示已存在用户信息
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}';
  },
  // 用户信息
  userInfo: (state) => {
    return state.user.userInfo;
  },
  // 主题变量
  cssVar: (state) => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    };
  },
  // menu菜单栏伸缩
  sidebarOpened: (state) => state.app.sidebarOpened,
  // 获取当前语言
  language: (state) => state.app.language,
  // 获取当前配置的主题色
  mainColor: (state) => state.theme.mainColor,
  // 获取tagsViewList
  tagsViewList: (state) => state.app.tagsViewList,
  // 侧边栏导航信息
  routes: (state) => state.permission.routes
};
export default getters;
