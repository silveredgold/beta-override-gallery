import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/gallery/",
      name: "gallery",
      component: () => import("../views/ListView.vue"),
    },
    {
      path: "/gallery/:overrideId",
      name: "detail",
      component: () => import("../views/DetailView.vue"),
      props: true,
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../views/CreateOverrideView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/upload",
      name: "upload",
      beforeEnter: async (to, from) => {
        if (window.location.href.includes("localhost")) {
          return true;
        }
        try {
          const resp = await fetch("/api/profile");
          if (resp.status == 200) {
            const json = await resp.json();
            return json.username ? true : { name: "login" };
          }
          console.log("no profile response, redirecting");
          return { name: "login" };
        } catch {
          return { name: "login" };
        }
      },
      component: () => import("../views/UploadView.vue"),
    },
  ] as RouteRecordRaw[],
});

export default router;
