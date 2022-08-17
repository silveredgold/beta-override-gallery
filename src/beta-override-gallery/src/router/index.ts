import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/gallery',
      name: 'gallery',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    ,
    {
      path: '/upload',
      name: 'upload',
      beforeEnter: async (to, from) => {
        try {
          let resp = await fetch('/api/profile');
          if (resp.status == 200) {
            let json = await resp.json();
            return json.username ? true : { name: 'login' }
          }
          console.log('no profile response, redirecting');
          return { name: 'login' }
        } catch {
          return { name: 'login' }
        }
      },
      component: () => import('../views/UploadView.vue')
    }
  ] as RouteRecordRaw[]
});

// router.beforeEach(async (to) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const privatePages = ['/upload'];
//   const authRequired = privatePages.includes(to.path);
//   const auth = useAuthStore();

//   if (authRequired && !auth.user) {
//       (auth as any).returnUrl = to.fullPath;
//       return '/login';
//   }
// });

export default router
