import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PageAbout from "@/pages/PageAbout.vue"
import PagePremieres from "@/pages/PagePremieres.vue"
import PageSearch from "@/pages/PageSearch.vue";
import PageFavourite from "@/pages/PageFavourite.vue";
import PageDetail from "@/pages/PageDetail.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/movee",
    name:'PageAbout',
    component: PageAbout,
    meta:{
      title:'О приложении'
    }
  },
  {
    path: "/movee/premieres",
    name:'PagePremieres',
    component: PagePremieres,
    meta:{
      title:'Премьеры'
    }
  },
  {
    path: "/movee/search",
    name:'PageSearch',
    component: PageSearch,
    meta:{
      title:'Поиск'
    }
  },
  {
    path: "/movee/favourite",
    name:'PageFavourite',
    component: PageFavourite,
    meta:{
      title:'Мои фильмы'
    }
  },
  {
    path: "/movee/:id",
    name:'PageDetail',
    component: PageDetail,
    meta:{
      title:'О фильме'
    },
    props:true

  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
