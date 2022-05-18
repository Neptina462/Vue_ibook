import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/pages/Login.vue'
import Register from '../components/pages/Register.vue'
import AdminHome from '../components/pages/AdminHome.vue'
import AdminMain from '../components/fragments/AdminMain.vue'

import StudentHome from '../components/pages/StudentHome.vue'
import StudentMain from '../components/fragments/StudentMain.vue'
import StudentRoom from '../components/fragments/StudentRoom.vue'
import StudentOrder from '../components/fragments/StudentOrder.vue'
import StudentHistory from '../components/fragments/StudentHistory.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/adminHome', component: AdminHome, redirect: '/adminmain',
    children:[
      { path: '/adminmain', component: AdminMain }
    ]
  },
  { path: '/studentHome', component: StudentHome, redirect: '/studentmain',
    children:[
      { path: '/studentmain', component: StudentMain },
      { path: '/studentroom', component: StudentRoom },
      { path: '/studentorder', component: StudentOrder },
      { path: '/studenthistory', component: StudentHistory },
    ]
  },
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to表示将要访问的路径
  // from代表从那个路劲跳转而来
  // next 为放行函数；next()为放行，next('/login')为强制跳转到login

  if(to.path === '/login') return next();

  //设置来自于服务器token检测，备用
  //const tokenStr = window.sessionStorage.getItem('token');
  //if(!tokenStr) return next('/login');

  if(from.path == '/register'){
    if(to.path == '/login')
      return next();
  }

  //设置类型检测，备用
  const userType = window.sessionStorage.getItem('usertype');
  if(!userType && to.path !== '/register') return next('/login');

  if(from.path == '/login'){
    if (to.path == '/register' )
      return next();
  }

  
  return next();
})

export default router
