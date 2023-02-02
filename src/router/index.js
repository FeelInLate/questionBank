import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Manage",
    component: () => import("../views/Manage.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "quesbank",
        name: "QuesBank",
        component: () => import("../views/QuesBank.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
