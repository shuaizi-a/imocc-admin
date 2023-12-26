import layout from '@/layout';

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'user',
  meta: {
    title: 'user',
    icon: 'personnel',
    authCode: ['userManage', 'roleList', 'permissionList']
  },
  children: [
    {
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/user-manage/index'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage',
        authCode: ['userManage']
      }
    },
    {
      path: 'permission',
      name: 'permission',
      component: () => import('@/views/permission-list/index'),
      meta: {
        title: 'permissionList',
        icon: 'permission',
        authCode: ['permissionList']
      }
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/role-list/index'),
      meta: {
        title: 'roleList',
        icon: 'role',
        authCode: ['roleList']
      }
    },
    {
      path: 'info/:id',
      name: 'userInfo',
      component: () => import('@/views/user-info/index'),
      props: true,
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: 'import',
      name: 'import',
      component: () => import('@/views/import/index'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
};
