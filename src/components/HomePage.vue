<template>
  <div class="homepage-wrapper">
    <div class="half">
      <movies-list :listProps="listProps.popular"></movies-list>
    </div>
    <div class="half">
      <movies-list :listProps="listProps.upcoming" ></movies-list>
    </div>
  </div>
</template>

<script>
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
        },
        search: 'https://api.themoviedb.org/3/search/movie?api_key=2bffc68560bcf99a67d3ea8fa8f937b4&language=en-US&page=1&include_adult=false&query='
      }
    }
  },
  components: {
    'movies-list': () => import('./MoviesList')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.homepage-wrapper{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
}
.half{
  width: 45%;
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
