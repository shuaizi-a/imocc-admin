import path from 'path';

// 对于单个路由规则而言（循环）：
//   如果meta && meta.title && meta.icon ：则显示在 menu 菜单中，其中 title 为显示的内容，icon 为显示的图标
//   如果存在 children ：则以 el-sub-menu（子菜单） 展示
//   否则：则以 el-menu-item（菜单项） 展示
// 否则：不显示在 menu 菜单中

// 判断是否有此路由的权限
function hasPermission(router, code) {
  if (router.meta && router.meta.authCode && router.meta.authCode.length > 0) {
    return code.some((role) => router.meta.authCode.includes(role));
  }
  return true;
}

// 重置私有路由表
export function routingFilter(router, code) {
  const routerArrayLiat = [];
  router.forEach((item) => {
    const tmp = { ...item };
    if (hasPermission(tmp, code)) {
      if (tmp.children) {
        tmp.children = routingFilter(tmp.children, code);
      }
      routerArrayLiat.push(tmp);
    }
  });
  return routerArrayLiat;
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true;
  if (JSON.stringify(data) === '{}') return true;
  if (JSON.stringify(data) === '[]') return true;
  return false;
}

/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus(routes, basePath = '') {
  const result = [];
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return;
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children));
      return;
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path);
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath);
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      };

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route);
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path));
    }
  });
  return result;
}
