import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Product from '@/components/Product'
import Category from '@/components/Category'
import About from '@/components/About'
import Contact from '@/components/Contact'

Vue.use(VueRouter)

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})
