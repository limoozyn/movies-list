<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <form name="search-movie" onsubmit="return false">
          <input v-on:input="searchWithDelay" type=text class="form-control" placeholder="Find a Movie">
          <i v-bind:class="searchIconClass" aria-hidden="true"></i>
        </form>
        <search-results :movies="found" v-if="found"></search-results>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <img src="../assets/spinner.gif" v-show="popular_loading">
        <movies-list :title="'Popular Movies'" :movies="popular" v-show="!popular_loading"></movies-list>
      </div>
      <div class="col-sm-12 col-md-6">
        <img src="../assets/spinner.gif" v-show="upcoming_loading" >
        <movies-list :title="'Upcoming Releases'" :movies="upcoming" v-show="!upcoming_loading"></movies-list>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataFromAPI, popularUrl, upcomingUrl, fullquery } from '../helpers/fillDetails'
import _ from 'lodash'
export default {
  name: 'HomePage',
  data () {
    return {
      popular: [],
      upcoming: [],
      found: [],
      query: '',
      timeout: null,
      isSpinning: false,
      popular_loading: true,
      upcoming_loading: true
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
    searchIconClass: function () {
      return ['fa', {'fa-search': !this.isSpinning}, {'fa-spin fa-spinner': this.isSpinning}]
    }
  },
  methods: {
    searchWithDelay: _.debounce(function (e) {
      this.query = e.target.value
    }, 500),
    getPopular: function () {
      getDataFromAPI(popularUrl()).then(
        result => {
          this.popular = result.results
          this.popular_loading = false
        })
    },
    getUpcoming: function () {
      getDataFromAPI(upcomingUrl()).then(
        result => {
          this.upcoming = result.results
          this.upcoming_loading = false
        })
    },
    search: function () {
      getDataFromAPI(fullquery(this.query)).then(
        result => { this.found = result.results })
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
