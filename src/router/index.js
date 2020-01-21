import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layouts",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/layouts.vue"),
    children: [
      {
        path: "/todo/:id",
        name: "todo",
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/todo.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
