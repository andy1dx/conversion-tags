import URL from '../enums/URL.js'

const routes = [
  // User bgn
  {
    path: URL.USER.TOP.url,
    component: () => import('layouts/main/MainLayout.vue'),
    children: [
      { path: URL.USER.TOP.url, component: () => import('pages/main/TopPage.vue') }
    ]
  }
  // User end
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
