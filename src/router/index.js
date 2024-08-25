import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/",
    component: () => import("../components/layouts/MainLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/DashboardView.vue"),
      },
      {
        path: "users",
        name: "user-management",
        component: () => import("../views/UserManagementView.vue"),
      },
      {
        path: "inquiries",
        name: "inquiries",
        component: () => import("../views/InquiryView.vue"),
        // meta: { requiresAuth: true },
      },
      {
        path: "notifications",
        name: "notifications",
        component: () => import("../views/NotificationsView.vue"),
      },
    ],
  },
  /*
  {
    path: "/users",
    name: "user-management",
    component: () => import("../views/UserManagementView.vue"),
  },
  {
    path: "/inquiries",
    name: "inquiries",
    component: () => import("../views/InquiryView.vue"),
    // meta: { requiresAuth: true },
  },
  {
    path: "/notifications",
    name: "notifications",
    component: () => import("../views/NotificationsView.vue"),
  },
  */
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
