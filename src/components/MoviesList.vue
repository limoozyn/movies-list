<template>
  <div>
    <h2>{{title}}</h2>
    <ul v-if="movies">
      <li v-for="movie in movies.results" :key="movie.id" >
        <img :src="image_base_url + movie.poster_path">
        <span class="title">{{movie.original_title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'movies-list',
    props: ['title', 'movies'],
    data () {
      return {
//        movies: {},
        image_base_url: 'https://image.tmdb.org/t/p/w75/'
      }
    },
    watch: {
      url: function (newValue) {
        this.fillFoundMovies(newValue)
        this.$emit('received')
      }
    },
    methods: {
      fillFoundMovies: function (url) {
        fetch(url)
          .then((resp) => resp.json())
          .then((data) => { this.movies = data })
      }
    },
    mounted () {
      this.fillFoundMovies(this.url)
      this.$emit('received')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  *{
    color: #7f8c8d;
  }
  h2{
    text-align: left;
    margin-left: 125px;
  }
  @media (max-width: 768px){
    h2 {
      text-align: center;
      margin-left: 0;
    }
  }
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 25px;
  }
  li:not(:first-child){
    border-top: #ccc 1px dotted;
    padding-top: 20px;
  }
  li {
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: flex-start;
  }
  span{
    flex-grow: 1;
    color: #7f8c8d;
    margin-left: 50px;
    text-align: left;
  }

</style>
