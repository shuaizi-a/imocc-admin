import { createRouter, createWebHashHistory } from 'vue-router';
import layout from '@/layout/index.vue';
import Article from './modules/Article';
import User from './modules/User';
import store from '@/store';

/**
 * 私有路由表
 */
export const privateRoutes = [User, Article];

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'User'
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: () =>
          import(/* webpackChunkName: "chart" */ '@/views/chart/index'),
        meta: {
          title: 'chart',
          icon: 'chart'
        }
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      {
        path: '401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
];

/**
 * 初始化路由表
 */
export function resetRouter() {
  const routes = store.getters.routes;
  routes.forEach((item) => {
    if (item.name) {
      router.removeRoute(item.name);
    }
  });
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
});

export default router;
