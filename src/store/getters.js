import variables from '@/styles/variables.scss';

const getters = {
  token: (state) => state.user.token,
  /**
   * @hasUserInfo 读取用户信息
   * @returns true 表示已存在用户信息
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}';
  },
  userInfo: (state) => {
    return state.user.userInfo;
  },
  // 主题变量
  cssVar: (state) => variables
};
export default getters;
