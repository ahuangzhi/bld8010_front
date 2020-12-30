import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: '总体概览',
      component: () => import('@/views/home/index'),
      meta: { title: '总体概览', icon: 'home' }
    }]
  },
  {
    path: '/client',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '客户管理',
        component: () => import('@/views/client/index'),
        meta: { title: '客户管理', icon: 'client' }
      }
    ]
  },
  {
    path: '/asset',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '资产管理',
        component: () => import('@/views/asset/index'),
        meta: { title: '资产管理', icon: 'asset' }
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '设备管理',
        component: () => import('@/views/device/index'),
        meta: { title: '设备管理', icon: 'device' }
      }
    ]
  },
  {
    path: '/block',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '钱包管理',
        component: () => import('@/views/block/index'),
        meta: { title: '钱包管理', icon: 'blockHeight' }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '位置管理',
        component: () => import('@/views/map/index'),
        meta: { title: '位置管理', icon: 'map' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '顾客管理',
        component: () => import('@/views/customer/index')
      }
    ]
  },
  {
    path: '/tenant',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '租户管理',
        component: () => import('@/views/tenant/index'),
        meta: { title: '租户管理', icon: 'tenant' }
      }
    ]
  },
  {
    path: '/tenantAdmin',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '租户管理员管理',
        component: () => import('@/views/tenantAdmin/index')
      }
    ]
  },
  // {
  //   path: '/transaction',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: '电桩交易',
  //       component: () => import('@/views/transaction/index'),
  //       meta: {title: '电桩交易', icon: 'transaction'}
  //     }
  //   ]
  // },
  {
    path: '/maintain',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '电桩维护',
        component: () => import('@/views/maintain/index'),
        meta: { title: '电桩维护', icon: 'maintain' }
      }
    ]
  },
  {
    path: '/price',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '资费维护',
        component: () => import('@/views/price/index'),
        meta: { title: '资费维护', icon: 'price' }
      }
    ]
  },
  {
    path: '/transfer',
    component: Layout,
    children: [
      {
        path: 'transfer',
        name: '资金归集',
        component: () => import('@/views/transfer/transfer'),
        meta: { title: '资金归集', icon: 'collect' }
      }
    ]
  },
  {
    path: '/traceability',
    component: Layout,
    children: [
      {
        path: 'traceability',
        name: '资源管理',
        component: () => import('@/views/traceability/traceability'),
        meta: { title: '资源管理', icon: 'traceability' }
      }
    ]
  },
  {
    path: '/unifiedQuery',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '统一查询',
        component: () => import('@/views/unifiedQuery/index'),
        meta: { title: '统一查询', icon: 'query' }
      }
    ]
  },
  // {
  //   path: '/orderCharge',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: '分段电价表',
  //       component: () => import('@/views/basics_sectional_tariff/index'),
  //       meta: { title: '分段电价表', icon: 'el-icon-s-management' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
