import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/homepage'
import ShopPage from '../view/shoppage'
import AboutPage from '../view/aboutpage'
import AdminPage from '../view/adminpage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/shop',
    name: 'shoppage',
    component: ShopPage
  },
  {
    path: '/about',
    name: 'aboutpage',
    component: AboutPage
  },
  {
    path: '/admin',
    name: 'adminpanel',
    component: AdminPage
  }
]

const router = new VueRouter({
  routes
})

export default router
