import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import MovieDetails from '@/components/MovieDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/:id',
      name: 'MovieDetails',
      component: MovieDetails
    }
  ]
})
