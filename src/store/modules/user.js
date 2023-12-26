import { login, getUserInfo } from '@/api/sys';
import md5 from 'md5';
import { setItem, getItem, removeAllItem } from '@/utils/storage';
import { TOKEN } from '@/constant';
import router, { resetRouter } from '@/router/index';
import { setTimeStamp } from '@/utils/auth';

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
            // 保存登录时间
            setTimeStamp();
            // 成功
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
    },
    // 去除数据
    logout() {
      // 清除路由信息
      resetRouter();
      // 删除token
      this.commit('user/setToken', '');
      // 删除 用户信息
      this.commit('user/setUserInfo', {});
      // 删除 tagsViewList
      this.commit('app/removeTagsView', { type: 'all' });
      // 清除本地缓存
      removeAllItem();
      // 跳转到登陆页
      router.push('/login');
    }
  }
};
