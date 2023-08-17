import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PageAbout from "@/pages/PageAbout.vue"
import PagePremieres from "@/pages/PagePremieres.vue"
import PageSearch from "@/pages/PageSearch.vue";
import PageFavourite from "@/pages/PageFavourite.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/about",
    name:'PageAbout',
    component: PageAbout,
    meta:{
      title:'О приложении'
    }
  },
  {
    path: "/premieres",
    name:'PagePremieres',
    component: PagePremieres,
    meta:{
      title:'Премьеры'
    }
  },
  {
    path: "/search",
    name:'PageSearch',
    component: PageSearch,
    meta:{
      title:'Поиск'
    }
  },
  {
    path: "/favourite",
    name:'PageFavourite',
    component: PageFavourite,
    meta:{
      title:'Мои фильмы'
    }
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
