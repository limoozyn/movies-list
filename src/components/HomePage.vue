<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <form name="search-movie" onsubmit="return false">
          <input v-on:input="inputStarted" type=text class="form-control" placeholder="Find a Movie">
          <i v-bind:class="searchIconClass" aria-hidden="true"></i>
        </form>
        <search-results :movies="found" v-if="found"></search-results>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <img src="../assets/spinner.gif" v-show="popular.loading">
        <movies-list :title="'Popular Movies'" :movies="popular.movies" v-show="!popular.loading"></movies-list>
      </div>
      <div class="col-sm-12 col-md-6">
        <img src="../assets/spinner.gif" v-show="upcoming.loading" >
        <movies-list :title="'Upcoming Releases'" :movies="upcoming.movies" v-show="!upcoming.loading"></movies-list>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataFromAPI, popularUrl, upcomingUrl, fullquery } from '../helpers/fillDetails'
import debounce from 'lodash.debounce'
export default {
  name: 'HomePage',
  data () {
    return {
      popular: {},
      upcoming: {},
      found: [],
      query: '',
      timeout: null,
      isSpinning: false
    }
  },
  mounted () {
    this.getPopular()
    this.getUpcoming()
  },
  components: {
    'search-results': () => import('./SearchResults'),
    'movies-list': () => import('./MoviesList')
  },
  computed: {
    searchIconClass () {
      return ['fa', {'fa-search': !this.isSpinning}, {'fa-spin fa-spinner': this.isSpinning}]
    }
  },
  methods: {
    searchWithDelay: debounce(function (e) {
      this.query = e.target.value
      this.isSpinning = false
    }, 500),
    inputStarted: function (e) {
      this.isSpinning = true
      this.searchWithDelay(e)
    },
    getPopular: function () {
      getDataFromAPI(popularUrl(), 'results').then(
        result => {
          this.popular = {movies: result, loading: false}
        })
    },
    getUpcoming: function () {
      getDataFromAPI(upcomingUrl(), 'results').then(
        result => {
          this.upcoming = {movies: result, loading: false}
        })
    },
    search: function () {
      getDataFromAPI(fullquery(this.query), 'results').then(
        result => { this.found = result })
    }
  },
  watch: {
    query: function (newQuery) {
      this.isSpinning = true
      newQuery.trim().length ? this.search() : this.found = []
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
  border-radius: 0 4px 4px 0;
  border: none;
  width: 16px;
  height: 16px;
}
</style>
