// 专门处理权限路由的模块
import { publicRoutes, privateRoutes } from '@/router';
import { routingFilter } from '@/utils/route';

export default {
  namespaced: true,
  state: {
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  },
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes];
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRoutes(context, menus) {
      let routes = [];

      // 过滤出没有权限的路由列表
      routes = routingFilter(privateRoutes, menus);

      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      });

      context.commit('setRoutes', routes);
      return routes;
    }
  }
};
