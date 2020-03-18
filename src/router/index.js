import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import FindMovie from '../views/FindMovie.vue'
import FindTV from '../views/FindTV.vue'

import MovieDetail from '../views/MovieDetail.vue'
import TVDetail from '../views/TVDetail.vue'

import PersonPage from '../views/PersonPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/movies/:id/:title',
    name: 'MovieDetail',
    component: MovieDetail,
    meta: {
      title: '電影詳細內容'
    }, props: true
  },
  {
    path: '/movies',
    name: 'FindMoviePage',
    component: FindMovie
  },
  {
    path: '/tvs/:id/:title',
    name: 'TVDetail',
    component: TVDetail,
    meta: {
      title: '電視劇詳細內容'
    },
    props: true
  },
  {
    path: '/tvs',
    name: 'FindTVPage',
    component: FindTV,
  },
  {
    path: '/person/:id/:name',
    name: 'PersonDetail',
    component: PersonPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
