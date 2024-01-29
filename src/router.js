import { createRouter, createWebHistory } from 'vue-router';

import CoachList from './pages/coaches/CoachList.vue';
// import RequestList from './pages/requests/RequestList.vue';
// import CreateCoach from './pages/coaches/CreateCoach.vue';
// import CoachDetails from './pages/coaches/CoachDetails.vue';
// import CreateRequest from './pages/requests/CreateRequest.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');
const CreateCoach = () => import('./pages/coaches/CreateCoach.vue');
const CreateRequest = () => import('./pages/requests/CreateRequest.vue');
const RequestList = () => import('./pages/requests/RequestList.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        {
          path: 'contact', // /coaches/c1/contact
          component: CreateRequest,
        },
      ],
    },
    {
      path: '/register',
      component: CreateCoach,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestList,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
