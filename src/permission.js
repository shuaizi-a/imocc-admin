import router from './router';
import store from './store';

// 处理无权限和找不到路由的情况
function goAuthPage(to, next, codes) {
  // 匹配到了然后没有权限去401
  if (to.meta?.authCode && to.meta.authCode.every((i) => !codes.includes(i))) {
    next('/401');
    return true;
  }
  return false;
}

// 白名单
const whiteList = ['/login'];

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/');
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await store.dispatch('user/getUserInfo');

        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus);

        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item);
        });

        // 判断是否有权限
        const codeStatus = goAuthPage(to, next, permission.menus);
        if (!codeStatus) {
          //  路由跳转
          next(to.path);
        }
      } else {
        // 获取用户权限信息
        const menus = store.getters.userInfo.permission.menus;
        // 判断是否有权限
        const codeStatus = goAuthPage(to, next, menus);
        if (!codeStatus) {
          //  路由跳转
          next();
        }
      }
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
    }
  }
});
