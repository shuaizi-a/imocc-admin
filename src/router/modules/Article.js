import layout from '@/layout';

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'article',
  meta: {
    title: 'article',
    icon: 'article',
    authCode: ['articleRanking', 'articleCreate']
  },
  children: [
    {
      path: 'ranking',
      name: 'ranking',
      component: () => import('@/views/article-ranking/index'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking',
        authCode: ['articleRanking']
      }
    },
    {
      path: 'articleEditor/:id',
      name: 'articleEditor',
      component: () => import('@/views/article-detail/index'),
      meta: {
        title: 'articleDetail'
      }
    },
    {
      path: 'create',
      name: 'create',
      component: () => import('@/views/article-create/index'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create',
        authCode: ['articleCreate']
      }
    },
    {
      path: 'editor/:id',
      name: 'editor',
      component: () => import('@/views/article-create/index'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
};
