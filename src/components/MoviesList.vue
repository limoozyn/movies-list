<template>
  <section>
    <h2>{{title}}</h2>
    <ul v-if="movies">
      <li v-for="movie in movies" :key="movie.id" >
        <list-movie :movie="movie"></list-movie>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'movies-list',
    props: ['title', 'movies'],
    data () {
      return {
        image_base_url: 'https://image.tmdb.org/t/p/w75/'
      }
    },
    methods: {
      movieImage (posterPath) {
        return this.image_base_url + posterPath
      }
    },
    components: {
      'list-movie': () => import('./ListMovie')
    }
  }
</script>

<style scoped>
  body{
    color: #7f8c8d;
  }
  h2{
    color: #7f8c8d;
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
</style>
