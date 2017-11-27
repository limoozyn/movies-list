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
      <div class="col-sm-12 col-md-6">
        <movies-list :title="listProps.popular.title" :url="listProps.popular.url"></movies-list>
      </div>
      <div class="col-sm-12 col-md-6">
        <movies-list :title="listProps.upcoming.title" :url="listProps.upcoming.url"></movies-list>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResults from './SearchResults.vue'
export default {
  name: 'HomePage',
  data () {
    return {
      listProps: {
        popular: {
          title: 'Popular Movies',
          url: 'https://api.themoviedb.org/3/movie/popular?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1'
        },
        upcoming: {
          title: 'Upcoming Releases',
          url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1'
        }
      },
      search: 'https://api.themoviedb.org/3/search/movie?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1&include_adult=false&query=',
      query: '',
      fullquery: ''
    }
  },
  components: {
    SearchResults: SearchResults,
    'movies-list': () => import('./MoviesList')
  },
  methods: {
    sendSearchQueryToModal () {
      this.fullquery = this.search + this.query
    }
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
