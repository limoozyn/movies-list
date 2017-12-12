<template>
  <a v-bind:href="movie.id">
    <figure>
      <img v-if="movie.poster_path" :src="posterUrl">
      <figcaption class="title">{{movie.original_title}}</figcaption>
    </figure>
  </a>
</template>
<script>
  export default {
    name: 'list-movie',
    props: ['movie'],
    data () {
      return {
        imageBaseUrl: 'https://image.tmdb.org/t/p/w75/',
        posterUrl: ''
      }
    },
    created () {
      this.posterUrl = this.imageBaseUrl + this.movie.poster_path
    }
  }
</script>
<style>
  a:hover{
    text-decoration: none;
  }
  a:hover .title{
    color: black;
  }
  figure{
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
