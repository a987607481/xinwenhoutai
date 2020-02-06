import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Index from '@/views/index.vue'
import Wel from '@/views/welcomePage.vue'
import PostList from '@/views/postList.vue'
import AddPost from '@/views/addPost.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    // 登录
    {
      path: '/',
      redirect: { name: 'Login' }
    },
    // 登录
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    // 主页
    {
      name: 'Index',
      path: '/index',
      component: Index,
      redirect: { name: 'Wel' },
      children: [
        {
          name: 'Wel',
          path: 'wel',
          component: Wel
        },
        {
          name: 'PostList',
          path: 'postList',
          component: PostList
        },
        {
          name: 'AddPost',
          path: 'addPost',
          component: AddPost
        }
      ]
    }
  ]
})

// 导航守卫

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    let token = localStorage.getItem('heima_back_39_token')
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})
export default router
