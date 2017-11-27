<template>
  <div class="container">
    <search-results :fullquery="fullquery" v-if="fullquery.length"></search-results>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <input v-model="query" type=text class="form-control" placeholder="Find a Movie">
        <button class="search-btn" @click="sendSearchQueryToModal"><i class="fa fa-search" aria-hidden="true"></i></button>
      </div>
    </div>
    <div class="row">
      <!--<movies-list :title="listProps.popular.title" :url="listProps.popular.url"></movies-list>-->
      <movies-list class="col-sm-12 col-md-6" :title="'Popular Movies'" :movies="popular"></movies-list>
      <movies-list class="col-sm-12 col-md-6" :title="'Upcoming Releases'" :movies="upcoming"></movies-list>
    </div>
  </div>
</template>

<script>
import SearchResults from './SearchResults.vue'
export default {
  name: 'HomePage',
  data () {
    return {
      popular: {},
      upcoming: {},
      search: 'https://api.themoviedb.org/3/search/movie?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1&include_adult=false&query=',
      query: '',
      fullquery: ''
    }
  },
  methods: {
    sendSearchQueryToModal () {
      this.fullquery = this.search + this.query
    },
    fillFoundMovies: function (whichType, url) {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => { this[whichType] = data })
    }
  },
  created () {
    this.popular = this.fillFoundMovies('popular', 'https://api.themoviedb.org/3/movie/popular?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1')
    this.upcoming = this.fillFoundMovies('upcoming', 'https://api.themoviedb.org/3/movie/upcoming?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1')
  },
  components: {
    SearchResults: SearchResults,
    'movies-list': () => import('./MoviesList')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.search-btn{
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  border-radius: 0 4px 4px 0;
  border: 1px dotted #ccc;
  width: 5%;
}

</style>
