<template>
  <section>
    <h2>{{title}}</h2>
    <img src="../assets/spinner.gif" v-if="!movies.results">
    <ul v-if="movies">
      <li v-for="movie in movies.results" :key="movie.id" >
        <figure>
          <img :src="image_base_url + movie.poster_path">
          <figcaption class="title">{{movie.original_title}}</figcaption>
        </figure>
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
  li figure{
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: flex-start;
  }
  .title{
    flex-grow: 1;
    color: #7f8c8d;
    margin-left: 50px;
    text-align: left;
  }
</style>
