import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import Containers from "@/views/Containers.vue";
import FileManager from "@/views/FileManager.vue";
import Help from "@/views/Help.vue";
import Admin from "@/views/Admin.vue";
import K404 from "@/views/404.vue";
import store from '@/store/store';
import { SIGN_OUT_USER } from '@/store/modules/auth/auth.types';
import { MessageBox } from 'element-ui';

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      beforeEnter: (to, from, next) => {
        try {
          if(store.state.auth.user.scope.length > 0) {
            next({
              path: '/containers'
            });
          } else {
            next();
          }
        } catch (error) {
          next()
        }
      },
      meta: { 
        hideHeader: true,
        requiresAuth: false,
      },
    },
    {
      path: "/files",
      name: "files",
      // route level code-splitting
      // this generates a separate chunk (containers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "containers" */ "./views/Containers.vue")
      component: FileManager,
      meta: { hideHeader: false }
    },
    {
      path: "/containers",
      name: "containers",
      // route level code-splitting
      // this generates a separate chunk (containers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "containers" */ "./views/Containers.vue")
      component: Containers,
      meta: { 
        hideHeader: false,
        requiresAuth: true,
      }
    },
    {
      path: "/help",
      name: "help",
      // route level code-splitting
      // this generates a separate chunk (containers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "containers" */ "./views/Containers.vue")
      component: Help,
      meta: { 
        hideHeader: false,
        requiresAuth: true,
      }
    },
    {
      path: "*",
      name: "404",
      // route level code-splitting
      // this generates a separate chunk (containers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "containers" */ "./views/Containers.vue")
      component: K404,
      meta: { 
        hideHeader: true,
        requiresAuth: false,
      }
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (containers.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "containers" */ "./views/Containers.vue")
      component: Admin,
      meta: { 
        hideHeader: false,
        requiresAuth: true,
      }
    }
  ]
});

// Runs auth on all routes by default
// (to) - page the user is requesting to go to
// (from) - page the user is coming from
// (next) - lets user proceed to page
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    const expiry = Date.parse(localStorage.getItem('expiry'));
    const current = Date.parse(new Date(Date.now()).toUTCString());
    if(current >= expiry) {
      MessageBox.alert('Please log in again.', 'Session Expired', {
        confirmButtonText: 'Back to Login',
        callback: () => {
          store.dispatch(SIGN_OUT_USER);
        }
      });
    } else {
      const scope = store.state.auth.user.scope;
      try {
        if(scope.length > 0) next();
        else {
          next({
            path: '/',
            query: {
              redirect: to.fullPath
            }
          });
        }
      } catch (error) {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      }
    }
  } else {
    next();
  }
});

export default router;
