<template>
  <div class="container">
    <search-results :showModal="showModal" :closeAction="closeDialog"></search-results>
    <div class="row">
      <div class="col-xs-12">
        <button class="btn btn-success" @click="showModal = true">Search</button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <movies-list :listProps="listProps.popular"></movies-list>
      </div>
      <div class="col-sm-12 col-md-6">
        <movies-list :listProps="listProps.upcoming" ></movies-list>
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
      showModal: false
    }
  },
  components: {
    SearchResults: SearchResults,
    'movies-list': () => import('./MoviesList')
  },
  methods: {
    closeDialog () {
      this.showModal = false
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
</style>
