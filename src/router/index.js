import Vue from 'vue'
import Router from 'vue-router'

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: resolve => require([`@/pages/${file}.vue`], resolve)
  }
}

Vue.use(Router)

const router = new Router({
  base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    route('/login', 'Login', 'login'),
    route('/error', 'Error', 'error'),

    // path, file(*.vue), name, children

    route('/', 'Main', null, [
      route('/', 'Home', 'home'),
      route('/crud/:resource', 'List', 'list'),
      route('/crud/:resource/search', 'List', 'listSearch'),
      route('/crud/:resource/:id/edit', 'CrudForm', 'edit'),
      route('/crud/:resource/create', 'CrudForm', 'create'),
      route('/crud/:resource/:id/:action', 'CrudForm', 'action'),
      route('/crud/:resource/:action', 'CrudForm', 'indexAction'),
      route('/example', 'Example'),
      route('/settings', 'Settings'),
      route('/theme', 'Theme'),
      route('/chat', 'Chat'),
      route('/about', 'About')
    ])
    // Global redirect for 404
    // { path: '*', redirect: '/error', query: {code: 404, message: 'Page Not Found.'} }
  ]
})

router.beforeEach((to, from, next) => {
  global.store.dispatch('checkPageTitle', to.path)
  /* eslint-disable no-undef */
  if (typeof ga !== 'undefined') {
    ga('set', 'page', to.path)
    ga('send', 'pageview')
  }
  next()
})

export default router
