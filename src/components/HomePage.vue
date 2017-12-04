<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <form name="search-movie" onsubmit="return false">
          <input v-bind:value="query" v-on:input="searchWithDelay($event.target.value)" type=text class="form-control" placeholder="Find a Movie">
          <i v-bind:class="searchIconClass" aria-hidden="true"></i>
        </form>
        <search-results :movies="found" v-if="found"></search-results>
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
      popular: [],
      upcoming: [],
      found: [],
      query: '',
      timeout: null,
      isSpinning: false
    }
  },
  created () {
    this.getPopular()
    this.getUpcoming()
  },
  mixins: [fillMovies],
  components: {
    'search-results': () => import('./SearchResults'),
    'movies-list': () => import('./MoviesList')
  },
  computed: {
    searchIconClass: function () {
      return ['fa', {'fa-search': !this.isSpinning}, {'fa-spin fa-spinner': this.isSpinning}]
    }
  },
  methods: {
    searchWithDelay: function (value) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.query = value
      }, 500)
    }
  },
  watch: {
    fullquery: function (newQuery) {
      this.isSpinning = true
      this.search()
      this.isSpinning = false
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
