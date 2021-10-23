import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/generate-qrcode",
    name: "qrcode",
    component: () => import("../views/Auth.vue"),
  },
  {
    path: "/create-list",
    name: "generateList",
    component: () => import("../views/generateList.vue"),
  },
  {
    path: "/type-message",
    name: "typeMessage",
    component: () => import("../views/typeMessage.vue"),
  },
  {
    path: "/sent-message",
    name: "sentMsg",
    component: () => import("../views/listSent.vue"),
  },
  {
    path: "/recent-sent/:date",
    name: "recentSent",
    component: () => import("../views/listRecentSent.vue"),
  },
  {
    path: "/tes",
    name: "tes",
    component: () => import("../views/test.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
