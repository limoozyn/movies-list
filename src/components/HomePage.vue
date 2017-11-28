<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <form name="search-movie" onsubmit="return false">
          <input v-bind:value="query" v-on:input="searchWithDelay($event.target.value)" type=text class="form-control" placeholder="Find a Movie">
          <i v-bind:class="searchIconClass" aria-hidden="true"></i>
        </form>
        <search-results :movies="found" v-if="found.results"></search-results>
      </div>
    </div>
    <div class="row">
      <movies-list class="col-sm-12 col-md-6" :title="'Popular Movies'" :movies="popular"></movies-list>
      <movies-list class="col-sm-12 col-md-6" :title="'Upcoming Releases'" :movies="upcoming"></movies-list>
    </div>
  </div>
</template>

<script>
import { fillMovies } from './mixins/fillMovies'
export default {
  name: 'HomePage',
  data () {
    return {
      popular: {},
      upcoming: {},
      found: {},
      search: 'https://api.themoviedb.org/3/search/movie?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1&include_adult=false&query=',
      query: '',
      timeout: null,
      isSpinning: false
    }
  },
  created () {
    this.fillFoundMovies('popular', 'https://api.themoviedb.org/3/movie/popular?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1')
    this.fillFoundMovies('upcoming', 'https://api.themoviedb.org/3/movie/upcoming?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1')
  },
  mixins: [fillMovies],
  components: {
    'search-results': () => import('./SearchResults'),
    'movies-list': () => import('./MoviesList')
  },
  computed: {
    fullquery: function () {
      return this.search + this.query
    },
    searchIconClass: function () {
      return ['fa', {'fa-search': !this.isSpinning}, {'fa-spin fa-spinner': this.isSpinning}]
    }

  },
  methods: {
    searchWithDelay: function (value) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.isSpinning = true
        this.query = value
      }, 500)
    }
  },
  watch: {
    fullquery: function (newQuery) {
      this.fillFoundMovies('found', newQuery)
    }
  }
}
</script>

<style scoped>
i{
  position: absolute;
  right: 20px;
  top: 10px;
  height: 100%;
  border-radius: 0 4px 4px 0;
  border: none;
  width: 16px;
  height: 16px;
}
</style>
