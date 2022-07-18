import { login, getUserInfo } from '@/api/sys';
import md5 from 'md5';
import { setItem, getItem } from '@/utils/storage';
import { TOKEN } from '@/constant';
import router from '@/router/index';

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '', // token
    userInfo: {} // 用户信息
  }),
  mutations: {
    // 设置token
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    // 登陆
    login(context, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            this.commit('user/setToken', data.token);
            resolve();
            // 登录后操作
            router.push('/');
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfo();
      this.commit('user/setUserInfo', res);
      return res;
    }
  }
};
